'use client';

/**
 * Net Worth Comparison Chart - High-End FinTech Design
 * Gradient Area Chart showing Renter vs Owner net worth over time
 */

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
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

  // Custom Tooltip Component
  const CustomTooltip = ({ active, payload }: any) => {
    if (!active || !payload || payload.length === 0) return null;

    const data = payload[0].payload;
    return (
      <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-lg">
        <p className="text-sm font-semibold text-gray-900 mb-2">Year {data.year}</p>
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-blue-500" />
            <span className="text-xs text-gray-600">Renter:</span>
            <span className="text-xs font-semibold text-gray-900">
              {formatCurrency(data.renterNetWorth)}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-green-500" />
            <span className="text-xs text-gray-600">Owner:</span>
            <span className="text-xs font-semibold text-gray-900">
              {formatCurrency(data.ownerNetWorth)}
            </span>
          </div>
        </div>
        {breakEvenYear && data.year === Math.floor(breakEvenYear) && (
          <p className="text-xs text-blue-600 mt-2 font-semibold">
            ⚡ Break-even point
          </p>
        )}
      </div>
    );
  };

  return (
    <div className="w-full rounded-xl border border-gray-200 bg-white shadow-sm p-6">
      <div className="mb-6">
        <h3 className="text-xl font-bold text-gray-900">Net Worth Over Time</h3>
        <p className="text-sm text-gray-500 mt-1">
          Compare financial outcomes between renting and buying
          {breakEvenYear && ` • Break-even: Year ${breakEvenYear}`}
        </p>
      </div>

      <div className="w-full h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={dataPoints}
            margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
          >
            <defs>
              {/* Blue Gradient for Renter */}
              <linearGradient id="colorRenter" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
              </linearGradient>
              {/* Green Gradient for Owner */}
              <linearGradient id="colorOwner" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#22c55e" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
            <XAxis
              dataKey="year"
              ticks={[0, 5, 10, 15, 20, 25, 30]}
              stroke="#9ca3af"
              style={{ fontSize: '12px' }}
            />
            <YAxis
              tickFormatter={formatCurrency}
              stroke="#9ca3af"
              style={{ fontSize: '12px' }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="renterNetWorth"
              stroke="#3b82f6"
              strokeWidth={2}
              fill="url(#colorRenter)"
              name="Renter Net Worth"
            />
            <Area
              type="monotone"
              dataKey="ownerNetWorth"
              stroke="#22c55e"
              strokeWidth={2}
              fill="url(#colorOwner)"
              name="Owner Net Worth"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

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
