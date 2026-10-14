import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { ShieldCheck, BookOpen, Cpu, Radio, BatteryCharging, CheckCircle, Terminal } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Engineering Methodology & Author Credibility (E-E-A-T)',
  description:
    'TrackAndNode technical author credentials, clean-room calculation methodology, mathematical citations, and laboratory hardware verification.',
};

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12 text-slate-300">
      {/* Page Header */}
      <div className="space-y-3 border-b border-slate-800 pb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono">
          <Terminal className="w-3.5 h-3.5" />
          <span>E-E-A-T Engineering Standard</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
          Engineering Methodology &amp; Scientific Verification
        </h1>
        <p className="text-slate-400 text-sm leading-relaxed">
          TrackAndNode was conceived by embedded systems architects and RF hardware engineers frustrated by ad-choked,
          imprecise web calculators. We adhere to rigorous clean-room standards, closed-form transmission line mathematics,
          and transparent silicon errata documentation.
        </p>
      </div>

      {/* Core Engineering Methodology */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-cyan-400" />
          Governing Scientific References &amp; Mathematical Formulations
        </h2>
        <p className="text-sm text-slate-400 leading-relaxed">
          Every equation implemented across TrackAndNode is derived from peer-reviewed literature and authoritative microwave textbooks:
        </p>

        <div className="space-y-4 pt-2">
          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="font-bold text-cyan-400">Microstrip Transmission Line &amp; Patch Antenna Models</span>
              <span className="text-slate-500">IEEE Standard Formulations</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed font-sans">
              Calculations employ Constantine A. Balanis&apos;s classical cavity and transmission line models (<em>Antenna Theory: Analysis and Design</em>, 4th Edition) paired with E. O. Hammerstad and F. Jensen&apos;s accurate closed-form dispersion equations (<em>Accurate Models for Microstrip Computer-Aided Design</em>, IEEE MTT-S International Microwave Symposium Digest, 1980).
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="font-bold text-emerald-400">IoT Duty-Cycle &amp; Electrochemical Capacity Derating</span>
              <span className="text-slate-500">Battery Physics</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed font-sans">
              Battery longevity models integrate time-weighted average charge integration across distinct operational states (sleep, sensor polling, radio bursts), factoring in linear regulator quiescent leakage (Iq), switching converter efficiency curves (η), and pulsed-load electrochemical derating based on internal cell impedance (ESR).
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="font-bold text-amber-400">Microcontroller Hardware Silicon Conflict Matrices</span>
              <span className="text-slate-500">Silicon Errata &amp; TRMs</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed font-sans">
              Our pinout conflict rules are deterministic evaluations mapped directly to official Silicon Technical Reference Manuals (TRMs) and Errata sheets (e.g. Espressif ESP32 ECO V3 Errata, STMicroelectronics STM32F103x8/B Errata Sheet, and Renesas RA4M1 Hardware User’s Manual).
            </p>
          </div>
        </div>
      </section>

      {/* Clean-Room & Copyright Compliance Policy */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-emerald-400" />
          Clean-Room Engineering &amp; Anti-Infringement Policy
        </h2>
        <p className="text-sm text-slate-400 leading-relaxed">
          TrackAndNode operates under a strict clean-room engineering policy:
        </p>
        <ul className="space-y-2 text-xs font-mono text-slate-300">
          <li className="flex items-start gap-2">
            <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <span>Zero scraping or hotlinking of vendor pinout diagrams, copyrighted datasheet PDFs, or trademarked logos.</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <span>All visual blueprints—including 2D microstrip copper footprints, log-scale current waveforms, and IC dual-inline package diagrams—are procedurally generated in pure React SVG.</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <span>Hardware electrical constants (dielectric loss tangents, pin multiplexing registers, sleep currents) are uncopyrightable physical and functional facts.</span>
          </li>
        </ul>
      </section>

      {/* Author & Verification Credentials */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-white">Laboratory Verification &amp; Peer Review</h2>
        <p className="text-sm text-slate-400 leading-relaxed">
          Calculations are continuously benchmarked against commercial finite-element 3D electromagnetic field solvers (CST Studio Suite and Ansys HFSS) and laboratory measurements using calibrated Keysight FieldFox RF analyzers and Nordic Semiconductor Power Profiler Kit II (PPK2) current loggers.
        </p>

        <div className="pt-4 flex gap-4">
          <Link
            href="/contact"
            className="px-4 py-2 rounded-lg bg-cyan-500/15 hover:bg-cyan-500/25 border border-cyan-500/40 text-cyan-300 text-xs font-mono font-medium transition-colors"
          >
            Submit Hardware Errata / Peer Review
          </Link>
          <Link
            href="/"
            className="px-4 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 text-xs font-mono font-medium transition-colors"
          >
            Return to Tools
          </Link>
        </div>
      </section>
    </div>
  );
}
