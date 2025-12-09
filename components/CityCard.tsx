/**
 * CityCard Component - Horizontal Card Layout
 * High-End FinTech Design using Standard Tailwind CSS
 */

import Link from 'next/link';

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
}

export default function CityCard({ city, countryColor }: CityCardProps) {
  const formatPrice = (value: number) => {
    if (value >= 1000000) {
      return `${city.currency_symbol}${(value / 1000000).toFixed(1)}M`;
    }
    if (value >= 1000) {
      return `${city.currency_symbol}${(value / 1000).toFixed(0)}K`;
    }
    return `${city.currency_symbol}${value.toFixed(0)}`;
  };

  return (
    <Link href={`/${city.slug}/buy-vs-rent`}>
      <div className="flex flex-col sm:flex-row overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm hover:shadow-md transition-all hover:-translate-y-1 cursor-pointer">
        {/* Left: Image */}
        <div className="w-full sm:w-1/3 h-48 sm:h-auto relative">
          <img
            src={`https://placehold.co/600x400/e2e8f0/1e293b?text=${encodeURIComponent(city.name)}`}
            alt={city.name}
            className="w-full h-full object-cover"
          />
          {/* Country Color Accent */}
          <div
            className="absolute top-0 left-0 w-full h-1"
            style={{ backgroundColor: countryColor }}
          />
        </div>

        {/* Right: Content */}
        <div className="p-6 flex flex-col justify-between flex-1">
          {/* Header */}
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">{city.name}</h3>

            {/* Data Summary */}
            <div className="space-y-2 mb-4">
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-500">Buy:</span>
                <span className="text-lg font-semibold text-gray-900">
                  {formatPrice(city.defaults.avg_home_price)}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-500">Rent:</span>
                <span className="text-lg font-semibold text-gray-900">
                  {formatPrice(city.defaults.avg_rent)}/mo
                </span>
              </div>
            </div>
          </div>

          {/* Action Button */}
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg mt-4 w-fit hover:bg-blue-700 transition-colors">
            View Analysis →
          </button>
        </div>
      </div>
    </Link>
  );
}
