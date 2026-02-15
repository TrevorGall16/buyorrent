'use client';

/**
 * Main Calculator Component
 * FIXED: Infinite Re-render Loop & Language Persistence
 * * ✅ URL Sync: Now preserves 'lang' and other existing params
 * ✅ Loop Prevention: Checks if URL actually changed before replacing
 * ✅ Input validation: Prevents NaN/Infinity attacks
 * ✅ Performance: Consolidated debouncing and memoization
 */

import { useState, useEffect, useMemo, useRef } from 'react';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
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
import AdsterraNative from '../../components/ads/AdsterraNative';

interface CalculatorProps {
  cityName: string;
  countryCode: CountryCode;
  defaultHomePrice: number;
  defaultMonthlyRent: number;
  dataUpdated?: string;
  themeColor?: string;
  language?: 'en' | 'fr' | 'de' | 'es' | 'it' | 'nl' | 'sv' | 'pt';
}

/**
 * Validated URL parameter parser
 */
function parseValidatedParam(
  searchParams: URLSearchParams,
  key: string,
  defaultValue: number,
  min: number = -Infinity,
  max: number = Infinity
): number {
  const value = searchParams.get(key);
  if (!value) return defaultValue;

  const parsed = parseFloat(value);

  if (!isFinite(parsed) || isNaN(parsed)) {
    return defaultValue;
  }

  return Math.max(min, Math.min(max, parsed));
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
  const router = useRouter();

  const isMountedRef = useRef(false);
  const lastInternalUrlRef = useRef<string | null>(null);
  const isUpdatingFromUrlRef = useRef(false);

  // Parse with validation and realistic bounds
  const [homePrice, setHomePrice] = useState(() => 
    parseValidatedParam(searchParams, 'price', defaultHomePrice, 10000, 100000000)
  );
  const [monthlyRent, setMonthlyRent] = useState(() => 
    parseValidatedParam(searchParams, 'rent', defaultMonthlyRent, 100, 100000)
  );
  const [downPaymentPercent, setDownPaymentPercent] = useState(() => 
    parseValidatedParam(searchParams, 'down', defaultInputs.purchase.downPaymentPercent, 0, 1)
  );
  const [interestRate, setInterestRate] = useState(() => 
    parseValidatedParam(searchParams, 'rate', defaultInputs.purchase.interestRate, 0, 0.25)
  );
  const [loanTermYears, setLoanTermYears] = useState(() => 
    parseValidatedParam(searchParams, 'term', defaultInputs.purchase.loanTermYears, 1, 50)
  );
  const [propertyTaxRate, setPropertyTaxRate] = useState(() => 
    parseValidatedParam(searchParams, 'tax', defaultInputs.purchase.propertyTaxRate, 0, 0.1)
  );
  const [maintenanceRate, setMaintenanceRate] = useState(() => 
    parseValidatedParam(searchParams, 'maint', defaultInputs.purchase.maintenanceRate, 0, 0.1)
  );
  const [rentInflationRate, setRentInflationRate] = useState(() => 
    parseValidatedParam(searchParams, 'rinfl', defaultInputs.rental.rentInflationRate, -0.1, 0.3)
  );
  const [investmentReturnRate, setInvestmentReturnRate] = useState(() => 
    parseValidatedParam(searchParams, 'invest', defaultInputs.financial.investmentReturnRate, -0.5, 0.5)
  );
  const [marginalTaxRate, setMarginalTaxRate] = useState(() => 
    parseValidatedParam(searchParams, 'mtax', defaultInputs.financial.marginalTaxRate, 0, 0.7)
  );
  const [yearsToPlot, setYearsToPlot] = useState(() =>
    parseValidatedParam(searchParams, 'years', 30, 1, 50)
  );
  const [homeAppreciationRate, setHomeAppreciationRate] = useState(() =>
    parseValidatedParam(searchParams, 'apprc', 0.03, 0, 0.08)
  );
  const [capitalGainsTaxRate, setCapitalGainsTaxRate] = useState(() =>
    parseValidatedParam(searchParams, 'cgtax', 0.15, 0, 0.5)
  );

  const [isAdvancedOpen, setIsAdvancedOpen] = useState(false);
  const [results, setResults] = useState<CalculationResult | null>(null);

  // Save/Load Scenario State
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saved' | 'loaded'>('idle');
  const hasLoadedFromStorage = useRef(false);

  // Track mounted state
  useEffect(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  // ---------------------------------------------------------
  // SAVE & LOAD SCENARIO (localStorage)
  // ---------------------------------------------------------
  const storageKey = `rentorbuy_data_${cityName.toLowerCase().replace(/[^a-z0-9]/g, '_')}`;

  // Load saved scenario on mount (after hydration to avoid mismatch)
  // IMPORTANT: If URL has calculator params, those take priority over localStorage.
  useEffect(() => {
    if (hasLoadedFromStorage.current) return;
    hasLoadedFromStorage.current = true;

    // Count calculator-specific params (exclude 'lang' and other non-calculator params)
    const calcParamKeys = ['price', 'rent', 'down', 'rate', 'term', 'tax', 'maint', 'rinfl', 'invest', 'mtax', 'years', 'apprc', 'cgtax'];
    const hasUrlCalcParams = calcParamKeys.some(key => searchParams.has(key));
    if (hasUrlCalcParams) return; // URL params win — do not load from localStorage

    try {
      const savedData = localStorage.getItem(storageKey);
      if (!savedData) return;

      const parsed = JSON.parse(savedData);

      // Validate and apply saved values with bounds checking
      if (typeof parsed.homePrice === 'number' && parsed.homePrice >= 10000 && parsed.homePrice <= 100000000) {
        setHomePrice(parsed.homePrice);
      }
      if (typeof parsed.monthlyRent === 'number' && parsed.monthlyRent >= 100 && parsed.monthlyRent <= 100000) {
        setMonthlyRent(parsed.monthlyRent);
      }
      if (typeof parsed.downPaymentPercent === 'number' && parsed.downPaymentPercent >= 0 && parsed.downPaymentPercent <= 1) {
        setDownPaymentPercent(parsed.downPaymentPercent);
      }
      if (typeof parsed.interestRate === 'number' && parsed.interestRate >= 0 && parsed.interestRate <= 0.25) {
        setInterestRate(parsed.interestRate);
      }
      if (typeof parsed.loanTermYears === 'number' && parsed.loanTermYears >= 1 && parsed.loanTermYears <= 50) {
        setLoanTermYears(parsed.loanTermYears);
      }
      if (typeof parsed.propertyTaxRate === 'number' && parsed.propertyTaxRate >= 0 && parsed.propertyTaxRate <= 0.1) {
        setPropertyTaxRate(parsed.propertyTaxRate);
      }
      if (typeof parsed.maintenanceRate === 'number' && parsed.maintenanceRate >= 0 && parsed.maintenanceRate <= 0.1) {
        setMaintenanceRate(parsed.maintenanceRate);
      }
      if (typeof parsed.rentInflationRate === 'number' && parsed.rentInflationRate >= -0.1 && parsed.rentInflationRate <= 0.3) {
        setRentInflationRate(parsed.rentInflationRate);
      }
      if (typeof parsed.investmentReturnRate === 'number' && parsed.investmentReturnRate >= -0.5 && parsed.investmentReturnRate <= 0.5) {
        setInvestmentReturnRate(parsed.investmentReturnRate);
      }
      if (typeof parsed.marginalTaxRate === 'number' && parsed.marginalTaxRate >= 0 && parsed.marginalTaxRate <= 0.7) {
        setMarginalTaxRate(parsed.marginalTaxRate);
      }
      if (typeof parsed.yearsToPlot === 'number' && parsed.yearsToPlot >= 1 && parsed.yearsToPlot <= 50) {
        setYearsToPlot(parsed.yearsToPlot);
      }
      if (typeof parsed.homeAppreciationRate === 'number' && parsed.homeAppreciationRate >= 0 && parsed.homeAppreciationRate <= 0.08) {
        setHomeAppreciationRate(parsed.homeAppreciationRate);
      }
      if (typeof parsed.capitalGainsTaxRate === 'number' && parsed.capitalGainsTaxRate >= 0 && parsed.capitalGainsTaxRate <= 0.5) {
        setCapitalGainsTaxRate(parsed.capitalGainsTaxRate);
      }

      // Show "loaded" feedback briefly
      setSaveStatus('loaded');
      setTimeout(() => setSaveStatus('idle'), 2500);
    } catch {
      // Silently fail if localStorage is unavailable or data is corrupted
      console.warn('Could not load saved scenario from localStorage');
    }
  }, [storageKey, searchParams]);

  // Save scenario handler
  const handleSaveScenario = () => {
    try {
      const dataToSave = {
        homePrice,
        monthlyRent,
        downPaymentPercent,
        interestRate,
        loanTermYears,
        propertyTaxRate,
        maintenanceRate,
        rentInflationRate,
        investmentReturnRate,
        marginalTaxRate,
        yearsToPlot,
        homeAppreciationRate,
        capitalGainsTaxRate,
        savedAt: new Date().toISOString(),
      };
      localStorage.setItem(storageKey, JSON.stringify(dataToSave));
      setSaveStatus('saved');
      setTimeout(() => setSaveStatus('idle'), 2500);
    } catch {
      console.warn('Could not save scenario to localStorage');
    }
  };

  // Consolidated debouncing
  const inputsSnapshot = useMemo(() => ({
    homePrice,
    monthlyRent,
    downPaymentPercent,
    interestRate,
    propertyTaxRate,
    maintenanceRate,
    rentInflationRate,
    investmentReturnRate,
    marginalTaxRate,
    homeAppreciationRate,
    capitalGainsTaxRate,
  }), [
    homePrice, monthlyRent, downPaymentPercent, interestRate,
    propertyTaxRate, maintenanceRate, rentInflationRate,
    investmentReturnRate, marginalTaxRate,
    homeAppreciationRate, capitalGainsTaxRate,
  ]);

  const debouncedInputs = useDebounce(inputsSnapshot, 300);

  // Calculate results
  useEffect(() => {
    if (!isMountedRef.current) return;

    const calculationInputs = {
      purchase: {
        homePrice: debouncedInputs.homePrice,
        downPaymentPercent: debouncedInputs.downPaymentPercent,
        interestRate: debouncedInputs.interestRate,
        loanTermYears,
        closingCostRate: countryConfig.closingCostRate,
        propertyTaxRate: debouncedInputs.propertyTaxRate,
        maintenanceRate: debouncedInputs.maintenanceRate,
      },
      rental: {
        monthlyRent: debouncedInputs.monthlyRent,
        securityDepositMonths: 1,
        brokerFeeMonths: countryConfig.brokerFeeMonths,
        rentInflationRate: debouncedInputs.rentInflationRate,
      },
      financial: {
        investmentReturnRate: debouncedInputs.investmentReturnRate,
        marginalTaxRate: debouncedInputs.marginalTaxRate,
        capitalGainsTaxRate: debouncedInputs.capitalGainsTaxRate,
      },
      yearsToAnalyze: yearsToPlot,
      countryCode,
    };
    setResults(calculateRentVsBuy(calculationInputs, debouncedInputs.homeAppreciationRate));
  }, [debouncedInputs, loanTermYears, yearsToPlot, countryConfig, countryCode]);

  // Keep component state in sync when URL changes externally (e.g., back/forward navigation)
  useEffect(() => {
    if (!isMountedRef.current) return;

    const currentQuery = searchParams.toString();
    if (lastInternalUrlRef.current === currentQuery) {
      lastInternalUrlRef.current = null;
      return;
    }

    const nextHomePrice = parseValidatedParam(searchParams, 'price', defaultHomePrice, 10000, 100000000);
    const nextMonthlyRent = parseValidatedParam(searchParams, 'rent', defaultMonthlyRent, 100, 100000);
    const nextDownPaymentPercent = parseValidatedParam(searchParams, 'down', defaultInputs.purchase.downPaymentPercent, 0, 1);
    const nextInterestRate = parseValidatedParam(searchParams, 'rate', defaultInputs.purchase.interestRate, 0, 0.25);
    const nextLoanTermYears = parseValidatedParam(searchParams, 'term', defaultInputs.purchase.loanTermYears, 1, 50);
    const nextPropertyTaxRate = parseValidatedParam(searchParams, 'tax', defaultInputs.purchase.propertyTaxRate, 0, 0.1);
    const nextMaintenanceRate = parseValidatedParam(searchParams, 'maint', defaultInputs.purchase.maintenanceRate, 0, 0.1);
    const nextRentInflationRate = parseValidatedParam(searchParams, 'rinfl', defaultInputs.rental.rentInflationRate, -0.1, 0.3);
    const nextInvestmentReturnRate = parseValidatedParam(searchParams, 'invest', defaultInputs.financial.investmentReturnRate, -0.5, 0.5);
    const nextMarginalTaxRate = parseValidatedParam(searchParams, 'mtax', defaultInputs.financial.marginalTaxRate, 0, 0.7);
    const nextYearsToPlot = parseValidatedParam(searchParams, 'years', 30, 1, 50);
    const nextHomeAppreciationRate = parseValidatedParam(searchParams, 'apprc', 0.03, 0, 0.08);
    const nextCapitalGainsTaxRate = parseValidatedParam(searchParams, 'cgtax', 0.15, 0, 0.5);

    isUpdatingFromUrlRef.current = true;

    setHomePrice((prev) => (prev !== nextHomePrice ? nextHomePrice : prev));
    setMonthlyRent((prev) => (prev !== nextMonthlyRent ? nextMonthlyRent : prev));
    setDownPaymentPercent((prev) => (Math.abs(prev - nextDownPaymentPercent) > 0.00001 ? nextDownPaymentPercent : prev));
    setInterestRate((prev) => (Math.abs(prev - nextInterestRate) > 0.00001 ? nextInterestRate : prev));
    setLoanTermYears((prev) => (prev !== nextLoanTermYears ? nextLoanTermYears : prev));
    setPropertyTaxRate((prev) => (Math.abs(prev - nextPropertyTaxRate) > 0.00001 ? nextPropertyTaxRate : prev));
    setMaintenanceRate((prev) => (Math.abs(prev - nextMaintenanceRate) > 0.00001 ? nextMaintenanceRate : prev));
    setRentInflationRate((prev) => (Math.abs(prev - nextRentInflationRate) > 0.00001 ? nextRentInflationRate : prev));
    setInvestmentReturnRate((prev) => (Math.abs(prev - nextInvestmentReturnRate) > 0.00001 ? nextInvestmentReturnRate : prev));
    setMarginalTaxRate((prev) => (Math.abs(prev - nextMarginalTaxRate) > 0.00001 ? nextMarginalTaxRate : prev));
    setYearsToPlot((prev) => (prev !== nextYearsToPlot ? nextYearsToPlot : prev));
    setHomeAppreciationRate((prev) => (Math.abs(prev - nextHomeAppreciationRate) > 0.00001 ? nextHomeAppreciationRate : prev));
    setCapitalGainsTaxRate((prev) => (Math.abs(prev - nextCapitalGainsTaxRate) > 0.00001 ? nextCapitalGainsTaxRate : prev));

    queueMicrotask(() => {
      isUpdatingFromUrlRef.current = false;
    });
  }, [searchParams, defaultHomePrice, defaultMonthlyRent, defaultInputs]);

  // Snapshot for URL syncing
  const urlStateSnapshot = useMemo(() => ({
    homePrice,
    monthlyRent,
    downPaymentPercent,
    interestRate,
    loanTermYears,
    propertyTaxRate,
    maintenanceRate,
    rentInflationRate,
    investmentReturnRate,
    marginalTaxRate,
    yearsToPlot,
    homeAppreciationRate,
    capitalGainsTaxRate,
  }), [
    homePrice, monthlyRent, downPaymentPercent, interestRate, loanTermYears,
    propertyTaxRate, maintenanceRate, rentInflationRate, investmentReturnRate,
    marginalTaxRate, yearsToPlot, homeAppreciationRate, capitalGainsTaxRate,
  ]);

  const debouncedUrlState = useDebounce(urlStateSnapshot, 800);

  // ------------------------------------------------------------
  // ✅ FIXED: URL Synchronization Logic (Prevents Loops)
  // ------------------------------------------------------------
  useEffect(() => {
    if (!isMountedRef.current || isUpdatingFromUrlRef.current) return;

    // 1. Clone EXISTING params to preserve 'lang'
    const params = new URLSearchParams(searchParams.toString());

    // 2. Update specific calculator keys
    const updateParam = (key: string, value: number, defaultVal: number, precision: number = 0, threshold: number = 0.001) => {
      if (Math.abs(value - defaultVal) > threshold) {
        params.set(key, precision === 0 ? Math.round(value).toString() : value.toFixed(precision));
      } else {
        params.delete(key); // Remove default values to keep URL clean
      }
    };

    updateParam('price', debouncedUrlState.homePrice, defaultHomePrice, 0, 1000);
    updateParam('rent', debouncedUrlState.monthlyRent, defaultMonthlyRent, 0, 50);
    updateParam('down', debouncedUrlState.downPaymentPercent, defaultInputs.purchase.downPaymentPercent, 2, 0.01);
    updateParam('rate', debouncedUrlState.interestRate, defaultInputs.purchase.interestRate, 4, 0.001);

    if (debouncedUrlState.loanTermYears !== defaultInputs.purchase.loanTermYears) {
      params.set('term', debouncedUrlState.loanTermYears.toString());
    } else {
      params.delete('term');
    }

    updateParam('tax', debouncedUrlState.propertyTaxRate, defaultInputs.purchase.propertyTaxRate, 4, 0.001);
    updateParam('maint', debouncedUrlState.maintenanceRate, defaultInputs.purchase.maintenanceRate, 4, 0.001);
    updateParam('rinfl', debouncedUrlState.rentInflationRate, defaultInputs.rental.rentInflationRate, 4, 0.001);
    updateParam('invest', debouncedUrlState.investmentReturnRate, defaultInputs.financial.investmentReturnRate, 4, 0.001);
    updateParam('mtax', debouncedUrlState.marginalTaxRate, defaultInputs.financial.marginalTaxRate, 4, 0.001);
    updateParam('apprc', debouncedUrlState.homeAppreciationRate, 0.03, 4, 0.001);
    updateParam('cgtax', debouncedUrlState.capitalGainsTaxRate, 0.15, 4, 0.001);

    if (debouncedUrlState.yearsToPlot !== 30) {
      params.set('years', debouncedUrlState.yearsToPlot.toString());
    } else {
      params.delete('years');
    }

    // 3. STOP THE LOOP: Only replace if the URL *actually* changes
    if (params.toString() === searchParams.toString()) {
      return;
    }

    const newUrl = params.toString() ? `${pathname}?${params.toString()}` : pathname;
    
    try {
      lastInternalUrlRef.current = params.toString();
      router.replace(newUrl, { scroll: false });
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        console.warn('https://www.sync.com/ Browser blocked URL update:', error);
      }
    }
  }, [debouncedUrlState, pathname, router, defaultHomePrice, defaultMonthlyRent, defaultInputs, searchParams]);

  // Memoized financial calculations
  const financialMetrics = useMemo(() => {
    if (!results) return null;
    
    const downPayment = homePrice * downPaymentPercent;
    const closingCosts = homePrice * countryConfig.closingCostRate;
    const loanAmount = homePrice - downPayment;
    const monthlyMortgage = calculateMonthlyMortgagePayment(loanAmount, interestRate, loanTermYears);
    const finalYearData = results.dataPoints[results.dataPoints.length - 1];

    return {
      downPayment,
      closingCosts,
      loanAmount,
      monthlyMortgage,
      finalYearData,
    };
  }, [homePrice, downPaymentPercent, interestRate, loanTermYears, countryConfig.closingCostRate, results]);

  const advancedSettingsProps = useMemo(() => ({
    downPaymentPercent: downPaymentPercent * 100,
    interestRate: interestRate * 100,
    loanTermYears,
    propertyTaxRate: propertyTaxRate * 100,
    maintenanceRate: maintenanceRate * 100,
    rentInflationRate: rentInflationRate * 100,
    investmentReturnRate: investmentReturnRate * 100,
    marginalTaxRate: marginalTaxRate * 100,
    homeAppreciationRate: homeAppreciationRate * 100,
    capitalGainsTaxRate: capitalGainsTaxRate * 100,
    yearsToPlot,
    onDownPaymentChange: setDownPaymentPercent,
    onInterestRateChange: setInterestRate,
    onLoanTermChange: setLoanTermYears,
    onPropertyTaxChange: setPropertyTaxRate,
    onMaintenanceChange: setMaintenanceRate,
    onRentInflationChange: setRentInflationRate,
    onInvestmentReturnChange: setInvestmentReturnRate,
    onMarginalTaxChange: setMarginalTaxRate,
    onHomeAppreciationChange: setHomeAppreciationRate,
    onCapitalGainsTaxChange: setCapitalGainsTaxRate,
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
  }), [
    downPaymentPercent, interestRate, loanTermYears, propertyTaxRate,
    maintenanceRate, rentInflationRate, investmentReturnRate, marginalTaxRate,
    homeAppreciationRate, capitalGainsTaxRate,
    yearsToPlot, labels
  ]);

  if (!results || !financialMetrics) {
    return (
      <div className="space-y-6">
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm p-8 border border-gray-100 dark:border-slate-800">
          <div className="flex items-center gap-3 mb-4">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
            <p className="text-gray-700 dark:text-gray-300 text-lg">
              Calculating your rent vs buy analysis for {cityName}...
            </p>
          </div>
          <p className="text-gray-500 text-sm">
            Analyzing {yearsToPlot} years of financial projections with {countryConfig.currencySymbol}
            {Math.round(homePrice).toLocaleString()} home price and {countryConfig.currencySymbol}
            {Math.round(monthlyRent).toLocaleString()}/month rent.
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* --- MOBILE LAYOUT --- */}
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
          <div className="border border-gray-100 dark:border-slate-800 rounded-lg p-4 mt-4">
            <button
              onClick={() => setIsAdvancedOpen(!isAdvancedOpen)}
              className="flex justify-between items-center w-full font-bold text-lg text-slate-900 dark:text-slate-50 py-1"
            >
              {labels.advancedSettings}
              <span className="text-xl transition-transform duration-300 transform">
                {isAdvancedOpen ? '▲' : '▼'}
              </span>
            </button>
            {isAdvancedOpen && (
              <div className="pt-4">
                <AdvancedSettings {...advancedSettingsProps} />
              </div>
            )}
          </div>

          {/* Save Scenario Button */}
          <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-slate-700">
            <button
              onClick={handleSaveScenario}
              className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 rounded-lg transition-all duration-200 active:scale-95"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
              </svg>
              Save Scenario
            </button>
            {saveStatus !== 'idle' && (
              <span className={`text-sm font-medium px-3 py-1 rounded-full transition-all duration-300 ${
                saveStatus === 'saved'
                  ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                  : 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'
              }`}>
                {saveStatus === 'saved' ? 'Saved!' : 'Loaded from last visit'}
              </span>
            )}
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
        
        <div className="my-12 min-h-[280px] flex items-center justify-center">
          <AdContainer slot="mobile-secondary" />
        </div>

        <BreakdownTable
          finalYearData={financialMetrics.finalYearData}
          currencySymbol={countryConfig.currencySymbol}
          downPayment={financialMetrics.downPayment}
          closingCosts={financialMetrics.closingCosts}
          monthlyMortgage={financialMetrics.monthlyMortgage}
          monthlyRent={monthlyRent}
          yearsToPlot={yearsToPlot}
          homeAppreciationRate={homeAppreciationRate}
          investmentReturnRate={investmentReturnRate}
        />

        <InsightEngine
          breakEvenYear={results.breakEven.year ?? 30}
        />

        <div className="my-12 min-h-[280px] flex items-center justify-center">
          <AdContainer slot="mobile" />
        </div>
      </div>

      {/* --- DESKTOP LAYOUT --- */}
      <div className="hidden lg:grid lg:grid-cols-5 lg:gap-8">
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
            <div className="pt-4 border-t border-gray-100 dark:border-slate-700">
              <AdvancedSettings {...advancedSettingsProps} />
            </div>

            {/* Save Scenario Button */}
            <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-slate-700">
              <button
                onClick={handleSaveScenario}
                className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 rounded-lg transition-all duration-200 active:scale-95"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
                </svg>
                Save Scenario
              </button>
              {saveStatus !== 'idle' && (
                <span className={`text-sm font-medium px-3 py-1 rounded-full transition-all duration-300 ${
                  saveStatus === 'saved'
                    ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                    : 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'
                }`}>
                  {saveStatus === 'saved' ? 'Saved!' : 'Loaded from last visit'}
                </span>
              )}
            </div>
          </div>
        </div>

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
        
        <div className="lg:col-span-5 space-y-8 pt-8 border-t border-gray-200 dark:border-slate-700">
           <BreakdownTable
             finalYearData={financialMetrics.finalYearData}
             currencySymbol={countryConfig.currencySymbol}
             downPayment={financialMetrics.downPayment}
             closingCosts={financialMetrics.closingCosts}
             monthlyMortgage={financialMetrics.monthlyMortgage}
             monthlyRent={monthlyRent}
             yearsToPlot={yearsToPlot}
             homeAppreciationRate={homeAppreciationRate}
             investmentReturnRate={investmentReturnRate}
           />
           <InsightEngine
             breakEvenYear={results.breakEven.year ?? 30}
           />

           {/* ✅ ADSTERRA PLACEMENT: After the results */}
           <div className="pt-8 border-t border-gray-100 dark:border-slate-800">
              <p className="text-center text-xs text-slate-400 mb-4 uppercase tracking-widest">Sponsored Insights</p>
              <AdsterraNative id="2597a491661d74469343b74e567c377a" />
           </div>
        </div>
      </div>
    </>
  );
}
