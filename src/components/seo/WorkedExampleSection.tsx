'use client';

import React from 'react';
import {
  BookOpen,
  HelpCircle,
  Layers,
  CheckCircle2,
  AlertTriangle,
  Cpu,
  Radio,
  Battery,
  ShieldCheck,
  ChevronDown,
} from 'lucide-react';
import { calculateIotBatteryLife, IotPowerInput } from '@/lib/iot-battery-math';
import { calculateMicrostripPatch } from '@/lib/patch-antenna-math';
import { McuProfile } from '@/data/mcu-profiles';

interface FaqItem {
  question: string;
  answer: string;
}

interface StepItem {
  title: string;
  formula: string;
  substitution: string;
  result: string;
  explanation: string;
}

interface TradeOffItem {
  parameter: string;
  baseline: string;
  variant: string;
  impact: string;
}

interface WorkedExampleSectionProps {
  toolTitle: string;
  category: 'iot-battery' | 'patch-antenna' | 'pinout-checker';
  formulaTitle?: string;
  steps: StepItem[];
  tradeOffRows?: TradeOffItem[];
  faqs: FaqItem[];
  advisoryNote?: string;
  // Specific dynamic states for Section 2 sensitivity generation
  iotInput?: IotPowerInput;
  rfFrequencyGhz?: number;
  rfHeightMm?: number;
  activeMcu?: McuProfile;
}

export const WorkedExampleSection: React.FC<WorkedExampleSectionProps> = ({
  toolTitle,
  category,
  formulaTitle = 'Analytical Physics Derivation',
  steps,
  tradeOffRows = [],
  faqs,
  advisoryNote,
  iotInput,
  rfFrequencyGhz = 2.45,
  rfHeightMm = 1.6,
  activeMcu,
}) => {
  // 1. Dynamic Sensitivity calculations for IoT Battery
  const renderIotSensitivityTable = () => {
    if (!iotInput) return null;

    const intervals = [
      { label: '1 Minute (60s)', seconds: 60 },
      { label: '5 Minutes (300s)', seconds: 300 },
      { label: '15 Minutes (900s)', seconds: 900 },
      { label: '30 Minutes (1800s)', seconds: 1800 },
      { label: '60 Minutes (3600s)', seconds: 3600 },
    ];

    const ldoConfigs = [
      { name: 'Ultra-Low LDO (1.5 µA)', iq: 1.5 },
      { name: 'Standard LDO (10 µA)', iq: 10.0 },
      { name: 'AMS1117 Clone (5000 µA)', iq: 5000.0 },
    ];

    return (
      <div className="w-full overflow-x-auto border border-slate-800 rounded-xl">
        <table className="w-full text-left text-xs font-mono border-collapse bg-slate-900/60">
          <thead>
            <tr className="border-b border-slate-800 bg-slate-950 text-slate-400 uppercase text-[11px]">
              <th className="py-3 px-4">Reporting Interval</th>
              {ldoConfigs.map((ldo, i) => (
                <th key={i} className="py-3 px-4 text-center">
                  <div className="text-white font-bold">{ldo.name}</div>
                  <div className="text-[10px] text-slate-500 font-normal">Iq = {ldo.iq} µA</div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/80 text-slate-300">
            {intervals.map((inv, idx) => (
              <tr key={idx} className="hover:bg-slate-800/40 transition-colors">
                <td className="py-3 px-4 font-bold text-cyan-300 flex items-center gap-2">
                  <Battery className="w-3.5 h-3.5 text-cyan-400" />
                  <span>{inv.label}</span>
                </td>
                {ldoConfigs.map((ldo, lIdx) => {
                  const evalInput: IotPowerInput = {
                    ...iotInput,
                    wakeIntervalSeconds: inv.seconds,
                    regulatorQuiescentUa: ldo.iq,
                  };
                  const res = calculateIotBatteryLife(evalInput);
                  const isCatastrophic = ldo.iq >= 1000;
                  return (
                    <td key={lIdx} className="py-3 px-4 text-center font-mono">
                      <div className={`font-bold ${isCatastrophic ? 'text-rose-400' : 'text-emerald-400'}`}>
                        {res.estimatedYears >= 1
                          ? `${res.estimatedYears.toFixed(2)} Years`
                          : `${res.estimatedDays.toFixed(0)} Days`}
                      </div>
                      <div className="text-[10px] text-slate-500">
                        {res.averageCurrentMa < 1
                          ? `${(res.averageCurrentMa * 1000).toFixed(1)} µA avg`
                          : `${res.averageCurrentMa.toFixed(2)} mA avg`}
                      </div>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  // 2. Dynamic Sensitivity calculations for Patch Antenna (5 Common Laminates)
  const renderRfSensitivityTable = () => {
    const laminates = [
      { name: 'Standard FR-4', er: 4.4, tanD: '0.0200', desc: 'Low cost consumer PCB standard' },
      { name: 'Isola FR408', er: 3.67, tanD: '0.0120', desc: 'Enhanced speed mid-loss laminate' },
      { name: 'Rogers RO4350B', er: 3.48, tanD: '0.0037', desc: 'Industry benchmark for low-loss RF' },
      { name: 'Rogers RO4003C', er: 3.55, tanD: '0.0027', desc: 'High-frequency radar & 5.8 GHz FPV' },
      { name: 'Rogers RT/duroid 5880', er: 2.20, tanD: '0.0009', desc: 'PTFE microfibre glass composite' },
    ];

    return (
      <div className="w-full overflow-x-auto border border-slate-800 rounded-xl">
        <table className="w-full text-left text-xs font-mono border-collapse bg-slate-900/60">
          <thead>
            <tr className="border-b border-slate-800 bg-slate-950 text-slate-400 uppercase text-[11px]">
              <th className="py-3 px-4">Substrate Material</th>
              <th className="py-3 px-4 text-center">Permittivity (εr)</th>
              <th className="py-3 px-4 text-center">Loss Tangent (tan δ)</th>
              <th className="py-3 px-4 text-center">Patch Width (W)</th>
              <th className="py-3 px-4 text-center">Patch Length (L)</th>
              <th className="py-3 px-4 text-center">50Ω Inset (y0)</th>
              <th className="py-3 px-4">Engineering Evaluation</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/80 text-slate-300">
            {laminates.map((mat, idx) => {
              const res = calculateMicrostripPatch({
                frequencyGhz: rfFrequencyGhz,
                dielectricConstant: mat.er,
                substrateHeightMm: rfHeightMm,
                targetImpedanceOhm: 50,
              });

              return (
                <tr key={idx} className="hover:bg-slate-800/40 transition-colors">
                  <td className="py-3 px-4 font-bold text-cyan-300 flex items-center gap-2">
                    <Radio className="w-3.5 h-3.5 text-cyan-400" />
                    <span>{mat.name}</span>
                  </td>
                  <td className="py-3 px-4 text-center text-amber-300">{mat.er.toFixed(2)}</td>
                  <td className="py-3 px-4 text-center text-slate-400">{mat.tanD}</td>
                  <td className="py-3 px-4 text-center font-bold text-white">{res.patchWidthMm.toFixed(2)} mm</td>
                  <td className="py-3 px-4 text-center font-bold text-emerald-400">{res.patchLengthMm.toFixed(2)} mm</td>
                  <td className="py-3 px-4 text-center text-cyan-300">{res.insetFeedDepthMm.toFixed(2)} mm</td>
                  <td className="py-3 px-4 font-sans text-xs text-slate-400 leading-relaxed">{mat.desc}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  };

  // 3. Dynamic Sensitivity calculations for Pinout Checker (Physical GPIO Matrix)
  const renderPinoutSensitivityTable = () => {
    if (!activeMcu) return null;

    return (
      <div className="w-full overflow-x-auto border border-slate-800 rounded-xl">
        <table className="w-full text-left text-xs font-mono border-collapse bg-slate-900/60">
          <thead>
            <tr className="border-b border-slate-800 bg-slate-950 text-slate-400 uppercase text-[11px]">
              <th className="py-3 px-4">Silicon GPIO Pin</th>
              <th className="py-3 px-4 text-center">ADC Channel</th>
              <th className="py-3 px-4 text-center">Input-Only</th>
              <th className="py-3 px-4 text-center">5V Tolerant</th>
              <th className="py-3 px-4 text-center">Boot Strapping</th>
              <th className="py-3 px-4">Silicon Hardware Capabilities &amp; Notes</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/80 text-slate-300">
            {activeMcu.pins.map((pin, idx) => {
              const isAdc1 = pin.capabilities.includes('ADC1');
              const isAdc2 = pin.capabilities.includes('ADC2');
              const is5v =
                pin.notes?.includes('5V') ||
                pin.label?.includes('FT') ||
                activeMcu.operatingVoltage === 5.0;

              return (
                <tr key={idx} className="hover:bg-slate-800/40 transition-colors">
                  <td className="py-2.5 px-4 font-bold text-cyan-300 flex items-center gap-1.5">
                    <Cpu className="w-3.5 h-3.5 text-cyan-400" />
                    <span>{pin.gpio}</span>
                  </td>
                  <td className="py-2.5 px-4 text-center">
                    {isAdc1 ? (
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                        ADC1
                      </span>
                    ) : isAdc2 ? (
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-rose-500/10 text-rose-400 border border-rose-500/30">
                        ADC2 (Wi-Fi Shared)
                      </span>
                    ) : (
                      <span className="text-slate-600">—</span>
                    )}
                  </td>
                  <td className="py-2.5 px-4 text-center">
                    {pin.isInputOnly ? (
                      <span className="text-amber-400 font-bold text-[11px]">IN ONLY</span>
                    ) : (
                      <span className="text-slate-500 text-[11px]">Bi-Dir IO</span>
                    )}
                  </td>
                  <td className="py-2.5 px-4 text-center">
                    {is5v ? (
                      <span className="text-amber-400 font-bold">5V (FT)</span>
                    ) : (
                      <span className="text-slate-400">3.3V Max</span>
                    )}
                  </td>
                  <td className="py-2.5 px-4 text-center">
                    {pin.isStrappingPin ? (
                      <span className="px-2 py-0.5 rounded text-[10px] bg-amber-500/15 text-amber-300 border border-amber-500/30 font-bold">
                        STRAP
                      </span>
                    ) : (
                      <span className="text-slate-600">—</span>
                    )}
                  </td>
                  <td className="py-2.5 px-4 font-sans text-xs text-slate-400">
                    {pin.strappingBehavior ? (
                      <span className="text-amber-300/90 font-mono text-[11px] block">{pin.strappingBehavior}</span>
                    ) : pin.notes ? (
                      <span className="text-slate-400">{pin.notes}</span>
                    ) : (
                      pin.capabilities.join(', ')
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  };

  // Section 3: 4-Point Verification Checklist
  const getVerificationChecklist = () => {
    switch (category) {
      case 'iot-battery':
        return [
          {
            title: 'Low-ESR Decoupling Across Power Rail',
            desc: 'Place a 100 µF to 220 µF low-ESR ceramic or tantalum capacitor within 3 mm of the MCU supply pins to absorb 200–350 mA RF power amplifier spikes without triggering brownout reset (BOR).',
          },
          {
            title: 'Static IP & Fast NVRAM Re-Association',
            desc: 'Store BSSID, channel, and static IP configuration in non-volatile RTC memory. This bypasses the 2.5s DHCP negotiation round-trip and reduces radio transmit time from 2,000 ms to under 120 ms.',
          },
          {
            title: 'Sensor Power Gating via High-Side P-FET',
            desc: 'Connect I2C and analog sensor VDD lines to the drain of a logic-level P-channel MOSFET (such as DMG2305UX). Gate control cuts off parasitic microampere leakage during extended deep sleep.',
          },
          {
            title: 'Electrochemical Chemistry Cutoff Verification',
            desc: 'Verify that your LDO dropout voltage allows full discharge. A 3.3V LDO requires at least 3.45V input; pairing a 3.7V Li-Ion cell with a high-dropout regulator wastes the bottom 40% of the discharge curve.',
          },
        ];
      case 'patch-antenna':
        return [
          {
            title: 'Continuous Bottom Copper Ground Clearance',
            desc: 'Ensure the solid bottom ground plane extends at least 6 times the substrate thickness (6h) beyond all four physical edges of the patch (Wg ≥ W + 12h, Lg ≥ L + 12h) to eliminate pattern distortion.',
          },
          {
            title: 'Ground Perimeter Via Stitching Spacing',
            desc: 'Place ground stitching vias along the perimeter of the antenna board spaced no farther than λg / 10 apart to suppress parallel-plate waveguide surface modes and prevent RF leakage into adjacent traces.',
          },
          {
            title: 'Controlled Dielectric Permittivity Stackup',
            desc: 'Specify impedance-controlled PCB manufacturing with an engineering drawing calling for IPC-4101 qualified laminates. Commercial FR-4 variations between 4.2 and 4.6 can detune resonance by up to 45 MHz.',
          },
          {
            title: 'Vector Network Analyzer (VNA) Return-Loss Tuning',
            desc: 'After first-article assembly, measure S11 on a calibrated VNA. If resonance is shifted low, trim 0.5 mm copper from the radiating edges (L) with an exacto blade; if high, extend with copper foil tape.',
          },
        ];
      case 'pinout-checker':
        return [
          {
            title: 'Dedicated ADC1 Routing for Analog Sensors',
            desc: 'Always route battery voltage dividers and analog transducers to ADC1 pins. On ESP32 modules, ADC2 is multiplexed into the Wi-Fi baseband hardware and returns invalid readings while RF is active.',
          },
          {
            title: 'Boot Strapping Resistor Value Audit',
            desc: 'Verify that external sensor pull-up/pull-down resistors do not pull boot strapping pins (such as GPIO0, GPIO2, GPIO12 on ESP32 or GPIO8/9 on ESP32-C6) into forbidden flash boot voltage states.',
          },
          {
            title: 'I2C Multi-Drop Pull-Up Resistor Sizing',
            desc: 'Size bus pull-up resistors according to total bus trace capacitance. For 100 kHz standard mode, use 4.7 kΩ; for 400 kHz fast mode with multiple sensors on the shared lines, drop pull-ups to 2.2 kΩ.',
          },
          {
            title: 'Input-Only GPI Pin Buffer Verification',
            desc: 'Ensure GPIO pins 34 through 39 on ESP32 are strictly utilized as sensor inputs or ADC channels. These silicon pins lack internal pull-up/down transistors and cannot drive output logic levels.',
          },
        ];
    }
  };

  const checklist = getVerificationChecklist();

  return (
    <article className="w-full mt-12 pt-10 border-t border-slate-800/80 space-y-12 text-slate-300">
      {/* Article Header */}
      <div className="space-y-3">
        <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs uppercase tracking-wider">
          <BookOpen className="w-4 h-4" />
          <span>Dynamic Engineering Guide &amp; Technical Proof</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
          Engineering Derivation, Sensitivity Analysis &amp; Layout Advisory: {toolTitle}
        </h2>
        <p className="text-slate-400 text-sm leading-relaxed max-w-4xl font-sans">
          This comprehensive engineering publication documents the mathematical derivations, electromagnetic and
          electrochemical boundary conditions, and hardware layout considerations governing the active configuration
          above. All calculations execute deterministically on the client to provide instant peer-reviewable transparency.
        </p>
      </div>

      {/* Section 1: Live Step-by-Step Mathematical Derivation */}
      <section id="mathematical-derivation" className="space-y-5 scroll-mt-20">
        <div className="flex items-center gap-3">
          <span className="w-7 h-7 rounded-lg bg-cyan-500/20 text-cyan-400 text-xs font-mono flex items-center justify-center font-bold border border-cyan-500/30">
            1
          </span>
          <h3 className="text-xl font-bold text-white">
            Live Step-by-Step Mathematical Derivation ({formulaTitle})
          </h3>
        </div>
        <p className="text-xs text-slate-400 leading-relaxed font-sans max-w-3xl">
          Below is the step-by-step mathematical proof evaluated directly from your active parameters.
          Engineers and students can inspect the exact numerical substitutions into the classical governing formulas:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
          {steps.map((step, idx) => (
            <div
              key={idx}
              className="bg-slate-900/80 border border-slate-800 rounded-xl p-5 space-y-3 transition-colors hover:border-slate-700/80"
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-bold text-cyan-400 uppercase tracking-wide">
                  Step {idx + 1}: {step.title}
                </span>
                <CheckCircle2 className="w-4 h-4 text-emerald-400/90" />
              </div>

              {/* Formula */}
              <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800/80 font-mono text-xs overflow-x-auto">
                <span className="text-slate-500 block text-[10px] uppercase font-sans">Governing Equation</span>
                <code className="text-cyan-300 font-semibold">{step.formula}</code>
              </div>

              {/* Substitution */}
              <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800/80 font-mono text-xs overflow-x-auto">
                <span className="text-slate-500 block text-[10px] uppercase font-sans">Parameter Substitution</span>
                <code className="text-amber-300">{step.substitution}</code>
              </div>

              {/* Result */}
              <div className="flex items-center justify-between pt-1 text-xs font-mono border-t border-slate-800/60">
                <span className="text-slate-400 font-medium font-sans">Evaluated Result:</span>
                <span className="font-bold text-emerald-400 text-sm">{step.result}</span>
              </div>

              <p className="text-xs text-slate-400 leading-relaxed font-sans pt-1">
                {step.explanation}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Section 2: Multi-Scenario Sensitivity & Trade-Off Table */}
      <section id="sensitivity-comparison" className="space-y-5 scroll-mt-20">
        <div className="flex items-center gap-3">
          <span className="w-7 h-7 rounded-lg bg-cyan-500/20 text-cyan-400 text-xs font-mono flex items-center justify-center font-bold border border-cyan-500/30">
            2
          </span>
          <h3 className="text-xl font-bold text-white">
            Multi-Scenario Sensitivity &amp; Parameter Trade-Off Table
          </h3>
        </div>
        <p className="text-xs text-slate-400 leading-relaxed font-sans max-w-3xl">
          Hardware engineering involves navigating non-linear trade-offs between physical geometry, parasitic power
          losses, and component costs. The dynamic matrix below evaluates the performance impact of adjacent design choices:
        </p>

        {category === 'iot-battery' && renderIotSensitivityTable()}
        {category === 'patch-antenna' && renderRfSensitivityTable()}
        {category === 'pinout-checker' && renderPinoutSensitivityTable()}

        {/* Supplementary Qualitative Trade-off Table */}
        {tradeOffRows.length > 0 && (
          <div className="space-y-3 pt-3">
            <h4 className="text-xs font-mono font-bold text-slate-300 uppercase tracking-wider">
              Component-Level Qualitative Trade-Off Matrix
            </h4>
            <div className="w-full overflow-x-auto border border-slate-800 rounded-xl">
              <table className="w-full text-left text-xs font-mono border-collapse bg-slate-900/60">
                <thead>
                  <tr className="border-b border-slate-800 bg-slate-950 text-slate-400 uppercase text-[11px]">
                    <th className="py-3 px-4">Design Parameter</th>
                    <th className="py-3 px-4">Standard Baseline</th>
                    <th className="py-3 px-4">Alternative Variant</th>
                    <th className="py-3 px-4">Hardware Impact &amp; Engineering Rationale</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/80 text-slate-300">
                  {tradeOffRows.map((row, i) => (
                    <tr key={i} className="hover:bg-slate-800/40 transition-colors">
                      <td className="py-3 px-4 font-bold text-cyan-300">{row.parameter}</td>
                      <td className="py-3 px-4 text-slate-400">{row.baseline}</td>
                      <td className="py-3 px-4 text-amber-300">{row.variant}</td>
                      <td className="py-3 px-4 font-sans text-xs text-slate-300 leading-relaxed">{row.impact}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </section>

      {/* Section 3: Hardware Implementation & PCB Layout Advisory */}
      <section id="hardware-advisory" className="space-y-5 scroll-mt-20">
        <div className="flex items-center gap-3">
          <span className="w-7 h-7 rounded-lg bg-cyan-500/20 text-cyan-400 text-xs font-mono flex items-center justify-center font-bold border border-cyan-500/30">
            3
          </span>
          <h3 className="text-xl font-bold text-white">
            Hardware Implementation &amp; PCB Layout Advisory
          </h3>
        </div>

        {advisoryNote && (
          <div className="p-5 rounded-xl bg-amber-950/20 border border-amber-500/40 space-y-2">
            <div className="flex items-center gap-2 text-amber-400 font-mono text-xs font-bold uppercase tracking-wide">
              <AlertTriangle className="w-4 h-4 shrink-0" />
              <span>Silicon &amp; Layout Critical Engineering Advisory</span>
            </div>
            <p className="text-xs text-amber-200/90 leading-relaxed font-sans">
              {advisoryNote}
            </p>
          </div>
        )}

        <div className="space-y-3 pt-2">
          <h4 className="text-xs font-mono font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>4-Point Engineering Verification Checklist Prior to PCB Release</span>
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {checklist.map((item, i) => (
              <div key={i} className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1.5">
                <div className="flex items-center gap-2 text-xs font-mono font-bold text-white">
                  <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-[10px]">
                    {i + 1}
                  </span>
                  <span>{item.title}</span>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed font-sans pl-7">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 4: Technical FAQs (Expandable <details open> elements) */}
      <section id="engineering-faq" className="space-y-5 scroll-mt-20">
        <div className="flex items-center gap-3">
          <span className="w-7 h-7 rounded-lg bg-cyan-500/20 text-cyan-400 text-xs font-mono flex items-center justify-center font-bold border border-cyan-500/30">
            4
          </span>
          <h3 className="text-xl font-bold text-white">
            Authoritative Technical Engineering FAQ
          </h3>
        </div>
        <p className="text-xs text-slate-400 leading-relaxed font-sans max-w-3xl">
          Detailed technical answers addressing core electrical engineering, firmware architecture, and RF layout
          questions commonly encountered during laboratory testing and design review:
        </p>

        <div className="space-y-3 pt-1">
          {faqs.map((faq, idx) => (
            <details
              key={idx}
              open
              className="group bg-slate-900/80 border border-slate-800 rounded-xl overflow-hidden transition-all duration-200 open:border-slate-700/80"
            >
              <summary className="flex items-center justify-between p-4 cursor-pointer select-none font-semibold text-sm text-white hover:text-cyan-400 transition-colors list-none">
                <span className="flex items-center gap-2.5">
                  <HelpCircle className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span>{faq.question}</span>
                </span>
                <ChevronDown className="w-4 h-4 text-slate-500 transition-transform duration-200 group-open:rotate-180 shrink-0" />
              </summary>
              <div className="px-5 pb-5 pt-1 text-xs text-slate-300 font-sans leading-relaxed border-t border-slate-800/50">
                <p className="mt-2 text-slate-400">{faq.answer}</p>
              </div>
            </details>
          ))}
        </div>
      </section>
    </article>
  );
};
