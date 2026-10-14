export type PinCapability =
  | 'DIGITAL_IN'
  | 'DIGITAL_OUT'
  | 'ADC1'
  | 'ADC2'
  | 'I2C'
  | 'SPI'
  | 'UART'
  | 'PWM'
  | 'DAC'
  | 'JTAG'
  | 'USB';

export interface McuPinDefinition {
  pinNumber: number;
  gpio: string;
  label: string;
  capabilities: PinCapability[];
  isInputOnly?: boolean;
  isStrappingPin?: boolean;
  strappingBehavior?: string;
  isReservedFlash?: boolean;
  notes?: string;
  side: 'left' | 'right';
}

export interface McuProfile {
  id: string;
  name: string;
  description: string;
  architecture: string;
  operatingVoltage: number; // 3.3 or 5.0
  activeCurrentMa: number;
  deepSleepCurrentUa: number;
  pins: McuPinDefinition[];
}

export const MCU_PROFILES: McuProfile[] = [
  {
    id: 'esp32-wroom-32',
    name: 'ESP32-WROOM-32 (38-Pin)',
    description: 'Dual-core Xtensa LX6 with Wi-Fi & BLE 4.2. Sensitive to ADC2 radio lockout & strapping pins.',
    architecture: 'Xtensa Dual-Core 32-bit LX6',
    operatingVoltage: 3.3,
    activeCurrentMa: 80,
    deepSleepCurrentUa: 10,
    pins: [
      // Left Side (Pins 1-19)
      { pinNumber: 1, gpio: '3V3', label: '3V3', capabilities: [], side: 'left' },
      { pinNumber: 2, gpio: 'EN', label: 'EN', capabilities: ['DIGITAL_IN'], notes: 'Reset Enable (Pull-up)', side: 'left' },
      { pinNumber: 3, gpio: 'GPIO36', label: 'VP / GPIO36', capabilities: ['DIGITAL_IN', 'ADC1'], isInputOnly: true, side: 'left' },
      { pinNumber: 4, gpio: 'GPIO39', label: 'VN / GPIO39', capabilities: ['DIGITAL_IN', 'ADC1'], isInputOnly: true, side: 'left' },
      { pinNumber: 5, gpio: 'GPIO34', label: 'GPIO34', capabilities: ['DIGITAL_IN', 'ADC1'], isInputOnly: true, side: 'left' },
      { pinNumber: 6, gpio: 'GPIO35', label: 'GPIO35', capabilities: ['DIGITAL_IN', 'ADC1'], isInputOnly: true, side: 'left' },
      { pinNumber: 7, gpio: 'GPIO32', label: 'GPIO32', capabilities: ['DIGITAL_IN', 'DIGITAL_OUT', 'ADC1', 'PWM'], side: 'left' },
      { pinNumber: 8, gpio: 'GPIO33', label: 'GPIO33', capabilities: ['DIGITAL_IN', 'DIGITAL_OUT', 'ADC1', 'PWM'], side: 'left' },
      { pinNumber: 9, gpio: 'GPIO25', label: 'GPIO25', capabilities: ['DIGITAL_IN', 'DIGITAL_OUT', 'ADC2', 'DAC', 'PWM'], notes: 'ADC2 channel busy when Wi-Fi is active', side: 'left' },
      { pinNumber: 10, gpio: 'GPIO26', label: 'GPIO26', capabilities: ['DIGITAL_IN', 'DIGITAL_OUT', 'ADC2', 'DAC', 'PWM'], notes: 'ADC2 channel busy when Wi-Fi is active', side: 'left' },
      { pinNumber: 11, gpio: 'GPIO27', label: 'GPIO27', capabilities: ['DIGITAL_IN', 'DIGITAL_OUT', 'ADC2', 'PWM'], notes: 'ADC2 channel busy when Wi-Fi is active', side: 'left' },
      { pinNumber: 12, gpio: 'GPIO14', label: 'GPIO14 / TMS', capabilities: ['DIGITAL_IN', 'DIGITAL_OUT', 'ADC2', 'SPI', 'PWM', 'JTAG'], side: 'left' },
      { pinNumber: 13, gpio: 'GPIO12', label: 'GPIO12 / TDI', capabilities: ['DIGITAL_IN', 'DIGITAL_OUT', 'ADC2', 'SPI', 'PWM', 'JTAG'], isStrappingPin: true, strappingBehavior: 'Flash voltage select (VDD_SDIO 3.3V vs 1.8V). High at boot may brick flash.', side: 'left' },
      { pinNumber: 14, gpio: 'GND', label: 'GND', capabilities: [], side: 'left' },
      { pinNumber: 15, gpio: 'GPIO13', label: 'GPIO13 / TCK', capabilities: ['DIGITAL_IN', 'DIGITAL_OUT', 'ADC2', 'SPI', 'PWM', 'JTAG'], side: 'left' },
      { pinNumber: 16, gpio: 'GPIO9', label: 'GPIO9 / D2', capabilities: [], isReservedFlash: true, notes: 'Reserved for internal SPI Flash', side: 'left' },
      { pinNumber: 17, gpio: 'GPIO10', label: 'GPIO10 / D3', capabilities: [], isReservedFlash: true, notes: 'Reserved for internal SPI Flash', side: 'left' },
      { pinNumber: 18, gpio: 'GPIO11', label: 'GPIO11 / CMD', capabilities: [], isReservedFlash: true, notes: 'Reserved for internal SPI Flash', side: 'left' },
      { pinNumber: 19, gpio: 'VIN', label: 'VIN (5V)', capabilities: [], side: 'left' },

      // Right Side (Pins 20-38)
      { pinNumber: 20, gpio: 'GPIO6', label: 'GPIO6 / CLK', capabilities: [], isReservedFlash: true, notes: 'Reserved for internal SPI Flash', side: 'right' },
      { pinNumber: 21, gpio: 'GPIO7', label: 'GPIO7 / D0', capabilities: [], isReservedFlash: true, notes: 'Reserved for internal SPI Flash', side: 'right' },
      { pinNumber: 22, gpio: 'GPIO8', label: 'GPIO8 / D1', capabilities: [], isReservedFlash: true, notes: 'Reserved for internal SPI Flash', side: 'right' },
      { pinNumber: 23, gpio: 'GPIO15', label: 'GPIO15 / TDO', capabilities: ['DIGITAL_IN', 'DIGITAL_OUT', 'ADC2', 'SPI', 'PWM', 'JTAG'], isStrappingPin: true, strappingBehavior: 'Boot silent debug output enable (pulled high by default)', side: 'right' },
      { pinNumber: 24, gpio: 'GPIO2', label: 'GPIO2', capabilities: ['DIGITAL_IN', 'DIGITAL_OUT', 'ADC2', 'PWM'], isStrappingPin: true, strappingBehavior: 'Boot mode select (must be floating or LOW during flashing)', side: 'right' },
      { pinNumber: 25, gpio: 'GPIO0', label: 'GPIO0', capabilities: ['DIGITAL_IN', 'DIGITAL_OUT', 'ADC2', 'PWM'], isStrappingPin: true, strappingBehavior: 'Boot mode / UART download mode select (pull low to flash)', side: 'right' },
      { pinNumber: 26, gpio: 'GPIO4', label: 'GPIO4', capabilities: ['DIGITAL_IN', 'DIGITAL_OUT', 'ADC2', 'PWM'], side: 'right' },
      { pinNumber: 27, gpio: 'GPIO16', label: 'GPIO16 / RX2', capabilities: ['DIGITAL_IN', 'DIGITAL_OUT', 'UART', 'PWM'], side: 'right' },
      { pinNumber: 28, gpio: 'GPIO17', label: 'GPIO17 / TX2', capabilities: ['DIGITAL_IN', 'DIGITAL_OUT', 'UART', 'PWM'], side: 'right' },
      { pinNumber: 29, gpio: 'GPIO5', label: 'GPIO5 / CS', capabilities: ['DIGITAL_IN', 'DIGITAL_OUT', 'SPI', 'PWM'], side: 'right' },
      { pinNumber: 30, gpio: 'GPIO18', label: 'GPIO18 / SCK', capabilities: ['DIGITAL_IN', 'DIGITAL_OUT', 'SPI', 'PWM'], side: 'right' },
      { pinNumber: 31, gpio: 'GPIO19', label: 'GPIO19 / MISO', capabilities: ['DIGITAL_IN', 'DIGITAL_OUT', 'SPI', 'PWM'], side: 'right' },
      { pinNumber: 32, gpio: 'GND', label: 'GND', capabilities: [], side: 'right' },
      { pinNumber: 33, gpio: 'GPIO21', label: 'GPIO21 / SDA', capabilities: ['DIGITAL_IN', 'DIGITAL_OUT', 'I2C', 'PWM'], side: 'right' },
      { pinNumber: 34, gpio: 'GPIO3', label: 'GPIO3 / RX0', capabilities: ['DIGITAL_IN', 'DIGITAL_OUT', 'UART'], side: 'right' },
      { pinNumber: 35, gpio: 'GPIO1', label: 'GPIO1 / TX0', capabilities: ['DIGITAL_IN', 'DIGITAL_OUT', 'UART'], side: 'right' },
      { pinNumber: 36, gpio: 'GPIO22', label: 'GPIO22 / SCL', capabilities: ['DIGITAL_IN', 'DIGITAL_OUT', 'I2C', 'PWM'], side: 'right' },
      { pinNumber: 37, gpio: 'GPIO23', label: 'GPIO23 / MOSI', capabilities: ['DIGITAL_IN', 'DIGITAL_OUT', 'SPI', 'PWM'], side: 'right' },
      { pinNumber: 38, gpio: 'GND', label: 'GND', capabilities: [], side: 'right' },
    ],
  },
  {
    id: 'esp32-c6',
    name: 'ESP32-C6-DevKitC-1',
    description: 'RISC-V single-core 160MHz MCU with Wi-Fi 6, Zigbee 3.0, and Thread / IEEE 802.15.4.',
    architecture: 'RISC-V 32-bit Single-Core',
    operatingVoltage: 3.3,
    activeCurrentMa: 35,
    deepSleepCurrentUa: 7,
    pins: [
      { pinNumber: 1, gpio: '3V3', label: '3V3', capabilities: [], side: 'left' },
      { pinNumber: 2, gpio: 'EN', label: 'EN', capabilities: ['DIGITAL_IN'], side: 'left' },
      { pinNumber: 3, gpio: 'GPIO0', label: 'GPIO0', capabilities: ['DIGITAL_IN', 'DIGITAL_OUT', 'ADC1', 'PWM'], side: 'left' },
      { pinNumber: 4, gpio: 'GPIO1', label: 'GPIO1', capabilities: ['DIGITAL_IN', 'DIGITAL_OUT', 'ADC1', 'PWM'], side: 'left' },
      { pinNumber: 5, gpio: 'GPIO2', label: 'GPIO2', capabilities: ['DIGITAL_IN', 'DIGITAL_OUT', 'ADC1', 'PWM'], side: 'left' },
      { pinNumber: 6, gpio: 'GPIO3', label: 'GPIO3', capabilities: ['DIGITAL_IN', 'DIGITAL_OUT', 'ADC1', 'PWM'], side: 'left' },
      { pinNumber: 7, gpio: 'GPIO4', label: 'GPIO4', capabilities: ['DIGITAL_IN', 'DIGITAL_OUT', 'ADC1', 'PWM', 'I2C'], side: 'left' },
      { pinNumber: 8, gpio: 'GPIO5', label: 'GPIO5', capabilities: ['DIGITAL_IN', 'DIGITAL_OUT', 'ADC1', 'PWM', 'I2C'], side: 'left' },
      { pinNumber: 9, gpio: 'GPIO6', label: 'GPIO6', capabilities: ['DIGITAL_IN', 'DIGITAL_OUT', 'PWM', 'SPI'], side: 'left' },
      { pinNumber: 10, gpio: 'GPIO7', label: 'GPIO7', capabilities: ['DIGITAL_IN', 'DIGITAL_OUT', 'PWM', 'SPI'], side: 'left' },
      { pinNumber: 11, gpio: 'GND', label: 'GND', capabilities: [], side: 'left' },

      { pinNumber: 12, gpio: 'GPIO8', label: 'GPIO8', capabilities: ['DIGITAL_IN', 'DIGITAL_OUT', 'PWM'], isStrappingPin: true, strappingBehavior: 'Strapping pin (SDIO/SPI boot mode). Pull high by default.', side: 'right' },
      { pinNumber: 13, gpio: 'GPIO9', label: 'GPIO9', capabilities: ['DIGITAL_IN', 'DIGITAL_OUT', 'PWM'], isStrappingPin: true, strappingBehavior: 'Boot mode strapping pin. Determines ROM boot vs download boot.', side: 'right' },
      { pinNumber: 14, gpio: 'GPIO12', label: 'GPIO12', capabilities: ['DIGITAL_IN', 'DIGITAL_OUT', 'PWM', 'USB'], side: 'right' },
      { pinNumber: 15, gpio: 'GPIO13', label: 'GPIO13', capabilities: ['DIGITAL_IN', 'DIGITAL_OUT', 'PWM', 'USB'], side: 'right' },
      { pinNumber: 16, gpio: 'GPIO16', label: 'GPIO16', capabilities: ['DIGITAL_IN', 'DIGITAL_OUT', 'UART', 'PWM'], side: 'right' },
      { pinNumber: 17, gpio: 'GPIO17', label: 'GPIO17', capabilities: ['DIGITAL_IN', 'DIGITAL_OUT', 'UART', 'PWM'], side: 'right' },
      { pinNumber: 18, gpio: 'GPIO18', label: 'GPIO18', capabilities: ['DIGITAL_IN', 'DIGITAL_OUT', 'PWM', 'SPI'], side: 'right' },
      { pinNumber: 19, gpio: 'GPIO19', label: 'GPIO19', capabilities: ['DIGITAL_IN', 'DIGITAL_OUT', 'PWM', 'SPI'], side: 'right' },
      { pinNumber: 20, gpio: 'GPIO21', label: 'GPIO21', capabilities: ['DIGITAL_IN', 'DIGITAL_OUT', 'PWM', 'I2C'], side: 'right' },
      { pinNumber: 21, gpio: 'GPIO22', label: 'GPIO22', capabilities: ['DIGITAL_IN', 'DIGITAL_OUT', 'PWM', 'I2C'], side: 'right' },
      { pinNumber: 22, gpio: '5V', label: '5V / VBUS', capabilities: [], side: 'right' },
    ],
  },
  {
    id: 'esp32-s3',
    name: 'ESP32-S3-DevKitC-1',
    description: 'Dual-core Xtensa LX7 with vector instructions for AI, native USB OTG, and 45 programmable GPIOs.',
    architecture: 'Xtensa Dual-Core 32-bit LX7 + Vector',
    operatingVoltage: 3.3,
    activeCurrentMa: 65,
    deepSleepCurrentUa: 8,
    pins: [
      { pinNumber: 1, gpio: '3V3', label: '3V3', capabilities: [], side: 'left' },
      { pinNumber: 2, gpio: 'GPIO1', label: 'GPIO1', capabilities: ['DIGITAL_IN', 'DIGITAL_OUT', 'ADC1', 'PWM'], side: 'left' },
      { pinNumber: 3, gpio: 'GPIO2', label: 'GPIO2', capabilities: ['DIGITAL_IN', 'DIGITAL_OUT', 'ADC1', 'PWM'], side: 'left' },
      { pinNumber: 4, gpio: 'GPIO3', label: 'GPIO3', capabilities: ['DIGITAL_IN', 'DIGITAL_OUT', 'ADC1', 'PWM'], isStrappingPin: true, strappingBehavior: 'JTAG control strapping pin', side: 'left' },
      { pinNumber: 5, gpio: 'GPIO4', label: 'GPIO4', capabilities: ['DIGITAL_IN', 'DIGITAL_OUT', 'ADC1', 'PWM'], side: 'left' },
      { pinNumber: 6, gpio: 'GPIO5', label: 'GPIO5', capabilities: ['DIGITAL_IN', 'DIGITAL_OUT', 'ADC1', 'PWM'], side: 'left' },
      { pinNumber: 7, gpio: 'GPIO6', label: 'GPIO6', capabilities: ['DIGITAL_IN', 'DIGITAL_OUT', 'ADC1', 'PWM'], side: 'left' },
      { pinNumber: 8, gpio: 'GPIO7', label: 'GPIO7', capabilities: ['DIGITAL_IN', 'DIGITAL_OUT', 'ADC1', 'PWM'], side: 'left' },
      { pinNumber: 9, gpio: 'GPIO8', label: 'GPIO8', capabilities: ['DIGITAL_IN', 'DIGITAL_OUT', 'ADC1', 'PWM', 'I2C'], side: 'left' },
      { pinNumber: 10, gpio: 'GPIO9', label: 'GPIO9', capabilities: ['DIGITAL_IN', 'DIGITAL_OUT', 'ADC1', 'PWM', 'I2C'], side: 'left' },
      { pinNumber: 11, gpio: 'GND', label: 'GND', capabilities: [], side: 'left' },

      { pinNumber: 12, gpio: 'GPIO10', label: 'GPIO10', capabilities: ['DIGITAL_IN', 'DIGITAL_OUT', 'ADC1', 'PWM', 'SPI'], side: 'right' },
      { pinNumber: 13, gpio: 'GPIO11', label: 'GPIO11', capabilities: ['DIGITAL_IN', 'DIGITAL_OUT', 'ADC2', 'PWM', 'SPI'], notes: 'ADC2 busy with Wi-Fi active', side: 'right' },
      { pinNumber: 14, gpio: 'GPIO12', label: 'GPIO12', capabilities: ['DIGITAL_IN', 'DIGITAL_OUT', 'ADC2', 'PWM', 'SPI'], notes: 'ADC2 busy with Wi-Fi active', side: 'right' },
      { pinNumber: 15, gpio: 'GPIO13', label: 'GPIO13', capabilities: ['DIGITAL_IN', 'DIGITAL_OUT', 'ADC2', 'PWM', 'SPI'], notes: 'ADC2 busy with Wi-Fi active', side: 'right' },
      { pinNumber: 16, gpio: 'GPIO14', label: 'GPIO14', capabilities: ['DIGITAL_IN', 'DIGITAL_OUT', 'ADC2', 'PWM'], notes: 'ADC2 busy with Wi-Fi active', side: 'right' },
      { pinNumber: 17, gpio: 'GPIO19', label: 'GPIO19 / USB D-', capabilities: ['DIGITAL_IN', 'DIGITAL_OUT', 'PWM'], side: 'right' },
      { pinNumber: 18, gpio: 'GPIO20', label: 'GPIO20 / USB D+', capabilities: ['DIGITAL_IN', 'DIGITAL_OUT', 'PWM'], side: 'right' },
      { pinNumber: 19, gpio: 'GPIO43', label: 'GPIO43 / U0TX', capabilities: ['DIGITAL_IN', 'DIGITAL_OUT', 'UART'], side: 'right' },
      { pinNumber: 20, gpio: 'GPIO44', label: 'GPIO44 / U0RX', capabilities: ['DIGITAL_IN', 'DIGITAL_OUT', 'UART'], side: 'right' },
      { pinNumber: 21, gpio: '5V', label: '5V', capabilities: [], side: 'right' },
    ],
  },
  {
    id: 'stm32f103c8',
    name: 'STM32F103C8T6 (BluePill)',
    description: 'Arm Cortex-M3 72MHz microcontroller with 64KB Flash and robust multi-bus hardware peripherals.',
    architecture: 'ARM Cortex-M3 32-bit',
    operatingVoltage: 3.3,
    activeCurrentMa: 28,
    deepSleepCurrentUa: 3.5,
    pins: [
      { pinNumber: 1, gpio: 'PB12', label: 'PB12 / NSS2', capabilities: ['DIGITAL_IN', 'DIGITAL_OUT', 'SPI', 'PWM'], side: 'left' },
      { pinNumber: 2, gpio: 'PB13', label: 'PB13 / SCK2', capabilities: ['DIGITAL_IN', 'DIGITAL_OUT', 'SPI', 'PWM'], side: 'left' },
      { pinNumber: 3, gpio: 'PB14', label: 'PB14 / MISO2', capabilities: ['DIGITAL_IN', 'DIGITAL_OUT', 'SPI', 'PWM'], side: 'left' },
      { pinNumber: 4, gpio: 'PB15', label: 'PB15 / MOSI2', capabilities: ['DIGITAL_IN', 'DIGITAL_OUT', 'SPI', 'PWM'], side: 'left' },
      { pinNumber: 5, gpio: 'PA8', label: 'PA8 / MCO', capabilities: ['DIGITAL_IN', 'DIGITAL_OUT', 'PWM'], side: 'left' },
      { pinNumber: 6, gpio: 'PA9', label: 'PA9 / TX1', capabilities: ['DIGITAL_IN', 'DIGITAL_OUT', 'UART', 'PWM'], side: 'left' },
      { pinNumber: 7, gpio: 'PA10', label: 'PA10 / RX1', capabilities: ['DIGITAL_IN', 'DIGITAL_OUT', 'UART', 'PWM'], side: 'left' },
      { pinNumber: 8, gpio: 'PA11', label: 'PA11 / USB D-', capabilities: ['DIGITAL_IN', 'DIGITAL_OUT', 'PWM'], side: 'left' },
      { pinNumber: 9, gpio: 'PA12', label: 'PA12 / USB D+', capabilities: ['DIGITAL_IN', 'DIGITAL_OUT', 'PWM'], side: 'left' },
      { pinNumber: 10, gpio: '3V3', label: '3.3V', capabilities: [], side: 'left' },
      { pinNumber: 11, gpio: 'GND', label: 'GND', capabilities: [], side: 'left' },

      { pinNumber: 12, gpio: 'PB6', label: 'PB6 / SCL1', capabilities: ['DIGITAL_IN', 'DIGITAL_OUT', 'I2C', 'PWM'], side: 'right' },
      { pinNumber: 13, gpio: 'PB7', label: 'PB7 / SDA1', capabilities: ['DIGITAL_IN', 'DIGITAL_OUT', 'I2C', 'PWM'], side: 'right' },
      { pinNumber: 14, gpio: 'PB8', label: 'PB8 / SCL1_ALT', capabilities: ['DIGITAL_IN', 'DIGITAL_OUT', 'I2C', 'PWM'], side: 'right' },
      { pinNumber: 15, gpio: 'PB9', label: 'PB9 / SDA1_ALT', capabilities: ['DIGITAL_IN', 'DIGITAL_OUT', 'I2C', 'PWM'], side: 'right' },
      { pinNumber: 16, gpio: 'PA0', label: 'PA0 / ADC0', capabilities: ['DIGITAL_IN', 'DIGITAL_OUT', 'ADC1', 'PWM'], side: 'right' },
      { pinNumber: 17, gpio: 'PA1', label: 'PA1 / ADC1', capabilities: ['DIGITAL_IN', 'DIGITAL_OUT', 'ADC1', 'PWM'], side: 'right' },
      { pinNumber: 18, gpio: 'PA2', label: 'PA2 / TX2', capabilities: ['DIGITAL_IN', 'DIGITAL_OUT', 'ADC1', 'UART', 'PWM'], side: 'right' },
      { pinNumber: 19, gpio: 'PA3', label: 'PA3 / RX2', capabilities: ['DIGITAL_IN', 'DIGITAL_OUT', 'ADC1', 'UART', 'PWM'], side: 'right' },
      { pinNumber: 20, gpio: 'PA4', label: 'PA4 / SPI1_NSS', capabilities: ['DIGITAL_IN', 'DIGITAL_OUT', 'ADC1', 'SPI', 'PWM'], side: 'right' },
      { pinNumber: 21, gpio: '5V', label: '5V', capabilities: [], side: 'right' },
    ],
  },
  {
    id: 'arduino-uno-r4',
    name: 'Arduino UNO R4 Minima',
    description: 'Renesas RA4M1 (Arm Cortex-M4 @ 48MHz) with 5V operational logic and 14-bit ADC.',
    architecture: 'Renesas RA4M1 32-bit Cortex-M4',
    operatingVoltage: 5.0,
    activeCurrentMa: 45,
    deepSleepCurrentUa: 15,
    pins: [
      { pinNumber: 1, gpio: 'D0', label: 'D0 / RX', capabilities: ['DIGITAL_IN', 'DIGITAL_OUT', 'UART'], side: 'left' },
      { pinNumber: 2, gpio: 'D1', label: 'D1 / TX', capabilities: ['DIGITAL_IN', 'DIGITAL_OUT', 'UART'], side: 'left' },
      { pinNumber: 3, gpio: 'D2', label: 'D2', capabilities: ['DIGITAL_IN', 'DIGITAL_OUT'], side: 'left' },
      { pinNumber: 4, gpio: 'D3', label: 'D3 / PWM', capabilities: ['DIGITAL_IN', 'DIGITAL_OUT', 'PWM'], side: 'left' },
      { pinNumber: 5, gpio: 'D4', label: 'D4', capabilities: ['DIGITAL_IN', 'DIGITAL_OUT'], side: 'left' },
      { pinNumber: 6, gpio: 'D5', label: 'D5 / PWM', capabilities: ['DIGITAL_IN', 'DIGITAL_OUT', 'PWM'], side: 'left' },
      { pinNumber: 7, gpio: 'D6', label: 'D6 / PWM', capabilities: ['DIGITAL_IN', 'DIGITAL_OUT', 'PWM'], side: 'left' },
      { pinNumber: 8, gpio: 'D7', label: 'D7', capabilities: ['DIGITAL_IN', 'DIGITAL_OUT'], side: 'left' },

      { pinNumber: 9, gpio: 'D8', label: 'D8', capabilities: ['DIGITAL_IN', 'DIGITAL_OUT'], side: 'right' },
      { pinNumber: 10, gpio: 'D9', label: 'D9 / PWM', capabilities: ['DIGITAL_IN', 'DIGITAL_OUT', 'PWM'], side: 'right' },
      { pinNumber: 11, gpio: 'D10', label: 'D10 / CS', capabilities: ['DIGITAL_IN', 'DIGITAL_OUT', 'SPI', 'PWM'], side: 'right' },
      { pinNumber: 12, gpio: 'D11', label: 'D11 / MOSI', capabilities: ['DIGITAL_IN', 'DIGITAL_OUT', 'SPI', 'PWM'], side: 'right' },
      { pinNumber: 13, gpio: 'D12', label: 'D12 / MISO', capabilities: ['DIGITAL_IN', 'DIGITAL_OUT', 'SPI'], side: 'right' },
      { pinNumber: 14, gpio: 'D13', label: 'D13 / SCK', capabilities: ['DIGITAL_IN', 'DIGITAL_OUT', 'SPI'], side: 'right' },
      { pinNumber: 15, gpio: 'A4', label: 'A4 / SDA', capabilities: ['DIGITAL_IN', 'DIGITAL_OUT', 'ADC1', 'I2C'], side: 'right' },
      { pinNumber: 16, gpio: 'A5', label: 'A5 / SCL', capabilities: ['DIGITAL_IN', 'DIGITAL_OUT', 'ADC1', 'I2C'], side: 'right' },
    ],
  },
];
