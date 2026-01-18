import { Metadata } from 'next';
import { notFound } from 'next/navigation';
// import Link from 'next/link'; // Removed unused import to keep code clean
import Calculator from '@/components/calculator/Calculator';
import AdSidebar from '@/components/ads/AdSidebar';
import AdUnit from '@/components/ads/AdUnit';
import StructuredData from '@/components/StructuredData';
import citiesData from '@/data/cities.json';
import { CountryCode } from '@/lib/types';
import { validateCitiesData } from '@/lib/validate-cities';

// Validate cities data at module load time
validateCitiesData(citiesData);

interface CityData {
  slug: string;
  name: string;
  state: string | null;
  country_code: CountryCode;
  currency_symbol: string;
  data_updated: string;
  theme_color: string;
  defaults: {
    avg_home_price: number;
    avg_rent: number;
    closing_cost_rate: number;
    property_tax_rate: number;
  };
}

interface PageProps {
  params: Promise<{
    city: string;
  }>;
  searchParams: Promise<{
    lang?: string;
  }>;
}

// ---------------------------------------------------------
// 1. DYNAMIC NARRATIVE ENGINE (SEO CONTENT GENERATOR)
// ---------------------------------------------------------
const getNarrative = (city: CityData, lang: string) => {
  const { avg_home_price, avg_rent } = city.defaults;
  const ratio = avg_home_price / (avg_rent * 12);
  const ratioFormatted = ratio.toFixed(1);
  const currency = city.currency_symbol;

  // Logic: Low Ratio (< 15) = Buy, High Ratio (> 20) = Rent, Middle = Neutral
  const isBuyFavorable = ratio < 18;
  
  // Multilingual Templates
  const templates: Record<string, any> = {
    en: {
      intro: `In ${city.name}, the real estate market currently shows a Price-to-Rent ratio of **${ratioFormatted}**.`,
      stats: `With an average home price of ${currency}${avg_home_price.toLocaleString()} and monthly rents averaging ${currency}${avg_rent.toLocaleString()},`,
      conclusion: isBuyFavorable 
        ? "market conditions suggest that **buying** may build wealth faster than renting over a 5-year period."
        : "market conditions suggest that **renting** and investing the difference is likely the mathematically superior choice right now.",
      action: "Use the calculator below to input your exact scenario."
    },
    fr: {
      intro: `À ${city.name}, le marché immobilier affiche actuellement un ratio Prix/Loyer de **${ratioFormatted}**.`,
      stats: `Avec un prix moyen de l'immobilier à ${currency}${avg_home_price.toLocaleString()} et des loyers mensuels moyens à ${currency}${avg_rent.toLocaleString()},`,
      conclusion: isBuyFavorable 
        ? "les conditions suggèrent que **l'achat** pourrait générer du patrimoine plus rapidement que la location."
        : "les conditions suggèrent que **la location** est probablement le choix financièrement supérieur en ce moment.",
      action: "Utilisez le calculateur ci-dessous pour analyser votre situation."
    },
    de: {
      intro: `In ${city.name} weist der Immobilienmarkt derzeit ein Preis-Miet-Verhältnis von **${ratioFormatted}** auf.`,
      stats: `Bei einem durchschnittlichen Hauspreis von ${currency}${avg_home_price.toLocaleString()} und einer monatlichen Miete von ${currency}${avg_rent.toLocaleString()}`,
      conclusion: isBuyFavorable
        ? "deuten die Marktbedingungen darauf hin, dass **Kaufen** langfristig vorteilhafter sein könnte."
        : "deuten die Marktbedingungen darauf hin, dass **Mieten** derzeit die finanziell klügere Wahl ist.",
      action: "Nutzen Sie den Rechner unten für Ihre genaue Analyse."
    },
    // Fallback for other languages to English (can be expanded later)
    es: { intro: `En ${city.name}, el ratio Precio/Alquiler es de **${ratioFormatted}**.`, stats: `Con un precio medio de ${currency}${avg_home_price.toLocaleString()} y alquileres de ${currency}${avg_rent.toLocaleString()},`, conclusion: isBuyFavorable ? "**comprar** parece ser la mejor opción financiera." : "**alquilar** parece ser la opción más inteligente hoy.", action: "Usa la calculadora abajo." },
    it: { intro: `A ${city.name}, il rapporto Prezzo/Affitto è **${ratioFormatted}**.`, stats: `Con un prezzo medio di ${currency}${avg_home_price.toLocaleString()} e affitti di ${currency}${avg_rent.toLocaleString()},`, conclusion: isBuyFavorable ? "**comprare** potrebbe essere più vantaggioso." : "**affittare** è probabilmente la scelta migliore.", action: "Usa il calcolatore qui sotto." },
  };

  const t = templates[lang] || templates.en;
  return `${t.intro} ${t.stats} ${t.conclusion} ${t.action}`;
};


// Generate static params for all cities (SSG)
export async function generateStaticParams() {
  return citiesData.map((city) => ({
    city: city.slug,
  }));
}

// Generate metadata for SEO
export async function generateMetadata({ params, searchParams }: PageProps): Promise<Metadata> {
  const { city } = await params;
  const { lang } = await searchParams;

  const cityData = citiesData.find((c) => c.slug === city) as CityData | undefined;

  if (!cityData) return { title: 'City Not Found' };

  const { name, state, currency_symbol, defaults } = cityData;
  const location = state ? `${name}, ${state}` : name;
  const currentYear = new Date().getFullYear();
  const baseUrl = 'https://rentorbuyworld.com';
  const canonicalPath = `/${city}/buy-vs-rent`;

  return {
    title: `Buy vs. Rent in ${location} (${currentYear} Calculator & Market Data)`,
    description: `In ${name}, the average home costs ${currency_symbol}${defaults.avg_home_price.toLocaleString()}. With rents averaging ${currency_symbol}${defaults.avg_rent.toLocaleString()}/month, find out if buying or renting makes financial sense for you.`,
    alternates: {
      canonical: `${baseUrl}${canonicalPath}`,
      languages: {
        'x-default': `${baseUrl}${canonicalPath}`,
        'en': `${baseUrl}${canonicalPath}`,
        'de': `${baseUrl}${canonicalPath}?lang=de`,
        'nl': `${baseUrl}${canonicalPath}?lang=nl`,
        'sv': `${baseUrl}${canonicalPath}?lang=sv`,
        'it': `${baseUrl}${canonicalPath}?lang=it`,
        'fr': `${baseUrl}${canonicalPath}?lang=fr`,
        'es': `${baseUrl}${canonicalPath}?lang=es`,
        'pt': `${baseUrl}${canonicalPath}?lang=pt`,
      },
    },
    openGraph: {
      title: `Buy vs. Rent in ${location} - ${currentYear} Calculator`,
      description: `Compare buying vs renting in ${name}. Average home: ${currency_symbol}${defaults.avg_home_price.toLocaleString()} | Average rent: ${currency_symbol}${defaults.avg_rent.toLocaleString()}/month`,
      url: lang && lang !== 'en' ? `${baseUrl}${canonicalPath}?lang=${lang}` : `${baseUrl}${canonicalPath}`,
      siteName: 'RentOrBuyWorld',
      locale: lang || 'en',
      type: 'website',
      images: [{ url: '/og-image.png', width: 1200, height: 630, alt: `${name} Rent vs Buy Calculator` }],
    },
    twitter: {
      card: 'summary_large_image',
      title: `Buy vs. Rent in ${location}`,
      description: `${currency_symbol}${defaults.avg_home_price.toLocaleString()} to buy | ${currency_symbol}${defaults.avg_rent.toLocaleString()}/mo to rent`,
      images: ['/og-image.png'],
    },
  };
}

export default async function CityBuyVsRentPage({ params, searchParams }: PageProps) {
  const { city } = await params;
  const { lang } = await searchParams;

  const validLanguages = ['en', 'fr', 'de', 'es', 'it', 'nl', 'sv', 'pt'] as const;
  const language = (validLanguages.includes(lang as any) ? lang : 'en') as typeof validLanguages[number];

  const cityData = citiesData.find((c) => c.slug === city) as CityData | undefined;

  if (!cityData) notFound();

  const { name, state, country_code, defaults, data_updated, theme_color } = cityData;
  const location = state ? `${name}, ${state}` : name;

  const flagEmojis: Record<CountryCode, string> = {
    US: '🇺🇸', FR: '🇫🇷', DE: '🇩🇪', GB: '🇬🇧', CA: '🇨🇦', AU: '🇦🇺', ES: '🇪🇸',
    IT: '🇮🇹', NL: '🇳🇱', SE: '🇸🇪', CH: '🇨🇭', BE: '🇧🇪', IE: '🇮🇪', PT: '🇵🇹',
  };
  const flag = flagEmojis[country_code];

  // 2. FILTER RELATED CITIES (Same Country, Different City)
  const relatedCities = citiesData
    .filter(c => c.country_code === country_code && c.slug !== city)
    .sort((a, b) => b.defaults.avg_home_price - a.defaults.avg_home_price) // Sort by price (engaging)
    .slice(0, 8); // Top 8 related cities

  return (
    <>
      <StructuredData
        cityName={name}
        citySlug={city}
        countryCode={country_code}
        currencySymbol={cityData.currency_symbol}
        avgHomePrice={defaults.avg_home_price}
        avgRent={defaults.avg_rent}
        language={language}
      />

      <main className="min-h-screen">
        {/* City Hero Section */}
        <section className="w-full bg-white dark:bg-slate-800 border-b border-gray-200 dark:border-slate-700 shadow-sm py-8 relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4">
            <span className="text-[150px] opacity-5 dark:opacity-10 absolute -top-4 -right-4 rotate-12 pointer-events-none select-none" aria-hidden="true">
              {flag}
            </span>
            <div className="relative text-center">
              <h1 className="text-4xl md:text-5xl font-bold italic mb-2">
                {location}
              </h1>
              <p className="text-lg text-slate-600 dark:text-slate-400">
                Buy vs. Rent Calculator
              </p>
            </div>
          </div>
        </section>

        <div className="max-w-7xl mx-auto px-4 py-8">
          
          {/* ✅ DYNAMIC NARRATIVE BLOCK (SEO GOLD) */}
          <div className="mb-10 bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800 rounded-xl p-6 md:p-8">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
              📊 {name} Market Analysis
            </h2>
            <p className="text-lg text-slate-700 dark:text-slate-300 leading-relaxed" 
               dangerouslySetInnerHTML={{ __html: getNarrative(cityData, language) }} 
            />
          </div>

          {/* 2-Column Layout: Main Content + Sidebar */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-9">
              <Calculator
                cityName={name}
                countryCode={country_code}
                defaultHomePrice={defaults.avg_home_price}
                defaultMonthlyRent={defaults.avg_rent}
                dataUpdated={data_updated}
                themeColor={theme_color}
                language={language}
              />
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-3">
              <AdSidebar />
            </div>
          </div>

          {/* Mobile Ad */}
          <div className="lg:hidden mt-8">
            <AdUnit format="square" />
          </div>

          {/* ✅ RELATED CITIES SPIDERWEB (INTERNAL LINKING) */}
          <div className="mt-16 pt-8 border-t border-gray-200 dark:border-gray-800">
            <h3 className="text-xl font-bold mb-6 text-slate-900 dark:text-white">
              Compare Other Cities in {country_code}
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {relatedCities.map((relatedCity) => (
                <a 
                  key={relatedCity.slug}
                  href={`/${relatedCity.slug}/buy-vs-rent${language !== 'en' ? `?lang=${language}` : ''}`}
                  className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 dark:bg-slate-900 hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors border border-transparent hover:border-gray-200 dark:hover:border-slate-700"
                >
                  {/* Fixed: Added 'as CountryCode' to fix TypeScript error */}
                  <span className="text-2xl">{flagEmojis[relatedCity.country_code as CountryCode]}</span>
                  <div className="flex flex-col">
                    <span className="font-medium text-sm text-slate-900 dark:text-slate-100 truncate">
                      {relatedCity.name}
                    </span>
                    <span className="text-xs text-slate-500 dark:text-slate-400">
                      {relatedCity.defaults.avg_home_price > defaults.avg_home_price ? 'Higher Price' : 'Lower Price'}
                    </span>
                  </div>
                </a>
              ))}
            </div>
          </div>

        </div>
      </main>
    </>
  );
}