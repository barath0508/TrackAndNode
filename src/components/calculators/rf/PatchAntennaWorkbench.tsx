'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { PatchAntennaInput, calculateMicrostripPatch } from '@/lib/patch-antenna-math';
import { RF_SUBSTRATES, RfSubstrate } from '@/data/rf-substrates';
import { DualInput } from '@/components/ui/DualInput';
import { MetricCard } from '@/components/ui/MetricCard';
import { PresetPillBar } from '@/components/ui/PresetPillBar';
import { MobileTelemetryDock } from '@/components/ui/MobileTelemetryDock';
import { PatchBlueprintSvg } from './PatchBlueprintSvg';
import { AdSlot } from '@/components/layout/AdSlot';
import { WorkedExampleSection } from '@/components/seo/WorkedExampleSection';
import { RelatedToolsMatrix } from '@/components/seo/RelatedToolsMatrix';
import { JsonLdSchema } from '@/components/seo/JsonLdSchema';
import { RF_PATCH_PRESETS, RfPresetSeo } from '@/data/pseo-presets';
import { Radio, Layers, AlertTriangle, ShieldCheck, Sparkles, Sliders } from 'lucide-react';

interface PatchAntennaWorkbenchProps {
  initialPreset?: RfPresetSeo;
}

export const PatchAntennaWorkbench: React.FC<PatchAntennaWorkbenchProps> = ({ initialPreset }) => {
  const defaultInputs: PatchAntennaInput = initialPreset?.inputs || {
    frequencyGhz: 2.45,
    dielectricConstant: 4.4,
    substrateHeightMm: 1.6,
    targetImpedanceOhm: 50,
  };

  const [inputs, setInputs] = useState<PatchAntennaInput>(defaultInputs);
  const [selectedSubstrateId, setSelectedSubstrateId] = useState<string>('fr4-standard');

  const updateParam = <K extends keyof PatchAntennaInput>(key: K, val: PatchAntennaInput[K]) => {
    setInputs((prev) => ({ ...prev, [key]: val }));
  };

  const handleSubstrateSelect = (substrateId: string) => {
    setSelectedSubstrateId(substrateId);
    const sub = RF_SUBSTRATES.find((s) => s.id === substrateId);
    if (sub) {
      setInputs((prev) => ({
        ...prev,
        dielectricConstant: sub.dielectricConstant,
        substrateHeightMm: sub.standardHeightMm,
      }));
    }
  };

  const output = calculateMicrostripPatch(inputs);
  const currentSubstrate = RF_SUBSTRATES.find((s) => s.id === selectedSubstrateId);

  // Surface wave loss rule: h / lambda0 > 0.05 causes significant surface wave trapping
  const surfaceWaveRatio = (inputs.substrateHeightMm / 1000) / (299792458 / (inputs.frequencyGhz * 1e9));
  const hasHighSurfaceWaves = surfaceWaveRatio > 0.04;

  // Aspect ratio check: W/L ratio
  const wlRatio = output.patchWidthMm / output.patchLengthMm;

  // Step-by-step mathematical proof substitutions
  const c = 299792458;
  const f0 = inputs.frequencyGhz * 1e9;
  const er = inputs.dielectricConstant;
  const hMm = inputs.substrateHeightMm;

  const workedSteps = [
    {
      title: 'Physical Patch Width (W)',
      formula: 'W = [c / (2 · f0)] · sqrt(2 / (ε_r + 1))',
      substitution: `[${c.toLocaleString()} / (2 · ${(f0 / 1e9).toFixed(3)} GHz)] · sqrt(2 / (${er} + 1))`,
      result: `${output.patchWidthMm.toFixed(3)} mm`,
      explanation: 'Determines the transverse resonant patch width to maximize radiation conductance while avoiding cross-polarization excitation.',
    },
    {
      title: 'Effective Dielectric Constant (ε_eff)',
      formula: 'ε_eff = (ε_r + 1)/2 + [(ε_r - 1)/2] · [1 + 12·(h / W)]^(-0.5)',
      substitution: `(${er} + 1)/2 + [(${er} - 1)/2] · [1 + 12·(${hMm} / ${output.patchWidthMm.toFixed(2)})]^(-0.5)`,
      result: `${output.effectivePermittivity.toFixed(4)}`,
      explanation: 'Accounts for fringing electric field lines traveling partly through the dielectric substrate and partly through ambient air.',
    },
    {
      title: 'Hammerstad Fringing Length Extension (ΔL)',
      formula: 'ΔL = 0.412·h · [(ε_eff + 0.3)·(W/h + 0.264)] / [(ε_eff - 0.258)·(W/h + 0.8)]',
      substitution: `0.412 · ${hMm} · [(${output.effectivePermittivity.toFixed(3)} + 0.3)·(${output.patchWidthMm.toFixed(1)}/${hMm} + 0.264)] / [(${output.effectivePermittivity.toFixed(3)} - 0.258)·(${output.patchWidthMm.toFixed(1)}/${hMm} + 0.8)]`,
      result: `${output.fringingExtensionMm.toFixed(3)} mm`,
      explanation: 'Fringing fields make the antenna appear electrically larger than its physical copper boundary by ΔL on both radiating edges.',
    },
    {
      title: 'Actual Resonant Copper Length (L)',
      formula: 'L = [c / (2 · f0 · sqrt(ε_eff))] - 2·ΔL',
      substitution: `[${c.toLocaleString()} / (2 · ${(f0 / 1e9).toFixed(3)} GHz · sqrt(${output.effectivePermittivity.toFixed(3)}))] - 2 · ${output.fringingExtensionMm.toFixed(3)} mm`,
      result: `${output.patchLengthMm.toFixed(3)} mm`,
      explanation: 'Physical patch length required to establish exact half-wavelength standing wave resonance at the operating center frequency.',
    },
    {
      title: '50-Ohm Inset Feed Notch Depth (y0)',
      formula: 'y0 = (L / π) · arccos(sqrt(Z0 / R_edge))',
      substitution: `(${output.patchLengthMm.toFixed(2)} / π) · arccos(sqrt(${inputs.targetImpedanceOhm} / ${output.edgeImpedanceOhm.toFixed(1)}))`,
      result: `${output.insetFeedDepthMm.toFixed(3)} mm`,
      explanation: 'Recesses the 50-Ohm microstrip line into the patch to match high radiating edge impedance (R_edge) down to system impedance.',
    },
  ];

  const tradeOffRows = initialPreset?.tradeOffRows || [
    { parameter: 'Substrate Material', baseline: 'FR-4 Standard (er=4.4)', variant: 'Rogers RO4003C (er=3.55)', impact: 'Rogers boosts radiation efficiency from 58% to 88% (+1.8 dB gain)' },
    { parameter: 'Substrate Height', baseline: '1.6 mm', variant: '0.8 mm', impact: 'Thinner substrate cuts bandwidth by 50%, tightening fabrication tolerances' },
    { parameter: 'Target Impedance', baseline: '50 Ohm', variant: '75 Ohm', impact: 'Narrows 50Ω feedline width from ~3.06mm to ~1.45mm' },
    { parameter: 'Ground Plane Margin', baseline: 'W + 6h (Recommended)', variant: 'W + 2h (Compact)', impact: 'Causes edge diffraction ripple and degrades front-to-back isolation' },
  ];

  const faqs = initialPreset?.faqs || [
    {
      question: 'What is the Hammerstad-Jensen transmission line model?',
      answer: 'It is the industry-standard closed-form analytical formulation that calculates microstrip fringing field length extension (ΔL) and effective permittivity (ε_eff) with higher accuracy than basic cavity models.',
    },
    {
      question: 'Why does a microstrip patch antenna need an inset feed notch?',
      answer: 'The physical edge impedance of a half-wave patch is typically 200Ω to 400Ω. Connecting a standard 50Ω transmission line directly to the edge causes high signal reflection (VSWR > 4:1). Recessing the feedline into the patch by distance y0 matches down to 50Ω.',
    },
    {
      question: 'How does substrate height affect antenna bandwidth and efficiency?',
      answer: 'Increasing substrate height widens impedance bandwidth but eventually launches unwanted surface-wave modes if h > 0.05λ0, which scatter off ground edges and degrade radiation patterns.',
    },
    {
      question: 'How do I use the exported CST Studio Suite macro?',
      answer: 'In CST Studio Suite, open Home -> Macros -> Make/Edit Macro, paste the VBScript snippet generated by TrackAndNode, and run it to automatically parameterize the 3D CAD model.',
    },
  ];

  const presetList = RF_PATCH_PRESETS.map((p) => ({
    slug: p.slug,
    badge: p.badge || p.bandApplicationName,
    title: p.title || p.h1Title,
    href: `/patch-antenna-calculator/${p.slug}`,
    isActive: initialPreset?.slug === p.slug,
  }));

  const pageTitle = initialPreset?.h1Title || initialPreset?.h1 || 'Microstrip Patch Antenna & PCB Trace Impedance Calculator';
  const pageMetaTitle = initialPreset?.metaTitle || 'Microstrip Patch Antenna & PCB Trace Impedance Calculator — TraceAndNode';

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <JsonLdSchema
        toolName={pageMetaTitle}
        canonicalUrl={`https://traceandnode.com/patch-antenna-calculator${initialPreset ? `/${initialPreset.slug}` : ''}`}
        categoryName="RF & Microwave Design"
        description={initialPreset?.metaDescription || 'Calculate physical patch dimensions, inset feed depth, and CST macros with Balanis transmission line models.'}
        faqs={faqs}
      />

      {/* Breadcrumb & Header */}
      <div className="space-y-2">
        <nav className="flex items-center gap-2 text-xs font-mono text-slate-400">
          <Link href="/" className="hover:text-cyan-400 transition-colors">Home</Link>
          <span>/</span>
          <Link href="/patch-antenna-calculator" className="text-slate-300">Patch Antenna Calculator</Link>
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
            'Design high-efficiency rectangular microstrip patch antennas and calculate characteristic 50-Ohm feedline geometry using closed-form Balanis and Hammerstad-Jensen models with 1-click CST Studio Suite VBScript export.'}
        </p>
      </div>

      {/* Preset Pill Bar */}
      <PresetPillBar presets={presetList} baseToolPath="/patch-antenna-calculator" />

      {/* Top Banner AdSlot (Zero-CLS) */}
      <AdSlot id="ad-slot-top-banner" slotType="top-banner" />

      {/* 12-Column Asymmetric Split Workbench */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start my-8">
        {/* Left Pane: Parameter Controls (5 Columns) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Card 1: Operating Frequency & Impedance */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-5 space-y-4">
            <div className="flex items-center gap-2 pb-2 border-b border-slate-800/80">
              <Radio className="w-4 h-4 text-cyan-400" />
              <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-cyan-400">
                1. Frequency &amp; Port Impedance
              </h3>
            </div>

            <DualInput
              id="frequencyGhz"
              label="Center Resonant Frequency (f0)"
              value={inputs.frequencyGhz}
              unit="GHz"
              min={0.4}
              max={30.0}
              step={0.05}
              onChange={(val) => updateParam('frequencyGhz', val)}
              helpText="e.g. 2.45 (Wi-Fi), 5.8 (FPV)"
            />

            <DualInput
              id="targetImpedance"
              label="Target System Impedance (Z0)"
              value={inputs.targetImpedanceOhm}
              unit="Ω"
              min={25}
              max={150}
              step={1}
              onChange={(val) => updateParam('targetImpedanceOhm', val)}
              helpText="Standard RF is 50 Ohm"
            />
          </div>

          {/* Card 2: Substrate Material & Geometry */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-5 space-y-4">
            <div className="flex items-center gap-2 pb-2 border-b border-slate-800/80">
              <Layers className="w-4 h-4 text-emerald-400" />
              <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-emerald-400">
                2. Dielectric Substrate &amp; PCB Stackup
              </h3>
            </div>

            {/* Quick Material Presets Dropdown */}
            <div className="space-y-1.5">
              <label htmlFor="substrateSelect" className="text-xs font-medium text-slate-300">
                Pre-calibrated Substrate Laminates
              </label>
              <select
                id="substrateSelect"
                value={selectedSubstrateId}
                onChange={(e) => handleSubstrateSelect(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs font-mono text-slate-100 focus:outline-none focus:border-cyan-500"
              >
                {RF_SUBSTRATES.map((sub) => (
                  <option key={sub.id} value={sub.id}>
                    {sub.name} (εr={sub.dielectricConstant}, h={sub.standardHeightMm}mm)
                  </option>
                ))}
              </select>
            </div>

            <DualInput
              id="dielectricConstant"
              label="Relative Permittivity (ε_r)"
              value={inputs.dielectricConstant}
              unit="εr"
              min={1.05}
              max={15.0}
              step={0.05}
              onChange={(val) => updateParam('dielectricConstant', val)}
              helpText="4.4 (FR-4), 3.55 (Rogers 4003C)"
            />

            <DualInput
              id="substrateHeight"
              label="Substrate Thickness (h)"
              value={inputs.substrateHeightMm}
              unit="mm"
              min={0.1}
              max={6.0}
              step={0.05}
              onChange={(val) => updateParam('substrateHeightMm', val)}
              helpText="Standard PCB thickness: 1.6 mm"
            />
          </div>

          {/* Card 3: Quick Substrate Summary */}
          {currentSubstrate && (
            <div className="bg-slate-950/70 border border-slate-800/80 rounded-xl p-4 text-xs font-mono space-y-1.5">
              <span className="text-cyan-400 font-bold block">{currentSubstrate.name}</span>
              <p className="text-slate-400 text-[11px] leading-relaxed">{currentSubstrate.description}</p>
              <div className="flex gap-4 pt-1 text-[10px] text-slate-500">
                <span>Loss Tangent: {currentSubstrate.lossTangent}</span>
                <span>Application: {currentSubstrate.application}</span>
              </div>
            </div>
          )}
        </div>

        {/* Right Pane: Sticky Live Telemetry & CAD View (7 Columns) */}
        <div className="lg:col-span-7 lg:sticky lg:top-20 space-y-6">
          {/* Row 1: Primary KPI Ribbon */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <MetricCard
              label="Patch Width (W)"
              value={output.patchWidthMm.toFixed(2)}
              unit="mm"
              subtext={`${(output.patchWidthMm * 39.37).toFixed(0)} mil`}
              variant="cyan"
            />
            <MetricCard
              label="Patch Length (L)"
              value={output.patchLengthMm.toFixed(2)}
              unit="mm"
              subtext={`${(output.patchLengthMm * 39.37).toFixed(0)} mil`}
              variant="emerald"
            />
            <MetricCard
              label="Inset Notch (y0)"
              value={output.insetFeedDepthMm.toFixed(2)}
              unit="mm"
              subtext={`50Ω Trace: ${output.feedTraceWidthMm.toFixed(2)} mm`}
              variant="amber"
            />
          </div>

          {/* Row 2: Interactive SVG Visualizer */}
          <PatchBlueprintSvg
            input={inputs}
            output={output}
            substrateColorHex={currentSubstrate?.colorHex || '#064E3B'}
          />

          {/* Row 3: Diagnostic Status Banner */}
          {hasHighSurfaceWaves ? (
            <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-4 flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
              <div className="space-y-1 text-xs">
                <span className="font-mono font-bold text-amber-400">Surface-Wave Trapping Advisory:</span>
                <p className="text-amber-200/90 font-sans leading-relaxed">
                  Substrate height ({inputs.substrateHeightMm} mm) exceeds 0.04 λ0 ({((inputs.substrateHeightMm / 1000) / (c / f0) * 100).toFixed(1)}% of free-space wavelength). Consider reducing substrate thickness to minimize parasitic surface-wave modes and edge diffraction ripple.
                </p>
              </div>
            </div>
          ) : (
            <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-xl p-4 flex items-center gap-3">
              <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
              <p className="text-xs text-emerald-200 font-sans">
                <strong>Optimal Radiation Geometry:</strong> Width-to-length ratio ({wlRatio.toFixed(2)}) guarantees stable broadside directivity with minimum surface-wave degradation.
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
        category="patch-antenna"
        formulaTitle="Balanis Transmission Line Synthesis"
        steps={workedSteps}
        tradeOffRows={tradeOffRows}
        faqs={faqs}
        advisoryNote={initialPreset?.rfLayoutNote}
        rfFrequencyGhz={inputs.frequencyGhz}
        rfHeightMm={inputs.substrateHeightMm}
      />

      {/* Hub-and-Spoke Cross-Discipline Linking Matrix */}
      <RelatedToolsMatrix
        currentCategory="patch-antenna"
        relatedIotSlug={initialPreset?.relatedIotSlug}
        relatedPinoutSlug={initialPreset?.relatedPinoutSlug}
      />

      {/* Mobile Sticky Bottom Telemetry Dock */}
      <MobileTelemetryDock
        primaryLabel="Calculated Patch Size"
        primaryValue={`${output.patchWidthMm.toFixed(1)} × ${output.patchLengthMm.toFixed(1)} mm`}
        primaryUnit={`(${output.insetFeedDepthMm.toFixed(1)}mm notch)`}
        targetDiagramId="interactive-visualizer"
      />
    </div>
  );
};
