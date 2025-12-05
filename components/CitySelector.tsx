'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { getCountryName } from '@/lib/country-config';

interface City {
  slug: string;
  name: string;
  state: string | null;
  country_code: string;
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

interface CitySelectorProps {
  citiesByCountry: Record<string, City[]>;
}

export default function CitySelector({ citiesByCountry }: CitySelectorProps) {
  const searchParams = useSearchParams();
  const currentLang = searchParams.get('lang') || '';

  return (
    <div className="space-y-8">
      {Object.entries(citiesByCountry).map(([countryCode, cities]) => (
        <div key={countryCode}>
          <h3 className="text-lg font-semibold text-gray-700 mb-4">
            {getCountryName(countryCode)}
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {cities.map((city) => {
              const cityUrl = currentLang
                ? `/${city.slug}/buy-vs-rent?lang=${currentLang}`
                : `/${city.slug}/buy-vs-rent`;

              return (
                <Link
                  key={city.slug}
                  href={cityUrl}
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
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
