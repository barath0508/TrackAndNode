'use client';

import React, { useState } from 'react';
import { Download, Info, Zap } from 'lucide-react';
import { IotPowerInput, IotPowerOutput } from '@/lib/iot-battery-math';

interface PowerWaveformSvgProps {
  input: IotPowerInput;
  output: IotPowerOutput;
}

export const PowerWaveformSvg: React.FC<PowerWaveformSvgProps> = ({ input, output }) => {
  const [activeTooltip, setActiveTooltip] = useState<string | null>(null);

  // SVG dimensions
  const width = 800;
  const height = 360;
  const padLeft = 70;
  const padRight = 30;
  const padTop = 40;
  const padBottom = 50;

  const plotWidth = width - padLeft - padRight;
  const plotHeight = height - padTop - padBottom;

  // Logarithmic Y-axis mapping: from 0.001 mA (1 uA) to 500 mA
  const minY = 0.001; // 1 uA
  const maxY = 500;   // 500 mA

  const toLogY = (currentMa: number): number => {
    const clamped = Math.max(minY, Math.min(maxY, currentMa));
    const logMin = Math.log10(minY);
    const logMax = Math.log10(maxY);
    const normalized = (Math.log10(clamped) - logMin) / (logMax - logMin);
    return padTop + plotHeight * (1 - normalized);
  };

  // Convert currents to mA
  const iSleepMa = input.sleepCurrentUa / 1000;
  const iSensorMa = input.wakeSensorCurrentMa;
  const iTxMa = input.txCurrentMa;
  const iQuiescentMa = input.regulatorQuiescentUa / 1000;

  // Calculate Y coordinates
  const ySleep = toLogY(iSleepMa + iQuiescentMa);
  const ySensor = toLogY(iSensorMa + iQuiescentMa);
  const yTx = toLogY(iTxMa + iQuiescentMa);
  const yBase = padTop + plotHeight;

  // Piecewise X-axis scaling (giving visual weight to short high-current pulses)
  // Total plot width: 15% pre-sleep, 30% sensor wake, 35% radio TX, 20% post-sleep
  const x0 = padLeft;
  const x1 = padLeft + plotWidth * 0.15;
  const x2 = x1 + plotWidth * 0.30;
  const x3 = x2 + plotWidth * 0.35;
  const x4 = padLeft + plotWidth;

  // Polyline points
  const points = `
    ${x0},${ySleep}
    ${x1},${ySleep}
    ${x1},${ySensor}
    ${x2},${ySensor}
    ${x2},${yTx}
    ${x3},${yTx}
    ${x3},${ySleep}
    ${x4},${ySleep}
  `.trim();

  // Area under curve path
  const areaPath = `
    M ${x0},${yBase}
    L ${x0},${ySleep}
    L ${x1},${ySleep}
    L ${x1},${ySensor}
    L ${x2},${ySensor}
    L ${x2},${yTx}
    L ${x3},${yTx}
    L ${x3},${ySleep}
    L ${x4},${ySleep}
    L ${x4},${yBase}
    Z
  `;

  // Energy charges in mAs (milliamp-seconds)
  const sensorDurationSec = input.wakeSensorDurationMs / 1000;
  const txDurationSec = input.txDurationMs / 1000;
  const sleepDurationSec = Math.max(0, input.wakeIntervalSeconds - sensorDurationSec - txDurationSec);

  const sensorChargeMas = (iSensorMa * sensorDurationSec).toFixed(3);
  const txChargeMas = (iTxMa * txDurationSec).toFixed(3);
  const sleepChargeMas = (iSleepMa * sleepDurationSec).toFixed(3);

  // SVG Export function
  const handleExportSvg = () => {
    const svgEl = document.getElementById('power-waveform-svg-element');
    if (!svgEl) return;
    const svgData = new XMLSerializer().serializeToString(svgEl);
    const blob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `traceandnode-duty-cycle-${input.wakeIntervalSeconds}s.svg`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div id="interactive-visualizer" className="w-full flex flex-col space-y-3">
      {/* Top action header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-xs font-mono text-cyan-400">
          <Zap className="w-3.5 h-3.5" />
          <span className="font-semibold uppercase tracking-wider">Log-Scale Current Duty Profile</span>
        </div>
        <button
          onClick={handleExportSvg}
          className="px-2.5 py-1 rounded bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs font-mono text-slate-300 hover:text-white flex items-center gap-1.5 transition-colors"
          title="Download SVG Blueprint"
        >
          <Download className="w-3.5 h-3.5" />
          <span>Export SVG</span>
        </button>
      </div>

      {/* SVG Canvas Container */}
      <div className="aspect-[16/10] w-full bg-slate-950 rounded-xl border border-slate-800 p-2 relative overflow-hidden flex items-center justify-center">
        <svg
          id="power-waveform-svg-element"
          viewBox={`0 0 ${width} ${height}`}
          className="w-full h-full select-none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="waveformGlow" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#06B6D4" stopOpacity="0.45" />
              <stop offset="60%" stopColor="#06B6D4" stopOpacity="0.12" />
              <stop offset="100%" stopColor="#090D16" stopOpacity="0.0" />
            </linearGradient>

            <pattern id="gridPattern" width="40" height="30" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 30" fill="none" stroke="#1E293B" strokeWidth="0.75" strokeDasharray="2,2" />
            </pattern>
          </defs>

          {/* Grid Background */}
          <rect x={padLeft} y={padTop} width={plotWidth} height={plotHeight} fill="url(#gridPattern)" />

          {/* Axis Boundaries */}
          <line x1={padLeft} y1={padTop} x2={padLeft} y2={padTop + plotHeight} stroke="#334155" strokeWidth="1.5" />
          <line x1={padLeft} y1={padTop + plotHeight} x2={padLeft + plotWidth} y2={padTop + plotHeight} stroke="#334155" strokeWidth="1.5" />

          {/* Logarithmic Y-Axis Reference Ticks & Labels */}
          {[
            { val: 0.001, label: '1 µA' },
            { val: 0.01, label: '10 µA' },
            { val: 0.1, label: '100 µA' },
            { val: 1.0, label: '1 mA' },
            { val: 10, label: '10 mA' },
            { val: 100, label: '100 mA' },
            { val: 500, label: '500 mA' },
          ].map((tick) => {
            const y = toLogY(tick.val);
            return (
              <g key={tick.label}>
                <line x1={padLeft - 6} y1={y} x2={padLeft + plotWidth} y2={y} stroke="#1E293B" strokeWidth="1" strokeDasharray="4,4" />
                <text x={padLeft - 10} y={y + 4} fill="#64748B" fontSize="10" fontFamily="monospace" textAnchor="end">
                  {tick.label}
                </text>
              </g>
            );
          })}

          {/* Shaded Area Under Curve */}
          <path d={areaPath} fill="url(#waveformGlow)" />

          {/* Stepped Waveform Line */}
          <polyline points={points} fill="none" stroke="#06B6D4" strokeWidth="3" strokeLinejoin="miter" />

          {/* Phase 1: Sleep Baseline Hover Target */}
          <rect
            x={x0}
            y={padTop}
            width={x1 - x0}
            height={plotHeight}
            fill="transparent"
            className="cursor-pointer hover:fill-cyan-500/5 transition-colors"
            onMouseEnter={() => setActiveTooltip('sleep')}
            onMouseLeave={() => setActiveTooltip(null)}
          />

          {/* Phase 2: Sensor Wake Hover Target */}
          <rect
            x={x1}
            y={padTop}
            width={x2 - x1}
            height={plotHeight}
            fill="transparent"
            className="cursor-pointer hover:fill-emerald-500/10 transition-colors"
            onMouseEnter={() => setActiveTooltip('sensor')}
            onMouseLeave={() => setActiveTooltip(null)}
          />

          {/* Phase 3: Radio TX Hover Target */}
          <rect
            x={x2}
            y={padTop}
            width={x3 - x2}
            height={plotHeight}
            fill="transparent"
            className="cursor-pointer hover:fill-rose-500/10 transition-colors"
            onMouseEnter={() => setActiveTooltip('tx')}
            onMouseLeave={() => setActiveTooltip(null)}
          />

          {/* Horizontal Reference Markers */}
          {/* TX Peak Marker */}
          <line x1={x2} y1={yTx} x2={x4} y2={yTx} stroke="#F43F5E" strokeWidth="1" strokeDasharray="3,3" />
          <text x={x3 + 8} y={yTx - 6} fill="#F43F5E" fontSize="11" fontFamily="monospace" fontWeight="bold">
            TX Peak: {input.txCurrentMa} mA ({input.txDurationMs} ms)
          </text>

          {/* Sensor Active Marker */}
          <text x={x1 + 6} y={ySensor - 6} fill="#10B981" fontSize="10" fontFamily="monospace">
            Sensor: {input.wakeSensorCurrentMa} mA ({input.wakeSensorDurationMs} ms)
          </text>

          {/* Sleep Baseline Marker */}
          <text x={x0 + 6} y={ySleep - 6} fill="#94A3B8" fontSize="10" fontFamily="monospace">
            Sleep: {input.sleepCurrentUa} µA (+{input.regulatorQuiescentUa} µA LDO)
          </text>

          {/* X-Axis Phase Labels */}
          <text x={(x0 + x1) / 2} y={padTop + plotHeight + 20} fill="#94A3B8" fontSize="11" fontFamily="monospace" textAnchor="middle">
            Deep Sleep
          </text>
          <text x={(x1 + x2) / 2} y={padTop + plotHeight + 20} fill="#10B981" fontSize="11" fontFamily="monospace" textAnchor="middle">
            Wake / Poll
          </text>
          <text x={(x2 + x3) / 2} y={padTop + plotHeight + 20} fill="#F43F5E" fontSize="11" fontFamily="monospace" textAnchor="middle">
            Radio TX
          </text>
          <text x={(x3 + x4) / 2} y={padTop + plotHeight + 20} fill="#94A3B8" fontSize="11" fontFamily="monospace" textAnchor="middle">
            Deep Sleep
          </text>

          {/* Time axis note */}
          <text x={width - padRight} y={height - 10} fill="#64748B" fontSize="10" fontFamily="monospace" textAnchor="end">
            Cycle Period: {input.wakeIntervalSeconds}s (Piecewise Time Scale)
          </text>

          {/* Interactive Tooltip Card Overlay inside SVG */}
          {activeTooltip === 'tx' && (
            <g transform={`translate(${x2 + 20}, ${Math.max(padTop + 20, yTx - 10)})`}>
              <rect width="180" height="65" rx="6" fill="#090D16" stroke="#F43F5E" strokeWidth="1" opacity="0.95" />
              <text x="10" y="18" fill="#F43F5E" fontSize="10" fontFamily="monospace" fontWeight="bold">
                RADIO TX BURST
              </text>
              <text x="10" y="34" fill="#F8FAFC" fontSize="10" fontFamily="monospace">
                Current: {input.txCurrentMa} mA
              </text>
              <text x="10" y="48" fill="#F8FAFC" fontSize="10" fontFamily="monospace">
                Air Time: {input.txDurationMs} ms
              </text>
              <text x="10" y="60" fill="#22D3EE" fontSize="10" fontFamily="monospace">
                Energy: {txChargeMas} mAs
              </text>
            </g>
          )}

          {activeTooltip === 'sensor' && (
            <g transform={`translate(${x1 + 10}, ${Math.max(padTop + 20, ySensor - 20)})`}>
              <rect width="180" height="65" rx="6" fill="#090D16" stroke="#10B981" strokeWidth="1" opacity="0.95" />
              <text x="10" y="18" fill="#10B981" fontSize="10" fontFamily="monospace" fontWeight="bold">
                MCU ACTIVE + SENSOR
              </text>
              <text x="10" y="34" fill="#F8FAFC" fontSize="10" fontFamily="monospace">
                Current: {input.wakeSensorCurrentMa} mA
              </text>
              <text x="10" y="48" fill="#F8FAFC" fontSize="10" fontFamily="monospace">
                Duration: {input.wakeSensorDurationMs} ms
              </text>
              <text x="10" y="60" fill="#22D3EE" fontSize="10" fontFamily="monospace">
                Energy: {sensorChargeMas} mAs
              </text>
            </g>
          )}

          {activeTooltip === 'sleep' && (
            <g transform={`translate(${x0 + 10}, ${Math.max(padTop + 20, ySleep - 70)})`}>
              <rect width="190" height="65" rx="6" fill="#090D16" stroke="#06B6D4" strokeWidth="1" opacity="0.95" />
              <text x="10" y="18" fill="#06B6D4" fontSize="10" fontFamily="monospace" fontWeight="bold">
                STANDBY DEEP SLEEP
              </text>
              <text x="10" y="34" fill="#F8FAFC" fontSize="10" fontFamily="monospace">
                Sleep: {input.sleepCurrentUa} µA
              </text>
              <text x="10" y="48" fill="#F8FAFC" fontSize="10" fontFamily="monospace">
                LDO Quiescent: {input.regulatorQuiescentUa} µA
              </text>
              <text x="10" y="60" fill="#22D3EE" fontSize="10" fontFamily="monospace">
                Total Standby: {sleepChargeMas} mAs
              </text>
            </g>
          )}
        </svg>
      </div>

      {/* Energy Breakdown Progress Bar */}
      <div className="w-full bg-slate-900/80 rounded-lg p-3 border border-slate-800 text-xs font-mono space-y-2">
        <div className="flex items-center justify-between text-slate-300 text-[11px]">
          <span>Cycle Energy Distribution:</span>
          <span>Duty Cycle: {(100 - output.sleepDutyCyclePercent).toFixed(3)}% Active</span>
        </div>
        <div className="w-full h-3 rounded-full overflow-hidden flex bg-slate-800">
          <div
            style={{ width: `${Math.max(1, output.energyBreakdownPercent.radioTx)}%` }}
            className="bg-rose-500 h-full transition-all"
            title={`Radio TX: ${output.energyBreakdownPercent.radioTx.toFixed(1)}%`}
          />
          <div
            style={{ width: `${Math.max(1, output.energyBreakdownPercent.sensorWake)}%` }}
            className="bg-emerald-500 h-full transition-all"
            title={`Sensor Wake: ${output.energyBreakdownPercent.sensorWake.toFixed(1)}%`}
          />
          <div
            style={{ width: `${Math.max(1, output.energyBreakdownPercent.regulatorOverhead)}%` }}
            className="bg-amber-500 h-full transition-all"
            title={`Regulator Overhead: ${output.energyBreakdownPercent.regulatorOverhead.toFixed(1)}%`}
          />
          <div
            style={{ width: `${Math.max(1, output.energyBreakdownPercent.sleep)}%` }}
            className="bg-cyan-500 h-full transition-all"
            title={`Sleep Current: ${output.energyBreakdownPercent.sleep.toFixed(1)}%`}
          />
        </div>
        <div className="flex flex-wrap gap-4 text-[10px] text-slate-400">
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-rose-500"></span>
            Radio TX: {output.energyBreakdownPercent.radioTx.toFixed(1)}%
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            Sensor Wake: {output.energyBreakdownPercent.sensorWake.toFixed(1)}%
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-amber-500"></span>
            Regulator: {output.energyBreakdownPercent.regulatorOverhead.toFixed(1)}%
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-cyan-500"></span>
            Sleep: {output.energyBreakdownPercent.sleep.toFixed(1)}%
          </span>
        </div>
      </div>
    </div>
  );
};
