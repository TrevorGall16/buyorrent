'use client';

import Link from 'next/link';
import { useState } from 'react';

// 1. Updated Interface to match your ACTUAL JSON structure
export interface City {
  name: string;
  slug: string;
  country_code: string;
  currency_symbol?: string; // Mapped from your JSON "currency_symbol"
  
  // Direct values (if flat)
  price?: number;
  rent?: number;

  // Nested values (from your "defaults" object)
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
  
  // 2. THE LOGIC FIX: Drill down into 'defaults' if root values are missing
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
  // ✅ FIX: Only add the lang param if it is NOT English (cleaner SEO)
  href={`/${city.slug}/buy-vs-rent${language !== 'en' ? `?lang=${language}` : ''}`}
  className="group relative overflow-hidden bg-white dark:bg-[#121212] border border-gray-100 dark:border-white/5 rounded-xl h-64 transition-all hover:border-gray-300 dark:hover:border-white/20 hover:shadow-xl hover:-translate-y-1 block"
>
      {/* 1. THE IMAGE LAYER */}
      {!imageError ? (
        <div className="absolute inset-0 z-0">
          <img
            src={`/images/cities/${city.slug}.jpg`}
            alt={`${city.name} real estate`}
            className="w-full h-full object-cover opacity-90 scale-110 group-hover:scale-125 transition-transform duration-[2000ms] ease-out"
  onError={() => setImageError(true)}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
        </div>
      ) : (
        /* 2. FALLBACK: WATERMARK LAYER */
        <div className="absolute inset-0 z-0">
          <div className="absolute -left-2 -top-4 text-[8rem] font-serif italic text-gray-50 dark:text-white/5 select-none pointer-events-none leading-none">
            {city.name.substring(0, 2)}
          </div>
          <div 
            className="absolute top-0 right-0 w-24 h-24 blur-[80px] opacity-20" 
            style={{ backgroundColor: countryColor }} 
          />
        </div>
      )}

      {/* 3. CONTENT LAYER */}
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