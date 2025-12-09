'use client';

/**
 * CityCard Component - High-End FinTech Design
 * Horizontal card with image and city information
 */

import Link from 'next/link';

interface CityCardProps {
  cityName: string;
  citySlug: string;
  avgHomePrice: number;
  avgRent: number;
  currencySymbol: string;
  countryColor: string;
  currentLang?: string;
}

export default function CityCard({
  cityName,
  citySlug,
  avgHomePrice,
  avgRent,
  currencySymbol,
  countryColor,
  currentLang,
}: CityCardProps) {
  const cityUrl = currentLang
    ? `/${citySlug}/buy-vs-rent?lang=${currentLang}`
    : `/${citySlug}/buy-vs-rent`;

  // Format numbers for display
  const formatPrice = (value: number) => {
    if (value >= 1000000) {
      return `${currencySymbol}${(value / 1000000).toFixed(1)}M`;
    }
    if (value >= 1000) {
      return `${currencySymbol}${(value / 1000).toFixed(0)}K`;
    }
    return `${currencySymbol}${value.toFixed(0)}`;
  };

  return (
    <Link href={cityUrl}>
      <div className="group flex flex-col md:flex-row rounded-xl border border-gray-200 bg-white shadow-sm overflow-hidden hover:-translate-y-1 hover:shadow-lg transition-all duration-300">
        {/* Left Side: Image (35%) */}
        <div className="relative w-full md:w-[35%] h-48 md:h-auto bg-gray-100">
          <img
            src={`https://placehold.co/600x400/e2e8f0/1e293b?text=${encodeURIComponent(cityName)}`}
            alt={cityName}
            className="w-full h-full object-cover"
          />
          {/* Country Color Accent Border */}
          <div
            className="absolute top-0 left-0 w-full h-1"
            style={{ backgroundColor: countryColor }}
          />
        </div>

        {/* Right Side: Content (65%) */}
        <div className="flex-1 p-6 flex flex-col justify-between">
          {/* Header */}
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">{cityName}</h3>

            {/* Body: Buy vs Rent Summary */}
            <div className="flex gap-6 mb-4">
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Buy</p>
                <p className="text-lg font-semibold text-gray-900">
                  {formatPrice(avgHomePrice)}
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Rent</p>
                <p className="text-lg font-semibold text-gray-900">
                  {formatPrice(avgRent)}/mo
                </p>
              </div>
            </div>
          </div>

          {/* Footer: Explore Button */}
          <div>
            <div className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg bg-gradient-to-r from-blue-500 to-blue-600 text-white font-medium text-sm group-hover:from-blue-600 group-hover:to-blue-700 transition-all duration-200">
              <span>Explore Analysis</span>
              <svg
                className="w-4 h-4 group-hover:translate-x-1 transition-transform"
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
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
