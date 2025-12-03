'use client';

/**
 * Main Calculator Component
 * Integrates all calculator pieces with state management
 */

import { useState, useEffect } from 'react';
import { calculateRentVsBuy, calculateMonthlyMortgagePayment } from '@/lib/finance';
import { getDefaultInputsForCountry, getCountryConfig } from '@/lib/country-config';
import { CountryCode, CalculationResult } from '@/lib/types';
import { useDebounce } from '@/lib/hooks/useDebounce';
import QuickInputs from './QuickInputs';
import AdvancedSettings from './AdvancedSettings';
import NetWorthChart from './NetWorthChart';
import ResultsDisplay from './ResultsDisplay';
import BreakdownTable from './BreakdownTable';

interface CalculatorProps {
  cityName: string;
  countryCode: CountryCode;
  defaultHomePrice: number;
  defaultMonthlyRent: number;
  dataUpdated?: string;
}

export default function Calculator({
  cityName,
  countryCode,
  defaultHomePrice,
  defaultMonthlyRent,
  dataUpdated = 'Dec 2024',
}: CalculatorProps) {
  // Get country configuration
  const countryConfig = getCountryConfig(countryCode);
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
    <div className="space-y-10">
      {/* HERO: Verdict Display - First and Most Prominent */}
      <ResultsDisplay
        breakEven={results.breakEven}
        recommendation={results.summary.recommendation}
        cityName={cityName}
        dataUpdated={dataUpdated}
      />

      {/* Input Section */}
      <div className="bg-white rounded-xl shadow-lg p-6 space-y-6">
        <h2 className="text-2xl font-bold text-gray-900">Adjust Your Scenario</h2>

        <QuickInputs
          cityName={cityName}
          homePrice={homePrice}
          monthlyRent={monthlyRent}
          currencySymbol={countryConfig.currencySymbol}
          onHomePriceChange={setHomePrice}
          onMonthlyRentChange={setMonthlyRent}
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
          propertyTaxLabel={countryConfig.labels.propertyTax}
        />
      </div>

      {/* Data Visualization Section */}
      <div className="space-y-6">

        {/* Chart */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4">
            Net Worth Over Time
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
      </div>
    </div>
  );
}
