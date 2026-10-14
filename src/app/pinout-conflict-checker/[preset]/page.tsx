import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { PINOUT_CHECKER_PRESETS } from '@/data/pseo-presets';
import { PinoutCheckerWorkbench } from '@/components/calculators/pinout/PinoutCheckerWorkbench';

export async function generateStaticParams() {
  return PINOUT_CHECKER_PRESETS.map((preset) => ({
    preset: preset.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ preset: string }>;
}): Promise<Metadata> {
  const { preset: slug } = await params;
  const preset = PINOUT_CHECKER_PRESETS.find((p) => p.slug === slug);

  if (!preset) {
    return {
      title: 'Pinout Preset Not Found',
    };
  }

  const pageUrl = `https://traceandnode.com/pinout-conflict-checker/${preset.slug}`;

  return {
    title: preset.metaTitle,
    description: preset.metaDescription,
    alternates: {
      canonical: pageUrl,
    },
    openGraph: {
      title: preset.metaTitle,
      description: preset.metaDescription,
      url: pageUrl,
    },
  };
}

export default async function PinoutPresetPage({
  params,
}: {
  params: Promise<{ preset: string }>;
}) {
  const { preset: slug } = await params;
  const preset = PINOUT_CHECKER_PRESETS.find((p) => p.slug === slug);

  if (!preset) {
    notFound();
  }

  return <PinoutCheckerWorkbench initialPreset={preset} />;
}
