import { Metadata } from 'next';
import Link from 'next/link';
import citiesData from '@/data/cities.json';
import { CountryCode } from '@/lib/types';
import { resolveLanguage } from '@/lib/i18n';

// ---------------------------------------------------------
// METADATA (SEO)
// ---------------------------------------------------------
const currentYear = new Date().getFullYear();

export const metadata: Metadata = {
  title: `${currentYear} Global Housing Index: Top Cities to Buy vs Rent`,
  description: `Data-driven rankings of the world's best and worst cities for homebuyers. Discover where renting saves you money and where buying builds wealth faster.`,
  openGraph: {
    title: `${currentYear} Global Housing Index: Top Cities to Buy vs Rent`,
    description: `Data-driven rankings of the world's best and worst cities for homebuyers. Discover where renting saves you money and where buying builds wealth faster.`,
    type: 'website',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Global Housing Index Rankings' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${currentYear} Global Housing Index`,
    description: 'Top cities to buy vs rent worldwide',
  },
};

// ---------------------------------------------------------
// TYPES & HELPERS
// ---------------------------------------------------------
interface CityData {
  slug: string;
  name: string;
  state: string | null;
  country_code: CountryCode;
  currency_symbol: string;
  defaults: {
    avg_home_price: number;
    avg_rent: number;
  };
}

interface RankedCity extends CityData {
  ratio: number;
  location: string;
}

const flagEmojis: Record<CountryCode, string> = {
  US: '🇺🇸', FR: '🇫🇷', DE: '🇩🇪', GB: '🇬🇧', CA: '🇨🇦', AU: '🇦🇺', ES: '🇪🇸',
  IT: '🇮🇹', NL: '🇳🇱', SE: '🇸🇪', CH: '🇨🇭', BE: '🇧🇪', IE: '🇮🇪', PT: '🇵🇹',
};

// ---------------------------------------------------------
// DATA PROCESSING
// ---------------------------------------------------------
const processedCities: RankedCity[] = (citiesData as CityData[]).map((city) => ({
  ...city,
  ratio: city.defaults.avg_home_price / (city.defaults.avg_rent * 12),
  location: city.state ? `${city.name}, ${city.state}` : city.name,
}));

// Sort by ratio (descending for highest, ascending for lowest)
const sortedByRatioDesc = [...processedCities].sort((a, b) => b.ratio - a.ratio);
const sortedByRatioAsc = [...processedCities].sort((a, b) => a.ratio - b.ratio);

// Top 10 lists
const rentersParadise = sortedByRatioDesc.slice(0, 10);
const buyersMarket = sortedByRatioAsc.slice(0, 10);

// ---------------------------------------------------------
// COMPONENTS
// ---------------------------------------------------------
function RankingTable({
  cities,
  variant,
  lang,
}: {
  cities: RankedCity[];
  variant: 'renters' | 'buyers';
  lang: string;
}) {
  const accentColor = variant === 'renters' ? 'text-amber-600' : 'text-emerald-600';
  const badgeColor = variant === 'renters'
    ? 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300'
    : 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300';

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-slate-200 dark:border-slate-700">
            <th className="py-3 px-2 text-left text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 w-12">
              Rank
            </th>
            <th className="py-3 px-2 text-left text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              City
            </th>
            <th className="py-3 px-2 text-right text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 hidden sm:table-cell">
              Avg. Home Price
            </th>
            <th className="py-3 px-2 text-right text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 hidden sm:table-cell">
              Avg. Rent
            </th>
            <th className="py-3 px-2 text-right text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Ratio
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
          {cities.map((city, index) => (
            <tr
              key={city.slug}
              className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
            >
              <td className="py-4 px-2">
                <span className={`inline-flex items-center justify-center w-7 h-7 rounded-full text-sm font-bold ${badgeColor}`}>
                  {index + 1}
                </span>
              </td>
              <td className="py-4 px-2">
                <Link
                  href={`/${lang}/${city.slug}/buy-vs-rent`}
                  className="group flex items-center gap-2"
                >
                  <span className="text-xl" aria-hidden="true">
                    {flagEmojis[city.country_code]}
                  </span>
                  <div>
                    <span className="font-medium text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {city.name}
                    </span>
                    {city.state && (
                      <span className="text-sm text-slate-500 dark:text-slate-400 ml-1 hidden md:inline">
                        {city.state}
                      </span>
                    )}
                  </div>
                </Link>
              </td>
              <td className="py-4 px-2 text-right text-slate-700 dark:text-slate-300 hidden sm:table-cell">
                {city.currency_symbol}{city.defaults.avg_home_price.toLocaleString()}
              </td>
              <td className="py-4 px-2 text-right text-slate-700 dark:text-slate-300 hidden sm:table-cell">
                {city.currency_symbol}{city.defaults.avg_rent.toLocaleString()}/mo
              </td>
              <td className="py-4 px-2 text-right">
                <span className={`font-bold ${accentColor}`}>
                  {city.ratio.toFixed(1)}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// ---------------------------------------------------------
// PAGE COMPONENT
// ---------------------------------------------------------
export default async function RankingsPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang: rawLang } = await params;
  const lang = resolveLanguage(rawLang);
  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-900">
      {/* Hero Section */}
      <section className="w-full bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 shadow-sm py-12 md:py-16">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <span className="inline-block px-3 py-1 text-xs font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-900/30 rounded-full mb-4">
            {currentYear} Edition
          </span>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900 dark:text-white mb-4">
            Global Housing Index
          </h1>
          <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Data-driven rankings revealing where buying builds wealth and where renting is the smarter financial move.
          </p>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 py-12 space-y-16">
        {/* Methodology Note */}
        <div className="bg-slate-100 dark:bg-slate-800/50 rounded-xl p-6 border border-slate-200 dark:border-slate-700">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
            How We Rank
          </h2>
          <p className="text-slate-700 dark:text-slate-300">
            We use the <strong>Price-to-Rent Ratio</strong> (home price divided by annual rent).
            A ratio above <strong>20</strong> typically favors renting; below <strong>15</strong> favors buying.
            This metric is used globally by economists to assess housing affordability.
          </p>
        </div>

        {/* List A: Renters' Paradise */}
        <section>
          <div className="mb-6">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-3xl">🏖️</span>
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
                The Renters&apos; Paradise
              </h2>
            </div>
            <p className="text-slate-600 dark:text-slate-400 max-w-2xl">
              In these cities, home prices are disconnected from reality. <strong>Renting is mathematically superior</strong> &mdash;
              you&apos;ll build more wealth investing the difference than tying capital up in an overpriced property.
            </p>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden">
            <RankingTable cities={rentersParadise} variant="renters" lang={lang} />
          </div>
        </section>

        {/* List B: Buyers' Market */}
        <section>
          <div className="mb-6">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-3xl">🏠</span>
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
                The Buyers&apos; Market
              </h2>
            </div>
            <p className="text-slate-600 dark:text-slate-400 max-w-2xl">
              In these markets, mortgage payments are often comparable to (or cheaper than) rent. <strong>Buying builds equity</strong> instead of
              paying a landlord &mdash; if you plan to stay 5+ years, ownership likely wins.
            </p>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden">
            <RankingTable cities={buyersMarket} variant="buyers" lang={lang} />
          </div>
        </section>

        {/* CTA Section */}
        <section className="text-center py-8">
          <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
            Want to see the full analysis for your city?
          </h3>
          <p className="text-slate-600 dark:text-slate-400 mb-6">
            Our calculator factors in closing costs, property taxes, opportunity cost, and 30-year projections.
          </p>
          <Link
            href={`/${lang}/`}
            className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-sm hover:shadow-md transition-all duration-200 active:scale-95"
          >
            Browse All {citiesData.length} Cities
          </Link>
        </section>

        {/* Disclaimer */}
        <div className="text-center text-sm text-slate-500 dark:text-slate-500 border-t border-slate-200 dark:border-slate-700 pt-8">
          <p>
            <strong>Disclaimer:</strong> Rankings are based on publicly available data and estimates.
            This is for educational purposes only and should not be considered financial advice.
            Always consult local real estate professionals and financial advisors.
          </p>
        </div>
      </div>
    </main>
  );
}
