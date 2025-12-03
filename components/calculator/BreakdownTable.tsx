'use client';

/**
 * Detailed Breakdown Table
 * Comparison table showing cost breakdown
 */

import { YearlyDataPoint } from '@/lib/types';

interface BreakdownTableProps {
  finalYearData: YearlyDataPoint;
  currencySymbol: string;
  downPayment: number;
  closingCosts: number;
  monthlyMortgage: number;
  monthlyRent: number;
}

export default function BreakdownTable({
  finalYearData,
  currencySymbol,
  downPayment,
  closingCosts,
  monthlyMortgage,
  monthlyRent,
}: BreakdownTableProps) {
  const formatCurrency = (value: number) =>
    `${currencySymbol}${Math.abs(value).toLocaleString('en-US', { maximumFractionDigits: 0 })}`;

  const rows = [
    {
      category: 'Upfront Costs',
      renter: formatCurrency(monthlyRent * 1), // Assume 1 month deposit
      owner: formatCurrency(downPayment + closingCosts),
    },
    {
      category: 'Monthly Costs (Initial)',
      renter: formatCurrency(monthlyRent),
      owner: formatCurrency(monthlyMortgage),
    },
    {
      category: 'Total Costs (30 Years)',
      renter: formatCurrency(finalYearData.renterCumulativeCost),
      owner: formatCurrency(finalYearData.ownerCumulativeCost),
    },
    {
      category: 'Home Equity Built',
      renter: formatCurrency(0),
      owner: formatCurrency(finalYearData.homeEquity),
    },
    {
      category: 'Final Net Worth',
      renter: formatCurrency(finalYearData.renterNetWorth),
      owner: formatCurrency(finalYearData.ownerNetWorth),
      highlight: true,
    },
  ];

  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
      <div className="px-4 py-3 bg-gray-50 border-b border-gray-200">
        <h3 className="text-sm font-bold text-gray-700 uppercase tracking-wide">
          Detailed Breakdown (30 Years)
        </h3>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Category
              </th>
              <th className="px-4 py-3 text-right text-xs font-semibold text-red-600 uppercase tracking-wider">
                Renting
              </th>
              <th className="px-4 py-3 text-right text-xs font-semibold text-green-600 uppercase tracking-wider">
                Buying
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {rows.map((row, index) => (
              <tr
                key={index}
                className={row.highlight ? 'bg-blue-50' : 'hover:bg-gray-50'}
              >
                <td
                  className={`px-4 py-3 text-sm ${
                    row.highlight
                      ? 'font-bold text-gray-900'
                      : 'font-medium text-gray-700'
                  }`}
                >
                  {row.category}
                </td>
                <td
                  className={`px-4 py-3 text-sm text-right ${
                    row.highlight ? 'font-bold text-red-700' : 'text-gray-600'
                  }`}
                >
                  {row.renter}
                </td>
                <td
                  className={`px-4 py-3 text-sm text-right ${
                    row.highlight ? 'font-bold text-green-700' : 'text-gray-600'
                  }`}
                >
                  {row.owner}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="px-4 py-3 bg-gray-50 border-t border-gray-200">
        <p className="text-xs text-gray-500 italic">
          * Assumes home appreciation of 3% annually and investment return of 5%
          annually
        </p>
      </div>
    </div>
  );
}
