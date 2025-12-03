/**
 * RentOrBuy-Pro Finance Engine
 * Comprehensive financial calculations with international support
 */

import {
  CalculatorInputs,
  CalculationResult,
  YearlyDataPoint,
  BreakEvenResult,
} from './types';

/**
 * Validate financial inputs to prevent invalid calculations
 */
function validateFinancialInputs(
  principal: number,
  interestRate: number,
  loanTermYears: number
): void {
  if (principal <= 0) {
    throw new Error('Principal amount must be greater than zero');
  }
  if (interestRate < 0) {
    throw new Error('Interest rate cannot be negative');
  }
  if (loanTermYears <= 0) {
    throw new Error('Loan term must be greater than zero');
  }
  if (interestRate > 1) {
    throw new Error('Interest rate appears to be invalid (should be decimal, e.g., 0.065 for 6.5%)');
  }
  if (!Number.isFinite(principal) || !Number.isFinite(interestRate) || !Number.isFinite(loanTermYears)) {
    throw new Error('Invalid numeric input detected');
  }
}

/**
 * Calculate monthly mortgage payment using standard amortization formula
 * P = L[c(1 + c)^n]/[(1 + c)^n - 1]
 */
export function calculateMonthlyMortgagePayment(
  principal: number,
  annualInterestRate: number,
  loanTermYears: number
): number {
  validateFinancialInputs(principal, annualInterestRate, loanTermYears);

  if (annualInterestRate === 0) {
    return principal / (loanTermYears * 12);
  }

  const monthlyRate = annualInterestRate / 12;
  const numPayments = loanTermYears * 12;
  const numerator = monthlyRate * Math.pow(1 + monthlyRate, numPayments);
  const denominator = Math.pow(1 + monthlyRate, numPayments) - 1;

  return principal * (numerator / denominator);
}

/**
 * Calculate mortgage balance at a specific point in time
 */
export function calculateMortgageBalance(
  principal: number,
  annualInterestRate: number,
  loanTermYears: number,
  monthsPaid: number
): number {
  validateFinancialInputs(principal, annualInterestRate, loanTermYears);

  if (monthsPaid < 0) {
    throw new Error('Months paid cannot be negative');
  }

  if (monthsPaid >= loanTermYears * 12) {
    return 0;
  }

  if (annualInterestRate === 0) {
    const monthlyPayment = principal / (loanTermYears * 12);
    return principal - monthlyPayment * monthsPaid;
  }

  const monthlyRate = annualInterestRate / 12;
  const numPayments = loanTermYears * 12;
  const numerator =
    Math.pow(1 + monthlyRate, numPayments) -
    Math.pow(1 + monthlyRate, monthsPaid);
  const denominator = Math.pow(1 + monthlyRate, numPayments) - 1;

  return principal * (numerator / denominator);
}

/**
 * Calculate total interest paid up to a specific month
 */
export function calculateInterestPaid(
  principal: number,
  annualInterestRate: number,
  loanTermYears: number,
  monthsPaid: number
): number {
  const monthlyPayment = calculateMonthlyMortgagePayment(
    principal,
    annualInterestRate,
    loanTermYears
  );
  const totalPaid = monthlyPayment * monthsPaid;
  const remainingBalance = calculateMortgageBalance(
    principal,
    annualInterestRate,
    loanTermYears,
    monthsPaid
  );
  const principalPaid = principal - remainingBalance;

  return totalPaid - principalPaid;
}

/**
 * Calculate home appreciation over time
 */
export function calculateHomeValue(
  initialPrice: number,
  years: number,
  annualAppreciationRate: number = 0.03 // Default 3% appreciation
): number {
  return initialPrice * Math.pow(1 + annualAppreciationRate, years);
}

/**
 * Calculate investment growth with compound interest
 */
export function calculateInvestmentGrowth(
  principal: number,
  annualRate: number,
  years: number
): number {
  return principal * Math.pow(1 + annualRate, years);
}

/**
 * Calculate renter scenario over time
 */
function calculateRenterScenario(
  inputs: CalculatorInputs
): YearlyDataPoint[] {
  const { rental, financial, yearsToAnalyze, purchase } = inputs;
  const dataPoints: YearlyDataPoint[] = [];

  // Initial costs for renter
  const initialRenterCosts =
    rental.monthlyRent *
    (rental.securityDepositMonths + rental.brokerFeeMonths);

  // Track investment account (down payment + monthly savings)
  const downPaymentAmount = purchase.homePrice * purchase.downPaymentPercent;
  let investmentBalance = downPaymentAmount; // Renter invests down payment equivalent

  let cumulativeCost = initialRenterCosts;
  let currentMonthlyRent = rental.monthlyRent;

  for (let year = 0; year <= yearsToAnalyze; year++) {
    // Calculate annual rent (increases each year due to inflation)
    if (year > 0) {
      currentMonthlyRent *= 1 + rental.rentInflationRate;
    }
    const annualRent = currentMonthlyRent * 12;

    // Calculate hypothetical mortgage payment for comparison
    const loanAmount = purchase.homePrice - downPaymentAmount;
    const monthlyMortgage = calculateMonthlyMortgagePayment(
      loanAmount,
      purchase.interestRate,
      purchase.loanTermYears
    );
    const annualMortgage = monthlyMortgage * 12;

    // Monthly savings: difference between mortgage+expenses and rent
    const annualPropertyTax = purchase.homePrice * purchase.propertyTaxRate;
    const annualMaintenance = purchase.homePrice * purchase.maintenanceRate;
    const totalAnnualOwnershipCost =
      annualMortgage + annualPropertyTax + annualMaintenance;

    // Renter saves the difference if rent is lower
    const monthlySavings = Math.max(
      (totalAnnualOwnershipCost - annualRent) / 12,
      0
    );

    // Add savings to investment account monthly (compound monthly)
    if (year > 0) {
      const monthlyRate = financial.investmentReturnRate / 12;
      for (let month = 0; month < 12; month++) {
        investmentBalance *= 1 + monthlyRate;
        investmentBalance += monthlySavings;
      }
    }

    cumulativeCost += annualRent;

    // Renter net worth = investments - cumulative costs
    const renterNetWorth = investmentBalance - cumulativeCost;

    dataPoints.push({
      year,
      renterNetWorth,
      ownerNetWorth: 0, // Will be calculated separately
      renterCumulativeCost: cumulativeCost,
      ownerCumulativeCost: 0,
      renterInvestmentGrowth: investmentBalance,
      homeEquity: 0,
      homeValue: 0,
      mortgageBalance: 0,
    });
  }

  return dataPoints;
}

/**
 * Calculate owner scenario over time
 */
function calculateOwnerScenario(
  inputs: CalculatorInputs,
  homeAppreciationRate: number = 0.03,
  sellingCostRate: number = 0.06 // 6% typical selling costs (agent fees)
): YearlyDataPoint[] {
  const { purchase, financial, yearsToAnalyze } = inputs;
  const dataPoints: YearlyDataPoint[] = [];

  // Initial costs for owner
  const downPaymentAmount = purchase.homePrice * purchase.downPaymentPercent;
  const closingCosts = purchase.homePrice * purchase.closingCostRate;
  const initialOwnerCosts = downPaymentAmount + closingCosts;

  const loanAmount = purchase.homePrice - downPaymentAmount;

  let cumulativeCost = initialOwnerCosts;

  for (let year = 0; year <= yearsToAnalyze; year++) {
    const monthsIntoLoan = year * 12;

    // Calculate current home value with appreciation
    const currentHomeValue = calculateHomeValue(
      purchase.homePrice,
      year,
      homeAppreciationRate
    );

    // Calculate remaining mortgage balance
    const mortgageBalance =
      year === 0
        ? loanAmount
        : calculateMortgageBalance(
            loanAmount,
            purchase.interestRate,
            purchase.loanTermYears,
            monthsIntoLoan
          );

    // Calculate equity
    const homeEquity = currentHomeValue - mortgageBalance;

    // Calculate annual costs
    if (year > 0) {
      const monthlyMortgage = calculateMonthlyMortgagePayment(
        loanAmount,
        purchase.interestRate,
        purchase.loanTermYears
      );
      const annualMortgage = monthlyMortgage * 12;

      // Property tax based on current home value
      const annualPropertyTax = currentHomeValue * purchase.propertyTaxRate;

      // Maintenance based on current home value
      const annualMaintenance = currentHomeValue * purchase.maintenanceRate;

      // Tax deduction on mortgage interest (if applicable)
      const interestPaid = calculateInterestPaid(
        loanAmount,
        purchase.interestRate,
        purchase.loanTermYears,
        monthsIntoLoan
      );
      const previousInterestPaid = calculateInterestPaid(
        loanAmount,
        purchase.interestRate,
        purchase.loanTermYears,
        monthsIntoLoan - 12
      );
      const annualInterest = interestPaid - previousInterestPaid;
      const taxSavings = annualInterest * financial.marginalTaxRate;

      cumulativeCost +=
        annualMortgage + annualPropertyTax + annualMaintenance - taxSavings;
    }

    // Owner net worth = home equity - cumulative costs
    // If owner sells, subtract selling costs
    const netProceeds = homeEquity - currentHomeValue * sellingCostRate;
    const ownerNetWorth = netProceeds - cumulativeCost;

    dataPoints.push({
      year,
      renterNetWorth: 0, // Will be merged later
      ownerNetWorth,
      renterCumulativeCost: 0,
      ownerCumulativeCost: cumulativeCost,
      renterInvestmentGrowth: 0,
      homeEquity,
      homeValue: currentHomeValue,
      mortgageBalance,
    });
  }

  return dataPoints;
}

/**
 * Find break-even point where owner net worth exceeds renter net worth
 */
function findBreakEvenPoint(dataPoints: YearlyDataPoint[]): BreakEvenResult {
  for (let i = 1; i < dataPoints.length; i++) {
    const current = dataPoints[i];
    const previous = dataPoints[i - 1];

    // Check if crossover happened
    if (
      previous.ownerNetWorth <= previous.renterNetWorth &&
      current.ownerNetWorth > current.renterNetWorth
    ) {
      // Linear interpolation for more precise estimate
      const delta =
        (current.renterNetWorth - current.ownerNetWorth) /
        (current.renterNetWorth -
          current.ownerNetWorth -
          (previous.renterNetWorth - previous.ownerNetWorth));

      const exactPoint = current.year - 1 + delta;
      const month = Math.floor((exactPoint % 1) * 12);

      return {
        year: current.year,
        month,
        exactPoint,
      };
    }
  }

  // Never breaks even within analysis period
  return {
    year: null,
    month: null,
    exactPoint: null,
  };
}

/**
 * Main calculation engine
 * Returns comprehensive analysis of rent vs buy scenario
 */
export function calculateRentVsBuy(
  inputs: CalculatorInputs,
  homeAppreciationRate: number = 0.03
): CalculationResult {
  // Calculate both scenarios
  const renterData = calculateRenterScenario(inputs);
  const ownerData = calculateOwnerScenario(inputs, homeAppreciationRate);

  // Merge data points
  const dataPoints: YearlyDataPoint[] = renterData.map((renter, index) => ({
    ...renter,
    ownerNetWorth: ownerData[index].ownerNetWorth,
    ownerCumulativeCost: ownerData[index].ownerCumulativeCost,
    homeEquity: ownerData[index].homeEquity,
    homeValue: ownerData[index].homeValue,
    mortgageBalance: ownerData[index].mortgageBalance,
  }));

  // Find break-even point
  const breakEven = findBreakEvenPoint(dataPoints);

  // Calculate summary
  const finalYear = dataPoints[dataPoints.length - 1];
  const totalRenterCost = finalYear.renterCumulativeCost;
  const totalOwnerCost = finalYear.ownerCumulativeCost;
  const finalRenterNetWorth = finalYear.renterNetWorth;
  const finalOwnerNetWorth = finalYear.ownerNetWorth;

  let recommendation: 'buy' | 'rent' | 'neutral';
  if (finalOwnerNetWorth > finalRenterNetWorth * 1.1) {
    recommendation = 'buy';
  } else if (finalRenterNetWorth > finalOwnerNetWorth * 1.1) {
    recommendation = 'rent';
  } else {
    recommendation = 'neutral';
  }

  return {
    dataPoints,
    breakEven,
    summary: {
      totalRenterCost,
      totalOwnerCost,
      finalRenterNetWorth,
      finalOwnerNetWorth,
      recommendation,
    },
  };
}
