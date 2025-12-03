/**
 * Country-specific configurations for international support
 * Based on SPECIFICATION: BUSINESS LOGIC & USER FLOW
 */

import { CountryCode, CountryDefaults } from './types';

export const COUNTRY_CONFIGS: Record<CountryCode, CountryDefaults> = {
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
export function getCountryConfig(countryCode: CountryCode): CountryDefaults {
  return COUNTRY_CONFIGS[countryCode];
}

/**
 * Get default calculator inputs for a country
 */
export function getDefaultInputsForCountry(
  countryCode: CountryCode,
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
