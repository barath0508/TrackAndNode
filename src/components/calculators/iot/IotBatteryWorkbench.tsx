'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { IotPowerInput, calculateIotBatteryLife } from '@/lib/iot-battery-math';
import { DualInput } from '@/components/ui/DualInput';
import { MetricCard } from '@/components/ui/MetricCard';
import { PresetPillBar } from '@/components/ui/PresetPillBar';
import { MobileTelemetryDock } from '@/components/ui/MobileTelemetryDock';
import { PowerWaveformSvg } from './PowerWaveformSvg';
import { AdSlot } from '@/components/layout/AdSlot';
import { WorkedExampleSection } from '@/components/seo/WorkedExampleSection';
import { RelatedToolsMatrix } from '@/components/seo/RelatedToolsMatrix';
import { JsonLdSchema } from '@/components/seo/JsonLdSchema';
import { IOT_BATTERY_PRESETS, IotPresetSeo } from '@/data/pseo-presets';
import { AlertTriangle, Battery, Clock, Zap, Cpu, Sparkles } from 'lucide-react';

interface IotBatteryWorkbenchProps {
  initialPreset?: IotPresetSeo;
}

export const IotBatteryWorkbench: React.FC<IotBatteryWorkbenchProps> = ({ initialPreset }) => {
  const defaultInputs: IotPowerInput = initialPreset?.inputs || {
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
  };

  const [inputs, setInputs] = useState<IotPowerInput>(defaultInputs);

  const updateParam = <K extends keyof IotPowerInput>(key: K, val: IotPowerInput[K]) => {
    setInputs((prev) => ({ ...prev, [key]: val }));
  };

  const output = calculateIotBatteryLife(inputs);

  // Dynamic worked math proof steps
  const tWakeSec = inputs.wakeSensorDurationMs / 1000;
  const tTxSec = inputs.txDurationMs / 1000;
  const tSleepSec = Math.max(0, inputs.wakeIntervalSeconds - tWakeSec - tTxSec);
  const iSleepMa = inputs.sleepCurrentUa / 1000;
  const iQuiescentMa = inputs.regulatorQuiescentUa / 1000;
  const eff = inputs.regulatorEfficiency;

  const cycleChargeMas = (
    (iSleepMa * tSleepSec) / eff +
    (inputs.wakeSensorCurrentMa * tWakeSec) / eff +
    (inputs.txCurrentMa * tTxSec) / eff +
    iQuiescentMa * inputs.wakeIntervalSeconds
  ).toFixed(3);

  const workedSteps = [
    {
      title: 'Active Operational Period Subdivisions',
      formula: 'T_cycle = t_sleep + t_sensor + t_tx',
      substitution: `${inputs.wakeIntervalSeconds}s = ${tSleepSec.toFixed(3)}s + ${tWakeSec.toFixed(3)}s + ${tTxSec.toFixed(3)}s`,
      result: `${inputs.wakeIntervalSeconds} Seconds`,
      explanation: 'The IoT node partitions each operational cycle into deep-sleep standby, sensor acquisition, and radio packet burst on-air time.',
    },
    {
      title: 'Time-Weighted Average Current Draw',
      formula: 'I_avg = (1 / η) · [(I_s·t_s + I_sen·t_sen + I_tx·t_tx) / T_cycle] + I_q',
      substitution: `(1 / ${eff}) · [(${iSleepMa.toFixed(4)}·${tSleepSec.toFixed(1)} + ${inputs.wakeSensorCurrentMa}·${tWakeSec.toFixed(3)} + ${inputs.txCurrentMa}·${tTxSec.toFixed(3)}) / ${inputs.wakeIntervalSeconds}] + ${iQuiescentMa.toFixed(4)}`,
      result: `${output.averageCurrentMa.toFixed(4)} mA (${output.averageCurrentUa.toFixed(1)} µA)`,
      explanation: 'Integrates charge across all operational states and applies switching/linear regulator power efficiency plus continuous LDO quiescent leakage.',
    },
    {
      title: 'Equivalent Self-Discharge Current',
      formula: 'I_sd = (C_rated · r_sd) / 8760 hours',
      substitution: `(${inputs.batteryCapacityMah} mAh · ${inputs.annualSelfDischargeRate}) / 8760 h`,
      result: `${((inputs.batteryCapacityMah * inputs.annualSelfDischargeRate) / 8760).toFixed(4)} mA`,
      explanation: 'Converts annual internal chemistry shelf self-discharge into a continuous equivalent hourly leakage drain.',
    },
    {
      title: 'Projected Operating Service Life',
      formula: 'T_hours = (C_rated · k_usable) / (I_avg + I_sd)',
      substitution: `(${inputs.batteryCapacityMah} mAh · ${inputs.usableFraction}) / (${output.averageCurrentMa.toFixed(4)} + ${((inputs.batteryCapacityMah * inputs.annualSelfDischargeRate) / 8760).toFixed(4)})`,
      result: `${output.estimatedYears.toFixed(2)} Years (${output.estimatedDays.toFixed(1)} Days)`,
      explanation: 'Derates nominal cell capacity by the chemistry usable factor (accounting for pulse voltage droop) and divides by total cumulative current drain.',
    },
  ];

  const tradeOffRows = initialPreset?.tradeOffRows || [
    { parameter: 'Wake Frequency', baseline: '60 Seconds', variant: '300 Seconds (5 min)', impact: 'Drastically extends operating life from 0.58 to 2.45 Years' },
    { parameter: 'LDO Quiescent Current', baseline: 'HT7333 (2.5 µA)', variant: 'AMS1117 (55 µA)', impact: 'AMS1117 burns 22x more current while MCU sleeps, halving battery life' },
    { parameter: 'Battery Chemistry', baseline: 'Li-Ion 18650 (2600 mAh)', variant: 'CR2032 Coin Cell (225 mAh)', impact: 'Coin cell saves 90% space but requires severe pulse-droop derating' },
    { parameter: 'Radio Air Time', baseline: '120 ms (Static IP)', variant: '900 ms (DHCP sync)', impact: 'Excessive radio air time consumes 7x more burst energy per cycle' },
  ];

  const faqs = initialPreset?.faqs || [
    {
      question: 'Why does LDO quiescent current dominate long-term IoT battery life?',
      answer: 'When an IoT node sleeps 99.8% of the time, the microcontroller draws only 5µA–15µA. An inefficient regulator (like the AMS1117 at 5mA–10mA or even 50µA) wastes more energy in standby than the entire microcontroller consumes over a year.',
    },
    {
      question: 'What is usable capacity derating (k_usable)?',
      answer: 'Lithium coin cells and small LiPo pouches cannot deliver 100% of their rated capacity when subjected to sudden high-current bursts (e.g. 150mA for Wi-Fi). High internal resistance causes instantaneous voltage sag below the MCU brownout threshold.',
    },
    {
      question: 'How can radio air time be minimized in firmware?',
      answer: 'Use static IP addresses or save DHCP leases in RTC memory to bypass discovery negotiation; transmit binary protocols (like CBOR or packed structs) rather than verbose JSON strings; and configure fast RF bitrate modulation.',
    },
    {
      question: 'What is the role of bulk storage capacitors?',
      answer: 'Placing a 100µF to 470µF low-ESR capacitor directly across the battery rail acts as an energy buffer, absorbing the high radio pulse and preventing MCU brownout resets.',
    },
  ];

  const presetList = IOT_BATTERY_PRESETS.map((p) => ({
    slug: p.slug,
    badge: p.badge || p.targetMcuName,
    title: p.title || p.h1Title,
    href: `/iot-battery-calculator/${p.slug}`,
    isActive: initialPreset?.slug === p.slug,
  }));

  const pageTitle = initialPreset?.h1Title || initialPreset?.h1 || 'IoT Battery Life & Duty-Cycle Power Profiler';
  const pageMetaTitle = initialPreset?.metaTitle || 'IoT Battery Life & Duty-Cycle Power Profiler — TraceAndNode';

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <JsonLdSchema
        toolName={pageMetaTitle}
        canonicalUrl={`https://traceandnode.com/iot-battery-calculator${initialPreset ? `/${initialPreset.slug}` : ''}`}
        categoryName="IoT & Embedded Power"
        description={initialPreset?.metaDescription || 'Accurately model battery life for IoT nodes with duty cycling, LDO quiescent drain, and RF bursts.'}
        faqs={faqs}
      />

      {/* Breadcrumb & Header */}
      <div className="space-y-2">
        <nav className="flex items-center gap-2 text-xs font-mono text-slate-400">
          <Link href="/" className="hover:text-cyan-400 transition-colors">Home</Link>
          <span>/</span>
          <Link href="/iot-battery-calculator" className="text-slate-300">IoT Battery Profiler</Link>
          {initialPreset && (
            <>
              <span>/</span>
              <span className="text-cyan-400 font-semibold">{initialPreset.badge}</span>
            </>
          )}
        </nav>

        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
          {pageTitle}
        </h1>
        <p className="text-slate-400 text-sm max-w-3xl leading-relaxed">
          {initialPreset?.summary ||
            'Simulate multi-state sleep/wake/transmit cycles with double-precision floating-point accuracy. Models LDO quiescent leakage, DC-DC converter efficiency, and battery chemistry self-discharge derating.'}
        </p>
      </div>

      {/* Preset Pill Bar */}
      <PresetPillBar presets={presetList} baseToolPath="/iot-battery-calculator" />

      {/* Top Banner AdSlot (Zero-CLS) */}
      <AdSlot id="ad-slot-top-banner" slotType="top-banner" />

      {/* 12-Column Asymmetric Split Workbench */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start my-8">
        {/* Left Pane: Parameter Controls (5 Columns) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Card 1: Battery Source & Chemistry */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-5 space-y-4">
            <div className="flex items-center gap-2 pb-2 border-b border-slate-800/80">
              <Battery className="w-4 h-4 text-cyan-400" />
              <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-cyan-400">
                1. Battery Chemistry &amp; Capacity
              </h3>
            </div>

            <DualInput
              id="batteryCapacity"
              label="Rated Cell Capacity"
              value={inputs.batteryCapacityMah}
              unit="mAh"
              min={50}
              max={10000}
              step={50}
              onChange={(val) => updateParam('batteryCapacityMah', val)}
              helpText="e.g. 225 (CR2032), 2600 (18650)"
            />

            <DualInput
              id="usableFraction"
              label="Usable Capacity Derating (k_usable)"
              value={inputs.usableFraction}
              unit="ratio"
              min={0.50}
              max={0.95}
              step={0.01}
              onChange={(val) => updateParam('usableFraction', val)}
              helpText="0.70 for coin cells, 0.85 for Li-Ion"
            />

            <DualInput
              id="annualSelfDischarge"
              label="Annual Self-Discharge Rate"
              value={inputs.annualSelfDischargeRate}
              unit="ratio"
              min={0.01}
              max={0.15}
              step={0.005}
              onChange={(val) => updateParam('annualSelfDischargeRate', val)}
              helpText="0.02 (2% LiFePO4), 0.04 (4% Li-Ion)"
            />
          </div>

          {/* Card 2: Voltage Regulator (LDO / Buck) */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-5 space-y-4">
            <div className="flex items-center gap-2 pb-2 border-b border-slate-800/80">
              <Zap className="w-4 h-4 text-amber-400" />
              <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-amber-400">
                2. Power Management (LDO / DC-DC)
              </h3>
            </div>

            <DualInput
              id="regulatorQuiescent"
              label="Regulator Quiescent Current (I_q)"
              value={inputs.regulatorQuiescentUa}
              unit="µA"
              min={0.1}
              max={100}
              step={0.5}
              onChange={(val) => updateParam('regulatorQuiescentUa', val)}
              helpText="2.5 µA (HT7333), 55 µA (AMS1117)"
            />

            <DualInput
              id="regulatorEfficiency"
              label="Regulator Efficiency (η)"
              value={inputs.regulatorEfficiency}
              unit="ratio"
              min={0.70}
              max={0.98}
              step={0.01}
              onChange={(val) => updateParam('regulatorEfficiency', val)}
              helpText="0.88 - 0.95 for modern DC-DC / LDO"
            />
          </div>

          {/* Card 3: Operational Duty Profile */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-5 space-y-4">
            <div className="flex items-center gap-2 pb-2 border-b border-slate-800/80">
              <Clock className="w-4 h-4 text-emerald-400" />
              <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-emerald-400">
                3. Duty-Cycle Operational Profile
              </h3>
            </div>

            <DualInput
              id="wakeInterval"
              label="Total Wake Interval / Cycle Period"
              value={inputs.wakeIntervalSeconds}
              unit="s"
              min={1}
              max={3600}
              step={5}
              onChange={(val) => updateParam('wakeIntervalSeconds', val)}
              helpText="e.g. 60s (1 min), 300s (5 min)"
            />

            <DualInput
              id="sleepCurrent"
              label="Deep Sleep Baseline Current (I_sleep)"
              value={inputs.sleepCurrentUa}
              unit="µA"
              min={0.5}
              max={200}
              step={0.5}
              onChange={(val) => updateParam('sleepCurrentUa', val)}
              helpText="7 µA (ESP32-C6), 12 µA (ESP32)"
            />

            <DualInput
              id="sensorCurrent"
              label="Sensor Poll Current (I_sensor)"
              value={inputs.wakeSensorCurrentMa}
              unit="mA"
              min={1}
              max={150}
              step={1}
              onChange={(val) => updateParam('wakeSensorCurrentMa', val)}
              helpText="MCU active + sensor read"
            />

            <DualInput
              id="sensorDuration"
              label="Sensor Sampling Duration (t_sensor)"
              value={inputs.wakeSensorDurationMs}
              unit="ms"
              min={1}
              max={1000}
              step={5}
              onChange={(val) => updateParam('wakeSensorDurationMs', val)}
              helpText="Time required to read I2C/SPI"
            />

            <DualInput
              id="txCurrent"
              label="Radio Transmit Peak Current (I_tx)"
              value={inputs.txCurrentMa}
              unit="mA"
              min={5}
              max={350}
              step={5}
              onChange={(val) => updateParam('txCurrentMa', val)}
              helpText="28mA (Zigbee), 180mA (Wi-Fi)"
            />

            <DualInput
              id="txDuration"
              label="Radio Transmit Air Time (t_tx)"
              value={inputs.txDurationMs}
              unit="ms"
              min={1}
              max={2000}
              step={5}
              onChange={(val) => updateParam('txDurationMs', val)}
              helpText="RF packet transmission duration"
            />
          </div>
        </div>

        {/* Right Pane: Sticky Live Telemetry & CAD View (7 Columns) */}
        <div className="lg:col-span-7 lg:sticky lg:top-20 space-y-6">
          {/* Row 1: Primary KPI Ribbon */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <MetricCard
              label="Estimated Life"
              value={output.estimatedYears >= 1 ? output.estimatedYears.toFixed(2) : output.estimatedDays.toFixed(0)}
              unit={output.estimatedYears >= 1 ? 'Years' : 'Days'}
              subtext={`${output.estimatedDays.toFixed(0)} Total Days`}
              variant="cyan"
            />
            <MetricCard
              label="Average Current"
              value={output.averageCurrentUa.toFixed(1)}
              unit="µA"
              subtext={`${output.averageCurrentMa.toFixed(4)} mA`}
              variant="emerald"
            />
            <MetricCard
              label="Daily Consumption"
              value={output.dailyChargeConsumedMah.toFixed(2)}
              unit="mAh / Day"
              subtext={`${output.sleepDutyCyclePercent.toFixed(2)}% in Sleep`}
              variant="amber"
            />
          </div>

          {/* Row 2: Interactive SVG Visualizer */}
          <PowerWaveformSvg input={inputs} output={output} />

          {/* Row 3: Diagnostic Status Banner */}
          {output.warnings.length > 0 ? (
            <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-4 space-y-2">
              <div className="flex items-center gap-2 text-amber-400 font-mono text-xs font-bold uppercase tracking-wider">
                <AlertTriangle className="w-4 h-4" />
                <span>Hardware Rule Diagnostics ({output.warnings.length})</span>
              </div>
              <ul className="space-y-1.5 text-xs text-amber-200/90 font-sans leading-relaxed">
                {output.warnings.map((warn, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-amber-400 font-mono">•</span>
                    <span>{warn}</span>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-xl p-4 flex items-center gap-3">
              <Sparkles className="w-4 h-4 text-emerald-400 shrink-0" />
              <p className="text-xs text-emerald-200 font-sans">
                <strong>Optimal Low-Power Configuration:</strong> Low quiescent regulator drain and balanced RF burst duration ensure maximum electrochemical energy extraction.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Mid Banner AdSlot (Zero-CLS) */}
      <AdSlot id="ad-slot-mid-content" slotType="mid-content" />

      {/* Dynamic Worked Mathematical Guide */}
      <WorkedExampleSection
        toolTitle={pageTitle}
        category="iot-battery"
        formulaTitle="IoT Operational Cycle Integration"
        steps={workedSteps}
        tradeOffRows={tradeOffRows}
        faqs={faqs}
        advisoryNote={initialPreset?.hardwareDesignNote}
        iotInput={inputs}
      />

      {/* Hub-and-Spoke Cross-Discipline Linking Matrix */}
      <RelatedToolsMatrix
        currentCategory="iot-battery"
        relatedRfSlug={initialPreset?.relatedRfSlug}
        relatedPinoutSlug={initialPreset?.relatedPinoutSlug}
      />

      {/* Mobile Sticky Bottom Telemetry Dock */}
      <MobileTelemetryDock
        primaryLabel="Est. Battery Life"
        primaryValue={output.estimatedYears >= 1 ? `${output.estimatedYears.toFixed(2)} Yrs` : `${output.estimatedDays.toFixed(0)} Days`}
        primaryUnit={`(${output.averageCurrentUa.toFixed(0)} µA avg)`}
        targetDiagramId="interactive-visualizer"
      />
    </div>
  );
};
