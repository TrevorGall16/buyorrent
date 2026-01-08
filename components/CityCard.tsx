/**
 * CityCard Component
 * Displays city preview with optimized Next.js Image component
 * Includes fallback for missing images
 */

'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';

// City interface matching the actual JSON structure
export interface City {
  name: string;
  slug: string;
  country_code: string;
  currency_symbol?: string;

  // Direct values (if flat)
  price?: number;
  rent?: number;

  // Nested values (from "defaults" object)
  defaults?: {
    avg_home_price?: number;
    avg_rent?: number;
  };
}

interface CityCardProps {
  city: City;
  countryColor: string;
  language: string;
}

export default function CityCard({ city, countryColor, language }: CityCardProps) {
  const [imageError, setImageError] = useState(false);

  // Extract data from nested structure
  const currencySymbol = city.currency_symbol || '$';

  const realRent =
    city.rent ||
    city.defaults?.avg_rent ||
    0;

  const realPrice =
    city.price ||
    city.defaults?.avg_home_price ||
    0;

  return (
    <Link
      href={`/${city.slug}/buy-vs-rent${language !== 'en' ? `?lang=${language}` : ''}`}
      className="group relative overflow-hidden bg-white dark:bg-[#121212] border border-gray-100 dark:border-white/5 rounded-xl h-64 transition-all hover:border-gray-300 dark:hover:border-white/20 hover:shadow-xl hover:-translate-y-1 block"
    >
      {/* Image Layer */}
      {!imageError ? (
        <div className="absolute inset-0 z-0">
          <Image
            src={`/images/cities/${city.slug}.jpg`}
            alt={`${city.name} real estate and housing market`}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover opacity-90 scale-110 group-hover:scale-125 transition-transform duration-[2000ms] ease-out"
            onError={() => setImageError(true)}
            quality={85}
            priority={false}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
        </div>
      ) : (
        /* Fallback Watermark Layer */
        <div className="absolute inset-0 z-0 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
          <div className="absolute -left-2 -top-4 text-[8rem] font-serif italic text-gray-200 dark:text-white/5 select-none pointer-events-none leading-none">
            {city.name.substring(0, 2)}
          </div>
          <div
            className="absolute top-0 right-0 w-24 h-24 blur-[80px] opacity-20"
            style={{ backgroundColor: countryColor }}
          />
        </div>
      )}

      {/* Content Layer */}
      <div className="relative z-10 h-full flex flex-col justify-end p-6">
        <h3 className="text-2xl font-bold text-white mb-1 tracking-tight">
          {city.name}
        </h3>
        <p className="text-gray-300 text-sm font-medium mb-4">
          {realRent.toLocaleString()} {currencySymbol}/mo • {realPrice.toLocaleString()} {currencySymbol}
        </p>

        <span className="inline-flex items-center text-sm font-semibold text-white/90 group-hover:text-white group-hover:translate-x-1 transition-all">
          View Analysis <span className="ml-2">→</span>
        </span>
      </div>
    </Link>
  );
}
