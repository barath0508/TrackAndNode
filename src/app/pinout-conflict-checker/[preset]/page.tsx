import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { PINOUT_PRESETS } from '@/data/pseo-presets';
import { PinoutCheckerWorkbench } from '@/components/calculators/pinout/PinoutCheckerWorkbench';

export async function generateStaticParams() {
  return PINOUT_PRESETS.map((preset) => ({
    preset: preset.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ preset: string }>;
}): Promise<Metadata> {
  const { preset: slug } = await params;
  const preset = PINOUT_PRESETS.find((p) => p.slug === slug);

  if (!preset) {
    return {
      title: 'Pinout Preset Not Found',
    };
  }

  return {
    title: preset.metaTitle,
    description: preset.metaDescription,
    openGraph: {
      title: preset.metaTitle,
      description: preset.metaDescription,
      url: `https://benchpulse.dev/pinout-conflict-checker/${preset.slug}`,
    },
  };
}

export default async function PinoutPresetPage({
  params,
}: {
  params: Promise<{ preset: string }>;
}) {
  const { preset: slug } = await params;
  const preset = PINOUT_PRESETS.find((p) => p.slug === slug);

  if (!preset) {
    notFound();
  }

  return <PinoutCheckerWorkbench initialPreset={preset} />;
}
