'use client';

/**
 * Net Worth Comparison Chart - High-End FinTech Design
 * Gradient Area Chart using Standard Recharts with Dark Mode Support
 */

import { useEffect, useState } from 'react';
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
  const [isDark, setIsDark] = useState(false);

  // Check if dark mode is active
  useEffect(() => {
    const checkDarkMode = () => {
      setIsDark(document.documentElement.classList.contains('dark'));
    };

    checkDarkMode();

    // Watch for dark mode changes
    const observer = new MutationObserver(checkDarkMode);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });

    return () => observer.disconnect();
  }, []);

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
      <div className="rounded-lg border border-gray-200 dark:border-slate-600 bg-white dark:bg-slate-800 p-4 shadow-lg">
        <p className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-2">
          Year {data.year}
        </p>
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-blue-500" />
            <span className="text-xs text-gray-600 dark:text-gray-400">Renter:</span>
            <span className="text-xs font-semibold text-gray-900 dark:text-gray-100">
              {formatCurrency(data.renterNetWorth)}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div
              className="h-3 w-3 rounded-full"
              style={{ backgroundColor: themeColor }}
            />
            <span className="text-xs text-gray-600 dark:text-gray-400">Owner:</span>
            <span className="text-xs font-semibold text-gray-900 dark:text-gray-100">
              {formatCurrency(data.ownerNetWorth)}
            </span>
          </div>
        </div>
        {breakEvenYear && data.year === Math.floor(breakEvenYear) && (
          <p className="text-xs text-blue-600 dark:text-blue-400 mt-2 font-semibold">
            ⚡ Break-even point
          </p>
        )}
      </div>
    );
  };

  // Grid and axis colors for dark mode
  const gridColor = isDark ? '#475569' : '#e5e7eb'; // slate-600 : gray-200
  const axisColor = isDark ? '#94a3b8' : '#9ca3af'; // slate-400 : gray-400
  const textColor = isDark ? '#e2e8f0' : '#374151'; // slate-200 : gray-700

  return (
    <div className="w-full rounded-xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-sm p-6">
      <div className="mb-6">
        <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">Net Worth Over Time</h3>
        <p className="text-sm text-gray-500 dark:text-slate-400 mt-1">
          Compare financial outcomes between renting and buying
          {breakEvenYear && ` • Break-even: Year ${breakEvenYear}`}
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
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={isDark ? 0.6 : 0.8} />
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.1} />
              </linearGradient>
              {/* Dynamic Gradient for Buy - Uses Country Theme Color */}
              <linearGradient id="buyFill" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor={themeColor}
                  stopOpacity={isDark ? 0.6 : 0.8}
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
              stroke={gridColor}
              vertical={true}
            />
            <XAxis
              dataKey="year"
              ticks={[0, 5, 10, 15, 20, 25, 30]}
              stroke={axisColor}
              style={{ fontSize: '12px', fill: textColor }}
            />
            <YAxis
              tickFormatter={formatCurrency}
              stroke={axisColor}
              style={{ fontSize: '12px', fill: textColor }}
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
