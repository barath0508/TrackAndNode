import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import {
  BatteryCharging,
  Radio,
  Cpu,
  ArrowRight,
  Zap,
  Shield,
  Activity,
  Layers,
  Code2,
  Sliders,
  CheckCircle,
} from 'lucide-react';
import { AdSlot } from '@/components/layout/AdSlot';
import { IOT_PRESETS, RF_PRESETS, PINOUT_PRESETS } from '@/data/pseo-presets';

export const metadata: Metadata = {
  title: 'TraceAndNode — High-Speed Hardware Engineering & RF Calculation Suite',
  description:
    'Free, copyright-clean, zero-latency engineering utility platform featuring an IoT Battery Life Profiler, Microstrip Patch Antenna CAD Calculator, and MCU Pinout Conflict Checker.',
};

export default function HomePage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">
      {/* Hero Section */}
      <section className="text-center space-y-6 pt-4 sm:pt-10">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono font-medium">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
          <span>100% Client-Side Compute • 0 API Latency • Closed-Form Physics</span>
        </div>

        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white max-w-4xl mx-auto leading-tight">
          High-Speed Hardware Engineering &amp; RF Workbench
        </h1>

        <p className="text-slate-400 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
          Procedural 2D vector blueprints, deterministic silicon conflict solver, and closed-form transmission line models executed instantly in your browser with zero backend latency.
        </p>

        {/* Hero Quick Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
          <Link
            href="/iot-battery-calculator"
            className="px-5 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold text-sm flex items-center gap-2 shadow-lg shadow-cyan-500/25 transition-all hover:scale-105"
          >
            <BatteryCharging className="w-4 h-4 stroke-[2.5]" />
            <span>Launch IoT Battery Profiler</span>
          </Link>
          <Link
            href="/patch-antenna-calculator"
            className="px-5 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-white font-semibold text-sm flex items-center gap-2 transition-all hover:scale-105"
          >
            <Radio className="w-4 h-4 text-cyan-400" />
            <span>Patch Antenna CAD</span>
          </Link>
          <Link
            href="/pinout-conflict-checker"
            className="px-5 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-white font-semibold text-sm flex items-center gap-2 transition-all hover:scale-105"
          >
            <Cpu className="w-4 h-4 text-emerald-400" />
            <span>MCU Pinout Solver</span>
          </Link>
        </div>
      </section>

      {/* Top Banner AdSlot */}
      <AdSlot id="ad-slot-top-banner" slotType="top-banner" />

      {/* 3 Interactive Engineering Tools Showcase */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b border-slate-800 pb-4">
          <div>
            <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider">
              Core Utility Suite
            </span>
            <h2 className="text-2xl font-bold text-white mt-1">
              Precision Calculators for Hardware Developers
            </h2>
          </div>
          <span className="text-xs font-mono text-slate-500">
            60 FPS Synchronous State Updates
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Tool Card 1: IoT Battery */}
          <Link
            href="/iot-battery-calculator"
            className="group relative bg-slate-900/80 hover:bg-slate-900 border border-slate-800 hover:border-cyan-500/50 rounded-2xl p-6 transition-all duration-300 flex flex-col justify-between shadow-lg hover:shadow-cyan-500/10"
          >
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-cyan-500/15 border border-cyan-500/30 flex items-center justify-center text-cyan-400 group-hover:scale-110 transition-transform">
                <BatteryCharging className="w-6 h-6 stroke-[2]" />
              </div>

              <div>
                <span className="text-[11px] font-mono font-semibold px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                  Duty-Cycle Simulation
                </span>
                <h3 className="text-xl font-bold text-white mt-2 group-hover:text-cyan-300 transition-colors">
                  IoT Battery Life &amp; Power Profiler
                </h3>
                <p className="text-slate-400 text-xs mt-2 leading-relaxed">
                  Calculates time-weighted average current, LDO quiescent leakage overhead, and usable capacity derating across sleep, sensor poll, and radio TX bursts.
                </p>
              </div>

              <div className="space-y-1.5 pt-2 text-xs font-mono text-slate-400 border-t border-slate-800/80">
                <div className="flex justify-between">
                  <span>Log Waveform SVG:</span>
                  <span className="text-cyan-400 font-semibold">Included</span>
                </div>
                <div className="flex justify-between">
                  <span>Battery Derating:</span>
                  <span className="text-slate-200">Coin Cell &amp; LiFePO4</span>
                </div>
              </div>
            </div>

            <div className="pt-6 flex items-center gap-2 text-xs font-mono font-bold text-cyan-400 group-hover:translate-x-1 transition-transform">
              <span>Open Profiler</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </Link>

          {/* Tool Card 2: Patch Antenna */}
          <Link
            href="/patch-antenna-calculator"
            className="group relative bg-slate-900/80 hover:bg-slate-900 border border-slate-800 hover:border-cyan-500/50 rounded-2xl p-6 transition-all duration-300 flex flex-col justify-between shadow-lg hover:shadow-cyan-500/10"
          >
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-blue-500/15 border border-blue-500/30 flex items-center justify-center text-blue-400 group-hover:scale-110 transition-transform">
                <Radio className="w-6 h-6 stroke-[2]" />
              </div>

              <div>
                <span className="text-[11px] font-mono font-semibold px-2 py-0.5 rounded bg-blue-500/10 text-blue-400 border border-blue-500/20">
                  Balanis Transmission Line
                </span>
                <h3 className="text-xl font-bold text-white mt-2 group-hover:text-cyan-300 transition-colors">
                  Microstrip Patch Antenna CAD
                </h3>
                <p className="text-slate-400 text-xs mt-2 leading-relaxed">
                  Synthesizes physical patch width, resonant length, Hammerstad fringing extensions, and 50-Ohm inset feed notch depth with 1-click CST macro export.
                </p>
              </div>

              <div className="space-y-1.5 pt-2 text-xs font-mono text-slate-400 border-t border-slate-800/80">
                <div className="flex justify-between">
                  <span>CAD Blueprint:</span>
                  <span className="text-cyan-400 font-semibold">2D Parametric SVG</span>
                </div>
                <div className="flex justify-between">
                  <span>Macro Export:</span>
                  <span className="text-slate-200">CST Studio Suite VBS</span>
                </div>
              </div>
            </div>

            <div className="pt-6 flex items-center gap-2 text-xs font-mono font-bold text-cyan-400 group-hover:translate-x-1 transition-transform">
              <span>Open RF Workbench</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </Link>

          {/* Tool Card 3: MCU Pinout Checker */}
          <Link
            href="/pinout-conflict-checker"
            className="group relative bg-slate-900/80 hover:bg-slate-900 border border-slate-800 hover:border-cyan-500/50 rounded-2xl p-6 transition-all duration-300 flex flex-col justify-between shadow-lg hover:shadow-cyan-500/10"
          >
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400 group-hover:scale-110 transition-transform">
                <Cpu className="w-6 h-6 stroke-[2]" />
              </div>

              <div>
                <span className="text-[11px] font-mono font-semibold px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  Silicon Matrix Engine
                </span>
                <h3 className="text-xl font-bold text-white mt-2 group-hover:text-cyan-300 transition-colors">
                  MCU Pinout &amp; Bus Conflict Solver
                </h3>
                <p className="text-slate-400 text-xs mt-2 leading-relaxed">
                  Evaluates 5 deterministic hardware conflict rules covering direct collisions, I2C 7-bit bus clashes, ESP32 ADC2/Wi-Fi lockouts, and strapping pin hazards.
                </p>
              </div>

              <div className="space-y-1.5 pt-2 text-xs font-mono text-slate-400 border-t border-slate-800/80">
                <div className="flex justify-between">
                  <span>Code Export:</span>
                  <span className="text-emerald-400 font-semibold">C++ pin_config.h</span>
                </div>
                <div className="flex justify-between">
                  <span>Hardware Models:</span>
                  <span className="text-slate-200">ESP32, STM32, UNO R4</span>
                </div>
              </div>
            </div>

            <div className="pt-6 flex items-center gap-2 text-xs font-mono font-bold text-cyan-400 group-hover:translate-x-1 transition-transform">
              <span>Open Pinout Checker</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </Link>
        </div>
      </section>

      {/* Platform Architectural Pillars */}
      <section className="bg-slate-900/50 border border-slate-800 rounded-2xl p-8 space-y-6">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <h2 className="text-xl sm:text-2xl font-bold text-white">
            Built for RF &amp; Embedded Engineers
          </h2>
          <p className="text-slate-400 text-xs leading-relaxed">
            Zero third-party tracking bloat, zero heavy charting libraries, and zero cloud API latency.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-2">
          <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800/80 space-y-2">
            <Zap className="w-5 h-5 text-cyan-400" />
            <h4 className="font-mono text-xs font-bold text-white">60 FPS Client-Side</h4>
            <p className="text-[11px] text-slate-400 leading-relaxed font-sans">
              Sliders recalculate synchronously in pure TypeScript without triggering costly network round-trips.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800/80 space-y-2">
            <Shield className="w-5 h-5 text-emerald-400" />
            <h4 className="font-mono text-xs font-bold text-white">Copyright-Clean Vectors</h4>
            <p className="text-[11px] text-slate-400 leading-relaxed font-sans">
              Zero scraped vendor diagrams or proprietary PNGs. All IC packages and blueprints render procedurally.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800/80 space-y-2">
            <Activity className="w-5 h-5 text-amber-400" />
            <h4 className="font-mono text-xs font-bold text-white">Zero-CLS Certified</h4>
            <p className="text-[11px] text-slate-400 leading-relaxed font-sans">
              Immutable physical ad slot bounding boxes prevent layout shifts, ensuring CLS strictly below 0.05.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800/80 space-y-2">
            <Code2 className="w-5 h-5 text-blue-400" />
            <h4 className="font-mono text-xs font-bold text-white">100% SSG Pre-Rendered</h4>
            <p className="text-[11px] text-slate-400 leading-relaxed font-sans">
              30+ long-tail programmatic routes statically baked at build time for instant search engine indexing.
            </p>
          </div>
        </div>
      </section>

      {/* Mid Banner AdSlot */}
      <AdSlot id="ad-slot-mid-content" slotType="mid-content" />

      {/* Programmatic SEO Presets Grid */}
      <section className="space-y-6">
        <div className="border-b border-slate-800 pb-3">
          <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider">
            Popular Pre-Configured Hardware Routes
          </span>
          <h2 className="text-xl font-bold text-white mt-1">
            Programmatic Hardware Presets &amp; Case Studies
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* IoT presets */}
          {IOT_PRESETS.slice(0, 3).map((p) => (
            <Link
              key={p.slug}
              href={`/iot-battery-calculator/${p.slug}`}
              className="p-4 rounded-xl bg-slate-900/60 hover:bg-slate-900 border border-slate-800 hover:border-cyan-500/40 text-xs transition-colors space-y-1.5"
            >
              <div className="flex items-center justify-between text-slate-400 font-mono text-[10px]">
                <span className="text-cyan-400 font-semibold">{p.badge}</span>
                <span>IoT Battery</span>
              </div>
              <h3 className="font-bold text-white line-clamp-1">{p.title}</h3>
              <p className="text-slate-400 text-[11px] line-clamp-2">{p.metaDescription}</p>
            </Link>
          ))}

          {/* RF presets */}
          {RF_PRESETS.slice(0, 3).map((p) => (
            <Link
              key={p.slug}
              href={`/patch-antenna-calculator/${p.slug}`}
              className="p-4 rounded-xl bg-slate-900/60 hover:bg-slate-900 border border-slate-800 hover:border-blue-500/40 text-xs transition-colors space-y-1.5"
            >
              <div className="flex items-center justify-between text-slate-400 font-mono text-[10px]">
                <span className="text-blue-400 font-semibold">{p.badge}</span>
                <span>Patch Antenna</span>
              </div>
              <h3 className="font-bold text-white line-clamp-1">{p.title}</h3>
              <p className="text-slate-400 text-[11px] line-clamp-2">{p.metaDescription}</p>
            </Link>
          ))}

          {/* Pinout presets */}
          {PINOUT_PRESETS.slice(0, 3).map((p) => (
            <Link
              key={p.slug}
              href={`/pinout-conflict-checker/${p.slug}`}
              className="p-4 rounded-xl bg-slate-900/60 hover:bg-slate-900 border border-slate-800 hover:border-emerald-500/40 text-xs transition-colors space-y-1.5"
            >
              <div className="flex items-center justify-between text-slate-400 font-mono text-[10px]">
                <span className="text-emerald-400 font-semibold">{p.badge}</span>
                <span>MCU Pinout</span>
              </div>
              <h3 className="font-bold text-white line-clamp-1">{p.title}</h3>
              <p className="text-slate-400 text-[11px] line-clamp-2">{p.metaDescription}</p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
