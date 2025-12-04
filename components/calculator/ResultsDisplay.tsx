'use client';

/**
 * Results Display Component
 * Shows break-even verdict, trust badge, and recommendation
 */

import { useState } from 'react';
import { BreakEvenResult } from '@/lib/types';

interface ResultsDisplayProps {
  breakEven: BreakEvenResult;
  recommendation: 'buy' | 'rent' | 'neutral';
  cityName: string;
  dataUpdated: string;
  themeColor?: string;
  currentState: {
    homePrice: number;
    monthlyRent: number;
    downPaymentPercent: number;
    interestRate: number;
    loanTermYears: number;
    propertyTaxRate: number;
    maintenanceRate: number;
    rentInflationRate: number;
    investmentReturnRate: number;
    marginalTaxRate: number;
    yearsToPlot: number;
  };
  defaultInputs: any;
  pathname: string;
  labels: {
    rentingBetter: string;
    buyingBetterAfter: string;
    years: string;
    months: string;
    and: string;
    buyingMessage: string;
    rentingMessage: string;
    stayAtLeast: string;
    forBuyingToMakeSense: string;
    marketData: string;
    updated: string;
    buyingRecommended: string;
    rentingRecommended: string;
    roughlyEquivalent: string;
  };
}

export default function ResultsDisplay({
  breakEven,
  recommendation,
  cityName,
  themeColor,
  currentState,
  defaultInputs,
  pathname,
  labels,
}: ResultsDisplayProps) {
  const [copySuccess, setCopySuccess] = useState(false);

  // Handle share button click - build URL with all current state
  const handleShare = async () => {
    try {
      const params = new URLSearchParams(window.location.search);

      // Only add params if they differ from defaults
      if (currentState.homePrice !== defaultInputs.homePrice)
        params.set('price', currentState.homePrice.toString());
      else params.delete('price');

      if (currentState.monthlyRent !== defaultInputs.monthlyRent)
        params.set('rent', currentState.monthlyRent.toString());
      else params.delete('rent');

      if (currentState.downPaymentPercent !== defaultInputs.purchase.downPaymentPercent)
        params.set('down', currentState.downPaymentPercent.toString());
      else params.delete('down');

      if (currentState.interestRate !== defaultInputs.purchase.interestRate)
        params.set('rate', currentState.interestRate.toString());
      else params.delete('rate');

      if (currentState.loanTermYears !== defaultInputs.purchase.loanTermYears)
        params.set('term', currentState.loanTermYears.toString());
      else params.delete('term');

      if (currentState.propertyTaxRate !== defaultInputs.purchase.propertyTaxRate)
        params.set('tax', currentState.propertyTaxRate.toString());
      else params.delete('tax');

      if (currentState.maintenanceRate !== defaultInputs.purchase.maintenanceRate)
        params.set('maint', currentState.maintenanceRate.toString());
      else params.delete('maint');

      if (currentState.rentInflationRate !== defaultInputs.rental.rentInflationRate)
        params.set('rinfl', currentState.rentInflationRate.toString());
      else params.delete('rinfl');

      if (currentState.investmentReturnRate !== defaultInputs.financial.investmentReturnRate)
        params.set('invest', currentState.investmentReturnRate.toString());
      else params.delete('invest');

      if (currentState.marginalTaxRate !== defaultInputs.financial.marginalTaxRate)
        params.set('mtax', currentState.marginalTaxRate.toString());
      else params.delete('mtax');

      if (currentState.yearsToPlot !== 30)
        params.set('years', currentState.yearsToPlot.toString());
      else params.delete('years');

      // Build full URL
      const shareUrl = params.toString()
        ? `${window.location.origin}${pathname}?${params.toString()}`
        : `${window.location.origin}${pathname}`;

      await navigator.clipboard.writeText(shareUrl);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    } catch (err) {
      console.error('Failed to copy URL:', err);
    }
  };

  // Determine verdict message
  const getVerdictMessage = (): {
    title: string;
    message: string;
    icon: string;
    color: 'green' | 'red';
  } => {
    if (breakEven.year === null) {
      return {
        title: labels.rentingBetter,
        message: `${cityName}, ${labels.rentingMessage}.`,
        icon: '🏢',
        color: 'red' as const,
      };
    }

    const years = Math.floor(breakEven.exactPoint || breakEven.year);
    const months = breakEven.month || 0;

    if (years <= 5) {
      return {
        title: `${labels.buyingBetterAfter} ${years} ${labels.years}`,
        message: `${cityName}, ${labels.buyingMessage} ${years} ${labels.years}${months > 0 ? ` ${labels.and} ${months} ${labels.months}` : ''}.`,
        icon: '🏠',
        color: 'green' as const,
      };
    }

    return {
      title: `${labels.buyingBetterAfter} ${years} ${labels.years}`,
      message: `${cityName}, ${labels.stayAtLeast} ${years} ${labels.years}${months > 0 ? ` ${labels.and} ${months} ${labels.months}` : ''} ${labels.forBuyingToMakeSense}.`,
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
      {/* Verdict Card - HERO SIZE with Theme Color Border */}
      <div
        className={`${colors.bg} ${colors.border} border-2 rounded-xl p-8 md:p-12`}
        style={themeColor ? { borderTopWidth: '6px', borderTopColor: themeColor } : undefined}
        role="status"
        aria-live="polite"
      >
        {/* Trust Badge - Positioned in top-right corner */}
        <div className="absolute top-4 right-4">
          <div
            className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/90 backdrop-blur border border-blue-200 rounded-full shadow-sm group relative"
            title="Sources: Aggregated estimates from Zillow, Redfin, Numbeo, and SeLoger."
          >
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
              {labels.marketData} {cityName} • {labels.updated} Jan 2025
            </span>

            {/* Tooltip */}
            <div className="absolute bottom-full right-0 mb-2 hidden group-hover:block z-10 w-64">
              <div className="bg-gray-900 text-white text-xs rounded-lg py-2 px-3 shadow-lg">
                Sources: Aggregated estimates from Zillow, Redfin, Numbeo, and SeLoger.
                <div className="absolute top-full right-4 -mt-1">
                  <div className="border-4 border-transparent border-t-gray-900"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-start gap-6">
          {/* Large Icon */}
          <div className="text-6xl md:text-7xl" aria-hidden="true">
            {verdict.icon}
          </div>

          <div className="flex-1 pt-2">
            {/* HERO Title - Much Larger with Theme Color */}
            <h2
              className="text-4xl md:text-5xl font-bold mb-4 leading-tight"
              style={themeColor ? { color: themeColor } : undefined}
            >
              {verdict.title}
            </h2>

            {/* Message */}
            <p className="text-lg md:text-xl text-gray-700 leading-relaxed mb-6">
              {verdict.message}
            </p>

            {/* Recommendation Badge and Share Button */}
            <div className="flex flex-wrap items-center gap-3">
              <span
                className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold text-white ${colors.badge}`}
              >
                {recommendation === 'buy' && `✓ ${labels.buyingRecommended}`}
                {recommendation === 'rent' && `✓ ${labels.rentingRecommended}`}
                {recommendation === 'neutral' && `≈ ${labels.roughlyEquivalent}`}
              </span>

              {/* Share Button */}
              <button
                onClick={handleShare}
                className={`inline-flex items-center gap-2 px-4 py-2 font-semibold text-sm rounded-full transition-colors shadow-sm ${
                  copySuccess
                    ? 'bg-green-600 hover:bg-green-700 text-white'
                    : 'bg-blue-600 hover:bg-blue-700 text-white'
                }`}
                aria-label="Share this scenario"
              >
                {copySuccess ? (
                  <>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    ✅ Link Copied!
                  </>
                ) : (
                  <>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                    </svg>
                    Share this Scenario
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
