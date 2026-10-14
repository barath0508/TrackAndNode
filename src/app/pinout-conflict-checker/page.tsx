import React from 'react';
import { Metadata } from 'next';
import { PinoutCheckerWorkbench } from '@/components/calculators/pinout/PinoutCheckerWorkbench';

export const metadata: Metadata = {
  title: 'Interactive Microcontroller Pinout & Bus Conflict Checker',
  description:
    'Evaluate pin assignments on ESP32, STM32, and Arduino against direct collisions, I2C 7-bit bus clashes, ADC2 Wi-Fi lockouts, and strapping pin hazards. Generates clean C++ headers.',
};

export default function PinoutCheckerPage() {
  return <PinoutCheckerWorkbench />;
}
