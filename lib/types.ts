/**
 * Type definitions for the RentOrBuy-Pro calculator
 * Supports international markets with country-specific defaults
 */

export type CountryCode = 'US' | 'FR' | 'DE' | 'GB';

export interface CountryDefaults {
  countryCode: CountryCode;
  currencySymbol: string;
  closingCostRate: number; // As decimal (0.03 = 3%)
  propertyTaxRate: number; // As decimal (0.011 = 1.1%)
  brokerFeeMonths: number; // Number of months rent
  marginaTaxRate: number; // Default marginal tax rate
  labels: {
    closingCosts: string;
    propertyTax: string;
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
