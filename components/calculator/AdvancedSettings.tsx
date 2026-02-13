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
  homeAppreciationRate: number;
  capitalGainsTaxRate: number;
  yearsToPlot: number;
  onDownPaymentChange: (value: number) => void;
  onInterestRateChange: (value: number) => void;
  onLoanTermChange: (value: number) => void;
  onPropertyTaxChange: (value: number) => void;
  onMaintenanceChange: (value: number) => void;
  onRentInflationChange: (value: number) => void;
  onInvestmentReturnChange: (value: number) => void;
  onMarginalTaxChange: (value: number) => void;
  onHomeAppreciationChange: (value: number) => void;
  onCapitalGainsTaxChange: (value: number) => void;
  onYearsToPlotChange: (value: number) => void;
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
  homeAppreciationRate,
  capitalGainsTaxRate,
  yearsToPlot,
  onDownPaymentChange,
  onInterestRateChange,
  onLoanTermChange,
  onPropertyTaxChange,
  onMaintenanceChange,
  onRentInflationChange,
  onInvestmentReturnChange,
  onMarginalTaxChange,
  onHomeAppreciationChange,
  onCapitalGainsTaxChange,
  onYearsToPlotChange,
  propertyTaxLabel = 'Property Tax Rate',
  labels,
}: AdvancedSettingsProps) {
  const [isOpen, setIsOpen] = useState(false);

  // Tooltip definitions
  const tooltips = {
    interestRate: "The annual interest rate on your mortgage loan. This affects your monthly payment and total interest paid over the life of the loan.",
    maintenance: "Annual cost to maintain the property (repairs, replacements, upkeep). Rule of thumb: 1% of home value per year.",
    rentInflation: "How much rent increases each year. Historically averages 3% annually, matching general inflation.",
    investmentReturn: "Expected annual return if you invest your savings instead of buying. Stock market historically averages 5-7% after inflation.",
  };

  return (
    <div className="overflow-hidden">
      {/* Toggle Button - More Prominent */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-6 py-4 bg-white dark:bg-slate-800 hover:bg-blue-50 dark:hover:bg-slate-700 transition-all
                   flex items-center justify-between text-left
                   border-2 border-gray-200 dark:border-slate-600 hover:border-blue-300 dark:hover:border-blue-500 rounded-xl
                   shadow-sm hover:shadow-md"
        aria-expanded={isOpen}
        aria-controls="advanced-settings-content"
      >
        <div className="flex items-center gap-3">
          <span className="text-2xl">⚙️</span>
          <div>
            <span className="text-base font-bold text-gray-900 dark:text-gray-100 block">
              {labels?.advancedSettings || 'Advanced Settings'}
            </span>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
              {labels?.advancedSettingsSubtitle || 'Fine-tune assumptions for more accurate results'}
            </p>
          </div>
        </div>

        <svg
          className={`w-7 h-7 text-gray-600 dark:text-gray-400 transition-transform flex-shrink-0 ${
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
          className="p-4 space-y-6 bg-white dark:bg-slate-800 border-t border-gray-200 dark:border-slate-700"
        >
          {/* Purchase Settings */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wide">
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
              tooltip={tooltips.interestRate}
            />

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                {labels?.loanTerm || 'Loan Term'}
              </label>
              <div className="flex gap-2">
                <button
                  onClick={() => onLoanTermChange(15)}
                  className={`flex-1 py-2 px-4 rounded-lg font-medium transition-colors ${
                    loanTermYears === 15
                      ? 'bg-green-600 text-white'
                      : 'bg-gray-100 dark:bg-slate-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-slate-600'
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
                      : 'bg-gray-100 dark:bg-slate-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-slate-600'
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
              tooltip={tooltips.maintenance}
            />

            <InputField
              label="Home Appreciation Rate"
              value={homeAppreciationRate}
              onChange={(val) => onHomeAppreciationChange(val / 100)}
              min={0}
              max={8}
              step={0.5}
              suffix="% per year"
              formatValue={(val) => val.toFixed(1)}
              tooltip="Expected annual increase in your home's value. Historical US average is ~3%. This is the single most impactful variable in the buy calculation."
            />
          </div>

          {/* Rental Settings */}
          <div className="space-y-4 pt-4 border-t border-gray-200">
            <h4 className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wide">
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
              tooltip={tooltips.rentInflation}
            />
          </div>

          {/* Financial Settings */}
          <div className="space-y-4 pt-4 border-t border-gray-200">
            <h4 className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wide">
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
              tooltip={tooltips.investmentReturn}
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

            <InputField
              label="Capital Gains Tax"
              value={capitalGainsTaxRate}
              onChange={(val) => onCapitalGainsTaxChange(val / 100)}
              min={0}
              max={40}
              step={1}
              suffix="% on investment gains"
              formatValue={(val) => val.toString()}
              tooltip="Tax rate applied to the renter's investment gains when liquidating. US long-term rate is 15-20%. Some countries charge 25-30%."
            />
          </div>

          {/* Analysis Timeframe */}
          <div className="space-y-4 pt-4 border-t border-gray-200">
            <h4 className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wide">
              Analysis Timeframe
            </h4>

            <InputField
              label="Years to Plot"
              value={yearsToPlot}
              onChange={onYearsToPlotChange}
              min={10}
              max={50}
              step={5}
              suffix={` ${labels?.years || 'years'}`}
              formatValue={(val) => val.toString()}
            />
          </div>
        </div>
      )}
    </div>
  );
}
