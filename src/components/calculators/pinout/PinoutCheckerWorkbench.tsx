'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { MCU_PROFILES, McuProfile } from '@/data/mcu-profiles';
import {
  AssignedPeripheral,
  evaluatePinoutConflicts,
  ConflictDiagnostic,
} from '@/lib/pinout-conflict-engine';
import { McuPackageSvg } from './McuPackageSvg';
import { MetricCard } from '@/components/ui/MetricCard';
import { PresetPillBar } from '@/components/ui/PresetPillBar';
import { MobileTelemetryDock } from '@/components/ui/MobileTelemetryDock';
import { AdSlot } from '@/components/layout/AdSlot';
import { WorkedExampleSection } from '@/components/seo/WorkedExampleSection';
import { JsonLdSchema } from '@/components/seo/JsonLdSchema';
import { PINOUT_PRESETS, PinoutPreset } from '@/data/pseo-presets';
import {
  Cpu,
  Radio,
  Plus,
  Trash2,
  FileCode,
  Copy,
  Check,
  AlertOctagon,
  AlertTriangle,
  CheckCircle2,
  HelpCircle,
} from 'lucide-react';

interface PinoutCheckerWorkbenchProps {
  initialPreset?: PinoutPreset;
}

export const PinoutCheckerWorkbench: React.FC<PinoutCheckerWorkbenchProps> = ({
  initialPreset,
}) => {
  const initialMcuId = initialPreset?.mcuId || 'esp32-wroom-32';
  const [selectedMcuId, setSelectedMcuId] = useState<string>(initialMcuId);
  const [isWifiRadioActive, setIsWifiRadioActive] = useState<boolean>(
    initialPreset?.isWifiRadioActive ?? true
  );

  const defaultAssignments: AssignedPeripheral[] = initialPreset?.assignments || [
    { id: '1', name: 'BME280_SDA', type: 'I2C_SDA', busId: 'Wire0', i2cAddressHex: '0x76', gpio: 'GPIO21' },
    { id: '2', name: 'BME280_SCL', type: 'I2C_SCL', busId: 'Wire0', i2cAddressHex: '0x76', gpio: 'GPIO22' },
    { id: '3', name: 'OLED_SDA', type: 'I2C_SDA', busId: 'Wire0', i2cAddressHex: '0x3C', gpio: 'GPIO21' },
    { id: '4', name: 'OLED_SCL', type: 'I2C_SCL', busId: 'Wire0', i2cAddressHex: '0x3C', gpio: 'GPIO22' },
    { id: '5', name: 'SX1262_MOSI', type: 'SPI_MOSI', busId: 'SPI0', gpio: 'GPIO23' },
    { id: '6', name: 'SX1262_MISO', type: 'SPI_MISO', busId: 'SPI0', gpio: 'GPIO19' },
    { id: '7', name: 'SX1262_SCK', type: 'SPI_SCK', busId: 'SPI0', gpio: 'GPIO18' },
    { id: '8', name: 'SX1262_CS', type: 'SPI_CS', busId: 'SPI0', gpio: 'GPIO5' },
    { id: '9', name: 'BATTERY_ADC', type: 'ADC', gpio: 'GPIO34' },
  ];

  const [assignments, setAssignments] = useState<AssignedPeripheral[]>(defaultAssignments);
  const [selectedPin, setSelectedPin] = useState<string | null>(null);
  const [copiedHeader, setCopiedHeader] = useState<boolean>(false);

  // New peripheral form state
  const [newDevName, setNewDevName] = useState('');
  const [newDevType, setNewDevType] = useState<AssignedPeripheral['type']>('I2C_SDA');
  const [newDevGpio, setNewDevGpio] = useState('');
  const [newDevBus, setNewDevBus] = useState('Wire0');
  const [newDevAddr, setNewDevAddr] = useState('0x68');

  const currentMcu = MCU_PROFILES.find((m) => m.id === selectedMcuId) || MCU_PROFILES[0];

  // Evaluate deterministic conflicts in real time
  const evaluation = evaluatePinoutConflicts(currentMcu, assignments, isWifiRadioActive);

  const errorCount = evaluation.diagnostics.filter((d) => d.severity === 'ERROR').length;
  const warningCount = evaluation.diagnostics.filter((d) => d.severity === 'WARNING').length;

  const handleMcuChange = (id: string) => {
    setSelectedMcuId(id);
    setSelectedPin(null);
  };

  const handleAddPeripheral = () => {
    if (!newDevName || !newDevGpio) return;
    const newAss: AssignedPeripheral = {
      id: Date.now().toString(),
      name: newDevName,
      type: newDevType,
      gpio: newDevGpio,
      busId: newDevType.startsWith('I2C') ? newDevBus : undefined,
      i2cAddressHex: newDevType.startsWith('I2C') ? newDevAddr : undefined,
    };
    setAssignments((prev) => [...prev, newAss]);
    setNewDevName('');
  };

  const handleDeleteAssignment = (id: string) => {
    setAssignments((prev) => prev.filter((a) => a.id !== id));
  };

  const handleCopyHeader = () => {
    navigator.clipboard.writeText(evaluation.generatedHeaderCode);
    setCopiedHeader(true);
    setTimeout(() => setCopiedHeader(false), 2000);
  };

  const selectedPinDef = currentMcu.pins.find((p) => p.gpio === selectedPin);

  // Preset Pills
  const presetList = PINOUT_PRESETS.map((p) => ({
    slug: p.slug,
    badge: p.badge,
    title: p.title,
    href: `/pinout-conflict-checker/${p.slug}`,
    isActive: initialPreset?.slug === p.slug,
  }));

  const pageTitle = initialPreset?.h1 || 'Interactive Microcontroller Pinout & Bus Conflict Checker';
  const pageMetaTitle = initialPreset?.metaTitle || 'Interactive Microcontroller Pinout & Bus Conflict Checker — BenchPulse';

  const workedSteps = [
    {
      title: 'Physical GPIO Collision Evaluation',
      formula: 'Count(Peripherals on GPIO_k) ≤ 1 [Except Shared Multi-Drop I2C Bus]',
      substitution: `Evaluated ${assignments.length} assigned peripherals against ${currentMcu.pins.length} physical pins on ${currentMcu.name}`,
      result: `${evaluation.diagnostics.filter((d) => d.ruleCode === 'DIRECT_COLLISION').length} Collision(s)`,
      explanation: 'Verifies that output push-pull drivers and dedicated bus peripherals never contend on the same physical silicon pin.',
    },
    {
      title: 'I2C Shared Bus 7-Bit Address Disambiguation',
      formula: 'Unique(Addr_i on Bus_j) == True',
      substitution: `Checked address matrix across active I2C buses (Wire0 / Wire1)`,
      result: `${evaluation.diagnostics.filter((d) => d.ruleCode === 'I2C_ADDRESS_COLLISION').length} Address Clash(es)`,
      explanation: 'I2C devices can safely share physical SDA and SCL lines if and only if their 7-bit slave addresses are unique.',
    },
    {
      title: 'Silicon ADC2 / Wi-Fi Subsystem Arbitration',
      formula: 'If Wi-Fi_Active == True Then ADC2_Channels := LOCKED',
      substitution: `Radio Active: ${isWifiRadioActive ? 'TRUE' : 'FALSE'} | MCU Family: ${currentMcu.name}`,
      result: `${evaluation.diagnostics.filter((d) => d.ruleCode === 'ADC2_WIFI_CONFLICT').length} SAR Lockout(s)`,
      explanation: 'On ESP32 and ESP32-S3, analog reads on ADC2 fail when the RF power amplifier and baseband modem arbitrate the SAR ADC.',
    },
    {
      title: 'Output Drive & Boot Strapping Safety Audit',
      formula: 'Pin.isInputOnly == False for Outputs && Pin.isStrapping == Verified',
      substitution: `Audited GPI34-39 and Boot Mode Pins (GPIO0, 2, 12, 15)`,
      result: `${evaluation.diagnostics.filter((d) => d.ruleCode === 'INPUT_ONLY_VIOLATION' || d.ruleCode === 'STRAPPING_HAZARD').length} Advisory Rule(s)`,
      explanation: 'Ensures output drivers are not connected to input-only pins and strapping resistors do not corrupt chip boot sequences.',
    },
  ];

  const tradeOffRows = initialPreset?.tradeOffRows || [
    { parameter: 'ADC Channel', baseline: 'ADC1 (GPIO32–39)', variant: 'ADC2 (GPIO25–27)', impact: 'ADC2 conflicts with Wi-Fi baseband hardware, causing sample dropouts' },
    { parameter: 'I2C Bus Wiring', baseline: 'Shared Bus (Different Addr)', variant: 'Dual Devices on 0x68', impact: 'Causes bus contention and NACK errors; require address AD0 toggle' },
    { parameter: 'Input-Only Pins', baseline: 'Sensors / Digital In', variant: 'PWM Servo Output', impact: 'GPIO 34-39 lack output FETs and cannot generate output waveforms' },
    { parameter: 'Strapping Pins', baseline: 'Reserved / Floating', variant: 'Sensor Pull-up', impact: 'External resistor can hold GPIO12 high, forcing flash to 1.8V and bricking boot' },
  ];

  const faqs = initialPreset?.faqs || [
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
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <JsonLdSchema
        toolName={pageMetaTitle}
        toolUrl={`https://benchpulse.dev/pinout-conflict-checker${initialPreset ? `/${initialPreset.slug}` : ''}`}
        description={initialPreset?.metaDescription || 'Deterministic silicon rule evaluator for ESP32, STM32, and Arduino pinout conflict analysis.'}
        faqs={faqs}
      />

      {/* Breadcrumb & Header */}
      <div className="space-y-2">
        <nav className="flex items-center gap-2 text-xs font-mono text-slate-400">
          <Link href="/" className="hover:text-cyan-400 transition-colors">Home</Link>
          <span>/</span>
          <Link href="/pinout-conflict-checker" className="text-slate-300">Pinout Conflict Checker</Link>
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
            'Allocate peripherals and evaluate physical pin assignments against silicon constraints: direct GPIO collisions, I2C 7-bit bus address clashes, ESP32 ADC2/Wi-Fi radio lockouts, input-only pin violations, and boot strapping hazards.'}
        </p>
      </div>

      {/* Preset Pill Bar */}
      <PresetPillBar presets={presetList} baseToolPath="/pinout-conflict-checker" />

      {/* Top Banner AdSlot (Zero-CLS) */}
      <AdSlot id="ad-slot-top-banner" slotType="top-banner" />

      {/* 12-Column Asymmetric Split Workbench */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start my-8">
        {/* Left Pane: Peripheral & Hardware Manager (5 Columns) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Card 1: Target Microcontroller & System State */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-5 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800/80">
              <div className="flex items-center gap-2">
                <Cpu className="w-4 h-4 text-cyan-400" />
                <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-cyan-400">
                  Target Microcontroller
                </h3>
              </div>
              <span className="text-[10px] font-mono text-slate-400 bg-slate-800 px-2 py-0.5 rounded">
                {currentMcu.architecture}
              </span>
            </div>

            <div className="space-y-1.5">
              <label htmlFor="mcuSelect" className="text-xs font-medium text-slate-300">
                Select MCU Platform
              </label>
              <select
                id="mcuSelect"
                value={selectedMcuId}
                onChange={(e) => handleMcuChange(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs font-mono text-slate-100 focus:outline-none focus:border-cyan-500"
              >
                {MCU_PROFILES.map((m) => (
                  <option key={m.id} value={m.id}>
                    {m.name} ({m.operatingVoltage}V)
                  </option>
                ))}
              </select>
            </div>

            {/* Wi-Fi Radio Toggle */}
            <div className="flex items-center justify-between p-3 rounded-lg bg-slate-950 border border-slate-800">
              <div className="flex items-center gap-2">
                <Radio className={`w-4 h-4 ${isWifiRadioActive ? 'text-cyan-400' : 'text-slate-500'}`} />
                <span className="text-xs font-mono text-slate-300">
                  Wi-Fi / BT Radio Subsystem Active
                </span>
              </div>
              <button
                type="button"
                onClick={() => setIsWifiRadioActive(!isWifiRadioActive)}
                className={`relative inline-flex h-5 w-10 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                  isWifiRadioActive ? 'bg-cyan-500' : 'bg-slate-800'
                }`}
              >
                <span
                  className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out ${
                    isWifiRadioActive ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>
            {isWifiRadioActive && selectedMcuId.includes('esp32') && (
              <p className="text-[11px] font-mono text-amber-400/90 leading-tight">
                * Note: Wi-Fi locks ADC2 channels (SAR ADC busy). Analog sensors must use ADC1.
              </p>
            )}
          </div>

          {/* Card 2: Active Assigned Peripherals List */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-5 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800/80">
              <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-slate-200">
                Active Peripherals ({assignments.length})
              </h3>
              <button
                onClick={() => setAssignments([])}
                className="text-[10px] font-mono text-rose-400 hover:text-rose-300 transition-colors"
              >
                Clear All
              </button>
            </div>

            <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
              {assignments.map((item) => {
                const pinDef = currentMcu.pins.find((p) => p.gpio === item.gpio);
                const hasConflict = evaluation.pinStatusMap[item.gpio]?.hasError;
                return (
                  <div
                    key={item.id}
                    className={`flex items-center justify-between p-2.5 rounded-lg border text-xs font-mono transition-colors ${
                      hasConflict
                        ? 'bg-rose-950/30 border-rose-500/50 text-rose-200'
                        : 'bg-slate-950/80 border-slate-800 text-slate-300'
                    }`}
                  >
                    <div className="flex flex-col">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-white">{item.name}</span>
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-800 text-cyan-400">
                          {item.type}
                        </span>
                        {item.i2cAddressHex && (
                          <span className="text-[10px] text-amber-400">{item.i2cAddressHex}</span>
                        )}
                      </div>
                      <span className="text-[11px] text-slate-400 mt-0.5">
                        Pin: <strong className="text-cyan-300">{item.gpio}</strong> (
                        {pinDef?.label || 'External'})
                      </span>
                    </div>

                    <button
                      onClick={() => handleDeleteAssignment(item.id)}
                      className="p-1 text-slate-500 hover:text-rose-400 transition-colors"
                      title="Remove Peripheral"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                );
              })}
            </div>

            {/* Quick Add Form */}
            <div className="pt-3 border-t border-slate-800 space-y-3">
              <span className="text-xs font-mono font-semibold text-slate-300 block">
                Assign New Hardware Peripheral
              </span>

              <div className="grid grid-cols-2 gap-2">
                <input
                  type="text"
                  placeholder="e.g. MPU6050_SDA"
                  value={newDevName}
                  onChange={(e) => setNewDevName(e.target.value)}
                  className="bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs font-mono text-white focus:outline-none focus:border-cyan-500"
                />

                <select
                  value={newDevType}
                  onChange={(e) => setNewDevType(e.target.value as AssignedPeripheral['type'])}
                  className="bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs font-mono text-white focus:outline-none focus:border-cyan-500"
                >
                  <option value="I2C_SDA">I2C_SDA</option>
                  <option value="I2C_SCL">I2C_SCL</option>
                  <option value="SPI_MOSI">SPI_MOSI</option>
                  <option value="SPI_MISO">SPI_MISO</option>
                  <option value="SPI_SCK">SPI_SCK</option>
                  <option value="SPI_CS">SPI_CS</option>
                  <option value="PWM">PWM Output</option>
                  <option value="ADC">ADC Analog In</option>
                  <option value="UART_TX">UART_TX</option>
                  <option value="UART_RX">UART_RX</option>
                  <option value="GPIO_IN">Digital In</option>
                  <option value="GPIO_OUT">Digital Out</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <select
                  value={newDevGpio}
                  onChange={(e) => setNewDevGpio(e.target.value)}
                  className="bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs font-mono text-white focus:outline-none focus:border-cyan-500"
                >
                  <option value="">Select Target GPIO...</option>
                  {currentMcu.pins
                    .filter((p) => p.gpio !== 'GND' && p.gpio !== '3V3' && p.gpio !== '5V' && p.gpio !== 'VIN')
                    .map((p) => (
                      <option key={p.gpio} value={p.gpio}>
                        {p.gpio} ({p.label})
                      </option>
                    ))}
                </select>

                {newDevType.startsWith('I2C') ? (
                  <input
                    type="text"
                    placeholder="7-bit Hex e.g. 0x68"
                    value={newDevAddr}
                    onChange={(e) => setNewDevAddr(e.target.value)}
                    className="bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs font-mono text-amber-300 focus:outline-none focus:border-cyan-500"
                  />
                ) : (
                  <div className="text-[11px] font-mono text-slate-500 flex items-center px-2">
                    Standard Bus
                  </div>
                )}
              </div>

              <button
                type="button"
                onClick={handleAddPeripheral}
                disabled={!newDevName || !newDevGpio}
                className="w-full py-2 rounded-lg bg-cyan-500/15 hover:bg-cyan-500/25 border border-cyan-500/40 text-cyan-300 text-xs font-mono font-medium flex items-center justify-center gap-1.5 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Pin Assignment</span>
              </button>
            </div>
          </div>

          {/* Card 3: C++ Header Generator */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-5 space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800/80">
              <div className="flex items-center gap-2">
                <FileCode className="w-4 h-4 text-emerald-400" />
                <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-emerald-400">
                  C++ pin_config.h Export
                </h3>
              </div>
              <button
                onClick={handleCopyHeader}
                className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-xs font-mono text-slate-200 flex items-center gap-1.5 transition-colors"
              >
                {copiedHeader ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedHeader ? 'Copied!' : 'Copy Header'}</span>
              </button>
            </div>

            <pre className="bg-slate-950 p-3 rounded-lg border border-slate-800 text-[10.5px] font-mono text-slate-300 overflow-x-auto max-h-48">
              <code>{evaluation.generatedHeaderCode}</code>
            </pre>
          </div>
        </div>

        {/* Right Pane: Sticky Live Telemetry & CAD View (7 Columns) */}
        <div className="lg:col-span-7 lg:sticky lg:top-20 space-y-6">
          {/* Row 1: Primary KPI Ribbon */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <MetricCard
              label="Assigned Pins"
              value={assignments.length}
              unit={`/ ${currentMcu.pins.filter((p) => p.gpio.startsWith('G') || p.gpio.startsWith('P') || p.gpio.startsWith('D')).length}`}
              subtext={`${currentMcu.name}`}
              variant="cyan"
            />
            <MetricCard
              label="Hardware Collisions"
              value={errorCount}
              unit="Errors"
              subtext={errorCount === 0 ? 'Clean routing' : 'Blocking conflicts'}
              variant={errorCount > 0 ? 'rose' : 'emerald'}
            />
            <MetricCard
              label="Strapping Advisories"
              value={warningCount}
              unit="Warnings"
              subtext={warningCount === 0 ? 'Zero boot risks' : 'Check pull resistors'}
              variant={warningCount > 0 ? 'amber' : 'emerald'}
            />
          </div>

          {/* Row 2: Interactive SVG Package Visualizer */}
          <McuPackageSvg
            mcu={currentMcu}
            assignments={assignments}
            diagnostics={evaluation.diagnostics}
            pinStatusMap={evaluation.pinStatusMap}
            selectedPin={selectedPin}
            onSelectPin={(gpio) => setSelectedPin(gpio)}
          />

          {/* Selected Pin Inspector */}
          {selectedPinDef && (
            <div className="bg-slate-900 border border-cyan-500/40 rounded-xl p-4 text-xs font-mono space-y-2 shadow-lg shadow-cyan-500/5">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                <span className="text-cyan-400 font-bold text-sm">
                  Pin Inspector: {selectedPinDef.gpio} ({selectedPinDef.label})
                </span>
                <span className="text-slate-400">Physical Pin #{selectedPinDef.pinNumber}</span>
              </div>
              <div className="flex flex-wrap gap-1.5 pt-1">
                {selectedPinDef.capabilities.map((c) => (
                  <span key={c} className="px-2 py-0.5 rounded bg-slate-800 text-slate-200 text-[10px]">
                    {c}
                  </span>
                ))}
                {selectedPinDef.isInputOnly && (
                  <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 text-[10px] border border-amber-500/30">
                    Input-Only (No Output Driver)
                  </span>
                )}
                {selectedPinDef.isStrappingPin && (
                  <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 text-[10px] border border-amber-500/30">
                    Boot Strapping Pin
                  </span>
                )}
                {selectedPinDef.isReservedFlash && (
                  <span className="px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 text-[10px] border border-rose-500/30">
                    Internal SPI Flash
                  </span>
                )}
              </div>
              {selectedPinDef.strappingBehavior && (
                <p className="text-amber-300/90 text-[11px] leading-relaxed pt-1">
                  <strong>Strapping Behavior:</strong> {selectedPinDef.strappingBehavior}
                </p>
              )}
              {selectedPinDef.notes && (
                <p className="text-slate-400 text-[11px] leading-relaxed">{selectedPinDef.notes}</p>
              )}
            </div>
          )}

          {/* Row 3: Diagnostic Status Banner */}
          {evaluation.diagnostics.length > 0 ? (
            <div className="space-y-2">
              {evaluation.diagnostics.map((diag, i) => (
                <div
                  key={i}
                  className={`p-4 rounded-xl border text-xs space-y-1.5 ${
                    diag.severity === 'ERROR'
                      ? 'bg-rose-950/40 border-rose-500/50 text-rose-200'
                      : 'bg-amber-950/40 border-amber-500/50 text-amber-200'
                  }`}
                >
                  <div className="flex items-center gap-2 font-mono font-bold uppercase tracking-wider">
                    {diag.severity === 'ERROR' ? (
                      <AlertOctagon className="w-4 h-4 text-rose-400" />
                    ) : (
                      <AlertTriangle className="w-4 h-4 text-amber-400" />
                    )}
                    <span>{diag.title}</span>
                  </div>
                  <p className="font-sans leading-relaxed text-slate-300">{diag.remediation}</p>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-xl p-4 flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
              <p className="text-xs text-emerald-200 font-sans">
                <strong>Zero Hardware Conflicts:</strong> All pin drive characteristics, shared I2C addresses, and ADC converter domains are fully compliant with silicon specifications.
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
        formulaTitle="Deterministic Hardware Matrix Rules"
        steps={workedSteps}
        tradeOffRows={tradeOffRows}
        faqs={faqs}
      />

      {/* Mobile Sticky Bottom Telemetry Dock */}
      <MobileTelemetryDock
        primaryLabel="Hardware Status"
        primaryValue={errorCount === 0 ? 'Clean (0 Err)' : `${errorCount} Collision(s)`}
        primaryUnit={warningCount > 0 ? `(${warningCount} Warn)` : ''}
        targetDiagramId="interactive-visualizer"
      />
    </div>
  );
};
