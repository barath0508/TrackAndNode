'use client';

import React, { useState } from 'react';
import { Mail, CheckCircle, Send, Terminal, AlertCircle } from 'lucide-react';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    topic: 'hardware-errata',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10 text-slate-300">
      <div className="space-y-3 border-b border-slate-800 pb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono">
          <Terminal className="w-3.5 h-3.5" />
          <span>Peer Review &amp; Errata</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
          Hardware Errata &amp; Engineering Contact
        </h1>
        <p className="text-slate-400 text-sm leading-relaxed">
          Found an updated silicon errata note, revised dielectric constant, or want to suggest a new microcontroller matrix?
          Our engineering team reviews community submissions to keep BenchPulse authoritative and accurate.
        </p>
      </div>

      {submitted ? (
        <div className="p-8 rounded-2xl bg-emerald-950/20 border border-emerald-500/40 text-center space-y-3">
          <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
            <CheckCircle className="w-6 h-6" />
          </div>
          <h2 className="text-xl font-bold text-white">Errata Submission Received</h2>
          <p className="text-xs text-slate-400 max-w-md mx-auto leading-relaxed">
            Thank you for contributing to the engineering accuracy of BenchPulse. Your report will be cross-referenced
            against manufacturer technical reference manuals and verified on test benches.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-5 bg-slate-900/70 border border-slate-800 rounded-2xl p-6 sm:p-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label htmlFor="name" className="text-xs font-mono text-slate-300">
                Your Name / Call-Sign
              </label>
              <input
                id="name"
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g. Alex Rivera, PE"
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs font-mono text-white focus:outline-none focus:border-cyan-500"
              />
            </div>

            <div className="space-y-1.5">
              <label htmlFor="email" className="text-xs font-mono text-slate-300">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="engineer@domain.com"
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs font-mono text-white focus:outline-none focus:border-cyan-500"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label htmlFor="topic" className="text-xs font-mono text-slate-300">
              Inquiry / Submission Category
            </label>
            <select
              id="topic"
              value={formData.topic}
              onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs font-mono text-white focus:outline-none focus:border-cyan-500"
            >
              <option value="hardware-errata">Hardware Errata / Silicon Bug Correction</option>
              <option value="substrate-request">New RF Substrate Laminate Request</option>
              <option value="mcu-profile">New Microcontroller Pinout Profile</option>
              <option value="academic">Academic / Laboratory Peer Review</option>
              <option value="general">General Feedback</option>
            </select>
          </div>

          <div className="space-y-1.5">
            <label htmlFor="message" className="text-xs font-mono text-slate-300">
              Technical Description &amp; Datasheet Citation
            </label>
            <textarea
              id="message"
              required
              rows={5}
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              placeholder="Please cite the specific datasheet revision, section number, or laboratory VNA test setup..."
              className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-xs font-mono text-white focus:outline-none focus:border-cyan-500 leading-relaxed"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs font-mono flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/20 transition-all"
          >
            <Send className="w-4 h-4 stroke-[2.5]" />
            <span>Submit Engineering Report</span>
          </button>
        </form>
      )}
    </div>
  );
}
