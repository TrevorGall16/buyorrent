'use client';

<<<<<<< HEAD
import { useSearchParams } from 'next/navigation';
import citiesData from '@/data/cities.json';
import CitySelector from '@/components/CitySelector';
import Footer from '@/components/Footer';
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

=======
import citiesData from '@/data/cities.json';
import CitySelector from '@/components/CitySelector';
import { Suspense } from 'react';

function HomePageContent() {
>>>>>>> ce91f68596613eb3e2794073a3f4137fe445cf37
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
<<<<<<< HEAD
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
=======
      <div className="max-w-7xl mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="text-center space-y-8 mb-20">
          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 leading-tight">
            Buy vs Rent Calculator
          </h1>
          <p className="text-2xl md:text-3xl text-gray-600 max-w-3xl mx-auto font-light">
            Make smarter financial decisions with real market data
          </p>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto">
            Compare the true cost of buying versus renting in over 50 cities worldwide
>>>>>>> ce91f68596613eb3e2794073a3f4137fe445cf37
          </p>
        </div>

        {/* City Selection */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-2 text-center">
<<<<<<< HEAD
            {labels.chooseCityTitle}
          </h2>
          <p className="text-gray-600 text-center mb-12">
            {labels.chooseCitySubtitle}
          </p>

          <Suspense fallback={<div className="text-center">Loading cities...</div>}>
            <CitySelector citiesByCountry={citiesByCountry} />
          </Suspense>
        </div>

        {/* Footer */}
        <Footer labels={labels} />
=======
            Choose Your City
          </h2>
          <p className="text-gray-600 text-center mb-12">
            Select a city to see personalized buy vs rent analysis
          </p>

          <Suspense fallback={<div className="text-center text-gray-500">Loading cities...</div>}>
            <CitySelector citiesByCountry={citiesByCountry} />
          </Suspense>
        </div>
>>>>>>> ce91f68596613eb3e2794073a3f4137fe445cf37
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
