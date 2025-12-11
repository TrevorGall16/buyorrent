'use client';

/**
 * Net Worth Comparison Chart - Clean Line Chart Design
 * Clean line chart with axis labels (no gradients)
 */

import { useEffect, useState } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  Label,
} from 'recharts';
import { YearlyDataPoint } from '@/lib/types';

interface NetWorthChartProps {
  dataPoints: YearlyDataPoint[];
  currencySymbol: string;
  breakEvenYear: number | null;
  themeColor?: string;
  labels?: {
    chartTitle?: string;
    chartSubtitle?: string;
    chartAxisYear?: string;
    chartAxisAmount?: string;
  };
}

export default function NetWorthChart({
  dataPoints,
  currencySymbol,
  breakEvenYear,
  themeColor = '#22c55e', // Default green
  labels,
}: NetWorthChartProps) {
  // Detect dark mode for grid color
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // Check if dark mode is active
    const checkDarkMode = () => {
      setIsDarkMode(document.documentElement.classList.contains('dark'));
    };

    checkDarkMode();

    // Listen for theme changes
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

  const chartTitle = labels?.chartTitle || 'Net Worth Over Time';
  const chartSubtitle = labels?.chartSubtitle || 'Accumulated wealth comparison';
  const axisYearLabel = labels?.chartAxisYear || 'Years';
  const axisAmountLabel = labels?.chartAxisAmount || 'Net Worth';

  return (
    <div className="w-full rounded-xl border border-slate-200/60 dark:border-slate-700 border-t-white/60 dark:border-t-slate-600/60 bg-white dark:bg-slate-800 shadow-sm p-6">
      <div className="mb-6">
        <h3 className="text-xl font-bold tracking-tight text-slate-900 dark:text-gray-100">{chartTitle}</h3>
        <p className="text-sm text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">
          {chartSubtitle}. The <span className="inline-flex items-center gap-1"><span className="inline-block w-3 h-3 rounded-full bg-blue-500"></span><span className="font-medium text-blue-700 dark:text-blue-400">Renter</span></span> invests their down payment savings, while the <span className="inline-flex items-center gap-1"><span className="inline-block w-3 h-3 rounded-full" style={{ backgroundColor: themeColor }}></span><span className="font-medium" style={{ color: themeColor }}>Owner</span></span> builds equity. The higher line is the financial winner.
          {breakEvenYear && (
            <span className="block mt-1 text-blue-600 dark:text-blue-400 font-semibold">
              ⚡ Break-even point: Year {breakEvenYear}
            </span>
          )}
        </p>
      </div>

      <div className="w-full h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={dataPoints}
            key={dataPoints.length} // Force re-render when duration changes
            margin={{ top: 10, right: 10, left: 80, bottom: 40 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              stroke={isDarkMode ? '#334155' : '#e5e7eb'}
              vertical={true}
            />
            <XAxis
              dataKey="year"
              stroke={isDarkMode ? '#9ca3af' : '#9ca3af'}
              style={{ fontSize: '12px', fill: isDarkMode ? '#d1d5db' : '#6b7280' }}
              interval="preserveStartEnd"
            >
              <Label value={axisYearLabel} offset={-10} position="insideBottom" style={{ fontSize: '14px', fill: isDarkMode ? '#d1d5db' : '#6b7280', fontWeight: 600 }} />
            </XAxis>
            <YAxis
              tickFormatter={formatCurrency}
              stroke={isDarkMode ? '#9ca3af' : '#9ca3af'}
              style={{ fontSize: '12px', fill: isDarkMode ? '#d1d5db' : '#6b7280' }}
              width={80}
            >
              <Label value={`${axisAmountLabel} (${currencySymbol})`} angle={-90} position="insideLeft" style={{ fontSize: '14px', fill: isDarkMode ? '#d1d5db' : '#6b7280', fontWeight: 600, textAnchor: 'middle' }} />
            </YAxis>
            <Tooltip content={<CustomTooltip />} />
            <Line
              type="monotone"
              dataKey="renterNetWorth"
              stroke="#3b82f6"
              strokeWidth={3}
              dot={false}
              name="Renter Net Worth"
            />
            <Line
              type="monotone"
              dataKey="ownerNetWorth"
              stroke={themeColor}
              strokeWidth={3}
              dot={false}
              name="Owner Net Worth"
            />
          </LineChart>
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
