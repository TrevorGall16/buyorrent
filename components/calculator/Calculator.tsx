'use client';

/**
 * Main Calculator Component
 * FIXED: TypeScript Errors on ResultsDisplay labels
 */

import { useState, useEffect } from 'react';
import { useSearchParams, usePathname } from 'next/navigation';
import { calculateRentVsBuy, calculateMonthlyMortgagePayment } from '@/lib/finance';
import { getDefaultInputsForCountry, getCountryConfig, getLabelsByLanguage } from '@/lib/country-config';
import { CountryCode, CalculationResult } from '@/lib/types';
import { useDebounce } from '@/lib/hooks/useDebounce';
import QuickInputs from './QuickInputs';
import AdvancedSettings from './AdvancedSettings';
import NetWorthChart from './NetWorthChart';
import ResultsDisplay from './ResultsDisplay';
import BreakdownTable from './BreakdownTable';
import InsightEngine from './InsightEngine';
import AdContainer from '@/components/ads/AdContainer';

interface CalculatorProps {
  cityName: string;
  countryCode: CountryCode;
  defaultHomePrice: number;
  defaultMonthlyRent: number;
  dataUpdated?: string;
  themeColor?: string;
  language?: 'en' | 'fr' | 'de' | 'es' | 'it' | 'nl' | 'sv' | 'pt';
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
  const countryConfig = getCountryConfig(countryCode);
  const labels = getLabelsByLanguage(language);
  const defaultInputs = getDefaultInputsForCountry(countryCode, defaultHomePrice, defaultMonthlyRent);
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const parseParam = (key: string, defaultValue: number): number => {
    const value = searchParams.get(key);
    return value ? parseFloat(value) : defaultValue;
  };

  const [homePrice, setHomePrice] = useState(parseParam('price', defaultHomePrice));
  const [monthlyRent, setMonthlyRent] = useState(parseParam('rent', defaultMonthlyRent));
  const [downPaymentPercent, setDownPaymentPercent] = useState(parseParam('down', defaultInputs.purchase.downPaymentPercent));
  const [interestRate, setInterestRate] = useState(parseParam('rate', defaultInputs.purchase.interestRate));
  const [loanTermYears, setLoanTermYears] = useState(parseParam('term', defaultInputs.purchase.loanTermYears));
  const [propertyTaxRate, setPropertyTaxRate] = useState(parseParam('tax', defaultInputs.purchase.propertyTaxRate));
  const [maintenanceRate, setMaintenanceRate] = useState(parseParam('maint', defaultInputs.purchase.maintenanceRate));
  const [rentInflationRate, setRentInflationRate] = useState(parseParam('rinfl', defaultInputs.rental.rentInflationRate));
  const [investmentReturnRate, setInvestmentReturnRate] = useState(parseParam('invest', defaultInputs.financial.investmentReturnRate));
  const [marginalTaxRate, setMarginalTaxRate] = useState(parseParam('mtax', defaultInputs.financial.marginalTaxRate));
  const [yearsToPlot, setYearsToPlot] = useState(parseParam('years', 30));

  // Mobile-only toggle state
  const [isAdvancedOpen, setIsAdvancedOpen] = useState(false);
  const [results, setResults] = useState<CalculationResult | null>(null);

  const debouncedHomePrice = useDebounce(homePrice, 300);
  const debouncedMonthlyRent = useDebounce(monthlyRent, 300);
  const debouncedDownPaymentPercent = useDebounce(downPaymentPercent, 300);
  const debouncedInterestRate = useDebounce(interestRate, 300);
  const debouncedPropertyTaxRate = useDebounce(propertyTaxRate, 300);
  const debouncedMaintenanceRate = useDebounce(maintenanceRate, 300);
  const debouncedRentInflationRate = useDebounce(rentInflationRate, 300);
  const debouncedInvestmentReturnRate = useDebounce(investmentReturnRate, 300);
  const debouncedMarginalTaxRate = useDebounce(marginalTaxRate, 300);

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
      yearsToAnalyze: yearsToPlot,
    };
    setResults(calculateRentVsBuy(inputs));
  }, [
    debouncedHomePrice, debouncedMonthlyRent, debouncedDownPaymentPercent,
    debouncedInterestRate, loanTermYears, debouncedPropertyTaxRate,
    debouncedMaintenanceRate, debouncedRentInflationRate,
    debouncedInvestmentReturnRate, debouncedMarginalTaxRate,
    countryConfig, yearsToPlot,
  ]);

  if (!results) {
    return <div className="flex items-center justify-center p-12 text-gray-500">Calculating...</div>;
  }

  const downPayment = homePrice * downPaymentPercent;
  const closingCosts = homePrice * countryConfig.closingCostRate;
  const loanAmount = homePrice - downPayment;
  const monthlyMortgage = calculateMonthlyMortgagePayment(loanAmount, interestRate, loanTermYears);
  const finalYearData = results.dataPoints[results.dataPoints.length - 1];

  const advancedSettingsProps = {
    downPaymentPercent: downPaymentPercent * 100,
    interestRate: interestRate * 100,
    loanTermYears,
    propertyTaxRate: propertyTaxRate * 100,
    maintenanceRate: maintenanceRate * 100,
    rentInflationRate: rentInflationRate * 100,
    investmentReturnRate: investmentReturnRate * 100,
    marginalTaxRate: marginalTaxRate * 100,
    yearsToPlot,
    onDownPaymentChange: setDownPaymentPercent,
    onInterestRateChange: setInterestRate,
    onLoanTermChange: setLoanTermYears,
    onPropertyTaxChange: setPropertyTaxRate,
    onMaintenanceChange: setMaintenanceRate,
    onRentInflationChange: setRentInflationRate,
    onInvestmentReturnChange: setInvestmentReturnRate,
    onMarginalTaxChange: setMarginalTaxRate,
    onYearsToPlotChange: setYearsToPlot,
    propertyTaxLabel: labels.propertyTax,
    labels: {
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
    }
  };

  return (
    <>
      {/* --- MOBILE LAYOUT (Stacked) --- */}
      <div className="lg:hidden space-y-10">
        <ResultsDisplay
          breakEven={results.breakEven}
          recommendation={results.summary.recommendation}
          cityName={cityName}
          dataUpdated={dataUpdated}
          themeColor={themeColor}
          currentState={{
            homePrice, monthlyRent, downPaymentPercent, interestRate, loanTermYears,
            propertyTaxRate, maintenanceRate, rentInflationRate, investmentReturnRate,
            marginalTaxRate, yearsToPlot,
          }}
          defaultInputs={{ homePrice: defaultHomePrice, monthlyRent: defaultMonthlyRent, ...defaultInputs }}
          pathname={pathname}
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
            resultScenarioPrefix: labels.resultScenarioPrefix,
          }}
          dataSourceName={countryConfig.dataSourceName}
          dataSourceUrl={countryConfig.dataSourceUrl}
        />

        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm p-6 space-y-6 border border-gray-100 dark:border-slate-800"
             style={themeColor ? { borderTopWidth: '6px', borderTopColor: themeColor, borderTopStyle: 'solid' } : undefined}>
          <h2 className="text-2xl font-bold px-4 py-3 -mx-4 -mt-4 mb-4 rounded-t-lg"
              style={themeColor ? { backgroundColor: `${themeColor}1A` } : undefined}>
            {labels.adjustScenario}
          </h2>
          <QuickInputs
            cityName={cityName}
            homePrice={homePrice}
            monthlyRent={monthlyRent}
            currencySymbol={countryConfig.currencySymbol}
            onHomePriceChange={setHomePrice}
            onMonthlyRentChange={setMonthlyRent}
            labels={{ homePrice: labels.homePrice, monthlyRent: labels.monthlyRent }}
          />
          {/* Mobile Collapsible */}
          <div className="border border-gray-100 dark:border-slate-800 rounded-lg p-4 mt-4">
            <button onClick={() => setIsAdvancedOpen(!isAdvancedOpen)}
                    className="flex justify-between items-center w-full font-bold text-lg text-slate-900 dark:text-slate-50 py-1">
              {labels.advancedSettings}
              <span className="text-xl transition-transform duration-300 transform">{isAdvancedOpen ? '▲' : '▼'}</span>
            </button>
            {isAdvancedOpen && <div className="pt-4"><AdvancedSettings {...advancedSettingsProps} /></div>}
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm p-6 border border-gray-100 dark:border-slate-800"
             style={themeColor ? { borderTopWidth: '6px', borderTopColor: themeColor, borderTopStyle: 'solid' } : undefined}>
          <h3 className="text-xl font-bold mb-4 px-4 py-3 -mx-4 -mt-4 rounded-t-lg"
              style={themeColor ? { backgroundColor: `${themeColor}1A` } : undefined}>
            {labels.netWorthOverTime}
          </h3>
          <NetWorthChart
            dataPoints={results.dataPoints}
            currencySymbol={countryConfig.currencySymbol}
            breakEvenYear={results.breakEven.year}
            themeColor={themeColor}
            labels={{
              chartTitle: labels.chartTitle,
              chartSubtitle: labels.chartSubtitle,
              chartAxisYear: labels.chartAxisYear,
              chartAxisAmount: labels.chartAxisAmount,
            }}
          />
        </div>
        
        <div className="lg:hidden"><AdContainer slot="mobile-secondary" /></div>
        <BreakdownTable finalYearData={finalYearData} currencySymbol={countryConfig.currencySymbol} downPayment={downPayment} closingCosts={closingCosts} monthlyMortgage={monthlyMortgage} monthlyRent={monthlyRent} />
        <InsightEngine breakEvenYear={results.breakEven.year ?? 30} totalSavings={results.summary.finalOwnerNetWorth - results.summary.finalRenterNetWorth} buyingPower={results.summary.finalOwnerNetWorth} currencySymbol={countryConfig.currencySymbol} />
        <AdContainer slot="mobile" />
      </div>


      {/* --- DESKTOP LAYOUT (Inputs Left, Results Right) --- */}
      <div className="hidden lg:grid lg:grid-cols-5 lg:gap-8">
        
        {/* LEFT COLUMN: Inputs (SCROLLABLE, NOT STICKY) */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm p-6 space-y-6 border border-gray-100 dark:border-slate-800"
               style={themeColor ? { borderTopWidth: '6px', borderTopColor: themeColor, borderTopStyle: 'solid' } : undefined}>
            <h2 className="text-2xl font-bold px-4 py-3 -mx-4 -mt-4 mb-4 rounded-t-lg"
                style={themeColor ? { backgroundColor: `${themeColor}1A` } : undefined}>
              {labels.adjustScenario}
            </h2>
            <QuickInputs
              cityName={cityName}
              homePrice={homePrice}
              monthlyRent={monthlyRent}
              currencySymbol={countryConfig.currencySymbol}
              onHomePriceChange={setHomePrice}
              onMonthlyRentChange={setMonthlyRent}
              labels={{ homePrice: labels.homePrice, monthlyRent: labels.monthlyRent }}
            />
            {/* Desktop: Always Visible Advanced Settings */}
            <div className="pt-4 border-t border-gray-100 dark:border-slate-700">
              <AdvancedSettings {...advancedSettingsProps} />
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Results & Chart (STICKY) */}
        <div className="lg:col-span-3 space-y-6">
          <div className="sticky top-6 space-y-6">
            <ResultsDisplay
              breakEven={results.breakEven}
              recommendation={results.summary.recommendation}
              cityName={cityName}
              dataUpdated={dataUpdated}
              themeColor={themeColor}
              currentState={{
                homePrice, monthlyRent, downPaymentPercent, interestRate, loanTermYears,
                propertyTaxRate, maintenanceRate, rentInflationRate, investmentReturnRate,
                marginalTaxRate, yearsToPlot,
              }}
              defaultInputs={{ homePrice: defaultHomePrice, monthlyRent: defaultMonthlyRent, ...defaultInputs }}
              pathname={pathname}
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
                resultScenarioPrefix: labels.resultScenarioPrefix,
              }}
              dataSourceName={countryConfig.dataSourceName}
              dataSourceUrl={countryConfig.dataSourceUrl}
            />

            <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm p-6 border border-gray-100 dark:border-slate-800"
                 style={themeColor ? { borderTopWidth: '6px', borderTopColor: themeColor, borderTopStyle: 'solid' } : undefined}>
              <h3 className="text-xl font-bold mb-4 px-4 py-3 -mx-4 -mt-4 rounded-t-lg"
                  style={themeColor ? { backgroundColor: `${themeColor}1A` } : undefined}>
                {labels.netWorthOverTime}
              </h3>
              <NetWorthChart
                dataPoints={results.dataPoints}
                currencySymbol={countryConfig.currencySymbol}
                breakEvenYear={results.breakEven.year}
                themeColor={themeColor}
                labels={{
                  chartTitle: labels.chartTitle,
                  chartSubtitle: labels.chartSubtitle,
                  chartAxisYear: labels.chartAxisYear,
                  chartAxisAmount: labels.chartAxisAmount,
                }}
              />
            </div>
          </div>
        </div>
        
        {/* BOTTOM FULL WIDTH: Table & Insights */}
        <div className="lg:col-span-5 space-y-8 pt-8 border-t border-gray-200 dark:border-slate-700">
           <BreakdownTable finalYearData={finalYearData} currencySymbol={countryConfig.currencySymbol} downPayment={downPayment} closingCosts={closingCosts} monthlyMortgage={monthlyMortgage} monthlyRent={monthlyRent} />
           <InsightEngine breakEvenYear={results.breakEven.year ?? 30} totalSavings={results.summary.finalOwnerNetWorth - results.summary.finalRenterNetWorth} buyingPower={results.summary.finalOwnerNetWorth} currencySymbol={countryConfig.currencySymbol} />
        </div>
      </div>
    </>
  );
}