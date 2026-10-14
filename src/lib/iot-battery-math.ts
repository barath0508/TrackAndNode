export interface IotPowerInput {
  batteryCapacityMah: number;
  usableFraction: number;          // 0.70 (Coin cell) to 0.90 (LiFePO4)
  annualSelfDischargeRate: number; // e.g., 0.02 (2% per year for LiFePO4, 0.12 for LiPo)
  regulatorQuiescentUa: number;    // e.g., 2.5 uA for HT7333, 50 uA for AMS1117
  regulatorEfficiency: number;     // 0.80 to 0.96
  sleepCurrentUa: number;          // e.g., 10 uA for ESP32, 7 uA for ESP32-C6
  wakeSensorCurrentMa: number;     // MCU active + sensor polling current (mA)
  wakeSensorDurationMs: number;    // Duration of sensor read (ms)
  txCurrentMa: number;             // Radio TX/RX burst current (mA)
  txDurationMs: number;            // Time on air / connection handshake (ms)
  wakeIntervalSeconds: number;     // Total cycle period (s)
}

export interface IotPowerOutput {
  averageCurrentMa: number;
  averageCurrentUa: number;
  sleepDutyCyclePercent: number;
  estimatedHours: number;
  estimatedDays: number;
  estimatedYears: number;
  dailyChargeConsumedMah: number;
  energyBreakdownPercent: {
    sleep: number;
    sensorWake: number;
    radioTx: number;
    regulatorOverhead: number;
  };
  warnings: string[];
}

export function calculateIotBatteryLife(input: IotPowerInput): IotPowerOutput {
  const tWakeSec = Math.max(0.0001, input.wakeSensorDurationMs / 1000);
  const tTxSec = Math.max(0.0001, input.txDurationMs / 1000);
  const totalPeriodSec = Math.max(input.wakeIntervalSeconds, tWakeSec + tTxSec + 0.001);
  const tSleepSec = Math.max(0, totalPeriodSec - tWakeSec - tTxSec);

  const iSleepMa = input.sleepCurrentUa / 1000;
  const iQuiescentMa = input.regulatorQuiescentUa / 1000;
  const eff = Math.min(1, Math.max(0.1, input.regulatorEfficiency));

  const sleepChargeMas = (iSleepMa * tSleepSec) / eff;
  const sensorChargeMas = (input.wakeSensorCurrentMa * tWakeSec) / eff;
  const txChargeMas = (input.txCurrentMa * tTxSec) / eff;
  const regChargeMas = iQuiescentMa * totalPeriodSec;

  const totalCycleChargeMas = sleepChargeMas + sensorChargeMas + txChargeMas + regChargeMas;
  const averageCurrentMa = totalCycleChargeMas / totalPeriodSec;

  const selfDischargeCurrentMa =
    (input.batteryCapacityMah * Math.max(0, input.annualSelfDischargeRate)) / 8760;

  const effectiveCapacityMah = input.batteryCapacityMah * input.usableFraction;
  const totalDrainMa = averageCurrentMa + selfDischargeCurrentMa;

  const estimatedHours = totalDrainMa > 0 ? effectiveCapacityMah / totalDrainMa : 0;
  const estimatedDays = estimatedHours / 24;
  const estimatedYears = estimatedDays / 365.25;

  const warnings: string[] = [];
  if (input.regulatorQuiescentUa > 30) {
    warnings.push(
      `High LDO Quiescent Drain (${input.regulatorQuiescentUa} µA): Switching from a standard linear regulator (like AMS1117) to an ultra-low-quiescent LDO (like MCP1700 or HT7333) will drastically increase standby battery life.`
    );
  }
  if (input.txCurrentMa > 150 && input.batteryCapacityMah < 300) {
    warnings.push(
      `Peak Current Warning (${input.txCurrentMa} mA): High radio TX bursts on small coin-cell or micro-LiPo batteries cause severe voltage sag. Add a 100 µF–470 µF low-ESR bulk capacitor across VCC/GND.`
    );
  }

  return {
    averageCurrentMa,
    averageCurrentUa: averageCurrentMa * 1000,
    sleepDutyCyclePercent: (tSleepSec / totalPeriodSec) * 100,
    estimatedHours,
    estimatedDays,
    estimatedYears,
    dailyChargeConsumedMah: averageCurrentMa * 24,
    energyBreakdownPercent: {
      sleep: totalCycleChargeMas > 0 ? (sleepChargeMas / totalCycleChargeMas) * 100 : 0,
      sensorWake: totalCycleChargeMas > 0 ? (sensorChargeMas / totalCycleChargeMas) * 100 : 0,
      radioTx: totalCycleChargeMas > 0 ? (txChargeMas / totalCycleChargeMas) * 100 : 0,
      regulatorOverhead: totalCycleChargeMas > 0 ? (regChargeMas / totalCycleChargeMas) * 100 : 0,
    },
    warnings,
  };
}
