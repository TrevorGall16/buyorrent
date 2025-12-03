1. Project Manifesto

    Project Name: RentOrBuy-Pro

    Project Type: Programmatic SEO Financial Tool.

    Core Value: A highly interactive financial calculator wrapped in thousands of localized, SEO-optimized landing pages.

    Primary Goals:

        Speed: < 100ms Interaction to Next Paint (INP).

        Indexing: Generate unique landing pages for 500+ US cities.

        Revenue: Aggressive ad placements that do not trigger Cumulative Layout Shift (CLS).

    Tech Stack (Mandatory):

        Framework: Next.js (App Router) - utilizing SSG (Static Site Generation) for city pages.

        Styling: Tailwind CSS (utility-first for small bundle size).

        State: URL-based state (Query Parameters) for shareability.

        Visualization: Recharts (lightweight, highly customizable).

        Language: TypeScript (Strict mode).

2. User Journey & Logic
Core User Flow

    Landing: User arrives at /{city}/buy-vs-rent (e.g., /austin/buy-vs-rent).

    Pre-fill: Calculator is pre-filled with Austin's average Home Price and Rent data (fetched from static JSON/DB).

    Interaction: User adjusts sliders (Mortgage Rate, Duration, Appreciation).

    Instant Feedback:

        The Hook: A line chart showing two diverging lines ("Net Worth: Renter" vs "Net Worth: Owner").

        The Verdict: A sticky header/banner that updates instantly: "Buying is better after 4 years."

    Conversion: User clicks "Get Mortgage Rates" (Affiliate Link) or "Find Rentals" (Affiliate Link).

Calculation Logic (The "Engine")

    Inputs: Home Price, Down Payment %, Interest Rate, Loan Term, Buying Closing Costs, Property Tax, Maintenance %, Monthly Rent, Rent Inflation %, Investment Return % (Opportunity Cost).

    Output: Break-even year, Total Net Worth (Rent vs Buy) at year X.

3. UI/UX Specifications
Layout (Mobile First)

    Mobile: Single column. Sticky "Result Bar" at the bottom. Calculator inputs collapse into accordions.

    Desktop: Split screen. Left 50% = Scrollable Inputs. Right 50% = Sticky Results & Charts.

Accessibility (A11y) Requirements

    Sliders: Must be usable via Arrow Keys.

    Charts: Must include an HTML table fallback or aria-label summary for screen readers.

    Contrast: Text colors must meet WCAG AA (Contrast ratio 4.5:1).

CLS Protection (Ad Safety) - STRICT

    Rule: No ad may ever push content down after load.

    Implementation: All ad slots must be wrapped in a div with a rigid definition:

    .ad-slot-sidebar {
  min-height: 600px;
  width: 300px;
  background-color: #f0f0f0; /* Placeholder color */
  display: flex;
  justify-content: center;
  align-items: center;
}

4. Technical Architecture
Directory Structure (Next.js App Router)
/app
  /[city]
    /buy-vs-rent
      page.tsx      // The SSG Page
      layout.tsx    // Specific layout for calculator
  /components
    /calculator
      Calculator.tsx
      Chart.tsx
    /ads
      AdContainer.tsx  // CLS-safe wrapper
/lib
  finance-math.ts   // Pure functions for amortization
  city-data.json    // Data source for programmatic pages

  Data Strategy

    Source: A large JSON file or SQLite DB containing city_slug, avg_home_price, avg_rent for 500 cities.

    Build Time: Use generateStaticParams in Next.js to pre-build all 500 city pages. Do not use Client-Side Rendering for the initial HTML.

Performance Budgets

    Lighthouse: Must score 95+ on Performance, SEO, and Best Practices.

    Bundle Size: Keep the initial JS chunk under 80kb.

    Font: Use next/font/google with display: swap.

5. SEO & Ad Strategy
Programmatic SEO Strategy

    URL Pattern: domain.com/[city-slug]/buy-vs-rent

    Title Tag Logic: Buy vs. Rent in [City Name] ([Year] Calculator & Market Data)

    Dynamic Content: Inject city-specific text.

        Bad: "Here is a calculator."

        Good: "In [City], the average home costs $[Price]. With rents averaging $[Rent], buying makes sense if you stay for [X] years."

Schema Markup (JSON-LD)

    Implement FinancialProduct or SoftwareApplication schema on every page.

    Implement BreadcrumbList for Home > State > City > Tool.

Ad Revenue Optimization

    Sidebar (Desktop): 300x600 sticky unit. Stays in view while user scrolls inputs.

    In-Content (Mobile): 300x250 unit inserted after every 3 input groups.

    Refresh Logic: Monitor user activity. If user interacts with sliders for > 30 seconds, trigger googletag.pubads().refresh().

6. Testing Strategy

    Unit Tests (Jest):

        Test finance-math.ts rigorously.

        Case: If Interest Rate is 0%, does the math break?

        Case: If Rent > Mortgage, is Break-even year 0?

    E2E Tests (Playwright):

        Navigate to /new-york/buy-vs-rent.

        Verify Calculator loads with NY data.

        Verify Ad containers exist and have correct dimensions.

        Verify Chart renders.

7. Failure Modes & Pitfalls

    Invalid Math: Dividing by zero if "Years" is set to 0. Fix: Input validation (min=1).

    Ad Blocker Layout Shift: If ads are blocked, the .ad-slot container must remain empty (white space) or collapse only if it doesn't cause a shift in the viewport. Prefer keeping the whitespace to avoid CLS penalties.

    Query Parameter Bloat: Prevent URL from exceeding 2048 characters if adding too many custom inputs.