import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { RF_PATCH_PRESETS } from '@/data/pseo-presets';
import { PatchAntennaWorkbench } from '@/components/calculators/rf/PatchAntennaWorkbench';

export async function generateStaticParams() {
  return RF_PATCH_PRESETS.map((preset) => ({
    preset: preset.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ preset: string }>;
}): Promise<Metadata> {
  const { preset: slug } = await params;
  const preset = RF_PATCH_PRESETS.find((p) => p.slug === slug);

  if (!preset) {
    return {
      title: 'RF Patch Preset Not Found',
    };
  }

  const pageUrl = `https://traceandnode.com/patch-antenna-calculator/${preset.slug}`;

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

export default async function PatchPresetPage({
  params,
}: {
  params: Promise<{ preset: string }>;
}) {
  const { preset: slug } = await params;
  const preset = RF_PATCH_PRESETS.find((p) => p.slug === slug);

  if (!preset) {
    notFound();
  }

  return <PatchAntennaWorkbench initialPreset={preset} />;
}
