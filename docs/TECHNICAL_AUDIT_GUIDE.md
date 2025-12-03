# TECHNICAL ARCHITECTURE & AUDIT GUIDE
# RentOrBuy-Pro - Buy vs Rent Calculator

**Version:** 1.0
**Date:** December 2024
**Purpose:** Complete technical documentation for code auditing and issue detection

---

## 🎯 PROJECT OVERVIEW

**Type:** Programmatic SEO Financial Calculator
**Tech Stack:** Next.js 15 (App Router), TypeScript, Tailwind CSS, Recharts
**Rendering:** Static Site Generation (SSG)
**Primary Goal:** Generate 500+ localized city pages with CLS-safe ad revenue

### Key Requirements:
1. **Sub-100ms INP** (Interaction to Next Paint)
2. **CLS < 0.1** (Zero layout shift from ads)
3. **International support** (USA, France, Germany, UK)
4. **SEO-optimized** landing pages for each city

---

## 📁 PROJECT STRUCTURE

```
/app
  /[city]/buy-vs-rent
    page.tsx              ← Dynamic city pages (SSG)
  layout.tsx              ← Root layout
  page.tsx                ← Home page with city links
  globals.css             ← Global styles + CLS-safe ad slots

/components
  /calculator
    Calculator.tsx        ← Main calculator (state management)
    QuickInputs.tsx       ← Default view (3 inputs only)
    AdvancedSettings.tsx  ← Collapsible accordion (8+ inputs)
    InputField.tsx        ← Reusable slider component
    NetWorthChart.tsx     ← Recharts dual-line visualization
    ResultsDisplay.tsx    ← Verdict + Trust Badge
    BreakdownTable.tsx    ← Detailed cost comparison
  /ads
    AdContainer.tsx       ← CLS-protected ad wrapper

/lib
  types.ts                ← All TypeScript interfaces
  country-config.ts       ← International defaults (US/FR/DE/GB)
  finance.ts              ← Core calculation engine
  test-finance.ts         ← Test suite for finance logic

/data
  cities.json             ← City data (6 cities, extendable to 500+)

/docs
  overview.md             ← Project manifesto
  instructions.md         ← Master build instructions
  logic_and_flow.md       ← Business logic specification
  ui_specs.md             ← UI/UX requirements
  tech_stacks.md          ← Technical architecture
  UI_REFACTOR_PLAN.md     ← UI improvement roadmap
```

---

## 🧮 CORE CALCULATION ENGINE (`lib/finance.ts`)

### Purpose:
Calculate rent vs buy scenarios over 30 years with international logic.

### Key Functions:

#### 1. **`calculateMonthlyMortgagePayment()`**
```typescript
// Standard amortization formula: P = L[c(1 + c)^n]/[(1 + c)^n - 1]
calculateMonthlyMortgagePayment(
  principal: number,
  annualInterestRate: number,
  loanTermYears: number
): number
```
**Audit Points:**
- ✅ Handles 0% interest rate edge case (returns principal / months)
- ✅ Uses standard mortgage formula
- ⚠️ **Potential Issue:** No validation for negative inputs

#### 2. **`calculateMortgageBalance()`**
```typescript
// Returns remaining balance after N months
calculateMortgageBalance(
  principal: number,
  annualInterestRate: number,
  loanTermYears: number,
  monthsPaid: number
): number
```
**Audit Points:**
- ✅ Returns 0 if loan is fully paid
- ✅ Handles 0% interest rate
- ⚠️ **Potential Issue:** No bounds checking on `monthsPaid`

#### 3. **`calculateRenterScenario()`**
```typescript
// Calculates renter net worth over time
// Tracks: rent payments, investment growth, savings differential
```
**Logic:**
- Renter invests down payment equivalent at `investmentReturnRate`
- Calculates monthly savings: `(mortgage + tax + maintenance) - rent`
- Compounds investment monthly
- Returns `YearlyDataPoint[]` array

**Audit Points:**
- ✅ Rent inflation applied correctly (`rentInflationRate`)
- ✅ Investment compounds monthly
- ⚠️ **Assumption:** Renter saves difference if rent < ownership cost (may not be realistic)
- ⚠️ **Edge Case:** If rent > ownership cost, savings = 0 (capped via `Math.max()`)

#### 4. **`calculateOwnerScenario()`**
```typescript
// Calculates owner net worth over time
// Tracks: mortgage, taxes, maintenance, appreciation, equity
```
**Logic:**
- Includes upfront costs: down payment + closing costs
- Annual costs: mortgage + property tax + maintenance - tax savings
- Home appreciates at 3% annually (configurable)
- Selling costs: 6% of home value
- Net worth = (home equity - selling costs) - cumulative costs

**Audit Points:**
- ✅ Property tax calculated on **current home value** (not purchase price)
- ✅ Maintenance also based on **current home value**
- ✅ Mortgage interest tax deduction included
- ✅ Selling costs factored into net worth
- ⚠️ **Assumption:** 3% appreciation rate (not configurable via UI)
- ⚠️ **Assumption:** 6% selling costs (standard but not adjustable)

#### 5. **`findBreakEvenPoint()`**
```typescript
// Detects year when owner net worth exceeds renter net worth
// Uses linear interpolation for precision
```
**Audit Points:**
- ✅ Returns `null` if never breaks even
- ✅ Calculates exact fractional year (e.g., 13.45 years)
- ✅ Converts to month (0-11 range)
- ⚠️ **Edge Case:** If lines cross multiple times, only first crossover detected

---

## 🌍 INTERNATIONAL LOGIC (`lib/country-config.ts`)

### Country-Specific Configurations:

| Country | Closing Costs | Label | Property Tax | Broker Fee |
|---------|--------------|-------|--------------|------------|
| **USA** 🇺🇸 | 3% | "Closing Costs" | 1.1% | 0 months |
| **France** 🇫🇷 | 7.5% | "Frais de Notaire" | 0.8% | 0 months |
| **Germany** 🇩🇪 | **12%** | "Kaufnebenkosten" | 0.35% | 1 month |
| **UK** 🇬🇧 | 4% | "Stamp Duty" | 1.5% | 0 months |

### Critical International Logic:
```typescript
export function getDefaultInputsForCountry(
  countryCode: CountryCode,
  homePrice: number,
  monthlyRent: number
)
```

**Audit Points:**
- ✅ Germany has **12% closing costs** (drastically affects break-even)
- ✅ Each country has localized labels for UI
- ✅ Currency symbols are country-specific
- ⚠️ **Hardcoded assumption:** 20% down payment for all countries
- ⚠️ **Hardcoded assumption:** 6.5% interest rate (USA-centric)

---

## 🎨 UI COMPONENTS

### Component Architecture:

#### 1. **`Calculator.tsx`** - Main Container
**Responsibilities:**
- State management for all 12+ inputs
- Real-time calculation via `useEffect`
- Passes data to child components

**State Variables:**
```typescript
const [homePrice, setHomePrice] = useState(defaultHomePrice);
const [monthlyRent, setMonthlyRent] = useState(defaultMonthlyRent);
const [downPaymentPercent, setDownPaymentPercent] = useState(0.20);
const [interestRate, setInterestRate] = useState(0.065);
// ... 8 more state variables
```

**Audit Points:**
- ✅ `useEffect` triggers recalculation on ANY input change
- ✅ Uses country-specific defaults from `getDefaultInputsForCountry()`
- ⚠️ **Performance:** Recalculates entire 30-year scenario on every slider drag
  - **Optimization Opportunity:** Debounce calculations (e.g., 300ms delay)
- ⚠️ **Memory:** `results` state stores 31 data points (years 0-30)
  - **Should be fine:** ~5KB of data, not a concern

**Calculation Trigger:**
```typescript
useEffect(() => {
  const inputs = { /* all state */ };
  const calculationResults = calculateRentVsBuy(inputs);
  setResults(calculationResults);
}, [
  homePrice, monthlyRent, downPaymentPercent, /* ... all deps */
]);
```

#### 2. **`QuickInputs.tsx`** - Progressive Disclosure
**Default View Shows:**
- City name badge
- Home Price slider
- Monthly Rent slider

**Audit Points:**
- ✅ Only 3 inputs visible by default (prevents overwhelm)
- ✅ Sliders have min/max/step attributes
- ⚠️ **Accessibility:** Sliders have `aria-label` but no `aria-valuemin/max/now`

#### 3. **`AdvancedSettings.tsx`** - Collapsible Accordion
**Hidden Inputs (8 total):**
- Down Payment %, Interest Rate, Loan Term (15/30 toggle)
- Property Tax Rate, Maintenance Rate
- Rent Inflation, Investment Return, Marginal Tax Rate

**Audit Points:**
- ✅ Starts collapsed (`isOpen = false`)
- ✅ Uses semantic `<button>` with `aria-expanded`
- ⚠️ **Usability:** No visual indication that settings are "advanced"
- ⚠️ **Values are percentages:** UI shows 20, but state is 0.20 (converted via `/100`)
  - **Potential Bug:** If you pass raw value without dividing, math breaks

**Conversion Pattern:**
```typescript
// UI displays: 20
// State expects: 0.20
onChange={(val) => onDownPaymentChange(val / 100)} // ← CRITICAL
```

#### 4. **`NetWorthChart.tsx`** - Recharts Visualization
**Data Structure:**
```typescript
dataPoints: YearlyDataPoint[] = [
  {
    year: 0,
    renterNetWorth: -2200,    // Red line
    ownerNetWorth: -103500,   // Green line
    // ... other fields
  },
  // ... years 1-30
]
```

**Audit Points:**
- ✅ Handles "NEVER breaks even" scenario (lines never cross)
- ✅ Custom tooltip shows both values + break-even indicator
- ✅ Accessibility: Screen reader summary
- ⚠️ **Chart height:** Fixed at 400px (may need responsive sizing)
- ⚠️ **Data volume:** 31 points × 8 fields = 248 data points (fine for client-side)

#### 5. **`AdContainer.tsx`** - CLS Protection (CRITICAL)
**Slot Dimensions:**
```typescript
const slotStyles = {
  sidebar: 'ad-slot-sidebar',  // 300x600px
  mobile: 'ad-slot-mobile',    // 100% x 250px
  footer: 'ad-slot-footer',    // 100% x 50px
};
```

**CSS (in `app/globals.css`):**
```css
.ad-slot-sidebar {
  width: 300px;
  min-height: 600px;  /* RIGID dimension - prevents CLS */
  background-color: #f9f9f9; /* Placeholder */
}
```

**Audit Points:**
- ✅ **CLS PROTECTION:** All containers have `min-height` (prevents layout shift)
- ✅ Placeholder background prevents "flash of empty space"
- ✅ Semantic `role="complementary"` and `aria-label`
- ⚠️ **Ad blocker handling:** Container remains visible even if ad blocked
  - **This is correct:** Keeps layout stable per spec
- ⚠️ **No actual ad code:** Currently shows "Advertisement" placeholder
  - **TODO:** Replace with Google AdSense or other ad network code

---

## 🏗️ NEXT.JS IMPLEMENTATION

### SSG (Static Site Generation):

#### **`app/[city]/buy-vs-rent/page.tsx`**

**generateStaticParams():**
```typescript
export async function generateStaticParams() {
  return citiesData.map((city) => ({
    city: city.slug, // Returns: austin, new-york, berlin, etc.
  }));
}
```
**Build Output:**
- Generates 6 HTML pages at build time
- Each page is fully pre-rendered (no client-side data fetching)
- Routes: `/austin/buy-vs-rent`, `/new-york/buy-vs-rent`, etc.

**Audit Points:**
- ✅ Uses Next.js 15 async params: `const { city } = await params;`
- ✅ Proper 404 handling: `notFound()` if city not found
- ✅ Dynamic metadata (SEO): Title and description per city
- ⚠️ **Scalability:** Only 6 cities currently, needs expansion to 500+
  - **Data source:** `data/cities.json` (easy to extend)
  - **Build time:** 6 cities = ~5 seconds. 500 cities = ~2-3 minutes (acceptable)

**SEO Metadata Example:**
```typescript
title: "Buy vs. Rent in Austin, Texas (2024 Calculator & Market Data)"
description: "In Austin, the average home costs $450,000. With rents
             averaging $2,200, find out if buying or renting makes
             financial sense for you."
```

**Audit Points:**
- ✅ Includes city name, state, year
- ✅ Includes actual market data (price, rent) in description
- ⚠️ **Year is hardcoded:** "2024" should be dynamic
- ⚠️ **No Open Graph tags:** Missing `og:image`, `og:type`, etc.

---

## 🗂️ DATA STRUCTURE (`data/cities.json`)

**Schema:**
```json
{
  "slug": "austin",              // URL segment
  "name": "Austin",              // Display name
  "state": "Texas",              // US only (null for international)
  "country_code": "US",          // US | FR | DE | GB
  "currency_symbol": "$",        // $, €, £
  "data_updated": "Dec 2024",    // Trust badge date
  "defaults": {
    "avg_home_price": 450000,    // Pre-fills calculator
    "avg_rent": 2200,            // Pre-fills calculator
    "closing_cost_rate": 0.03,   // Country-specific
    "property_tax_rate": 0.018   // City-specific (Texas is high!)
  }
}
```

**Audit Points:**
- ✅ Extensible to 500+ cities (just add more objects)
- ✅ Country-specific overrides (closing costs, taxes)
- ⚠️ **No data source validation:** What if `avg_home_price` is 0 or negative?
  - **TODO:** Add Zod or Yup schema validation
- ⚠️ **Manual data entry:** Risk of typos/errors
  - **TODO:** Consider API integration (Zillow, Numbeo, etc.)

---

## 🎭 STYLING & THEMING

### Tailwind Configuration (`tailwind.config.ts`):

**Custom Colors:**
```typescript
colors: {
  'money-saved': '#10b981',  // Green (owner wins)
  'money-lost': '#ef4444',   // Red (renter wins)
}
```

**Font Stack:**
```typescript
fontFamily: {
  sans: ['-apple-system', 'BlinkMacSystemFont', 'Segoe UI', ...],
}
```

**Audit Points:**
- ✅ System font stack (no web fonts = faster load)
- ✅ Colors align with financial psychology (green = good, red = bad)
- ⚠️ **No dark mode:** Only light theme implemented
- ⚠️ **No CSS-in-JS:** Relies entirely on Tailwind utility classes

### Global CSS (`app/globals.css`):

**CLS-Safe Ad Slots (CRITICAL):**
```css
.ad-slot {
  background-color: #f9f9f9;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden; /* Prevents content overflow */
}

.ad-slot-sidebar {
  width: 300px;
  min-height: 600px; /* RIGID - prevents layout shift */
}
```

**Audit Points:**
- ✅ `min-height` ensures container never collapses
- ✅ `overflow: hidden` prevents ad content from breaking layout
- ⚠️ **Specificity:** Uses class selectors (good, but ensure no !important conflicts)

---

## 🐛 POTENTIAL ISSUES & EDGE CASES

### 1. **Finance Calculations**

#### **Issue:** Renter savings assumption
```typescript
const monthlySavings = Math.max(
  (totalAnnualOwnershipCost - annualRent) / 12,
  0
);
```
**Problem:** Assumes renter invests savings. What if rent > ownership cost?
**Current Behavior:** Savings = 0 (capped)
**Risk:** Underestimates renter advantage in high-rent cities
**Severity:** Medium

#### **Issue:** No bounds checking on inputs
```typescript
calculateMonthlyMortgagePayment(principal, annualInterestRate, loanTermYears)
```
**Problem:** No validation for:
- Negative principal
- Interest rate > 100%
- Loan term = 0 years

**Risk:** Can cause NaN or Infinity results
**Severity:** High
**Fix:** Add input validation:
```typescript
if (principal <= 0 || loanTermYears <= 0 || annualInterestRate < 0) {
  throw new Error('Invalid input parameters');
}
```

#### **Issue:** Break-even detection only finds first crossover
```typescript
if (previous.ownerNetWorth <= previous.renterNetWorth &&
    current.ownerNetWorth > current.renterNetWorth) {
  return { year: current.year, ... };
}
```
**Problem:** If lines cross multiple times, only first is detected
**Scenario:** Unlikely, but possible with volatile markets
**Severity:** Low

---

### 2. **UI/UX Issues**

#### **Issue:** No loading state
```typescript
if (!results) {
  return <div>Calculating...</div>; // Only shown briefly
}
```
**Problem:** Calculations are synchronous (blocks UI)
**Risk:** May feel laggy on low-end devices
**Severity:** Low (calculations are fast, ~10ms)
**Fix:** Use `useMemo` to memoize results:
```typescript
const results = useMemo(() =>
  calculateRentVsBuy(inputs),
  [/* deps */]
);
```

#### **Issue:** Slider performance on mobile
**Problem:** `onChange` fires on every pixel drag
**Risk:** Triggers 30+ recalculations per second
**Severity:** Medium on low-end devices
**Fix:** Debounce slider input:
```typescript
const debouncedSetHomePrice = useMemo(
  () => debounce(setHomePrice, 300),
  []
);
```

#### **Issue:** No error boundaries
**Problem:** If any component crashes, entire app breaks
**Risk:** Math errors (NaN, Infinity) could crash calculator
**Severity:** High
**Fix:** Add error boundary:
```typescript
// app/error.tsx
'use client';
export default function Error({ error, reset }) {
  return (
    <div>
      <h2>Something went wrong!</h2>
      <button onClick={reset}>Try again</button>
    </div>
  );
}
```

---

### 3. **Data & Validation Issues**

#### **Issue:** No schema validation for cities.json
**Problem:** Typos or malformed data can break pages
**Risk:** If `avg_home_price` is `"450000"` (string) instead of `450000` (number)
**Severity:** High
**Fix:** Add Zod validation:
```typescript
import { z } from 'zod';

const CitySchema = z.object({
  slug: z.string().min(1),
  name: z.string().min(1),
  country_code: z.enum(['US', 'FR', 'DE', 'GB']),
  defaults: z.object({
    avg_home_price: z.number().positive(),
    avg_rent: z.number().positive(),
    // ...
  }),
});

// At import time:
citiesData.forEach(city => CitySchema.parse(city));
```

#### **Issue:** Stale data dates
```json
"data_updated": "Dec 2024"
```
**Problem:** Manually updated (risk of forgetting)
**Risk:** Trust badge shows outdated date
**Severity:** Low (cosmetic)
**Fix:** Auto-generate from build timestamp:
```typescript
const buildDate = new Date().toLocaleDateString('en-US', {
  month: 'short',
  year: 'numeric'
});
```

---

### 4. **Performance Issues**

#### **Issue:** Bundle size (210 KB per page)
**Current:** 210 KB first load JS
**Target:** < 80 KB (per spec)
**Severity:** Medium
**Analysis:**
- Recharts is heavy (~60 KB minified)
- Next.js framework overhead (~45 KB)
- Calculator components (~10 KB)

**Fix Options:**
1. Lazy load Recharts:
```typescript
const NetWorthChart = dynamic(() => import('./NetWorthChart'), {
  loading: () => <div>Loading chart...</div>,
  ssr: false,
});
```
2. Consider lighter chart library (chart.js, victory)
3. Code splitting via `next/dynamic`

#### **Issue:** No image optimization
**Current:** No images in use
**Future Risk:** If city images added, need Next.js Image component
**Severity:** Low (not applicable yet)

---

### 5. **Accessibility Issues**

#### **Issue:** Slider ARIA attributes incomplete
```typescript
<input type="range" aria-label={label} ... />
```
**Missing:**
- `aria-valuemin`, `aria-valuemax`, `aria-valuenow`
- `aria-valuetext` (formatted value)

**Fix:**
```typescript
<input
  type="range"
  aria-label={label}
  aria-valuemin={min}
  aria-valuemax={max}
  aria-valuenow={value}
  aria-valuetext={`${prefix}${displayValue}${suffix}`}
  ...
/>
```

#### **Issue:** Chart accessibility
**Current:** Has screen reader summary (good)
**Missing:** Keyboard navigation for data points
**Severity:** Low (charts are inherently visual)

---

### 6. **SEO Issues**

#### **Issue:** Missing structured data (JSON-LD)
**Spec requires:** `FinancialProduct` or `SoftwareApplication` schema
**Current:** Not implemented
**Severity:** Medium

**Fix:** Add to city pages:
```typescript
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Rent vs Buy Calculator",
  "applicationCategory": "FinanceApplication",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  }
}
</script>
```

#### **Issue:** Missing breadcrumb schema
**Spec requires:** `Home > State > City > Tool`
**Current:** Not implemented
**Severity:** Low

#### **Issue:** No sitemap.xml generation
**Current:** Manual sitemap needed
**Severity:** Medium (for 500+ pages)
**Fix:** Add to `next.config.ts`:
```typescript
// Use next-sitemap package
// Or generate in app/sitemap.ts
export default function sitemap() {
  return citiesData.map(city => ({
    url: `https://example.com/${city.slug}/buy-vs-rent`,
    lastModified: new Date(),
  }));
}
```

---

### 7. **Security Issues**

#### **Issue:** No input sanitization
**Current:** User input (city slug from URL) is directly used
**Risk:** XSS if city name contains malicious HTML
**Severity:** Low (data is from trusted JSON, not user input)
**Defense:** Next.js auto-escapes all JSX content

#### **Issue:** No rate limiting
**Current:** Calculator can be spammed
**Risk:** CPU exhaustion on server during SSG build
**Severity:** Low (SSG pages are pre-built)

---

## 🔍 TESTING RECOMMENDATIONS

### Unit Tests (Missing)
**Critical functions to test:**
1. `calculateMonthlyMortgagePayment()` - edge cases (0% rate, $0 principal)
2. `calculateMortgageBalance()` - verify balance decreases correctly
3. `findBreakEvenPoint()` - test "never breaks even" scenario
4. Country config lookups - verify all 4 countries

**Suggested framework:** Jest + Testing Library

### E2E Tests (Missing)
**Critical flows to test:**
1. Navigate to `/austin/buy-vs-rent`
2. Verify calculator loads with Austin data
3. Drag home price slider → verify chart updates
4. Expand Advanced Settings → verify accordion opens
5. Verify ad containers exist with correct dimensions

**Suggested framework:** Playwright or Cypress

### Visual Regression (Missing)
**Critical to prevent CLS issues:**
1. Capture screenshots of all ad slot configurations
2. Verify no layout shift when ads "load" (simulate with placeholder content)
3. Test mobile vs desktop layouts

**Suggested tool:** Percy or Chromatic

---

## 📊 PERFORMANCE METRICS

### Current (Measured):
- **Build Time:** ~5 seconds for 6 pages
- **Bundle Size:** 210 KB first load JS
- **Type Check:** ~2 seconds
- **SSG Pages:** 6 generated

### Target (Per Spec):
- **Lighthouse Performance:** 95+
- **INP:** < 100ms
- **CLS:** < 0.1
- **Bundle Size:** < 80 KB (⚠️ Currently over target)
- **LCP:** < 2.5s

### Optimization Priorities:
1. **Reduce bundle size** (lazy load Recharts)
2. **Add performance monitoring** (Web Vitals tracking)
3. **Optimize calculations** (memoization, debouncing)

---

## 🚨 CRITICAL AUDIT CHECKLIST

Use this checklist when auditing:

### Finance Engine:
- [ ] Input validation (no negative/zero values)
- [ ] Edge case handling (0% interest, 100+ year loans)
- [ ] Math accuracy (compare against manual calculations)
- [ ] International logic (verify 12% German closing costs)

### UI Components:
- [ ] No infinite render loops (check `useEffect` deps)
- [ ] Percentage conversions (UI shows 20, state is 0.20)
- [ ] Chart handles "never breaks even" scenario
- [ ] Ad containers have RIGID dimensions

### Data:
- [ ] cities.json schema validation
- [ ] No duplicate city slugs
- [ ] All required fields present
- [ ] Numeric values are numbers (not strings)

### Accessibility:
- [ ] All inputs have labels
- [ ] Sliders have ARIA attributes
- [ ] Color contrast meets WCAG AA
- [ ] Keyboard navigation works

### Performance:
- [ ] Bundle size < 80 KB (currently fails)
- [ ] No unnecessary re-renders
- [ ] Charts don't block UI
- [ ] SSG generates all pages successfully

### SEO:
- [ ] Dynamic metadata per city
- [ ] Structured data (JSON-LD) - Missing
- [ ] Sitemap.xml - Missing
- [ ] Canonical URLs

### Security:
- [ ] No XSS vulnerabilities
- [ ] Input sanitization (city slug)
- [ ] No sensitive data in client bundle

---

## 🔧 MAINTENANCE TASKS

### Regular Updates:
1. **City data refresh** - Update `avg_home_price` and `avg_rent` quarterly
2. **Interest rates** - Update default rate to match current markets
3. **Dependencies** - `npm audit` and update packages monthly
4. **Build verification** - Run `npm run build` before deploys

### Future Enhancements:
1. **Scale to 500 cities** - Expand cities.json
2. **Add more countries** - Spain, Italy, Netherlands, etc.
3. **Historical data** - Show market trends over time
4. **User accounts** - Save calculations, compare cities
5. **API integration** - Pull live market data (Zillow, Redfin APIs)

---

## 📞 CONTACT & SUPPORT

**For questions about:**
- **Finance calculations:** Review `lib/finance.ts` and `lib/test-finance.ts`
- **UI components:** Review `components/calculator/*`
- **Build issues:** Check `next.config.ts` and `package.json`
- **Data structure:** Review `data/cities.json` and `lib/types.ts`

**Key Files to Understand First:**
1. `lib/finance.ts` - Core logic
2. `components/calculator/Calculator.tsx` - State management
3. `app/[city]/buy-vs-rent/page.tsx` - SSG implementation
4. `lib/country-config.ts` - International logic

---

**END OF TECHNICAL AUDIT GUIDE**
