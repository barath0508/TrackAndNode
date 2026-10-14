'use client';

import React from 'react';

interface AdSlotProps {
  id: string;
  slotType: 'top-banner' | 'mid-content';
}

/**
 * AdSlot component with Pre-Approval vs. Post-Approval Toggle.
 * When NEXT_PUBLIC_ADSENSE_APPROVED !== 'true', returns null to prevent Google AdSense reviewers
 * from flagging placeholder boxes as "Site Under Construction / Low-Value Navigation".
 * Once approved, renders zero-CLS strictly pre-dimensioned containers with script injection.
 */
export const AdSlot: React.FC<AdSlotProps> = ({ id, slotType }) => {
  const isApproved = process.env.NEXT_PUBLIC_ADSENSE_APPROVED === 'true';
  const clientId = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID || 'ca-pub-0000000000000000';

  if (!isApproved) {
    return null;
  }

  const minHeightClass =
    slotType === 'top-banner'
      ? 'min-h-[100px] md:min-h-[90px]'
      : 'min-h-[280px]';

  return (
    <div
      id={id}
      aria-label="Sponsored Engineering Resources"
      className={`w-full my-6 flex flex-col items-center justify-center bg-slate-900/40 border border-slate-800/80 rounded-xl overflow-hidden ${minHeightClass}`}
    >
      <div className="w-full flex items-center justify-between px-3 py-1 bg-slate-950/70 border-b border-slate-800/60 text-[10px] font-mono text-slate-500 uppercase tracking-widest">
        <span className="flex items-center gap-1.5">
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-cyan-500/50"></span>
          Sponsored Hardware Resource
        </span>
        <span className="text-slate-600">CLS &lt; 0.05 Fixed Layout</span>
      </div>
      <div className="flex-1 w-full flex flex-col items-center justify-center p-2 text-center">
        {/* Dynamic AdSense Tag */}
        <ins
          className="adsbygoogle"
          style={{ display: 'block', width: '100%', height: '100%' }}
          data-ad-client={clientId}
          data-ad-slot={id}
          data-ad-format="auto"
          data-full-width-responsive="true"
        />
      </div>
    </div>
  );
};
