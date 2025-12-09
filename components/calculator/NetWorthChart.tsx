'use client';

/**
 * Net Worth Comparison Chart - High-End FinTech Design
 * Gradient Area Chart using Standard Recharts
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
  themeColor?: string;
}

export default function NetWorthChart({
  dataPoints,
  currencySymbol,
  breakEvenYear,
  themeColor = '#22c55e', // Default green
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

  // Custom Tooltip
  const CustomTooltip = ({ active, payload }: any) => {
    if (!active || !payload || payload.length === 0) return null;

    const data = payload[0].payload;
    return (
      <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-lg">
        <p className="text-sm font-semibold text-gray-900 mb-2">
          Year {data.year}
        </p>
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-blue-500" />
            <span className="text-xs text-gray-600">Renter:</span>
            <span className="text-xs font-semibold text-gray-900">
              {formatCurrency(data.renterNetWorth)}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div
              className="h-3 w-3 rounded-full"
              style={{ backgroundColor: themeColor }}
            />
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
    <div className="w-full rounded-xl border border-slate-200/60 border-t-white/60 bg-white shadow-sm p-6">
      <div className="mb-6">
        <h3 className="text-xl font-bold tracking-tight text-slate-900">Net Worth Over Time</h3>
        <p className="text-sm text-slate-600 mt-2 leading-relaxed">
          This chart compares accumulated wealth over time. The <span className="inline-flex items-center gap-1"><span className="inline-block w-3 h-3 rounded-full bg-blue-500"></span><span className="font-medium text-blue-700">Renter</span></span> invests their down payment savings, while the <span className="inline-flex items-center gap-1"><span className="inline-block w-3 h-3 rounded-full" style={{ backgroundColor: themeColor }}></span><span className="font-medium" style={{ color: themeColor }}>Owner</span></span> builds equity. The higher line is the financial winner.
          {breakEvenYear && (
            <span className="block mt-1 text-blue-600 font-semibold">
              ⚡ Break-even point: Year {breakEvenYear}
            </span>
          )}
        </p>
      </div>

      <div className="w-full h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={dataPoints}
            margin={{ top: 10, right: 10, left: 60, bottom: 0 }}
          >
            <defs>
              {/* Blue Gradient for Rent */}
              <linearGradient id="rentFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.1} />
              </linearGradient>
              {/* Dynamic Gradient for Buy - Uses Country Theme Color */}
              <linearGradient id="buyFill" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor={themeColor}
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor={themeColor}
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#e5e7eb"
              vertical={true}
            />
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
              width={80}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="renterNetWorth"
              stroke="#3b82f6"
              strokeWidth={2}
              fill="url(#rentFill)"
              name="Renter Net Worth"
            />
            <Area
              type="monotone"
              dataKey="ownerNetWorth"
              stroke={themeColor}
              strokeWidth={2}
              fill="url(#buyFill)"
              name="Owner Net Worth"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Accessibility */}
      <div className="sr-only">
        This chart compares net worth between renting and buying over{' '}
        {dataPoints.length} years.
        {breakEvenYear
          ? ` Buying becomes financially better after ${breakEvenYear} years.`
          : ' Renting remains financially better throughout the analysis period.'}
      </div>
    </div>
  );
}
