/**
 * Country-specific configurations for international support
 * Based on SPECIFICATION: BUSINESS LOGIC & USER FLOW
 */

import { CountryDefaults } from './types';

export const COUNTRY_CONFIGS = {
  US: {
    countryCode: 'US',
    currencySymbol: '$',
    closingCostRate: 0.03, // 3% - Buyer pays
    propertyTaxRate: 0.011, // 1.1% average
    brokerFeeMonths: 0, // Seller typically pays
    marginaTaxRate: 0.25, // 25% default
    labels: {
      closingCosts: 'Closing Costs',
      propertyTax: 'Property Tax',
    },
  },
  FR: {
    countryCode: 'FR',
    currencySymbol: '€',
    closingCostRate: 0.075, // 7.5% - Frais de Notaire (old build)
    propertyTaxRate: 0.008, // ~0.8% - Taxe Foncière
    brokerFeeMonths: 0,
    marginaTaxRate: 0.30, // 30% default
    labels: {
      closingCosts: 'Frais de Notaire',
      propertyTax: 'Taxe Foncière',
    },
  },
  DE: {
    countryCode: 'DE',
    currencySymbol: '€',
    closingCostRate: 0.12, // 12% - Kaufnebenkosten (Notary + Transfer Tax + Agent)
    propertyTaxRate: 0.0035, // ~0.35% - Grundsteuer
    brokerFeeMonths: 1, // Common in Germany
    marginaTaxRate: 0.35, // 35% default
    labels: {
      closingCosts: 'Kaufnebenkosten',
      propertyTax: 'Grundsteuer',
    },
  },
  GB: {
    countryCode: 'GB',
    currencySymbol: '£',
    closingCostRate: 0.04, // 4% average including Stamp Duty (varies by price)
    propertyTaxRate: 0.015, // ~1.5% - Council Tax equivalent
    brokerFeeMonths: 0,
    marginaTaxRate: 0.40, // 40% higher rate
    labels: {
      closingCosts: 'Stamp Duty & Legal Fees',
      propertyTax: 'Council Tax',
    },
  },
};

/**
 * Get country configuration by country code
 */
export function getCountryConfig(countryCode: string): CountryDefaults {
  return COUNTRY_CONFIGS[countryCode as keyof typeof COUNTRY_CONFIGS] as CountryDefaults;
}

/**
 * Get default calculator inputs for a country
 */
export function getDefaultInputsForCountry(
  countryCode: string,
  homePrice: number,
  monthlyRent: number
) {
  const config = getCountryConfig(countryCode);

  return {
    purchase: {
      homePrice,
      downPaymentPercent: 0.20, // 20% standard
      interestRate: 0.065, // 6.5% standard
      loanTermYears: 30,
      closingCostRate: config.closingCostRate,
      propertyTaxRate: config.propertyTaxRate,
      maintenanceRate: 0.01, // 1% annually
    },
    rental: {
      monthlyRent,
      securityDepositMonths: 1,
      brokerFeeMonths: config.brokerFeeMonths,
      rentInflationRate: 0.03, // 3% annually
    },
    financial: {
      investmentReturnRate: 0.05, // 5% opportunity cost
      marginalTaxRate: config.marginaTaxRate,
    },
    yearsToAnalyze: 30,
  };
}

/**
 * Get country name with flag emoji by country code
 */
export function getCountryName(code: string): string {
  const map: Record<string, string> = {
    'US': 'United States 🇺🇸',
    'FR': 'France 🇫🇷',
    'DE': 'Germany 🇩🇪',
    'GB': 'United Kingdom 🇬🇧',
    'CA': 'Canada 🇨🇦',
    'AU': 'Australia 🇦🇺',
    'ES': 'Spain 🇪🇸',
    'IT': 'Italy 🇮🇹',
    'NL': 'Netherlands 🇳🇱',
    'SE': 'Sweden 🇸🇪',
    'CH': 'Switzerland 🇨🇭',
    'BE': 'Belgium 🇧🇪',
    'IE': 'Ireland 🇮🇪',
    'PT': 'Portugal 🇵🇹'
  };
  return map[code] || 'Other';
}

/**
 * Get theme color for each country
 */
export function getCountryThemeColor(code: string): string {
  const colorMap: Record<string, string> = {
    'US': '#2563EB',  // Blue
    'FR': '#002654',  // Navy
    'DE': '#DD0000',  // Red
    'GB': '#C8102E',  // Crimson
    'CA': '#FF0000',  // Red
    'AU': '#00843D',  // Green
    'ES': '#C60B1E',  // Spanish Red
    'IT': '#009246',  // Italian Green
    'NL': '#FF9B00',  // Dutch Orange
    'SE': '#006AA7',  // Swedish Blue
    'CH': '#FF0000',  // Swiss Red
    'BE': '#FDDA24',  // Belgian Yellow
    'IE': '#169B62',  // Irish Green
    'PT': '#006600',  // Portuguese Green
  };
  return colorMap[code] || '#3b82f6'; // Default blue
}
