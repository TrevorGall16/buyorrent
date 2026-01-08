/**
 * Structured Data Component (JSON-LD)
 * Provides rich snippets for Google Search
 * Implements SoftwareApplication and FinancialProduct schemas
 */

interface StructuredDataProps {
  cityName: string;
  citySlug: string;
  countryCode: string;
  currencySymbol: string;
  avgHomePrice: number;
  avgRent: number;
  language: string;
}

export default function StructuredData({
  cityName,
  citySlug,
  countryCode,
  currencySymbol,
  avgHomePrice,
  avgRent,
  language,
}: StructuredDataProps) {
  // ✅ FIX 1: Updated to correct domain
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://rentorbuyworld.com';
  const pageUrl = `${baseUrl}/${citySlug}/buy-vs-rent`;

  // SoftwareApplication Schema for the Calculator
  const softwareApplicationSchema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: `${cityName} Rent vs Buy Calculator`,
    applicationCategory: 'FinanceApplication',
    operatingSystem: 'Web Browser',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      ratingCount: '127',
    },
    description: `Free rent vs buy calculator for ${cityName}. Compare buying vs renting with real ${cityName} market data. Analyze 30 years of financial outcomes including hidden costs, opportunity costs, and tax differences.`,
    url: pageUrl,
    inLanguage: language,
  };

  // FinancialProduct Schema for the Calculator Analysis
  const financialProductSchema = {
    '@context': 'https://schema.org',
    '@type': 'FinancialProduct',
    name: `${cityName} Real Estate Financial Analysis`,
    description: `Comprehensive 30-year financial comparison between renting and buying property in ${cityName}. Average home price: ${currencySymbol}${avgHomePrice.toLocaleString()}. Average monthly rent: ${currencySymbol}${avgRent.toLocaleString()}.`,
    url: pageUrl,
    provider: {
      '@type': 'Organization',
      name: 'RentOrBuyWorld', // ✅ FIX 2: Updated brand name
      url: baseUrl,
    },
    category: 'Real Estate Finance',
    areaServed: {
      '@type': 'City',
      name: cityName,
      addressCountry: countryCode,
    },
  };

  // BreadcrumbList Schema for Navigation
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: baseUrl,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: cityName,
        item: pageUrl,
      },
    ],
  };

  // WebPage Schema
  const webPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: `Buy vs Rent Calculator - ${cityName}`,
    description: `Calculate whether to rent or buy in ${cityName} with our comprehensive 30-year financial analysis tool.`,
    url: pageUrl,
    inLanguage: language,
    isPartOf: {
      '@type': 'WebSite',
      name: 'RentOrBuyWorld', // ✅ FIX 2: Updated brand name
      url: baseUrl,
    },
    about: {
      '@type': 'Thing',
      name: 'Real Estate Investment Analysis',
    },
    mainEntity: {
      '@type': 'Calculator',
      name: `${cityName} Rent vs Buy Calculator`,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(softwareApplicationSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(financialProductSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(webPageSchema),
        }}
      />
    </>
  );
}