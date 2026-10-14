import { MetadataRoute } from 'next';
import { IOT_PRESETS, RF_PRESETS, PINOUT_PRESETS } from '@/data/pseo-presets';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://benchpulse.dev';
  const currentDate = new Date('2026-10-14T00:00:00.000Z');

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/iot-battery-calculator`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/patch-antenna-calculator`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/pinout-conflict-checker`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/privacy-policy`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.6,
    },
  ];

  const iotRoutes: MetadataRoute.Sitemap = IOT_PRESETS.map((p) => ({
    url: `${baseUrl}/iot-battery-calculator/${p.slug}`,
    lastModified: currentDate,
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  const rfRoutes: MetadataRoute.Sitemap = RF_PRESETS.map((p) => ({
    url: `${baseUrl}/patch-antenna-calculator/${p.slug}`,
    lastModified: currentDate,
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  const pinoutRoutes: MetadataRoute.Sitemap = PINOUT_PRESETS.map((p) => ({
    url: `${baseUrl}/pinout-conflict-checker/${p.slug}`,
    lastModified: currentDate,
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  return [...staticRoutes, ...iotRoutes, ...rfRoutes, ...pinoutRoutes];
}
