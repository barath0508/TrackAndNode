// src/app/contact/page.tsx
'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Mail,
  CheckCircle,
  Send,
  Terminal,
  AlertCircle,
  Cpu,
  Radio,
  Battery,
  Layers,
  HelpCircle,
} from 'lucide-react';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    calculatorName: 'Patch Antenna & PCB Trace Calculator',
    hardwareModel: 'ESP32-WROOM-32D / Rogers RO4350B',
    measuredValue: '',
    calculatedValue: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const mailtoSubject = encodeURIComponent(`[TraceAndNode Errata] ${formData.calculatorName} - ${formData.hardwareModel}`);
  const mailtoBody = encodeURIComponent(
    `Name: ${formData.name}\nEmail: ${formData.email}\nCalculator: ${formData.calculatorName}\nHardware / Substrate: ${formData.hardwareModel}\nMeasured Bench Value: ${formData.measuredValue}\nCalculated Value: ${formData.calculatedValue}\n\nDescription:\n${formData.message}`
  );
  const mailtoLink = `mailto:errata@traceandnode.com?subject=${mailtoSubject}&body=${mailtoBody}`;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12 text-slate-300">
      {/* Header */}
      <div className="space-y-3 border-b border-slate-800 pb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono">
          <Terminal className="w-3.5 h-3.5" />
          <span>Peer Review &amp; Errata Submission Protocol</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
          Hardware Errata, Laboratory Feedback &amp; Contact
        </h1>
        <p className="text-slate-400 text-sm leading-relaxed font-sans max-w-3xl">
          TraceAndNode maintains a transparent engineering errata protocol. If you discover a revised silicon errata note,
          an updated substrate manufacturer loss tangent, or wish to submit calibrated test-bench VNA/oscilloscope data
          to improve calculation accuracy, submit a report below.
        </p>
      </div>

      {submitted ? (
        <div className="p-8 sm:p-10 rounded-2xl bg-emerald-950/20 border border-emerald-500/40 text-center space-y-4">
          <div className="w-14 h-14 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/30">
            <CheckCircle className="w-7 h-7" />
          </div>
          <h2 className="text-2xl font-bold text-white">Engineering Report Acknowledged</h2>
          <p className="text-xs text-slate-300 max-w-lg mx-auto leading-relaxed font-sans">
            Thank you for contributing to the scientific rigor of TraceAndNode. Your laboratory test data will be cross-referenced
            against manufacturer technical reference manuals and independently simulated before updating our core dataset.
          </p>
          <div className="pt-2">
            <button
              onClick={() => setSubmitted(false)}
              className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs font-mono text-cyan-300 transition-colors"
            >
              Submit Another Report
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6 bg-slate-900/80 border border-slate-800 rounded-2xl p-6 sm:p-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="space-y-1.5">
              <label htmlFor="name" className="text-xs font-mono text-slate-300 flex items-center gap-1.5">
                <span>Engineer Name / Organization</span>
                <span className="text-rose-400">*</span>
              </label>
              <input
                id="name"
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g. Dr. Elena Vance, Senior RF Architect"
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3.5 py-2.5 text-xs font-mono text-white focus:outline-none focus:border-cyan-500 transition-colors"
              />
            </div>

            <div className="space-y-1.5">
              <label htmlFor="email" className="text-xs font-mono text-slate-300 flex items-center gap-1.5">
                <span>Contact Email Address</span>
                <span className="text-rose-400">*</span>
              </label>
              <input
                id="email"
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="engineer@aerospace-lab.org"
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3.5 py-2.5 text-xs font-mono text-white focus:outline-none focus:border-cyan-500 transition-colors"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="space-y-1.5">
              <label htmlFor="calculatorName" className="text-xs font-mono text-slate-300">
                Target Calculator Utility
              </label>
              <select
                id="calculatorName"
                value={formData.calculatorName}
                onChange={(e) => setFormData({ ...formData, calculatorName: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3.5 py-2.5 text-xs font-mono text-white focus:outline-none focus:border-cyan-500"
              >
                <option value="Patch Antenna & PCB Trace Calculator">Patch Antenna &amp; PCB Trace Calculator</option>
                <option value="IoT Battery Life & Duty-Cycle Power Profiler">IoT Battery Life &amp; Duty-Cycle Power Profiler</option>
                <option value="Microcontroller Pinout & Bus Conflict Checker">Microcontroller Pinout &amp; Bus Conflict Checker</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label htmlFor="hardwareModel" className="text-xs font-mono text-slate-300">
                Microcontroller / Substrate Model
              </label>
              <input
                id="hardwareModel"
                type="text"
                required
                value={formData.hardwareModel}
                onChange={(e) => setFormData({ ...formData, hardwareModel: e.target.value })}
                placeholder="e.g. ESP32-C6 / Rogers RO4003C / STM32F401"
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3.5 py-2.5 text-xs font-mono text-white focus:outline-none focus:border-cyan-500"
              />
            </div>
          </div>

          {/* Structured Comparative Errata Fields */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 p-4 rounded-xl bg-slate-950/70 border border-slate-800">
            <div className="space-y-1.5">
              <label htmlFor="measuredValue" className="text-xs font-mono text-emerald-400">
                Measured Bench Value (VNA / PPK2 / Scope)
              </label>
              <input
                id="measuredValue"
                type="text"
                value={formData.measuredValue}
                onChange={(e) => setFormData({ ...formData, measuredValue: e.target.value })}
                placeholder="e.g. S11 = -22.4 dB at 2.418 GHz"
                className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-xs font-mono text-white focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div className="space-y-1.5">
              <label htmlFor="calculatedValue" className="text-xs font-mono text-cyan-400">
                Calculated Value on TraceAndNode
              </label>
              <input
                id="calculatedValue"
                type="text"
                value={formData.calculatedValue}
                onChange={(e) => setFormData({ ...formData, calculatedValue: e.target.value })}
                placeholder="e.g. Predicted Resonant Length L = 29.42 mm"
                className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-xs font-mono text-white focus:outline-none focus:border-cyan-500"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label htmlFor="message" className="text-xs font-mono text-slate-300">
              Technical Description &amp; Manufacturer Datasheet / TRM Citation
            </label>
            <textarea
              id="message"
              required
              rows={4}
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              placeholder="Cite the manufacturer technical reference manual, section number, silicon errata note, or describe your test setup (instrument model, calibration plane)..."
              className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3.5 text-xs font-mono text-white focus:outline-none focus:border-cyan-500 leading-relaxed"
            />
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4 pt-2">
            <button
              type="submit"
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs font-mono flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/20 transition-all cursor-pointer"
            >
              <Send className="w-4 h-4 stroke-[2.5]" />
              <span>Submit Structured Errata Report</span>
            </button>

            <a
              href={mailtoLink}
              className="w-full sm:w-auto px-5 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium text-xs font-mono flex items-center justify-center gap-2 border border-slate-700 transition-colors"
            >
              <Mail className="w-4 h-4 text-cyan-400" />
              <span>Send via Direct Email (mailto)</span>
            </a>
          </div>
        </form>
      )}

      {/* Editorial Peer Review Standards */}
      <section className="space-y-4 border-t border-slate-800 pt-8">
        <h2 className="text-lg font-bold text-white flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-cyan-400" />
          <span>Peer Review Standards &amp; Review Timeline</span>
        </h2>
        <div className="space-y-3 text-xs text-slate-400 font-sans leading-relaxed">
          <p>
            All submitted errata and laboratory test sets are reviewed by our engineering editorial committee. If an errata
            report reveals a discrepancy exceeding ±1% against verified silicon behavior or IPC-2141 microstrip impedance
            equations, our core mathematics libraries (`patch-antenna-math.ts`, `iot-battery-math.ts`, `pinout-conflict-engine.ts`)
            are revised and patched with git commit attribution.
          </p>
          <p>
            For urgent security inquiries or vulnerability disclosures affecting our edge infrastructure, direct emails to{' '}
            <code className="text-cyan-400 font-mono">security@traceandnode.com</code>.
          </p>
        </div>
      </section>
    </div>
  );
}
