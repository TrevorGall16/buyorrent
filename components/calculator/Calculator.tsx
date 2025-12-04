'use client';

/**
 * Main Calculator Component
 * Integrates all calculator pieces with state management
 */

import { useState, useEffect } from 'react';
import { calculateRentVsBuy, calculateMonthlyMortgagePayment } from '@/lib/finance';
import { getDefaultInputsForCountry, getCountryConfig, getLabelsByLanguage } from '@/lib/country-config';
import { CountryCode, CalculationResult } from '@/lib/types';
import { useDebounce } from '@/lib/hooks/useDebounce';
import QuickInputs from './QuickInputs';
import AdvancedSettings from './AdvancedSettings';
import NetWorthChart from './NetWorthChart';
import ResultsDisplay from './ResultsDisplay';
import BreakdownTable from './BreakdownTable';
import AdContainer from '@/components/ads/AdContainer';

interface CalculatorProps {
  cityName: string;
  countryCode: CountryCode;
  defaultHomePrice: number;
  defaultMonthlyRent: number;
  dataUpdated?: string;
  themeColor?: string;
  language?: 'en' | 'fr' | 'de';
}

export default function Calculator({
  cityName,
  countryCode,
  defaultHomePrice,
  defaultMonthlyRent,
  dataUpdated = 'Dec 2024',
  themeColor,
  language = 'en',
}: CalculatorProps) {
  // Get country configuration (for currency and financial settings)
  const countryConfig = getCountryConfig(countryCode);

  // Get labels based on language (manual selection, not country)
  const labels = getLabelsByLanguage(language);

  const defaultInputs = getDefaultInputsForCountry(
    countryCode,
    defaultHomePrice,
    defaultMonthlyRent
  );

  // State management
  const [homePrice, setHomePrice] = useState(defaultHomePrice);
  const [monthlyRent, setMonthlyRent] = useState(defaultMonthlyRent);
  const [downPaymentPercent, setDownPaymentPercent] = useState(
    defaultInputs.purchase.downPaymentPercent
  );
  const [interestRate, setInterestRate] = useState(
    defaultInputs.purchase.interestRate
  );
  const [loanTermYears, setLoanTermYears] = useState(
    defaultInputs.purchase.loanTermYears
  );
  const [propertyTaxRate, setPropertyTaxRate] = useState(
    defaultInputs.purchase.propertyTaxRate
  );
  const [maintenanceRate, setMaintenanceRate] = useState(
    defaultInputs.purchase.maintenanceRate
  );
  const [rentInflationRate, setRentInflationRate] = useState(
    defaultInputs.rental.rentInflationRate
  );
  const [investmentReturnRate, setInvestmentReturnRate] = useState(
    defaultInputs.financial.investmentReturnRate
  );
  const [marginalTaxRate, setMarginalTaxRate] = useState(
    defaultInputs.financial.marginalTaxRate
  );

  const [results, setResults] = useState<CalculationResult | null>(null);

  // Debounce expensive slider inputs (300ms delay)
  const debouncedHomePrice = useDebounce(homePrice, 300);
  const debouncedMonthlyRent = useDebounce(monthlyRent, 300);
  const debouncedDownPaymentPercent = useDebounce(downPaymentPercent, 300);
  const debouncedInterestRate = useDebounce(interestRate, 300);
  const debouncedPropertyTaxRate = useDebounce(propertyTaxRate, 300);
  const debouncedMaintenanceRate = useDebounce(maintenanceRate, 300);
  const debouncedRentInflationRate = useDebounce(rentInflationRate, 300);
  const debouncedInvestmentReturnRate = useDebounce(investmentReturnRate, 300);
  const debouncedMarginalTaxRate = useDebounce(marginalTaxRate, 300);

  // Recalculate whenever debounced inputs change
  useEffect(() => {
    const inputs = {
      purchase: {
        homePrice: debouncedHomePrice,
        downPaymentPercent: debouncedDownPaymentPercent,
        interestRate: debouncedInterestRate,
        loanTermYears,
        closingCostRate: countryConfig.closingCostRate,
        propertyTaxRate: debouncedPropertyTaxRate,
        maintenanceRate: debouncedMaintenanceRate,
      },
      rental: {
        monthlyRent: debouncedMonthlyRent,
        securityDepositMonths: 1,
        brokerFeeMonths: countryConfig.brokerFeeMonths,
        rentInflationRate: debouncedRentInflationRate,
      },
      financial: {
        investmentReturnRate: debouncedInvestmentReturnRate,
        marginalTaxRate: debouncedMarginalTaxRate,
      },
      yearsToAnalyze: 30,
    };

    const calculationResults = calculateRentVsBuy(inputs);
    setResults(calculationResults);
  }, [
    debouncedHomePrice,
    debouncedMonthlyRent,
    debouncedDownPaymentPercent,
    debouncedInterestRate,
    loanTermYears,
    debouncedPropertyTaxRate,
    debouncedMaintenanceRate,
    debouncedRentInflationRate,
    debouncedInvestmentReturnRate,
    debouncedMarginalTaxRate,
    countryConfig,
  ]);

  if (!results) {
    return (
      <div className="flex items-center justify-center p-12">
        <div className="text-gray-500">Calculating...</div>
      </div>
    );
  }

  // Calculate derived values for breakdown table
  const downPayment = homePrice * downPaymentPercent;
  const closingCosts = homePrice * countryConfig.closingCostRate;
  const loanAmount = homePrice - downPayment;
  const monthlyMortgage = calculateMonthlyMortgagePayment(
    loanAmount,
    interestRate,
    loanTermYears
  );

  const finalYearData = results.dataPoints[results.dataPoints.length - 1];

  return (
    <>
      {/* Mobile: Stacked Layout (default) */}
      <div className="lg:hidden space-y-10">
        {/* Verdict First on Mobile */}
        <ResultsDisplay
          breakEven={results.breakEven}
          recommendation={results.summary.recommendation}
          cityName={cityName}
          dataUpdated={dataUpdated}
          themeColor={themeColor}
          labels={{
            rentingBetter: labels.rentingBetter,
            buyingBetterAfter: labels.buyingBetterAfter,
            years: labels.years,
            months: labels.months,
            and: labels.and,
            buyingMessage: labels.buyingMessage,
            rentingMessage: labels.rentingMessage,
            stayAtLeast: labels.stayAtLeast,
            forBuyingToMakeSense: labels.forBuyingToMakeSense,
            marketData: labels.marketData,
            updated: labels.updated,
            buyingRecommended: labels.buyingRecommended,
            rentingRecommended: labels.rentingRecommended,
            roughlyEquivalent: labels.roughlyEquivalent,
          }}
        />

        {/* Input Section */}
        <div className="bg-white rounded-xl shadow-lg p-6 space-y-6">
          <h2 className="text-2xl font-bold text-gray-900">{labels.adjustScenario}</h2>

          <QuickInputs
            cityName={cityName}
            homePrice={homePrice}
            monthlyRent={monthlyRent}
            currencySymbol={countryConfig.currencySymbol}
            onHomePriceChange={setHomePrice}
            onMonthlyRentChange={setMonthlyRent}
            labels={{
              homePrice: labels.homePrice,
              monthlyRent: labels.monthlyRent,
            }}
          />

          <AdvancedSettings
            downPaymentPercent={downPaymentPercent * 100}
            interestRate={interestRate * 100}
            loanTermYears={loanTermYears}
            propertyTaxRate={propertyTaxRate * 100}
            maintenanceRate={maintenanceRate * 100}
            rentInflationRate={rentInflationRate * 100}
            investmentReturnRate={investmentReturnRate * 100}
            marginalTaxRate={marginalTaxRate * 100}
            onDownPaymentChange={setDownPaymentPercent}
            onInterestRateChange={setInterestRate}
            onLoanTermChange={setLoanTermYears}
            onPropertyTaxChange={setPropertyTaxRate}
            onMaintenanceChange={setMaintenanceRate}
            onRentInflationChange={setRentInflationRate}
            onInvestmentReturnChange={setInvestmentReturnRate}
            onMarginalTaxChange={setMarginalTaxRate}
            propertyTaxLabel={labels.propertyTax}
            labels={{
              advancedSettings: labels.advancedSettings,
              advancedSettingsSubtitle: labels.advancedSettingsSubtitle,
              downPayment: labels.downPayment,
              interestRate: labels.interestRate,
              loanTerm: labels.loanTerm,
              years: labels.years,
              maintenanceRate: labels.maintenanceRate,
              rentInflation: labels.rentInflation,
              investmentReturn: labels.investmentReturn,
              marginalTaxRate: labels.marginalTaxRate,
            }}
          />
        </div>

        {/* Chart */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4">
            {labels.netWorthOverTime}
          </h3>
          <NetWorthChart
            dataPoints={results.dataPoints}
            currencySymbol={countryConfig.currencySymbol}
            breakEvenYear={results.breakEven.year}
          />
        </div>

        {/* Breakdown Table */}
        <BreakdownTable
          finalYearData={finalYearData}
          currencySymbol={countryConfig.currencySymbol}
          downPayment={downPayment}
          closingCosts={closingCosts}
          monthlyMortgage={monthlyMortgage}
          monthlyRent={monthlyRent}
        />

        {/* Mobile Ad */}
        <AdContainer slot="mobile" />
      </div>

      {/* Desktop: Dashboard Layout (40% Left / 60% Right) */}
      <div className="hidden lg:grid lg:grid-cols-5 lg:gap-8">
        {/* LEFT COLUMN (40% = 2 of 5 columns) - Scrollable Inputs */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-xl shadow-lg p-6 space-y-6 sticky top-6">
            <h2 className="text-2xl font-bold text-gray-900">{labels.adjustScenario}</h2>

            <QuickInputs
              cityName={cityName}
              homePrice={homePrice}
              monthlyRent={monthlyRent}
              currencySymbol={countryConfig.currencySymbol}
              onHomePriceChange={setHomePrice}
              onMonthlyRentChange={setMonthlyRent}
              labels={{
                homePrice: labels.homePrice,
                monthlyRent: labels.monthlyRent,
              }}
            />

            <AdvancedSettings
              downPaymentPercent={downPaymentPercent * 100}
              interestRate={interestRate * 100}
              loanTermYears={loanTermYears}
              propertyTaxRate={propertyTaxRate * 100}
              maintenanceRate={maintenanceRate * 100}
              rentInflationRate={rentInflationRate * 100}
              investmentReturnRate={investmentReturnRate * 100}
              marginalTaxRate={marginalTaxRate * 100}
              onDownPaymentChange={setDownPaymentPercent}
              onInterestRateChange={setInterestRate}
              onLoanTermChange={setLoanTermYears}
              onPropertyTaxChange={setPropertyTaxRate}
              onMaintenanceChange={setMaintenanceRate}
              onRentInflationChange={setRentInflationRate}
              onInvestmentReturnChange={setInvestmentReturnRate}
              onMarginalTaxChange={setMarginalTaxRate}
              propertyTaxLabel={labels.propertyTax}
              labels={{
                advancedSettings: labels.advancedSettings,
                advancedSettingsSubtitle: labels.advancedSettingsSubtitle,
                downPayment: labels.downPayment,
                interestRate: labels.interestRate,
                loanTerm: labels.loanTerm,
                years: labels.years,
                maintenanceRate: labels.maintenanceRate,
                rentInflation: labels.rentInflation,
                investmentReturn: labels.investmentReturn,
                marginalTaxRate: labels.marginalTaxRate,
              }}
            />
          </div>
        </div>

        {/* RIGHT COLUMN (60% = 3 of 5 columns) - Results */}
        <div className="lg:col-span-3 space-y-6">
          {/* Verdict */}
          <ResultsDisplay
            breakEven={results.breakEven}
            recommendation={results.summary.recommendation}
            cityName={cityName}
            dataUpdated={dataUpdated}
            themeColor={themeColor}
            labels={{
              rentingBetter: labels.rentingBetter,
              buyingBetterAfter: labels.buyingBetterAfter,
              years: labels.years,
              months: labels.months,
              and: labels.and,
              buyingMessage: labels.buyingMessage,
              rentingMessage: labels.rentingMessage,
              stayAtLeast: labels.stayAtLeast,
              forBuyingToMakeSense: labels.forBuyingToMakeSense,
              marketData: labels.marketData,
              updated: labels.updated,
              buyingRecommended: labels.buyingRecommended,
              rentingRecommended: labels.rentingRecommended,
              roughlyEquivalent: labels.roughlyEquivalent,
            }}
          />

          {/* Chart */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              {labels.netWorthOverTime}
            </h3>
            <NetWorthChart
              dataPoints={results.dataPoints}
              currencySymbol={countryConfig.currencySymbol}
              breakEvenYear={results.breakEven.year}
            />
          </div>

          {/* Breakdown Table */}
          <BreakdownTable
            finalYearData={finalYearData}
            currencySymbol={countryConfig.currencySymbol}
            downPayment={downPayment}
            closingCosts={closingCosts}
            monthlyMortgage={monthlyMortgage}
            monthlyRent={monthlyRent}
          />

          {/* Desktop Sidebar Ad (300x600) - Sticky */}
          <div className="sticky top-6">
            <AdContainer slot="sidebar" />
          </div>
        </div>
      </div>
    </>
  );
}
