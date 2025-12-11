import React from 'react';
import AdUnit from '@/components/ads/AdUnit';

export const metadata = {
  title: 'Data & Sources | Rent vs Buy Transparency',
  description: 'Understand where our housing data comes from and how we calculate global real estate assumptions.',
};

export default function DataAndSourcesPage() {
  return (
    <main className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-slate-900 dark:text-slate-50 mb-4 tracking-tight">
            Data & Sources
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto font-sans">
            Transparent, globally reliable housing data for rent-vs-buy analysis.
          </p>
        </div>

        {/* Content Card */}
        <article className="card-glass p-8 md:p-12 rounded-2xl">

          {/* Section 1: Introduction */}
          <section className="mb-10">
            <h2 className="text-2xl font-serif font-bold text-slate-800 dark:text-slate-100 mb-4">
              1. What This Page Covers
            </h2>
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
              This page explains exactly where our housing data comes from, how we calculate default home prices and rent levels, how often we update it, and why data accuracy varies between countries and cities.
            </p>
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
              Our goal is full transparency so you understand the strengths and limitations of our rent-vs-buy model.
            </p>
          </section>

          {/* Section 2: Data Sources */}
          <section className="mb-10">
            <h2 className="text-2xl font-serif font-bold text-slate-800 dark:text-slate-100 mb-4">
              2. Our Data Sources (Global)
            </h2>
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
              We collect and aggregate data from a combination of official, public, and licensed sources.
            </p>
            
            <h3 className="text-xl font-semibold text-slate-800 dark:text-slate-200 mt-6 mb-3">Primary Data Sources</h3>
            <ul className="list-disc pl-6 space-y-2 text-slate-700 dark:text-slate-300 mb-4">
              <li>Government statistics (census bureaus, property registries, tax authorities)</li>
              <li>National real estate databases and official transaction records</li>
              <li>Large property portals (median sale prices & rental prices)</li>
              <li>Financial institutions (typical mortgage rates, lending conditions)</li>
            </ul>

            <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-lg mb-4">
              <p className="text-sm text-slate-600 dark:text-slate-400 font-semibold mb-2">Examples of Trusted Sources:</p>
              <ul className="text-sm text-slate-600 dark:text-slate-400 space-y-1">
                <li>🇬🇧 UK: ONS, HM Land Registry</li>
                <li>🇫🇷 France: INSEE, Notaires de France</li>
                <li>🇩🇪 Germany: Destatis, Gutachterausschuss reports</li>
                <li>🇺🇸 US/Canada: Municipal open data portals & aggregated listing data</li>
              </ul>
            </div>

            <h3 className="text-xl font-semibold text-slate-800 dark:text-slate-200 mt-6 mb-3">Secondary / Modeled Data</h3>
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
              For cities lacking direct data, we estimate using regional averages, comparable cities, and distance-weighted interpolation. Estimates may differ from real local prices by 10–20%, especially in smaller markets.
            </p>
          </section>

          {/* Section 3: Calculations */}
          <section className="mb-10">
            <h2 className="text-2xl font-serif font-bold text-slate-800 dark:text-slate-100 mb-4">
              3. How We Calculate Default Values
            </h2>
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
              The calculator pre-loads each city with typical home prices, monthly rent, and local transaction costs.
            </p>
            <ul className="list-disc pl-6 space-y-2 text-slate-700 dark:text-slate-300 mb-4">
              <li><strong>City-Level Defaults:</strong> If direct market data exists, we prioritize it.</li>
              <li><strong>Estimated Defaults:</strong> If direct data is missing, we use regional models.</li>
            </ul>
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed italic">
              Note: All values can be manually adjusted by the user.
            </p>
          </section>

          {/* Section 4: Country-Specific Table */}
          <section className="mb-10">
            <h2 className="text-2xl font-serif font-bold text-slate-800 dark:text-slate-100 mb-4">
              4. Country-Specific Cost Assumptions
            </h2>
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-6">
              Housing costs vary significantly across countries. Below are baseline international assumptions used when generating default values:
            </p>
            
            <div className="overflow-x-auto">
              <table className="min-w-full text-left text-sm whitespace-nowrap">
                <thead className="uppercase tracking-wider border-b-2 border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50">
                  <tr>
                    <th scope="col" className="px-6 py-4 font-semibold text-slate-900 dark:text-slate-100">Country</th>
                    <th scope="col" className="px-6 py-4 font-semibold text-slate-900 dark:text-slate-100">Transaction Costs</th>
                    <th scope="col" className="px-6 py-4 font-semibold text-slate-900 dark:text-slate-100">Recurring Charges</th>
                    <th scope="col" className="px-6 py-4 font-semibold text-slate-900 dark:text-slate-100">Tenant Broker Fee</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                    <td className="px-6 py-4 font-medium text-slate-900 dark:text-slate-100">🇺🇸 United States</td>
                    <td className="px-6 py-4 text-slate-600 dark:text-slate-400">~3–5%</td>
                    <td className="px-6 py-4 text-slate-600 dark:text-slate-400">Property Tax</td>
                    <td className="px-6 py-4 text-slate-600 dark:text-slate-400">0 months</td>
                  </tr>
                  <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                    <td className="px-6 py-4 font-medium text-slate-900 dark:text-slate-100">🇫🇷 France</td>
                    <td className="px-6 py-4 text-slate-600 dark:text-slate-400">~7–8% (Notaire)</td>
                    <td className="px-6 py-4 text-slate-600 dark:text-slate-400">Taxe foncière</td>
                    <td className="px-6 py-4 text-slate-600 dark:text-slate-400">~1 month</td>
                  </tr>
                  <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                    <td className="px-6 py-4 font-medium text-slate-900 dark:text-slate-100">🇩🇪 Germany</td>
                    <td className="px-6 py-4 text-slate-600 dark:text-slate-400">~10–12%</td>
                    <td className="px-6 py-4 text-slate-600 dark:text-slate-400">Low annual tax</td>
                    <td className="px-6 py-4 text-slate-600 dark:text-slate-400">1–2 months</td>
                  </tr>
                  <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                    <td className="px-6 py-4 font-medium text-slate-900 dark:text-slate-100">🇬🇧 UK</td>
                    <td className="px-6 py-4 text-slate-600 dark:text-slate-400">Stamp Duty</td>
                    <td className="px-6 py-4 text-slate-600 dark:text-slate-400">Council Tax</td>
                    <td className="px-6 py-4 text-slate-600 dark:text-slate-400">0 months</td>
                  </tr>
                  <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                    <td className="px-6 py-4 font-medium text-slate-900 dark:text-slate-100">🇨🇦 Canada</td>
                    <td className="px-6 py-4 text-slate-600 dark:text-slate-400">Land Transfer + Fees</td>
                    <td className="px-6 py-4 text-slate-600 dark:text-slate-400">Property Tax</td>
                    <td className="px-6 py-4 text-slate-600 dark:text-slate-400">0 months</td>
                  </tr>
                  <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                    <td className="px-6 py-4 font-medium text-slate-900 dark:text-slate-100">🇦🇺 Australia</td>
                    <td className="px-6 py-4 text-slate-600 dark:text-slate-400">State Stamp Duty</td>
                    <td className="px-6 py-4 text-slate-600 dark:text-slate-400">Council Rates</td>
                    <td className="px-6 py-4 text-slate-600 dark:text-slate-400">0 months</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* ADVERTISEMENT BREAK */}
          <div className="my-12 flex justify-center">
            <AdUnit format="banner" slotId="data-sources-middle" />
          </div>

          {/* Section 5: Updates & Accuracy */}
          <section className="mb-10">
            <h2 className="text-2xl font-serif font-bold text-slate-800 dark:text-slate-100 mb-4">
              5. Updates & Accuracy
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="bg-slate-50 dark:bg-slate-800/50 p-6 rounded-xl">
                <h3 className="font-semibold text-slate-900 dark:text-slate-100 mb-2">Update Schedule</h3>
                <ul className="list-disc pl-5 text-sm text-slate-600 dark:text-slate-400 space-y-1">
                  <li>Home Prices: Monthly</li>
                  <li>Rental Prices: Monthly</li>
                  <li>Mortgage Rates: Quarterly</li>
                  <li>Country Defaults: Annually</li>
                </ul>
              </div>
              <div className="bg-slate-50 dark:bg-slate-800/50 p-6 rounded-xl">
                <h3 className="font-semibold text-slate-900 dark:text-slate-100 mb-2">Known Limitations</h3>
                <ul className="list-disc pl-5 text-sm text-slate-600 dark:text-slate-400 space-y-1">
                  <li>Data reflects city medians, not specific streets.</li>
                  <li>Small cities may deviate more than metros.</li>
                  <li>Local incentives may not be included.</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Section 6: How to Verify */}
          <section className="mb-10">
            <h2 className="text-2xl font-serif font-bold text-slate-800 dark:text-slate-100 mb-4">
              6. How to Verify or Refine the Data
            </h2>
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
              For the most accurate results, we recommend replacing our estimates with your own research:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-slate-700 dark:text-slate-300">
              <li>Check your country’s public sales registry for recent transactions.</li>
              <li>Browse local real estate platforms (Rightmove, Zillow, ImmoScout24, etc.).</li>
              <li>Get actual mortgage quotes from local lenders.</li>
              <li>Consult local tax authority websites for precise rates.</li>
            </ul>
          </section>

          {/* Section 7: Report Issue */}
          <section className="mb-10">
            <h2 className="text-2xl font-serif font-bold text-slate-800 dark:text-slate-100 mb-4">
              7. Report an Issue
            </h2>
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
              If you find outdated or inaccurate data, please contact us with the city name and a link to a credible local source. We review all submissions and update when verified.
            </p>
          </section>

          {/* Disclaimer */}
          <section className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-800">
            <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-2">Disclaimer</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              This tool provides general financial modeling only. It does not constitute financial, tax, or legal advice. Consult local professionals before making major financial decisions.
            </p>
          </section>

        </article>
      </div>
    </main>
  );
}