'use client';

import React from 'react';
import { McuProfile, McuPinDefinition } from '@/data/mcu-profiles';
import { AssignedPeripheral, ConflictDiagnostic } from '@/lib/pinout-conflict-engine';
import { AlertTriangle, CheckCircle, ShieldAlert } from 'lucide-react';

interface McuPackageSvgProps {
  mcu: McuProfile;
  assignments: AssignedPeripheral[];
  diagnostics: ConflictDiagnostic[];
  pinStatusMap: Record<
    string,
    {
      assigned: AssignedPeripheral[];
      hasError: boolean;
      hasWarning: boolean;
    }
  >;
  selectedPin: string | null;
  onSelectPin: (gpio: string) => void;
}

export const McuPackageSvg: React.FC<McuPackageSvgProps> = ({
  mcu,
  assignments,
  diagnostics,
  pinStatusMap,
  selectedPin,
  onSelectPin,
}) => {
  const leftPins = mcu.pins.filter((p) => p.side === 'left');
  const rightPins = mcu.pins.filter((p) => p.side === 'right');
  const maxRows = Math.max(leftPins.length, rightPins.length);

  // SVG dimensions
  const svgWidth = 720;
  const rowHeight = 24;
  const svgHeight = Math.max(520, maxRows * rowHeight + 100);

  // Layout boundaries
  const bodyWidth = 260;
  const bodyX = (svgWidth - bodyWidth) / 2;
  const bodyY = 40;
  const bodyHeight = svgHeight - 80;

  // Pin badge color helper
  const getPeripheralColor = (type?: string): string => {
    switch (type) {
      case 'I2C_SDA':
      case 'I2C_SCL':
        return '#06B6D4'; // Cyan
      case 'SPI_MOSI':
      case 'SPI_MISO':
      case 'SPI_SCK':
      case 'SPI_CS':
        return '#8B5CF6'; // Violet
      case 'PWM':
      case 'GPIO_OUT':
        return '#10B981'; // Emerald
      case 'ADC':
        return '#F59E0B'; // Amber
      case 'UART_TX':
      case 'UART_RX':
        return '#3B82F6'; // Blue
      default:
        return '#475569'; // Slate
    }
  };

  const renderPinRow = (pin: McuPinDefinition, index: number, side: 'left' | 'right') => {
    const y = bodyY + 30 + index * rowHeight;
    const status = pinStatusMap[pin.gpio];
    const isSelected = selectedPin === pin.gpio;
    const hasError = status?.hasError || false;
    const hasWarning = status?.hasWarning || false;
    const isAssigned = (status?.assigned?.length || 0) > 0;
    const firstAssigned = status?.assigned?.[0];

    const pinPadX = side === 'left' ? bodyX - 16 : bodyX + bodyWidth;
    const pinTextX = side === 'left' ? bodyX + 12 : bodyX + bodyWidth - 12;
    const pillX = side === 'left' ? bodyX - 125 : bodyX + bodyWidth + 24;
    const textAnchor = side === 'left' ? 'start' : 'end';

    return (
      <g
        key={`${pin.gpio}-${pin.pinNumber}`}
        className="cursor-pointer group"
        onClick={() => onSelectPin(pin.gpio)}
      >
        {/* Metal Pin Pad Header */}
        <rect
          x={pinPadX}
          y={y - 7}
          width="16"
          height="14"
          rx="2"
          fill={hasError ? '#F43F5E' : hasWarning ? '#F59E0B' : '#64748B'}
          stroke="#0F172A"
          strokeWidth="1"
        />

        {/* Conflict Pulse Animation Ring for Errors */}
        {hasError && (
          <circle
            cx={side === 'left' ? pinPadX + 8 : pinPadX + 8}
            cy={y}
            r="12"
            fill="none"
            stroke="#F43F5E"
            strokeWidth="2"
            className="animate-conflict-pulse"
          />
        )}

        {/* Selection Highlight */}
        {isSelected && (
          <rect
            x={side === 'left' ? bodyX : bodyX + bodyWidth - 100}
            y={y - 10}
            width="100"
            height="20"
            rx="4"
            fill="#06B6D4"
            opacity="0.15"
          />
        )}

        {/* Pin Internal Text Label on IC Body */}
        <text
          x={pinTextX}
          y={y + 3.5}
          fill={hasError ? '#FDA4AF' : isAssigned ? '#FFFFFF' : '#94A3B8'}
          fontSize="10"
          fontFamily="monospace"
          fontWeight={isAssigned || isSelected ? 'bold' : 'normal'}
          textAnchor={textAnchor}
        >
          {pin.label}
        </text>

        {/* Physical Pin Number in IC edge */}
        <text
          x={side === 'left' ? bodyX + 80 : bodyX + bodyWidth - 80}
          y={y + 3}
          fill="#475569"
          fontSize="8"
          fontFamily="monospace"
          textAnchor={side === 'left' ? 'start' : 'end'}
        >
          #{pin.pinNumber}
        </text>

        {/* External Peripheral Badge Pill */}
        {isAssigned && firstAssigned ? (
          <g transform={`translate(${pillX}, ${y - 8})`}>
            <rect
              width="95"
              height="16"
              rx="4"
              fill={hasError ? '#4C0519' : '#0F172A'}
              stroke={hasError ? '#F43F5E' : getPeripheralColor(firstAssigned.type)}
              strokeWidth="1.2"
            />
            <text
              x="47.5"
              y="11.5"
              fill={hasError ? '#FDA4AF' : getPeripheralColor(firstAssigned.type)}
              fontSize="8.5"
              fontFamily="monospace"
              fontWeight="bold"
              textAnchor="middle"
            >
              {firstAssigned.name.slice(0, 14)}
            </text>
          </g>
        ) : (
          /* Unassigned faint hint */
          <g transform={`translate(${pillX}, ${y - 8})`}>
            <rect
              width="95"
              height="16"
              rx="4"
              fill="#090D16"
              stroke="#1E293B"
              strokeWidth="0.8"
              className="opacity-40 group-hover:opacity-80 transition-opacity"
            />
            <text
              x="47.5"
              y="11"
              fill="#475569"
              fontSize="8"
              fontFamily="monospace"
              textAnchor="middle"
            >
              (Open GPIO)
            </text>
          </g>
        )}
      </g>
    );
  };

  return (
    <div id="interactive-visualizer" className="w-full flex flex-col space-y-3">
      {/* Visualizer Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-xs font-mono text-cyan-400">
          <ShieldAlert className="w-3.5 h-3.5" />
          <span className="font-semibold uppercase tracking-wider">{mcu.name} Silicon Package</span>
        </div>
        <div className="flex items-center gap-2 text-[11px] font-mono">
          {diagnostics.some((d) => d.severity === 'ERROR') ? (
            <span className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-rose-500/10 text-rose-400 border border-rose-500/20 font-bold">
              <AlertTriangle className="w-3.5 h-3.5" />
              Hardware Collisions Detected
            </span>
          ) : (
            <span className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-bold">
              <CheckCircle className="w-3.5 h-3.5" />
              Pin Routing Valid
            </span>
          )}
        </div>
      </div>

      {/* SVG Package Container */}
      <div className="aspect-[16/11] w-full bg-slate-950 rounded-xl border border-slate-800 p-2 relative overflow-hidden flex items-center justify-center shadow-inner">
        <svg
          viewBox={`0 0 ${svgWidth} ${svgHeight}`}
          className="w-full h-full select-none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="icGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#1E293B" />
              <stop offset="100%" stopColor="#0F172A" />
            </linearGradient>
          </defs>

          {/* Central IC Development Board Body */}
          <rect
            x={bodyX}
            y={bodyY}
            width={bodyWidth}
            height={bodyHeight}
            rx="12"
            fill="url(#icGrad)"
            stroke="#334155"
            strokeWidth="2"
          />

          {/* Pin 1 Orientation Notch */}
          <circle cx={bodyX + 24} cy={bodyY + 20} r="5" fill="#090D16" stroke="#475569" strokeWidth="1.5" />

          {/* Chip Center Silicon Branding */}
          <g transform={`translate(${bodyX + bodyWidth / 2}, ${bodyY + bodyHeight / 2})`}>
            <rect x="-65" y="-30" width="130" height="60" rx="8" fill="#090D16" stroke="#1E293B" strokeWidth="1" />
            <text x="0" y="-8" fill="#06B6D4" fontSize="12" fontFamily="monospace" fontWeight="bold" textAnchor="middle">
              {mcu.id.toUpperCase().slice(0, 14)}
            </text>
            <text x="0" y="8" fill="#94A3B8" fontSize="8" fontFamily="monospace" textAnchor="middle">
              {mcu.architecture}
            </text>
            <text x="0" y="20" fill="#64748B" fontSize="8" fontFamily="monospace" textAnchor="middle">
              {mcu.operatingVoltage.toFixed(1)}V Logic
            </text>
          </g>

          {/* Left Pin Header Column */}
          {leftPins.map((pin, i) => renderPinRow(pin, i, 'left'))}

          {/* Right Pin Header Column */}
          {rightPins.map((pin, i) => renderPinRow(pin, i, 'right'))}
        </svg>
      </div>

      {/* Peripheral Legend */}
      <div className="flex flex-wrap items-center justify-center gap-3 py-1 bg-slate-900/60 rounded-lg border border-slate-800 text-[10px] font-mono text-slate-400">
        <span className="flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-[#06B6D4]"></span>
          I2C Bus
        </span>
        <span className="flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-[#8B5CF6]"></span>
          SPI Bus
        </span>
        <span className="flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-[#10B981]"></span>
          PWM / Output
        </span>
        <span className="flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-[#F59E0B]"></span>
          ADC Analog
        </span>
        <span className="flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-[#3B82F6]"></span>
          UART Serial
        </span>
        <span className="flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-[#F43F5E] animate-pulse"></span>
          Conflict / Hazard
        </span>
      </div>
    </div>
  );
};
