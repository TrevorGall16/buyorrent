import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Calculator from '@/components/calculator/Calculator';
import AdContainer from '@/components/ads/AdContainer';
import citiesData from '@/data/cities.json';
import { CountryCode } from '@/lib/types';

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
      {/* Header */}
      <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
            Buy vs. Rent Calculator
          </h1>
          <p className="text-gray-600 mt-2">
            Make an informed decision with real market data
          </p>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Desktop Layout: Split Screen */}
        <div className="lg:grid lg:grid-cols-12 lg:gap-8">
          {/* Left Column: Calculator (8 columns on desktop) */}
          <div className="lg:col-span-8 space-y-6">
            {/* Page Title */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                {location}
              </h2>
              <p className="text-gray-600">
                Compare the financial impact of buying vs. renting in {name}.
                Adjust the assumptions below to match your situation.
              </p>
            </div>

            {/* Mobile Ad (Only visible on mobile) */}
            <div className="lg:hidden">
              <AdContainer slot="mobile" />
            </div>

            {/* Calculator */}
            <Calculator
              cityName={name}
              countryCode={country_code}
              defaultHomePrice={defaults.avg_home_price}
              defaultMonthlyRent={defaults.avg_rent}
              dataUpdated={data_updated}
            />
          </div>

          {/* Right Column: Sticky Sidebar with Ad (4 columns on desktop) */}
          <aside className="hidden lg:block lg:col-span-4">
            <div className="sticky top-8 space-y-6">
              {/* CLS-Safe Ad Container */}
              <AdContainer slot="sidebar" />

              {/* Quick Stats Card */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wide mb-4">
                  {name} Market Data
                </h3>
                <div className="space-y-3">
                  <div>
                    <div className="text-xs text-gray-500">Avg. Home Price</div>
                    <div className="text-xl font-bold text-gray-900">
                      {cityData.currency_symbol}
                      {defaults.avg_home_price.toLocaleString()}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500">Avg. Monthly Rent</div>
                    <div className="text-xl font-bold text-gray-900">
                      {cityData.currency_symbol}
                      {defaults.avg_rent.toLocaleString()}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500">Property Tax Rate</div>
                    <div className="text-xl font-bold text-gray-900">
                      {(defaults.property_tax_rate * 100).toFixed(2)}%
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>

      {/* Footer Ad (Fixed bottom on mobile) */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50">
        <AdContainer slot="footer" />
      </div>
    </main>
  );
}
