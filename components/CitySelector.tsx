'use client';

import { useSearchParams } from 'next/navigation';
import { getCountryName, getCountryThemeColor } from '@/lib/country-config';
import CityCard from './CityCard';

interface City {
  slug: string;
  name: string;
  state: string | null;
  country_code: string;
  currency_symbol: string;
  data_updated: string;
  theme_color?: string;
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
      {Object.entries(citiesByCountry).map(([countryCode, cities]) => {
        const countryColor = getCountryThemeColor(countryCode);

        return (
          <section key={countryCode} className="py-8">
            {/* Sticky Country Header with Glassmorphism */}
            <div className="sticky top-0 z-10 glass py-4 mb-8 -mx-4 px-4">
              <h3 className="text-2xl font-bold text-gray-900">
                {getCountryName(countryCode)}
              </h3>
            </div>

            {/* City Cards Grid - 1 column mobile, 2 columns desktop */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {cities.map((city) => (
                <CityCard
                  key={city.slug}
                  cityName={city.name}
                  citySlug={city.slug}
                  avgHomePrice={city.defaults.avg_home_price}
                  avgRent={city.defaults.avg_rent}
                  currencySymbol={city.currency_symbol}
                  countryColor={countryColor}
                  currentLang={currentLang}
                />
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}
