'use client';

import { Suspense } from 'react';
import citiesData from '@/data/cities.json';
import CityCard from '@/components/CityCard';
import { useSearchParams } from 'next/navigation';
import { useRef } from 'react';

type Language = 'en' | 'fr' | 'de' | 'es' | 'it' | 'nl' | 'sv' | 'pt';

// Translations for UI text
const translations: Record<Language, {
  title: string;
  subtitle: string;
  description: string;
  viewAnalysis: string;
  footer: string;
}> = {
  en: {
    title: 'Buy vs Rent Calculator',
    subtitle: 'Make smarter financial decisions with real market data',
    description: 'Compare the true cost of buying versus renting in cities worldwide',
    viewAnalysis: 'View Analysis',
    footer: 'Built with Next.js 15 • TypeScript • Tailwind CSS • Recharts',
  },
  fr: {
    title: 'Calculateur Acheter vs Louer',
    subtitle: 'Prenez des décisions financières plus intelligentes avec des données de marché réelles',
    description: 'Comparez le coût réel de l\'achat par rapport à la location dans les villes du monde entier',
    viewAnalysis: 'Voir l\'analyse',
    footer: 'Construit avec Next.js 15 • TypeScript • Tailwind CSS • Recharts',
  },
  de: {
    title: 'Kauf vs. Miete Rechner',
    subtitle: 'Treffen Sie klügere finanzielle Entscheidungen mit echten Marktdaten',
    description: 'Vergleichen Sie die wahren Kosten des Kaufs gegenüber der Miete in Städten weltweit',
    viewAnalysis: 'Analyse anzeigen',
    footer: 'Erstellt mit Next.js 15 • TypeScript • Tailwind CSS • Recharts',
  },
  es: {
    title: 'Calculadora Comprar vs Alquilar',
    subtitle: 'Tome decisiones financieras más inteligentes con datos de mercado reales',
    description: 'Compare el costo real de comprar versus alquilar en ciudades de todo el mundo',
    viewAnalysis: 'Ver análisis',
    footer: 'Construido con Next.js 15 • TypeScript • Tailwind CSS • Recharts',
  },
  it: {
    title: 'Calcolatore Comprare vs Affittare',
    subtitle: 'Prendi decisioni finanziarie più intelligenti con dati di mercato reali',
    description: 'Confronta il costo reale dell\'acquisto rispetto all\'affitto nelle città di tutto il mondo',
    viewAnalysis: 'Visualizza analisi',
    footer: 'Realizzato con Next.js 15 • TypeScript • Tailwind CSS • Recharts',
  },
  nl: {
    title: 'Kopen vs Huren Calculator',
    subtitle: 'Maak slimmere financiële beslissingen met echte marktgegevens',
    description: 'Vergelijk de werkelijke kosten van kopen versus huren in steden wereldwijd',
    viewAnalysis: 'Bekijk analyse',
    footer: 'Gebouwd met Next.js 15 • TypeScript • Tailwind CSS • Recharts',
  },
  sv: {
    title: 'Köp vs Hyr Kalkylator',
    subtitle: 'Gör smartare ekonomiska beslut med verkliga marknadsdata',
    description: 'Jämför den verkliga kostnaden för att köpa kontra hyra i städer över hela världen',
    viewAnalysis: 'Visa analys',
    footer: 'Byggd med Next.js 15 • TypeScript • Tailwind CSS • Recharts',
  },
  pt: {
    title: 'Calculadora Comprar vs Alugar',
    subtitle: 'Tome decisões financeiras mais inteligentes com dados de mercado reais',
    description: 'Compare o custo real de comprar versus alugar em cidades ao redor do mundo',
    viewAnalysis: 'Ver análise',
    footer: 'Construído com Next.js 15 • TypeScript • Tailwind CSS • Recharts',
  },
};

function HomePageContent() {
  const searchParams = useSearchParams();
  const lang = (searchParams.get('lang') || 'en') as Language;
  const t = translations[lang] || translations.en;

  // Group cities by country
  const citiesByCountry = citiesData.reduce((acc, city) => {
    const country = city.country_code;
    if (!acc[country]) {
      acc[country] = [];
    }
    acc[country].push(city);
    return acc;
  }, {} as Record<string, typeof citiesData>);

  // Country names with flags
  const countryNames: Record<string, string> = {
    US: '🇺🇸 United States',
    FR: '🇫🇷 France',
    DE: '🇩🇪 Germany',
    GB: '🇬🇧 United Kingdom',
    CA: '🇨🇦 Canada',
    AU: '🇦🇺 Australia',
    ES: '🇪🇸 Spain',
    IT: '🇮🇹 Italy',
    NL: '🇳🇱 Netherlands',
    SE: '🇸🇪 Sweden',
    CH: '🇨🇭 Switzerland',
    BE: '🇧🇪 Belgium',
    IE: '🇮🇪 Ireland',
    PT: '🇵🇹 Portugal',
  };

  // Country theme colors
  const countryColors: Record<string, string> = {
    US: '#2563EB',  // Blue
    FR: '#002654',  // Navy
    DE: '#DD0000',  // Red
    GB: '#C8102E',  // Crimson
    CA: '#FF0000',  // Red
    AU: '#00843D',  // Green
    ES: '#C60B1E',  // Spanish Red
    IT: '#009246',  // Italian Green
    NL: '#FF9B00',  // Dutch Orange
    SE: '#006AA7',  // Swedish Blue
    CH: '#FF0000',  // Swiss Red
    BE: '#FDDA24',  // Belgian Yellow
    IE: '#169B62',  // Irish Green
    PT: '#006600',  // Portuguese Green
  };

  // Refs for smooth scrolling to country sections
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});

  const scrollToCountry = (countryCode: string) => {
    const section = sectionRefs.current[countryCode];
    if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <main className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-16">
        {/* Hero Section with Beams Vibe */}
        <div className="relative text-center space-y-6 mb-16">
          {/* Radial Gradient Background */}
          <div className="absolute inset-0 -top-20 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-100 via-transparent to-transparent pointer-events-none" />

          {/* Content */}
          <div className="relative z-10">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-gray-900 mb-4">
              {t.title}
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto font-light mb-3">
              {t.subtitle}
            </p>
            <p className="text-base md:text-lg text-gray-500 max-w-2xl mx-auto">
              {t.description}
            </p>
          </div>
        </div>

        {/* Country Filter Pills - Horizontal Scroll */}
        <div className="mb-12 overflow-x-auto scrollbar-hide">
          <div className="flex gap-3 pb-4 min-w-max justify-center px-4">
            {Object.entries(citiesByCountry).map(([countryCode]) => (
              <button
                key={countryCode}
                onClick={() => scrollToCountry(countryCode)}
                className="px-5 py-2.5 rounded-full bg-white border-2 border-slate-200/60 hover:border-blue-400 hover:bg-blue-50 transition-all duration-200 text-sm font-semibold text-gray-700 hover:text-blue-600 shadow-sm hover:shadow-md whitespace-nowrap"
              >
                {countryNames[countryCode] || countryCode}
              </button>
            ))}
          </div>
        </div>

        {/* Cities by Country */}
        <div className="space-y-16">
          {Object.entries(citiesByCountry).map(([countryCode, cities]) => (
            <section
              key={countryCode}
              ref={(el) => {
                if (el) sectionRefs.current[countryCode] = el;
              }}
            >
              {/* Country Header with Glassmorphism */}
              <div className="rounded-xl bg-white/80 backdrop-blur-md border border-slate-200/60 p-4 mb-8 shadow-sm">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                  {countryNames[countryCode] || countryCode}
                </h2>
              </div>

              {/* City Cards Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {cities.map((city) => (
                  <CityCard
                    key={city.slug}
                    city={city}
                    countryColor={countryColors[countryCode] || '#3b82f6'}
                    language={lang}
                  />
                ))}
              </div>
            </section>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-20 text-center text-sm text-gray-500">
          <p>{t.footer}</p>
        </div>
      </div>
    </main>
  );
}

export default function HomePage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    }>
      <HomePageContent />
    </Suspense>
  );
}
