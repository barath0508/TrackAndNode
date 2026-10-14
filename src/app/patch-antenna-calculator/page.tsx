import React from 'react';
import { Metadata } from 'next';
import { PatchAntennaWorkbench } from '@/components/calculators/rf/PatchAntennaWorkbench';

export const metadata: Metadata = {
  title: 'Microstrip Patch Antenna & PCB Trace Impedance Calculator',
  description:
    'Design rectangular microstrip patch antennas, calculate 50-Ohm inset feed notch depth, and export CST Studio Suite VBScript macros using closed-form Balanis transmission line models.',
};

export default function PatchAntennaPage() {
  return <PatchAntennaWorkbench />;
}
