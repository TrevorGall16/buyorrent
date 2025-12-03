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
        <div className="text-center space-y-8 mb-20">
          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 leading-tight">
            Should You Rent or Buy?
          </h1>
          <p className="text-2xl md:text-3xl text-gray-600 max-w-3xl mx-auto font-light">
            The Calculator That Tells the Truth
          </p>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto">
            Get data-driven insights for your city. We analyze 30 years of financial outcomes,
            including hidden costs, opportunity costs, and international tax differences.
          </p>
        </div>

        {/* City Selection */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-2 text-center">
            Choose Your City
          </h2>
          <p className="text-gray-600 text-center mb-8">
            Select a city to see personalized rent vs. buy analysis
          </p>

          <div className="space-y-8">
            {Object.entries(citiesByCountry).map(([countryCode, cities]) => (
              <div key={countryCode}>
                <h3 className="text-lg font-semibold text-gray-700 mb-4">
                  {countryNames[countryCode as keyof typeof countryNames]}
                </h3>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {cities.map((city) => (
                    <Link
                      key={city.slug}
                      href={`/${city.slug}/buy-vs-rent`}
                      className="group flex items-center justify-between p-5 bg-gray-50 hover:bg-blue-50 border-2 border-gray-200 hover:border-blue-400 rounded-xl transition-all shadow-sm hover:shadow-md"
                      style={
                        { '--theme-color': city.theme_color } as React.CSSProperties
                      }
                    >
                      <div>
                        <div className="font-bold text-lg text-gray-900 group-hover:text-blue-700 mb-1">
                          {city.name}
                        </div>
                        <div className="text-sm text-gray-600">
                          Avg. {city.currency_symbol}
                          {city.defaults.avg_home_price.toLocaleString()}
                        </div>
                      </div>
                      <svg
                        className="w-6 h-6 text-gray-400 group-hover:text-blue-600 transition-all group-hover:translate-x-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2.5}
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

        {/* Footer */}
        <footer className="text-center space-y-6 py-8 border-t border-gray-200">
          <div className="flex justify-center gap-8 text-sm text-gray-600">
            <a href="#" className="hover:text-gray-900 transition-colors">
              About
            </a>
            <a href="#" className="hover:text-gray-900 transition-colors">
              Methodology
            </a>
            <a href="#" className="hover:text-gray-900 transition-colors">
              Contact
            </a>
            <a href="#" className="hover:text-gray-900 transition-colors">
              Privacy
            </a>
          </div>
          <p className="text-sm text-gray-500">
            Built with Next.js 15 • TypeScript • Tailwind CSS • Recharts
          </p>
          <p className="text-xs text-gray-400">
            © 2024 RentOrBuy-Pro. Financial data for educational purposes only.
          </p>
        </footer>
      </div>
    </main>
  );
}
