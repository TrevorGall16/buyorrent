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

const validLanguages = ['en', 'fr', 'de', 'es', 'it', 'nl', 'sv', 'pt'] as const;

// ---------------------------------------------------------
// 1. DYNAMIC NARRATIVE ENGINE (SEO CONTENT GENERATOR)
// 3 templates rotated by slug.length % 3 to avoid duplicate content.
//   Template 0: Price-to-Rent ratio & investment opportunity
//   Template 1: Hidden costs, maintenance/tax, nomad flexibility
//   Template 2: 30-year wealth projection & break-even focus
// ---------------------------------------------------------
const getNarrative = (city: CityData, lang: string) => {
  const { avg_home_price, avg_rent, closing_cost_rate, property_tax_rate } = city.defaults;
  const ratio = avg_home_price / (avg_rent * 12);
  const ratioFormatted = ratio.toFixed(1);
  const currency = city.currency_symbol;
  const isBuyFavorable = ratio < 18;
  const variant = city.slug.length % 3;

  // Break-Even Heuristic
  const breakEvenYears = ratio < 15 ? '~4' : ratio > 25 ? '20+' : '7–15';

  // Nomad math
  const downPayment = 0.20;
  const interestRate = 0.065;
  const loanAmount = avg_home_price * (1 - downPayment);
  const annualInterest = loanAmount * interestRate;
  const entryCost = avg_home_price * closing_cost_rate;
  const exitCost = avg_home_price * 0.06;
  const totalFriction = entryCost + exitCost;
  const annualUnrecoverableCosts = Math.round(
    (totalFriction / 3) + (avg_home_price * property_tax_rate) + (avg_home_price * 0.01) + annualInterest
  );
  const fmtUnrecov = annualUnrecoverableCosts.toLocaleString();

  // Derived display values
  const fmtPrice = `${currency}${avg_home_price.toLocaleString()}`;
  const fmtRent = `${currency}${avg_rent.toLocaleString()}`;
  const fmtTax = `${(property_tax_rate * 100).toFixed(2)}%`;
  const fmtClosing = `${(closing_cost_rate * 100).toFixed(1)}%`;
  const fmtDown = `${currency}${Math.round(avg_home_price * downPayment).toLocaleString()}`;
  const thirtyYearHomeValue = `${currency}${Math.round(avg_home_price * Math.pow(1.03, 30)).toLocaleString()}`;

  // 8-language × 3-template matrix
  const narratives: Record<string, string[]> = {
    en: [
      // Template 0: Price-to-Rent ratio & investment
      `The ${city.name} housing market shows a Price-to-Rent ratio of **${ratioFormatted}**, calculated from an average home price of ${fmtPrice} against monthly rents of ${fmtRent}. ${isBuyFavorable ? `A ratio below 18 signals that **buying** may outperform renting as a wealth-building strategy.` : `A ratio above 18 suggests that **renting** and investing the savings into a diversified portfolio is likely the sharper financial play.`} With a ${fmtDown} down payment, the alternative is investing that capital at a 5% annual return — a key factor our calculator models over 30 years. Adjust the sliders below to test your personal scenario.`,
      // Template 1: Hidden costs & nomad flexibility
      `Buying a home in ${city.name} comes with costs that never appear in the listing price. Closing costs run **${fmtClosing}** of the purchase price (${currency}${Math.round(entryCost).toLocaleString()}), annual property taxes are **${fmtTax}**, and maintenance averages 1% per year. For someone staying less than 3 years, these unrecoverable costs add up to approximately **${currency}${fmtUnrecov} per year** — before you even account for selling fees of 6%. ${isBuyFavorable ? `Despite these costs, ${city.name}'s favorable price-to-rent ratio of ${ratioFormatted} means buying still wins long-term.` : `In ${city.name}, these friction costs tilt the math firmly toward **renting** for anyone without a 10+ year horizon.`} The calculator below lets you see exactly when buying overtakes renting for your situation.`,
      // Template 2: 30-year wealth projection & break-even
      `Over a 30-year horizon, the rent-vs-buy question in ${city.name} comes down to one number: the break-even year. Our financial model — which tracks mortgage amortization, home appreciation at 3%, rent inflation, investment opportunity costs, and capital gains tax — places the break-even point at approximately **${breakEvenYears} years**. At today's average price of ${fmtPrice}, a home appreciating at 3% annually would be worth approximately **${thirtyYearHomeValue}** after 30 years. ${isBuyFavorable ? `That growth, combined with monthly rents of ${fmtRent}, makes **buying a strong wealth-building vehicle** in this market.` : `However, a renter investing the difference could accumulate comparable or greater wealth through market returns, making **renting the mathematically superior choice** here.`} Use the calculator to model your exact numbers.`,
    ],
    fr: [
      `Le marché immobilier de ${city.name} affiche un ratio Prix/Loyer de **${ratioFormatted}**, calculé à partir d'un prix moyen de ${fmtPrice} et de loyers mensuels de ${fmtRent}. ${isBuyFavorable ? `Un ratio inférieur à 18 indique que **l'achat** pourrait surpasser la location comme stratégie patrimoniale.` : `Un ratio supérieur à 18 suggère que **la location** et l'investissement de la différence restent plus rentables.`} Avec un apport de ${fmtDown}, l'alternative est de placer ce capital à 5% par an — un facteur clé modélisé sur 30 ans. Ajustez les curseurs ci-dessous pour tester votre situation.`,
      `Acheter à ${city.name} implique des coûts invisibles. Les frais de notaire représentent **${fmtClosing}** du prix d'achat (${currency}${Math.round(entryCost).toLocaleString()}), la taxe foncière annuelle est de **${fmtTax}**, et l'entretien coûte environ 1% par an. Pour un séjour de moins de 3 ans, ces coûts irrécupérables totalisent environ **${currency}${fmtUnrecov} par an** — sans compter les frais d'agence de 6% à la revente. ${isBuyFavorable ? `Malgré cela, le ratio favorable de ${city.name} (${ratioFormatted}) rend l'achat gagnant à long terme.` : `À ${city.name}, ces frictions orientent clairement le calcul vers **la location**.`} Le calculateur ci-dessous montre quand l'achat devient rentable pour vous.`,
      `Sur 30 ans, la question louer-ou-acheter à ${city.name} se résume au point d'équilibre. Notre modèle — intégrant amortissement hypothécaire, appréciation à 3%, inflation des loyers et coûts d'opportunité — situe le seuil de rentabilité à environ **${breakEvenYears} ans**. Au prix moyen actuel de ${fmtPrice}, un bien s'appréciant à 3% vaudrait environ **${thirtyYearHomeValue}** après 30 ans. ${isBuyFavorable ? `Cette croissance fait de **l'achat un puissant levier patrimonial** ici.` : `Cependant, un locataire investissant la différence pourrait accumuler un patrimoine comparable, faisant de **la location le choix mathématiquement supérieur**.`} Utilisez le calculateur pour modéliser vos chiffres.`,
    ],
    de: [
      `Der Immobilienmarkt in ${city.name} zeigt ein Preis-Miet-Verhältnis von **${ratioFormatted}**, berechnet aus einem Durchschnittspreis von ${fmtPrice} und Monatsmieten von ${fmtRent}. ${isBuyFavorable ? `Ein Verhältnis unter 18 signalisiert, dass **Kaufen** als Vermögensaufbau-Strategie die Miete übertreffen kann.` : `Ein Verhältnis über 18 deutet darauf hin, dass **Mieten** und die Investition der Ersparnisse die klügere Wahl ist.`} Mit einem Eigenkapital von ${fmtDown} besteht die Alternative darin, dieses Kapital zu 5% jährlich anzulegen — ein Schlüsselfaktor über 30 Jahre. Passen Sie die Regler unten an.`,
      `Ein Immobilienkauf in ${city.name} bringt versteckte Kosten mit sich. Die Kaufnebenkosten betragen **${fmtClosing}** des Kaufpreises (${currency}${Math.round(entryCost).toLocaleString()}), die jährliche Grundsteuer liegt bei **${fmtTax}**, und Instandhaltung kostet ca. 1% pro Jahr. Für einen Aufenthalt unter 3 Jahren summieren sich diese unwiederbringlichen Kosten auf etwa **${currency}${fmtUnrecov} jährlich** — ohne die 6% Maklergebühren beim Verkauf. ${isBuyFavorable ? `Trotzdem macht das günstige Verhältnis von ${ratioFormatted} den Kauf langfristig lohnend.` : `In ${city.name} sprechen diese Kosten klar für das **Mieten**.`} Der Rechner zeigt, ab wann sich der Kauf für Sie lohnt.`,
      `Über 30 Jahre betrachtet hängt die Mieten-oder-Kaufen-Frage in ${city.name} vom Break-even-Punkt ab. Unser Modell — mit Tilgungsplan, 3% Wertsteigerung, Mietinflation und Opportunitätskosten — setzt den Schwellenwert bei etwa **${breakEvenYears} Jahren** an. Beim aktuellen Durchschnittspreis von ${fmtPrice} wäre eine Immobilie mit 3% Wertzuwachs nach 30 Jahren circa **${thirtyYearHomeValue}** wert. ${isBuyFavorable ? `Dieses Wachstum macht **Kaufen zu einer starken Vermögensanlage** hier.` : `Ein Mieter, der die Differenz investiert, könnte vergleichbares Vermögen aufbauen — **Mieten ist hier rechnerisch überlegen**.`} Nutzen Sie den Rechner für Ihre persönliche Analyse.`,
    ],
    es: [
      `El mercado inmobiliario de ${city.name} muestra un ratio Precio/Alquiler de **${ratioFormatted}**, calculado a partir de un precio medio de ${fmtPrice} y alquileres mensuales de ${fmtRent}. ${isBuyFavorable ? `Un ratio inferior a 18 indica que **comprar** puede superar al alquiler como estrategia patrimonial.` : `Un ratio superior a 18 sugiere que **alquilar** e invertir la diferencia es la opción financieramente más inteligente.`} Con una entrada de ${fmtDown}, la alternativa es invertir ese capital al 5% anual — factor clave modelado a 30 años. Ajusta los controles abajo para probar tu escenario.`,
      `Comprar en ${city.name} conlleva costos que no aparecen en el precio de venta. Los gastos de cierre suponen **${fmtClosing}** del precio (${currency}${Math.round(entryCost).toLocaleString()}), el IBI anual es del **${fmtTax}**, y el mantenimiento ronda el 1% anual. Para estancias menores a 3 años, estos costos irrecuperables suman aproximadamente **${currency}${fmtUnrecov} anuales** — sin contar los honorarios de agencia del 6%. ${isBuyFavorable ? `A pesar de ello, el ratio favorable de ${city.name} (${ratioFormatted}) hace que comprar gane a largo plazo.` : `En ${city.name}, estos costos inclinan claramente la balanza hacia el **alquiler**.`} La calculadora muestra cuándo comprar supera al alquiler en tu caso.`,
      `A 30 años vista, la pregunta alquilar-o-comprar en ${city.name} se reduce al punto de equilibrio. Nuestro modelo — que integra amortización hipotecaria, revalorización del 3%, inflación del alquiler y costes de oportunidad — sitúa el umbral en aproximadamente **${breakEvenYears} años**. Al precio medio actual de ${fmtPrice}, una vivienda revalorizándose al 3% valdría aproximadamente **${thirtyYearHomeValue}** tras 30 años. ${isBuyFavorable ? `Ese crecimiento hace de **comprar una potente herramienta patrimonial** aquí.` : `Sin embargo, un inquilino invirtiendo la diferencia podría acumular un patrimonio comparable — **alquilar es la opción superior** aquí.`} Usa la calculadora para modelar tus números.`,
    ],
    it: [
      `Il mercato immobiliare di ${city.name} presenta un rapporto Prezzo/Affitto di **${ratioFormatted}**, calcolato da un prezzo medio di ${fmtPrice} e affitti mensili di ${fmtRent}. ${isBuyFavorable ? `Un rapporto inferiore a 18 indica che **comprare** può essere più vantaggioso dell'affitto come strategia patrimoniale.` : `Un rapporto superiore a 18 suggerisce che **affittare** e investire il risparmio è probabilmente la scelta finanziaria migliore.`} Con un acconto di ${fmtDown}, l'alternativa è investire quel capitale al 5% annuo — fattore chiave del nostro modello a 30 anni. Regola i cursori qui sotto per testare il tuo scenario.`,
      `Comprare casa a ${city.name} comporta costi nascosti. Le spese notarili ammontano al **${fmtClosing}** del prezzo (${currency}${Math.round(entryCost).toLocaleString()}), l'IMU annuale è del **${fmtTax}**, e la manutenzione costa circa l'1% annuo. Per chi resta meno di 3 anni, questi costi irrecuperabili totalizzano circa **${currency}${fmtUnrecov} all'anno** — senza contare le commissioni d'agenzia del 6%. ${isBuyFavorable ? `Nonostante ciò, il rapporto favorevole di ${city.name} (${ratioFormatted}) rende l'acquisto vincente nel lungo periodo.` : `A ${city.name}, questi costi spostano nettamente il calcolo verso l'**affitto**.`} Il calcolatore mostra quando l'acquisto supera l'affitto per te.`,
      `In un orizzonte di 30 anni, la questione affitto-o-acquisto a ${city.name} si riduce al punto di pareggio. Il nostro modello — che integra ammortamento mutuo, rivalutazione al 3%, inflazione degli affitti e costi opportunità — colloca la soglia a circa **${breakEvenYears} anni**. Al prezzo medio attuale di ${fmtPrice}, un immobile con rivalutazione al 3% varrebbe circa **${thirtyYearHomeValue}** dopo 30 anni. ${isBuyFavorable ? `Questa crescita rende **l'acquisto un potente strumento patrimoniale** qui.` : `Tuttavia, un inquilino che investe la differenza potrebbe accumulare un patrimonio comparabile — **affittare è matematicamente superiore** qui.`} Usa il calcolatore per i tuoi numeri.`,
    ],
    pt: [
      `O mercado imobiliário de ${city.name} apresenta um rácio Preço/Arrendamento de **${ratioFormatted}**, calculado a partir de um preço médio de ${fmtPrice} e rendas mensais de ${fmtRent}. ${isBuyFavorable ? `Um rácio inferior a 18 indica que **comprar** pode superar o arrendamento como estratégia patrimonial.` : `Um rácio superior a 18 sugere que **arrendar** e investir a diferença é provavelmente a escolha mais inteligente.`} Com uma entrada de ${fmtDown}, a alternativa é investir esse capital a 5% ao ano — fator chave modelado ao longo de 30 anos. Ajuste os controlos abaixo para testar o seu cenário.`,
      `Comprar casa em ${city.name} implica custos ocultos. O IMT e escrituras representam **${fmtClosing}** do preço (${currency}${Math.round(entryCost).toLocaleString()}), o IMI anual é de **${fmtTax}**, e a manutenção ronda 1% ao ano. Para estadias inferiores a 3 anos, estes custos irrecuperáveis totalizam cerca de **${currency}${fmtUnrecov} por ano** — sem contar a comissão imobiliária de 6%. ${isBuyFavorable ? `Apesar disso, o rácio favorável de ${city.name} (${ratioFormatted}) torna a compra vantajosa a longo prazo.` : `Em ${city.name}, estes custos inclinam claramente a balança para o **arrendamento**.`} A calculadora mostra quando comprar supera arrendar no seu caso.`,
      `Num horizonte de 30 anos, a questão arrendar-ou-comprar em ${city.name} resume-se ao ponto de equilíbrio. O nosso modelo — que integra amortização hipotecária, valorização de 3%, inflação das rendas e custos de oportunidade — situa o limiar em aproximadamente **${breakEvenYears} anos**. Ao preço médio atual de ${fmtPrice}, um imóvel a valorizar 3% ao ano valeria cerca de **${thirtyYearHomeValue}** após 30 anos. ${isBuyFavorable ? `Este crescimento faz da **compra um poderoso veículo patrimonial** aqui.` : `Contudo, um arrendatário que invista a diferença poderá acumular património comparável — **arrendar é a escolha superior** aqui.`} Use a calculadora para modelar os seus números.`,
    ],
    nl: [
      `De woningmarkt in ${city.name} toont een Prijs-Huur ratio van **${ratioFormatted}**, berekend op basis van een gemiddelde woningprijs van ${fmtPrice} en maandelijkse huur van ${fmtRent}. ${isBuyFavorable ? `Een ratio onder 18 wijst erop dat **kopen** als vermogensopbouw beter kan presteren dan huren.` : `Een ratio boven 18 suggereert dat **huren** en het verschil investeren de slimmere keuze is.`} Met een aanbetaling van ${fmtDown} is het alternatief dat kapitaal tegen 5% per jaar te beleggen — een sleutelfactor in ons 30-jarig model. Pas de schuifregelaars hieronder aan.`,
      `Een woning kopen in ${city.name} brengt verborgen kosten met zich mee. De overdrachtsbelasting bedraagt **${fmtClosing}** van de koopprijs (${currency}${Math.round(entryCost).toLocaleString()}), de jaarlijkse OZB is **${fmtTax}**, en onderhoud kost circa 1% per jaar. Voor een verblijf korter dan 3 jaar tellen deze onherstelbare kosten op tot circa **${currency}${fmtUnrecov} per jaar** — exclusief 6% makelaarskosten bij verkoop. ${isBuyFavorable ? `Desondanks maakt de gunstige ratio van ${city.name} (${ratioFormatted}) kopen op lange termijn winstgevend.` : `In ${city.name} wijzen deze kosten duidelijk richting **huren**.`} De rekenmachine toont wanneer kopen huren overtreft voor jouw situatie.`,
      `Over 30 jaar komt de huur-of-koop-vraag in ${city.name} neer op het omslagpunt. Ons model — met aflossingsschema, 3% waardestijging, huurinflatie en opportuniteitskosten — plaatst de drempel op circa **${breakEvenYears} jaar**. Bij de huidige gemiddelde prijs van ${fmtPrice} zou een woning met 3% waardestijging na 30 jaar circa **${thirtyYearHomeValue}** waard zijn. ${isBuyFavorable ? `Die groei maakt **kopen een krachtig vermogensinstrument** hier.` : `Een huurder die het verschil belegt, zou vergelijkbaar vermogen kunnen opbouwen — **huren is hier rekenkundig superieur**.`} Gebruik de rekenmachine voor jouw persoonlijke berekening.`,
    ],
    sv: [
      `Bostadsmarknaden i ${city.name} visar ett Pris-Hyra förhållande på **${ratioFormatted}**, beräknat utifrån ett genomsnittligt bostadspris på ${fmtPrice} och månadshyror på ${fmtRent}. ${isBuyFavorable ? `Ett förhållande under 18 tyder på att **köpa** kan vara en bättre förmögenhetsbyggande strategi än att hyra.` : `Ett förhållande över 18 tyder på att **hyra** och investera mellanskillnaden är det ekonomiskt klokare valet.`} Med en handpenning på ${fmtDown} är alternativet att investera det kapitalet till 5% årligen — en nyckelfaktor i vår 30-årsmodell. Justera reglagen nedan för att testa ditt scenario.`,
      `Att köpa bostad i ${city.name} medför dolda kostnader. Stämpelskatten uppgår till **${fmtClosing}** av köpeskillingen (${currency}${Math.round(entryCost).toLocaleString()}), den årliga fastighetsskatten är **${fmtTax}**, och underhåll kostar cirka 1% per år. För den som stannar kortare än 3 år summeras dessa oåterkalleliga kostnader till cirka **${currency}${fmtUnrecov} per år** — utan att räkna mäklararvoden på 6%. ${isBuyFavorable ? `Trots detta gör ${city.name}s gynnsamma förhållande (${ratioFormatted}) att köp lönar sig på sikt.` : `I ${city.name} pekar dessa kostnader tydligt mot att **hyra**.`} Kalkylatorn visar när köp blir lönsamt för dig.`,
      `Över 30 år kokar hyra-eller-köpa-frågan i ${city.name} ner till brytpunkten. Vår modell — som inkluderar amorteringsplan, 3% värdestegring, hyresinflation och alternativkostnader — placerar tröskeln vid ungefär **${breakEvenYears} år**. Vid dagens genomsnittspris på ${fmtPrice} skulle en bostad med 3% årlig värdestegring vara värd ungefär **${thirtyYearHomeValue}** efter 30 år. ${isBuyFavorable ? `Den tillväxten gör **köp till ett kraftfullt förmögenhetsverktyg** här.` : `En hyresgäst som investerar mellanskillnaden kan bygga jämförbar förmögenhet — **hyra är det matematiskt överlägsna valet** här.`} Använd kalkylatorn för dina egna siffror.`,
    ],
  };

  const langTemplates = narratives[lang] || narratives.en;
  return langTemplates[variant];
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
  const isValidLang = !lang || validLanguages.includes(lang as typeof validLanguages[number]);
  const language = (isValidLang && lang ? lang : 'en') as typeof validLanguages[number];

  // Deterministic title rotation based on slug length
  const { title, description } = getTitleVariation(city, location, currentYear, language);

  return {
    title,
    description,
    // Block indexing of pages with invalid lang params to prevent SEO bloat
    ...(!isValidLang && { robots: { index: false, follow: true } }),
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
      url: language !== 'en' ? `${baseUrl}${canonicalPath}?lang=${language}` : `${baseUrl}${canonicalPath}`,
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
