import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { RF_PRESETS } from '@/data/pseo-presets';
import { PatchAntennaWorkbench } from '@/components/calculators/rf/PatchAntennaWorkbench';

export async function generateStaticParams() {
  return RF_PRESETS.map((preset) => ({
    preset: preset.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ preset: string }>;
}): Promise<Metadata> {
  const { preset: slug } = await params;
  const preset = RF_PRESETS.find((p) => p.slug === slug);

  if (!preset) {
    return {
      title: 'RF Patch Preset Not Found',
    };
  }

  return {
    title: preset.metaTitle,
    description: preset.metaDescription,
    openGraph: {
      title: preset.metaTitle,
      description: preset.metaDescription,
      url: `https://trackandnode.dev/patch-antenna-calculator/${preset.slug}`,
    },
  };
}

export default async function PatchPresetPage({
  params,
}: {
  params: Promise<{ preset: string }>;
}) {
  const { preset: slug } = await params;
  const preset = RF_PRESETS.find((p) => p.slug === slug);

  if (!preset) {
    notFound();
  }

  return <PatchAntennaWorkbench initialPreset={preset} />;
}
