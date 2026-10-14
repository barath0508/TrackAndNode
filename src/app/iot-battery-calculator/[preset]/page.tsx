import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { IOT_BATTERY_PRESETS } from '@/data/pseo-presets';
import { IotBatteryWorkbench } from '@/components/calculators/iot/IotBatteryWorkbench';

export async function generateStaticParams() {
  return IOT_BATTERY_PRESETS.map((preset) => ({
    preset: preset.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ preset: string }>;
}): Promise<Metadata> {
  const { preset: slug } = await params;
  const preset = IOT_BATTERY_PRESETS.find((p) => p.slug === slug);

  if (!preset) {
    return {
      title: 'IoT Battery Preset Not Found',
    };
  }

  const pageUrl = `https://traceandnode.com/iot-battery-calculator/${preset.slug}`;

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

export default async function IotPresetPage({
  params,
}: {
  params: Promise<{ preset: string }>;
}) {
  const { preset: slug } = await params;
  const preset = IOT_BATTERY_PRESETS.find((p) => p.slug === slug);

  if (!preset) {
    notFound();
  }

  return <IotBatteryWorkbench initialPreset={preset} />;
}
