import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
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

export default async function CityBuyVsRentPage({ params }: PageProps) {
  // Find city data
  const { city } = await params;
  const cityData = citiesData.find(
    (c) => c.slug === city
  ) as CityData | undefined;

  if (!cityData) {
    notFound();
  }

  const { name, state, country_code, defaults, data_updated } = cityData;
  const location = state ? `${name}, ${state}` : name;

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header with Home Button */}
      <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Left: Home Button */}
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors group"
            >
              <svg
                className="w-5 h-5 transition-transform group-hover:-translate-x-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
              <span className="font-medium">Home</span>
            </Link>

            {/* Center: Title */}
            <div className="text-center flex-1">
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
                {location}
              </h1>
              <p className="text-sm text-gray-500 mt-1">Buy vs. Rent Calculator</p>
            </div>

            {/* Right: Spacer for balance */}
            <div className="w-20"></div>
          </div>
        </div>
      </header>

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
        />
      </div>

      {/* Footer Ad (Fixed bottom on mobile) */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50">
        <AdContainer slot="footer" />
      </div>
    </main>
  );
}
