# Technical Audit Report — Rent vs Buy App

Scope: Deep technical audit focused on financial logic, state synchronization, data typing safety, SEO/routing behavior, and performance.

## Critical

1. **Mortgage payments and mortgage-interest tax savings continue after loan payoff for horizons beyond loan term.**
   - Owner cumulative costs keep adding annual mortgage indefinitely.
   - US tax savings are computed from a cumulative-interest function that is not capped at term end.
   - Impact: materially wrong owner costs and distorted US post-payoff cash-flow behavior.

2. **Renter “monthly savings vs owning” assumes owner mortgage payments continue forever.**
   - Renter contribution math compares rent to an ownership annual cost that always includes mortgage payment.
   - Impact: renter portfolio is overfunded after loan maturity, skewing break-even/recommendations.

## High

3. **URL → component state is one-way after initial mount.**
   - State is initialized from URL once, then URL is continuously rewritten from state.
   - Browser back/forward or direct query edits can leave state stale relative to URL.

4. **Metadata accepts unvalidated `lang` query values.**
   - `generateMetadata` trusts arbitrary `lang` for OG locale and URL variant generation.
   - Impact: unbounded query variants and index-bloat risk despite fixed canonical.

## Medium

5. **Integral numeric fields accept fractional values from URL.**
   - Loan term and analysis years are parsed via `parseFloat` and accepted within bounds.
   - Impact: fractional amortization horizons can create odd edge-case math and UX inconsistencies.

6. **`getCountryConfig` uses unsafe cast from string.**
   - Invalid country codes can return `undefined` while typed as `CountryDefaults`.
   - Impact: potential runtime crashes (`Cannot read properties of undefined`) if invalid code enters runtime.

## Low

7. **Sitemap static-page `lastModified` uses `new Date()` for every generation.**
   - Signals constant content churn and can trigger unnecessary recrawl pressure.

8. **Avoidable recomputation in finance loops.**
   - Monthly mortgage is recalculated every owner-year and renter-year despite being constant for a given input.
   - Impact: small but unnecessary CPU overhead under frequent slider updates.
