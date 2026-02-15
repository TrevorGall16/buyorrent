/**
 * RentOrBuy-Pro Finance Engine
 * Comprehensive financial calculations with international support
 *
 * NET WORTH DEFINITIONS (corrected):
 *   Owner Net Worth  = Home Value − Mortgage Balance − Selling Costs
 *   Renter Net Worth = Investment Portfolio Balance (after capital-gains tax on gains)
 *
 * Cumulative costs are tracked for display but are NOT subtracted from net worth.
 * They are cash-flow items, not liabilities.
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
  const totalLoanMonths = loanTermYears * 12;
  const normalizedMonthsPaid = Math.max(0, Math.min(monthsPaid, totalLoanMonths));

  const monthlyPayment = calculateMonthlyMortgagePayment(
    principal,
    annualInterestRate,
    loanTermYears
  );
  const totalPaid = monthlyPayment * normalizedMonthsPaid;
  const remainingBalance = calculateMortgageBalance(
    principal,
    annualInterestRate,
    loanTermYears,
    normalizedMonthsPaid
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
  annualAppreciationRate: number = 0.03
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
 *
 * Renter Net Worth = Investment Portfolio Balance (after cap-gains tax on gains)
 * Cumulative costs tracked separately for display only.
 */
function calculateRenterScenario(
  inputs: CalculatorInputs
): YearlyDataPoint[] {
  const { rental, financial, yearsToAnalyze, purchase } = inputs;
  const dataPoints: YearlyDataPoint[] = [];

  // Initial costs for renter (security deposit + broker fee)
  const initialRenterCosts =
    rental.monthlyRent *
    (rental.securityDepositMonths + rental.brokerFeeMonths);

  // Renter invests the down payment equivalent instead of buying
  const downPaymentAmount = purchase.homePrice * purchase.downPaymentPercent;
  let investmentBalance = downPaymentAmount;
  // Track the cost basis for capital gains calculation
  let investmentCostBasis = downPaymentAmount;

  let cumulativeCost = initialRenterCosts;
  let currentMonthlyRent = rental.monthlyRent;

  const loanAmount = purchase.homePrice - downPaymentAmount;
  const monthlyMortgage = calculateMonthlyMortgagePayment(
    loanAmount,
    purchase.interestRate,
    purchase.loanTermYears
  );
  const annualMortgage = monthlyMortgage * 12;

  for (let year = 0; year <= yearsToAnalyze; year++) {
    // Rent increases each year due to inflation
    if (year > 0) {
      currentMonthlyRent *= 1 + rental.rentInflationRate;
    }
    const annualRent = currentMonthlyRent * 12;

    // Calculate hypothetical ownership cost for savings comparison
    const ownershipHasMortgage = year <= purchase.loanTermYears;
    const annualPropertyTax = purchase.homePrice * purchase.propertyTaxRate;
    const annualMaintenance = purchase.homePrice * purchase.maintenanceRate;
    const totalAnnualOwnershipCost =
      (ownershipHasMortgage ? annualMortgage : 0) + annualPropertyTax + annualMaintenance;

    // Renter saves the difference if rent is lower than ownership costs
    const monthlySavings = Math.max(
      (totalAnnualOwnershipCost - annualRent) / 12,
      0
    );

    // Grow investment account monthly (compound monthly)
    if (year > 0) {
      const monthlyRate = financial.investmentReturnRate / 12;
      for (let month = 0; month < 12; month++) {
        investmentBalance *= 1 + monthlyRate;
        investmentBalance += monthlySavings;
        investmentCostBasis += monthlySavings;
      }
    }

    cumulativeCost += year > 0 ? annualRent : 0;

    // Apply capital gains tax to unrealized gains for net worth calculation
    const unrealizedGains = Math.max(investmentBalance - investmentCostBasis, 0);
    const capitalGainsTax = unrealizedGains * financial.capitalGainsTaxRate;
    const afterTaxInvestmentValue = investmentBalance - capitalGainsTax;

    // Renter Net Worth = after-tax investment portfolio value
    const renterNetWorth = afterTaxInvestmentValue;

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
 *
 * Owner Net Worth = Home Value − Mortgage Balance − Selling Costs
 * Cumulative costs tracked separately for display only.
 * Mortgage interest tax deduction applied ONLY for US.
 */
function calculateOwnerScenario(
  inputs: CalculatorInputs,
  homeAppreciationRate: number = 0.03,
  sellingCostRate: number = 0.06
): YearlyDataPoint[] {
  const { purchase, yearsToAnalyze, countryCode } = inputs;
  const dataPoints: YearlyDataPoint[] = [];

  const downPaymentAmount = purchase.homePrice * purchase.downPaymentPercent;
  const closingCosts = purchase.homePrice * purchase.closingCostRate;
  const loanAmount = purchase.homePrice - downPaymentAmount;
  const monthlyMortgage = calculateMonthlyMortgagePayment(
    loanAmount,
    purchase.interestRate,
    purchase.loanTermYears
  );

  // Track cumulative costs for display (NOT used in net worth)
  let cumulativeCost = downPaymentAmount + closingCosts;

  for (let year = 0; year <= yearsToAnalyze; year++) {
    const monthsIntoLoan = year * 12;

    // Current home value with appreciation
    const currentHomeValue = calculateHomeValue(
      purchase.homePrice,
      year,
      homeAppreciationRate
    );

    // Remaining mortgage balance
    const mortgageBalance =
      year === 0
        ? loanAmount
        : calculateMortgageBalance(
            loanAmount,
            purchase.interestRate,
            purchase.loanTermYears,
            monthsIntoLoan
          );

    // Home equity
    const homeEquity = currentHomeValue - mortgageBalance;

    // Track annual costs (for display)
    if (year > 0) {
      const annualMortgage = year <= purchase.loanTermYears ? monthlyMortgage * 12 : 0;

      // Property tax based on current home value
      const annualPropertyTax = currentHomeValue * purchase.propertyTaxRate;

      // Maintenance based on current home value
      const annualMaintenance = currentHomeValue * purchase.maintenanceRate;

      // Tax deduction on mortgage interest — US ONLY
      let taxSavings = 0;
      if (countryCode === 'US') {
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
        taxSavings = annualInterest * inputs.financial.marginalTaxRate;
      }

      cumulativeCost +=
        annualMortgage + annualPropertyTax + annualMaintenance - taxSavings;
    }

    // Owner Net Worth = Home Value − Mortgage Balance − Selling Costs
    // Selling costs are based on current home value (agent fees, transfer tax)
    const sellingCosts = currentHomeValue * sellingCostRate;
    const ownerNetWorth = currentHomeValue - mortgageBalance - sellingCosts;

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

    // Check if crossover happened (owner overtakes renter)
    if (
      previous.ownerNetWorth <= previous.renterNetWorth &&
      current.ownerNetWorth > current.renterNetWorth
    ) {
      // Linear interpolation for more precise estimate
      const prevGap = previous.renterNetWorth - previous.ownerNetWorth; // positive (renter ahead)
      const currGap = current.ownerNetWorth - current.renterNetWorth;   // positive (owner ahead)
      const fraction = prevGap / (prevGap + currGap);

      const exactPoint = (i - 1) + fraction;
      const month = Math.floor(fraction * 12);

      return {
        year: i,
        month: Math.min(month, 11),
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
