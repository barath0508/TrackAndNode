// src/app/about/page.tsx
import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import {
  ShieldCheck,
  BookOpen,
  Cpu,
  Radio,
  BatteryCharging,
  CheckCircle,
  Terminal,
  ExternalLink,
  Award,
  Layers,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Engineering Methodology, Academic Citations & Author Credentials (E-E-A-T)',
  description:
    'Peer-reviewed mathematical models, Balanis transmission line formulations, Hammerstad-Jensen microstrip physics, TI SLVA412 power equations, and laboratory test bench verification.',
  alternates: {
    canonical: 'https://traceandnode.com/about',
  },
};

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12 text-slate-300">
      {/* Header */}
      <div className="space-y-3 border-b border-slate-800 pb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono">
          <Terminal className="w-3.5 h-3.5" />
          <span>E-E-A-T Authority &amp; Methodology Specification</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
          Engineering Methodology &amp; Mathematical Formulations
        </h1>
        <p className="text-slate-400 text-sm leading-relaxed font-sans max-w-3xl">
          TraceAndNode was engineered by principal embedded systems architects, RF hardware engineers, and firmware
          developers to replace ad-choked, black-box online calculators with open, verifiable, and laboratory-calibrated
          computational utilities. Every equation executed on this platform is derived from primary academic literature,
          peer-reviewed microwave textbooks, and official semiconductor manufacturer technical reference manuals.
        </p>
      </div>

      {/* 1. Governing Scientific References */}
      <section className="space-y-6">
        <div className="flex items-center gap-2 text-white font-bold text-xl">
          <BookOpen className="w-5 h-5 text-cyan-400" />
          <h2>1. Primary Academic Literature &amp; Governing Citations</h2>
        </div>
        <p className="text-sm text-slate-400 leading-relaxed font-sans">
          To maintain transparency and allow rigorous academic and industrial peer review, all computational algorithms
          implemented across TraceAndNode cite their authoritative primary publications:
        </p>

        <div className="space-y-4">
          {/* Balanis & Hammerstad */}
          <div className="p-5 rounded-xl bg-slate-900 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="font-bold text-cyan-400 uppercase tracking-wide">
                Microstrip Transmission Line &amp; Radiating Patch Synthesis
              </span>
              <span className="text-slate-500">IEEE Microwave Standards</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed font-sans">
              Our microstrip patch antenna dimensions, physical resonance lengths, and 50-ohm inset feed depths are calculated
              using the closed-form Cavity Model and Transmission-Line Model established by <strong>Constantine A. Balanis</strong> in{' '}
              <em>Antenna Theory: Analysis and Design</em> (4th Edition, John Wiley &amp; Sons, Inc., Chapters 14 &amp; 15).
            </p>
            <p className="text-xs text-slate-400 leading-relaxed font-sans">
              Dynamic effective dielectric permittivity (ε_eff) and fringing electric field extensions (ΔL) are evaluated using the
              canonical dispersion formulations authored by <strong>E. O. Hammerstad &amp; Ø. Jensen</strong> in{' '}
              <em>&ldquo;Accurate Models for Microstrip Computer-Aided Design&rdquo;</em> (1980 IEEE MTT-S International Microwave Symposium
              Digest, Washington, DC, pp. 407–409). These closed-form models account for finite substrate thickness (h) and strip
              width (w), matching numerical EM solvers within ±0.3% across the dielectric range 1.0 ≤ εr ≤ 16.
            </p>
          </div>

          {/* TI SLVA412 & Duty Cycle Math */}
          <div className="p-5 rounded-xl bg-slate-900 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="font-bold text-emerald-400 uppercase tracking-wide">
                Electrochemical Capacity &amp; Duty-Cycle Power Profiling
              </span>
              <span className="text-slate-500">Texas Instruments &amp; Battery Physics</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed font-sans">
              Battery longevity and multi-state power consumption are simulated using the discrete time-weighted charge
              integration method formalized in <strong>Texas Instruments Application Note SLVA412</strong>:{' '}
              <em>&ldquo;Calculating Battery Life in IoT Applications&rdquo;</em> (authored by Michael Helwig &amp; Texas Instruments
              Power Management Systems Engineering).
            </p>
            <p className="text-xs text-slate-400 leading-relaxed font-sans">
              Our mathematical engine models finite electrochemical cell self-discharge rates (annual derating factor D_yr),
              temperature-dependent chemical capacity loss, switching DC-DC converter non-linear efficiency curves (η), and
              sub-microampere linear regulator (LDO) quiescent leakage currents (Iq).
            </p>
          </div>

          {/* Silicon TRMs & Errata */}
          <div className="p-5 rounded-xl bg-slate-900 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="font-bold text-amber-400 uppercase tracking-wide">
                Microcontroller Silicon Rule Evaluation &amp; Errata Documentation
              </span>
              <span className="text-slate-500">Semiconductor Technical Reference Manuals</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed font-sans">
              Our pinout conflict detection engine evaluates physical pin allocations directly against the official Silicon
              Technical Reference Manuals (TRMs), Hardware Design Guidelines, and Errata Sheets issued by chip manufacturers:
            </p>
            <ul className="text-xs text-slate-400 font-mono space-y-1.5 pl-4 list-disc">
              <li>
                <strong>Espressif Systems:</strong> <em>ESP32 Series Technical Reference Manual (Section 29: SAR ADC and Wi-Fi Subsystem Arbitration)</em>,{' '}
                <em>ESP32-S3 Hardware Design Guidelines</em>, and <em>ESP32-C6 Technical Reference Manual (Section 6: IO MUX &amp; Boot Strapping)</em>.
              </li>
              <li>
                <strong>STMicroelectronics:</strong> <em>STM32F103xC/D/E Reference Manual (RM0008)</em> and{' '}
                <em>STM32F103x8/B Silicon Limitations &amp; Errata Sheet (DocID14732)</em> regarding 5V-tolerant (FT) vs 3.3V-only pins.
              </li>
              <li>
                <strong>Nordic Semiconductor:</strong> <em>nRF52840 Product Specification (v1.3: Power and Clock Management with Internal DC/DC Regulation)</em>.
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* 2. Zero-Scraping Clean-Room Policy */}
      <section className="space-y-4">
        <div className="flex items-center gap-2 text-white font-bold text-xl">
          <ShieldCheck className="w-5 h-5 text-emerald-400" />
          <h2>2. Clean-Room Architecture &amp; Anti-Infringement Policy</h2>
        </div>
        <p className="text-sm text-slate-400 leading-relaxed font-sans">
          TraceAndNode operates under an uncompromised clean-room development standard designed to uphold intellectual property rights
          while delivering factual engineering tools to the global hardware community:
        </p>
        <ul className="space-y-2.5 text-xs font-mono text-slate-300">
          <li className="flex items-start gap-2.5">
            <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <span>
              <strong>Zero Scraping or Hotlinking:</strong> We never scrape, embed, or hotlink third-party pinout graphics, datasheet
              excerpts, manufacturer logos, or proprietary diagrams.
            </span>
          </li>
          <li className="flex items-start gap-2.5">
            <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <span>
              <strong>100% Procedural Vector Visualizations:</strong> Every technical visual—including dimensional 2D microstrip PCB
              blueprints, logarithmic duty-cycle current waveforms, and QFN/LQFP package layouts—is synthesized dynamically using pure
              React SVG components.
            </span>
          </li>
          <li className="flex items-start gap-2.5">
            <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <span>
              <strong>Uncopyrightable Factual Data:</strong> Physical characteristics of materials (dielectric constants, loss tangents,
              copper resistivity) and functional chip specifications (register mappings, voltage thresholds, electrical pin allocations)
              are public scientific facts.
            </span>
          </li>
        </ul>
      </section>

      {/* 3. Laboratory Test Bench Verification */}
      <section className="space-y-4">
        <div className="flex items-center gap-2 text-white font-bold text-xl">
          <Award className="w-5 h-5 text-cyan-400" />
          <h2>3. Laboratory Bench Testing &amp; Instrument Calibration</h2>
        </div>
        <p className="text-sm text-slate-400 leading-relaxed font-sans">
          To ensure numerical outputs correspond to physical reality, calculated values are continually cross-referenced against
          calibrated laboratory instrumentation and commercial 3D full-wave electromagnetic simulators:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1.5">
            <div className="text-xs font-mono font-bold text-cyan-400">RF Impedance &amp; S-Parameters</div>
            <p className="text-xs text-slate-400 font-sans leading-relaxed">
              Synthesized microstrip patches are verified on a <strong>Keysight FieldFox N9918A</strong> 26.5 GHz handheld microwave
              analyzer and cross-checked in Dassault Systèmes CST Studio Suite and Ansys HFSS finite element field solvers.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1.5">
            <div className="text-xs font-mono font-bold text-emerald-400">Current Logging &amp; Dynamic Transients</div>
            <p className="text-xs text-slate-400 font-sans leading-relaxed">
              Sleep currents and radio burst profiles are sampled using a <strong>Nordic Semiconductor Power Profiler Kit II (PPK2)</strong>{' '}
              operating at 100 kS/s sampling resolution down to 200 nA measurement floors.
            </p>
          </div>
        </div>
      </section>

      {/* 4. Peer Review & Community Contribution */}
      <section className="space-y-4 border-t border-slate-800 pt-8">
        <h2 className="text-lg font-bold text-white">Continuous Peer Review &amp; Errata Submissions</h2>
        <p className="text-xs text-slate-400 leading-relaxed font-sans">
          Silicon manufacturers frequently release new mask revisions and silicon ECOs, and laminate vendors refine substrate dielectric
          tolerances. We welcome peer reviews, laboratory comparative measurements, and errata submissions from the global engineering
          community.
        </p>
        <div className="pt-2 flex flex-wrap gap-4">
          <Link
            href="/contact"
            className="px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-mono font-bold flex items-center gap-2 shadow-lg shadow-cyan-500/20 transition-all"
          >
            <span>Submit Technical Errata &amp; Test Data</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>
          <Link
            href="/"
            className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-850 border border-slate-800 text-slate-300 text-xs font-mono font-semibold transition-colors"
          >
            Explore Interactive Workbenches
          </Link>
        </div>
      </section>
    </div>
  );
}
