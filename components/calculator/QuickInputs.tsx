'use client';

/**
 * Quick View - Shows only essential inputs
 * City, Home Price, Monthly Rent
 */

import InputField from './InputField';

interface QuickInputsProps {
  cityName: string;
  homePrice: number;
  monthlyRent: number;
  currencySymbol: string;
  onHomePriceChange: (value: number) => void;
  onMonthlyRentChange: (value: number) => void;
}

export default function QuickInputs({
  cityName,
  homePrice,
  monthlyRent,
  currencySymbol,
  onHomePriceChange,
  onMonthlyRentChange,
}: QuickInputsProps) {
  return (
    <div className="space-y-8 md:space-y-10">
      {/* City Display */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs text-blue-600 font-medium uppercase tracking-wide">
              Analyzing
            </p>
            <h3 className="text-xl font-bold text-blue-900">{cityName}</h3>
          </div>
          <div className="text-3xl">📍</div>
        </div>
      </div>

      {/* Home Price Slider - With Card Wrapper */}
      <div className="bg-gray-50/50 rounded-xl p-5 border border-gray-100 hover:bg-gray-100 transition-colors">
        <InputField
          label="Home Price"
          value={homePrice}
          onChange={onHomePriceChange}
          min={100000}
          max={2000000}
          step={10000}
          prefix={currencySymbol}
          formatValue={(val) => val.toLocaleString()}
        />
      </div>

      {/* Divider */}
      <div className="border-b border-gray-200"></div>

      {/* Monthly Rent Slider - With Card Wrapper */}
      <div className="bg-gray-50/50 rounded-xl p-5 border border-gray-100 hover:bg-gray-100 transition-colors">
        <InputField
          label="Monthly Rent"
          value={monthlyRent}
          onChange={onMonthlyRentChange}
          min={500}
          max={10000}
          step={50}
          prefix={currencySymbol}
          formatValue={(val) => val.toLocaleString()}
        />
      </div>
    </div>
  );
}
