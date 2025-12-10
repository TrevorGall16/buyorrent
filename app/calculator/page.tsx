'use client';

/**
 * Global Calculator Page
 * Standalone calculator with region selection and no city-specific defaults
 * Users can enter their own numbers for any location
 */

import { Suspense, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Calculator from '@/components/calculator/Calculator';
import RegionSelector from '@/components/RegionSelector';
import GlobalDisclaimer from '@/components/GlobalDisclaimer';
import { getCountryConfig } from '@/lib/country-config';
import { CountryCode } from '@/lib/types';

type Language = 'en' | 'fr' | 'de' | 'es' | 'it' | 'nl' | 'sv' | 'pt';

function CalculatorPageContent() {
  const searchParams = useSearchParams();
  const [selectedRegion, setSelectedRegion] = useState<CountryCode>('US');

  const language = (searchParams.get('lang') || 'en') as Language;
  const countryConfig = getCountryConfig(selectedRegion);

  // Use median home price and rent for the selected country (generic defaults)
  // These are just starting points - users will adjust them
  const defaultHomePrice = selectedRegion === 'US' ? 400000 :
    selectedRegion === 'GB' ? 300000 :
    selectedRegion === 'DE' ? 350000 :
    selectedRegion === 'FR' ? 300000 :
    selectedRegion === 'CA' ? 500000 :
    selectedRegion === 'AU' ? 600000 :
    selectedRegion === 'ES' ? 250000 :
    selectedRegion === 'IT' ? 280000 :
    selectedRegion === 'NL' ? 350000 :
    selectedRegion === 'SE' ? 300000 :
    selectedRegion === 'CH' ? 800000 :
    selectedRegion === 'BE' ? 300000 :
    selectedRegion === 'IE' ? 320000 :
    selectedRegion === 'PT' ? 220000 : 400000;

  const defaultMonthlyRent = selectedRegion === 'US' ? 2000 :
    selectedRegion === 'GB' ? 1500 :
    selectedRegion === 'DE' ? 1200 :
    selectedRegion === 'FR' ? 1400 :
    selectedRegion === 'CA' ? 1800 :
    selectedRegion === 'AU' ? 2200 :
    selectedRegion === 'ES' ? 1000 :
    selectedRegion === 'IT' ? 1100 :
    selectedRegion === 'NL' ? 1500 :
    selectedRegion === 'SE' ? 1300 :
    selectedRegion === 'CH' ? 2000 :
    selectedRegion === 'BE' ? 1200 :
    selectedRegion === 'IE' ? 1600 :
    selectedRegion === 'PT' ? 900 : 2000;

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12">
      <div className="max-w-7xl mx-auto px-4">
        {/* Title Section */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Global Calculator
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
            Enter your own numbers and see 30-year financial projections for any location
          </p>
        </div>

        {/* Region Selector */}
        <div className="mb-6 flex justify-center">
          <RegionSelector
            selectedRegion={selectedRegion}
            onRegionChange={setSelectedRegion}
          />
        </div>

        {/* Disclaimer */}
        <GlobalDisclaimer variant="inline" />

        {/* Calculator Component - key prop forces remount when region changes */}
        <Calculator
          key={selectedRegion}
          cityName="Global Calculator"
          countryCode={selectedRegion}
          defaultHomePrice={defaultHomePrice}
          defaultMonthlyRent={defaultMonthlyRent}
          language={language}
        />

        {/* Bottom Notice */}
        <div className="mt-12 text-center">
          <p className="text-sm text-gray-600">
            Adjust all values in the calculator above to match your specific situation.
            <br />
            These are generic starting values for {countryConfig.currencySymbol} currency.
          </p>
        </div>
      </div>
    </main>
  );
}

export default function CalculatorPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading calculator...</p>
        </div>
      </div>
    }>
      <CalculatorPageContent />
    </Suspense>
  );
}
