import { calculateMicrostripPatch } from '../src/lib/patch-antenna-math.ts';
import { calculateIotBatteryLife } from '../src/lib/iot-battery-math.ts';
import { evaluatePinoutConflicts } from '../src/lib/pinout-conflict-engine.ts';
import { MCU_PROFILES } from '../src/data/mcu-profiles.ts';

console.log('=== BENCHPULSE MATH VERIFICATION ===');

// Test 1: 2.4 GHz patch on 1.6 mm FR-4 (er = 4.4)
const rfResult24 = calculateMicrostripPatch({
  frequencyGhz: 2.4,
  dielectricConstant: 4.4,
  substrateHeightMm: 1.6,
  targetImpedanceOhm: 50,
});

console.log('Test 1 (2.4 GHz RF Patch on 1.6mm FR-4):');
console.log(`  Patch Width W: ${rfResult24.patchWidthMm.toFixed(2)} mm (Target: ~38.04 mm)`);
console.log(`  Patch Length L: ${rfResult24.patchLengthMm.toFixed(2)} mm (Target: ~29.44 mm)`);
console.log(`  Inset Notch y0: ${rfResult24.insetFeedDepthMm.toFixed(2)} mm`);
console.log(`  Feed Trace W_f: ${rfResult24.feedTraceWidthMm.toFixed(2)} mm`);
console.log(`  Effective Permittivity: ${rfResult24.effectivePermittivity.toFixed(3)}`);

const wDiff = Math.abs(rfResult24.patchWidthMm - 38.04);
const lDiff = Math.abs(rfResult24.patchLengthMm - 29.44);
if (wDiff < 0.2 && lDiff < 0.2) {
  console.log('  -> PASS: 2.4 GHz Patch dimensions within +/-0.2 mm tolerance!');
} else {
  console.error('  -> FAIL: 2.4 GHz Patch dimensions outside tolerance!');
  process.exit(1);
}

// Test 2: IoT Battery calculation
const iotResult = calculateIotBatteryLife({
  batteryCapacityMah: 2600,
  usableFraction: 0.85,
  annualSelfDischargeRate: 0.04,
  regulatorQuiescentUa: 2.5,
  regulatorEfficiency: 0.92,
  sleepCurrentUa: 12,
  wakeSensorCurrentMa: 25,
  wakeSensorDurationMs: 40,
  txCurrentMa: 180,
  txDurationMs: 120,
  wakeIntervalSeconds: 60,
});

console.log('\nTest 2 (IoT Battery Calculation):');
console.log(`  Average Current: ${iotResult.averageCurrentMa.toFixed(4)} mA`);
console.log(`  Estimated Life: ${iotResult.estimatedYears.toFixed(2)} Years (${iotResult.estimatedDays.toFixed(1)} Days)`);
console.log(`  Sleep Duty Cycle: ${iotResult.sleepDutyCyclePercent.toFixed(2)}%`);
if (iotResult.estimatedYears > 0.5 && iotResult.estimatedYears < 1.5) {
  console.log('  -> PASS: IoT Battery result reasonable and non-zero!');
} else {
  console.error('  -> FAIL: IoT Battery result abnormal!');
  process.exit(1);
}

// Test 3: MCU Conflict Engine: ADC2 + Wi-Fi Conflict
const esp32 = MCU_PROFILES.find((m) => m.id === 'esp32-wroom-32');
const pinResult = evaluatePinoutConflicts(
  esp32,
  [
    { id: '1', name: 'BATTERY_ADC2', type: 'ADC', gpio: 'GPIO25' }, // ADC2 pin
    { id: '2', name: 'SERVO_PWM', type: 'PWM', gpio: 'GPIO34' }, // Input-only pin violation!
  ],
  true // Wi-Fi active
);

console.log('\nTest 3 (Pinout Conflict Engine):');
console.log(`  Diagnostics found: ${pinResult.diagnostics.length}`);
pinResult.diagnostics.forEach((d) => {
  console.log(`  [${d.severity}] ${d.ruleCode}: ${d.title}`);
});

const hasAdc2 = pinResult.diagnostics.some((d) => d.ruleCode === 'ADC2_WIFI_CONFLICT');
const hasInputOnly = pinResult.diagnostics.some((d) => d.ruleCode === 'INPUT_ONLY_VIOLATION');
if (hasAdc2 && hasInputOnly) {
  console.log('  -> PASS: Conflict engine accurately caught ADC2 and Input-only violations!');
} else {
  console.error('  -> FAIL: Conflict engine failed to flag expected errors!');
  process.exit(1);
}

console.log('\nALL MATH SANITY CHECKS PASSED SUCCESSFULLY!');
