import citiesData from '@/data/cities.json';
import CityCard from '@/components/CityCard';

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

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="text-center space-y-6 mb-16">
          <h1 className="text-5xl md:text-7xl font-bold text-gray-900">
            Buy vs Rent Calculator
          </h1>
          <p className="text-2xl md:text-3xl text-gray-600 max-w-3xl mx-auto font-light">
            Make smarter financial decisions with real market data
          </p>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto">
            Compare the true cost of buying versus renting in cities worldwide
          </p>
        </div>

        {/* Cities by Country */}
        <div className="space-y-12">
          {Object.entries(citiesByCountry).map(([countryCode, cities]) => (
            <section key={countryCode}>
              {/* Sticky Country Header */}
              <div className="sticky top-0 bg-white/95 backdrop-blur-sm z-10 py-3 border-b border-gray-100 mb-6">
                <h2 className="text-2xl font-bold text-gray-900">
                  {countryNames[countryCode] || countryCode}
                </h2>
              </div>

              {/* City Cards Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-4">
                {cities.map((city) => (
                  <CityCard
                    key={city.slug}
                    city={city}
                    countryColor={countryColors[countryCode] || '#3b82f6'}
                  />
                ))}
              </div>
            </section>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-16 text-center text-sm text-gray-500">
          <p>Built with Next.js 15 • TypeScript • Tailwind CSS • Recharts</p>
        </div>
      </div>
    </main>
  );
}
