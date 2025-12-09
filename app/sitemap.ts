/**
 * Dynamic Sitemap Generation
 * Auto-generates sitemap.xml for all pages from cities.json
 * Ensures Google indexes all 50+ pages immediately
 */

import { MetadataRoute } from 'next';
import citiesData from '@/data/cities.json';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://www.rentorbuyworld.com';

  // Home page
  const homePageEntry: MetadataRoute.Sitemap[0] = {
    url: baseUrl,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 1.0,
  };

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/calculator`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/how-it-works`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/data-and-sources`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
  ];

  // Generate entries for all city pages
  const cityPageEntries: MetadataRoute.Sitemap = citiesData.map((city) => ({
    url: `${baseUrl}/${city.slug}/buy-vs-rent`,
    lastModified: new Date(city.data_updated || new Date()),
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  // Combine all entries
  return [homePageEntry, ...staticPages, ...cityPageEntries];
}
