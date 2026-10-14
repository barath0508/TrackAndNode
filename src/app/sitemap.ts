// src/app/sitemap.ts
import { MetadataRoute } from 'next';
import {
  IOT_BATTERY_PRESETS,
  RF_PATCH_PRESETS,
  PINOUT_CHECKER_PRESETS,
} from '@/data/pseo-presets';

const BASE_URL = 'https://traceandnode.com';

export default function sitemap(): MetadataRoute.Sitemap {
  const currentDate = new Date('2026-10-14T00:00:00.000Z');

  const staticRoutes: MetadataRoute.Sitemap = [
    '',
    '/iot-battery-calculator',
    '/patch-antenna-calculator',
    '/pinout-conflict-checker',
    '/about',
    '/privacy-policy',
    '/terms',
    '/contact',
  ].map((route) => ({
    url: `${BASE_URL}${route}`,
    lastModified: currentDate,
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1.0 : 0.9,
  }));

  const iotRoutes: MetadataRoute.Sitemap = IOT_BATTERY_PRESETS.map((p) => ({
    url: `${BASE_URL}/iot-battery-calculator/${p.slug}`,
    lastModified: currentDate,
    changeFrequency: 'monthly' as const,
    priority: 0.85,
  }));

  const rfRoutes: MetadataRoute.Sitemap = RF_PATCH_PRESETS.map((p) => ({
    url: `${BASE_URL}/patch-antenna-calculator/${p.slug}`,
    lastModified: currentDate,
    changeFrequency: 'monthly' as const,
    priority: 0.85,
  }));

  const pinoutRoutes: MetadataRoute.Sitemap = PINOUT_CHECKER_PRESETS.map((p) => ({
    url: `${BASE_URL}/pinout-conflict-checker/${p.slug}`,
    lastModified: currentDate,
    changeFrequency: 'monthly' as const,
    priority: 0.85,
  }));

  return [...staticRoutes, ...iotRoutes, ...rfRoutes, ...pinoutRoutes];
}
