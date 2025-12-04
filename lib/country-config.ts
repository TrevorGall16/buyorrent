/**
 * Country-specific configurations for international support
 * Based on SPECIFICATION: BUSINESS LOGIC & USER FLOW
 */

import { CountryCode, CountryDefaults } from './types';

export const COUNTRY_CONFIGS: Record<CountryCode, CountryDefaults> = {
  US: {
    countryCode: 'US',
    currencySymbol: '$',
    closingCostRate: 0.03,
    propertyTaxRate: 0.011,
    brokerFeeMonths: 0,
    marginaTaxRate: 0.25,
    labels: {
      closingCosts: 'Closing Costs',
      propertyTax: 'Property Tax',
      homePrice: 'Home Price',
      monthlyRent: 'Monthly Rent',
      downPayment: 'Down Payment',
      interestRate: 'Interest Rate',
      loanTerm: 'Loan Term (Years)',
      maintenanceRate: 'Annual Maintenance',
      rentInflation: 'Annual Rent Increase',
      investmentReturn: 'Investment Return',
      marginalTaxRate: 'Tax Rate',
      advancedSettings: 'Advanced Settings',
      advancedSettingsSubtitle: 'Fine-tune assumptions for more accurate results',
      adjustScenario: 'Adjust Your Scenario',
      netWorthOverTime: 'Net Worth Over Time',
      detailedBreakdown: 'Detailed Breakdown',
      buyingBetter: 'Buying is Better',
      rentingBetter: 'Renting is Better',
      buyingBetterAfter: 'Buying is Better After',
      years: 'Years',
      marketData: 'Market Data',
      updated: 'Updated',
      buyingRecommended: 'Buying Recommended',
      rentingRecommended: 'Renting Recommended',
      roughlyEquivalent: 'Roughly Equivalent',
      buyingMessage: 'buying becomes financially better after approximately',
      rentingMessage: 'renting remains financially advantageous throughout the 30-year period based on current market conditions',
      stayAtLeast: 'you\'ll need to stay at least',
      forBuyingToMakeSense: 'for buying to make financial sense',
      and: 'and',
      months: 'months',
    },
  },
  FR: {
    countryCode: 'FR',
    currencySymbol: '€',
    closingCostRate: 0.075,
    propertyTaxRate: 0.008,
    brokerFeeMonths: 0,
    marginaTaxRate: 0.30,
    labels: {
      closingCosts: 'Frais de Notaire',
      propertyTax: 'Taxe Foncière',
      homePrice: 'Prix du Bien',
      monthlyRent: 'Loyer Mensuel',
      downPayment: 'Apport',
      interestRate: 'Taux d\'Intérêt',
      loanTerm: 'Durée du Prêt (Ans)',
      maintenanceRate: 'Entretien Annuel',
      rentInflation: 'Augmentation Loyer',
      investmentReturn: 'Rendement Investissement',
      marginalTaxRate: 'Taux d\'Imposition',
      advancedSettings: 'Paramètres Avancés',
      advancedSettingsSubtitle: 'Affinez les hypothèses pour des résultats plus précis',
      adjustScenario: 'Ajustez Votre Scénario',
      netWorthOverTime: 'Patrimoine au Fil du Temps',
      detailedBreakdown: 'Répartition Détaillée',
      buyingBetter: 'Acheter est Mieux',
      rentingBetter: 'Louer est Mieux',
      buyingBetterAfter: 'Acheter est Mieux Après',
      years: 'Ans',
      marketData: 'Données du Marché',
      updated: 'Mis à jour',
      buyingRecommended: 'Achat Recommandé',
      rentingRecommended: 'Location Recommandée',
      roughlyEquivalent: 'Approximativement Équivalent',
      buyingMessage: 'acheter devient financièrement plus avantageux après environ',
      rentingMessage: 'louer reste financièrement avantageux tout au long de la période de 30 ans en fonction des conditions actuelles du marché',
      stayAtLeast: 'vous devrez rester au moins',
      forBuyingToMakeSense: 'pour que l\'achat ait un sens financier',
      and: 'et',
      months: 'mois',
    },
  },
  DE: {
    countryCode: 'DE',
    currencySymbol: '€',
    closingCostRate: 0.12,
    propertyTaxRate: 0.0035,
    brokerFeeMonths: 1,
    marginaTaxRate: 0.35,
    labels: {
      closingCosts: 'Kaufnebenkosten',
      propertyTax: 'Grundsteuer',
      homePrice: 'Kaufpreis',
      monthlyRent: 'Monatliche Miete',
      downPayment: 'Eigenkapital',
      interestRate: 'Zinssatz',
      loanTerm: 'Kreditlaufzeit (Jahre)',
      maintenanceRate: 'Jährliche Instandhaltung',
      rentInflation: 'Mieterhöhung',
      investmentReturn: 'Anlagerendite',
      marginalTaxRate: 'Steuersatz',
      advancedSettings: 'Erweiterte Einstellungen',
      advancedSettingsSubtitle: 'Passen Sie die Annahmen für genauere Ergebnisse an',
      adjustScenario: 'Passen Sie Ihr Szenario an',
      netWorthOverTime: 'Vermögen im Zeitverlauf',
      detailedBreakdown: 'Detaillierte Aufschlüsselung',
      buyingBetter: 'Kaufen ist Besser',
      rentingBetter: 'Mieten ist Besser',
      buyingBetterAfter: 'Kaufen ist Besser Nach',
      years: 'Jahren',
      marketData: 'Marktdaten',
      updated: 'Aktualisiert',
      buyingRecommended: 'Kauf Empfohlen',
      rentingRecommended: 'Miete Empfohlen',
      roughlyEquivalent: 'Ungefähr Gleichwertig',
      buyingMessage: 'Kaufen wird finanziell besser nach etwa',
      rentingMessage: 'Mieten bleibt über den gesamten Zeitraum von 30 Jahren auf der Grundlage der aktuellen Marktbedingungen finanziell vorteilhaft',
      stayAtLeast: 'Sie müssen mindestens',
      forBuyingToMakeSense: 'bleiben, damit der Kauf finanziell sinnvoll ist',
      and: 'und',
      months: 'Monaten',
    },
  },
  GB: {
    countryCode: 'GB',
    currencySymbol: '£',
    closingCostRate: 0.04,
    propertyTaxRate: 0.015,
    brokerFeeMonths: 0,
    marginaTaxRate: 0.40,
    labels: {
      closingCosts: 'Stamp Duty & Legal Fees',
      propertyTax: 'Council Tax',
      homePrice: 'Property Price',
      monthlyRent: 'Monthly Rent',
      downPayment: 'Deposit',
      interestRate: 'Interest Rate',
      loanTerm: 'Mortgage Term (Years)',
      maintenanceRate: 'Annual Maintenance',
      rentInflation: 'Annual Rent Increase',
      investmentReturn: 'Investment Return',
      marginalTaxRate: 'Tax Rate',
      advancedSettings: 'Advanced Settings',
      advancedSettingsSubtitle: 'Fine-tune assumptions for more accurate results',
      adjustScenario: 'Adjust Your Scenario',
      netWorthOverTime: 'Net Worth Over Time',
      detailedBreakdown: 'Detailed Breakdown',
      buyingBetter: 'Buying is Better',
      rentingBetter: 'Renting is Better',
      buyingBetterAfter: 'Buying is Better After',
      years: 'Years',
      marketData: 'Market Data',
      updated: 'Updated',
      buyingRecommended: 'Buying Recommended',
      rentingRecommended: 'Renting Recommended',
      roughlyEquivalent: 'Roughly Equivalent',
      buyingMessage: 'buying becomes financially better after approximately',
      rentingMessage: 'renting remains financially advantageous throughout the 30-year period based on current market conditions',
      stayAtLeast: 'you\'ll need to stay at least',
      forBuyingToMakeSense: 'for buying to make financial sense',
      and: 'and',
      months: 'months',
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
 * Get labels by language code (for manual language switching)
 */
export function getLabelsByLanguage(lang: 'en' | 'fr' | 'de'): CountryDefaults['labels'] {
  switch (lang) {
    case 'fr':
      return COUNTRY_CONFIGS.FR.labels;
    case 'de':
      return COUNTRY_CONFIGS.DE.labels;
    default:
      return COUNTRY_CONFIGS.US.labels; // English default
  }
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
