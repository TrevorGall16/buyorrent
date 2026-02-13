import { Metadata } from 'next';
import { notFound } from 'next/navigation';
// import Link from 'next/link'; // Removed unused import to keep code clean
import Calculator from '@/components/calculator/Calculator';
import AdSidebar from '@/components/ads/AdSidebar';
import AdUnit from '@/components/ads/AdUnit';
import StructuredData from '@/components/StructuredData';
import citiesData from '@/data/cities.json';
import { CountryCode } from '@/lib/types';
import { validateCitiesData } from '@/lib/validate-cities';

// Validate cities data at module load time
validateCitiesData(citiesData);

interface CityData {
  slug: string;
  name: string;
  state: string | null;
  country_code: CountryCode;
  currency_symbol: string;
  data_updated: string;
  theme_color: string;
  defaults: {
    avg_home_price: number;
    avg_rent: number;
    closing_cost_rate: number;
    property_tax_rate: number;
  };
}

interface PageProps {
  params: Promise<{
    city: string;
  }>;
  searchParams: Promise<{
    lang?: string;
  }>;
}

// ---------------------------------------------------------
// 1. DYNAMIC NARRATIVE ENGINE (SEO CONTENT GENERATOR)
// ---------------------------------------------------------
const getNarrative = (city: CityData, lang: string) => {
  const { avg_home_price, avg_rent, closing_cost_rate, property_tax_rate } = city.defaults;
  const ratio = avg_home_price / (avg_rent * 12);
  const ratioFormatted = ratio.toFixed(1);
  const currency = city.currency_symbol;

  // Logic: Low Ratio (< 15) = Buy, High Ratio (> 20) = Rent, Middle = Neutral
  const isBuyFavorable = ratio < 18;

  // Break-Even Heuristic
  const getBreakEvenYears = (r: number): string => {
    if (r < 15) return '~4 years';
    if (r > 25) return '20+ years';
    return '7-15 years';
  };
  const breakEvenYears = getBreakEvenYears(ratio);

  // --- DIGITAL NOMAD MATH FIX ---
  // 1. Loan Assumptions (consistent with Calculator defaults)
  const downPayment = 0.20;
  const interestRate = 0.065; // 6.5% standard
  const loanAmount = avg_home_price * (1 - downPayment);
  
  // 2. Costs
  const annualInterest = loanAmount * interestRate; // Money paid to bank (unrecoverable)
  const entryCost = avg_home_price * closing_cost_rate; // Initial closing costs
  const exitCost = avg_home_price * 0.06; // Agent fees when selling (6%)
  const totalFriction = entryCost + exitCost; // Total cost to buy AND sell
  
  // 3. True Annual Unrecoverable Cost (Amortized over 3 years)
  // Formula: (Friction / 3) + Tax + Maintenance + Interest
  const annualUnrecoverableCosts = Math.round(
    (totalFriction / 3) +                      // Amortized transaction costs
    (avg_home_price * property_tax_rate) +     // Property Tax
    (avg_home_price * 0.01) +                  // 1% Maintenance
    annualInterest                             // Mortgage Interest (Crucial!)
  );
  
  const formattedUnrecoverable = annualUnrecoverableCosts.toLocaleString();

  // Multilingual Templates
  const templates: Record<string, any> = {
    en: {
      intro: `In ${city.name}, the real estate market currently shows a Price-to-Rent ratio of **${ratioFormatted}**.`,
      stats: `With an average home price of ${currency}${avg_home_price.toLocaleString()} and monthly rents averaging ${currency}${avg_rent.toLocaleString()},`,
      conclusion: isBuyFavorable
        ? "market conditions suggest that **buying** may build wealth faster than renting over a 5-year period."
        : "market conditions suggest that **renting** and investing the difference is likely the mathematically superior choice right now.",
      breakeven: `Financial modeling suggests buying only breaks even after **${breakEvenYears}**.`,
      nomad: `For expats and digital nomads staying less than 3 years, renting saves approximately **${currency}${formattedUnrecoverable}** annually in unrecoverable costs (interest, taxes, and transaction fees).`,
      action: "Use the calculator below to input your exact scenario."
    },
    fr: {
      intro: `À ${city.name}, le marché immobilier affiche actuellement un ratio Prix/Loyer de **${ratioFormatted}**.`,
      stats: `Avec un prix moyen de l'immobilier à ${currency}${avg_home_price.toLocaleString()} et des loyers mensuels moyens à ${currency}${avg_rent.toLocaleString()},`,
      conclusion: isBuyFavorable
        ? "les conditions suggèrent que **l'achat** pourrait générer du patrimoine plus rapidement que la location."
        : "les conditions suggèrent que **la location** est probablement le choix financièrement supérieur en ce moment.",
      breakeven: `L'analyse financière suggère que l'achat n'est rentable qu'après **${breakEvenYears}**.`,
      nomad: `Pour les expatriés restant moins de 3 ans, la location économise environ **${currency}${formattedUnrecoverable}** par an en coûts irrécupérables (intérêts, taxes, frais).`,
      action: "Utilisez le calculateur ci-dessous pour analyser votre situation."
    },
    de: {
      intro: `In ${city.name} weist der Immobilienmarkt derzeit ein Preis-Miet-Verhältnis von **${ratioFormatted}**.`,
      stats: `Bei einem durchschnittlichen Hauspreis von ${currency}${avg_home_price.toLocaleString()} und einer monatlichen Miete von ${currency}${avg_rent.toLocaleString()}`,
      conclusion: isBuyFavorable
        ? "deuten die Marktbedingungen darauf hin, dass **Kaufen** langfristig vorteilhafter sein könnte."
        : "deuten die Marktbedingungen darauf hin, dass **Mieten** derzeit die finanziell klügere Wahl ist.",
      breakeven: `Finanzmodelle zeigen, dass sich der Kauf erst nach **${breakEvenYears}** amortisiert.`,
      nomad: `Für Expats, die weniger als 3 Jahre bleiben, spart Mieten etwa **${currency}${formattedUnrecoverable}** jährlich an unwiederbringlichen Kosten.`,
      action: "Nutzen Sie den Rechner unten für Ihre genaue Analyse."
    },
    es: {
      intro: `En ${city.name}, el ratio Precio/Alquiler es de **${ratioFormatted}**.`,
      stats: `Con un precio medio de ${currency}${avg_home_price.toLocaleString()} y alquileres de ${currency}${avg_rent.toLocaleString()},`,
      conclusion: isBuyFavorable ? "**comprar** parece ser la mejor opción financiera." : "**alquilar** parece ser la opción más inteligente hoy.",
      breakeven: `El análisis financiero sugiere que comprar solo es rentable después de **${breakEvenYears}**.`,
      nomad: `Para expatriados que se quedan menos de 3 años, alquilar ahorra aproximadamente **${currency}${formattedUnrecoverable}** anuales en costos irrecuperables.`,
      action: "Usa la calculadora abajo."
    },
    it: {
      intro: `A ${city.name}, il rapporto Prezzo/Affitto è **${ratioFormatted}**.`,
      stats: `Con un prezzo medio di ${currency}${avg_home_price.toLocaleString()} e affitti di ${currency}${avg_rent.toLocaleString()},`,
      conclusion: isBuyFavorable ? "**comprare** potrebbe essere più vantaggioso." : "**affittare** è probabilmente la scelta migliore.",
      breakeven: `L'analisi finanziaria suggerisce che l'acquisto diventa conveniente solo dopo **${breakEvenYears}**.`,
      nomad: `Per chi resta meno di 3 anni, affittare fa risparmiare circa **${currency}${formattedUnrecoverable}** all'anno in costi irrecuperabili.`,
      action: "Usa il calcolatore qui sotto."
    },
    pt: {
      intro: `Em ${city.name}, o mercado imobiliário apresenta um rácio Preço/Arrendamento de **${ratioFormatted}**.`,
      stats: `Com um preço médio de ${currency}${avg_home_price.toLocaleString()} e rendas mensais de ${currency}${avg_rent.toLocaleString()},`,
      conclusion: isBuyFavorable ? "**comprar** pode ser a melhor opção financeira." : "**arrendar** é provavelmente a escolha mais inteligente.",
      breakeven: `A análise financeira sugere que a compra só é rentável após **${breakEvenYears}**.`,
      nomad: `Para expatriados que ficam menos de 3 anos, arrendar poupa aproximadamente **${currency}${formattedUnrecoverable}** anuais em custos irrecuperáveis.`,
      action: "Use a calculadora abaixo."
    },
    nl: {
      intro: `In ${city.name} toont de vastgoedmarkt een Prijs-Huur ratio van **${ratioFormatted}**.`,
      stats: `Met een gemiddelde woningprijs van ${currency}${avg_home_price.toLocaleString()} en maandelijkse huur van ${currency}${avg_rent.toLocaleString()},`,
      conclusion: isBuyFavorable ? "wijzen de omstandigheden erop dat **kopen** voordeliger kan zijn." : "wijzen de omstandigheden erop dat **huren** nu de slimmere keuze is.",
      breakeven: `Financiële modellen tonen dat kopen pas rendabel is na **${breakEvenYears}**.`,
      nomad: `Voor expats die minder dan 3 jaar blijven, bespaart huren ongeveer **${currency}${formattedUnrecoverable}** per jaar aan onherstelbare kosten.`,
      action: "Gebruik de rekenmachine hieronder."
    },
    sv: {
      intro: `I ${city.name} visar fastighetsmarknaden ett Pris-Hyra förhållande på **${ratioFormatted}**.`,
      stats: `Med ett genomsnittligt bostadspris på ${currency}${avg_home_price.toLocaleString()} och månadshyror på ${currency}${avg_rent.toLocaleString()},`,
      conclusion: isBuyFavorable ? "tyder marknadsförhållandena på att **köpa** kan vara fördelaktigare." : "tyder marknadsförhållandena på att **hyra** är det klokare valet just nu.",
      breakeven: `Finansiell modellering visar att köp endast lönar sig efter **${breakEvenYears}**.`,
      nomad: `För expats som stannar mindre än 3 år sparar hyra cirka **${currency}${formattedUnrecoverable}** årligen i oåterkalleliga kostnader.`,
      action: "Använd kalkylatorn nedan."
    },
  };

  const t = templates[lang] || templates.en;
  return `${t.intro} ${t.stats} ${t.conclusion} ${t.breakeven} ${t.nomad} ${t.action}`;
};


// Generate static params for all cities (SSG)
export async function generateStaticParams() {
  return citiesData.map((city) => ({
    city: city.slug,
  }));
}

// ---------------------------------------------------------
// 2. DETERMINISTIC TITLE ROTATOR (SEO VARIATION ENGINE)
// ---------------------------------------------------------
const getTitleVariation = (
  slug: string,
  location: string,
  year: number,
  lang: string
): { title: string; description: string } => {
  const variant = slug.length % 3;

  const titleTemplates: Record<string, string[]> = {
    en: [
      `Is buying in ${location} a bad idea? (${year} Analysis)`,
      `${location}: Is it cheaper to rent or buy in ${year}?`,
      `True Cost of Living in ${location}: Rent vs Buy ${year}`,
    ],
    fr: [
      `Acheter à ${location}: bonne ou mauvaise idée? (${year})`,
      `${location}: Louer ou acheter en ${year}?`,
      `Coût réel de la vie à ${location}: Louer vs Acheter`,
    ],
    de: [
      `Kaufen in ${location}: Gute Idee? (${year} Analyse)`,
      `${location}: Mieten oder kaufen in ${year}?`,
      `Wahre Kosten in ${location}: Mieten vs Kaufen ${year}`,
    ],
    es: [
      `¿Comprar en ${location} es mala idea? (${year})`,
      `${location}: ¿Alquilar o comprar en ${year}?`,
      `Coste real en ${location}: Alquilar vs Comprar`,
    ],
    it: [
      `Comprare a ${location}: buona idea? (${year})`,
      `${location}: Affittare o comprare nel ${year}?`,
      `Costo reale a ${location}: Affitto vs Acquisto`,
    ],
    pt: [
      `Comprar em ${location}: boa ideia? (${year})`,
      `${location}: Arrendar ou comprar em ${year}?`,
      `Custo real em ${location}: Arrendar vs Comprar`,
    ],
    nl: [
      `Kopen in ${location}: goed idee? (${year})`,
      `${location}: Huren of kopen in ${year}?`,
      `Echte kosten in ${location}: Huren vs Kopen`,
    ],
    sv: [
      `Köpa i ${location}: bra idé? (${year})`,
      `${location}: Hyra eller köpa ${year}?`,
      `Verklig kostnad i ${location}: Hyra vs Köpa`,
    ],
  };

  const descTemplates: Record<string, string[]> = {
    en: [
      `${year} financial analysis reveals whether buying in ${location} builds wealth or traps you. Calculate your break-even point with real market data.`,
      `Compare the true cost of renting vs buying in ${location}. Our ${year} calculator factors in hidden costs, taxes, and opportunity cost.`,
      `Is ${location} affordable? Our rent vs buy calculator shows the real numbers: break-even years, unrecoverable costs, and 30-year projections.`,
    ],
    fr: [
      `L'analyse financière ${year} révèle si acheter à ${location} crée du patrimoine. Calculez votre point d'équilibre avec des données réelles.`,
      `Comparez le vrai coût entre louer et acheter à ${location}. Notre calculateur ${year} inclut les coûts cachés et le coût d'opportunité.`,
      `${location} est-il abordable? Notre calculateur louer vs acheter montre les vrais chiffres: années d'équilibre et projections sur 30 ans.`,
    ],
    de: [
      `${year} Finanzanalyse zeigt, ob Kaufen in ${location} Vermögen aufbaut. Berechnen Sie Ihren Break-even-Punkt mit echten Marktdaten.`,
      `Vergleichen Sie die wahren Kosten von Mieten vs Kaufen in ${location}. Unser ${year} Rechner berücksichtigt versteckte Kosten.`,
      `Ist ${location} erschwinglich? Unser Mieten vs Kaufen Rechner zeigt die echten Zahlen: Break-even Jahre und 30-Jahres-Prognosen.`,
    ],
    es: [
      `El análisis financiero ${year} revela si comprar en ${location} genera patrimonio. Calcula tu punto de equilibrio con datos reales.`,
      `Compara el costo real de alquilar vs comprar en ${location}. Nuestra calculadora ${year} incluye costos ocultos e impuestos.`,
      `¿Es ${location} asequible? Nuestra calculadora muestra los números reales: años de equilibrio y proyecciones a 30 años.`,
    ],
    it: [
      `L'analisi finanziaria ${year} rivela se comprare a ${location} costruisce ricchezza. Calcola il tuo punto di pareggio con dati reali.`,
      `Confronta il vero costo di affittare vs comprare a ${location}. Il nostro calcolatore ${year} include costi nascosti e tasse.`,
      `${location} è accessibile? Il nostro calcolatore mostra i numeri reali: anni di pareggio e proiezioni a 30 anni.`,
    ],
    pt: [
      `A análise financeira ${year} revela se comprar em ${location} gera património. Calcule o seu ponto de equilíbrio com dados reais.`,
      `Compare o custo real de arrendar vs comprar em ${location}. A nossa calculadora ${year} inclui custos ocultos e impostos.`,
      `${location} é acessível? A nossa calculadora mostra os números reais: anos de equilíbrio e projeções a 30 anos.`,
    ],
    nl: [
      `De financiële analyse ${year} onthult of kopen in ${location} vermogen opbouwt. Bereken uw break-even punt met echte marktdata.`,
      `Vergelijk de werkelijke kosten van huren vs kopen in ${location}. Onze ${year} rekenmachine omvat verborgen kosten.`,
      `Is ${location} betaalbaar? Onze rekenmachine toont de echte cijfers: break-even jaren en 30-jarige projecties.`,
    ],
    sv: [
      `${year} finansiell analys avslöjar om köp i ${location} bygger förmögenhet. Beräkna din break-even punkt med verklig marknadsdata.`,
      `Jämför den verkliga kostnaden för hyra vs köp i ${location}. Vår ${year} kalkylator inkluderar dolda kostnader.`,
      `Är ${location} överkomligt? Vår kalkylator visar de verkliga siffrorna: break-even år och 30-åriga prognoser.`,
    ],
  };

  const titles = titleTemplates[lang] || titleTemplates.en;
  const descriptions = descTemplates[lang] || descTemplates.en;

  return {
    title: titles[variant],
    description: descriptions[variant],
  };
};

// Generate metadata for SEO
export async function generateMetadata({ params, searchParams }: PageProps): Promise<Metadata> {
  const { city } = await params;
  const { lang } = await searchParams;

  const cityData = citiesData.find((c) => c.slug === city) as CityData | undefined;

  if (!cityData) return { title: 'City Not Found' };

  const { name, state, currency_symbol, defaults } = cityData;
  const location = state ? `${name}, ${state}` : name;
  const currentYear = new Date().getFullYear();
  const baseUrl = 'https://rentorbuyworld.com';
  const canonicalPath = `/${city}/buy-vs-rent`;
  const language = lang || 'en';

  // Deterministic title rotation based on slug length
  const { title, description } = getTitleVariation(city, location, currentYear, language);

  return {
    title,
    description,
    alternates: {
      canonical: `${baseUrl}${canonicalPath}`,
      languages: {
        'x-default': `${baseUrl}${canonicalPath}`,
        'en': `${baseUrl}${canonicalPath}`,
        'de': `${baseUrl}${canonicalPath}?lang=de`,
        'nl': `${baseUrl}${canonicalPath}?lang=nl`,
        'sv': `${baseUrl}${canonicalPath}?lang=sv`,
        'it': `${baseUrl}${canonicalPath}?lang=it`,
        'fr': `${baseUrl}${canonicalPath}?lang=fr`,
        'es': `${baseUrl}${canonicalPath}?lang=es`,
        'pt': `${baseUrl}${canonicalPath}?lang=pt`,
      },
    },
    openGraph: {
      title,
      description: `Compare buying vs renting in ${name}. Average home: ${currency_symbol}${defaults.avg_home_price.toLocaleString()} | Average rent: ${currency_symbol}${defaults.avg_rent.toLocaleString()}/month`,
      url: lang && lang !== 'en' ? `${baseUrl}${canonicalPath}?lang=${lang}` : `${baseUrl}${canonicalPath}`,
      siteName: 'RentOrBuyWorld',
      locale: language,
      type: 'website',
      images: [{ url: '/og-image.png', width: 1200, height: 630, alt: `${name} Rent vs Buy Calculator` }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description: `${currency_symbol}${defaults.avg_home_price.toLocaleString()} to buy | ${currency_symbol}${defaults.avg_rent.toLocaleString()}/mo to rent`,
      images: ['/og-image.png'],
    },
  };
}

export default async function CityBuyVsRentPage({ params, searchParams }: PageProps) {
  const { city } = await params;
  const { lang } = await searchParams;

  const validLanguages = ['en', 'fr', 'de', 'es', 'it', 'nl', 'sv', 'pt'] as const;
  const language = (validLanguages.includes(lang as any) ? lang : 'en') as typeof validLanguages[number];

  const cityData = citiesData.find((c) => c.slug === city) as CityData | undefined;

  if (!cityData) notFound();

  const { name, state, country_code, defaults, data_updated, theme_color } = cityData;
  const location = state ? `${name}, ${state}` : name;

  const flagEmojis: Record<CountryCode, string> = {
    US: '🇺🇸', FR: '🇫🇷', DE: '🇩🇪', GB: '🇬🇧', CA: '🇨🇦', AU: '🇦🇺', ES: '🇪🇸',
    IT: '🇮🇹', NL: '🇳🇱', SE: '🇸🇪', CH: '🇨🇭', BE: '🇧🇪', IE: '🇮🇪', PT: '🇵🇹',
  };
  const flag = flagEmojis[country_code];

  // 2. FILTER RELATED CITIES (Same Country, Different City)
  const relatedCities = citiesData
    .filter(c => c.country_code === country_code && c.slug !== city)
    .sort((a, b) => b.defaults.avg_home_price - a.defaults.avg_home_price) // Sort by price (engaging)
    .slice(0, 8); // Top 8 related cities

  return (
    <>
      <StructuredData
        cityName={name}
        citySlug={city}
        countryCode={country_code}
        currencySymbol={cityData.currency_symbol}
        avgHomePrice={defaults.avg_home_price}
        avgRent={defaults.avg_rent}
        language={language}
      />

      <main className="min-h-screen">
        {/* City Hero Section */}
        <section className="w-full bg-white dark:bg-slate-800 border-b border-gray-200 dark:border-slate-700 shadow-sm py-8 relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4">
            <span className="text-[150px] opacity-5 dark:opacity-10 absolute -top-4 -right-4 rotate-12 pointer-events-none select-none" aria-hidden="true">
              {flag}
            </span>
            <div className="relative text-center">
              <h1 className="text-4xl md:text-5xl font-bold italic mb-2">
                {location}
              </h1>
              <p className="text-lg text-slate-600 dark:text-slate-400">
                Buy vs. Rent Calculator
              </p>
            </div>
          </div>
        </section>

        <div className="max-w-7xl mx-auto px-4 py-8">
          
          {/* ✅ DYNAMIC NARRATIVE BLOCK (SEO GOLD) */}
          <div className="mb-10 bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800 rounded-xl p-6 md:p-8">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
              📊 {name} Market Analysis
            </h2>
            <p className="text-lg text-slate-700 dark:text-slate-300 leading-relaxed"
               dangerouslySetInnerHTML={{ __html: getNarrative(cityData, language).replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }}
            />
          </div>

          {/* 2-Column Layout: Main Content + Sidebar */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-9">
              <Calculator
                cityName={name}
                countryCode={country_code}
                defaultHomePrice={defaults.avg_home_price}
                defaultMonthlyRent={defaults.avg_rent}
                dataUpdated={data_updated}
                themeColor={theme_color}
                language={language}
              />
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-3">
              <AdSidebar />
            </div>
          </div>

          {/* Mobile Ad */}
          <div className="lg:hidden mt-8">
            <AdUnit format="square" />
          </div>

          {/* ✅ RELATED CITIES SPIDERWEB (INTERNAL LINKING) */}
          <div className="mt-16 pt-8 border-t border-gray-200 dark:border-gray-800">
            <h3 className="text-xl font-bold mb-6 text-slate-900 dark:text-white">
              Compare Other Cities in {country_code}
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {relatedCities.map((relatedCity) => (
                <a 
                  key={relatedCity.slug}
                  href={`/${relatedCity.slug}/buy-vs-rent${language !== 'en' ? `?lang=${language}` : ''}`}
                  className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 dark:bg-slate-900 hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors border border-transparent hover:border-gray-200 dark:hover:border-slate-700"
                >
                  {/* Fixed: Added 'as CountryCode' to fix TypeScript error */}
                  <span className="text-2xl">{flagEmojis[relatedCity.country_code as CountryCode]}</span>
                  <div className="flex flex-col">
                    <span className="font-medium text-sm text-slate-900 dark:text-slate-100 truncate">
                      {relatedCity.name}
                    </span>
                    <span className="text-xs text-slate-500 dark:text-slate-400">
                      {relatedCity.defaults.avg_home_price > defaults.avg_home_price ? 'Higher Price' : 'Lower Price'}
                    </span>
                  </div>
                </a>
              ))}
            </div>
          </div>

        </div>
      </main>
    </>
  );
}