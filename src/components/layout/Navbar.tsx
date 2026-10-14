'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Activity, BatteryCharging, Radio, Cpu, Menu, X, Terminal, ShieldCheck } from 'lucide-react';

const NAV_LINKS = [
  {
    href: '/iot-battery-calculator',
    label: 'IoT Battery Profiler',
    icon: BatteryCharging,
    badge: 'Duty-Cycle',
  },
  {
    href: '/patch-antenna-calculator',
    label: 'Patch Antenna & RF',
    icon: Radio,
    badge: 'Balanis Model',
  },
  {
    href: '/pinout-conflict-checker',
    label: 'MCU Pinout Checker',
    icon: Cpu,
    badge: 'Conflict Engine',
  },
];

export const Navbar: React.FC = () => {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800/80 bg-slate-950/90 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/20 group-hover:scale-105 transition-transform">
              <Activity className="w-5 h-5 text-slate-950 stroke-[2.5]" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-mono text-lg font-bold text-white tracking-tight">TraceAndNode</span>
                <span className="text-[10px] font-mono font-semibold px-1.5 py-0.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                  v1.0
                </span>
              </div>
              <p className="text-[10px] font-mono text-slate-400 hidden sm:block">Hardware Engineering Workbench</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((link) => {
              const Icon = link.icon;
              const isActive = pathname.startsWith(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${
                    isActive
                      ? 'bg-slate-900 text-cyan-400 border border-cyan-500/30 shadow-sm'
                      : 'text-slate-300 hover:text-white hover:bg-slate-900/60 border border-transparent'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-cyan-400' : 'text-slate-400'}`} />
                  <span>{link.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Desktop Right Actions */}
          <div className="hidden lg:flex items-center gap-3">
            <div className="flex items-center gap-2 px-2.5 py-1 rounded-full bg-slate-900 border border-slate-800 text-xs font-mono text-slate-400">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>Oscilloscope Dark</span>
            </div>
            <Link
              href="/about"
              className="px-3 py-1.5 text-xs font-medium text-slate-300 hover:text-white hover:bg-slate-900 rounded-lg border border-slate-800 transition-colors"
            >
              Methodology & E-E-A-T
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-900 border border-slate-800"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-800 bg-slate-950/98 px-4 pt-2 pb-6 space-y-2">
          {NAV_LINKS.map((link) => {
            const Icon = link.icon;
            const isActive = pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center justify-between p-3 rounded-lg text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-slate-900 text-cyan-400 border border-cyan-500/30'
                    : 'text-slate-300 hover:bg-slate-900/60'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className="w-5 h-5 text-cyan-400" />
                  <span>{link.label}</span>
                </div>
                <span className="text-[10px] font-mono text-slate-400 bg-slate-800/80 px-2 py-0.5 rounded border border-slate-700">
                  {link.badge}
                </span>
              </Link>
            );
          })}

          <div className="pt-4 border-t border-slate-800/80 flex flex-col gap-2">
            <Link
              href="/about"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2 p-2.5 rounded-lg text-xs text-slate-400 hover:text-white hover:bg-slate-900"
            >
              <Terminal className="w-4 h-4 text-slate-500" />
              <span>Engineering Methodology & Verification</span>
            </Link>
            <Link
              href="/privacy-policy"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2 p-2.5 rounded-lg text-xs text-slate-400 hover:text-white hover:bg-slate-900"
            >
              <ShieldCheck className="w-4 h-4 text-slate-500" />
              <span>Privacy & AdSense Disclosures</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
