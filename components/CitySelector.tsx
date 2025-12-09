'use client';

<<<<<<< HEAD
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { getCountryName, getCountryThemeColor } from '@/lib/country-config';
import { Card } from '@/components/ui/card';
=======
import { useSearchParams } from 'next/navigation';
import { getCountryName, getCountryThemeColor } from '@/lib/country-config';
import CityCard from './CityCard';
>>>>>>> ce91f68596613eb3e2794073a3f4137fe445cf37

interface City {
  slug: string;
  name: string;
  state: string | null;
  country_code: string;
  currency_symbol: string;
  data_updated: string;
<<<<<<< HEAD
  theme_color: string;
=======
  theme_color?: string;
>>>>>>> ce91f68596613eb3e2794073a3f4137fe445cf37
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
<<<<<<< HEAD
          <section key={countryCode} className="py-12">
            <div className="sticky top-0 z-10 bg-background/95 backdrop-blur py-2 mb-6">
=======
          <section key={countryCode} className="py-8">
            {/* Sticky Country Header with Glassmorphism */}
            <div className="sticky top-0 z-10 glass py-4 mb-8 -mx-4 px-4">
>>>>>>> ce91f68596613eb3e2794073a3f4137fe445cf37
              <h3 className="text-2xl font-bold text-gray-900">
                {getCountryName(countryCode)}
              </h3>
            </div>
<<<<<<< HEAD
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {cities.map((city) => {
                const cityUrl = currentLang
                  ? `/${city.slug}/buy-vs-rent?lang=${currentLang}`
                  : `/${city.slug}/buy-vs-rent`;

                return (
                  <Link key={city.slug} href={cityUrl}>
                    <Card
                      className="group hover:shadow-lg transition-all duration-200 hover:-translate-y-1 cursor-pointer"
                      style={
                        { borderTopColor: countryColor, borderTopWidth: '4px' } as React.CSSProperties
                      }
                    >
                      <div className="p-6">
                        <div className="font-bold text-xl text-gray-900 mb-2">
                          {city.name}
                        </div>
                        <div className="text-sm text-primary font-medium group-hover:text-primary/80">
                          View Analysis →
                        </div>
                      </div>
                    </Card>
                  </Link>
                );
              })}
=======

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
>>>>>>> ce91f68596613eb3e2794073a3f4137fe445cf37
            </div>
          </section>
        );
      })}
    </div>
  );
}
