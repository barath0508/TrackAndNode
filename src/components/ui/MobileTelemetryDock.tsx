'use client';

import React from 'react';
import { ArrowDown } from 'lucide-react';

interface MobileTelemetryDockProps {
  primaryLabel: string;
  primaryValue: string | number;
  primaryUnit?: string;
  targetDiagramId?: string;
}

export const MobileTelemetryDock: React.FC<MobileTelemetryDockProps> = ({
  primaryLabel,
  primaryValue,
  primaryUnit,
  targetDiagramId = 'interactive-visualizer',
}) => {
  const handleScrollToDiagram = () => {
    const el = document.getElementById(targetDiagramId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <aside
      aria-label="Live Telemetry Dock"
      className="fixed bottom-0 inset-x-0 z-50 h-16 bg-slate-900/95 backdrop-blur-md border-t border-cyan-500/30 px-4 flex items-center justify-between lg:hidden shadow-2xl shadow-cyan-500/10"
    >
      <div className="flex flex-col">
        <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-semibold">
          {primaryLabel}
        </span>
        <div className="flex items-baseline gap-1">
          <span className="font-mono text-lg font-bold text-cyan-400">
            {primaryValue}
          </span>
          {primaryUnit && (
            <span className="font-mono text-xs font-semibold text-slate-400">
              {primaryUnit}
            </span>
          )}
        </div>
      </div>

      <button
        onClick={handleScrollToDiagram}
        className="px-3.5 py-1.5 rounded-lg bg-cyan-500/15 hover:bg-cyan-500/25 border border-cyan-500/40 text-cyan-300 text-xs font-mono font-medium flex items-center gap-1.5 transition-colors"
      >
        <span>Jump to Diagram</span>
        <ArrowDown className="w-3.5 h-3.5 animate-bounce" />
      </button>
    </aside>
  );
};
