/**
 * Type definitions for the RentOrBuy-Pro calculator
 * Supports international markets with country-specific defaults
 */

export type CountryCode = 'US' | 'FR' | 'DE' | 'GB' | 'CA' | 'AU' | 'ES' | 'IT' | 'NL' | 'SE' | 'CH' | 'BE' | 'IE' | 'PT';

export interface CountryDefaults {
  countryCode: CountryCode;
  currencySymbol: string;
  closingCostRate: number; // As decimal (0.03 = 3%)
  propertyTaxRate: number; // As decimal (0.011 = 1.1%)
  brokerFeeMonths: number; // Number of months rent
  marginaTaxRate: number; // Default marginal tax rate
  dataSourceName: string; // e.g., "Zillow, Redfin, Federal Reserve"
  dataSourceUrl: string; // URL to primary data source
  labels: {
    closingCosts: string;
    propertyTax: string;
    homePrice: string;
    monthlyRent: string;
    downPayment: string;
    interestRate: string;
    loanTerm: string;
    maintenanceRate: string;
    rentInflation: string;
    investmentReturn: string;
    marginalTaxRate: string;
    advancedSettings: string;
    advancedSettingsSubtitle: string;
    adjustScenario: string;
    netWorthOverTime: string;
    detailedBreakdown: string;
    buyingBetter: string;
    rentingBetter: string;
    buyingBetterAfter: string;
    years: string;
    marketData: string;
    updated: string;
    buyingRecommended: string;
    rentingRecommended: string;
    roughlyEquivalent: string;
    buyingMessage: string;
    rentingMessage: string;
    stayAtLeast: string;
    forBuyingToMakeSense: string;
    and: string;
    months: string;
    resultScenarioPrefix: string;
    chartTitle: string;
    chartSubtitle: string;
    chartAxisYear: string;
    chartAxisAmount: string;
  };
}

export interface PurchaseInputs {
  homePrice: number;
  downPaymentPercent: number; // As decimal (0.20 = 20%)
  interestRate: number; // Annual rate as decimal (0.065 = 6.5%)
  loanTermYears: number; // 15 or 30
  closingCostRate: number; // As decimal
  propertyTaxRate: number; // Annual rate as decimal
  maintenanceRate: number; // Annual rate as decimal (0.01 = 1%)
}

export interface RentalInputs {
  monthlyRent: number;
  securityDepositMonths: number; // Number of months rent
  brokerFeeMonths: number; // Number of months rent
  rentInflationRate: number; // Annual rate as decimal (0.03 = 3%)
}

export interface FinancialInputs {
  investmentReturnRate: number; // Annual rate as decimal (0.05 = 5%)
  marginalTaxRate: number; // As decimal (0.25 = 25%)
}

export interface CalculatorInputs {
  purchase: PurchaseInputs;
  rental: RentalInputs;
  financial: FinancialInputs;
  yearsToAnalyze: number;
}

export interface YearlyDataPoint {
  year: number;
  renterNetWorth: number;
  ownerNetWorth: number;
  renterCumulativeCost: number;
  ownerCumulativeCost: number;
  renterInvestmentGrowth: number;
  homeEquity: number;
  homeValue: number;
  mortgageBalance: number;
}

export interface BreakEvenResult {
  year: number | null; // null if never breaks even
  month: number | null; // 0-11
  exactPoint: number | null; // Fractional year (e.g., 4.5)
}

export interface CalculationResult {
  dataPoints: YearlyDataPoint[];
  breakEven: BreakEvenResult;
  summary: {
    totalRenterCost: number;
    totalOwnerCost: number;
    finalRenterNetWorth: number;
    finalOwnerNetWorth: number;
    recommendation: 'buy' | 'rent' | 'neutral';
  };
}

// Navigation types for Header component
export interface NavigationItem {
  label: string;
  href: string;
  children?: { label: string; href: string }[];
}

// Footer label types
export interface FooterLabels {
  footerPrivacy: string;
  footerCopyright: string;
  footerBrandMission: string;
  footerToolsTitle: string;
  footerLearnMoreTitle: string;
  footerGlobalCalculator: string;
  footerTopCities: string;
  footerHowItWorks: string;
  footerDataSources: string;
}
