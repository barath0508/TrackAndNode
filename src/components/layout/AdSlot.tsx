'use client';

import React from 'react';

interface AdSlotProps {
  id: string;
  slotType: 'top-banner' | 'mid-content';
}

export const AdSlot: React.FC<AdSlotProps> = ({ id, slotType }) => {
  const minHeightClass =
    slotType === 'top-banner'
      ? 'min-h-[100px] md:min-h-[90px]'
      : 'min-h-[280px]';

  return (
    <div
      id={id}
      aria-label="Sponsored Engineering Resources"
      className={`w-full my-6 flex flex-col items-center justify-center bg-slate-900/40 border border-dashed border-slate-800/80 rounded-xl overflow-hidden transition-colors hover:border-slate-700/80 ${minHeightClass}`}
    >
      <div className="w-full flex items-center justify-between px-3 py-1 bg-slate-950/70 border-b border-slate-800/60 text-[10px] font-mono text-slate-500 uppercase tracking-widest">
        <span className="flex items-center gap-1.5">
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-cyan-500/50"></span>
          Sponsored Resource
        </span>
        <span className="text-slate-600">Zero-CLS Reserved Area</span>
      </div>
      <div className="flex-1 w-full flex flex-col items-center justify-center p-4 text-center">
        {/* Google AdSense container placeholder (<ins className="adsbygoogle" ... />) */}
        <p className="text-xs font-mono text-slate-500 font-medium">
          Ad Placement Slot ({id})
        </p>
        <p className="text-[11px] text-slate-600 mt-1 max-w-sm">
          Strictly pre-dimensioned container adhering to Core Web Vitals CLS &lt; 0.05
        </p>
      </div>
    </div>
  );
};
