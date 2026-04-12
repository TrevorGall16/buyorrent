import { MetadataRoute } from 'next';
import citiesData from '@/data/cities.json';
import { SUPPORTED_LANGUAGES } from '@/lib/i18n';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://rentorbuyworld.com';

  // 1. Static Pages (High Priority)
  const staticPages = SUPPORTED_LANGUAGES.flatMap((lang) => [
    {
      url: `${baseUrl}/${lang}/`,
      lastModified: new Date('2026-04-12'),
      changeFrequency: 'weekly' as const,
      priority: 1.0,
    },
    {
      url: `${baseUrl}/${lang}/rankings`,
      lastModified: new Date('2026-04-12'),
      changeFrequency: 'daily' as const,
      priority: 1.0,
    },
    {
      url: `${baseUrl}/${lang}/how-it-works`,
      lastModified: new Date('2026-02-08'),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/${lang}/data-and-sources`,
      lastModified: new Date('2026-02-08'),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/${lang}/privacy`,
      lastModified: new Date('2026-02-08'),
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    },
  ]);

  // 2. City Pages (Stratified Priorities)
  const cityPages = citiesData.flatMap((city, index) => {
    let priority: number;
    if (index < 50) priority = 0.8;
    else if (index < 200) priority = 0.6;
    else priority = 0.4;

    const lastModifiedDate = new Date(city.data_updated || '2024-12-01');

    return SUPPORTED_LANGUAGES.map((lang) => ({
      url: `${baseUrl}/${lang}/${city.slug}/buy-vs-rent`,
      lastModified: lastModifiedDate,
      changeFrequency: 'monthly' as const,
      priority,
    }));
  });

  return [...staticPages, ...cityPages];
}
