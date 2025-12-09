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
    <div className="space-y-16">
      {Object.entries(citiesByCountry).map(([countryCode, cities]) => (
        <section key={countryCode} className="py-12">
          <h3 className="text-3xl font-bold text-gray-900 mb-6">
            {getCountryName(countryCode)}
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {cities.map((city) => {
              const cityUrl = currentLang
                ? `/${city.slug}/buy-vs-rent?lang=${currentLang}`
                : `/${city.slug}/buy-vs-rent`;

              return (
                <Link
                  key={city.slug}
                  href={cityUrl}
                  className="group bg-white border border-gray-100 rounded-lg shadow-sm hover:shadow-lg transition-all duration-200 hover:-translate-y-1"
                  style={
                    { borderTopColor: city.theme_color, borderTopWidth: '4px' } as React.CSSProperties
                  }
                >
                  <div className="p-6">
                    <div className="font-bold text-xl text-gray-900 mb-2">
                      {city.name}
                    </div>
                    <div className="text-sm text-blue-600 font-medium group-hover:text-blue-700">
                      View Analysis →
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>
      ))}
    </div>
  );
}
