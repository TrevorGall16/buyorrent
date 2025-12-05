import { Suspense } from 'react';
import citiesData from '@/data/cities.json';
import CitySelector from '@/components/CitySelector';

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

          <Suspense fallback={<div className="text-center">Loading cities...</div>}>
            <CitySelector citiesByCountry={citiesByCountry} />
          </Suspense>
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
          <p className="text-xs text-gray-400" suppressHydrationWarning>
            © {new Date().getFullYear()} RentOrBuy-Pro. Financial data for educational purposes only.
          </p>
        </footer>
      </div>
    </main>
  );
}
