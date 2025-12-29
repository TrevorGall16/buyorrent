import { Metadata } from 'next';
import citiesData from '@/data/cities.json';
import CityCard from '@/components/CityCard';
import AdUnit from '@/components/ads/AdUnit';
import Link from 'next/link';
import TextExpander from '@/components/TextExpander'; // Import the new component
import AdsterraNative from '../components/ads/AdsterraNative';
import React from 'react';
import AdsterraBanner from '@/components/ads/AdsterraBanner';


type Language = 'en' | 'fr' | 'de' | 'es' | 'it' | 'nl' | 'sv' | 'pt';

// Metadata for SEO
export const metadata: Metadata = {
  title: 'Rent vs Buy Calculator - Compare 500+ Cities Worldwide | RentOrBuyWorld',
  description: 'Make smarter real estate decisions with our comprehensive rent vs buy calculator. Analyze 500+ global cities with real market data.',
  alternates: {
    canonical: 'https://rentorbuyworld.com',
  },
};

// Translations
const translations: Record<Language, any> = {
  en: {
    title: 'Rent vs Buy Calculator',
    subtitle: 'Make smarter financial decisions with real market data',
    description: 'Compare the true cost of buying versus renting in 500+ cities worldwide',
    howToUseTitle: 'How to Use & Methodology',
    selectCityTitle: 'Select Your City',
    faqTitle: 'Frequently Asked Questions',
  },
  // Simple fallbacks to prevent crashes
  fr: { title: 'Calculatrice Acheter ou Louer', subtitle: 'Prenez de meilleures décisions financières', description: 'Comparez le coût réel...', howToUseTitle: 'Méthodologie et Guide', selectCityTitle: 'Sélectionnez votre ville', faqTitle: 'FAQ' },
  de: { title: 'Mieten oder Kaufen Rechner', subtitle: 'Treffen Sie klügere finanzielle Entscheidungen', description: 'Vergleichen Sie die Kosten...', howToUseTitle: 'Methodik und Anleitung', selectCityTitle: 'Stadt wählen', faqTitle: 'FAQ' },
  es: { title: 'Calculadora Comprar vs Alquilar', subtitle: 'Toma mejores decisiones financieras', description: 'Compara el costo real...', howToUseTitle: 'Metodología y Guía', selectCityTitle: 'Selecciona tu ciudad', faqTitle: 'Preguntas Frecuentes' },
  it: { title: 'Calcolatrice Affitto vs Acquisto', subtitle: 'Prendi decisioni finanziarie migliori', description: 'Confronta i costi...', howToUseTitle: 'Metodologia e Guida', selectCityTitle: 'Seleziona città', faqTitle: 'FAQ' },
  nl: { title: 'Huren of Kopen Calculator', subtitle: 'Maak slimmere financiële beslissingen', description: 'Vergelijk de kosten...', howToUseTitle: 'Methodologie en Gids', selectCityTitle: 'Selecteer stad', faqTitle: 'FAQ' },
  sv: { title: 'Hyra eller Köpa Kalkylator', subtitle: 'Fatta smartare beslut', description: 'Jämför kostnader...', howToUseTitle: 'Metodik och Guide', selectCityTitle: 'Välj stad', faqTitle: 'FAQ' },
  pt: { title: 'Calculadora Comprar vs Arrendar', subtitle: 'Tome melhores decisões', description: 'Compare os custos...', howToUseTitle: 'Metodologia e Guia', selectCityTitle: 'Selecione a cidade', faqTitle: 'FAQ' },
};

// Flag Emojis Mapping (Unbreakable)
const flagEmojis: Record<string, string> = {
  US: '🇺🇸', FR: '🇫🇷', DE: '🇩🇪', GB: '🇬🇧', CA: '🇨🇦', 
  AU: '🇦🇺', ES: '🇪🇸', IT: '🇮🇹', NL: '🇳🇱', SE: '🇸🇪', 
  CH: '🇨🇭', BE: '🇧🇪', IE: '🇮🇪', PT: '🇵🇹',
};

const countryNames: Record<string, string> = {
  US: 'United States', FR: 'France', DE: 'Germany', GB: 'United Kingdom', 
  CA: 'Canada', AU: 'Australia', ES: 'Spain', IT: 'Italy', 
  NL: 'Netherlands', SE: 'Sweden', CH: 'Switzerland', BE: 'Belgium', 
  IE: 'Ireland', PT: 'Portugal',
};

const countryColors: Record<string, string> = {
  US: '#2563EB', FR: '#002654', DE: '#DD0000', GB: '#C8102E', CA: '#FF0000', 
  AU: '#00843D', ES: '#C60B1E', IT: '#009246', NL: '#FF9B00', SE: '#006AA7', 
  CH: '#FF0000', BE: '#FDDA24', IE: '#169B62', PT: '#006600',
};

export default async function HomePage({
  searchParams,
}: {
  searchParams: Promise<{ lang?: string }>;
}) {
  const { lang: langParam } = await searchParams;
  const lang = (langParam || 'en') as Language;
  const t = translations[lang] || translations.en;

  // Group cities
  const citiesByCountry = citiesData.reduce((acc, city) => {
    const country = city.country_code;
    if (!acc[country]) acc[country] = [];
    acc[country].push(city);
    return acc;
  }, {} as Record<string, typeof citiesData>);

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 to-white dark:from-slate-950 dark:to-slate-900">
      <div className="max-w-7xl mx-auto px-4 py-12">
        
        {/* 1. Hero Section */}
        <div className="relative text-center space-y-4 mb-10">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-slate-900 dark:text-slate-50">
            {t.title}
          </h1>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto font-light">
            {t.subtitle}
          </p>
        </div>
{/* ✅ FIRST AD PLACEMENT */}
<div className="my-6">
  <AdsterraBanner />
</div>
        {/* 2. Quick Links (MOVED UP + FIXED FLAGS) */}
        <div className="mb-12">
          <div className="flex flex-wrap justify-center gap-3 px-2">
            {Object.entries(citiesByCountry).map(([countryCode]) => {
              const color = countryColors[countryCode] || '#cbd5e1';
              return (
                <Link
                  key={countryCode}
                  href={`#${countryCode.toLowerCase()}`}
                  className="group px-4 py-2 rounded-full bg-white dark:bg-zinc-900 border transition-all duration-300 hover:shadow-md hover:-translate-y-0.5 flex items-center gap-2 no-underline"
                  style={{ borderColor: color }}
                >
                  <span className="text-xl leading-none">{flagEmojis[countryCode]}</span>
                  <span className="text-sm font-bold text-slate-700 dark:text-slate-200">
                    {countryNames[countryCode] || countryCode}
                  </span>
                </Link>
              );
            })}
          </div>
        </div>

        {/* 3. Collapsible Educational Content (Clean Design, AdSense Safe) */}
        <TextExpander title={t.howToUseTitle}>
          <h3 className="text-xl font-bold text-slate-900 dark:text-slate-50 mb-3">How to Use the Calculator</h3>
          <p className="mb-4">
            Our comprehensive rent vs buy calculator helps you make one of life&apos;s biggest financial decisions with confidence. 
            Simply select your city from our database of 500+ locations worldwide to access real-time market data including 
            median home prices, average rent, property tax rates, and local closing costs.
          </p>
          <h3 className="text-xl font-bold text-slate-900 dark:text-slate-50 mb-3">Understanding the Math</h3>
          <p className="mb-4">
            Unlike simple rent-to-price ratio calculators, our tool performs a complete net worth analysis over 30 years.
            It accounts for:
          </p>
          <ul className="list-disc pl-5 space-y-2 mb-4">
            <li><strong>Home Appreciation:</strong> How property values increase over time in your market.</li>
            <li><strong>Opportunity Cost:</strong> Returns you could earn by investing your down payment instead of buying.</li>
            <li><strong>Transaction Costs:</strong> Closing costs, notary fees, and realtor fees.</li>
            <li><strong>Maintenance:</strong> Ongoing costs of homeownership (typically 1% of home value annually).</li>
          </ul>
          <p>
            In expensive markets like Paris or New York, renting can actually be financially superior if you invest the difference between rent and ownership costs.
          </p>
        </TextExpander>

        {/* 4. Banner Ad (After content) */}
        <div className="my-10 flex justify-center">
          <div className="w-full max-w-[728px] min-h-[90px]">
            <AdUnit format="banner" />
          </div>
        </div>

{/* 5. City Grid */}
<div className="space-y-16">
  {Object.entries(citiesByCountry).map(([countryCode, cities], index) => (
    <React.Fragment key={countryCode}>
      <section id={countryCode.toLowerCase()}>
        {/* Country Section Header */}
        <div
          className="flex items-center gap-4 rounded-xl p-4 mb-6 bg-white dark:bg-zinc-900/50 backdrop-blur-md border shadow-sm"
          style={{ borderLeftWidth: '6px', borderLeftColor: countryColors[countryCode] || '#cbd5e1' }}
        >
          <span className="text-4xl">{flagEmojis[countryCode]}</span>
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-slate-50">
            {countryNames[countryCode] || countryCode}
          </h2>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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

      {/* ✅ ADSTERRA PLACEMENT: Injects an ad after the 3rd country */}
      {index === 2 && (
 <div className="py-12 border-y border-slate-100 dark:border-slate-800">
     <AdsterraBanner /> 
  </div>
)}
    </React.Fragment>
  ))}
</div>
{/* ✅ THIRD AD PLACEMENT */}
<div className="mt-20">
   <AdsterraNative id="2597a491661d74469343b74e567c377a" />
</div>
        {/* 6. FAQ (Bottom for SEO) */}
        <section className="mt-20 max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-8">{t.faqTitle}</h2>
          <div className="space-y-4">
            <details className="bg-white dark:bg-slate-800 rounded-lg p-4 shadow-sm cursor-pointer">
              <summary className="font-semibold list-none flex justify-between">
                How accurate is the data? <span>▼</span>
              </summary>
              <p className="mt-2 text-gray-600 dark:text-gray-400">
                We update our database monthly using government statistics and real estate market reports.
              </p>
            </details>
            <details className="bg-white dark:bg-slate-800 rounded-lg p-4 shadow-sm cursor-pointer">
              <summary className="font-semibold list-none flex justify-between">
                What is the "Break-Even" point? <span>▼</span>
              </summary>
              <p className="mt-2 text-gray-600 dark:text-gray-400">
                The year when your net worth as a homeowner exceeds your net worth as a renter (assuming you invested the savings).
              </p>
            </details>
          </div>
        </section>

      </div>
    </main>
  );
}