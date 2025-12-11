'use client';

/**
 * Dynamic Insight Engine Component
 * Generates 300+ word educational content based on calculation results
 * Adapts messaging based on break-even year (short vs. long-term scenarios)
 * Provides high-value content for AdSense compliance
 */

import Link from 'next/link';

interface InsightEngineProps {
  breakEvenYear: number;
  totalSavings: number;
  buyingPower: number;
  currencySymbol: string;
}

export default function InsightEngine({
  breakEvenYear,
}: InsightEngineProps) {
  // Determine scenario based on break-even year
  const isQuickEquity = breakEvenYear < 5;
  const isLongPayback = breakEvenYear > 15;
  const isBalanced = !isQuickEquity && !isLongPayback;

  // Dynamic title based on scenario
  const title = isQuickEquity
    ? 'Quick Equity Building: Buying Makes Strong Financial Sense'
    : isLongPayback
    ? 'Flexibility First: Renting Offers Better Financial Flexibility'
    : 'Market-Dependent Decision: Both Options Have Merit';

  // Icon based on scenario
  const Icon = () => {
    if (isQuickEquity) {
      return (
        <svg
          className="w-8 h-8 text-green-600 dark:text-green-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
          />
        </svg>
      );
    } else if (isLongPayback) {
      return (
        <svg
          className="w-8 h-8 text-blue-600 dark:text-blue-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      );
    } else {
      return (
        <svg
          className="w-8 h-8 text-amber-600 dark:text-amber-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
          />
        </svg>
      );
    }
  };

  return (
    <article className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl shadow-lg p-8 space-y-6">
      {/* Header with Icon */}
      <header className="flex items-start gap-4">
        <div className="flex-shrink-0 mt-1">
          <Icon />
        </div>
        <div className="flex-1">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-gray-100 tracking-tight mb-2">
            {title}
          </h2>
          <p className="text-sm text-slate-500 dark:text-gray-400">
            Analysis based on {breakEvenYear}-year break-even period
          </p>
        </div>
      </header>

      {/* Dynamic Content based on Scenario */}
      <div className="prose prose-slate dark:prose-invert max-w-none">
        {isQuickEquity && (
          <div className="space-y-4">
            <p className="text-slate-700 dark:text-gray-300 leading-relaxed">
              With a break-even point of just <strong>{breakEvenYear} years</strong>, purchasing a home in this market
              represents an exceptionally strong financial opportunity. This short payback period means that the
              upfront costs of homeownership including the down payment, closing costs, and ongoing maintenance are
              recovered relatively quickly through the combination of mortgage principal reduction (equity building)
              and potential property appreciation.
            </p>
            <p className="text-slate-700 dark:text-gray-300 leading-relaxed">
              In this scenario, buying offers several compelling advantages over renting. First, you begin building
              equity from day one, with each mortgage payment increasing your ownership stake in a tangible asset.
              Second, you gain protection against rent inflation, which can significantly erode purchasing power over
              time. Third, homeownership provides stability and predictability in your housing costs, particularly if
              you secure a fixed-rate mortgage. Finally, you maintain the flexibility to leverage your home equity for
              future investments or financial needs.
            </p>
            <p className="text-slate-700 dark:text-gray-300 leading-relaxed">
              The favorable economics in this market likely reflect a combination of factors: relatively affordable
              home prices compared to rental rates, low interest rates, and strong potential for property value
              appreciation. However, this analysis assumes you plan to stay in the home for at least the break-even
              period. Selling before reaching this threshold could result in a financial loss when accounting for
              transaction costs and the initial years where interest payments dominate your mortgage.
            </p>
          </div>
        )}

        {isLongPayback && (
          <div className="space-y-4">
            <p className="text-slate-700 dark:text-gray-300 leading-relaxed">
              With a break-even period extending beyond <strong>{breakEvenYear} years</strong>, this market presents a
              more challenging case for homeownership from a pure financial perspective. The extended timeframe required
              to recoup the substantial upfront costs of buying suggests that renting may offer superior financial
              flexibility and potentially better wealth-building opportunities through alternative investments.
            </p>
            <p className="text-slate-700 dark:text-gray-300 leading-relaxed">
              In markets with long break-even periods, several factors typically contribute to making renting more
              attractive. The opportunity cost of tying up capital in a down payment and closing costs can be
              significant if that money could earn higher returns in diversified investment portfolios. Additionally,
              renters avoid exposure to property value fluctuations, major maintenance expenses, and the transaction
              costs associated with selling a home. The flexibility to relocate for career opportunities without the
              burden of selling property can also provide substantial economic and personal value.
            </p>
            <p className="text-slate-700 dark:text-gray-300 leading-relaxed">
              However, it is important to recognize that financial calculations do not capture the full picture.
              Homeownership offers intangible benefits such as stability, the freedom to customize your living space,
              and the psychological satisfaction of owning rather than renting. Some individuals may reasonably conclude
              that these non-financial factors justify homeownership even when the break-even analysis favors renting.
              The decision ultimately depends on your personal priorities, career stability, and long-term plans for the area.
            </p>
          </div>
        )}

        {isBalanced && (
          <div className="space-y-4">
            <p className="text-slate-700 dark:text-gray-300 leading-relaxed">
              With a break-even point around <strong>{breakEvenYear} years</strong>, this market presents a nuanced
              decision where neither buying nor renting holds a decisive financial advantage. This middle-ground
              scenario requires careful consideration of both quantitative financial factors and qualitative personal
              circumstances to determine the optimal choice for your situation.
            </p>
            <p className="text-slate-700 dark:text-gray-300 leading-relaxed">
              In balanced markets like this, the right decision often hinges on your specific situation. If you
              anticipate staying in the area for significantly longer than the break-even period, buying may make more
              sense as you will eventually reap the long-term benefits of equity accumulation and inflation protection.
              Conversely, if your career or personal circumstances suggest possible relocation within the break-even
              timeframe, renting preserves flexibility without the risk of financial loss from an early sale.
            </p>
            <p className="text-slate-700 dark:text-gray-300 leading-relaxed">
              Beyond the financial calculation, consider factors such as the stability of local property values, your
              career trajectory, family planning considerations, and personal preferences regarding homeownership
              responsibilities. Some people thrive on the control and permanence that comes with owning a home, while
              others value the simplicity and mobility that renting provides. In a market where the financial case is
              relatively neutral, these personal factors should carry greater weight in your decision-making process.
            </p>
          </div>
        )}
      </div>

      {/* Key Takeaways Section */}
      <section className="bg-slate-50 dark:bg-slate-900 rounded-lg p-6 border border-slate-200 dark:border-slate-700">
        <h3 className="text-lg font-bold text-slate-900 dark:text-gray-100 mb-4 flex items-center gap-2">
          <svg
            className="w-5 h-5 text-blue-600 dark:text-blue-400"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
              clipRule="evenodd"
            />
          </svg>
          Key Takeaways
        </h3>
        <ul className="space-y-3">
          <li className="flex items-start gap-3">
            <svg
              className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
            <span className="text-slate-700 dark:text-gray-300">
              <strong>Break-even threshold:</strong> You need to stay at least {breakEvenYear} years for buying to
              financially outperform renting in this market.
            </span>
          </li>
          <li className="flex items-start gap-3">
            <svg
              className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
            <span className="text-slate-700 dark:text-gray-300">
              <strong>Opportunity cost matters:</strong> Money used for a down payment could potentially earn returns
              elsewhere, which is factored into this analysis through the investment return rate.
            </span>
          </li>
          <li className="flex items-start gap-3">
            <svg
              className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
            <span className="text-slate-700 dark:text-gray-300">
              <strong>Hidden costs included:</strong> This calculation accounts for property taxes, maintenance,
              insurance, closing costs, and rent inflation to provide a comprehensive comparison.
            </span>
          </li>
          <li className="flex items-start gap-3">
            <svg
              className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
            <span className="text-slate-700 dark:text-gray-300">
              <strong>Personal factors matter:</strong> Financial calculations cannot capture lifestyle preferences,
              family stability needs, or the psychological value of homeownership.
            </span>
          </li>
        </ul>
      </section>

      {/* Methodology Note */}
      <footer className="pt-4 border-t border-slate-200 dark:border-slate-700">
        <p className="text-sm text-slate-600 dark:text-gray-400 leading-relaxed">
          <strong className="text-slate-900 dark:text-gray-100">Methodology:</strong> This analysis uses a
          comprehensive net worth comparison model that tracks all costs and benefits over time. Learn more about our
          calculation methodology, assumptions, and data sources on our{' '}
          <Link
            href="/how-it-works"
            className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 underline font-medium"
          >
            How It Works
          </Link>{' '}
          page.
        </p>
      </footer>
    </article>
  );
}
