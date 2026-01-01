import { MetadataRoute } from 'next';
import citiesData from '@/data/cities.json';

export default function sitemap(): MetadataRoute.Sitemap {
  // ✅ FIXED: Using your non-www domain to match layout.tsx metadata
  const baseUrl = 'https://rentorbuyworld.com';
  const languages = ['en', 'fr', 'de', 'es', 'it', 'nl', 'sv', 'pt'];

  // 1. Home and Static Pages (Multi-language)
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
        url: `${baseUrl}/data-sources${langSuffix}`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.8,
      },
    ];
  });

  // 2. City Pages (500 cities x 8 languages)
  const cityPages = citiesData.flatMap((city) =>
    languages.map((lang) => ({
      url: `${baseUrl}/${city.slug}/buy-vs-rent${lang === 'en' ? '' : `?lang=${lang}`}`,
      lastModified: new Date(city.data_updated || new Date()),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    }))
  );

  return [...staticPages, ...cityPages];
}