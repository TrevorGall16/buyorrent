'use client';

/**
 * Advanced Settings - Collapsible accordion with all detailed inputs
 */

import { useState } from 'react';
import InputField from './InputField';

interface AdvancedSettingsProps {
  downPaymentPercent: number;
  interestRate: number;
  loanTermYears: number;
  propertyTaxRate: number;
  maintenanceRate: number;
  rentInflationRate: number;
  investmentReturnRate: number;
  marginalTaxRate: number;
  onDownPaymentChange: (value: number) => void;
  onInterestRateChange: (value: number) => void;
  onLoanTermChange: (value: number) => void;
  onPropertyTaxChange: (value: number) => void;
  onMaintenanceChange: (value: number) => void;
  onRentInflationChange: (value: number) => void;
  onInvestmentReturnChange: (value: number) => void;
  onMarginalTaxChange: (value: number) => void;
  propertyTaxLabel?: string;
  labels?: {
    advancedSettings: string;
    advancedSettingsSubtitle: string;
    downPayment: string;
    interestRate: string;
    loanTerm: string;
    years: string;
    maintenanceRate: string;
    rentInflation: string;
    investmentReturn: string;
    marginalTaxRate: string;
  };
}

export default function AdvancedSettings({
  downPaymentPercent,
  interestRate,
  loanTermYears,
  propertyTaxRate,
  maintenanceRate,
  rentInflationRate,
  investmentReturnRate,
  marginalTaxRate,
  onDownPaymentChange,
  onInterestRateChange,
  onLoanTermChange,
  onPropertyTaxChange,
  onMaintenanceChange,
  onRentInflationChange,
  onInvestmentReturnChange,
  onMarginalTaxChange,
  propertyTaxLabel = 'Property Tax Rate',
  labels,
}: AdvancedSettingsProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="overflow-hidden">
      {/* Toggle Button - More Prominent */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-6 py-4 bg-white hover:bg-blue-50 transition-all
                   flex items-center justify-between text-left
                   border-2 border-gray-200 hover:border-blue-300 rounded-xl
                   shadow-sm hover:shadow-md"
        aria-expanded={isOpen}
        aria-controls="advanced-settings-content"
      >
        <div className="flex items-center gap-3">
          <span className="text-2xl">⚙️</span>
          <div>
            <span className="text-base font-bold text-gray-900 block">
              {labels?.advancedSettings || 'Advanced Settings'}
            </span>
            <p className="text-xs text-gray-500 mt-0.5">
              {labels?.advancedSettingsSubtitle || 'Fine-tune assumptions for more accurate results'}
            </p>
          </div>
        </div>

        <svg
          className={`w-7 h-7 text-gray-600 transition-transform flex-shrink-0 ${
            isOpen ? 'rotate-180' : ''
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2.5}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {/* Collapsible Content */}
      {isOpen && (
        <div
          id="advanced-settings-content"
          className="p-4 space-y-6 bg-white border-t border-gray-200"
        >
          {/* Purchase Settings */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wide">
              Purchase Assumptions
            </h4>

            <InputField
              label={labels?.downPayment || 'Down Payment'}
              value={downPaymentPercent}
              onChange={(val) => onDownPaymentChange(val / 100)}
              min={0}
              max={50}
              step={1}
              suffix="%"
              formatValue={(val) => val.toString()}
            />

            <InputField
              label={labels?.interestRate || 'Interest Rate'}
              value={interestRate}
              onChange={(val) => onInterestRateChange(val / 100)}
              min={2}
              max={12}
              step={0.1}
              suffix="%"
              formatValue={(val) => val.toFixed(1)}
            />

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                {labels?.loanTerm || 'Loan Term'}
              </label>
              <div className="flex gap-2">
                <button
                  onClick={() => onLoanTermChange(15)}
                  className={`flex-1 py-2 px-4 rounded-lg font-medium transition-colors ${
                    loanTermYears === 15
                      ? 'bg-green-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                  aria-pressed={loanTermYears === 15}
                >
                  15 {labels?.years || 'Years'}
                </button>
                <button
                  onClick={() => onLoanTermChange(30)}
                  className={`flex-1 py-2 px-4 rounded-lg font-medium transition-colors ${
                    loanTermYears === 30
                      ? 'bg-green-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                  aria-pressed={loanTermYears === 30}
                >
                  30 {labels?.years || 'Years'}
                </button>
              </div>
            </div>

            <InputField
              label={propertyTaxLabel}
              value={propertyTaxRate}
              onChange={(val) => onPropertyTaxChange(val / 100)}
              min={0}
              max={3}
              step={0.1}
              suffix="%"
              formatValue={(val) => val.toFixed(2)}
            />

            <InputField
              label={labels?.maintenanceRate || 'Annual Maintenance'}
              value={maintenanceRate}
              onChange={(val) => onMaintenanceChange(val / 100)}
              min={0.5}
              max={3}
              step={0.1}
              suffix="% of home value"
              formatValue={(val) => val.toFixed(1)}
            />
          </div>

          {/* Rental Settings */}
          <div className="space-y-4 pt-4 border-t border-gray-200">
            <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wide">
              Rental Assumptions
            </h4>

            <InputField
              label={labels?.rentInflation || 'Rent Inflation'}
              value={rentInflationRate}
              onChange={(val) => onRentInflationChange(val / 100)}
              min={0}
              max={8}
              step={0.1}
              suffix="% per year"
              formatValue={(val) => val.toFixed(1)}
            />
          </div>

          {/* Financial Settings */}
          <div className="space-y-4 pt-4 border-t border-gray-200">
            <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wide">
              Financial Assumptions
            </h4>

            <InputField
              label={labels?.investmentReturn || 'Investment Return'}
              value={investmentReturnRate}
              onChange={(val) => onInvestmentReturnChange(val / 100)}
              min={0}
              max={12}
              step={0.1}
              suffix="% per year"
              formatValue={(val) => val.toFixed(1)}
            />

            <InputField
              label={labels?.marginalTaxRate || 'Marginal Tax Rate'}
              value={marginalTaxRate}
              onChange={(val) => onMarginalTaxChange(val / 100)}
              min={0}
              max={50}
              step={1}
              suffix="%"
              formatValue={(val) => val.toString()}
            />
          </div>
        </div>
      )}
    </div>
  );
}
