import React from 'react';
import { Metadata } from 'next';
import { IotBatteryWorkbench } from '@/components/calculators/iot/IotBatteryWorkbench';

export const metadata: Metadata = {
  title: 'IoT Battery Life & Duty-Cycle Power Profiler',
  description:
    'Simulate multi-state sleep/wake/transmit cycles with double-precision floating-point accuracy. Models LDO quiescent leakage, DC-DC converter efficiency, and battery chemistry self-discharge derating.',
};

export default function IotBatteryPage() {
  return <IotBatteryWorkbench />;
}
