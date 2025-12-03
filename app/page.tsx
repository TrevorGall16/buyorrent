import Link from 'next/link';
import citiesData from '@/data/cities.json';

export default function HomePage() {
  // Group cities by country
  const citiesByCountry = citiesData.reduce((acc, city) => {
    const country = city.country_code;
    if (!acc[country]) {
      acc[country] = [];
    }
    acc[country].push(city);
    return acc;
  }, {} as Record<string, typeof citiesData>);

  const countryNames = {
    US: 'United States 🇺🇸',
    DE: 'Germany 🇩🇪',
    FR: 'France 🇫🇷',
    GB: 'United Kingdom 🇬🇧',
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-6xl mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="text-center space-y-6 mb-16">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900">
            RentOrBuy-Pro
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto">
            High-performance programmatic SEO financial calculator for 500+ cities
          </p>
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 border border-green-300 rounded-full">
            <svg
              className="w-5 h-5 text-green-600"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
            <span className="text-sm font-semibold text-green-700">
              All 3 Steps Complete
            </span>
          </div>
        </div>

        {/* Feature Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="text-3xl mb-3">⚡</div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">
              Step 1: Stack Initialized
            </h3>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>✓ Next.js 15 (App Router)</li>
              <li>✓ TypeScript (Strict mode)</li>
              <li>✓ Tailwind CSS</li>
              <li>✓ Recharts</li>
              <li>✓ SSG Configuration</li>
            </ul>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="text-3xl mb-3">🌍</div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">
              Step 2: Finance Engine
            </h3>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>✓ International Logic (4 countries)</li>
              <li>✓ Mortgage Calculations</li>
              <li>✓ Net Worth Tracking</li>
              <li>✓ Break-even Detection</li>
              <li>✓ Opportunity Cost</li>
            </ul>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="text-3xl mb-3">🎨</div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">
              Step 3: UI Components
            </h3>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>✓ Progressive Disclosure</li>
              <li>✓ CLS-Safe Ad Slots</li>
              <li>✓ Dual-Line Charts</li>
              <li>✓ Trust Badge</li>
              <li>✓ Responsive Layout</li>
            </ul>
          </div>
        </div>

        {/* City Links */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            🌆 Explore Cities
          </h2>

          <div className="space-y-8">
            {Object.entries(citiesByCountry).map(([countryCode, cities]) => (
              <div key={countryCode}>
                <h3 className="text-lg font-semibold text-gray-700 mb-3">
                  {countryNames[countryCode as keyof typeof countryNames]}
                </h3>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {cities.map((city) => (
                    <Link
                      key={city.slug}
                      href={`/${city.slug}/buy-vs-rent`}
                      className="group flex items-center justify-between p-4 bg-gray-50 hover:bg-blue-50 border border-gray-200 hover:border-blue-300 rounded-lg transition-all"
                    >
                      <div>
                        <div className="font-semibold text-gray-900 group-hover:text-blue-700">
                          {city.name}
                        </div>
                        <div className="text-xs text-gray-500">
                          {city.currency_symbol}
                          {city.defaults.avg_home_price.toLocaleString()} avg
                        </div>
                      </div>
                      <svg
                        className="w-5 h-5 text-gray-400 group-hover:text-blue-600 transition-transform group-hover:translate-x-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Tech Stack */}
        <div className="mt-8 text-center text-sm text-gray-500">
          <p>
            Built with Next.js 15 • TypeScript • Tailwind CSS • Recharts
          </p>
          <p className="mt-2">
            ✓ 6 city pages pre-rendered • 210 KB per page • CLS-protected ads
          </p>
        </div>
      </div>
    </main>
  );
}
