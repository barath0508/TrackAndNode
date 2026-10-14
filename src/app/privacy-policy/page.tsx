// src/app/privacy-policy/page.tsx
import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { Shield, Lock, Eye, CheckCircle2, Globe, FileText } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Privacy Policy & Google AdSense Cookie Disclosures',
  description:
    'TraceAndNode privacy policy, zero backend data logging policy, Google AdSense DART advertising cookie disclosure, GDPR, CCPA, and India DPDP compliance.',
  alternates: {
    canonical: 'https://traceandnode.com/privacy-policy',
  },
};

export default function PrivacyPolicyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10 text-slate-300">
      {/* Header */}
      <div className="space-y-3 border-b border-slate-800 pb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono">
          <Shield className="w-3.5 h-3.5" />
          <span>Privacy &amp; Regulatory Disclosures</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
          Privacy Policy &amp; Cookie Disclosures
        </h1>
        <p className="text-slate-400 text-xs font-mono">
          Effective Date: October 14, 2026 | Last Updated: October 14, 2026 | Governing Domain: traceandnode.com
        </p>
      </div>

      {/* 1. Client-Side Processing Architecture */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <Lock className="w-4 h-4 text-emerald-400" />
          <span>1. 100% Client-Side Processing Guarantee (Zero Private Design Data Logging)</span>
        </h2>
        <p className="text-sm text-slate-400 leading-relaxed font-sans">
          TraceAndNode was built specifically to protect proprietary electronic hardware designs and intellectual property.
          Unlike legacy cloud calculators that transmit engineering inputs across insecure HTTP request bodies, TraceAndNode
          operates as an entirely client-side web application executed by your local browser&apos;s JavaScript V8 engine.
        </p>
        <div className="p-4 rounded-xl bg-slate-900 border border-emerald-500/30 text-xs text-slate-300 leading-relaxed font-sans">
          <strong>Proprietary Design Privacy Commitment:</strong> All calculator inputs, PCB dimensions, and GPIO configurations
          entered on TraceAndNode are processed 100% locally inside your web browser and are never transmitted to or stored on external servers.
          Your experimental RF layer stackups, sensitive battery consumption duty cycles, and custom microstrip patch coordinates
          never leave your workstation.
        </div>
      </section>

      {/* 2. Mandatory Google AdSense & DART Cookie Disclosure */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <Eye className="w-4 h-4 text-cyan-400" />
          <span>2. Google AdSense &amp; Third-Party Advertising Disclosures</span>
        </h2>
        <p className="text-sm text-slate-400 leading-relaxed font-sans">
          We partner with third-party advertising networks, primarily Google AdSense, to finance the ongoing hosting, research,
          and development of our free engineering calculators. In accordance with Google AdSense program policies, we disclose
          the following terms regarding cookies and web beacons:
        </p>
        <div className="p-5 rounded-xl bg-slate-900 border border-slate-800 space-y-3 text-xs text-slate-300 font-sans leading-relaxed">
          <p>
            <strong>Third-party vendors, including Google, use cookies to serve ads based on a user&apos;s prior visits to this website or other websites.</strong>
          </p>
          <p>
            <strong>Google&apos;s use of advertising cookies enables it and its partners to serve ads to users based on their visit to TraceAndNode and/or other sites on the Internet.</strong>
          </p>
          <p>
            <strong>Users may opt out of personalized advertising by visiting{' '}
            <a
              href="https://www.google.com/settings/ads"
              target="_blank"
              rel="noopener noreferrer"
              className="text-cyan-400 underline font-mono"
            >
              Google Ads Settings
            </a>.</strong>
          </p>
          <p>
            Alternatively, users may opt out of third-party vendor cookies for personalized advertising by visiting the Network Advertising
            Initiative consumer opt-out portal at{' '}
            <a
              href="https://www.aboutads.info/choices/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-cyan-400 underline font-mono"
            >
              www.aboutads.info
            </a>.
          </p>
        </div>
      </section>

      {/* 3. CDN Telemetry & Server Access Logs */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold text-white">3. Content Delivery Network (CDN) Server Logs</h2>
        <p className="text-sm text-slate-400 leading-relaxed font-sans">
          When accessing TraceAndNode, our static hosting edge network automatically logs standard non-personally identifiable
          HTTP request metadata. This metadata includes:
        </p>
        <ul className="text-xs font-mono text-slate-400 space-y-1.5 pl-4 list-disc">
          <li>Browser user-agent string and operating system architecture</li>
          <li>Anonymized IP address and approximate country/city routing point</li>
          <li>Referring web page and requested uniform resource identifier (URI)</li>
          <li>Edge network response code, cache status (HIT/MISS), and byte transmission counts</li>
        </ul>
        <p className="text-xs text-slate-400 leading-relaxed font-sans">
          This technical telemetry is analyzed strictly in the aggregate to maintain low-latency global caching, mitigate DDoS attacks,
          and ensure platform stability. We do not correlate server logs with individual user identities.
        </p>
      </section>

      {/* 4. Global Data Protection Compliance (GDPR, CCPA & India DPDP) */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <Globe className="w-4 h-4 text-cyan-400" />
          <span>4. Global Regulatory Compliance (GDPR, CCPA &amp; India DPDP Act)</span>
        </h2>
        <p className="text-sm text-slate-400 leading-relaxed font-sans">
          TraceAndNode adheres to the principles of data minimization and privacy-by-design under the European Union General Data
          Protection Regulation (GDPR), the California Consumer Privacy Act (CCPA/CPRA), and the Digital Personal Data Protection Act (DPDP India):
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 pt-1">
          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1.5">
            <span className="text-xs font-mono font-bold text-cyan-400">EU GDPR Rights</span>
            <p className="text-[11px] text-slate-400 font-sans leading-relaxed">
              You retain the right to request access, rectification, or erasure of personal data. Because we do not store accounts or
              personal data, zero identifiable records are held.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1.5">
            <span className="text-xs font-mono font-bold text-emerald-400">California CCPA</span>
            <p className="text-[11px] text-slate-400 font-sans leading-relaxed">
              We do not sell, rent, or trade user personal information. Visitors may restrict third-party advertising tracking via
              their browser Do-Not-Track (DNT) header.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1.5">
            <span className="text-xs font-mono font-bold text-amber-400">India DPDP Act</span>
            <p className="text-[11px] text-slate-400 font-sans leading-relaxed">
              Processing occurs strictly in accordance with consent and legitimate technical purposes for rendering web pages, with
              transparent grievance redressal.
            </p>
          </div>
        </div>
      </section>

      {/* 5. Contact & Privacy Inquiries */}
      <section className="space-y-3 border-t border-slate-800 pt-8">
        <h2 className="text-lg font-bold text-white">5. Privacy Officer &amp; Inquiries</h2>
        <p className="text-xs text-slate-400 leading-relaxed font-sans">
          For technical inquiries regarding our cookie disclosures, data protection practices, or compliance architecture,
          please visit our dedicated support page at{' '}
          <Link href="/contact" className="text-cyan-400 underline font-mono">
            traceandnode.com/contact
          </Link>{' '}
          or submit a formal review request.
        </p>
      </section>
    </div>
  );
}
