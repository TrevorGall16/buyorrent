'use client';

import { useSearchParams } from 'next/navigation';
import citiesData from '@/data/cities.json';
import CitySelector from '@/components/CitySelector';
import { getHomePageLabels } from '@/lib/country-config';
import { Suspense } from 'react';

function HomePageContent() {
  const searchParams = useSearchParams();
  const lang = searchParams.get('lang') || 'en';

  // Validate language
  const validLanguages = ['en', 'fr', 'de', 'es', 'it', 'nl', 'sv', 'pt'];
  const currentLang = (validLanguages.includes(lang) ? lang : 'en') as 'en' | 'fr' | 'de' | 'es' | 'it' | 'nl' | 'sv' | 'pt';

  // Get translated labels
  const labels = getHomePageLabels(currentLang);

  // Group cities by country
  const citiesByCountry = citiesData.reduce((acc, city) => {
    const country = city.country_code;
    if (!acc[country]) {
      acc[country] = [];
    }
    acc[country].push(city);
    return acc;
  }, {} as Record<string, typeof citiesData>);

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-6xl mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="text-center space-y-8 mb-20">
          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 leading-tight">
            {labels.heroTitle}
          </h1>
          <p className="text-2xl md:text-3xl text-gray-600 max-w-3xl mx-auto font-light">
            {labels.heroSubtitle}
          </p>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto">
            {labels.heroDescription}
          </p>
        </div>

        {/* City Selection */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-2 text-center">
            {labels.chooseCityTitle}
          </h2>
          <p className="text-gray-600 text-center mb-8">
            {labels.chooseCitySubtitle}
          </p>

          <Suspense fallback={<div className="text-center">Loading cities...</div>}>
            <CitySelector citiesByCountry={citiesByCountry} />
          </Suspense>
        </div>

        {/* Footer */}
        <footer className="text-center space-y-6 py-8 border-t border-gray-200">
          <div className="flex justify-center gap-8 text-sm text-gray-600">
            <a href="#" className="hover:text-gray-900 transition-colors">
              {labels.footerAbout}
            </a>
            <a href="#" className="hover:text-gray-900 transition-colors">
              {labels.footerMethodology}
            </a>
            <a href="#" className="hover:text-gray-900 transition-colors">
              {labels.footerContact}
            </a>
            <a href="#" className="hover:text-gray-900 transition-colors">
              {labels.footerPrivacy}
            </a>
          </div>
          <p className="text-sm text-gray-500">
            {labels.footerBuiltWith}
          </p>
          <p className="text-xs text-gray-400" suppressHydrationWarning>
            © {new Date().getFullYear()} RentOrBuy-Pro. {labels.footerCopyright}
          </p>
        </footer>
      </div>
    </main>
  );
}

export default function HomePageWrapper() {
  return (
    <Suspense fallback={
      <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="max-w-6xl mx-auto px-4 py-16 text-center">
          <p className="text-lg text-gray-500">Loading...</p>
        </div>
      </main>
    }>
      <HomePageContent />
    </Suspense>
  );
}
