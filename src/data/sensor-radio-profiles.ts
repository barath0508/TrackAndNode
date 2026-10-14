export interface HardwareSensorProfile {
  id: string;
  name: string;
  interface: 'I2C' | 'SPI' | 'ADC' | 'UART';
  activeCurrentMa: number;
  readDurationMs: number;
  sleepCurrentUa: number;
  defaultI2cAddressHex?: string;
  description: string;
}

export interface HardwareRadioProfile {
  id: string;
  name: string;
  txCurrentMa: number;
  typicalBurstDurationMs: number;
  description: string;
  frequencyBand: string;
}

export const SENSOR_PROFILES: HardwareSensorProfile[] = [
  {
    id: 'bme280',
    name: 'Bosch BME280 (Temp/Hum/Press)',
    interface: 'I2C',
    activeCurrentMa: 1.8,
    readDurationMs: 15,
    sleepCurrentUa: 0.2,
    defaultI2cAddressHex: '0x76',
    description: 'Precision environmental sensor with 15ms sampling duration.',
  },
  {
    id: 'sht31',
    name: 'Sensirion SHT31 (Temp/Hum)',
    interface: 'I2C',
    activeCurrentMa: 1.5,
    readDurationMs: 12,
    sleepCurrentUa: 0.1,
    defaultI2cAddressHex: '0x44',
    description: 'High-accuracy temperature and humidity sensor.',
  },
  {
    id: 'mpu6050',
    name: 'InvenSense MPU-6050 (6-DOF IMU)',
    interface: 'I2C',
    activeCurrentMa: 3.9,
    readDurationMs: 25,
    sleepCurrentUa: 5.0,
    defaultI2cAddressHex: '0x68',
    description: 'Triple-axis accelerometer and gyro; default 7-bit address 0x68.',
  },
  {
    id: 'ds3231',
    name: 'Maxim DS3231 (Precision RTC)',
    interface: 'I2C',
    activeCurrentMa: 0.2,
    readDurationMs: 5,
    sleepCurrentUa: 0.8,
    defaultI2cAddressHex: '0x68',
    description: 'Real-time clock module sharing default 0x68 address on I2C.',
  },
  {
    id: 'mq135',
    name: 'MQ-135 Gas / Air Quality Sensor',
    interface: 'ADC',
    activeCurrentMa: 150, // heater current
    readDurationMs: 50,
    sleepCurrentUa: 0,
    description: 'Requires analog ADC input; high heater current requires power gating.',
  },
  {
    id: 'hc-sr04',
    name: 'HC-SR04 Ultrasonic Distance',
    interface: 'ADC', // pulse echo
    activeCurrentMa: 15,
    readDurationMs: 30,
    sleepCurrentUa: 0,
    description: '5V ultrasonic sensor requiring digital trigger output and echo input.',
  },
];

export const RADIO_PROFILES: HardwareRadioProfile[] = [
  {
    id: 'esp32-wifi',
    name: 'ESP32 802.11b/g/n Wi-Fi Burst',
    txCurrentMa: 180,
    typicalBurstDurationMs: 120,
    description: 'Standard 2.4 GHz Wi-Fi beacon transmission and cloud handshake.',
    frequencyBand: '2.4 GHz ISM',
  },
  {
    id: 'sx1262-lora',
    name: 'Semtech SX1262 LoRa (+22dBm)',
    txCurrentMa: 118,
    typicalBurstDurationMs: 65,
    description: 'Sub-GHz LoRa modulation packet burst with high link margin.',
    frequencyBand: '868 / 915 MHz',
  },
  {
    id: 'nrf52-ble',
    name: 'Nordic nRF52 BLE 5.0 Beacon',
    txCurrentMa: 7.5,
    typicalBurstDurationMs: 4,
    description: 'Ultra-fast Bluetooth Low Energy advertisement packet.',
    frequencyBand: '2.4 GHz ISM',
  },
  {
    id: 'zigbee-802-15-4',
    name: 'IEEE 802.15.4 / Zigbee 3.0 Burst',
    txCurrentMa: 28,
    typicalBurstDurationMs: 18,
    description: 'Mesh networking packet burst on ESP32-C6.',
    frequencyBand: '2.4 GHz',
  },
  {
    id: 'quectel-bg95-lte-m',
    name: 'Quectel BG95 Cellular LTE-M',
    txCurrentMa: 260,
    typicalBurstDurationMs: 1800,
    description: 'Cellular uplink burst with network registration handshake.',
    frequencyBand: 'Cellular Band 1-28',
  },
];
