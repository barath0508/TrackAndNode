import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { IOT_PRESETS } from '@/data/pseo-presets';
import { IotBatteryWorkbench } from '@/components/calculators/iot/IotBatteryWorkbench';

export async function generateStaticParams() {
  return IOT_PRESETS.map((preset) => ({
    preset: preset.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ preset: string }>;
}): Promise<Metadata> {
  const { preset: slug } = await params;
  const preset = IOT_PRESETS.find((p) => p.slug === slug);

  if (!preset) {
    return {
      title: 'IoT Battery Preset Not Found',
    };
  }

  return {
    title: preset.metaTitle,
    description: preset.metaDescription,
    openGraph: {
      title: preset.metaTitle,
      description: preset.metaDescription,
      url: `https://trackandnode.dev/iot-battery-calculator/${preset.slug}`,
    },
  };
}

export default async function IotPresetPage({
  params,
}: {
  params: Promise<{ preset: string }>;
}) {
  const { preset: slug } = await params;
  const preset = IOT_PRESETS.find((p) => p.slug === slug);

  if (!preset) {
    notFound();
  }

  return <IotBatteryWorkbench initialPreset={preset} />;
}
