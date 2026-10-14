import { McuProfile } from '../data/mcu-profiles';

export interface AssignedPeripheral {
  id: string;
  name: string;
  type:
    | 'I2C_SDA'
    | 'I2C_SCL'
    | 'SPI_MOSI'
    | 'SPI_MISO'
    | 'SPI_SCK'
    | 'SPI_CS'
    | 'UART_TX'
    | 'UART_RX'
    | 'PWM'
    | 'ADC'
    | 'GPIO_IN'
    | 'GPIO_OUT';
  busId?: string; // 'Wire0', 'Wire1', 'SPI0', 'SPI1'
  i2cAddressHex?: string; // e.g. '0x68', '0x76'
  gpio: string; // e.g. 'GPIO21'
}

export type ConflictSeverity = 'ERROR' | 'WARNING';

export interface ConflictDiagnostic {
  severity: ConflictSeverity;
  ruleCode:
    | 'DIRECT_COLLISION'
    | 'I2C_ADDRESS_COLLISION'
    | 'ADC2_WIFI_CONFLICT'
    | 'INPUT_ONLY_VIOLATION'
    | 'STRAPPING_HAZARD'
    | 'FLASH_PIN_RESERVED';
  affectedPins: string[];
  title: string;
  remediation: string;
}

export interface PinoutEvaluationResult {
  diagnostics: ConflictDiagnostic[];
  hasBlockingErrors: boolean;
  pinStatusMap: Record<
    string,
    {
      assigned: AssignedPeripheral[];
      hasError: boolean;
      hasWarning: boolean;
    }
  >;
  generatedHeaderCode: string;
}

export function evaluatePinoutConflicts(
  mcu: McuProfile,
  assignments: AssignedPeripheral[],
  isWifiRadioActive: boolean
): PinoutEvaluationResult {
  const diagnostics: ConflictDiagnostic[] = [];
  const pinStatusMap: Record<
    string,
    {
      assigned: AssignedPeripheral[];
      hasError: boolean;
      hasWarning: boolean;
    }
  > = {};

  // Initialize pin status map
  mcu.pins.forEach((p) => {
    pinStatusMap[p.gpio] = { assigned: [], hasError: false, hasWarning: false };
  });

  // Assign peripherals to their target pins
  assignments.forEach((a) => {
    if (pinStatusMap[a.gpio]) {
      pinStatusMap[a.gpio].assigned.push(a);
    }
  });

  // Rule 1 & Flash check: Direct Pin Collisions and Flash Pins
  assignments.forEach((a) => {
    const pinDef = mcu.pins.find((p) => p.gpio === a.gpio);
    if (pinDef?.isReservedFlash) {
      if (pinStatusMap[a.gpio]) pinStatusMap[a.gpio].hasError = true;
      diagnostics.push({
        severity: 'ERROR',
        ruleCode: 'FLASH_PIN_RESERVED',
        affectedPins: [a.gpio],
        title: `Reserved Flash Memory Pin: ${a.gpio}`,
        remediation: `${a.gpio} is internally connected to SPI flash memory. External connection will cause CPU reboot loop (Cache disabled exception).`,
      });
    }
  });

  Object.entries(pinStatusMap).forEach(([gpio, data]) => {
    if (data.assigned.length > 1) {
      const isAllI2c = data.assigned.every(
        (a) => a.type === 'I2C_SDA' || a.type === 'I2C_SCL'
      );
      if (!isAllI2c) {
        data.hasError = true;
        diagnostics.push({
          severity: 'ERROR',
          ruleCode: 'DIRECT_COLLISION',
          affectedPins: [gpio],
          title: `Direct Pin Collision on ${gpio}`,
          remediation: `Multiple non-shared peripherals (${data.assigned
            .map((a) => a.name)
            .join(', ')}) are mapped to ${gpio}. Move one to an unallocated GPIO.`,
        });
      }
    }
  });

  // Rule 2: I2C Address Collisions on shared bus
  const i2cByBus: Record<string, AssignedPeripheral[]> = {};
  assignments
    .filter((a) => a.type === 'I2C_SDA')
    .forEach((a) => {
      const bus = a.busId || 'Wire0';
      if (!i2cByBus[bus]) i2cByBus[bus] = [];
      i2cByBus[bus].push(a);
    });

  Object.entries(i2cByBus).forEach(([bus, devices]) => {
    const addrMap: Record<string, string[]> = {};
    devices.forEach((d) => {
      const addr = (d.i2cAddressHex || '0x68').toLowerCase();
      if (!addrMap[addr]) addrMap[addr] = [];
      addrMap[addr].push(d.name);
    });

    Object.entries(addrMap).forEach(([addr, names]) => {
      if (names.length > 1) {
        const affectedGpios = devices.map((d) => d.gpio);
        affectedGpios.forEach((g) => {
          if (pinStatusMap[g]) pinStatusMap[g].hasError = true;
        });
        diagnostics.push({
          severity: 'ERROR',
          ruleCode: 'I2C_ADDRESS_COLLISION',
          affectedPins: affectedGpios,
          title: `I2C Address Collision on ${bus} (${addr})`,
          remediation: `Devices [${names.join(
            ', '
          )}] share 7-bit hex address ${addr} on ${bus}. Set the hardware AD0 pin high or move one device to a secondary I2C bus.`,
        });
      }
    });
  });

  // Rule 3: ADC2 + Wi-Fi Conflict
  if (isWifiRadioActive && (mcu.id.includes('esp32') || mcu.id.includes('esp32-s3'))) {
    assignments
      .filter((a) => a.type === 'ADC')
      .forEach((a) => {
        const pinDef = mcu.pins.find((p) => p.gpio === a.gpio);
        if (pinDef && pinDef.capabilities.includes('ADC2')) {
          if (pinStatusMap[a.gpio]) pinStatusMap[a.gpio].hasError = true;
          diagnostics.push({
            severity: 'ERROR',
            ruleCode: 'ADC2_WIFI_CONFLICT',
            affectedPins: [a.gpio],
            title: `ADC2 Hardware Lockout on ${a.gpio}`,
            remediation: `${a.gpio} uses the SAR ADC2 block, which is locked by Wi-Fi/Bluetooth baseband hardware when the radio is active. Reassign this analog input to an ADC1 pin.`,
          });
        }
      });
  }

  // Rule 4: Input-Only Pin Drive Violations
  assignments.forEach((a) => {
    const pinDef = mcu.pins.find((p) => p.gpio === a.gpio);
    if (pinDef && pinDef.isInputOnly) {
      const isOutput = a.type !== 'ADC' && a.type !== 'GPIO_IN';
      if (isOutput) {
        if (pinStatusMap[a.gpio]) pinStatusMap[a.gpio].hasError = true;
        diagnostics.push({
          severity: 'ERROR',
          ruleCode: 'INPUT_ONLY_VIOLATION',
          affectedPins: [a.gpio],
          title: `Output Driven on Input-Only Pin ${a.gpio}`,
          remediation: `${a.gpio} on ${mcu.name} lacks internal output push-pull FET circuitry. It cannot drive PWM, SPI MOSI, or I2C clock/data lines.`,
        });
      }
    }
  });

  // Rule 5: Strapping Pin Boot Hazards
  assignments.forEach((a) => {
    const pinDef = mcu.pins.find((p) => p.gpio === a.gpio);
    if (pinDef && pinDef.isStrappingPin) {
      if (pinStatusMap[a.gpio] && !pinStatusMap[a.gpio].hasError) {
        pinStatusMap[a.gpio].hasWarning = true;
      }
      diagnostics.push({
        severity: 'WARNING',
        ruleCode: 'STRAPPING_HAZARD',
        affectedPins: [a.gpio],
        title: `Strapping Pin Assigned: ${a.gpio}`,
        remediation: `${a.gpio} samples voltage level during reset (${
          pinDef.strappingBehavior || 'boot mode select'
        }). Verify that connected external circuitry does not pull this pin into an unwanted boot state.`,
      });
    }
  });

  const hasBlockingErrors = diagnostics.some((d) => d.severity === 'ERROR');

  // Auto-generate clean C++ header
  const generatedHeaderCode = `/**
 * ============================================================================
 * @file       pin_config.h
 * @brief      Deterministic Pin Allocations Generated by TrackAndNode (trackandnode.dev)
 * @target     ${mcu.name} (${mcu.architecture})
 * @status     ${hasBlockingErrors ? 'INVALID - RESOLVE BLOCKING CONFLICTS' : 'VERIFIED CLEAN'}
 * ============================================================================
 */

#pragma once

#include <stdint.h>

#define TARGET_MCU "${mcu.name}"
#define MCU_OPERATING_VOLTAGE ${mcu.operatingVoltage.toFixed(1)}f

// Peripheral Pin Assignments
${assignments
  .map((a) => {
    const pinDef = mcu.pins.find((p) => p.gpio === a.gpio);
    const strapNotice = pinDef?.isStrappingPin
      ? ` // WARNING: Boot Strapping Pin (${pinDef.strappingBehavior})`
      : '';
    const cleanName = a.name.toUpperCase().replace(/[^A-Z0-9_]/g, '_');
    return `#define PIN_${cleanName} ${a.gpio.replace('GPIO', '')}${strapNotice}`;
  })
  .join('\n')}

// Bus Configuration Macros
${assignments
  .filter((a) => a.type === 'I2C_SDA')
  .map((a) => `#define I2C_BUS_ADDR_${a.name.toUpperCase().replace(/[^A-Z0-9_]/g, '_')} ${a.i2cAddressHex || '0x68'}`)
  .join('\n')}
`;

  return {
    diagnostics,
    hasBlockingErrors,
    pinStatusMap,
    generatedHeaderCode,
  };
}
