import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Calculator from '@/components/calculator/Calculator';
import AdContainer from '@/components/ads/AdContainer';
import citiesData from '@/data/cities.json';
import { CountryCode } from '@/lib/types';
import { validateCitiesData } from '@/lib/validate-cities';

// Validate cities data at module load time (build time for SSG)
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

// Generate static params for all cities (SSG)
export async function generateStaticParams() {
  return citiesData.map((city) => ({
    city: city.slug,
  }));
}

// Generate metadata for SEO
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { city } = await params;
  const cityData = citiesData.find(
    (c) => c.slug === city
  ) as CityData | undefined;

  if (!cityData) {
    return {
      title: 'City Not Found',
    };
  }

  const { name, state, currency_symbol, defaults } = cityData;
  const location = state ? `${name}, ${state}` : name;

  return {
    title: `Buy vs. Rent in ${location} (2024 Calculator & Market Data)`,
    description: `In ${name}, the average home costs ${currency_symbol}${defaults.avg_home_price.toLocaleString()}. With rents averaging ${currency_symbol}${defaults.avg_rent.toLocaleString()}, find out if buying or renting makes financial sense for you.`,
  };
}

export default async function CityBuyVsRentPage({ params, searchParams }: PageProps) {
  // Find city data
  const { city } = await params;
  const { lang } = await searchParams;

  // Determine language from URL param (default to English)
  const validLanguages = ['en', 'fr', 'de', 'es', 'it', 'nl', 'sv', 'pt'] as const;
  const language = (validLanguages.includes(lang as any) ? lang : 'en') as 'en' | 'fr' | 'de' | 'es' | 'it' | 'nl' | 'sv' | 'pt';

  const cityData = citiesData.find(
    (c) => c.slug === city
  ) as CityData | undefined;

  if (!cityData) {
    notFound();
  }

  const { name, state, country_code, defaults, data_updated, theme_color } = cityData;
  const location = state ? `${name}, ${state}` : name;

  // Get flag emoji based on country code
  const flagEmojis: Record<CountryCode, string> = {
    US: '🇺🇸',
    FR: '🇫🇷',
    DE: '🇩🇪',
    GB: '🇬🇧',
    CA: '🇨🇦',
    AU: '🇦🇺',
    ES: '🇪🇸',
    IT: '🇮🇹',
    NL: '🇳🇱',
    SE: '🇸🇪',
    CH: '🇨🇭',
    BE: '🇧🇪',
    IE: '🇮🇪',
    PT: '🇵🇹',
  };
  const flag = flagEmojis[country_code];

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* City Hero Section with Flag Watermark */}
      <section className="bg-white border-b border-gray-200 shadow-sm py-8 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4">
          {/* Flag Watermark - HUGE, Very Subtle, Positioned Top-Right */}
          <span
            className="text-[150px] opacity-5 absolute -top-4 -right-4 rotate-12 pointer-events-none select-none"
            aria-hidden="true"
          >
            {flag}
          </span>

          {/* City Title - On Top of Watermark */}
          <div className="relative text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">
              {location}
            </h1>
            <p className="text-lg text-gray-600">
              Buy vs. Rent Calculator
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Mobile Ad (Only visible on mobile) */}
        <div className="lg:hidden mb-6">
          <AdContainer slot="mobile" />
        </div>

        {/* Calculator with built-in dashboard layout */}
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

      {/* Footer Ad (Fixed bottom on mobile) */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50">
        <AdContainer slot="footer" />
      </div>
    </main>
  );
}
