// src/components/seo/RelatedToolsMatrix.tsx
import React from 'react';
import Link from 'next/link';
import {
  ArrowRight,
  Battery,
  Radio,
  Cpu,
  Layers,
  Sparkles,
} from 'lucide-react';
import {
  IOT_BATTERY_PRESETS,
  RF_PATCH_PRESETS,
  PINOUT_CHECKER_PRESETS,
} from '@/data/pseo-presets';

interface RelatedToolsMatrixProps {
  currentCategory: 'iot-battery' | 'patch-antenna' | 'pinout-checker';
  relatedIotSlug?: string;
  relatedRfSlug?: string;
  relatedPinoutSlug?: string;
}

export const RelatedToolsMatrix: React.FC<RelatedToolsMatrixProps> = ({
  currentCategory,
  relatedIotSlug,
  relatedRfSlug,
  relatedPinoutSlug,
}) => {
  // Find linked cross-discipline presets
  const relatedIotPreset = IOT_BATTERY_PRESETS.find((p) => p.slug === relatedIotSlug);
  const relatedRfPreset = RF_PATCH_PRESETS.find((p) => p.slug === relatedRfSlug);
  const relatedPinoutPreset = PINOUT_CHECKER_PRESETS.find((p) => p.slug === relatedPinoutSlug);

  // Sibling presets in the active category
  const siblingPresets =
    currentCategory === 'iot-battery'
      ? IOT_BATTERY_PRESETS.map((p) => ({
          title: p.title || p.h1Title,
          slug: p.slug,
          badge: p.badge || p.targetMcuName,
          desc: p.metaDescription,
          href: `/iot-battery-calculator/${p.slug}`,
        }))
      : currentCategory === 'patch-antenna'
      ? RF_PATCH_PRESETS.map((p) => ({
          title: p.title || p.h1Title,
          slug: p.slug,
          badge: p.badge || p.bandApplicationName,
          desc: p.metaDescription,
          href: `/patch-antenna-calculator/${p.slug}`,
        }))
      : PINOUT_CHECKER_PRESETS.map((p) => ({
          title: p.title || p.h1Title,
          slug: p.slug,
          badge: p.badge || p.boardId,
          desc: p.metaDescription,
          href: `/pinout-conflict-checker/${p.slug}`,
        }));

  return (
    <div className="w-full mt-12 pt-10 border-t border-slate-800/80 space-y-10 text-slate-300">
      {/* 1. Cross-Discipline Hardware Stack Card */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs uppercase tracking-wider">
          <Sparkles className="w-4 h-4" />
          <span>Cross-Discipline Hardware Stack</span>
        </div>
        <h3 className="text-xl font-bold text-white">
          Complete Your Hardware Design Workflow
        </h3>
        <p className="text-xs text-slate-400 leading-relaxed max-w-3xl">
          Hardware systems require synchronized electrical, RF, and firmware pin planning.
          Navigate seamlessly to sibling tools configured for this exact hardware architecture:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
          {/* Linked RF Antenna Card */}
          {currentCategory !== 'patch-antenna' && (
            <Link
              href={
                relatedRfPreset
                  ? `/patch-antenna-calculator/${relatedRfPreset.slug}`
                  : '/patch-antenna-calculator'
              }
              className="p-5 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-cyan-500/50 hover:bg-slate-850/60 transition-all group flex flex-col justify-between space-y-3"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center gap-1.5 text-xs font-mono text-cyan-400 font-bold">
                    <Radio className="w-4 h-4" />
                    <span>RF &amp; PCB Trace Workbench</span>
                  </span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-300 border border-cyan-500/30">
                    {relatedRfPreset?.badge || 'RF Patch'}
                  </span>
                </div>
                <h4 className="text-sm font-bold text-white group-hover:text-cyan-300 transition-colors">
                  {relatedRfPreset
                    ? `Designing the PCB antenna for this node? Open the ${relatedRfPreset.bandApplicationName} Patch Calculator`
                    : 'Design Custom 50Ω Microstrip Trace & PCB Patch Antenna'}
                </h4>
                <p className="text-xs text-slate-400 font-sans leading-relaxed line-clamp-2">
                  {relatedRfPreset?.metaDescription ||
                    'Compute exact copper patch width W, length L, inset feed depth, and CST Studio macros.'}
                </p>
              </div>
              <div className="flex items-center gap-1 text-xs font-mono font-bold text-cyan-400 group-hover:translate-x-1 transition-transform">
                <span>Launch RF Workbench</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </Link>
          )}

          {/* Linked IoT Battery Card */}
          {currentCategory !== 'iot-battery' && (
            <Link
              href={
                relatedIotPreset
                  ? `/iot-battery-calculator/${relatedIotPreset.slug}`
                  : '/iot-battery-calculator'
              }
              className="p-5 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-emerald-500/50 hover:bg-slate-850/60 transition-all group flex flex-col justify-between space-y-3"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center gap-1.5 text-xs font-mono text-emerald-400 font-bold">
                    <Battery className="w-4 h-4" />
                    <span>Battery &amp; Power Profiler</span>
                  </span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-300 border border-emerald-500/30">
                    {relatedIotPreset?.badge || 'Duty-Cycle'}
                  </span>
                </div>
                <h4 className="text-sm font-bold text-white group-hover:text-emerald-300 transition-colors">
                  {relatedIotPreset
                    ? `Estimating off-grid battery life for this module? Open the ${relatedIotPreset.targetMcuName} Power Profiler`
                    : 'Model Multi-State Duty-Cycle Power & Battery Life'}
                </h4>
                <p className="text-xs text-slate-400 font-sans leading-relaxed line-clamp-2">
                  {relatedIotPreset?.metaDescription ||
                    'Simulate deep sleep, sensor polling, and RF burst energy across Li-Ion and coin cells.'}
                </p>
              </div>
              <div className="flex items-center gap-1 text-xs font-mono font-bold text-emerald-400 group-hover:translate-x-1 transition-transform">
                <span>Launch Battery Profiler</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </Link>
          )}

          {/* Linked Pinout Checker Card */}
          {currentCategory !== 'pinout-checker' && (
            <Link
              href={
                relatedPinoutPreset
                  ? `/pinout-conflict-checker/${relatedPinoutPreset.slug}`
                  : '/pinout-conflict-checker'
              }
              className="p-5 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-amber-500/50 hover:bg-slate-850/60 transition-all group flex flex-col justify-between space-y-3"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center gap-1.5 text-xs font-mono text-amber-400 font-bold">
                    <Cpu className="w-4 h-4" />
                    <span>Pinout Conflict Solver</span>
                  </span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/10 text-amber-300 border border-amber-500/30">
                    {relatedPinoutPreset?.badge || 'Silicon Rules'}
                  </span>
                </div>
                <h4 className="text-sm font-bold text-white group-hover:text-amber-300 transition-colors">
                  {relatedPinoutPreset
                    ? `Wiring SPI & I2C sensors to this MCU? Check the ${relatedPinoutPreset.h1Title}`
                    : 'Check Silicon Pin Contention & Boot Strapping Hazards'}
                </h4>
                <p className="text-xs text-slate-400 font-sans leading-relaxed line-clamp-2">
                  {relatedPinoutPreset?.metaDescription ||
                    'Evaluate direct GPIO collisions, ADC2 Wi-Fi lockouts, and auto-generate C++ pin_config.h.'}
                </p>
              </div>
              <div className="flex items-center gap-1 text-xs font-mono font-bold text-amber-400 group-hover:translate-x-1 transition-transform">
                <span>Launch Pinout Solver</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </Link>
          )}
        </div>
      </div>

      {/* 2. Sibling Preset Directory Grid */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 text-slate-400 font-mono text-xs uppercase tracking-wider">
          <Layers className="w-4 h-4" />
          <span>Category Directory &amp; Static Pre-Rendered Profiles</span>
        </div>
        <h3 className="text-lg font-bold text-white">
          Explore All Pre-Configured Hardware Profiles in this Category
        </h3>
        <p className="text-xs text-slate-400 leading-relaxed max-w-3xl">
          Every profile below is pre-rendered statically with complete step-by-step mathematical proofs and verified
          against manufacturer technical reference manuals:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 pt-1">
          {siblingPresets.map((preset) => (
            <Link
              key={preset.slug}
              href={preset.href}
              className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-cyan-500/40 hover:bg-slate-850/80 transition-all flex flex-col justify-between space-y-2 group"
            >
              <div className="space-y-1.5">
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700/80">
                  {preset.badge}
                </span>
                <h4 className="text-xs font-bold text-white group-hover:text-cyan-300 transition-colors line-clamp-2">
                  {preset.title}
                </h4>
                <p className="text-[11px] text-slate-400 line-clamp-2 font-sans leading-relaxed">
                  {preset.desc}
                </p>
              </div>
              <div className="text-[11px] font-mono text-cyan-400 font-medium flex items-center gap-1 pt-1">
                <span>Open Profile</span>
                <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};
