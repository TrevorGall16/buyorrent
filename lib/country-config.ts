/**
 * Country-specific configurations for international support
 * Based on SPECIFICATION: BUSINESS LOGIC & USER FLOW
 */

import { CountryDefaults } from './types';

export const COUNTRY_CONFIGS = {
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
  CA: {
    countryCode: 'CA',
    currencySymbol: '$',
    closingCostRate: 0.04,
    propertyTaxRate: 0.01,
    brokerFeeMonths: 0,
    marginaTaxRate: 0.33,
    labels: {
      closingCosts: 'Closing Costs',
      propertyTax: 'Property Tax',
      homePrice: 'Home Price',
      monthlyRent: 'Monthly Rent',
      downPayment: 'Down Payment',
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
  AU: {
    countryCode: 'AU',
    currencySymbol: '$',
    closingCostRate: 0.05,
    propertyTaxRate: 0.006,
    brokerFeeMonths: 0,
    marginaTaxRate: 0.37,
    labels: {
      closingCosts: 'Stamp Duty & Conveyancing',
      propertyTax: 'Council Rates',
      homePrice: 'Property Price',
      monthlyRent: 'Monthly Rent',
      downPayment: 'Deposit',
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
  ES: {
    countryCode: 'ES',
    currencySymbol: '€',
    closingCostRate: 0.10,
    propertyTaxRate: 0.004,
    brokerFeeMonths: 0,
    marginaTaxRate: 0.30,
    labels: {
      closingCosts: 'ITP/IVA y Gastos de Notaría',
      propertyTax: 'IBI (Impuesto de Bienes Inmuebles)',
      homePrice: 'Precio de la Vivienda',
      monthlyRent: 'Alquiler Mensual',
      downPayment: 'Entrada',
      interestRate: 'Tasa de Interés',
      loanTerm: 'Plazo de la Hipoteca (Años)',
      maintenanceRate: 'Mantenimiento Anual',
      rentInflation: 'Aumento Anual del Alquiler',
      investmentReturn: 'Retorno de Inversión',
      marginalTaxRate: 'Tasa Impositiva',
      advancedSettings: 'Configuración Avanzada',
      advancedSettingsSubtitle: 'Ajuste las suposiciones para obtener resultados más precisos',
      adjustScenario: 'Ajuste Su Escenario',
      netWorthOverTime: 'Patrimonio Neto a lo Largo del Tiempo',
      detailedBreakdown: 'Desglose Detallado',
      buyingBetter: 'Comprar es Mejor',
      rentingBetter: 'Alquilar es Mejor',
      buyingBetterAfter: 'Comprar es Mejor Después de',
      years: 'Años',
      marketData: 'Datos del Mercado',
      updated: 'Actualizado',
      buyingRecommended: 'Compra Recomendada',
      rentingRecommended: 'Alquiler Recomendado',
      roughlyEquivalent: 'Aproximadamente Equivalente',
      buyingMessage: 'comprar se vuelve financieramente mejor después de aproximadamente',
      rentingMessage: 'alquilar sigue siendo financieramente ventajoso durante todo el período de 30 años según las condiciones actuales del mercado',
      stayAtLeast: 'necesitará quedarse al menos',
      forBuyingToMakeSense: 'para que la compra tenga sentido financiero',
      and: 'y',
      months: 'meses',
    },
  },
  IT: {
    countryCode: 'IT',
    currencySymbol: '€',
    closingCostRate: 0.09,
    propertyTaxRate: 0.0076,
    brokerFeeMonths: 0,
    marginaTaxRate: 0.35,
    labels: {
      closingCosts: 'Imposta di Registro e Notaio',
      propertyTax: 'IMU (Imposta Municipale Unica)',
      homePrice: 'Prezzo dell\'Immobile',
      monthlyRent: 'Affitto Mensile',
      downPayment: 'Acconto',
      interestRate: 'Tasso di Interesse',
      loanTerm: 'Durata del Mutuo (Anni)',
      maintenanceRate: 'Manutenzione Annuale',
      rentInflation: 'Aumento Annuale dell\'Affitto',
      investmentReturn: 'Rendimento degli Investimenti',
      marginalTaxRate: 'Aliquota Fiscale',
      advancedSettings: 'Impostazioni Avanzate',
      advancedSettingsSubtitle: 'Perfeziona le ipotesi per risultati più accurati',
      adjustScenario: 'Regola il Tuo Scenario',
      netWorthOverTime: 'Patrimonio Netto nel Tempo',
      detailedBreakdown: 'Ripartizione Dettagliata',
      buyingBetter: 'Comprare è Meglio',
      rentingBetter: 'Affittare è Meglio',
      buyingBetterAfter: 'Comprare è Meglio Dopo',
      years: 'Anni',
      marketData: 'Dati di Mercato',
      updated: 'Aggiornato',
      buyingRecommended: 'Acquisto Consigliato',
      rentingRecommended: 'Affitto Consigliato',
      roughlyEquivalent: 'Approssimativamente Equivalente',
      buyingMessage: 'comprare diventa finanziariamente migliore dopo circa',
      rentingMessage: 'affittare rimane finanziariamente vantaggioso per tutto il periodo di 30 anni in base alle condizioni di mercato attuali',
      stayAtLeast: 'dovrai rimanere almeno',
      forBuyingToMakeSense: 'perché l\'acquisto abbia senso finanziario',
      and: 'e',
      months: 'mesi',
    },
  },
  NL: {
    countryCode: 'NL',
    currencySymbol: '€',
    closingCostRate: 0.06,
    propertyTaxRate: 0.003,
    brokerFeeMonths: 0,
    marginaTaxRate: 0.49,
    labels: {
      closingCosts: 'Overdrachtsbelasting en Notaris',
      propertyTax: 'OZB (Onroerendezaakbelasting)',
      homePrice: 'Woningprijs',
      monthlyRent: 'Maandelijkse Huur',
      downPayment: 'Aanbetaling',
      interestRate: 'Rentepercentage',
      loanTerm: 'Hypotheekduur (Jaren)',
      maintenanceRate: 'Jaarlijks Onderhoud',
      rentInflation: 'Jaarlijkse Huurverhoging',
      investmentReturn: 'Beleggingsrendement',
      marginalTaxRate: 'Belastingtarief',
      advancedSettings: 'Geavanceerde Instellingen',
      advancedSettingsSubtitle: 'Verfijn de aannames voor nauwkeurigere resultaten',
      adjustScenario: 'Pas Uw Scenario Aan',
      netWorthOverTime: 'Vermogen in de Loop van de Tijd',
      detailedBreakdown: 'Gedetailleerde Uitsplitsing',
      buyingBetter: 'Kopen is Beter',
      rentingBetter: 'Huren is Beter',
      buyingBetterAfter: 'Kopen is Beter Na',
      years: 'Jaren',
      marketData: 'Marktgegevens',
      updated: 'Bijgewerkt',
      buyingRecommended: 'Kopen Aanbevolen',
      rentingRecommended: 'Huren Aanbevolen',
      roughlyEquivalent: 'Ongeveer Gelijkwaardig',
      buyingMessage: 'kopen wordt financieel beter na ongeveer',
      rentingMessage: 'huren blijft financieel voordelig gedurende de gehele periode van 30 jaar op basis van de huidige marktomstandigheden',
      stayAtLeast: 'u moet minimaal',
      forBuyingToMakeSense: 'blijven om kopen financieel zinvol te maken',
      and: 'en',
      months: 'maanden',
    },
  },
  SE: {
    countryCode: 'SE',
    currencySymbol: 'kr',
    closingCostRate: 0.02,
    propertyTaxRate: 0.0075,
    brokerFeeMonths: 0,
    marginaTaxRate: 0.52,
    labels: {
      closingCosts: 'Stämpelskatt och Juridiska Avgifter',
      propertyTax: 'Fastighetsskatt',
      homePrice: 'Boendepris',
      monthlyRent: 'Månadshyra',
      downPayment: 'Handpenning',
      interestRate: 'Ränta',
      loanTerm: 'Lånetid (År)',
      maintenanceRate: 'Årligt Underhåll',
      rentInflation: 'Årlig Hyresökning',
      investmentReturn: 'Investeringsavkastning',
      marginalTaxRate: 'Skattesats',
      advancedSettings: 'Avancerade Inställningar',
      advancedSettingsSubtitle: 'Finjustera antaganden för mer exakta resultat',
      adjustScenario: 'Justera Ditt Scenario',
      netWorthOverTime: 'Nettoförmögenhet Över Tid',
      detailedBreakdown: 'Detaljerad Uppdelning',
      buyingBetter: 'Köpa är Bättre',
      rentingBetter: 'Hyra är Bättre',
      buyingBetterAfter: 'Köpa är Bättre Efter',
      years: 'År',
      marketData: 'Marknadsdata',
      updated: 'Uppdaterad',
      buyingRecommended: 'Köp Rekommenderas',
      rentingRecommended: 'Hyra Rekommenderas',
      roughlyEquivalent: 'Ungefär Likvärdigt',
      buyingMessage: 'köpa blir ekonomiskt bättre efter ungefär',
      rentingMessage: 'hyra förblir ekonomiskt fördelaktigt under hela 30-årsperioden baserat på nuvarande marknadsförhållanden',
      stayAtLeast: 'du måste stanna minst',
      forBuyingToMakeSense: 'för att köp ska vara ekonomiskt meningsfullt',
      and: 'och',
      months: 'månader',
    },
  },
  CH: {
    countryCode: 'CH',
    currencySymbol: 'CHF',
    closingCostRate: 0.035,
    propertyTaxRate: 0.002,
    brokerFeeMonths: 0,
    marginaTaxRate: 0.30,
    labels: {
      closingCosts: 'Transfer Tax & Notary',
      propertyTax: 'Property Tax',
      homePrice: 'Property Price',
      monthlyRent: 'Monthly Rent',
      downPayment: 'Down Payment',
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
  BE: {
    countryCode: 'BE',
    currencySymbol: '€',
    closingCostRate: 0.125,
    propertyTaxRate: 0.008,
    brokerFeeMonths: 0,
    marginaTaxRate: 0.50,
    labels: {
      closingCosts: 'Registration Fees & Notary',
      propertyTax: 'Property Tax',
      homePrice: 'Property Price',
      monthlyRent: 'Monthly Rent',
      downPayment: 'Down Payment',
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
  IE: {
    countryCode: 'IE',
    currencySymbol: '€',
    closingCostRate: 0.02,
    propertyTaxRate: 0.0018,
    brokerFeeMonths: 0,
    marginaTaxRate: 0.40,
    labels: {
      closingCosts: 'Stamp Duty & Legal Fees',
      propertyTax: 'Local Property Tax',
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
  PT: {
    countryCode: 'PT',
    currencySymbol: '€',
    closingCostRate: 0.06,
    propertyTaxRate: 0.003,
    brokerFeeMonths: 0,
    marginaTaxRate: 0.35,
    labels: {
      closingCosts: 'IMT e Custos de Notário',
      propertyTax: 'IMI (Imposto Municipal sobre Imóveis)',
      homePrice: 'Preço do Imóvel',
      monthlyRent: 'Renda Mensal',
      downPayment: 'Entrada',
      interestRate: 'Taxa de Juro',
      loanTerm: 'Prazo do Empréstimo (Anos)',
      maintenanceRate: 'Manutenção Anual',
      rentInflation: 'Aumento Anual da Renda',
      investmentReturn: 'Retorno do Investimento',
      marginalTaxRate: 'Taxa de Imposto',
      advancedSettings: 'Configurações Avançadas',
      advancedSettingsSubtitle: 'Ajuste as suposições para resultados mais precisos',
      adjustScenario: 'Ajuste o Seu Cenário',
      netWorthOverTime: 'Patrimônio Líquido ao Longo do Tempo',
      detailedBreakdown: 'Repartição Detalhada',
      buyingBetter: 'Comprar é Melhor',
      rentingBetter: 'Arrendar é Melhor',
      buyingBetterAfter: 'Comprar é Melhor Após',
      years: 'Anos',
      marketData: 'Dados do Mercado',
      updated: 'Atualizado',
      buyingRecommended: 'Compra Recomendada',
      rentingRecommended: 'Arrendamento Recomendado',
      roughlyEquivalent: 'Aproximadamente Equivalente',
      buyingMessage: 'comprar torna-se financeiramente melhor após aproximadamente',
      rentingMessage: 'arrendar permanece financeiramente vantajoso durante todo o período de 30 anos com base nas condições atuais do mercado',
      stayAtLeast: 'precisará ficar pelo menos',
      forBuyingToMakeSense: 'para que a compra faça sentido financeiro',
      and: 'e',
      months: 'meses',
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

/**
 * Get labels by language code (for manual language switching)
 */
export function getLabelsByLanguage(
  lang: 'en' | 'fr' | 'de' | 'es' | 'it' | 'nl' | 'sv' | 'pt'
): CountryDefaults['labels'] {
  switch (lang) {
    case 'fr':
      return COUNTRY_CONFIGS.FR.labels;
    case 'de':
      return COUNTRY_CONFIGS.DE.labels;
    case 'es':
      return COUNTRY_CONFIGS.ES.labels;
    case 'it':
      return COUNTRY_CONFIGS.IT.labels;
    case 'nl':
      return COUNTRY_CONFIGS.NL.labels;
    case 'sv':
      return COUNTRY_CONFIGS.SE.labels;
    case 'pt':
      return COUNTRY_CONFIGS.PT.labels;
    default:
      return COUNTRY_CONFIGS.US.labels; // English default
  }
}

/**
 * Home page labels for internationalization
 */
export interface HomePageLabels {
  heroTitle: string;
  heroSubtitle: string;
  heroDescription: string;
  chooseCityTitle: string;
  chooseCitySubtitle: string;
  footerAbout: string;
  footerMethodology: string;
  footerContact: string;
  footerPrivacy: string;
  footerBuiltWith: string;
  footerCopyright: string;
}

const HOME_PAGE_LABELS: Record<'en' | 'fr' | 'de' | 'es' | 'it' | 'nl' | 'sv' | 'pt', HomePageLabels> = {
  en: {
    heroTitle: 'Should You Rent or Buy?',
    heroSubtitle: 'The Calculator That Tells the Truth',
    heroDescription: 'Get data-driven insights for your city. We analyze 30 years of financial outcomes, including hidden costs, opportunity costs, and international tax differences.',
    chooseCityTitle: 'Choose Your City',
    chooseCitySubtitle: 'Select a city to see personalized rent vs. buy analysis',
    footerAbout: 'About',
    footerMethodology: 'Methodology',
    footerContact: 'Contact',
    footerPrivacy: 'Privacy',
    footerBuiltWith: 'Built with Next.js 15 • TypeScript • Tailwind CSS • Recharts',
    footerCopyright: 'Financial data for educational purposes only.',
  },
  fr: {
    heroTitle: 'Louer ou Acheter ?',
    heroSubtitle: 'Le Calculateur qui Dit la Vérité',
    heroDescription: 'Obtenez des informations basées sur des données pour votre ville. Nous analysons 30 ans de résultats financiers, y compris les coûts cachés, les coûts d\'opportunité et les différences fiscales internationales.',
    chooseCityTitle: 'Choisissez Votre Ville',
    chooseCitySubtitle: 'Sélectionnez une ville pour voir une analyse personnalisée location vs. achat',
    footerAbout: 'À propos',
    footerMethodology: 'Méthodologie',
    footerContact: 'Contact',
    footerPrivacy: 'Confidentialité',
    footerBuiltWith: 'Construit avec Next.js 15 • TypeScript • Tailwind CSS • Recharts',
    footerCopyright: 'Données financières à des fins éducatives uniquement.',
  },
  de: {
    heroTitle: 'Mieten oder Kaufen?',
    heroSubtitle: 'Der Rechner, der die Wahrheit Sagt',
    heroDescription: 'Erhalten Sie datenbasierte Einblicke für Ihre Stadt. Wir analysieren 30 Jahre finanzielle Ergebnisse, einschließlich versteckter Kosten, Opportunitätskosten und internationaler Steuerunterschiede.',
    chooseCityTitle: 'Wählen Sie Ihre Stadt',
    chooseCitySubtitle: 'Wählen Sie eine Stadt für eine personalisierte Mieten vs. Kaufen Analyse',
    footerAbout: 'Über uns',
    footerMethodology: 'Methodik',
    footerContact: 'Kontakt',
    footerPrivacy: 'Datenschutz',
    footerBuiltWith: 'Erstellt mit Next.js 15 • TypeScript • Tailwind CSS • Recharts',
    footerCopyright: 'Finanzdaten nur für Bildungszwecke.',
  },
  es: {
    heroTitle: '¿Alquilar o Comprar?',
    heroSubtitle: 'La Calculadora que Dice la Verdad',
    heroDescription: 'Obtenga información basada en datos para su ciudad. Analizamos 30 años de resultados financieros, incluidos costos ocultos, costos de oportunidad y diferencias fiscales internacionales.',
    chooseCityTitle: 'Elija Su Ciudad',
    chooseCitySubtitle: 'Seleccione una ciudad para ver un análisis personalizado de alquilar vs. comprar',
    footerAbout: 'Acerca de',
    footerMethodology: 'Metodología',
    footerContact: 'Contacto',
    footerPrivacy: 'Privacidad',
    footerBuiltWith: 'Construido con Next.js 15 • TypeScript • Tailwind CSS • Recharts',
    footerCopyright: 'Datos financieros solo con fines educativos.',
  },
  it: {
    heroTitle: 'Affittare o Comprare?',
    heroSubtitle: 'Il Calcolatore che Dice la Verità',
    heroDescription: 'Ottieni approfondimenti basati sui dati per la tua città. Analizziamo 30 anni di risultati finanziari, inclusi costi nascosti, costi opportunità e differenze fiscali internazionali.',
    chooseCityTitle: 'Scegli la Tua Città',
    chooseCitySubtitle: 'Seleziona una città per vedere un\'analisi personalizzata affitto vs. acquisto',
    footerAbout: 'Chi siamo',
    footerMethodology: 'Metodologia',
    footerContact: 'Contatto',
    footerPrivacy: 'Privacy',
    footerBuiltWith: 'Costruito con Next.js 15 • TypeScript • Tailwind CSS • Recharts',
    footerCopyright: 'Dati finanziari solo a scopo educativo.',
  },
  nl: {
    heroTitle: 'Huren of Kopen?',
    heroSubtitle: 'De Rekenmachine die de Waarheid Vertelt',
    heroDescription: 'Krijg datagedreven inzichten voor uw stad. We analyseren 30 jaar financiële resultaten, inclusief verborgen kosten, opportuniteitskosten en internationale belastingverschillen.',
    chooseCityTitle: 'Kies Uw Stad',
    chooseCitySubtitle: 'Selecteer een stad om een gepersonaliseerde huren vs. kopen analyse te zien',
    footerAbout: 'Over ons',
    footerMethodology: 'Methodologie',
    footerContact: 'Contact',
    footerPrivacy: 'Privacy',
    footerBuiltWith: 'Gebouwd met Next.js 15 • TypeScript • Tailwind CSS • Recharts',
    footerCopyright: 'Financiële gegevens alleen voor educatieve doeleinden.',
  },
  sv: {
    heroTitle: 'Hyra eller Köpa?',
    heroSubtitle: 'Kalkylatorn som Säger Sanningen',
    heroDescription: 'Få datadrivna insikter för din stad. Vi analyserar 30 års finansiella resultat, inklusive dolda kostnader, alternativkostnader och internationella skillnader i skatt.',
    chooseCityTitle: 'Välj Din Stad',
    chooseCitySubtitle: 'Välj en stad för att se en personlig hyra vs. köp analys',
    footerAbout: 'Om oss',
    footerMethodology: 'Metodik',
    footerContact: 'Kontakt',
    footerPrivacy: 'Integritet',
    footerBuiltWith: 'Byggd med Next.js 15 • TypeScript • Tailwind CSS • Recharts',
    footerCopyright: 'Finansiell data endast för utbildningsändamål.',
  },
  pt: {
    heroTitle: 'Arrendar ou Comprar?',
    heroSubtitle: 'A Calculadora que Diz a Verdade',
    heroDescription: 'Obtenha insights baseados em dados para a sua cidade. Analisamos 30 anos de resultados financeiros, incluindo custos ocultos, custos de oportunidade e diferenças fiscais internacionais.',
    chooseCityTitle: 'Escolha a Sua Cidade',
    chooseCitySubtitle: 'Selecione uma cidade para ver uma análise personalizada de arrendar vs. comprar',
    footerAbout: 'Sobre',
    footerMethodology: 'Metodologia',
    footerContact: 'Contato',
    footerPrivacy: 'Privacidade',
    footerBuiltWith: 'Construído com Next.js 15 • TypeScript • Tailwind CSS • Recharts',
    footerCopyright: 'Dados financeiros apenas para fins educacionais.',
  },
};

/**
 * Get home page labels by language code
 */
export function getHomePageLabels(
  lang: 'en' | 'fr' | 'de' | 'es' | 'it' | 'nl' | 'sv' | 'pt'
): HomePageLabels {
  return HOME_PAGE_LABELS[lang] || HOME_PAGE_LABELS.en;
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
