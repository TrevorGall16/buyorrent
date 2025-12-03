# SPECIFICATION: TECHNICAL ARCHITECTURE

## 1. The Stack
* **Framework:** Next.js (App Router).
* **Rendering:** SSG (Static Site Generation) for City Pages.
* **Styling:** Tailwind CSS.
* **Language:** TypeScript.

## 2. Directory Structure
```text
/app
  /[city]
    /buy-vs-rent
      page.tsx      // The Programmatic Landing Page
      layout.tsx    // Optimized Layout
/components
  /calculator       // Client Components (Quick/Advanced Toggle)
  /ads              // CLS-Safe Ad Wrappers
/lib
  finance.ts        // Math Logic

  3. Data Schema for Internationalization

Your cities.json must support country-specific overrides:
[
  {
    "slug": "berlin",
    "name": "Berlin",
    "country_code": "DE",
    "currency_symbol": "€",
    "data_updated": "2024-12-01",
    "defaults": {
      "avg_home_price": 450000,
      "avg_rent": 1400,
      "closing_cost_rate": 0.12,  // 12% for Germany
      "property_tax_rate": 0.00
    }
  }
]

4. SEO Requirements (Maximum Indexing)

    Metadata: Title/Description must be dynamic:

        Title: "Rent or Buy in [City]? Real Market Data ([Year] Calculator)"

    Canonical Tags: Must self-reference the clean URL.

    Sitemap: Auto-generate sitemap.xml for all cities in the JSON file.

5. Performance Budget

    Core Web Vitals: LCP < 2.5s. CLS < 0.1.

    JavaScript: No heavy libraries (Lodash, Moment.js). Use native JS.

    Fonts: next/font with swap strategy.