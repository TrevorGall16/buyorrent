'use client';

/**
 * Net Worth Comparison Chart
 * Dual-line chart showing Renter vs Owner net worth over time
 */

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { YearlyDataPoint } from '@/lib/types';

interface NetWorthChartProps {
  dataPoints: YearlyDataPoint[];
  currencySymbol: string;
  breakEvenYear: number | null;
}

export default function NetWorthChart({
  dataPoints,
  currencySymbol,
  breakEvenYear,
}: NetWorthChartProps) {
  // Format currency for display
  const formatCurrency = (value: number) => {
    const absValue = Math.abs(value);
    if (absValue >= 1000000) {
      return `${currencySymbol}${(value / 1000000).toFixed(1)}M`;
    }
    if (absValue >= 1000) {
      return `${currencySymbol}${(value / 1000).toFixed(0)}K`;
    }
    return `${currencySymbol}${value.toFixed(0)}`;
  };

  // Custom tooltip
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white border border-gray-300 rounded-lg shadow-lg p-3">
          <p className="text-sm font-semibold text-gray-900 mb-2">
            Year {data.year}
          </p>
          <div className="space-y-1">
            <p className="text-xs text-red-600">
              Renter: {formatCurrency(data.renterNetWorth)}
            </p>
            <p className="text-xs text-green-600">
              Owner: {formatCurrency(data.ownerNetWorth)}
            </p>
          </div>
          {breakEvenYear && data.year === Math.floor(breakEvenYear) && (
            <p className="text-xs text-blue-600 mt-2 font-semibold">
              ⚡ Break-even point
            </p>
          )}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="w-full" role="img" aria-label="Net worth comparison chart">
      <ResponsiveContainer width="100%" height={400}>
        <LineChart
          data={dataPoints}
          margin={{ top: 5, right: 20, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis
            dataKey="year"
            label={{ value: 'Years', position: 'insideBottom', offset: -5 }}
            stroke="#6b7280"
          />
          <YAxis
            tickFormatter={formatCurrency}
            label={{ value: 'Net Worth', angle: -90, position: 'insideLeft' }}
            stroke="#6b7280"
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend
            wrapperStyle={{ paddingTop: '20px' }}
            iconType="line"
          />
          <Line
            type="monotone"
            dataKey="renterNetWorth"
            stroke="#ef4444"
            strokeWidth={2}
            name="Renter Net Worth"
            dot={false}
            activeDot={{ r: 6 }}
          />
          <Line
            type="monotone"
            dataKey="ownerNetWorth"
            stroke="#10b981"
            strokeWidth={2}
            name="Owner Net Worth"
            dot={false}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>

      {/* Accessibility: Text summary for screen readers */}
      <div className="sr-only" role="region" aria-label="Chart data summary">
        <p>
          This chart compares net worth between renting and buying over{' '}
          {dataPoints.length} years.
          {breakEvenYear
            ? ` Buying becomes financially better after ${breakEvenYear} years.`
            : ' Based on current assumptions, renting remains financially better throughout the analysis period.'}
        </p>
      </div>
    </div>
  );
}
