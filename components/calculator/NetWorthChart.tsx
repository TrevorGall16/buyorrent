'use client';

/**
 * Net Worth Comparison Chart
 * AreaChart with gradient showing Renter vs Owner net worth over time
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
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer } from '@/components/ui/chart';

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

  // Chart configuration for colors
  const chartConfig = {
    renterNetWorth: {
      label: "Renter Net Worth",
      color: "hsl(0, 84%, 60%)", // Red
    },
    ownerNetWorth: {
      label: "Owner Net Worth",
      color: "hsl(142, 71%, 45%)", // Green
    },
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Net Worth Over Time</CardTitle>
        <p className="text-sm text-muted-foreground">
          Compare financial outcomes between renting and buying
          {breakEvenYear && ` • Break-even: Year ${breakEvenYear}`}
        </p>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[400px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={dataPoints}
              margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
            >
              <defs>
                <linearGradient id="colorRenter" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(0, 84%, 60%)" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="hsl(0, 84%, 60%)" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorOwner" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(142, 71%, 45%)" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="hsl(142, 71%, 45%)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
              <XAxis
                dataKey="year"
                label={{ value: 'Years', position: 'insideBottom', offset: -5 }}
                className="text-xs"
              />
              <YAxis
                tickFormatter={formatCurrency}
                label={{ value: 'Net Worth', angle: -90, position: 'insideLeft' }}
                className="text-xs"
              />
              <Tooltip
                content={({ active, payload }) => {
                  if (!active || !payload || payload.length === 0) return null;

                  const data = payload[0].payload;
                  return (
                    <div className="rounded-lg border bg-background p-3 shadow-md">
                      <p className="text-sm font-semibold mb-2">Year {data.year}</p>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <div className="h-2 w-2 rounded-full" style={{ backgroundColor: 'hsl(0, 84%, 60%)' }} />
                          <span className="text-xs text-muted-foreground">Renter:</span>
                          <span className="text-xs font-medium">{formatCurrency(data.renterNetWorth)}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="h-2 w-2 rounded-full" style={{ backgroundColor: 'hsl(142, 71%, 45%)' }} />
                          <span className="text-xs text-muted-foreground">Owner:</span>
                          <span className="text-xs font-medium">{formatCurrency(data.ownerNetWorth)}</span>
                        </div>
                      </div>
                      {breakEvenYear && data.year === Math.floor(breakEvenYear) && (
                        <p className="text-xs text-primary mt-2 font-semibold">
                          ⚡ Break-even point
                        </p>
                      )}
                    </div>
                  );
                }}
              />
              <Area
                type="monotone"
                dataKey="renterNetWorth"
                stroke="hsl(0, 84%, 60%)"
                strokeWidth={2}
                fill="url(#colorRenter)"
                name="Renter Net Worth"
              />
              <Area
                type="monotone"
                dataKey="ownerNetWorth"
                stroke="hsl(142, 71%, 45%)"
                strokeWidth={2}
                fill="url(#colorOwner)"
                name="Owner Net Worth"
              />
            </AreaChart>
          </ResponsiveContainer>
        </ChartContainer>

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
      </CardContent>
    </Card>
  );
}
