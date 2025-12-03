/**
 * Test script for finance calculations
 * Run with: npx tsx lib/test-finance.ts
 */

import { calculateRentVsBuy } from './finance';
import { getDefaultInputsForCountry, getCountryConfig } from './country-config';

console.log('='.repeat(80));
console.log('RENTORBUY-PRO FINANCE ENGINE TEST');
console.log('='.repeat(80));
console.log();

// Test Case 1: USA (Austin, TX)
console.log('TEST CASE 1: USA (Austin, TX)');
console.log('-'.repeat(80));
const usInputs = getDefaultInputsForCountry('US', 450000, 2200);
const usConfig = getCountryConfig('US');
console.log('Configuration:', {
  homePrice: `${usConfig.currencySymbol}${usInputs.purchase.homePrice.toLocaleString()}`,
  monthlyRent: `${usConfig.currencySymbol}${usInputs.rental.monthlyRent.toLocaleString()}`,
  closingCosts: `${(usInputs.purchase.closingCostRate * 100).toFixed(1)}%`,
  propertyTax: `${(usInputs.purchase.propertyTaxRate * 100).toFixed(2)}%`,
});

const usResult = calculateRentVsBuy(usInputs);
console.log('Results:', {
  breakEvenYear: usResult.breakEven.year,
  breakEvenExact: usResult.breakEven.exactPoint?.toFixed(2),
  recommendation: usResult.summary.recommendation,
  finalOwnerNetWorth: `${usConfig.currencySymbol}${usResult.summary.finalOwnerNetWorth.toLocaleString('en-US', { maximumFractionDigits: 0 })}`,
  finalRenterNetWorth: `${usConfig.currencySymbol}${usResult.summary.finalRenterNetWorth.toLocaleString('en-US', { maximumFractionDigits: 0 })}`,
});
console.log();

// Test Case 2: Germany (Berlin)
console.log('TEST CASE 2: Germany (Berlin)');
console.log('-'.repeat(80));
const deInputs = getDefaultInputsForCountry('DE', 450000, 1400);
const deConfig = getCountryConfig('DE');
console.log('Configuration:', {
  homePrice: `${deConfig.currencySymbol}${deInputs.purchase.homePrice.toLocaleString()}`,
  monthlyRent: `${deConfig.currencySymbol}${deInputs.rental.monthlyRent.toLocaleString()}`,
  closingCosts: `${(deInputs.purchase.closingCostRate * 100).toFixed(1)}% (${deConfig.labels.closingCosts})`,
  propertyTax: `${(deInputs.purchase.propertyTaxRate * 100).toFixed(2)}%`,
  brokerFee: `${deInputs.rental.brokerFeeMonths} month(s) rent`,
});

const deResult = calculateRentVsBuy(deInputs);
console.log('Results:', {
  breakEvenYear: deResult.breakEven.year,
  breakEvenExact: deResult.breakEven.exactPoint?.toFixed(2),
  recommendation: deResult.summary.recommendation,
  finalOwnerNetWorth: `${deConfig.currencySymbol}${deResult.summary.finalOwnerNetWorth.toLocaleString('en-US', { maximumFractionDigits: 0 })}`,
  finalRenterNetWorth: `${deConfig.currencySymbol}${deResult.summary.finalRenterNetWorth.toLocaleString('en-US', { maximumFractionDigits: 0 })}`,
});
console.log();
console.log('NOTE: Germany has 12% closing costs vs 3% in USA');
console.log('This should result in a LONGER break-even period.');
console.log();

// Test Case 3: France (Paris)
console.log('TEST CASE 3: France (Paris)');
console.log('-'.repeat(80));
const frInputs = getDefaultInputsForCountry('FR', 500000, 1800);
const frConfig = getCountryConfig('FR');
console.log('Configuration:', {
  homePrice: `${frConfig.currencySymbol}${frInputs.purchase.homePrice.toLocaleString()}`,
  monthlyRent: `${frConfig.currencySymbol}${frInputs.rental.monthlyRent.toLocaleString()}`,
  closingCosts: `${(frInputs.purchase.closingCostRate * 100).toFixed(1)}% (${frConfig.labels.closingCosts})`,
  propertyTax: `${(frInputs.purchase.propertyTaxRate * 100).toFixed(2)}%`,
});

const frResult = calculateRentVsBuy(frInputs);
console.log('Results:', {
  breakEvenYear: frResult.breakEven.year,
  breakEvenExact: frResult.breakEven.exactPoint?.toFixed(2),
  recommendation: frResult.summary.recommendation,
  finalOwnerNetWorth: `${frConfig.currencySymbol}${frResult.summary.finalOwnerNetWorth.toLocaleString('en-US', { maximumFractionDigits: 0 })}`,
  finalRenterNetWorth: `${frConfig.currencySymbol}${frResult.summary.finalRenterNetWorth.toLocaleString('en-US', { maximumFractionDigits: 0 })}`,
});
console.log();

// Test Case 4: UK (London)
console.log('TEST CASE 4: UK (London)');
console.log('-'.repeat(80));
const gbInputs = getDefaultInputsForCountry('GB', 600000, 2500);
const gbConfig = getCountryConfig('GB');
console.log('Configuration:', {
  homePrice: `${gbConfig.currencySymbol}${gbInputs.purchase.homePrice.toLocaleString()}`,
  monthlyRent: `${gbConfig.currencySymbol}${gbInputs.rental.monthlyRent.toLocaleString()}`,
  closingCosts: `${(gbInputs.purchase.closingCostRate * 100).toFixed(1)}% (${gbConfig.labels.closingCosts})`,
  propertyTax: `${(gbInputs.purchase.propertyTaxRate * 100).toFixed(2)}%`,
});

const gbResult = calculateRentVsBuy(gbInputs);
console.log('Results:', {
  breakEvenYear: gbResult.breakEven.year,
  breakEvenExact: gbResult.breakEven.exactPoint?.toFixed(2),
  recommendation: gbResult.summary.recommendation,
  finalOwnerNetWorth: `${gbConfig.currencySymbol}${gbResult.summary.finalOwnerNetWorth.toLocaleString('en-US', { maximumFractionDigits: 0 })}`,
  finalRenterNetWorth: `${gbConfig.currencySymbol}${gbResult.summary.finalRenterNetWorth.toLocaleString('en-US', { maximumFractionDigits: 0 })}`,
});
console.log();

// Test mortgage calculations
console.log('='.repeat(80));
console.log('MORTGAGE CALCULATION TESTS');
console.log('='.repeat(80));

import { calculateMonthlyMortgagePayment, calculateMortgageBalance } from './finance';

const loanAmount = 360000; // $450k with 20% down
const interestRate = 0.065; // 6.5%
const termYears = 30;

const monthlyPayment = calculateMonthlyMortgagePayment(
  loanAmount,
  interestRate,
  termYears
);

console.log(`Loan Amount: $${loanAmount.toLocaleString()}`);
console.log(`Interest Rate: ${(interestRate * 100).toFixed(2)}%`);
console.log(`Term: ${termYears} years`);
console.log(`Monthly Payment: $${monthlyPayment.toFixed(2)}`);
console.log();

console.log('Balance over time:');
[0, 5, 10, 15, 20, 25, 30].forEach((year) => {
  const balance = calculateMortgageBalance(
    loanAmount,
    interestRate,
    termYears,
    year * 12
  );
  const equity = loanAmount - balance;
  console.log(
    `  Year ${year.toString().padStart(2)}: Balance $${balance.toFixed(0).padStart(9)} | Equity $${equity.toFixed(0).padStart(9)}`
  );
});

console.log();
console.log('='.repeat(80));
console.log('ALL TESTS COMPLETED');
console.log('='.repeat(80));
