import { MetadataRoute } from 'next';
import citiesData from '@/data/cities.json';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://rentorbuyworld.com';
  const languages = ['en', 'fr', 'de', 'es', 'it', 'nl', 'sv', 'pt'];

  // 1. Home and Static Pages for all languages
  const staticPages = languages.flatMap((lang) => {
    const langSuffix = lang === 'en' ? '' : `?lang=${lang}`;
    return [
      {
        url: `${baseUrl}${langSuffix}`,
        lastModified: new Date(),
        changeFrequency: 'daily' as const,
        priority: 1.0,
      },
      {
        url: `${baseUrl}/how-it-works${langSuffix}`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.8,
      },
      {
        url: `${baseUrl}/data-sources${langSuffix}`, // Matches your newest "Data Sources" page
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.8,
      },
    ];
  });

  // 2. All Cities x All Languages (500 cities * 8 languages = 4,000+ URLs)
  const cityPages = citiesData.flatMap((city) =>
    languages.map((lang) => ({
      url: `${baseUrl}/${city.slug}/buy-vs-rent${lang === 'en' ? '' : `?lang=${lang}`}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    }))
  );

  return [...staticPages, ...cityPages];
}