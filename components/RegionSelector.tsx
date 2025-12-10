'use client';

/**
 * Region Selector Component
 * Dropdown selector for country/currency on global calculator
 * Similar to LanguageSelector pattern
 */

import { CountryCode } from '@/lib/types';
import { getCountryName } from '@/lib/country-config';

interface RegionSelectorProps {
  selectedRegion: CountryCode;
  onRegionChange: (region: CountryCode) => void;
}

const REGIONS: CountryCode[] = [
  'US',
  'FR',
  'DE',
  'GB',
  'CA',
  'AU',
  'ES',
  'IT',
  'NL',
  'SE',
  'CH',
  'BE',
  'IE',
  'PT',
];

export default function RegionSelector({
  selectedRegion,
  onRegionChange,
}: RegionSelectorProps) {
  return (
    <div className="inline-block">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Select Region / Currency
      </label>
      <div className="relative">
        <select
          value={selectedRegion}
          onChange={(e) => onRegionChange(e.target.value as CountryCode)}
          className="appearance-none bg-white border-2 border-gray-200 hover:border-blue-300 rounded-lg px-4 py-2 pr-10 text-sm font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors cursor-pointer"
        >
          {REGIONS.map((region) => (
            <option key={region} value={region}>
              {getCountryName(region)}
            </option>
          ))}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
          <svg
            className="w-4 h-4"
            fill="currentColor"
            viewBox="0 0 20 20"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}
