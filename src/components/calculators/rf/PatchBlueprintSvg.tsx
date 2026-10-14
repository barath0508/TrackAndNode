'use client';

import React, { useState } from 'react';
import { Download, Copy, Check, Eye } from 'lucide-react';
import { PatchAntennaInput, PatchAntennaOutput } from '@/lib/patch-antenna-math';

interface PatchBlueprintSvgProps {
  input: PatchAntennaInput;
  output: PatchAntennaOutput;
  substrateColorHex?: string;
}

export const PatchBlueprintSvg: React.FC<PatchBlueprintSvgProps> = ({
  input,
  output,
  substrateColorHex = '#064E3B',
}) => {
  const [copiedCst, setCopiedCst] = useState(false);
  const [copiedKiCad, setCopiedKiCad] = useState(false);

  // Canvas bounds
  const svgWidth = 800;
  const svgHeight = 500;
  const pad = 70;

  // Real world dimensions (mm)
  const gndW = output.minGroundWidthMm;
  const gndL = output.minGroundLengthMm;
  const patchW = output.patchWidthMm;
  const patchL = output.patchLengthMm;
  const y0 = output.insetFeedDepthMm;
  const feedW = output.feedTraceWidthMm;
  const gap = output.insetGapMm;

  // Scale factor so entire ground plane + feedline fits comfortably in canvas
  const availW = svgWidth - pad * 2;
  const availH = svgHeight - pad * 2;
  const scale = Math.min(availW / gndW, availH / gndL);

  // Scaled dimensions (pixels)
  const pxGndW = gndW * scale;
  const pxGndL = gndL * scale;
  const pxPatchW = patchW * scale;
  const pxPatchL = patchL * scale;
  const pxY0 = y0 * scale;
  const pxFeedW = Math.max(3, feedW * scale);
  const pxGap = Math.max(2, gap * scale);

  // Center coordinates
  const centerX = svgWidth / 2;
  const centerY = svgHeight / 2 - 10;

  // Top-left of ground plane
  const gndX = centerX - pxGndW / 2;
  const gndY = centerY - pxGndL / 2;

  // Top-left of patch
  const patchX = centerX - pxPatchW / 2;
  const patchY = centerY - pxPatchL / 2;

  // Inset notch geometry path for copper polygon
  // Patch is drawn clockwise from top-left, with inset notches at bottom edge hugging the feedline
  const feedX = centerX - pxFeedW / 2;
  const leftNotchX = feedX - pxGap;
  const rightNotchX = feedX + pxFeedW + pxGap;
  const notchTopY = patchY + pxPatchL - pxY0;
  const patchBottomY = patchY + pxPatchL;

  // Inset copper path
  const copperPatchPath = `
    M ${patchX},${patchY}
    L ${patchX + pxPatchW},${patchY}
    L ${patchX + pxPatchW},${patchBottomY}
    L ${rightNotchX},${patchBottomY}
    L ${rightNotchX},${notchTopY}
    L ${feedX + pxFeedW},${notchTopY}
    L ${feedX + pxFeedW},${patchBottomY}
    L ${feedX},${patchBottomY}
    L ${feedX},${notchTopY}
    L ${leftNotchX},${notchTopY}
    L ${leftNotchX},${patchBottomY}
    L ${patchX},${patchBottomY}
    Z
  `;

  // Feedline trace extending down to substrate edge
  const feedlinePath = `
    M ${feedX},${notchTopY}
    L ${feedX + pxFeedW},${notchTopY}
    L ${feedX + pxFeedW},${gndY + pxGndL}
    L ${feedX},${gndY + pxGndL}
    Z
  `;

  // SVG Export function
  const handleExportSvg = () => {
    const svgEl = document.getElementById('patch-blueprint-svg-element');
    if (!svgEl) return;
    const svgData = new XMLSerializer().serializeToString(svgEl);
    const blob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `benchpulse-patch-${input.frequencyGhz}ghz.svg`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleCopyCst = () => {
    navigator.clipboard.writeText(output.cstVbMacroSnippet);
    setCopiedCst(true);
    setTimeout(() => setCopiedCst(false), 2000);
  };

  const handleCopyKiCad = () => {
    const kicadSummary = `KiCad Microstrip Patch Footprint Parameters:
Center Frequency: ${input.frequencyGhz} GHz
Patch Width (W): ${output.patchWidthMm.toFixed(3)} mm [${(output.patchWidthMm * 39.3701).toFixed(1)} mil]
Patch Length (L): ${output.patchLengthMm.toFixed(3)} mm [${(output.patchLengthMm * 39.3701).toFixed(1)} mil]
Inset Notch Depth (y0): ${output.insetFeedDepthMm.toFixed(3)} mm [${(output.insetFeedDepthMm * 39.3701).toFixed(1)} mil]
Inset Notch Gap (g): ${output.insetGapMm.toFixed(3)} mm [${(output.insetGapMm * 39.3701).toFixed(1)} mil]
50 Ohm Feed Width (W_f): ${output.feedTraceWidthMm.toFixed(3)} mm [${(output.feedTraceWidthMm * 39.3701).toFixed(1)} mil]
Ground Plane Size: ${output.minGroundWidthMm.toFixed(2)} x ${output.minGroundLengthMm.toFixed(2)} mm
Dielectric Substrate: eps_r = ${input.dielectricConstant}, h = ${input.substrateHeightMm} mm`;
    navigator.clipboard.writeText(kicadSummary);
    setCopiedKiCad(true);
    setTimeout(() => setCopiedKiCad(false), 2000);
  };

  return (
    <div id="interactive-visualizer" className="w-full flex flex-col space-y-3">
      {/* Top Header Actions */}
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2 text-xs font-mono text-cyan-400">
          <Eye className="w-3.5 h-3.5" />
          <span className="font-semibold uppercase tracking-wider">2D CAD Inset-Feed Copper Blueprint</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handleCopyKiCad}
            className="px-2.5 py-1 rounded bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs font-mono text-slate-300 hover:text-white flex items-center gap-1.5 transition-colors"
            title="Copy KiCad Dimensions"
          >
            {copiedKiCad ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>KiCad Specs</span>
          </button>
          <button
            onClick={handleCopyCst}
            className="px-2.5 py-1 rounded bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs font-mono text-slate-300 hover:text-white flex items-center gap-1.5 transition-colors"
            title="Copy CST Studio Suite VBScript Macro"
          >
            {copiedCst ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>CST Macro</span>
          </button>
          <button
            onClick={handleExportSvg}
            className="px-2.5 py-1 rounded bg-cyan-500/15 hover:bg-cyan-500/25 border border-cyan-500/40 text-xs font-mono text-cyan-300 flex items-center gap-1.5 transition-colors"
            title="Export Clean SVG"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export SVG</span>
          </button>
        </div>
      </div>

      {/* 2D CAD SVG Blueprint */}
      <div className="aspect-[16/10] w-full bg-slate-950 rounded-xl border border-slate-800 p-2 relative overflow-hidden flex items-center justify-center shadow-inner">
        <svg
          id="patch-blueprint-svg-element"
          viewBox={`0 0 ${svgWidth} ${svgHeight}`}
          className="w-full h-full select-none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Arrowhead markers for dimension leader lines */}
            <marker id="arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
              <path d="M 0 1.5 L 10 5 L 0 8.5 z" fill="#38BDF8" />
            </marker>
            <marker id="arrowAmber" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
              <path d="M 0 1.5 L 10 5 L 0 8.5 z" fill="#F59E0B" />
            </marker>

            {/* Subtle copper gradient */}
            <linearGradient id="copperGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#F59E0B" />
              <stop offset="50%" stopColor="#D97706" />
              <stop offset="100%" stopColor="#B45309" />
            </linearGradient>

            <pattern id="cadGrid" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#1E293B" strokeWidth="0.5" strokeDasharray="1,3" />
            </pattern>
          </defs>

          {/* Grid background */}
          <rect width={svgWidth} height={svgHeight} fill="url(#cadGrid)" />

          {/* Dielectric Substrate Rectangle */}
          <rect
            x={gndX}
            y={gndY}
            width={pxGndW}
            height={pxGndL}
            rx="4"
            fill={substrateColorHex}
            stroke="#334155"
            strokeWidth="1.5"
            opacity="0.95"
          />

          {/* Ground Plane Label */}
          <text x={gndX + 8} y={gndY + 16} fill="#94A3B8" fontSize="10" fontFamily="monospace">
            Ground Plane: {gndW.toFixed(1)} × {gndL.toFixed(1)} mm
          </text>

          {/* Microstrip Feedline Trace */}
          <path d={feedlinePath} fill="url(#copperGrad)" stroke="#F59E0B" strokeWidth="1" />

          {/* Parametric Copper Patch Polygon with Inset Notches */}
          <path d={copperPatchPath} fill="url(#copperGrad)" stroke="#F59E0B" strokeWidth="1.5" />

          {/* Inset Notch Dimension Marker Line (y0) */}
          <line
            x1={rightNotchX + 10}
            y1={patchBottomY}
            x2={rightNotchX + 10}
            y2={notchTopY}
            stroke="#F59E0B"
            strokeWidth="1.2"
            markerStart="url(#arrowAmber)"
            markerEnd="url(#arrowAmber)"
          />
          <text
            x={rightNotchX + 16}
            y={(patchBottomY + notchTopY) / 2 + 3}
            fill="#F59E0B"
            fontSize="9"
            fontFamily="monospace"
          >
            y0 = {y0.toFixed(2)} mm
          </text>

          {/* Top Dimension: Patch Width W */}
          <line
            x1={patchX}
            y1={patchY - 14}
            x2={patchX + pxPatchW}
            y2={patchY - 14}
            stroke="#38BDF8"
            strokeWidth="1.2"
            markerStart="url(#arrow)"
            markerEnd="url(#arrow)"
          />
          <text
            x={centerX}
            y={patchY - 20}
            fill="#38BDF8"
            fontSize="11"
            fontFamily="monospace"
            textAnchor="middle"
            fontWeight="bold"
          >
            W = {patchW.toFixed(2)} mm [{(patchW * 39.37).toFixed(0)} mil]
          </text>

          {/* Left Dimension: Patch Length L */}
          <line
            x1={patchX - 14}
            y1={patchY}
            x2={patchX - 14}
            y2={patchBottomY}
            stroke="#38BDF8"
            strokeWidth="1.2"
            markerStart="url(#arrow)"
            markerEnd="url(#arrow)"
          />
          <text
            x={patchX - 20}
            y={centerY}
            fill="#38BDF8"
            fontSize="11"
            fontFamily="monospace"
            textAnchor="end"
            fontWeight="bold"
          >
            L = {patchL.toFixed(2)} mm
          </text>

          {/* Feed Width Dimension (W_f) */}
          <text
            x={centerX}
            y={gndY + pxGndL - 8}
            fill="#FCD34D"
            fontSize="9"
            fontFamily="monospace"
            textAnchor="middle"
          >
            50Ω Feed: {feedW.toFixed(2)} mm
          </text>

          {/* Scale factor footer info */}
          <text x={svgWidth - 16} y={svgHeight - 12} fill="#64748B" fontSize="9" fontFamily="monospace" textAnchor="end">
            CAD Scale: {(scale * 10).toFixed(1)} px/cm | 1 oz Cu (35µm)
          </text>
        </svg>
      </div>

      {/* Substrate & Impedance Mini-Badge Footer */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs font-mono">
        <div className="bg-slate-900/80 p-2 rounded-lg border border-slate-800">
          <span className="text-slate-400 text-[10px] uppercase">Effective Permittivity</span>
          <p className="text-cyan-400 font-bold">{output.effectivePermittivity.toFixed(3)}</p>
        </div>
        <div className="bg-slate-900/80 p-2 rounded-lg border border-slate-800">
          <span className="text-slate-400 text-[10px] uppercase">Fringing Ext (ΔL)</span>
          <p className="text-cyan-400 font-bold">{output.fringingExtensionMm.toFixed(3)} mm</p>
        </div>
        <div className="bg-slate-900/80 p-2 rounded-lg border border-slate-800">
          <span className="text-slate-400 text-[10px] uppercase">Edge Impedance</span>
          <p className="text-amber-400 font-bold">{output.edgeImpedanceOhm.toFixed(1)} Ω</p>
        </div>
        <div className="bg-slate-900/80 p-2 rounded-lg border border-slate-800">
          <span className="text-slate-400 text-[10px] uppercase">Guided Wave (λg)</span>
          <p className="text-emerald-400 font-bold">{output.guidedWavelengthMm.toFixed(2)} mm</p>
        </div>
      </div>
    </div>
  );
};
