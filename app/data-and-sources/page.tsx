import { Metadata } from 'next';
import Link from 'next/link';
import GlobalDisclaimer from '@/components/GlobalDisclaimer';

export const metadata: Metadata = {
  title: 'Data & Sources - RentOrBuy-Pro',
  description: 'Learn about our data sources, modeling methodology, and limitations. Full transparency about where our numbers come from.',
  keywords: ['data sources', 'real estate data', 'rental data', 'methodology', 'data transparency'],
};

export default function DataSourcesPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12">
      <div className="max-w-4xl mx-auto px-4">
        {/* PROMINENT WARNING BANNER */}
        <GlobalDisclaimer variant="warning" />

        <div className="bg-white rounded-xl shadow-lg p-8 md:p-12">
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
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Our Data & Sources</h1>
            <p className="text-gray-600">Transparency about where our numbers come from and how we use them</p>
          </div>

          {/* Content */}
          <div className="prose prose-gray max-w-none">
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Data Philosophy</h2>
              <p className="text-gray-700 mb-4">
                We believe in <strong>transparency first</strong>. You deserve to know exactly where our numbers come from,
                how we calculate defaults, and what limitations exist in our data. We're honest about what we know—and what we don't.
              </p>
              <p className="text-gray-700 mb-4">
                This page explains our data sources, modeling methods, and the responsible way to use our calculator.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Where Our Data Comes From</h2>

              <h3 className="text-xl font-semibold text-gray-800 mb-3">Primary Sources (Direct Data)</h3>
              <p className="text-gray-700 mb-4">
                When available, we use authoritative primary sources:
              </p>
              <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
                <li><strong>Public Census Data:</strong> Population, income, and housing statistics from government agencies</li>
                <li><strong>Real Estate Market Data:</strong> MLS (Multiple Listing Service) data, public real estate platforms,
                and official property records</li>
                <li><strong>Financial Data:</strong> Mortgage rate averages, property tax rates from local government sources</li>
                <li><strong>Third-Party APIs:</strong> Aggregated real estate data from licensed providers</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-800 mb-3">Secondary Sources (Modeling & Estimation)</h3>
              <p className="text-gray-700 mb-4">
                For cities without direct data, we use statistical modeling:
              </p>
              <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
                <li><strong>Regional Interpolation:</strong> Using data from nearby cities with adjustments for population and market factors</li>
                <li><strong>Population-Weighted Averages:</strong> State/province medians adjusted for city size</li>
                <li><strong>Historical Trend Projection:</strong> Extrapolating from past data patterns</li>
              </ul>

              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 my-6">
                <p className="text-sm text-yellow-800">
                  <strong>Important:</strong> For cities without direct market data, we estimate values using regional trends.
                  These estimates may differ from actual local conditions by 10-20% or more.
                </p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">How We Generate Default Values</h2>

              <h3 className="text-xl font-semibold text-gray-800 mb-3">City-Specific Data (When Available)</h3>
              <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
                <li><strong>Home Prices:</strong> Median sale prices from MLS data or equivalent local sources</li>
                <li><strong>Rental Rates:</strong> Median monthly rents from rental listing platforms and property management data</li>
                <li><strong>Update Frequency:</strong> We refresh city data monthly or quarterly depending on source availability</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-800 mb-3">Estimated Data (When Unavailable)</h3>
              <p className="text-gray-700 mb-4">
                When direct city data isn't available, we use these methods:
              </p>
              <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
                <li><strong>Regional Model:</strong> State or provincial median values, adjusted for city population and economic indicators</li>
                <li><strong>Comparable City Method:</strong> Finding similar-sized cities in the region and averaging their data</li>
                <li><strong>Distance-Weighted Interpolation:</strong> Using data from nearby cities, weighted by distance and population</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-800 mb-3">Country-Specific Defaults (Always Reliable)</h3>
              <p className="text-gray-700 mb-4">
                Country-level defaults are based on legal requirements and government data:
              </p>

              <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-300 my-6">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="px-4 py-2 border-b text-left text-sm font-semibold text-gray-700">Country</th>
                      <th className="px-4 py-2 border-b text-left text-sm font-semibold text-gray-700">Closing Costs</th>
                      <th className="px-4 py-2 border-b text-left text-sm font-semibold text-gray-700">Property Tax</th>
                      <th className="px-4 py-2 border-b text-left text-sm font-semibold text-gray-700">Broker Fee</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="px-4 py-2 border-b text-sm text-gray-700">🇺🇸 United States</td>
                      <td className="px-4 py-2 border-b text-sm text-gray-700">3%</td>
                      <td className="px-4 py-2 border-b text-sm text-gray-700">1.1%/year</td>
                      <td className="px-4 py-2 border-b text-sm text-gray-700">0 months</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2 border-b text-sm text-gray-700">🇫🇷 France</td>
                      <td className="px-4 py-2 border-b text-sm text-gray-700">7.5%</td>
                      <td className="px-4 py-2 border-b text-sm text-gray-700">0.8%/year</td>
                      <td className="px-4 py-2 border-b text-sm text-gray-700">0 months</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2 border-b text-sm text-gray-700">🇩🇪 Germany</td>
                      <td className="px-4 py-2 border-b text-sm text-gray-700">12%</td>
                      <td className="px-4 py-2 border-b text-sm text-gray-700">0.35%/year</td>
                      <td className="px-4 py-2 border-b text-sm text-gray-700">1 month</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2 border-b text-sm text-gray-700">🇬🇧 United Kingdom</td>
                      <td className="px-4 py-2 border-b text-sm text-gray-700">4%</td>
                      <td className="px-4 py-2 border-b text-sm text-gray-700">1.5%/year</td>
                      <td className="px-4 py-2 border-b text-sm text-gray-700">0 months</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2 border-b text-sm text-gray-700">🇨🇦 Canada</td>
                      <td className="px-4 py-2 border-b text-sm text-gray-700">4%</td>
                      <td className="px-4 py-2 border-b text-sm text-gray-700">1%/year</td>
                      <td className="px-4 py-2 border-b text-sm text-gray-700">0 months</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2 text-sm text-gray-700">🇦🇺 Australia</td>
                      <td className="px-4 py-2 text-sm text-gray-700">5%</td>
                      <td className="px-4 py-2 text-sm text-gray-700">0.6%/year</td>
                      <td className="px-4 py-2 text-sm text-gray-700">0 months</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <p className="text-gray-700 text-sm italic">
                Note: Additional countries (Spain, Italy, Netherlands, Sweden, Switzerland, Belgium, Ireland, Portugal) available in calculator.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Data Update Schedule</h2>
              <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
                <li><strong>City Home Prices:</strong> Updated monthly on the 1st of each month</li>
                <li><strong>Rental Rates:</strong> Updated monthly on the 1st of each month</li>
                <li><strong>Mortgage Rates:</strong> Updated quarterly</li>
                <li><strong>Country Defaults:</strong> Reviewed annually or when legal changes occur</li>
              </ul>
              <p className="text-gray-700 mb-4">
                Each city page displays a "Last Updated" date showing when the data was last refreshed.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Known Limitations</h2>
              <p className="text-gray-700 mb-4">
                We're transparent about what our calculator can and cannot do:
              </p>

              <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-6">
                <p className="text-sm text-red-800 font-semibold mb-2">
                  Critical Limitations
                </p>
                <ul className="text-sm text-red-800 space-y-1">
                  <li>• <strong>Not Real-Time:</strong> Real estate markets change daily; our data updates monthly</li>
                  <li>• <strong>Aggregated Data:</strong> We show median values, not your specific property</li>
                  <li>• <strong>Modeling Uncertainty:</strong> Estimated values may differ from reality by 10-20%</li>
                  <li>• <strong>Simplifications:</strong> We assume standard properties and typical financing</li>
                  <li>• <strong>Geographic Granularity:</strong> City-level data, not neighborhood-specific</li>
                </ul>
              </div>

              <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
                <li><strong>Market Volatility:</strong> Rapid price changes may not be reflected immediately in our data</li>
                <li><strong>Unique Properties:</strong> Luxury homes, fixer-uppers, or unusual properties may differ significantly from medians</li>
                <li><strong>Neighborhood Variations:</strong> Within a city, different neighborhoods can have vastly different prices</li>
                <li><strong>Personal Circumstances:</strong> Your credit score, down payment, and negotiation affect actual costs</li>
                <li><strong>Future Predictions:</strong> Our projections assume consistent trends; markets can change unexpectedly</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">How to Verify Our Data</h2>
              <p className="text-gray-700 mb-4">
                We strongly encourage you to verify our defaults with local sources:
              </p>

              <h3 className="text-xl font-semibold text-gray-800 mb-3">For Home Prices:</h3>
              <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
                <li>Check your local MLS (Multiple Listing Service)</li>
                <li>Browse Zillow, Redfin, Rightmove, Immobilienscout24, or local equivalents</li>
                <li>Look at recent sales in your target neighborhood</li>
                <li>Talk to local real estate agents</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-800 mb-3">For Rental Prices:</h3>
              <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
                <li>Search Apartments.com, Zillow Rentals, or local rental sites</li>
                <li>Contact property management companies</li>
                <li>Review recent rental listings in your desired area</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-800 mb-3">For Financial Parameters:</h3>
              <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
                <li><strong>Mortgage Rates:</strong> Get quotes from 3+ lenders for your specific situation</li>
                <li><strong>Property Tax:</strong> Check your local tax assessor's website</li>
                <li><strong>Closing Costs:</strong> Request a Loan Estimate from your lender</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">How to Use This Tool Responsibly</h2>

              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div className="bg-green-50 border-l-4 border-green-400 p-4">
                  <p className="text-sm font-semibold text-green-800 mb-2">✅ DO:</p>
                  <ul className="text-sm text-green-800 space-y-1">
                    <li>• Use as a starting point</li>
                    <li>• Input YOUR specific numbers</li>
                    <li>• Adjust assumptions to your situation</li>
                    <li>• Compare multiple scenarios</li>
                    <li>• Verify data with local sources</li>
                    <li>• Consult financial advisors</li>
                  </ul>
                </div>

                <div className="bg-red-50 border-l-4 border-red-400 p-4">
                  <p className="text-sm font-semibold text-red-800 mb-2">❌ DON'T:</p>
                  <ul className="text-sm text-red-800 space-y-1">
                    <li>• Assume exact accuracy</li>
                    <li>• Make decisions solely on this tool</li>
                    <li>• Ignore local market knowledge</li>
                    <li>• Skip professional advice</li>
                    <li>• Forget about lifestyle factors</li>
                    <li>• Overlook personal circumstances</li>
                  </ul>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Commitment to Transparency</h2>
              <p className="text-gray-700 mb-4">
                We could hide these limitations. Many calculators do. We don't.
              </p>
              <p className="text-gray-700 mb-4">
                You deserve to know exactly what you're getting—and what you're not. Better decisions come from
                understanding both the strengths and limitations of any tool.
              </p>
              <p className="text-gray-700 mb-4">
                <strong>Our promise:</strong> We will always be transparent about our data sources, update methods,
                and limitations. When we don't know something, we'll tell you.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Data Attribution</h2>
              <p className="text-gray-700 mb-4">
                Our data comes from multiple sources under fair use provisions:
              </p>
              <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
                <li>Government open data portals (census, tax records, public registries)</li>
                <li>Public real estate aggregators and listing platforms</li>
                <li>Licensed data APIs from third-party providers</li>
                <li>Statistical modeling based on publicly available information</li>
              </ul>
              <p className="text-gray-700 mb-4">
                We aggregate data from multiple sources to provide comprehensive coverage while respecting intellectual property rights.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Report Issues or Corrections</h2>
              <p className="text-gray-700 mb-4">
                Found an error in our data? We want to know.
              </p>
              <p className="text-gray-700 mb-4">
                While we can't guarantee every number is perfect, we review all submissions and update our data
                when credible local sources are provided.
              </p>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-gray-700 font-medium">To report data issues:</p>
                <p className="text-gray-700 text-sm mt-2">Include the city name, the incorrect value, and a link to a credible local source.</p>
              </div>
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
