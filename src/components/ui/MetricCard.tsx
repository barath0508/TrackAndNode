'use client';

import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';

interface MetricCardProps {
  label: string;
  value: string | number;
  unit?: string;
  subtext?: string;
  variant?: 'cyan' | 'emerald' | 'amber' | 'rose' | 'default';
}

export const MetricCard: React.FC<MetricCardProps> = ({
  label,
  value,
  unit,
  subtext,
  variant = 'cyan',
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    const textToCopy = `${value}${unit ? ` ${unit}` : ''}`;
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const borderVariantClass = {
    cyan: 'border-slate-800 hover:border-cyan-500/50',
    emerald: 'border-slate-800 hover:border-emerald-500/50',
    amber: 'border-slate-800 hover:border-amber-500/50',
    rose: 'border-slate-800 hover:border-rose-500/50',
    default: 'border-slate-800 hover:border-slate-700',
  }[variant];

  const valueVariantColor = {
    cyan: 'text-cyan-400',
    emerald: 'text-emerald-400',
    amber: 'text-amber-400',
    rose: 'text-rose-400',
    default: 'text-white',
  }[variant];

  return (
    <div
      className={`relative bg-slate-900/90 border rounded-xl p-4 transition-all duration-200 group ${borderVariantClass}`}
    >
      <div className="flex items-center justify-between mb-1.5">
        <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 font-semibold truncate pr-2">
          {label}
        </span>
        <button
          onClick={handleCopy}
          aria-label={`Copy ${label} value to clipboard`}
          className="p-1 rounded bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
          title="Copy value"
        >
          {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
        </button>
      </div>

      <div className="flex items-baseline gap-1.5">
        <span className={`font-mono text-2xl font-bold tracking-tight ${valueVariantColor}`}>
          {value}
        </span>
        {unit && (
          <span className="font-mono text-xs font-semibold text-slate-400">
            {unit}
          </span>
        )}
      </div>

      {subtext && (
        <p className="text-[11px] font-mono text-slate-400 mt-1 truncate">
          {subtext}
        </p>
      )}
    </div>
  );
};
