import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { AlertTriangle, FileText } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Terms of Use & Engineering Liability Disclaimer',
  description:
    'TrackAndNode terms of service, acceptable use, engineering liability disclaimer, and physical hardware fabrication notices.',
};

export default function TermsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10 text-slate-300">
      <div className="space-y-3 border-b border-slate-800 pb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono">
          <FileText className="w-3.5 h-3.5" />
          <span>Legal Agreement</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
          Terms of Use &amp; Engineering Liability Disclaimer
        </h1>
        <p className="text-slate-400 text-xs font-mono">
          Last Updated: October 14, 2026
        </p>
      </div>

      {/* 1. Acceptance of Terms */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold text-white">1. Acceptance of Terms</h2>
        <p className="text-sm text-slate-400 leading-relaxed font-sans">
          By accessing or using TrackAndNode (trackandnode.dev), you agree to be bound by these Terms of Use and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing this site.
        </p>
      </section>

      {/* 2. Critical Engineering Liability Disclaimer */}
      <section className="space-y-4 p-5 rounded-xl bg-amber-950/20 border border-amber-500/40">
        <div className="flex items-center gap-2 text-amber-400 font-mono font-bold text-sm uppercase tracking-wide">
          <AlertTriangle className="w-5 h-5 shrink-0" />
          <span>Critical Hardware Engineering &amp; Prototype Disclaimer</span>
        </div>
        <div className="space-y-3 text-xs text-amber-200/90 font-sans leading-relaxed">
          <p>
            <strong>NO WARRANTY OF PHYSICAL PERFORMANCE:</strong> The calculators, CST Studio macros, C++ header exports, and CAD blueprints provided on TrackAndNode are mathematical estimates derived from theoretical models (such as the Balanis cavity model, Hammerstad-Jensen equations, and typical silicon current specifications).
          </p>
          <p>
            Real-world electromagnetic performance, battery longevity, and silicon pin behavior are subject to physical manufacturing tolerances, dielectric substrate batches, PCB copper surface roughness, ambient operating temperatures, component aging, and external electromagnetic interference (EMI).
          </p>
          <p>
            <strong>BENCH TESTING REQUIREMENT:</strong> You must always fabricate and independently test hardware prototypes using calibrated laboratory instrumentation (including Vector Network Analyzers, power profilers, and oscilloscopes) prior to committing to mass production or high-reliability applications. TrackAndNode and its operators assume zero liability for damaged components, fabricated PCBs, lost production runs, or project delays.
          </p>
        </div>
      </section>

      {/* 3. Nominative Trademark Use */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold text-white">3. Nominative Trademark Fair Use</h2>
        <p className="text-sm text-slate-400 leading-relaxed font-sans">
          References to third-party hardware platforms, microcontrollers, and registered trademarks—including ESP32, ESP32-C6, ESP32-S3 (Espressif Systems), STM32 (STMicroelectronics), Arduino (Arduino AG), Rogers (Rogers Corporation), and CST Studio Suite (Dassault Systèmes)—are made strictly for identification, technical compatibility, and interoperability referencing under nominative fair use doctrine. TrackAndNode is an independent technical calculation utility with no affiliation, endorsement, or sponsorship from these entities.
        </p>
      </section>

      {/* 4. Governing Law */}
      <section className="space-y-3 border-t border-slate-800 pt-6">
        <h2 className="text-base font-bold text-white">Governing Law</h2>
        <p className="text-xs text-slate-400 font-sans">
          These terms and conditions are governed by and construed in accordance with applicable state and federal laws without regard to conflict of law principles.
        </p>
      </section>
    </div>
  );
}
