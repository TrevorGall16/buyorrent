/**
 * Dynamic Sitemap Generator
 * Generates sitemap for 4000+ URLs (500 cities × 8 languages)
 * Uses actual data update dates and stratified priorities
 */

import { MetadataRoute } from 'next';
import citiesData from '@/data/cities.json';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://rentorbuyworld.com';
  const languages = ['en', 'fr', 'de', 'es', 'it', 'nl', 'sv', 'pt'];

  // 1. Static Pages (High Priority)
  const staticPages = languages.flatMap((lang) => {
    const langParam = lang === 'en' ? '' : `?lang=${lang}`;
    return [
      {
        url: `${baseUrl}/${langParam}`,
        lastModified: new Date('2026-01-08'), // Actual last update date
        changeFrequency: 'weekly' as const, // Not daily (more realistic)
        priority: 1.0,
      },
      {
        url: `${baseUrl}/how-it-works${langParam}`,
        lastModified: new Date('2026-01-08'),
        changeFrequency: 'monthly' as const,
        priority: 0.8,
      },
      {
        url: `${baseUrl}/data-and-sources${langParam}`,
        lastModified: new Date('2026-01-08'),
        changeFrequency: 'monthly' as const,
        priority: 0.8,
      },
      {
        url: `${baseUrl}/privacy${langParam}`,
        lastModified: new Date('2026-01-08'),
        changeFrequency: 'monthly' as const,
        priority: 0.5,
      },
    ];
  });

  // 2. City Pages (Stratified Priorities)
  const cityPages = citiesData.flatMap((city, index) => {
    // Determine priority based on city ranking
    let priority: number;
    if (index < 50) {
      priority = 0.8; // Top 50 cities (Austin, Paris, London, etc.)
    } else if (index < 200) {
      priority = 0.6; // Major cities (200 total)
    } else {
      priority = 0.4; // Smaller cities
    }

    // Parse the data_updated field from city data
    // Format: "Dec 2024" or "Jan 2026"
    let lastModifiedDate: Date;
    try {
      // Try to parse "Dec 2024" format
      const dataUpdated = city.data_updated || 'Dec 2024';
      lastModifiedDate = new Date(dataUpdated);

      // Fallback if parsing fails
      if (isNaN(lastModifiedDate.getTime())) {
        lastModifiedDate = new Date('2024-12-01');
      }
    } catch {
      lastModifiedDate = new Date('2024-12-01');
    }

    return languages.map((lang) => ({
      url: `${baseUrl}/${city.slug}/buy-vs-rent${lang === 'en' ? '' : `?lang=${lang}`}`,
      lastModified: lastModifiedDate,
      changeFrequency: 'monthly' as const, // Realistic for market data
      priority,
    }));
  });

  return [...staticPages, ...cityPages];
}
