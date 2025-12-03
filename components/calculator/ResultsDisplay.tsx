'use client';

/**
 * Results Display Component
 * Shows break-even verdict, trust badge, and recommendation
 */

import { BreakEvenResult } from '@/lib/types';

interface ResultsDisplayProps {
  breakEven: BreakEvenResult;
  recommendation: 'buy' | 'rent' | 'neutral';
  cityName: string;
  dataUpdated: string;
}

export default function ResultsDisplay({
  breakEven,
  recommendation,
  cityName,
  dataUpdated,
}: ResultsDisplayProps) {
  // Determine verdict message
  const getVerdictMessage = (): {
    title: string;
    message: string;
    icon: string;
    color: 'green' | 'red';
  } => {
    if (breakEven.year === null) {
      return {
        title: 'Renting is Better',
        message: `In ${cityName}, renting remains financially advantageous throughout the 30-year period based on current market conditions.`,
        icon: '🏢',
        color: 'red' as const,
      };
    }

    const years = Math.floor(breakEven.exactPoint || breakEven.year);
    const months = breakEven.month || 0;

    if (years <= 5) {
      return {
        title: `Buying is Better After ${years} Years`,
        message: `In ${cityName}, buying becomes financially better after approximately ${years} years${months > 0 ? ` and ${months} months` : ''}.`,
        icon: '🏠',
        color: 'green' as const,
      };
    }

    return {
      title: `Buying is Better After ${years} Years`,
      message: `In ${cityName}, you'll need to stay at least ${years} years${months > 0 ? ` and ${months} months` : ''} for buying to make financial sense.`,
      icon: '🏠',
      color: 'green' as const,
    };
  };

  const verdict = getVerdictMessage();
  const colorClasses = {
    green: {
      bg: 'bg-green-50',
      border: 'border-green-200',
      text: 'text-green-900',
      badge: 'bg-green-600',
    },
    red: {
      bg: 'bg-red-50',
      border: 'border-red-200',
      text: 'text-red-900',
      badge: 'bg-red-600',
    },
  } as const;

  const colors = colorClasses[verdict.color];

  return (
    <div className="relative">
      {/* Verdict Card - HERO SIZE */}
      <div
        className={`${colors.bg} ${colors.border} border-2 rounded-xl p-8 md:p-12`}
        role="status"
        aria-live="polite"
      >
        {/* Trust Badge - Positioned in top-right corner */}
        <div className="absolute top-4 right-4">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/90 backdrop-blur border border-blue-200 rounded-full shadow-sm">
            <svg
              className="w-4 h-4 text-blue-600"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
            <span className="text-xs font-medium text-blue-700">
              Market Data for {cityName} • Updated {dataUpdated}
            </span>
          </div>
        </div>

        <div className="flex items-start gap-6">
          {/* Large Icon */}
          <div className="text-6xl md:text-7xl" aria-hidden="true">
            {verdict.icon}
          </div>

          <div className="flex-1 pt-2">
            {/* HERO Title - Much Larger */}
            <h2 className={`text-4xl md:text-5xl font-bold ${colors.text} mb-4 leading-tight`}>
              {verdict.title}
            </h2>

            {/* Message */}
            <p className="text-lg md:text-xl text-gray-700 leading-relaxed mb-6">
              {verdict.message}
            </p>

            {/* Recommendation Badge - Larger */}
            <div>
              <span
                className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold text-white ${colors.badge}`}
              >
                {recommendation === 'buy' && '✓ Buying Recommended'}
                {recommendation === 'rent' && '✓ Renting Recommended'}
                {recommendation === 'neutral' && '≈ Roughly Equivalent'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
