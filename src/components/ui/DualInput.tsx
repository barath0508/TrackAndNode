'use client';

import React from 'react';

interface DualInputProps {
  id: string;
  label: string;
  value: number;
  unit: string;
  min: number;
  max: number;
  step?: number;
  onChange: (val: number) => void;
  helpText?: string;
}

export const DualInput: React.FC<DualInputProps> = ({
  id,
  label,
  value,
  unit,
  min,
  max,
  step = 1,
  onChange,
  helpText,
}) => {
  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const parsed = parseFloat(e.target.value);
    if (!isNaN(parsed)) {
      onChange(Math.max(min, Math.min(max * 1.5, parsed)));
    }
  };

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(parseFloat(e.target.value));
  };

  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between">
        <label htmlFor={`${id}-num`} className="text-xs font-medium text-slate-300">
          {label}
        </label>
        {helpText && <span className="text-[10px] text-slate-400 font-mono">{helpText}</span>}
      </div>

      {/* Numeric Box with Inline Unit Badge */}
      <div className="relative rounded-lg shadow-sm">
        <input
          type="number"
          id={`${id}-num`}
          min={min}
          max={max * 1.5}
          step={step}
          value={value}
          onChange={handleNumberChange}
          className="w-full bg-slate-950/80 border border-slate-800 rounded-lg px-3 py-2 pr-14 text-sm font-mono text-slate-100 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-colors"
        />
        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
          <span className="text-xs font-mono font-semibold text-cyan-400/90 bg-slate-900 px-1.5 py-0.5 rounded border border-slate-800">
            {unit}
          </span>
        </div>
      </div>

      {/* Paired Range Slider */}
      <div className="pt-1">
        <input
          type="range"
          id={`${id}-slider`}
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={handleSliderChange}
          className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-500 focus:outline-none"
        />
        <div className="flex justify-between text-[10px] font-mono text-slate-400 px-0.5">
          <span>{min} {unit}</span>
          <span>{max} {unit}</span>
        </div>
      </div>
    </div>
  );
};
