/**
 * CityCard Component - Modern Real Estate Look
 * Horizontal Card Layout with High-End FinTech Design
 */

import Link from 'next/link';

type Language = 'en' | 'fr' | 'de' | 'es' | 'it' | 'nl' | 'sv' | 'pt';

interface CityCardProps {
  city: {
    slug: string;
    name: string;
    currency_symbol: string;
    defaults: {
      avg_home_price: number;
      avg_rent: number;
    };
  };
  countryColor: string;
  language?: Language;
}

const buttonText: Record<Language, string> = {
  en: 'View Analysis →',
  fr: 'Voir l\'analyse →',
  de: 'Analyse anzeigen →',
  es: 'Ver análisis →',
  it: 'Visualizza analisi →',
  nl: 'Bekijk analyse →',
  sv: 'Visa analys →',
  pt: 'Ver análise →',
};

export default function CityCard({ city, countryColor, language = 'en' }: CityCardProps) {
  const btnText = buttonText[language] || buttonText.en;

  return (
    <Link href={`/${city.slug}/buy-vs-rent${language !== 'en' ? `?lang=${language}` : ''}`}>
      <div className="group flex flex-col sm:flex-row overflow-hidden rounded-2xl border border-gray-100 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 cursor-pointer">
        {/* Left: Image (35%) */}
        <div className="relative w-full sm:w-[35%] h-48 sm:h-auto overflow-hidden">
          <img
            src={`https://placehold.co/600x400/e2e8f0/1e293b?text=${encodeURIComponent(city.name)}`}
            alt={city.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          {/* Country Color Accent - Top Border */}
          <div
            className="absolute top-0 left-0 w-full h-1"
            style={{ backgroundColor: countryColor }}
          />
        </div>

        {/* Right: Content (65%) */}
        <div className="flex flex-col justify-center p-6 sm:p-8 flex-1">
          {/* City Name */}
          <h3 className="text-2xl font-bold mb-6">
            {city.name}
          </h3>

          {/* Action Button - Pill Shape with Blue Gradient */}
          <button className="w-fit px-6 py-3 rounded-full bg-gradient-to-r from-blue-600 to-blue-500 dark:from-blue-500 dark:to-blue-400 text-white font-semibold shadow-md hover:shadow-lg hover:from-blue-700 hover:to-blue-600 dark:hover:from-blue-600 dark:hover:to-blue-500 transition-all duration-200 active:scale-95">
            {btnText}
          </button>
        </div>
      </div>
    </Link>
  );
}
