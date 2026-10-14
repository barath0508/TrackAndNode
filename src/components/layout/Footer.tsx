import React from 'react';
import Link from 'next/link';
import { Activity, Shield, Code, Cpu, ExternalLink, Zap } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full border-t border-slate-800/80 bg-slate-950/95 text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Brand & Mission */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center">
                <Activity className="w-4 h-4 text-cyan-400 stroke-[2.5]" />
              </div>
              <span className="font-mono text-base font-bold text-white tracking-tight">BenchPulse</span>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed max-w-md">
              High-speed, copyright-clean, zero-API-cost engineering utilities. Procedural vector blueprints,
              real-time silicon conflict solver, and closed-form transmission line models executed 100% client-side.
            </p>
            <div className="flex items-center gap-4 text-xs font-mono text-slate-400">
              <span className="flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5 text-cyan-400" />
                60 FPS Client Compute
              </span>
              <span className="flex items-center gap-1.5">
                <Shield className="w-3.5 h-3.5 text-emerald-400" />
                Zero-CLS Certified
              </span>
            </div>
          </div>

          {/* Core Calculators */}
          <div>
            <h4 className="font-mono text-xs font-semibold uppercase tracking-wider text-slate-200 mb-3 flex items-center gap-1.5">
              <Cpu className="w-3.5 h-3.5 text-cyan-400" />
              Calculators
            </h4>
            <ul className="space-y-2">
              <li>
                <Link href="/iot-battery-calculator" className="hover:text-cyan-400 transition-colors">
                  IoT Battery Life Profiler
                </Link>
              </li>
              <li>
                <Link href="/patch-antenna-calculator" className="hover:text-cyan-400 transition-colors">
                  Microstrip Patch Antenna
                </Link>
              </li>
              <li>
                <Link href="/pinout-conflict-checker" className="hover:text-cyan-400 transition-colors">
                  MCU Pinout Conflict Checker
                </Link>
              </li>
              <li>
                <Link href="/patch-antenna-calculator/2-4ghz-wifi-ble-fr4-patch-antenna" className="hover:text-cyan-400 transition-colors">
                  2.4 GHz Wi-Fi / BLE Preset
                </Link>
              </li>
              <li>
                <Link href="/iot-battery-calculator/esp32-deep-sleep-18650-battery-life" className="hover:text-cyan-400 transition-colors">
                  ESP32 18650 Power Model
                </Link>
              </li>
            </ul>
          </div>

          {/* Compliance & Methodology */}
          <div>
            <h4 className="font-mono text-xs font-semibold uppercase tracking-wider text-slate-200 mb-3 flex items-center gap-1.5">
              <Code className="w-3.5 h-3.5 text-cyan-400" />
              Engineering & Legal
            </h4>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="hover:text-cyan-400 transition-colors">
                  E-E-A-T & Verification
                </Link>
              </li>
              <li>
                <Link href="/privacy-policy" className="hover:text-cyan-400 transition-colors">
                  Privacy Policy & DART Cookie
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-cyan-400 transition-colors">
                  Terms of Service & Liability
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-cyan-400 transition-colors">
                  Hardware Errata Submission
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Clean-Room Trademark & Physical Facts Disclaimer */}
        <div className="pt-8 border-t border-slate-800/80 space-y-4">
          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 text-[11px] text-slate-400 leading-relaxed">
            <p className="font-semibold text-slate-300 mb-1">Clean-Room Engineering & Trademark Disclaimer:</p>
            <p>
              BenchPulse is an independent technical calculation platform. Product names, trademarks, and registered
              trademarks including ESP32, ESP32-C6, ESP32-S3 (Espressif Systems), STM32 (STMicroelectronics), Arduino
              (Arduino AG), Rogers (Rogers Corporation), and CST Studio Suite (Dassault Systèmes) are property of their
              respective owners. Their reference on this website is strictly for identification, interoperability, and
              factual hardware compatibility under nominative fair use doctrine. Electrical specifications, register
              mappings, and physical dielectric parameters are uncopyrightable scientific facts derived from public
              scientific literature and physical constants.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-2">
            <p>© 2026 BenchPulse (benchpulse.dev). All rights reserved.</p>
            <p className="font-mono text-[11px]">Static Pre-Rendered (SSG) • 0 API Latency • Open Engineering Math</p>
          </div>
        </div>
      </div>
    </footer>
  );
};
