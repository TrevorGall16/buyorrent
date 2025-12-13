'use client';

import { Suspense } from 'react';
import citiesData from '@/data/cities.json';
import CityCard from '@/components/CityCard';
import AdUnit from '@/components/ads/AdUnit';
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

          {/* Content */}
          <div className="relative z-10">
            <h1 className="text-6xl md:text-7xl lg:text-8xl font-serif italic font-medium tracking-tight text-slate-900 dark:text-slate-50 mb-6">
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

 {/* Country Filter Pills - Wrapped */}
        <div className="mb-8">
          <div className="flex flex-wrap justify-center gap-3 px-4">
            {Object.entries(citiesByCountry).map(([countryCode]) => {
              // Get the specific color for this country
              const color = countryColors[countryCode] || '#cbd5e1';
              
              return (
                <button
                  key={countryCode}
                  onClick={() => scrollToCountry(countryCode)}
                  // Dynamic style to apply the country's specific color to the border
                  style={{ borderColor: color }}
                  className={`
                    group relative px-5 py-3 rounded-full 
                    bg-white dark:bg-zinc-900 
                    border-2 
                    transition-all duration-300 ease-out
                    flex items-center gap-3
                    hover:shadow-lg hover:scale-105 active:scale-95
                  `}
                >
                  {/* Flag Image */}
                  <img 
                    src={`/flags/${countryCode.toLowerCase()}.svg`} 
                    alt={`${countryCode} flag`}
                    className="w-6 h-6 rounded-full object-cover shadow-sm group-hover:rotate-12 transition-transform duration-300"
                    onError={(e) => { e.currentTarget.style.display = 'none' }} 
                  />

                  {/* Country Name */}
                  <span 
                    className="text-sm font-bold text-slate-700 dark:text-slate-200 group-hover:text-slate-900 dark:group-hover:text-white"
                  >
                    {countryNames[countryCode] || countryCode}
                  </span>
                  
                  {/* Tiny colored dot indicator on hover */}
                  <span 
                    className="w-2 h-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                    style={{ backgroundColor: color }}
                  />
                </button>
              );
            })}
          </div>
        </div>

        {/* Banner Ad - Below Country Selector */}
        <div className="mb-12 flex justify-center">
          <AdUnit format="banner" />
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
              <div className="rounded-xl bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm border border-white/50 dark:border-slate-800 p-4 mb-8 shadow-lg shadow-slate-200/50 dark:shadow-slate-900/50">
                <h2 className="text-2xl md:text-3xl font-bold font-serif italic text-slate-900 dark:text-slate-50">
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
