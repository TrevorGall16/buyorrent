import AdUnit from '@/components/ads/AdUnit';

export const metadata = {
  title: 'How It Works | Rent vs Buy Methodology',
  description: 'Understand the global financial modeling behind our Rent vs Buy calculator.',
};

export default function HowItWorksPage() {
  return (
    <main className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-slate-900 dark:text-slate-50 mb-4 tracking-tight">
            How Our Calculator Works
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto font-sans">
            Understanding the methodology behind rent-versus-buy analysis for a global audience.
          </p>
        </div>

        {/* Content Card */}
        <article className="card-glass p-8 md:p-12 rounded-2xl">
          
          {/* Section 1: Introduction */}
          <section className="mb-10">
            <h2 className="text-2xl font-serif font-bold text-slate-800 dark:text-slate-100 mb-4">
              1. Introduction
            </h2>
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
              Choosing whether to rent or buy a home is one of the most significant long-term financial decisions most people face. But comparing monthly rent to a monthly mortgage payment is misleading—these two numbers represent entirely different financial structures, risks, and obligations.
            </p>
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
              This calculator focuses on the real question: <strong>Which option leaves you with a higher net worth over your chosen time horizon?</strong>
            </p>
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
              To answer this, we model both scenarios over time, including:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-slate-700 dark:text-slate-300 mb-4">
              <li>Upfront costs (Down payments, taxes, notary fees)</li>
              <li>Ongoing monthly housing costs</li>
              <li>Home value changes (Appreciation)</li>
              <li>Rent increases (Inflation)</li>
              <li>Investment returns (Opportunity cost)</li>
              <li>Local taxes and fees (which vary widely by country)</li>
            </ul>
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
              The methodology is designed to apply globally, whether you live in the United States, United Kingdom, France, Germany, Canada, Australia, Singapore, or elsewhere.
            </p>
          </section>

          {/* Section 2: Buying */}
          <section className="mb-10">
            <h2 className="text-2xl font-serif font-bold text-slate-800 dark:text-slate-100 mb-4">
              2. Total Cost of Ownership: Buying
            </h2>
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
              Buying a home involves a combination of upfront costs, financing costs, and recurring ownership expenses. These differ considerably by country. Our model captures the full structure.
            </p>
            
            <h3 className="text-xl font-semibold text-slate-800 dark:text-slate-200 mt-6 mb-3">A. Upfront Costs (Country-Dependent)</h3>
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
              Each market has its own terminology and fee structure:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-slate-700 dark:text-slate-300 mb-4">
              <li><strong>Down Payment (Deposit):</strong> Typically 10–30% of the purchase price, depending on country and lender requirements.</li>
              <li><strong>Transaction / Closing Costs:</strong> These vary globally and may include transfer taxes, legal fees, registration fees, valuation fees, and government duties.</li>
            </ul>
            <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-lg mb-4">
              <p className="text-sm text-slate-600 dark:text-slate-400 font-semibold mb-2">Global Examples (Approximate):</p>
              <ul className="text-sm text-slate-600 dark:text-slate-400 space-y-1">
                <li>🇺🇸 United States: ~3–5% (Closing costs)</li>
                <li>🇬🇧 United Kingdom: Stamp Duty (Varies by price bands)</li>
                <li>🇫🇷 France: Frais de notaire (~7–8% for existing homes)</li>
                <li>🇩🇪 Germany: Kaufnebenkosten (~10–12% including notary/tax)</li>
              </ul>
            </div>

            <h3 className="text-xl font-semibold text-slate-800 dark:text-slate-200 mt-6 mb-3">B. Monthly / Annual Ownership Costs</h3>
            <ul className="list-disc pl-6 space-y-2 text-slate-700 dark:text-slate-300 mb-4">
              <li><strong>Mortgage Payment:</strong> Calculated using standard amortization. In some countries (US/FR), fixed-rate loans for 20–30 years are common. In others (UK/CA/AU), rates reset every 2–5 years.</li>
              <li><strong>Property Taxes:</strong> Annual taxes (US/CA), Council Tax (UK), or local land charges.</li>
              <li><strong>Maintenance / Strata Fees:</strong> A typical assumption is 1% of property value annually for maintenance, plus building/condo fees where applicable.</li>
            </ul>
          </section>

          {/* ADVERTISEMENT BREAK */}
          <div className="my-12 flex justify-center">
            <AdUnit format="banner" slotId="content-middle" />
          </div>

          {/* Section 3: Renting */}
          <section className="mb-10">
            <h2 className="text-2xl font-serif font-bold text-slate-800 dark:text-slate-100 mb-4">
              3. Total Cost of Renting
            </h2>
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
              Renting is simpler, but still has relevant financial components.
            </p>
            <ul className="list-disc pl-6 space-y-2 text-slate-700 dark:text-slate-300 mb-4">
              <li><strong>Upfront Costs:</strong> Security deposits (1–3 months) and broker fees (common in Germany or parts of Asia).</li>
              <li><strong>Rent Inflation:</strong> Rent tends to increase annually. While we use a default global assumption (e.g., 2–3%), this is fully adjustable in the settings.</li>
            </ul>
          </section>

          {/* Section 4: Opportunity Cost */}
          <section className="mb-10">
            <h2 className="text-2xl font-serif font-bold text-slate-800 dark:text-slate-100 mb-4">
              4. Opportunity Cost: The Hidden Variable
            </h2>
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
              Buying requires tying up significant capital in the down payment and transaction costs. Renting keeps that capital free for investment.
            </p>
            <div className="border-l-4 border-blue-500 pl-4 py-2 bg-blue-50 dark:bg-blue-900/20 my-6">
              <p className="text-slate-800 dark:text-slate-200 font-medium">
                To model this fairly, we track the value of the renter&apos;s invested capital over time, assuming a long-term market return (e.g., S&P 500 or Global Index funds).
              </p>
            </div>
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
              Meanwhile, homeowners build wealth through loan amortization (paying down debt) and home value appreciation. The calculator compares these two wealth-building trajectories side-by-side.
            </p>
          </section>

          {/* Section 5: Break Even */}
          <section className="mb-10">
            <h2 className="text-2xl font-serif font-bold text-slate-800 dark:text-slate-100 mb-4">
              5. The Break-Even Point
            </h2>
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
              The break-even point occurs when the <strong>Buyer&apos;s Net Worth</strong> surpasses the <strong>Renter&apos;s Net Worth</strong>.
            </p>
            <ul className="list-disc pl-6 space-y-2 text-slate-700 dark:text-slate-300 mb-4">
              <li><strong>Selling before the break-even year?</strong> Renting is likely the mathematically superior choice due to unrecoverable transaction costs.</li>
              <li><strong>Staying longer?</strong> Buying typically creates more long-term wealth through forced savings and appreciation.</li>
            </ul>
          </section>

          {/* Disclaimer */}
          <section className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-800">
            <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-2">Disclaimer</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              This tool is for educational purposes only. It provides general financial modeling based on your inputs and does not constitute personal financial advice. Real estate markets are volatile, and past performance is not indicative of future results. Always consult local real estate and financial professionals before making decisions.
            </p>
          </section>

        </article>
      </div>
    </main>
  );
}