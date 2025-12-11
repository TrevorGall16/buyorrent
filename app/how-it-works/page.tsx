import { Metadata } from 'next';
import Link from 'next/link';
import GlobalDisclaimer from '@/components/GlobalDisclaimer';
import AdUnit from '@/components/ads/AdUnit';

export const metadata: Metadata = {
  title: 'How It Works - RentOrBuy-Pro',
  description: 'Understand the methodology behind our rent vs buy calculator. Learn about total cost of ownership, opportunity cost, and financial projections.',
  keywords: ['rent vs buy methodology', 'calculator methodology', 'opportunity cost', 'home buying analysis', 'total cost of ownership'],
};

export default function HowItWorksPage() {
  return (
    <main className="min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm border border-white/50 dark:border-slate-800 rounded-xl shadow-lg shadow-slate-200/50 dark:shadow-slate-900/50 p-8 md:p-12">
          {/* Header */}
          <div className="mb-8">
            <Link
              href="/"
              className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-6 transition-colors"
            >
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
              Back to Home
            </Link>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">How Our Calculator Works</h1>
            <p className="text-gray-600">Understanding the methodology behind rent vs buy analysis</p>
          </div>

          {/* Content */}
          <div className="prose prose-gray max-w-none">
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Introduction</h2>
              <p className="text-gray-700 mb-4">
                The rent vs buy decision is one of the most significant financial choices you'll make. But comparing
                just monthly payments misleads you—a $2,500 monthly rent payment isn't directly comparable to a $2,500
                mortgage payment because they represent fundamentally different financial commitments.
              </p>
              <p className="text-gray-700 mb-4">
                Our calculator answers the real question: <strong>Which option leaves you financially better off over time?</strong>
                We project your net worth 30 years into the future under both scenarios, accounting for all costs,
                investment returns, and home appreciation.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Total Cost of Ownership: Buying</h2>
              <p className="text-gray-700 mb-4">
                When you buy a home, you're not just paying the purchase price. Here's what we factor into the true cost:
              </p>

              <h3 className="text-xl font-semibold text-gray-800 mb-3">Upfront Costs</h3>
              <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
                <li><strong>Down Payment:</strong> Typically 20% of the home price. This money is locked into the property
                and can't be invested elsewhere.</li>
                <li><strong>Closing Costs:</strong> Vary significantly by country—3% in the US, 12% in Germany. These include
                transfer taxes, legal fees, and registration costs.</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-800 mb-3">Monthly Costs</h3>
              <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
                <li><strong>Mortgage Payment:</strong> Principal and interest on your loan. We use standard amortization
                formulas to calculate this based on your interest rate and loan term.</li>
                <li><strong>Property Tax:</strong> Annual tax based on your home's value. Rates vary by location—1.1%
                annually in the US, 0.35% in Germany.</li>
                <li><strong>Maintenance:</strong> We assume 1% of home value annually for repairs, upkeep, and replacements.</li>
                <li><strong>Insurance:</strong> Homeowners insurance to protect your investment.</li>
              </ul>

              <div className="bg-blue-50 border-l-4 border-blue-400 p-4 my-6">
                <p className="text-sm text-blue-800">
                  <strong>Example:</strong> A $500,000 home with 20% down:
                </p>
                <ul className="text-sm text-blue-800 mt-2 space-y-1">
                  <li>• Down payment: $100,000</li>
                  <li>• Loan amount: $400,000</li>
                  <li>• Monthly mortgage (6.5%, 30 years): $2,528</li>
                  <li>• Property tax: $458/month</li>
                  <li>• Maintenance: $417/month</li>
                  <li>• <strong>Total monthly: ~$3,403</strong></li>
                </ul>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Total Cost of Ownership: Renting</h2>
              <p className="text-gray-700 mb-4">
                Renting appears simpler, but there are still important costs and considerations:
              </p>

              <h3 className="text-xl font-semibold text-gray-800 mb-3">Upfront Costs</h3>
              <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
                <li><strong>Security Deposit:</strong> Usually 1-2 months' rent, refundable when you move out.</li>
                <li><strong>Broker Fee:</strong> In some markets (like Germany), you may pay 1-2 months' rent as a broker commission.</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-800 mb-3">Monthly Costs</h3>
              <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
                <li><strong>Rent Payment:</strong> Your monthly payment to the landlord.</li>
                <li><strong>Rent Increases:</strong> We assume 3% annual increases, matching typical inflation rates.</li>
              </ul>

              <div className="bg-blue-50 border-l-4 border-blue-400 p-4 my-6">
                <p className="text-sm text-blue-800">
                  <strong>Example:</strong> Starting rent of $2,500/month with 3% annual increases:
                </p>
                <ul className="text-sm text-blue-800 mt-2 space-y-1">
                  <li>• Year 1: $2,500/month</li>
                  <li>• Year 5: $2,897/month</li>
                  <li>• Year 10: $3,358/month</li>
                  <li>• Year 20: $4,515/month</li>
                  <li>• Year 30: $6,068/month</li>
                </ul>
              </div>
            </section>

            {/* Ad Placement - After second section */}
            <div className="my-8 flex justify-center">
              <AdUnit format="banner" />
            </div>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Opportunity Cost: The Hidden Factor</h2>
              <p className="text-gray-700 mb-4">
                This is where most rent vs buy calculators fall short. When you buy, your down payment is locked in the home.
                When you rent, that same money can be invested in stocks, bonds, or other assets.
              </p>

              <p className="text-gray-700 mb-4">
                <strong>Here's the key insight:</strong> A renter who invests their down payment savings in a diversified portfolio
                earning 5% annually can build substantial wealth over time.
              </p>

              <div className="bg-blue-50 border-l-4 border-blue-400 p-4 my-6">
                <p className="text-sm text-blue-800">
                  <strong>Example:</strong> $100,000 invested at 5% annual return:
                </p>
                <ul className="text-sm text-blue-800 mt-2 space-y-1">
                  <li>• Year 5: $127,628</li>
                  <li>• Year 10: $162,889</li>
                  <li>• Year 20: $265,330</li>
                  <li>• Year 30: $432,194</li>
                </ul>
              </div>

              <p className="text-gray-700 mb-4">
                Meanwhile, the buyer's "investment" is their growing home equity. As they pay down their mortgage and
                the home appreciates (we assume 3% annually), their net worth from homeownership grows.
              </p>

              <p className="text-gray-700 mb-4">
                Our calculator projects both scenarios side by side, showing you which path builds more wealth over your intended timeline.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Net Worth Over Time</h2>
              <p className="text-gray-700 mb-4">
                The chart in our calculator shows your projected net worth under both scenarios:
              </p>

              <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
                <li><strong>Buyer Net Worth = Home Equity - Mortgage Balance</strong>
                  <ul className="list-circle pl-6 mt-2 space-y-1">
                    <li>Home equity grows as your home appreciates in value</li>
                    <li>Mortgage balance decreases as you make monthly payments</li>
                    <li>Early years: Net worth grows slowly due to high mortgage balance</li>
                    <li>Later years: Accelerating growth as mortgage gets paid off</li>
                  </ul>
                </li>
                <li><strong>Renter Net Worth = Investment Portfolio Value</strong>
                  <ul className="list-circle pl-6 mt-2 space-y-1">
                    <li>Starts with your down payment savings invested</li>
                    <li>Grows through compound returns</li>
                    <li>Additional monthly savings (if rent is cheaper) can be invested</li>
                  </ul>
                </li>
              </ul>

              <p className="text-gray-700 mb-4">
                The lines often cross—this crossover point is called the <strong>break-even point</strong>.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Understanding Break-Even</h2>
              <p className="text-gray-700 mb-4">
                The break-even point tells you how long you need to own the home before buying becomes financially better than renting.
              </p>

              <p className="text-gray-700 mb-4">
                <strong>Example:</strong> If break-even is 7 years, it means:
              </p>
              <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
                <li>If you sell before 7 years: You would have been better off renting</li>
                <li>If you stay 7+ years: Buying builds more wealth than renting</li>
                <li>The longer you stay past break-even, the more buying pays off</li>
              </ul>

              <p className="text-gray-700 mb-4">
                This accounts for all costs: down payment, closing costs, monthly expenses, opportunity cost, and tax benefits.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Key Assumptions</h2>
              <p className="text-gray-700 mb-4">
                Every financial model requires assumptions. Here are ours, with the reasoning behind them:
              </p>

              <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
                <li><strong>Home Appreciation: 3% annually</strong> - Matches long-term US historical averages. Adjust for your local market.</li>
                <li><strong>Rent Inflation: 3% annually</strong> - Typical inflation rate for rental markets.</li>
                <li><strong>Investment Return: 5% annually</strong> - Conservative estimate for a diversified stock/bond portfolio.</li>
                <li><strong>Property Tax:</strong> Country-specific (1.1% US, 0.35% Germany, etc.)</li>
                <li><strong>Maintenance: 1% of home value annually</strong> - Standard rule of thumb for upkeep costs.</li>
                <li><strong>Closing Costs:</strong> Country-specific (3% US, 12% Germany, etc.)</li>
              </ul>

              <p className="text-gray-700 mb-4">
                <strong>Important:</strong> You can adjust all of these in the Advanced Settings. Use your local knowledge
                and personal situation to customize the analysis.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">What We DON'T Account For</h2>
              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
                <p className="text-sm text-yellow-800 font-semibold mb-2">
                  This is NOT financial advice. We are NOT financial advisors.
                </p>
              </div>

              <p className="text-gray-700 mb-4">
                Our calculator provides a solid financial starting point, but it doesn't capture everything:
              </p>

              <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
                <li><strong>Lifestyle Factors:</strong> Space, location, flexibility, pride of ownership</li>
                <li><strong>Tax Situations:</strong> Your specific tax deductions vary based on income, filing status, and local laws</li>
                <li><strong>Personal Circumstances:</strong> Job security, family plans, health considerations</li>
                <li><strong>Emotional Value:</strong> The non-financial benefits of homeownership or renting freedom</li>
                <li><strong>Market Timing:</strong> We can't predict short-term market fluctuations</li>
                <li><strong>Hyperlocal Conditions:</strong> Neighborhood-specific trends and developments</li>
              </ul>

              <p className="text-gray-700 mb-4">
                <strong>We provide:</strong> A data-driven financial analysis to inform your decision.
              </p>
              <p className="text-gray-700 mb-4">
                <strong>We DON'T provide:</strong> Personal advice tailored to your unique situation.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">How to Use This Calculator</h2>
              <ol className="list-decimal pl-6 mb-4 text-gray-700 space-y-2">
                <li><strong>Find your city</strong> or use the global calculator for any location</li>
                <li><strong>Review the default values</strong> - they're based on local market data</li>
                <li><strong>Adjust the numbers</strong> to match your specific situation (down payment, interest rate, etc.)</li>
                <li><strong>Open Advanced Settings</strong> to fine-tune assumptions like appreciation rates</li>
                <li><strong>Review the 30-year projection</strong> and note the break-even point</li>
                <li><strong>Consider your timeline</strong> - how long do you plan to stay?</li>
                <li><strong>Use this as ONE input</strong> in your decision-making process</li>
                <li><strong>Consult professionals</strong> - talk to a financial advisor, tax professional, and real estate agent</li>
              </ol>

              <p className="text-gray-700 mb-4">
                Remember: This calculator shows financial outcomes. Your decision should also consider lifestyle,
                flexibility, career plans, and personal preferences.
              </p>
            </section>

            <section className="mb-8">
              <GlobalDisclaimer variant="inline" />
            </section>
          </div>

          {/* Footer */}
          <div className="mt-12 pt-8 border-t border-gray-200">
            <Link
              href="/"
              className="inline-flex items-center text-blue-600 hover:text-blue-700 transition-colors"
            >
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
