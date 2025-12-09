# RentOrBuy-Pro - Claude Code Context

**Version:** 2.0
**Last Updated:** December 2025
**Purpose:** Essential context for Claude Code when assisting with this project.

---

## 1. Project Overview

**RentOrBuy-Pro** is a multi-language financial calculator that helps users decide whether to rent or buy property. It performs comprehensive 30-year financial analysis for **46 cities across 14 countries**.

### Key Metrics
- **Coverage:** 46 cities, 14 countries, 8 languages
- **Pages:** 51 pre-rendered pages (SSG)
- **Tech:** Next.js 16, React 19, TypeScript 5.6, Tailwind CSS 3.4
- **Performance Goal:** INP < 100ms, Zero CLS, First Paint < 1s

---

## 2. Tech Stack

```json
{
  "next": "^16.0.7",
  "react": "^19.2.1",
  "typescript": "^5.6.0",
  "tailwindcss": "^3.4.0",
  "@radix-ui/react-slider": "^1.3.6",
  "recharts": "^2.15.4"
}
```

**Core Technologies:**
- **Framework:** Next.js 16 App Router
- **UI:** React 19 + Radix UI + shadcn/ui
- **Styling:** Tailwind CSS 3.4 (utility-first)
- **Charts:** Recharts 2.15
- **Language:** TypeScript 5.6 (strict mode)

---

## 3. Commands & Workflow

```bash
# Development
npm run dev              # Start dev server (localhost:3000)

# Production
npm run build            # Build 51 SSG pages
npm run start            # Serve production build

# Quality Checks
npm run lint             # ESLint
npm run type-check       # TypeScript check
npx tsx lib/validate-cities.ts  # Validate cities.json
```

**Before Every Commit:**
```bash
npm run type-check && npm run build
```

---

## 4. Architecture Patterns

### File Organization
```
app/                  # Next.js App Router
  layout.tsx          # Global layout (header, footer, ads, cookies)
  page.tsx            # Home (city selector)
  calculator/         # Global calculator
  how-it-works/       # Methodology page
  [city]/buy-vs-rent/ # 46 city pages (SSG)

components/
  calculator/         # Calculator components
  ui/                 # shadcn/ui primitives
  Header.tsx          # Navigation + language selector
  Footer.tsx          # Multi-column footer

lib/
  finance.ts          # 🔴 CRITICAL - Calculation engine
  country-config.ts   # Country configs + translations
  types.ts            # TypeScript definitions
  utils.ts            # cn() helper

data/
  cities.json         # 🔴 CRITICAL - 46 cities data
```

### Rendering Strategy
- **Server Components:** Default (SEO, metadata)
- **Client Components:** Only when needed (`'use client'`)
- **SSG:** All 51 pages pre-rendered at build time

### State Management
- **Primary:** URL search params (`?homePrice=500000&lang=fr`)
- **Why:** Shareable links, browser back/forward, SEO-friendly
- **Secondary:** React useState for UI-only state

---

## 5. Coding Standards

### TypeScript Rules
```tsx
// ✅ DO: Strict types
interface CityCardProps {
  city: {
    slug: string;
    name: string;
    currency_symbol: string;
  };
}

// ❌ DON'T: any types
const data: any = getData();
```

### Component Standards
```tsx
// ✅ DO: Server Component by default
export default function HowItWorksPage() { ... }

// ✅ DO: Client Component when needed
'use client';
export default function Calculator() { ... }

// ✅ DO: JSDoc comments
/**
 * CityCard Component
 * Displays city with country theme color
 */
export default function CityCard({ city }: Props) { ... }
```

### Styling Standards (shadcn/ui)
```tsx
// ✅ DO: Use cn() for class merging
import { cn } from '@/lib/utils';
<div className={cn("base-class", variant === "large" && "large-class")} />

// ✅ DO: Use shadcn/ui components
import { Button } from '@/components/ui/button';

// ❌ DON'T: Invent new button styles
<button className="px-4 py-2 bg-blue-500...">
```

### Internationalization
```tsx
// ❌ DON'T: Hardcode currency symbols
<p>Price: $500,000</p>

// ✅ DO: Use from props/config
<p>Price: {city.currency_symbol}{homePrice.toLocaleString()}</p>
```

---

## 6. Visual Standards (Anti-AI Look)

### Design Philosophy
- **Clean, minimal:** Subtle depth, no clutter
- **Glassmorphism:** `bg-white/80 backdrop-blur-md`
- **Smooth animations:** `transition-all duration-200`
- **Country colors:** Each country has theme color accent

### Typography
```tsx
// Headings
<h1 className="text-5xl font-extrabold tracking-tight text-gray-900">

// Body text
<p className="text-gray-600">  // Not black (#000)

// Semantic weights
font-normal (400), font-semibold (600), font-bold (700), font-extrabold (800)
```

### Card Styling
```tsx
// Standard card
<div className="rounded-2xl border border-slate-200/60 bg-white shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
```

### Button Styling
```tsx
// Primary button
<button className="rounded-full bg-gradient-to-r from-blue-600 to-blue-500 px-6 py-3 text-white font-semibold shadow-md hover:shadow-lg transition-all">
```

### Color Palette
- **Primary:** Blue (#3b82f6, #2563eb)
- **Background:** Gray (#f9fafb, #f3f4f6)
- **Text:** Gray scale (#111827, #4b5563, #6b7280)
- **Borders:** Slate with opacity (#cbd5e1/60)

---

## 7. Ad Implementation Rules (STRICT)

### CLS Protection
```tsx
// ❌ DON'T: No height constraint
<div className="ad-container">
  <ins className="adsbygoogle" />
</div>

// ✅ DO: Fixed min-height
<div className="ad-container min-h-[250px] sm:min-h-[600px]">
  <ins className="adsbygoogle" />
</div>
```

### Loading Strategy
```tsx
// In app/layout.tsx
<Script
  src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"
  strategy="afterInteractive"  // NOT beforeInteractive!
/>
```

### Placement
- **Desktop:** Sidebar (right side)
- **Mobile:** Between calculator sections
- **Never:** Above the fold without min-height

---

## 8. Critical Files & Their Importance

### 🔴 CRITICAL (Don't Break!)
| File | Purpose | Why Critical |
|------|---------|-------------|
| `lib/finance.ts` | Calculation engine | All results depend on this |
| `data/cities.json` | 46 cities data | Build fails if malformed |
| `app/[city]/buy-vs-rent/page.tsx` | City pages | SSG depends on this |
| `lib/country-config.ts` | Country configs | UI breaks per country |

### ✅ Safe to Modify
- `components/Header.tsx` - Layout only
- `components/Footer.tsx` - Layout only
- `components/calculator/ResultsDisplay.tsx` - UI only
- Tailwind classes - No logic impact

---

## 9. Common Workflows

### Adding a New City
```bash
# 1. Edit data/cities.json
{
  "slug": "tokyo",
  "name": "Tokyo",
  "state": "Tokyo",
  "country_code": "JP",
  "currency_symbol": "¥",
  "data_updated": "Dec 2024",
  "theme_color": "#dc2626",
  "defaults": {
    "avg_home_price": 80000000,
    "avg_rent": 200000,
    "closing_cost_rate": 0.06,
    "property_tax_rate": 0.014
  }
}

# 2. Add country config if new (lib/country-config.ts)
# 3. Run build to test
npm run build
```

### Modifying Financial Logic
```bash
# 1. Edit lib/finance.ts
# 2. Test calculations
# 3. Update docs/logic_and_flow.md
# 4. Update /how-it-works page if user-facing
# 5. Run validation
npm run type-check && npm run build
```

### Adding shadcn/ui Component
```bash
# 1. Visit https://ui.shadcn.com
# 2. Copy component to components/ui/
# 3. Install deps if needed
npm install @radix-ui/react-*
# 4. Use cn() for className merging
```

---

## 10. Performance Optimization

### Debouncing User Input
```tsx
// ✅ DO: Debounce URL updates
const debouncedInputs = useDebounce(inputs, 500);
useEffect(() => {
  router.push(`?${createURLParams(debouncedInputs)}`);
}, [debouncedInputs]);

// ❌ DON'T: Update on every keystroke
onChange={(e) => router.push(`?homePrice=${e.target.value}`)}
```

### Code Splitting
- Automatic via Next.js
- Each page = separate bundle
- Use dynamic imports for heavy components if needed

### Image Optimization
- Currently: Placeholder images
- Future: Next.js Image component

---

## 11. SEO Implementation

### Metadata
```tsx
// Every page needs generateMetadata()
export async function generateMetadata({ params }): Promise<Metadata> {
  return {
    title: `Buy vs Rent in ${city} (2024 Calculator)`,
    description: `In ${city}, average home costs ${price}...`,
  };
}
```

### Structured Data
- File: `components/StructuredData.tsx`
- Schemas: SoftwareApplication, FinancialProduct, BreadcrumbList, WebPage
- Enables Google rich snippets

### Sitemap
- File: `app/sitemap.ts`
- Auto-generates 51 page URLs
- Submit to Google Search Console post-deploy

---

## 12. Common Gotchas

### Hydration Mismatches
```tsx
// ❌ DON'T
<p>© {new Date().getFullYear()}</p>

// ✅ DO
const [year, setYear] = useState('2025');
useEffect(() => setYear(new Date().getFullYear().toString()), []);
```

### Client vs Server Components
```tsx
// ❌ DON'T: Hooks in Server Component
export default function Page() {
  const params = useSearchParams(); // Error!
}

// ✅ DO: Extract to Client Component
'use client';
function ClientWrapper() {
  const params = useSearchParams(); // Works!
}
```

### URL State Sync
```tsx
// URL updates should be debounced (see Performance section)
```

---

## 13. Validation & Error Handling

### Runtime Validation
```tsx
// lib/finance.ts validates all inputs
if (principal <= 0) throw new Error('Principal must be > 0');
if (!Number.isFinite(principal)) throw new Error('Invalid number');
```

### Build-Time Validation
```bash
# Validates cities.json structure
npx tsx lib/validate-cities.ts
```

### Error Boundaries
- `app/error.tsx` - Global errors
- `app/[city]/buy-vs-rent/error.tsx` - City page errors

---

## 14. Internationalization (i18n)

### Supported Languages
EN, FR, DE, ES, IT, NL, SV, PT

### URL Pattern
```
/paris/buy-vs-rent?lang=fr
```

### Adding a Translation
1. Edit `lib/country-config.ts` (add to all country labels)
2. Update `getLabelsByLanguage()`
3. Add to `LanguageSelector` LANGUAGES array
4. Update Language type
5. Test with `?lang=newlang`

---

## 15. Testing Checklist

### Before Commit
- [ ] `npm run type-check` passes
- [ ] `npm run build` succeeds
- [ ] No console errors in dev mode
- [ ] Tested on mobile (375px) and desktop (1440px)

### Before Deployment
- [ ] All 51 pages build successfully
- [ ] Sitemap includes all pages
- [ ] Environment variables set
- [ ] Google AdSense client ID correct
- [ ] Language switching works

---

## 16. Power User Prompts

### Planning Complex Tasks
```
If task involves >2 files: Use /plan or EnterPlanMode first
```

### Debugging Financial Logic
```
"think hard" when modifying lib/finance.ts
Check lib/country-config.ts if calculations wrong for specific country
```

### UI Changes
```
Always test responsive: 375px (mobile), 768px (tablet), 1440px (desktop)
Check hover states and transitions
Verify WCAG AA color contrast
```

---

## 17. Design Principles (Priority Order)

1. **Performance First** - SSG, minimal JS, debounced inputs
2. **Type Safety** - Strict TypeScript, no `any`
3. **Accessibility** - WCAG AA, keyboard navigation, ARIA
4. **SEO Optimized** - Metadata, structured data, sitemap
5. **User Experience** - Shareable URLs, smooth animations, mobile-first
6. **Maintainability** - Clear separation, reusable components
7. **Privacy Compliant** - Cookie banner, privacy policy, disclaimers

---

## 18. When Making Changes - Checklist

### Ask Yourself:
- [ ] Does this require Client Component? (Default to Server)
- [ ] Does this affect financial calculations? (Test + update docs)
- [ ] Does this impact SEO? (Metadata, structured data)
- [ ] Is this type-safe? (No `any` types)
- [ ] Is this accessible? (ARIA, keyboard nav)
- [ ] Does this work in all languages? (Test `?lang=fr`)
- [ ] Will this break on mobile? (Test breakpoints)
- [ ] Will this cause CLS? (Ad containers need min-height)

---

## 19. File Reference Format

When referencing code, use line numbers:
```
lib/finance.ts:42 - calculateMonthlyMortgagePayment()
app/layout.tsx:32 - Google AdSense script
components/calculator/Calculator.tsx:264 - URL sync useEffect
```

---

## 20. Resources

### Documentation
- **Tech Architecture:** `docs/TECHNICAL_ARCHITECTURE.md`
- **Business Logic:** `docs/logic_and_flow.md`
- **UI Specs:** `docs/ui_specs.md`

### External
- Next.js: https://nextjs.org/docs
- Tailwind: https://tailwindcss.com/docs
- shadcn/ui: https://ui.shadcn.com
- Recharts: https://recharts.org

---

## 21. Quick Reference

### Import Aliases
```tsx
import Component from '@/components/Component';  // NOT ../../../
import { finance } from '@/lib/finance';
import citiesData from '@/data/cities.json';
```

### Component Naming
- **Components:** PascalCase (`CityCard.tsx`)
- **Utilities:** camelCase (`finance.ts`)
- **Pages:** Next.js convention (`page.tsx`, `layout.tsx`)

### TypeScript Config
- Strict mode enabled
- Absolute imports via `@/`
- No `any` types allowed

---

**Philosophy:** "Speed is Trust. Zero CLS. INP < 100ms."

**Built with ❤️ using Next.js 16, React 19, TypeScript 5.6, Tailwind CSS, shadcn/ui**

For complete technical documentation, see `docs/TECHNICAL_ARCHITECTURE.md`.
