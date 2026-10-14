import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { Shield, Lock } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Privacy Policy & Google AdSense Disclosures',
  description:
    'BenchPulse privacy policy, zero backend data collection, cookie policy, Google AdSense DART disclosures, and GDPR/CCPA compliance.',
};

export default function PrivacyPolicyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10 text-slate-300">
      <div className="space-y-3 border-b border-slate-800 pb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono">
          <Shield className="w-3.5 h-3.5" />
          <span>Compliance &amp; Transparency</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
          Privacy Policy &amp; Cookie Disclosures
        </h1>
        <p className="text-slate-400 text-xs font-mono">
          Effective Date: October 14, 2026 | Last Updated: October 14, 2026
        </p>
      </div>

      {/* 1. Client-Side Processing Architecture */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <Lock className="w-4 h-4 text-emerald-400" />
          1. 100% Client-Side Computation (Zero Private Data Logging)
        </h2>
        <p className="text-sm text-slate-400 leading-relaxed font-sans">
          BenchPulse is engineered as a static client-side web application. All electrical parameters, custom RF dimensions,
          microcontroller pinout allocations, and battery discharge inputs entered into our calculator workbenches are executed
          strictly within your local web browser&apos;s JavaScript engine.
        </p>
        <p className="text-sm text-slate-400 leading-relaxed font-sans">
          <strong>We never transmit, store, or log your proprietary engineering designs, schematics, or numerical parameters to any remote server or third-party database.</strong>
        </p>
      </section>

      {/* 2. Google AdSense & DART Cookies */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold text-white">
          2. Google AdSense &amp; Advertising Cookies
        </h2>
        <p className="text-sm text-slate-400 leading-relaxed font-sans">
          We use Google AdSense and third-party advertising vendors to display relevant advertisements when you visit our website.
          These vendors may use cookies, web beacons, and unique device identifiers to serve ads based on your prior visits to this website or other websites across the Internet:
        </p>
        <ul className="space-y-2 text-xs font-mono text-slate-300 pl-4 list-disc">
          <li>
            Google&apos;s use of advertising cookies enables it and its partners to serve ads to our users based on their visit to our sites and/or other sites on the Internet.
          </li>
          <li>
            Users may opt out of personalized advertising by visiting Google&apos;s <a href="https://adssettings.google.com/" target="_blank" rel="noopener noreferrer" className="text-cyan-400 underline">Ads Settings</a>.
          </li>
          <li>
            Alternatively, users can opt out of a third-party vendor&apos;s use of cookies for personalized advertising by visiting <a href="https://www.aboutads.info/choices/" target="_blank" rel="noopener noreferrer" className="text-cyan-400 underline">aboutads.info</a>.
          </li>
        </ul>
      </section>

      {/* 3. Log Files & Analytics */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold text-white">3. Log Files &amp; Technical Metadata</h2>
        <p className="text-sm text-slate-400 leading-relaxed font-sans">
          Like most website operators, our CDN infrastructure (such as Cloudflare / Vercel edge networks) automatically collects non-personally identifiable technical access logs. These include your browser user-agent, operating system, IP address (anonymized), referring/exit pages, date/time stamps, and HTTP response codes. This telemetry is used exclusively for diagnosing CDN latency, preventing DDoS attacks, and ensuring server uptime.
        </p>
      </section>

      {/* 4. CCPA & GDPR User Rights */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold text-white">4. GDPR &amp; CCPA Privacy Rights</h2>
        <p className="text-sm text-slate-400 leading-relaxed font-sans">
          Under the General Data Protection Regulation (GDPR) and California Consumer Privacy Act (CCPA), visitors have rights to access, rectify, or erase personal data. Because BenchPulse does not maintain user accounts, require registration, or store engineering inputs, we hold zero user-identifiable records.
        </p>
      </section>

      {/* 5. Contact Information */}
      <section className="space-y-3 border-t border-slate-800 pt-6">
        <h2 className="text-base font-bold text-white">Questions &amp; Data Inquiries</h2>
        <p className="text-xs text-slate-400 font-sans">
          If you have questions regarding this Privacy Policy, please contact us via our <Link href="/contact" className="text-cyan-400 underline">Contact Page</Link>.
        </p>
      </section>
    </div>
  );
}
