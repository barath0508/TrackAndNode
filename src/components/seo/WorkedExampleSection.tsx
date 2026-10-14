'use client';

import React from 'react';
import { BookOpen, HelpCircle, Layers, CheckCircle2 } from 'lucide-react';

interface TradeOffItem {
  parameter: string;
  baseline: string;
  variant: string;
  impact: string;
}

interface FaqItem {
  question: string;
  answer: string;
}

interface WorkedExampleSectionProps {
  toolTitle: string;
  formulaTitle: string;
  steps: {
    title: string;
    formula: string;
    substitution: string;
    result: string;
    explanation: string;
  }[];
  tradeOffRows: TradeOffItem[];
  faqs: FaqItem[];
}

export const WorkedExampleSection: React.FC<WorkedExampleSectionProps> = ({
  toolTitle,
  formulaTitle,
  steps,
  tradeOffRows,
  faqs,
}) => {
  return (
    <article className="w-full mt-12 pt-8 border-t border-slate-800/80 space-y-10 text-slate-300">
      {/* Section Header */}
      <div>
        <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs uppercase tracking-wider mb-2">
          <BookOpen className="w-4 h-4" />
          <span>Dynamic Engineering Guide &amp; Proof</span>
        </div>
        <h2 className="text-2xl font-bold tracking-tight text-white">
          Mathematical Derivation &amp; Hardware Trade-Off Analysis: {toolTitle}
        </h2>
        <p className="text-slate-400 text-sm mt-2 leading-relaxed max-w-3xl">
          Below is the step-by-step mathematical proof evaluated from the active parameters in the workbench above.
          Engineers and students can trace each substitution into the governing physical equations without black-box opacity.
        </p>
      </div>

      {/* 1. Step-by-Step Mathematical Proof */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold text-white flex items-center gap-2">
          <span className="w-6 h-6 rounded-md bg-cyan-500/20 text-cyan-400 text-xs font-mono flex items-center justify-center font-bold">
            1
          </span>
          Step-by-Step Mathematical Proof ({formulaTitle})
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {steps.map((step, idx) => (
            <div
              key={idx}
              className="bg-slate-900/70 border border-slate-800 rounded-xl p-5 space-y-2.5 transition-colors hover:border-slate-700"
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-bold text-cyan-400 uppercase tracking-wide">
                  Step {idx + 1}: {step.title}
                </span>
                <CheckCircle2 className="w-4 h-4 text-emerald-400/80" />
              </div>

              {/* Governing Equation */}
              <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800/80 font-mono text-xs text-slate-300 overflow-x-auto">
                <span className="text-slate-500 block text-[10px] uppercase">Governing Equation</span>
                <code className="text-cyan-300">{step.formula}</code>
              </div>

              {/* Numerical Substitution */}
              <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800/80 font-mono text-xs text-slate-300 overflow-x-auto">
                <span className="text-slate-500 block text-[10px] uppercase">Value Substitution</span>
                <code className="text-amber-300">{step.substitution}</code>
              </div>

              {/* Evaluated Result */}
              <div className="flex items-center justify-between pt-1 text-xs font-mono">
                <span className="text-slate-400 font-medium">Calculated Value:</span>
                <span className="font-bold text-emerald-400 text-sm">{step.result}</span>
              </div>

              <p className="text-xs text-slate-400 leading-relaxed pt-1">
                {step.explanation}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* 2. Hardware Design Sensitivity & Trade-Off Table */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold text-white flex items-center gap-2">
          <span className="w-6 h-6 rounded-md bg-cyan-500/20 text-cyan-400 text-xs font-mono flex items-center justify-center font-bold">
            2
          </span>
          Hardware Design Sensitivity &amp; Parameter Trade-Offs
        </h3>

        <div className="w-full overflow-x-auto border border-slate-800 rounded-xl">
          <table className="w-full text-left text-xs font-mono border-collapse bg-slate-900/60">
            <thead>
              <tr className="border-b border-slate-800 bg-slate-950 text-slate-400 uppercase text-[11px]">
                <th className="py-3 px-4">Design Parameter</th>
                <th className="py-3 px-4">Standard Baseline</th>
                <th className="py-3 px-4">Alternative Variant</th>
                <th className="py-3 px-4">Hardware Impact &amp; Engineering Rationale</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80 text-slate-300">
              {tradeOffRows.map((row, i) => (
                <tr key={i} className="hover:bg-slate-850/50 transition-colors">
                  <td className="py-3 px-4 font-bold text-cyan-300">{row.parameter}</td>
                  <td className="py-3 px-4 text-slate-400">{row.baseline}</td>
                  <td className="py-3 px-4 text-amber-300">{row.variant}</td>
                  <td className="py-3 px-4 font-sans text-xs text-slate-300 leading-relaxed">{row.impact}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 3. Authoritative Engineering FAQs */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold text-white flex items-center gap-2">
          <span className="w-6 h-6 rounded-md bg-cyan-500/20 text-cyan-400 text-xs font-mono flex items-center justify-center font-bold">
            3
          </span>
          Frequently Asked Engineering Questions
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className="bg-slate-900/80 border border-slate-800 rounded-xl p-5 space-y-2"
            >
              <h4 className="text-sm font-semibold text-white flex items-start gap-2">
                <HelpCircle className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <span>{faq.question}</span>
              </h4>
              <p className="text-xs text-slate-400 leading-relaxed font-sans pl-6">
                {faq.answer}
              </p>
            </div>
          ))}
        </div>
      </div>
    </article>
  );
};
