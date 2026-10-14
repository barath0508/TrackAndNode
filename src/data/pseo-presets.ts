// src/data/pseo-presets.ts
import { IotPowerInput } from '../lib/iot-battery-math';
import { PatchAntennaInput } from '../lib/patch-antenna-math';
import { AssignedPeripheral } from '../lib/pinout-conflict-engine';

export interface IotPresetSeo {
  slug: string;
  toolCategory: 'iot-battery';
  h1Title: string;
  metaTitle: string; // Strictly 50-60 characters
  metaDescription: string; // Strictly 145-160 characters
  primaryKeyword: string;
  secondaryKeywords: string[];
  targetMcuName: string;
  batteryChemistryName: string;
  wirelessProtocolName: string;
  relatedRfSlug: string;
  relatedPinoutSlug: string;
  initialParams: {
    batteryCapacityMah: number;
    usableFraction: number;
    annualSelfDischargeRate: number;
    regulatorQuiescentUa: number;
    regulatorEfficiency: number;
    sleepCurrentUa: number;
    wakeSensorCurrentMa: number;
    wakeSensorDurationMs: number;
    txCurrentMa: number;
    txDurationMs: number;
    wakeIntervalSeconds: number;
  };
  hardwareDesignNote: string;
  // UI & compatibility aliases
  title?: string;
  h1?: string;
  badge?: string;
  summary?: string;
  inputs?: IotPowerInput;
  tradeOffRows?: {
    parameter: string;
    baseline: string;
    variant: string;
    impact: string;
  }[];
  faqs?: {
    question: string;
    answer: string;
  }[];
}

export interface RfPresetSeo {
  slug: string;
  toolCategory: 'patch-antenna';
  h1Title: string;
  metaTitle: string;
  metaDescription: string;
  primaryKeyword: string;
  secondaryKeywords: string[];
  bandApplicationName: string;
  substrateMaterialName: string;
  relatedIotSlug: string;
  relatedPinoutSlug: string;
  initialParams: {
    frequencyGhz: number;
    dielectricConstant: number;
    substrateHeightMm: number;
    targetImpedanceOhm: number;
  };
  rfLayoutNote: string;
  // UI & compatibility aliases
  title?: string;
  h1?: string;
  badge?: string;
  summary?: string;
  inputs?: PatchAntennaInput;
  tradeOffRows?: {
    parameter: string;
    baseline: string;
    variant: string;
    impact: string;
  }[];
  faqs?: {
    question: string;
    answer: string;
  }[];
}

export interface PinoutPresetSeo {
  slug: string;
  toolCategory: 'pinout-checker';
  h1Title: string;
  metaTitle: string;
  metaDescription: string;
  primaryKeyword: string;
  secondaryKeywords: string[];
  boardId: string;
  defaultPeripherals: string[];
  relatedIotSlug: string;
  relatedRfSlug: string;
  hardwareErrataNote: string;
  // UI & compatibility aliases
  title?: string;
  h1?: string;
  badge?: string;
  summary?: string;
  mcuId?: string;
  isWifiRadioActive?: boolean;
  assignments?: AssignedPeripheral[];
  tradeOffRows?: {
    parameter: string;
    baseline: string;
    variant: string;
    impact: string;
  }[];
  faqs?: {
    question: string;
    answer: string;
  }[];
}

export const IOT_BATTERY_PRESETS: IotPresetSeo[] = [
  {
    slug: 'esp32-deep-sleep-18650-battery-life-calculator',
    toolCategory: 'iot-battery',
    h1Title: 'ESP32 Deep Sleep 18650 Battery Life & Duty-Cycle Calculator',
    metaTitle: 'ESP32 Deep Sleep 18650 Battery Life Calculator (With LDO Drain)',
    metaDescription: 'Calculate exact ESP32 deep sleep battery life on a 3000mAh 18650 cell. Models Wi-Fi TX bursts, LDO quiescent current (AMS1117 vs HT7333), and wake intervals.',
    primaryKeyword: 'esp32 deep sleep battery life calculator',
    secondaryKeywords: ['esp32 18650 battery life', 'esp32 power consumption calculator', 'ams1117 quiescent current esp32', 'esp32 wifi tx current draw'],
    targetMcuName: 'ESP32-WROOM-32D',
    batteryChemistryName: 'Li-Ion 18650 (3.7V 3000mAh)',
    wirelessProtocolName: 'Wi-Fi 802.11b/g/n (DHCP + MQTT Publish)',
    relatedRfSlug: '2-4ghz-wifi-ble-fr4-microstrip-patch-antenna-calculator',
    relatedPinoutSlug: 'esp32-wroom-32-i2c-spi-adc2-wifi-pinout-checker',
    initialParams: {
      batteryCapacityMah: 3000,
      usableFraction: 0.85,
      annualSelfDischargeRate: 0.05,
      regulatorQuiescentUa: 7.0,
      regulatorEfficiency: 0.90,
      sleepCurrentUa: 10.0,
      wakeSensorCurrentMa: 35.0,
      wakeSensorDurationMs: 120,
      txCurrentMa: 240.0,
      txDurationMs: 1800,
      wakeIntervalSeconds: 600,
    },
    hardwareDesignNote: 'Standard ESP32 DevKit boards use the AMS1117-3.3 regulator which draws 5,000 µA to 10,000 µA continuously in deep sleep. To achieve multi-year 18650 battery life, use an HT7333-A, MCP1700, or TPS62740 buck converter with quiescent current under 7 µA and assign static IP configuration to reduce Wi-Fi association time from 2.5s to 350ms.',
    title: 'ESP32 Deep Sleep 18650 Battery Life Calculator',
    h1: 'ESP32 Deep Sleep 18650 Battery Life & Duty-Cycle Calculator',
    badge: 'ESP32 + 18650',
    summary: 'Models ESP32 deep sleep current down to 10µA, active sensor acquisition, and 240mA Wi-Fi uplink bursts from a 3000mAh 18650 lithium-ion cell with LDO derating.',
    inputs: {
      batteryCapacityMah: 3000,
      usableFraction: 0.85,
      annualSelfDischargeRate: 0.05,
      regulatorQuiescentUa: 7.0,
      regulatorEfficiency: 0.90,
      sleepCurrentUa: 10.0,
      wakeSensorCurrentMa: 35.0,
      wakeSensorDurationMs: 120,
      txCurrentMa: 240.0,
      txDurationMs: 1800,
      wakeIntervalSeconds: 600,
    },
    tradeOffRows: [
      { parameter: 'Wake Interval', baseline: '10 Minutes (600s)', variant: '60 Minutes (3600s)', impact: 'Sleep time fraction increases from 99.6% to 99.9%, extending cell life by 410%' },
      { parameter: 'LDO Quiescent', baseline: 'HT7333 (7 µA Iq)', variant: 'AMS1117 (5000 µA Iq)', impact: 'Quiescent drain overpowers sleep floor, slashing runtime from 3.2 years to 24 days' },
      { parameter: 'IP Configuration', baseline: 'Static IP (350 ms TX)', variant: 'DHCP Sync (1800 ms TX)', impact: 'DHCP radio air-time consumes 5.1x more charge per beacon event' },
      { parameter: 'Battery Chemistry', baseline: 'Li-Ion 18650 (3000 mAh)', variant: 'LiFePO4 (1500 mAh)', impact: 'Lower nominal capacity but flatter 3.2V discharge plateau allows direct regulation' },
    ],
    faqs: [
      {
        question: 'Why does DHCP negotiation drastically shorten ESP32 battery life?',
        answer: 'DHCP discovery, offer, and lease confirmation force the RF power amplifier to remain energized for 1.2 to 2.5 seconds at 240 mA. By caching a static IP, gateway address, and subnet in RTC slow memory, firmware completes UDP or MQTT transmission in under 350 ms, saving up to 80% of active cycle energy.',
      },
      {
        question: 'What is the best ultra-low-quiescent LDO for ESP32 battery nodes?',
        answer: 'Popular development boards use the AMS1117-3.3, which consumes 5 mA to 10 mA of quiescent leakage continuously. For true multi-year deployments, replace it with a Holtek HT7333-A (1.5–4 µA Iq, 250 mA peak), Microchip MCP1700 (1.6 µA Iq), or Texas Instruments TPS62740 ultra-low-power buck converter.',
      },
      {
        question: 'How do I prevent the ESP32 brownout detector from triggering on 18650 cells?',
        answer: 'Instantaneous 2.4 GHz Wi-Fi calibration bursts cause current spikes exceeding 350 mA. To prevent internal VDD from dipping below the 2.43V brownout threshold, solder a 100 µF to 220 µF low-ESR polymer or tantalum capacitor directly across the 3V3 and GND pins of the ESP32 module.',
      },
      {
        question: 'How does ambient cold temperature affect 18650 cell longevity?',
        answer: 'At temperatures below 0°C, the electrochemical reaction rate of standard lithium-ion cells slows significantly and internal impedance rises from ~40 mΩ to over 250 mΩ. Under a 240 mA transmission pulse, this causes severe IR voltage drop and cuts usable capacity by 20% to 35%.',
      },
    ],
  },
  {
    slug: 'esp32-c6-zigbee-thread-cr2032-coin-cell-battery-calculator',
    toolCategory: 'iot-battery',
    h1Title: 'ESP32-C6 Zigbee & Thread Coin Cell (CR2032 / CR2477) Battery Estimator',
    metaTitle: 'ESP32-C6 Zigbee & Thread Battery Life Calculator (CR2032)',
    metaDescription: 'Model ESP32-C6 802.15.4 Zigbee and Thread sleepy end-device battery life on CR2032 or CR2477 coin cells. Accounts for pulse impedance derating and deep sleep.',
    primaryKeyword: 'esp32-c6 zigbee battery life calculator',
    secondaryKeywords: ['esp32-c6 power consumption', 'zigbee end device battery calculator', 'thread matter battery life estimator', 'cr2032 iot pulse current'],
    targetMcuName: 'ESP32-C6 (RISC-V + 802.15.4)',
    batteryChemistryName: 'CR2477 Lithium Coin Cell (1000mAh)',
    wirelessProtocolName: 'IEEE 802.15.4 Zigbee / Thread (15 ms TX Burst)',
    relatedRfSlug: '2-4ghz-wifi-ble-fr4-microstrip-patch-antenna-calculator',
    relatedPinoutSlug: 'esp32-c6-devkitc-1-strapping-pins-i2c-spi-checker',
    initialParams: {
      batteryCapacityMah: 1000,
      usableFraction: 0.72,
      annualSelfDischargeRate: 0.01,
      regulatorQuiescentUa: 1.5,
      regulatorEfficiency: 0.94,
      sleepCurrentUa: 7.0,
      wakeSensorCurrentMa: 22.0,
      wakeSensorDurationMs: 25,
      txCurrentMa: 85.0,
      txDurationMs: 18,
      wakeIntervalSeconds: 300,
    },
    hardwareDesignNote: 'Unlike Wi-Fi which requires 1.5 to 3 seconds of association overhead, IEEE 802.15.4 (Zigbee/Thread) on the ESP32-C6 transmits a complete sensor payload and receives a MAC ACK in under 20 milliseconds. Always buffer lithium coin cells with a 100 µF MLCC or tantalum capacitor to prevent brownout resets during the 85 mA radio TX peak.',
    title: 'ESP32-C6 Zigbee & Thread Coin Cell Battery Estimator',
    h1: 'ESP32-C6 Zigbee & Thread Coin Cell (CR2032 / CR2477) Battery Estimator',
    badge: 'ESP32-C6 + Coin Cell',
    summary: 'The ESP32-C6 integrates a high-efficiency 802.15.4 Zigbee/Thread radio. Powered by high-capacity CR2477 or CR2032 coin cells, sleepy end-devices achieve multi-year lifespans.',
    inputs: {
      batteryCapacityMah: 1000,
      usableFraction: 0.72,
      annualSelfDischargeRate: 0.01,
      regulatorQuiescentUa: 1.5,
      regulatorEfficiency: 0.94,
      sleepCurrentUa: 7.0,
      wakeSensorCurrentMa: 22.0,
      wakeSensorDurationMs: 25,
      txCurrentMa: 85.0,
      txDurationMs: 18,
      wakeIntervalSeconds: 300,
    },
    tradeOffRows: [
      { parameter: 'Protocol Overhead', baseline: 'IEEE 802.15.4 (18 ms TX)', variant: 'Wi-Fi 6 (450 ms TX)', impact: 'Short radio air-time reduces active duty energy per packet by 96%' },
      { parameter: 'Coin Cell Model', baseline: 'CR2477 (1000 mAh)', variant: 'CR2032 (225 mAh)', impact: 'CR2477 delivers 4.4x longer run-time and tolerates higher peak discharge pulses' },
      { parameter: 'Buffer Capacitance', baseline: '100 µF Low-ESR MLCC', variant: 'No Buffer Cap', impact: 'Internal battery resistance (15-30Ω) causes severe droop without buffer cap' },
      { parameter: 'Reporting Cadence', baseline: '5 Minutes (300s)', variant: '1 Minute (60s)', impact: 'Increasing report frequency from 5m to 1m decreases longevity by 78%' },
    ],
    faqs: [
      {
        question: 'Can a single CR2032 coin cell power an ESP32-C6 directly?',
        answer: 'Yes, provided peak radio pulses are buffered. A fresh CR2032 delivers 3.0V, but its internal series resistance (ESR) is 15 Ω to 30 Ω. Drawing 85 mA during TX causes an instantaneous voltage drop of ΔV = I × R ≈ 1.7V, dropping below the 2.2V threshold. Adding a 100 µF MLCC capacitor buffers the burst.',
      },
      {
        question: 'Why is Thread/Zigbee vastly more battery efficient than Wi-Fi on ESP32-C6?',
        answer: 'Wi-Fi requires TCP/IP handshakes, DHCP leasing, and four-way WPA security handshakes totaling hundreds of milliseconds. In contrast, IEEE 802.15.4 sleepy end-devices wake, transmit a short 6LoWPAN or Zigbee frame, receive a hardware ACK, and return to sleep in 15 ms to 20 ms.',
      },
      {
        question: 'What is the deep sleep current of the ESP32-C6 RISC-V core?',
        answer: 'In deep sleep with the LP-timer active and RTC memory retained, the ESP32-C6 draws approximately 7 µA. When combined with an ultra-low quiescent regulator (1.5 µA), the quiescent floor is under 9 µA.',
      },
      {
        question: 'What is the advantage of CR2477 over standard CR2032?',
        answer: 'CR2477 cells provide 1,000 mAh capacity in a 24.5 mm diameter × 7.7 mm package, compared to 225 mAh for a CR2032. Furthermore, the larger electrode surface area cuts internal ESR in half, reducing pulse voltage droop.',
      },
    ],
  },
  {
    slug: 'lora-sx1262-esp32-weather-station-solar-battery-calculator',
    toolCategory: 'iot-battery',
    h1Title: 'LoRaWAN SX1262 + ESP32-S3 Off-Grid Sensor Node Power Calculator',
    metaTitle: 'LoRa SX1262 & ESP32 Battery Life Calculator (SF7 to SF12)',
    metaDescription: 'Calculate LoRaWAN SX1262 and ESP32 sensor node battery life across Spreading Factors SF7 to SF12. Compare time-on-air current drain on LiFePO4 and LiPo cells.',
    primaryKeyword: 'lora sx1262 battery life calculator',
    secondaryKeywords: ['lorawan power consumption calculator', 'sx1262 vs sx1276 current draw', 'lifepo4 iot battery calculator', 'spreading factor battery impact'],
    targetMcuName: 'ESP32-S3 + Semtech SX1262 LoRa Transceiver',
    batteryChemistryName: 'LiFePO4 3.2V 18650 (1500mAh Direct Drive)',
    wirelessProtocolName: 'LoRaWAN Class A (SF9, +22 dBm TX, RX1/RX2 Windows)',
    relatedRfSlug: '915mhz-lora-ism-microstrip-patch-antenna-calculator',
    relatedPinoutSlug: 'esp32-s3-camera-spi-i2c-pin-conflict-checker',
    initialParams: {
      batteryCapacityMah: 1500,
      usableFraction: 0.88,
      annualSelfDischargeRate: 0.02,
      regulatorQuiescentUa: 0.5,
      regulatorEfficiency: 0.98,
      sleepCurrentUa: 8.5,
      wakeSensorCurrentMa: 18.0,
      wakeSensorDurationMs: 80,
      txCurrentMa: 118.0,
      txDurationMs: 390,
      wakeIntervalSeconds: 900,
    },
    hardwareDesignNote: 'A 3.2V LiFePO4 cell operates directly within the 2.7V–3.6V supply window of both the ESP32-S3 and Semtech SX1262, allowing you to eliminate the voltage regulator entirely (zero quiescent LDO loss). Keep Spreading Factor at SF7 or SF9 whenever link budget permits; jumping to SF12 increases Time-on-Air by 8x and reduces battery life proportionally.',
    title: 'LoRaWAN SX1262 + ESP32-S3 Sensor Node Power Calculator',
    h1: 'LoRaWAN SX1262 + ESP32-S3 Off-Grid Sensor Node Power Calculator',
    badge: 'ESP32-S3 + LoRa SX1262',
    summary: 'Calculates LoRaWAN Class A sensor node energy consumption using Semtech SX1262 with Spreading Factors SF7 to SF12, factoring in direct-drive LiFePO4 battery chemistry.',
    inputs: {
      batteryCapacityMah: 1500,
      usableFraction: 0.88,
      annualSelfDischargeRate: 0.02,
      regulatorQuiescentUa: 0.5,
      regulatorEfficiency: 0.98,
      sleepCurrentUa: 8.5,
      wakeSensorCurrentMa: 18.0,
      wakeSensorDurationMs: 80,
      txCurrentMa: 118.0,
      txDurationMs: 390,
      wakeIntervalSeconds: 900,
    },
    tradeOffRows: [
      { parameter: 'Spreading Factor', baseline: 'SF7 (56 ms Air Time)', variant: 'SF12 (1482 ms Air Time)', impact: 'SF12 extends link margin by 12 dB but increases TX air-time and drain by 26.5x' },
      { parameter: 'Supply Topology', baseline: 'LiFePO4 Direct Drive (3.2V)', variant: 'LiPo + LDO (3.7V to 3.3V)', impact: 'Direct drive eliminates LDO quiescent dissipation, increasing system efficiency to 98%' },
      { parameter: 'TX Output Power', baseline: '+14 dBm (45 mA)', variant: '+22 dBm (118 mA)', impact: 'Maximum power doubles transmission current draw; use Adaptive Data Rate (ADR)' },
      { parameter: 'Reporting Cadence', baseline: '15 Minutes (900s)', variant: '60 Minutes (3600s)', impact: 'Extends 1500 mAh LiFePO4 operating longevity from 4.1 years to over 9.5 years' },
    ],
    faqs: [
      {
        question: 'Why is LiFePO4 ideal for direct-drive ESP32 and SX1262 designs?',
        answer: 'Lithium Iron Phosphate (LiFePO4) discharges almost entirely between 3.25V and 3.0V, perfectly matching the 2.7V to 3.6V maximum operating range of the ESP32-S3 and SX1262. Eliminating a linear LDO or buck converter removes all regulator quiescent drain and converts 100% of cell capacity into telemetry.',
      },
      {
        question: 'How does LoRa Spreading Factor (SF) impact Time-on-Air and battery consumption?',
        answer: 'Each step in Spreading Factor (e.g., SF7 to SF8) doubles the chirp symbol duration. A 20-byte payload at SF7 on 125 kHz bandwidth takes ~56 ms, while at SF12 it takes ~1,482 ms. At 118 mA transmit current, an SF12 packet consumes 26 times more energy than an SF7 packet.',
      },
      {
        question: 'What is the current draw difference between Semtech SX1262 and older SX1276/78?',
        answer: 'The SX1262 includes an integrated high-efficiency DC-DC step-down buck converter. At +14 dBm output power, the SX1262 draws ~45 mA, compared to ~90 mA for the older SX1276/78 transceivers.',
      },
      {
        question: 'Should I enable LoRaWAN Adaptive Data Rate (ADR)?',
        answer: 'Yes, for stationary sensor nodes. ADR allows the LoRaWAN network server to command the node to decrease its spreading factor and transmit power when link signal quality (SNR) is strong, preserving battery life.',
      },
    ],
  },
  {
    slug: 'nrf52840-ble-beacon-cr2032-battery-life-calculator',
    toolCategory: 'iot-battery',
    h1Title: 'Nordic nRF52840 BLE Advertising Beacon CR2032 Battery Calculator',
    metaTitle: 'nRF52840 BLE Beacon CR2032 Battery Life Calculator',
    metaDescription: 'Compute Nordic nRF52840 and nRF52832 Bluetooth Low Energy (BLE 5.4) beacon battery life on a 225mAh CR2032 coin cell with internal DC/DC converter enabled.',
    primaryKeyword: 'nrf52840 battery life calculator',
    secondaryKeywords: ['ble beacon cr2032 battery life', 'nrf52832 power consumption calculator', 'bluetooth advertising interval battery'],
    targetMcuName: 'Nordic nRF52840 (Cortex-M4F with Internal DC/DC)',
    batteryChemistryName: 'CR2032 3V Coin Cell (225mAh)',
    wirelessProtocolName: 'BLE 5.0 Non-Connectable Advertising (3 Channels, 0 dBm)',
    relatedRfSlug: '2-4ghz-wifi-ble-fr4-microstrip-patch-antenna-calculator',
    relatedPinoutSlug: 'stm32-bluepill-i2c-spi-pwm-pinout-conflict-checker',
    initialParams: {
      batteryCapacityMah: 225,
      usableFraction: 0.75,
      annualSelfDischargeRate: 0.01,
      regulatorQuiescentUa: 0.5,
      regulatorEfficiency: 0.92,
      sleepCurrentUa: 2.3,
      wakeSensorCurrentMa: 4.5,
      wakeSensorDurationMs: 3,
      txCurrentMa: 6.4,
      txDurationMs: 3.5,
      wakeIntervalSeconds: 2,
    },
    hardwareDesignNote: 'Enabling the internal DCDCEN register on the nRF52840 reduces 0 dBm radio transmit current from 10.5 mA down to 4.8 mA at 3.0V supply. Increasing the BLE advertising interval from 100 ms to 1000 ms extends CR2032 longevity from 2 months to over 2.5 years.',
    title: 'Nordic nRF52840 BLE Beacon CR2032 Battery Calculator',
    h1: 'Nordic nRF52840 BLE Advertising Beacon CR2032 Battery Calculator',
    badge: 'nRF52840 + CR2032',
    summary: 'Simulates non-connectable BLE 5.0 advertising beacons across 3 primary channels (37, 38, 39) on a 225mAh CR2032 coin cell with DC/DC enabled.',
    inputs: {
      batteryCapacityMah: 225,
      usableFraction: 0.75,
      annualSelfDischargeRate: 0.01,
      regulatorQuiescentUa: 0.5,
      regulatorEfficiency: 0.92,
      sleepCurrentUa: 2.3,
      wakeSensorCurrentMa: 4.5,
      wakeSensorDurationMs: 3,
      txCurrentMa: 6.4,
      txDurationMs: 3.5,
      wakeIntervalSeconds: 2,
    },
    tradeOffRows: [
      { parameter: 'Advertising Interval', baseline: '1000 ms (1 Hz)', variant: '100 ms (10 Hz)', impact: 'Decreases battery life from 2.8 years to 3.4 months due to 10x higher transmit frequency' },
      { parameter: 'Internal DC/DC Converter', baseline: 'Enabled (DCDCEN=1)', variant: 'LDO Mode (DCDCEN=0)', impact: 'Enabling DC/DC cuts peak 0 dBm TX current from 10.5 mA to 4.8 mA, saving 54% power' },
      { parameter: 'Radio Output Power', baseline: '0 dBm (4.8 mA)', variant: '+8 dBm (14.2 mA)', impact: 'Maximum +8 dBm boost doubles transmission range but triples active pulse energy' },
      { parameter: 'Advertising Channels', baseline: '3 Channels (37, 38, 39)', variant: 'Single Channel (37)', impact: 'Reduces broadcast energy by 66% but degrades BLE scanner packet capture probability' },
    ],
    faqs: [
      {
        question: 'How do I activate the internal DC-DC converter on the Nordic nRF52840?',
        answer: 'By default after reset, the nRF52840 operates using internal LDO regulators. You must execute `NRF_POWER->DCDCEN = 1;` in your firmware initialization and populate the external LC filter components (10 µH inductor and 47 nF capacitor) specified in the Nordic reference circuit.',
      },
      {
        question: 'What is the optimal BLE advertising interval for asset tracking tags?',
        answer: 'For moving asset tracking where fast detection is required, an interval of 500 ms to 1000 ms balances battery longevity (2 to 3 years on CR2032) with rapid scanner discovery. For stationary environmental beacons, an interval of 2000 ms to 5000 ms extends life to 5+ years.',
      },
      {
        question: 'Why do coin cell batteries require usable capacity derating?',
        answer: 'CR2032 nominal capacity is rated at a continuous 0.2 mA drain down to 2.0V cutoff. Under pulsed RF transmission (5–15 mA), internal polarization and resistance lead to premature voltage cutoffs, reducing actual usable capacity to 70%–75%.',
      },
      {
        question: 'What is System ON vs System OFF sleep mode on nRF52840?',
        answer: 'In System ON low-power mode with RTC wake timer running and RAM retention, the nRF52840 draws 1.5 µA to 2.3 µA. In System OFF mode (wakeable only via external GPIO or NFC field), current drops to 0.4 µA.',
      },
    ],
  },
  {
    slug: 'stm32l4-ultra-low-power-industrial-sensor-battery-calculator',
    toolCategory: 'iot-battery',
    h1Title: 'STM32L4 Stop-2 Mode Industrial Sensor Node Battery Life Calculator',
    metaTitle: 'STM32L4 Stop 2 Mode Low Power Battery Life Calculator',
    metaDescription: 'Calculate STM32L4 and STM32U5 ultra-low-power battery life using Stop 2 mode (1.1 uA with RTC) paired with RS485 or Sub-GHz radio telemetry.',
    primaryKeyword: 'stm32 low power battery calculator',
    secondaryKeywords: ['stm32l4 stop 2 current draw', 'industrial iot battery life estimator', 'li-socl2 thionyl chloride battery calculator'],
    targetMcuName: 'STM32L476RG (Stop 2 Mode + RTC)',
    batteryChemistryName: 'Li-SOCl2 AA ER14505 (2600mAh 3.6V Primary)',
    wirelessProtocolName: 'Sub-GHz FSK / LoRa Telemetry Burst',
    relatedRfSlug: '868mhz-lora-eu-in-fr4-microstrip-patch-antenna-calculator',
    relatedPinoutSlug: 'stm32-bluepill-i2c-spi-pwm-pinout-conflict-checker',
    initialParams: {
      batteryCapacityMah: 2600,
      usableFraction: 0.85,
      annualSelfDischargeRate: 0.01,
      regulatorQuiescentUa: 1.2,
      regulatorEfficiency: 0.93,
      sleepCurrentUa: 1.4,
      wakeSensorCurrentMa: 8.5,
      wakeSensorDurationMs: 40,
      txCurrentMa: 45.0,
      txDurationMs: 110,
      wakeIntervalSeconds: 1800,
    },
    hardwareDesignNote: 'Lithium Thionyl Chloride (Li-SOCl2) cells offer less than 1% annual self-discharge for 10-year deployments, but develop a lithium-chloride passivation layer during long sleep intervals. Pair the ER14505 cell with a hybrid layer capacitor (HLC) or supercapacitor if radio transmit pulses exceed 50 mA.',
    title: 'STM32L4 Stop 2 Mode Low Power Battery Life Calculator',
    h1: 'STM32L4 Stop-2 Mode Industrial Sensor Node Battery Life Calculator',
    badge: 'STM32L4 + Li-SOCl2',
    summary: 'Calculates industrial telemetry node longevity featuring STM32L4 in Stop 2 mode (1.4µA) with ER14505 3.6V primary lithium cells designed for 10-year field operations.',
    inputs: {
      batteryCapacityMah: 2600,
      usableFraction: 0.85,
      annualSelfDischargeRate: 0.01,
      regulatorQuiescentUa: 1.2,
      regulatorEfficiency: 0.93,
      sleepCurrentUa: 1.4,
      wakeSensorCurrentMa: 8.5,
      wakeSensorDurationMs: 40,
      txCurrentMa: 45.0,
      txDurationMs: 110,
      wakeIntervalSeconds: 1800,
    },
    tradeOffRows: [
      { parameter: 'Low-Power Mode', baseline: 'Stop 2 Mode (1.4 µA)', variant: 'Sleep Mode (1.2 mA)', impact: 'Stop 2 preserves full SRAM while reducing static power dissipation by 99.8%' },
      { parameter: 'Battery Chemistry', baseline: 'Li-SOCl2 (1% self-discharge)', variant: 'Alkaline AA (3% self-discharge)', impact: 'Li-SOCl2 maintains 3.6V nominal plateau and lasts 10+ years without electrolyte leakage' },
      { parameter: 'Telemetry Interval', baseline: '30 Minutes (1800s)', variant: '5 Minutes (300s)', impact: 'Increasing telemetry rate from 30m to 5m cuts operating longevity from 11.2 to 2.8 years' },
      { parameter: 'Sensor Power Gating', baseline: 'High-Side P-FET Gating', variant: 'Continuous Sensor Bias', impact: 'Disconnecting sensor quiescent draw during Stop 2 prevents continuous 50 µA leakage' },
    ],
    faqs: [
      {
        question: 'What is Stop 2 mode on the STM32L4 microcontroller?',
        answer: 'Stop 2 mode achieves the lowest power consumption while retaining SRAM1, SRAM2, and register states. All core clocks are stopped, but the Low-Power Timer (LPTIM) or RTC continues running on the 32.768 kHz LSE oscillator, drawing only 1.1 µA to 1.4 µA at 3.0V with a 5 µs wakeup latency.',
      },
      {
        question: 'What is the voltage passivation phenomenon in Li-SOCl2 batteries?',
        answer: 'Lithium Thionyl Chloride batteries form a passive lithium chloride (LiCl) film on the lithium anode during storage or extended sleep intervals. When an active pulse is suddenly drawn, this film causes a transient voltage dip. Paralleling the cell with a hybrid layer capacitor (HLC) or supercapacitor absorbs the pulse.',
      },
      {
        question: 'How do I power-gate external sensors on an STM32 board?',
        answer: 'Connect sensor VDD to the drain of a logic-level P-channel MOSFET (such as the DMG2305UX) controlled by an STM32 GPIO pin. Pulling the gate LOW energizes the sensor; pulling it HIGH isolates sensor leakage during sleep.',
      },
      {
        question: 'What is the wakeup latency from STM32L4 Stop 2 mode?',
        answer: 'Using the internal multi-speed oscillator (MSI) configured for 48 MHz, the STM32L4 wakes up from Stop 2 mode to execute the first instruction in approximately 5.4 microseconds, minimizing active wakeup energy.',
      },
    ],
  },
];

export const RF_PATCH_PRESETS: RfPresetSeo[] = [
  {
    slug: '2-4ghz-wifi-ble-fr4-microstrip-patch-antenna-calculator',
    toolCategory: 'patch-antenna',
    h1Title: '2.45 GHz Wi-Fi / BLE / Zigbee Microstrip Patch Antenna Calculator (FR-4)',
    metaTitle: '2.4 GHz Microstrip Patch Antenna Calculator (FR-4 1.6mm PCB)',
    metaDescription: 'Design a 2.45 GHz inset-fed microstrip patch antenna on 1.6mm FR-4 (Er=4.4). Get exact W, L, 50-ohm inset notch depth y0, and CST Studio macro scripts.',
    primaryKeyword: '2.4 ghz microstrip patch antenna calculator',
    secondaryKeywords: ['inset fed patch antenna calculator fr4', '2.45 ghz pcb antenna dimensions', 'microstrip inset feed depth calculator', 'cst studio patch antenna macro'],
    bandApplicationName: '2.45 GHz ISM Band (Wi-Fi 4/6, BLE 5.4, Zigbee, Thread)',
    substrateMaterialName: 'Standard 2-Layer FR-4 (Er = 4.4, h = 1.6 mm)',
    relatedIotSlug: 'esp32-deep-sleep-18650-battery-life-calculator',
    relatedPinoutSlug: 'esp32-wroom-32-i2c-spi-adc2-wifi-pinout-checker',
    initialParams: {
      frequencyGhz: 2.45,
      dielectricConstant: 4.4,
      substrateHeightMm: 1.6,
      targetImpedanceOhm: 50,
    },
    rfLayoutNote: 'Standard commercial FR-4 exhibits dielectric constant variation between 4.2 and 4.6 across manufacturers at 2.45 GHz and a loss tangent (tan δ) near 0.020. Always specify impedance-controlled stackup or add 1.5 mm tuning stubs at the radiating edges for VNA prototype trimming.',
    title: '2.45 GHz Wi-Fi / BLE Microstrip Patch Antenna Calculator',
    h1: '2.45 GHz Wi-Fi / BLE / Zigbee Microstrip Patch Antenna Calculator (FR-4)',
    badge: '2.45 GHz FR-4',
    summary: 'Calculates physical patch dimensions (W, L), fringing field extension, and 50Ω inset feed notch depth for 2.45 GHz Wi-Fi and Bluetooth antennas on 1.6mm FR-4.',
    inputs: {
      frequencyGhz: 2.45,
      dielectricConstant: 4.4,
      substrateHeightMm: 1.6,
      targetImpedanceOhm: 50,
    },
    tradeOffRows: [
      { parameter: 'Substrate Material', baseline: 'FR-4 (Er=4.4, tanδ=0.02)', variant: 'Rogers RO4350B (Er=3.48, tanδ=0.0037)', impact: 'Rogers cuts dielectric dissipation loss by 75%, increasing radiation efficiency from 48% to 88%' },
      { parameter: 'Substrate Thickness', baseline: '1.6 mm (62 mil)', variant: '0.8 mm (31 mil)', impact: 'Thinner substrate compresses impedance bandwidth from 2.1% to 1.1%, demanding tighter tolerances' },
      { parameter: 'Ground Plane Width', baseline: 'W + 6h (50 mm)', variant: 'Truncated GND (W + 2h)', impact: 'Truncated ground increases back-lobe radiation and shifts resonance frequency upward by 35 MHz' },
      { parameter: 'Inset Notch Depth', baseline: 'y0 = 8.8 mm (50 Ω)', variant: 'Direct Edge Feed (y0 = 0)', impact: 'Edge feed exhibits 240 Ω input impedance, creating severe VSWR mismatch (> 4.8:1) to 50 Ω lines' },
    ],
    faqs: [
      {
        question: 'Why is FR-4 challenging for 2.45 GHz microstrip patch antennas?',
        answer: 'Commercial FR-4 has a relatively high loss tangent (tan δ ≈ 0.018–0.022) at 2.45 GHz, dissipating roughly 40% to 50% of radiated RF power as heat inside the fiberglass epoxy matrix. Furthermore, batch-to-batch dielectric permittivity varies from 4.2 to 4.6, which can detune resonant center frequency by ±40 MHz.',
      },
      {
        question: 'What is the purpose of the inset notch feed (y0)?',
        answer: 'The radiating edge of a half-wave patch exhibits high input impedance (typically 200 Ω to 300 Ω). By recessing the 50 Ω microstrip feedline into the patch by distance y0, the feed couples to the cosine-distributed internal cavity fields, matching the 50 Ω feedline without requiring external lumped matching components.',
      },
      {
        question: 'How large must the PCB bottom ground plane be?',
        answer: 'For the Balanis cavity model to hold without severe edge diffraction and pattern distortion, the ground plane copper must extend at least 6 times the substrate thickness (6h) beyond all four physical edges of the radiating patch.',
      },
      {
        question: 'How do I tune the antenna after fabricating the first PCB prototype?',
        answer: 'Measure S11 with a calibrated Vector Network Analyzer (VNA). If the resonant dip is too low in frequency, scratch away 0.5 mm increments of copper from the radiating ends (L) with a scalpel. If too high, bridge small copper foil extensions onto the ends.',
      },
    ],
  },
  {
    slug: '5-8ghz-fpv-ism-rogers-4003c-patch-antenna-calculator',
    toolCategory: 'patch-antenna',
    h1Title: '5.8 GHz ISM & Wi-Fi 6E Microstrip Patch Antenna Calculator (Rogers RO4003C)',
    metaTitle: '5.8 GHz Patch Antenna Calculator (Rogers RO4003C & FR-4)',
    metaDescription: 'Calculate 5.8 GHz microstrip patch antenna dimensions on low-loss Rogers RO4003C (Er=3.55). Includes fringing extension ΔL, 50Ω feed width, and ground plane rules.',
    primaryKeyword: '5.8 ghz patch antenna calculator',
    secondaryKeywords: ['rogers 4003c microstrip calculator', '5.8 ghz directional pcb antenna design', 'quarter wave transformer patch antenna calculator'],
    bandApplicationName: '5.8 GHz ISM / UNII-3 / FPV Telemetry Band',
    substrateMaterialName: 'Rogers RO4003C High-Frequency Laminate (Er = 3.55, h = 0.813 mm)',
    relatedIotSlug: 'esp32-deep-sleep-18650-battery-life-calculator',
    relatedPinoutSlug: 'esp32-s3-camera-spi-i2c-pin-conflict-checker',
    initialParams: {
      frequencyGhz: 5.8,
      dielectricConstant: 3.55,
      substrateHeightMm: 0.813,
      targetImpedanceOhm: 50,
    },
    rfLayoutNote: 'At 5.8 GHz, standard FR-4 attenuates radiation efficiency by over 3.5 dB due to dielectric loss. Using 0.813 mm (32 mil) Rogers RO4003C (tan δ = 0.0027) maintains tight permittivity tolerance (±0.05) and doubles radiation efficiency while utilizing standard FR-4 multi-layer lamination processes.',
    title: '5.8 GHz FPV & ISM Patch Antenna Calculator (Rogers RO4003C)',
    h1: '5.8 GHz ISM & Wi-Fi 6E Microstrip Patch Antenna Calculator (Rogers RO4003C)',
    badge: '5.8 GHz RO4003C',
    summary: 'High-frequency microstrip patch antenna calculator optimized for 5.8 GHz FPV video receivers, drone telemetry, and Wi-Fi 6E on Rogers RO4003C substrate.',
    inputs: {
      frequencyGhz: 5.8,
      dielectricConstant: 3.55,
      substrateHeightMm: 0.813,
      targetImpedanceOhm: 50,
    },
    tradeOffRows: [
      { parameter: 'Substrate Loss Tangent', baseline: 'RO4003C (tanδ=0.0027)', variant: 'FR-4 (tanδ=0.022)', impact: 'FR-4 burns 60% of RF power as heat at 5.8 GHz; RO4003C increases antenna gain by +3.2 dBi' },
      { parameter: 'Permittivity Tolerance', baseline: 'RO4003C (±0.05)', variant: 'FR-4 (±0.25)', impact: 'Tight RO4003C tolerance guarantees resonance stays within 5.725–5.875 GHz ISM band without manual trimming' },
      { parameter: 'Substrate Height', baseline: '0.813 mm (32 mil)', variant: '1.524 mm (60 mil)', impact: 'Thicker core widens bandwidth from 160 MHz to 340 MHz but launches unwanted surface wave modes' },
      { parameter: 'Fabrication Process', baseline: 'Standard FR-4 Multilayer Hybrid', variant: 'Pure PTFE Teflon Bond', impact: 'RO4003C behaves mechanically like FR-4 and does not require costly specialized PTFE etching' },
    ],
    faqs: [
      {
        question: 'Why is Rogers RO4003C preferred over FR-4 at 5.8 GHz?',
        answer: 'At 5.8 GHz, FR-4 exhibits an attenuation of ~0.5 dB per inch and an unpredictable dielectric constant that shifts with humidity and temperature. Rogers RO4003C has a loss tangent of 0.0027 (nearly 8x lower than FR-4) and a stable dielectric constant of 3.55 ± 0.05, yielding 85%+ radiation efficiency.',
      },
      {
        question: 'What is the physical size of a 5.8 GHz patch antenna on RO4003C?',
        answer: 'On 0.813 mm RO4003C (εr = 3.55), the physical patch width W is approximately 17.1 mm and the resonant length L is approximately 13.2 mm, making it compact enough for multi-element phased arrays or 4-patch high-gain panels.',
      },
      {
        question: 'How do I prevent surface waves from degrading radiation pattern at 5.8 GHz?',
        answer: 'Surface waves propagate parallel to the substrate and scatter off ground plane edges, generating ripple in the radiation pattern. Keep substrate height h < 0.05 λ0 (under 2.5 mm at 5.8 GHz) and implement ground via stitching fences around the patch boundary spaced λg/10 apart.',
      },
      {
        question: 'Can I design a circular polarized (CP) antenna using this calculator?',
        answer: 'Yes. A square patch calculated with this tool can be converted to Right Hand Circular Polarization (RHCP) for FPV video by truncating two diagonal corners by ΔA = L × sqrt(1 / (2 × Q)) or using dual orthogonal feeds with a 90-degree hybrid coupler.',
      },
    ],
  },
  {
    slug: '915mhz-lora-ism-microstrip-patch-antenna-calculator',
    toolCategory: 'patch-antenna',
    h1Title: '915 MHz US LoRaWAN & UHF RFID Microstrip Patch Antenna Calculator',
    metaTitle: '915 MHz LoRa & UHF RFID Patch Antenna Calculator (PCB CAD)',
    metaDescription: 'Calculate 915 MHz Sub-GHz LoRaWAN and UHF RFID microstrip patch antenna dimensions on 1.6mm FR-4. Includes guided wavelength, edge impedance, and inset feed.',
    primaryKeyword: '915 mhz patch antenna calculator',
    secondaryKeywords: ['lora 915 mhz pcb antenna dimensions', 'uhf rfid patch antenna design calculator', 'sub-ghz microstrip antenna calculator'],
    bandApplicationName: '915 MHz FCC Part 15 ISM (US LoRaWAN / Meshtastic / UHF RFID)',
    substrateMaterialName: 'FR-4 Tg150 (Er = 4.4, h = 1.6 mm)',
    relatedIotSlug: 'lora-sx1262-esp32-weather-station-solar-battery-calculator',
    relatedPinoutSlug: 'esp32-s3-camera-spi-i2c-pin-conflict-checker',
    initialParams: {
      frequencyGhz: 0.915,
      dielectricConstant: 4.4,
      substrateHeightMm: 1.6,
      targetImpedanceOhm: 50,
    },
    rfLayoutNote: 'At 915 MHz, the free-space wavelength λ0 is 327.6 mm, yielding a physical copper patch approximately 99.6 mm wide by 77.6 mm long on FR-4. Ensure the continuous bottom copper ground plane extends at least 6h (9.6 mm) beyond all four edges of the radiating patch to prevent back-lobe distortion.',
    title: '915 MHz LoRaWAN & UHF RFID Microstrip Patch Antenna Calculator',
    h1: '915 MHz US LoRaWAN & UHF RFID Microstrip Patch Antenna Calculator',
    badge: '915 MHz FR-4',
    summary: 'Calculates physical patch dimensions, inset feed, and CST macro parameters for 915 MHz LoRa, Meshtastic, and passive UHF RFID directional antennas.',
    inputs: {
      frequencyGhz: 0.915,
      dielectricConstant: 4.4,
      substrateHeightMm: 1.6,
      targetImpedanceOhm: 50,
    },
    tradeOffRows: [
      { parameter: 'Dielectric Permittivity', baseline: 'FR-4 (Er = 4.4)', variant: 'Ceramic Composite (Er = 10.2)', impact: 'High-permittivity substrate shrinks physical patch area by 55%, reducing board footprint from 100mm to 48mm' },
      { parameter: 'Substrate Height', baseline: '1.6 mm (h/λ0 = 0.0049)', variant: '3.2 mm (h/λ0 = 0.0098)', impact: 'Doubling substrate height widens -10 dB bandwidth from 14 MHz to 29 MHz, covering full 902–928 MHz band' },
      { parameter: 'Ground Plane Extension', baseline: '6h Extension (10 mm)', variant: 'Flush Cut GND (0 mm)', impact: 'Flush ground truncates return currents, degrading forward gain by 2.8 dBi and shifting resonance upward' },
      { parameter: 'Copper Weight', baseline: '1 oz (35 µm)', variant: '2 oz (70 µm)', impact: 'Thicker copper reduces conductor ohmic I²R losses, improving antenna radiation efficiency by 4%' },
    ],
    faqs: [
      {
        question: 'Why is a 915 MHz patch antenna so much larger than a 2.4 GHz patch?',
        answer: 'Patch antenna dimensions scale inversely with operating frequency. At 915 MHz, free-space wavelength λ0 is 327.6 mm compared to 122.4 mm at 2.45 GHz. Consequently, the physical patch on 1.6 mm FR-4 is ~100 mm wide by ~78 mm long.',
      },
      {
        question: 'Does a 1.6 mm FR-4 patch cover the entire US 902–928 MHz ISM band?',
        answer: 'Typically, a single-layer 1.6 mm FR-4 patch has a -10 dB return loss (S11) bandwidth of approximately 1.5% (around 14 MHz). To cover the entire 26 MHz wide US915 band, use a 3.2 mm substrate or introduce parasitic stacked patches.',
      },
      {
        question: 'What gain can I expect from a 915 MHz microstrip patch antenna?',
        answer: 'A single microstrip patch antenna on 1.6 mm FR-4 with an adequate ground plane typically achieves between +5.5 dBi and +6.8 dBi of broadside forward directional gain.',
      },
      {
        question: 'Can this antenna be used for long-range Meshtastic nodes?',
        answer: 'Yes. The directional beam (approx. 70° HPBW in both E-plane and H-plane) provides substantial gain over an omnidirectional dipole, making it ideal for point-to-point Meshtastic repeaters and LoRa gateway links.',
      },
    ],
  },
  {
    slug: '868mhz-lora-eu-in-fr4-microstrip-patch-antenna-calculator',
    toolCategory: 'patch-antenna',
    h1Title: '865–868 MHz Europe & India LoRaWAN Microstrip Patch Antenna Calculator',
    metaTitle: '868 MHz & 865 MHz LoRa Microstrip Patch Antenna Calculator',
    metaDescription: 'Design an 868 MHz (EU868) or 865 MHz (IN865 India) LoRaWAN microstrip patch antenna. Instant W, L, ΔL, and 50Ω inset-feed notch depth calculations.',
    primaryKeyword: '868 mhz patch antenna calculator',
    secondaryKeywords: ['in865 lora antenna calculator', 'eu868 microstrip patch dimensions', '868 mhz pcb antenna design'],
    bandApplicationName: '868 MHz ETSI EU868 & 865–867 MHz WPC IN865 (India LoRa Band)',
    substrateMaterialName: 'Standard FR-4 (Er = 4.4, h = 1.6 mm)',
    relatedIotSlug: 'stm32l4-ultra-low-power-industrial-sensor-battery-calculator',
    relatedPinoutSlug: 'stm32-bluepill-i2c-spi-pwm-pinout-conflict-checker',
    initialParams: {
      frequencyGhz: 0.868,
      dielectricConstant: 4.4,
      substrateHeightMm: 1.6,
      targetImpedanceOhm: 50,
    },
    rfLayoutNote: 'Because 1.6 mm FR-4 represents a small electrical thickness (h/λ0 ≈ 0.0046) at 868 MHz, the instantaneous -10 dB return-loss (S11) bandwidth is narrow (typically 12–16 MHz). If deploying across both IN865 (865–867 MHz) and EU868 (868 MHz), increase substrate thickness to 3.2 mm to widen impedance bandwidth.',
    title: '868 MHz EU & IN LoRaWAN Microstrip Patch Antenna Calculator',
    h1: '865–868 MHz Europe & India LoRaWAN Microstrip Patch Antenna Calculator',
    badge: '868 MHz FR-4',
    summary: 'Calculates physical patch dimensions and inset feed notch depth for European EU868 and Indian IN865 LoRaWAN directional telemetry antennas on FR-4.',
    inputs: {
      frequencyGhz: 0.868,
      dielectricConstant: 4.4,
      substrateHeightMm: 1.6,
      targetImpedanceOhm: 50,
    },
    tradeOffRows: [
      { parameter: 'Band Selection', baseline: '868 MHz (EU868 Band)', variant: '865 MHz (IN865 India Band)', impact: 'Resonant length increases by 0.35 mm; multi-band designs require 3.2 mm substrate height' },
      { parameter: 'Substrate Thickness', baseline: '1.6 mm (h=1.6mm)', variant: '3.2 mm (Dual Core Lamination)', impact: 'Broadens -10 dB bandwidth to comfortably cover both 865 MHz and 868 MHz channels simultaneously' },
      { parameter: 'Feedline Width (W0)', baseline: '3.05 mm (50 Ω Microstrip)', variant: '1.8 mm (75 Ω Coax Match)', impact: 'Narrower trace increases characteristic impedance; always match to output amplifier impedance' },
      { parameter: 'Via Stitching', baseline: 'Stitching along perimeter', variant: 'No Via Stitching', impact: 'Perimeter ground via stitching suppresses cavity edge radiation and stabilizes VSWR performance' },
    ],
    faqs: [
      {
        question: 'Can one patch antenna cover both Indian IN865 (865–867 MHz) and European EU868 (868 MHz)?',
        answer: 'Yes, if the antenna has a 10 dB return-loss bandwidth of at least 4 MHz (spanning 865 to 869 MHz). On standard 1.6 mm FR-4, bandwidth is around 12–14 MHz, comfortably accommodating both allocations when centered at 866.5 MHz.',
      },
      {
        question: 'What is the required 50-ohm microstrip trace feed width on 1.6 mm FR-4?',
        answer: 'For standard FR-4 with εr = 4.4 and h = 1.6 mm, a 50 Ω microstrip trace has a width of approximately 3.05 mm (w/h ≈ 1.91) using the Hammerstad-Jensen transmission line equations.',
      },
      {
        question: 'How do I handle dielectric permittivity tolerance when manufacturing?',
        answer: 'Specify an impedance-controlled fabrication order with ±5% dielectric tolerance (such as Isola 370HR or Shengyi S1000-2) or layout a 1 mm wide capacitive tuning tab at the non-radiating edges that can be trimmed on a test bench.',
      },
      {
        question: 'What polarization does this patch antenna produce?',
        answer: 'A standard rectangular inset-fed patch produces linear polarization parallel to the length (L) of the patch. If communicating with vertically polarized whip antennas, mount the PCB patch vertically.',
      },
    ],
  },
  {
    slug: '1-575ghz-gps-gnss-l1-ceramic-patch-antenna-calculator',
    toolCategory: 'patch-antenna',
    h1Title: '1575.42 MHz GPS L1 / GNSS High-Permittivity Patch Antenna Calculator',
    metaTitle: 'GPS L1 (1575.42 MHz) Microstrip Patch Antenna Calculator',
    metaDescription: 'Calculate GPS L1 (1.57542 GHz) microstrip patch antenna dimensions across high-DK ceramic (Er=9.8 to 20) and Rogers substrates with 50-ohm feed matching.',
    primaryKeyword: 'gps l1 patch antenna calculator',
    secondaryKeywords: ['1575.42 mhz patch antenna design', 'ceramic patch antenna calculator', 'rogers tmm10i patch calculator'],
    bandApplicationName: '1.57542 GHz GPS L1 / Galileo E1 / BeiDou B1C',
    substrateMaterialName: 'Rogers TMM10i Ceramic Thermoset (Er = 9.8, h = 3.175 mm)',
    relatedIotSlug: 'lora-sx1262-esp32-weather-station-solar-battery-calculator',
    relatedPinoutSlug: 'esp32-wroom-32-i2c-spi-adc2-wifi-pinout-checker',
    initialParams: {
      frequencyGhz: 1.57542,
      dielectricConstant: 9.8,
      substrateHeightMm: 3.175,
      targetImpedanceOhm: 50,
    },
    rfLayoutNote: 'High-permittivity ceramic composites (Er = 9.8) shrink the physical GPS L1 patch footprint by nearly 50% compared to FR-4 while thicker substrates (3.175 mm) counteract bandwidth compression. For Right-Hand Circular Polarization (RHCP), truncate two opposite corners of the square patch by Δa = L × sqrt(1 / (2 × Q0)).',
    title: 'GPS L1 (1575.42 MHz) Ceramic Patch Antenna Calculator',
    h1: '1575.42 MHz GPS L1 / GNSS High-Permittivity Patch Antenna Calculator',
    badge: '1.575 GHz Ceramic',
    summary: 'Designs high-permittivity ceramic and Rogers TMM10i GPS L1 (1575.42 MHz) patch antennas with circular polarization corner truncation formulas.',
    inputs: {
      frequencyGhz: 1.57542,
      dielectricConstant: 9.8,
      substrateHeightMm: 3.175,
      targetImpedanceOhm: 50,
    },
    tradeOffRows: [
      { parameter: 'Substrate Permittivity', baseline: 'Ceramic TMM10i (Er = 9.8)', variant: 'Standard FR-4 (Er = 4.4)', impact: 'High permittivity shrinks patch dimensions from 46mm to 30mm, enabling compact wearable designs' },
      { parameter: 'Polarization Mode', baseline: 'RHCP (Diagonal Truncation)', variant: 'Linear Polarization', impact: 'Circular polarization provides 3 dB higher link margin when receiving GPS satellite signals from arbitrary sky angles' },
      { parameter: 'Ground Plane Dimension', baseline: '50 mm × 50 mm Ground', variant: '25 mm × 25 mm Ground', impact: 'Reducing ground plane below 50mm shifts center frequency upward by ~15 MHz and degrades axial ratio' },
      { parameter: 'Axial Ratio Bandwidth', baseline: 'h = 3.175 mm (Thick)', variant: 'h = 1.0 mm (Thin)', impact: 'Thicker substrate broadens circular polarization axial ratio (< 3 dB) bandwidth across thermal swings' },
    ],
    faqs: [
      {
        question: 'Why are commercial GPS patch antennas made of ceramic instead of FR-4?',
        answer: 'High dielectric ceramic materials (such as barium tetratitanate, with εr = 9.8 to 20) significantly reduce the guided wavelength. This allows a 1575.42 MHz patch to measure just 25 mm × 25 mm or 18 mm × 18 mm, compared to 48 mm × 46 mm on standard FR-4, while offering superior thermal temperature stability.',
      },
      {
        question: 'How is Right-Hand Circular Polarization (RHCP) generated from a single feed point?',
        answer: 'By fabricating a square patch and clipping two diagonally opposite corners by a dimension Δc ≈ L / (2 × Q), two orthogonal degenerate modes (TM100 and TM010) are excited with a 90° phase difference, creating pure RHCP.',
      },
      {
        question: 'What causes a GPS patch center frequency to detune in the final enclosure?',
        answer: 'Plastic enclosure housings (ABS, polycarbonate, nylon) have a dielectric constant between 2.5 and 3.5. Placing plastic within 3 mm of the patch surface causes dielectric loading that pulls the resonant frequency down by 5 MHz to 25 MHz.',
      },
      {
        question: 'What is the required return-loss bandwidth for GPS L1?',
        answer: 'The GPS L1 C/A code bandwidth is 2.046 MHz (1574.397 to 1576.443 MHz). If receiving Galileo E1 and BeiDou B1C concurrently, a 10 dB return-loss bandwidth of at least 15 MHz is recommended.',
      },
    ],
  },
];

export const PINOUT_CHECKER_PRESETS: PinoutPresetSeo[] = [
  {
    slug: 'esp32-wroom-32-i2c-spi-adc2-wifi-pinout-checker',
    toolCategory: 'pinout-checker',
    h1Title: 'ESP32-WROOM-32 Interactive Pinout, Strapping Pin & ADC2 Conflict Checker',
    metaTitle: 'ESP32 Pinout Conflict Checker (ADC2 Wi-Fi, Strapping & I2C)',
    metaDescription: 'Verify ESP32-WROOM-32 GPIO assignments before PCB routing. Automatically detects ADC2 + Wi-Fi conflicts, GPIO0/GPIO12 boot strapping hazards, and I2C address collisions.',
    primaryKeyword: 'esp32 pinout conflict checker',
    secondaryKeywords: ['esp32 which pins to use', 'esp32 adc2 wifi conflict', 'esp32 strapping pins gpio 0 2 12 15', 'esp32 i2c spi pin allocator'],
    boardId: 'esp32-wroom-32',
    defaultPeripherals: ['WIFI_RADIO', 'I2C_BME280', 'SPI_SDCARD', 'ADC_BATTERY_DIVIDER'],
    relatedIotSlug: 'esp32-deep-sleep-18650-battery-life-calculator',
    relatedRfSlug: '2-4ghz-wifi-ble-fr4-microstrip-patch-antenna-calculator',
    hardwareErrataNote: 'On the ESP32-WROOM-32, ADC2 channels (GPIO0, 2, 4, 12–15, 25–27) are shared internally with the Wi-Fi RF calibration controller; calling analogRead() while Wi-Fi is active returns invalid readings or triggers a kernel panic. Always connect analog voltage dividers to ADC1 (GPIO32–GPIO39).',
    title: 'ESP32-WROOM-32 Pinout & Hardware Bus Conflict Checker',
    h1: 'ESP32-WROOM-32 Interactive Pinout, Strapping Pin & ADC2 Conflict Checker',
    badge: 'ESP32-WROOM-32',
    summary: 'Evaluates direct GPIO multiplexer contention, SAR ADC2 Wi-Fi lockouts, and boot strapping pin voltage hazards for ESP32-WROOM-32 modules.',
    mcuId: 'esp32-wroom-32',
    isWifiRadioActive: true,
    assignments: [
      { id: '1', name: 'BME280_SDA', type: 'I2C_SDA', busId: 'Wire0', i2cAddressHex: '0x76', gpio: 'GPIO21' },
      { id: '2', name: 'BME280_SCL', type: 'I2C_SCL', busId: 'Wire0', i2cAddressHex: '0x76', gpio: 'GPIO22' },
      { id: '3', name: 'SD_MOSI', type: 'SPI_MOSI', busId: 'SPI0', gpio: 'GPIO23' },
      { id: '4', name: 'SD_MISO', type: 'SPI_MISO', busId: 'SPI0', gpio: 'GPIO19' },
      { id: '5', name: 'SD_SCK', type: 'SPI_SCK', busId: 'SPI0', gpio: 'GPIO18' },
      { id: '6', name: 'SD_CS', type: 'SPI_CS', busId: 'SPI0', gpio: 'GPIO5' },
      { id: '7', name: 'BATTERY_ADC', type: 'ADC', gpio: 'GPIO34' },
    ],
    tradeOffRows: [
      { parameter: 'ADC Channel', baseline: 'ADC1 (GPIO32–39)', variant: 'ADC2 (GPIO25–27)', impact: 'ADC2 conflicts with Wi-Fi baseband hardware, causing sample dropouts' },
      { parameter: 'I2C Bus Wiring', baseline: 'Shared Bus (Different Addr)', variant: 'Dual Devices on 0x68', impact: 'Causes bus contention and NACK errors; require address AD0 toggle' },
      { parameter: 'Input-Only Pins', baseline: 'Sensors / Digital In', variant: 'PWM Servo Output', impact: 'GPIO 34-39 lack output FETs and cannot generate output waveforms' },
      { parameter: 'Strapping Pins', baseline: 'Reserved / Floating', variant: 'Sensor Pull-up', impact: 'External resistor can hold GPIO12 high, forcing flash to 1.8V and bricking boot' },
    ],
    faqs: [
      {
        question: 'Why does analogRead() fail on ESP32 when Wi-Fi is active?',
        answer: 'The ESP32 Wi-Fi driver uses the internal SAR ADC2 for analog RF calibration and AGC loops. When the Wi-Fi radio is active, calls to analogRead() on ADC2 pins return errors. Always route analog sensors to ADC1 (GPIO32 to GPIO39).',
      },
      {
        question: 'Which pins on the ESP32 are input-only?',
        answer: 'GPIO34, GPIO35, GPIO36 (VP), and GPIO39 (VN) are input-only. They have no internal pull-up/pull-down resistors and no output driver circuitry. They cannot be used for PWM, I2C, SPI, or UART transmit.',
      },
      {
        question: 'What are strapping pins and why are they hazardous?',
        answer: 'Strapping pins (like GPIO0, GPIO2, GPIO12, GPIO15 on ESP32) are sampled during power-on reset to determine boot mode (UART download vs flash boot) and flash voltage (3.3V vs 1.8V). Connecting peripherals with external pull resistors can prevent the chip from booting.',
      },
      {
        question: 'How do multiple I2C sensors share the same pins?',
        answer: 'Connect all I2C sensors in parallel to SDA and SCL with a single pair of 4.7k pull-up resistors. As long as their 7-bit hexadecimal addresses differ, firmware addresses each sensor independently.',
      },
    ],
  },
  {
    slug: 'esp32-c6-devkitc-1-strapping-pins-i2c-spi-checker',
    toolCategory: 'pinout-checker',
    h1Title: 'ESP32-C6 Pinout Allocator: LP-UART, Zigbee/Wi-Fi 6 & Strapping Pin Checker',
    metaTitle: 'ESP32-C6 Pinout & GPIO Conflict Checker (Strapping & LP-IO)',
    metaDescription: 'Interactive ESP32-C6-WROOM-1 GPIO conflict analyzer. Check GPIO8/GPIO9 boot strapping pins, Low-Power (LP) I2C pins, USB Serial/JTAG pins (GPIO12/13), and ADC1.',
    primaryKeyword: 'esp32-c6 pinout checker',
    secondaryKeywords: ['esp32-c6 safe gpio pins', 'esp32-c6 strapping pins gpio8 gpio9', 'esp32-c6 usb jtag pins'],
    boardId: 'esp32-c6',
    defaultPeripherals: ['ZIGBEE_RADIO', 'I2C_SHT40', 'UART_GPS'],
    relatedIotSlug: 'esp32-c6-zigbee-thread-cr2032-coin-cell-battery-calculator',
    relatedRfSlug: '2-4ghz-wifi-ble-fr4-microstrip-patch-antenna-calculator',
    hardwareErrataNote: 'Unlike classic ESP32, the ESP32-C6 uses GPIO8 and GPIO9 to control ROM boot mode. Pulling GPIO9 low while GPIO8 is floating enters Joint Download Boot failsafe unless GPIO8 is explicitly pulled high via a 10 kΩ resistor. Avoid assigning active-low sensors to GPIO9.',
    title: 'ESP32-C6 DevKitC-1 Pinout & Strapping Pin Checker',
    h1: 'ESP32-C6 Pinout Allocator: LP-UART, Zigbee/Wi-Fi 6 & Strapping Pin Checker',
    badge: 'ESP32-C6',
    summary: 'Analyzes ESP32-C6 RISC-V pin allocations, dedicated USB Serial/JTAG channels, and boot strapping requirements on GPIO8 and GPIO9.',
    mcuId: 'esp32-c6',
    isWifiRadioActive: true,
    assignments: [
      { id: '1', name: 'SHT40_SDA', type: 'I2C_SDA', busId: 'Wire0', i2cAddressHex: '0x44', gpio: 'GPIO6' },
      { id: '2', name: 'SHT40_SCL', type: 'I2C_SCL', busId: 'Wire0', i2cAddressHex: '0x44', gpio: 'GPIO7' },
      { id: '3', name: 'GPS_TX', type: 'UART_TX', gpio: 'GPIO16' },
      { id: '4', name: 'GPS_RX', type: 'UART_RX', gpio: 'GPIO17' },
    ],
    tradeOffRows: [
      { parameter: 'Boot Strapping', baseline: 'GPIO8 & GPIO9 Default', variant: 'Active Low Button on GPIO9', impact: 'Holding GPIO9 low during power-on forces ROM download mode instead of SPI Flash boot' },
      { parameter: 'USB Serial JTAG', baseline: 'GPIO12/GPIO13 Dedicated', variant: 'General Purpose GPIO', impact: 'Re-assigning USB pins disables built-in hardware JTAG debugging and native CDC console' },
      { parameter: 'Low-Power I/O', baseline: 'LP_GPIO0-7 (Deep Sleep Wake)', variant: 'Standard HP_GPIO', impact: 'Only LP_GPIO pins remain active and responsive to analog/digital thresholds in deep sleep' },
      { parameter: 'ADC Unit', baseline: 'ADC1 (7 Channels)', variant: 'No ADC2 (Silicon Feature)', impact: 'ESP32-C6 eliminates ADC2 entirely, removing all Wi-Fi SAR ADC lockout hazards' },
    ],
    faqs: [
      {
        question: 'Does the ESP32-C6 have the Wi-Fi ADC2 conflict bug present in classic ESP32?',
        answer: 'No. Espressif redesigned the analog subsystem in the ESP32-C6, routing all analog channels through a single 12-bit SAR ADC1 with up to 7 channels. The ADC2 Wi-Fi hardware lockout issue does not exist on ESP32-C6.',
      },
      {
        question: 'What are the critical strapping pins on the ESP32-C6?',
        answer: 'GPIO8 and GPIO9 are the primary boot strapping pins. During power-on reset, GPIO9 determines SPI Boot (HIGH) vs Download Boot (LOW). GPIO8 controls JTAG/UART print output.',
      },
      {
        question: 'Can GPIO12 and GPIO13 be used for general digital sensors?',
        answer: 'Yes, but they are internally multiplexed with the native USB Serial/JTAG controller (D- and D+). If you use them as standard GPIOs, you lose hardware USB programming and debugging.',
      },
      {
        question: 'What are the Low Power (LP) pins on ESP32-C6?',
        answer: 'GPIO0 through GPIO7 can be multiplexed to the Low-Power Core (LP Core), allowing them to read analog sensors, control I2C peripherals, and wake the chip during deep sleep.',
      },
    ],
  },
  {
    slug: 'esp32-s3-camera-spi-i2c-pin-conflict-checker',
    toolCategory: 'pinout-checker',
    h1Title: 'ESP32-S3 Octal PSRAM, Native USB & SPI/I2C Pinout Conflict Checker',
    metaTitle: 'ESP32-S3 Pinout Checker (Octal PSRAM GPIO35-37 & USB Pins)',
    metaDescription: 'Check ESP32-S3-WROOM-1 and WROOM-2 pin assignments. Detects hidden GPIO35, GPIO36, and GPIO37 Octal Flash/PSRAM conflicts on N8R8 and N16R8 modules.',
    primaryKeyword: 'esp32-s3 pinout conflict checker',
    secondaryKeywords: ['esp32-s3 n16r8 gpio 35 36 37', 'esp32-s3 strapping pins gpio 0 3 45 46', 'esp32-s3 native usb pins gpio 19 20'],
    boardId: 'esp32-s3',
    defaultPeripherals: ['WIFI_RADIO', 'SPI_SX1262_LORA', 'I2C_OLED_SSD1306'],
    relatedIotSlug: 'lora-sx1262-esp32-weather-station-solar-battery-calculator',
    relatedRfSlug: '915mhz-lora-ism-microstrip-patch-antenna-calculator',
    hardwareErrataNote: 'On ESP32-S3 modules equipped with 8 MB Octal PSRAM (such as ESP32-S3-WROOM-1-N8R8 and N16R8), GPIO35, GPIO36, and GPIO37 are internally wired to the high-speed Octal SPI PSRAM bus and cannot be used for external sensors without crashing the system.',
    title: 'ESP32-S3 Octal PSRAM & Native USB Pinout Conflict Checker',
    h1: 'ESP32-S3 Octal PSRAM, Native USB & SPI/I2C Pinout Conflict Checker',
    badge: 'ESP32-S3',
    summary: 'Detects hidden Octal PSRAM bus conflicts on GPIO35-37 and strapping hazards for ESP32-S3 AI, camera, and voice modules.',
    mcuId: 'esp32-s3',
    isWifiRadioActive: true,
    assignments: [
      { id: '1', name: 'LORA_MOSI', type: 'SPI_MOSI', busId: 'SPI0', gpio: 'GPIO11' },
      { id: '2', name: 'LORA_MISO', type: 'SPI_MISO', busId: 'SPI0', gpio: 'GPIO13' },
      { id: '3', name: 'LORA_SCK', type: 'SPI_SCK', busId: 'SPI0', gpio: 'GPIO12' },
      { id: '4', name: 'LORA_CS', type: 'SPI_CS', busId: 'SPI0', gpio: 'GPIO10' },
      { id: '5', name: 'OLED_SDA', type: 'I2C_SDA', busId: 'Wire0', i2cAddressHex: '0x3C', gpio: 'GPIO4' },
      { id: '6', name: 'OLED_SCL', type: 'I2C_SCL', busId: 'Wire0', i2cAddressHex: '0x3C', gpio: 'GPIO5' },
    ],
    tradeOffRows: [
      { parameter: 'Octal Flash/PSRAM', baseline: 'GPIO35-37 Reserved for Octal Bus', variant: 'External Sensor on GPIO35', impact: 'Accessing GPIO35 corrupts high-speed PSRAM cache fetches, immediately triggering a CPU crash' },
      { parameter: 'Native USB OTG', baseline: 'GPIO19/20 Dedicated USB D-/D+', variant: 'General Purpose Output', impact: 'Disables built-in hardware USB-JTAG, firmware flashing, and TinyUSB USB-CDC stack' },
      { parameter: 'Strapping Pins', baseline: 'GPIO0, GPIO3, GPIO45, GPIO46', variant: 'Pull-down Resistor on GPIO45', impact: 'GPIO45 controls VDD_SPI voltage; pulling low can force 1.8V flash rail mismatch' },
      { parameter: 'Vector Extension', baseline: 'PIE Instructions Enabled', variant: 'Standard Scalar Ops', impact: 'ESP32-S3 dual-core LX7 features vector instructions for accelerating neural nets and DSP filters' },
    ],
    faqs: [
      {
        question: 'Why are GPIO35, GPIO36, and GPIO37 unusable on ESP32-S3-WROOM-1-N8R8?',
        answer: 'Modules ending in "R8" use 8 MB Octal SPI PSRAM, requiring 8 data lines (D0–D7) instead of 4 (Quad SPI). Espressif internally wires GPIO35, GPIO36, and GPIO37 to the high-speed PSRAM bus inside the module shielding can. Connecting external components causes immediate memory crashes.',
      },
      {
        question: 'Does the ESP32-S3 support USB Host and Device modes?',
        answer: 'Yes. GPIO19 (USB D-) and GPIO20 (USB D+) connect to a full-speed USB 1.1 OTG controller supporting both host (connecting USB flash drives, keyboards) and device modes (CDC ACM serial, HID, MIDI).',
      },
      {
        question: 'What are the boot strapping pins on ESP32-S3?',
        answer: 'GPIO0 controls SPI boot vs Download boot. GPIO45 controls VDD_SPI voltage (3.3V vs 1.8V). GPIO46 controls ROM boot messages and debug logging. GPIO3 controls JTAG source selection.',
      },
      {
        question: 'Can all ESP32-S3 pins be used for capacitive touch sensing?',
        answer: 'No. Touch sensing is supported exclusively on 14 dedicated pins: TOUCH1 through TOUCH14 (GPIO1 through GPIO14).',
      },
    ],
  },
  {
    slug: 'stm32-bluepill-i2c-spi-pwm-pinout-conflict-checker',
    toolCategory: 'pinout-checker',
    h1Title: 'STM32F103C8T6 (BluePill) 5V-Tolerant Pinout & Timer/Bus Conflict Checker',
    metaTitle: 'STM32F103C8T6 BluePill Pinout & Peripheral Conflict Checker',
    metaDescription: 'Interactive STM32F103C8T6 BluePill GPIO planner. Verify 5V-tolerant (FT) pins, SWD debug pins (PA13/PA14), USB D+/D- (PA11/PA12), and I2C1/SPI1 AFIO remapping.',
    primaryKeyword: 'stm32f103c8t6 pinout checker',
    secondaryKeywords: ['stm32 bluepill 5v tolerant pins', 'stm32f103 i2c1 pb6 pb7 conflict', 'stm32 swd pins pa13 pa14'],
    boardId: 'stm32f103c8',
    defaultPeripherals: ['SWD_DEBUG', 'I2C1_MPU6050', 'SPI1_NRF24L01', 'PWM_TIM2'],
    relatedIotSlug: 'stm32l4-ultra-low-power-industrial-sensor-battery-calculator',
    relatedRfSlug: '868mhz-lora-eu-in-fr4-microstrip-patch-antenna-calculator',
    hardwareErrataNote: 'On the STM32F103C8T6, pins PC13, PC14, and PC15 are supplied through the backup domain power switch and must never source or sink more than 3 mA total. Additionally, PA0–PA7 and PB0–PB1 are strictly 3.3V-only because they connect to internal ADC multiplexers; applying 5V logic permanently damages the die.',
    title: 'STM32F103C8T6 (BluePill) 5V-Tolerant Pinout & Bus Conflict Checker',
    h1: 'STM32F103C8T6 (BluePill) 5V-Tolerant Pinout & Timer/Bus Conflict Checker',
    badge: 'STM32F103 (BluePill)',
    summary: 'Audits 5V-tolerant (FT) vs 3.3V-only pins, SWD debugging allocations, and hardware timer conflicts for the STM32F103C8T6.',
    mcuId: 'stm32f103c8',
    isWifiRadioActive: false,
    assignments: [
      { id: '1', name: 'SWCLK', type: 'SWD_CLK', gpio: 'PA14' },
      { id: '2', name: 'SWDIO', type: 'SWD_DIO', gpio: 'PA13' },
      { id: '3', name: 'MPU_SDA', type: 'I2C_SDA', busId: 'Wire0', i2cAddressHex: '0x68', gpio: 'PB7' },
      { id: '4', name: 'MPU_SCL', type: 'I2C_SCL', busId: 'Wire0', i2cAddressHex: '0x68', gpio: 'PB6' },
      { id: '5', name: 'NRF_MOSI', type: 'SPI_MOSI', busId: 'SPI0', gpio: 'PA7' },
      { id: '6', name: 'NRF_MISO', type: 'SPI_MISO', busId: 'SPI0', gpio: 'PA6' },
      { id: '7', name: 'NRF_SCK', type: 'SPI_SCK', busId: 'SPI0', gpio: 'PA5' },
      { id: '8', name: 'NRF_CS', type: 'SPI_CS', busId: 'SPI0', gpio: 'PA4' },
      { id: '9', name: 'SERVO_PWM', type: 'PWM', gpio: 'PA1' },
    ],
    tradeOffRows: [
      { parameter: '5V Tolerance', baseline: 'FT Pins (PB6–PB9, PA8–PA10)', variant: 'ADC Pins (PA0–PA7)', impact: 'PA0-PA7 have internal ESD diodes to 3.3V; connecting 5V signals permanently fries the silicon' },
      { parameter: 'SWD Debug Pins', baseline: 'PA13 (SWDIO) & PA14 (SWCLK)', variant: 'Reassigned as GPIO', impact: 'Using PA13/PA14 locks out ST-Link / J-Link debuggers, requiring hard boot0 reset to flash' },
      { parameter: 'Backup Domain Pins', baseline: 'PC13 (Onboard LED)', variant: 'Direct Relay Drive (20 mA)', impact: 'PC13-PC15 drive strength is limited to 3 mA max; exceeding this damages the internal battery switch' },
      { parameter: 'USB D+ Pull-up', baseline: 'External 1.5 kΩ Pull-up', variant: 'Wrong Value (4.7 kΩ on clones)', impact: 'Many BluePill clone boards use an incorrect 4.7 kΩ pull-up on PA12, causing USB enumeration failure' },
    ],
    faqs: [
      {
        question: 'Which pins on the STM32F103 BluePill are strictly 3.3V only?',
        answer: 'Pins PA0 through PA7, PB0, PB1, and PC14, PC15 are NOT 5V tolerant. They connect directly to analog ADC multiplexers or oscillator pins. Applying 5V signals to these pins causes severe current leakage through internal clamp diodes and damages the chip.',
      },
      {
        question: 'Can PA13 and PA14 be used as normal GPIO pins on STM32F103?',
        answer: 'Yes, by calling `__HAL_AFIO_REMAP_SWJ_DISABLE()` in STM32Cube or disabling JTAG/SWD in Arduino. However, doing so cuts off ST-Link debugging. You will need to toggle BOOT0 to 3.3V and press Reset to reprogram the device over UART.',
      },
      {
        question: 'Why does the onboard PC13 LED on the BluePill blink dimly?',
        answer: 'Pins PC13, PC14, and PC15 are powered through the RTC backup power switch. Their internal drive transistors are limited to a maximum source/sink current of 3 mA. Never connect optocouplers or relay coils directly to PC13.',
      },
      {
        question: 'Why do BluePill boards often fail to enumerate over USB?',
        answer: 'USB Full-Speed requires a 1.5 kΩ pull-up resistor from USB D+ (PA12) to 3.3V to signal device presence to the host. Many low-cost clone boards incorrectly place a 4.7 kΩ or 10 kΩ resistor (labeled R10), preventing the USB host controller from detecting the device.',
      },
    ],
  },
];

// Backwards-compatible aliases
export const IOT_PRESETS = IOT_BATTERY_PRESETS;
export const RF_PRESETS = RF_PATCH_PRESETS;
export const PINOUT_PRESETS = PINOUT_CHECKER_PRESETS;
