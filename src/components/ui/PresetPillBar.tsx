'use client';

import React from 'react';
import Link from 'next/link';
import { Sliders } from 'lucide-react';

interface PresetItem {
  slug: string;
  badge: string;
  title: string;
  href: string;
  isActive?: boolean;
}

interface PresetPillBarProps {
  presets: PresetItem[];
  baseToolPath: string;
}

export const PresetPillBar: React.FC<PresetPillBarProps> = ({ presets, baseToolPath }) => {
  return (
    <div className="w-full my-4">
      <div className="flex items-center gap-2 mb-2 text-xs font-mono text-slate-400">
        <Sliders className="w-3.5 h-3.5 text-cyan-400" />
        <span>Quick Hardware Presets (1-Click Load):</span>
      </div>

      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1 -mx-2 px-2">
        {/* Default Tool Route Pill */}
        <Link
          href={baseToolPath}
          className={`shrink-0 px-3 py-1.5 rounded-full text-xs font-mono font-medium transition-all border ${
            presets.every((p) => !p.isActive)
              ? 'bg-cyan-500/15 text-cyan-300 border-cyan-500/40 shadow-sm shadow-cyan-500/10'
              : 'bg-slate-900/90 text-slate-300 hover:text-white hover:bg-slate-800 border-slate-800'
          }`}
        >
          Custom / Default
        </Link>

        {presets.map((preset) => (
          <Link
            key={preset.slug}
            href={preset.href}
            title={preset.title}
            className={`shrink-0 px-3 py-1.5 rounded-full text-xs font-mono font-medium transition-all border whitespace-nowrap ${
              preset.isActive
                ? 'bg-cyan-500/20 text-cyan-300 border-cyan-400/50 shadow-sm shadow-cyan-500/20'
                : 'bg-slate-900/90 text-slate-300 hover:text-white hover:bg-slate-800 border-slate-800'
            }`}
          >
            {preset.badge}
          </Link>
        ))}
      </div>
    </div>
  );
};
