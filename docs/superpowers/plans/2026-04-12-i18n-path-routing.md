# i18n Path-Based Routing Migration

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Migrate from `?lang=` query-param i18n to path-based `/[lang]/` routing, producing 368+ statically generated pages (8 languages x 46 cities + static pages), with 308 redirects for legacy URLs and zero dynamic rendering on city routes.

**Architecture:** All routes move under `app/[lang]/`. Root `app/layout.tsx` becomes a thin shell (no `<html>`/`<body>`), while `app/[lang]/layout.tsx` becomes the real root layout with `<html lang={lang}>`. Middleware handles: `/ -> /en/`, legacy `/{city}/buy-vs-rent?lang=xx -> /{lang}/{city}/buy-vs-rent`, and `?lang=` query normalization. Calculator switches from `router.replace()` to `history.replaceState()` for client-only URL sync.

**Tech Stack:** Next.js 16 (App Router), TypeScript, Tailwind CSS

**Canonical host:** `https://rentorbuyworld.com` (apex, no `www`)

---

## File Structure

### New Files
- `lib/i18n.ts` — Language constants, validation, type exports (single source of truth)
- `app/[lang]/layout.tsx` — Real root layout with `<html lang>`, fonts, Header, Footer
- `app/[lang]/page.tsx` — Home page (moved from `app/page.tsx`)
- `app/[lang]/[city]/buy-vs-rent/page.tsx` — City calculator (moved from `app/[city]/buy-vs-rent/page.tsx`)
- `app/[lang]/rankings/page.tsx` — Rankings (moved from `app/rankings/page.tsx`)
- `app/[lang]/how-it-works/page.tsx` — How it works (moved from `app/how-it-works/page.tsx`)
- `app/[lang]/data-and-sources/page.tsx` — Data sources (moved from `app/data-and-sources/page.tsx`)
- `app/[lang]/privacy/page.tsx` — Privacy (moved from `app/privacy/page.tsx`)
- `app/[lang]/calculator/page.tsx` — Global calculator (moved from `app/calculator/page.tsx`)
- `middleware.ts` — Redirect engine (project root)

### Modified Files
- `app/layout.tsx` — Strip down to thin shell (no `<html>`, no `<body>`)
- `app/sitemap.ts` — Switch from `?lang=` URLs to `/[lang]/` paths
- `components/LanguageSelector.tsx` — Navigate to `/{lang}/` path instead of `?lang=`
- `components/CityCard.tsx` — Link to `/{lang}/{city}/buy-vs-rent`
- `components/Header.tsx` — Prefix nav links with `/{lang}/`
- `components/Footer.tsx` — Prefix links with `/{lang}/`
- `components/calculator/Calculator.tsx` — Switch URL sync from `router.replace()` to `history.replaceState()`
- `components/StructuredData.tsx` — Update `pageUrl` to include lang prefix

### Deleted Files (after migration verified)
- `app/page.tsx` — Replaced by `app/[lang]/page.tsx`
- `app/[city]/` directory — Replaced by `app/[lang]/[city]/`
- `app/rankings/page.tsx` — Replaced by `app/[lang]/rankings/page.tsx`
- `app/how-it-works/page.tsx` — Replaced by `app/[lang]/how-it-works/page.tsx`
- `app/data-and-sources/page.tsx` — Replaced by `app/[lang]/data-and-sources/page.tsx`
- `app/privacy/page.tsx` — Replaced by `app/[lang]/privacy/page.tsx`
- `app/calculator/page.tsx` — Replaced by `app/[lang]/calculator/page.tsx`

---

## Task 1: Create `lib/i18n.ts` — Language Constants

**Files:**
- Create: `lib/i18n.ts`

- [ ] **Step 1: Create the i18n constants module**

```typescript
// lib/i18n.ts

export const SUPPORTED_LANGUAGES = ['en', 'fr', 'de', 'es', 'it', 'nl', 'sv', 'pt'] as const;
export type Language = (typeof SUPPORTED_LANGUAGES)[number];
export const DEFAULT_LANGUAGE: Language = 'en';

/** Validate and return a Language, falling back to 'en' */
export function resolveLanguage(lang: string | undefined): Language {
  if (lang && SUPPORTED_LANGUAGES.includes(lang as Language)) {
    return lang as Language;
  }
  return DEFAULT_LANGUAGE;
}

/** Check if a string is a valid language code */
export function isValidLanguage(lang: string): lang is Language {
  return SUPPORTED_LANGUAGES.includes(lang as Language);
}

/** Generate the static params array for [lang] segment */
export function generateLanguageParams() {
  return SUPPORTED_LANGUAGES.map((lang) => ({ lang }));
}
```

- [ ] **Step 2: Verify no TypeScript errors**

Run: `npx tsc --noEmit lib/i18n.ts` (or just `npm run type-check`)
Expected: No errors

- [ ] **Step 3: Commit**

```bash
git add lib/i18n.ts
git commit -m "feat: add lib/i18n.ts language constants module"
```

---

## Task 2: Create `app/[lang]/layout.tsx` and Strip Root Layout

**Files:**
- Create: `app/[lang]/layout.tsx`
- Modify: `app/layout.tsx`

This is the core structural change. The current `app/layout.tsx` has `<html>`, `<body>`, fonts, Header, Footer. We move all of that into `app/[lang]/layout.tsx` and make root layout a thin passthrough.

- [ ] **Step 1: Create `app/[lang]/layout.tsx`**

This file is essentially the current `app/layout.tsx` but with access to `params.lang`. Key changes:
- Receives `{ params }` with `lang`
- Sets `<html lang={lang} dir="ltr">`
- Adds `dynamic = 'error'` guardrail (this layout is always static)
- Generates `lang` static params

```typescript
// app/[lang]/layout.tsx
import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "../globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CookieBanner from "@/components/CookieBanner";
import { getHomePageLabels } from "@/lib/country-config";
import { SUPPORTED_LANGUAGES, resolveLanguage, type Language } from "@/lib/i18n";

export const dynamic = 'error'; // Fail build if any child tries dynamic rendering

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
  style: ["normal", "italic"],
});

export function generateStaticParams() {
  return SUPPORTED_LANGUAGES.map((lang) => ({ lang }));
}

export default async function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang: rawLang } = await params;
  const lang = resolveLanguage(rawLang);
  const labels = getHomePageLabels(lang);

  return (
    <html lang={lang} dir="ltr" suppressHydrationWarning className={`${inter.variable} ${playfair.variable} scroll-smooth`}>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  const theme = localStorage.getItem('theme');
                  if (theme) {
                    if (theme === 'dark') {
                      document.documentElement.classList.add('dark');
                    }
                  } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
                    document.documentElement.classList.add('dark');
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body
        className={`
          ${inter.variable}
          antialiased
          min-h-screen
          flex flex-col
          overflow-x-hidden
          bg-[#FAFAFA]
          dark:bg-[#050505]
          text-slate-900
          dark:text-slate-50
          transition-colors duration-300
        `}
      >
        {/* Background Layer */}
        <div className="fixed inset-0 z-[-1] pointer-events-none">
          <div className="absolute inset-0 bg-grid-pattern opacity-[1]" />
          <div
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(to bottom, transparent 0%, var(--bg-page) 100%)',
              maskImage: 'linear-gradient(to bottom, black 40%, transparent 100%)',
              WebkitMaskImage: 'linear-gradient(to bottom, black 40%, transparent 100%)'
            }}
          />
        </div>

        <Header lang={lang} />

        <main className="flex-grow">
          {children}
        </main>

        <Footer labels={labels} />
        <CookieBanner />
      </body>
    </html>
  );
}
```

- [ ] **Step 2: Strip `app/layout.tsx` to thin passthrough**

Replace the entire content of `app/layout.tsx` with:

```typescript
// app/layout.tsx
// Thin root layout — real layout lives in app/[lang]/layout.tsx
// Next.js requires this file to exist at the app root.

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
```

Note: Next.js may auto-wrap with `<html><body>` at build time for any route that doesn't have an ancestor layout with those tags. Since ALL served routes go through `[lang]/layout.tsx`, this passthrough is fine.

- [ ] **Step 3: Verify TypeScript compiles**

Run: `npm run type-check`
Expected: May show errors for moved pages (not yet created) — that's OK. The layout files themselves should have no type errors.

- [ ] **Step 4: Commit**

```bash
git add app/layout.tsx app/[lang]/layout.tsx
git commit -m "feat: create [lang] layout with html lang attr, strip root layout"
```

---

## Task 3: Move Home Page to `app/[lang]/page.tsx`

**Files:**
- Create: `app/[lang]/page.tsx` (adapted from `app/page.tsx`)
- Delete: `app/page.tsx`

Key changes from original:
- `lang` comes from `params.lang` instead of `searchParams.lang`
- No more `searchParams` usage on server → enables static generation
- Metadata: canonicals use path-based URLs (`/en/`, `/fr/`, etc.)
- Hreflang alternates use path-based URLs
- Internal links use `/${lang}/` prefix

- [ ] **Step 1: Create `app/[lang]/page.tsx`**

Copy `app/page.tsx` content and make these modifications:

1. **Change the page signature** — replace `searchParams` with `params`:

```typescript
// OLD:
export default async function HomePage({
  searchParams,
}: {
  searchParams: Promise<{ lang?: string }>;
}) {
  const { lang: langParam } = await searchParams;
  const lang = (langParam || 'en') as Language;

// NEW:
export default async function HomePage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang: rawLang } = await params;
  const lang = resolveLanguage(rawLang);
```

2. **Update `generateMetadata`** — replace `searchParams` with `params`, update all canonical/hreflang URLs:

```typescript
// OLD:
export async function generateMetadata({ searchParams }: { searchParams: Promise<{ lang?: string }> }): Promise<Metadata> {
  const { lang: langParam } = await searchParams;

// NEW:
export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang: rawLang } = await params;
  const lang = resolveLanguage(rawLang);
```

Replace the `alternates` block:

```typescript
// OLD:
alternates: {
  canonical: 'https://rentorbuyworld.com',
  languages: {
    'x-default': 'https://rentorbuyworld.com',
    'en': 'https://rentorbuyworld.com',
    'de': 'https://rentorbuyworld.com?lang=de',
    // ...
  },
},

// NEW:
alternates: {
  canonical: `https://rentorbuyworld.com/${lang}/`,
  languages: {
    'x-default': 'https://rentorbuyworld.com/en/',
    'en': 'https://rentorbuyworld.com/en/',
    'fr': 'https://rentorbuyworld.com/fr/',
    'de': 'https://rentorbuyworld.com/de/',
    'es': 'https://rentorbuyworld.com/es/',
    'it': 'https://rentorbuyworld.com/it/',
    'nl': 'https://rentorbuyworld.com/nl/',
    'sv': 'https://rentorbuyworld.com/sv/',
    'pt': 'https://rentorbuyworld.com/pt/',
  },
},
```

Update `openGraph.url`:

```typescript
// OLD:
url: lang === 'en' ? 'https://rentorbuyworld.com' : `https://rentorbuyworld.com?lang=${lang}`,

// NEW:
url: `https://rentorbuyworld.com/${lang}/`,
```

3. **Update country quick-link hrefs:**

```typescript
// OLD:
href={`${lang !== 'en' ? `?lang=${lang}` : ''}#${countryCode.toLowerCase()}`}

// NEW:
href={`#${countryCode.toLowerCase()}`}
```

(Language is already in the URL path, no need to add `?lang=`)

4. **Add import for `resolveLanguage`:**

```typescript
import { resolveLanguage } from '@/lib/i18n';
```

5. **Remove the `validLanguages` const** (replaced by `resolveLanguage`).

6. **Remove the `searchParams` type and interface** — no longer needed.

- [ ] **Step 2: Delete the old `app/page.tsx`**

```bash
git rm app/page.tsx
```

- [ ] **Step 3: Verify TypeScript**

Run: `npm run type-check`

- [ ] **Step 4: Commit**

```bash
git add app/[lang]/page.tsx
git commit -m "feat: move home page to [lang]/page.tsx with path-based i18n"
```

---

## Task 4: Move City Calculator Page to `app/[lang]/[city]/buy-vs-rent/page.tsx`

**Files:**
- Create: `app/[lang]/[city]/buy-vs-rent/page.tsx` (adapted from `app/[city]/buy-vs-rent/page.tsx`)
- Create: `app/[lang]/[city]/buy-vs-rent/error.tsx` (copy from `app/[city]/buy-vs-rent/error.tsx`)
- Delete: `app/[city]/` directory

This is the most critical page. Key changes:
- `lang` from `params.lang` instead of `searchParams.lang`
- `generateStaticParams` returns `{ lang, city }` matrix (8 × 46 = 368 combos)
- Add `export const dynamic = 'error'` guardrail
- No `searchParams` usage on server side at all
- Metadata: path-based canonicals and hreflangs
- Related cities links use path prefix

- [ ] **Step 1: Create the new city page**

`app/[lang]/[city]/buy-vs-rent/page.tsx` — copy from existing and modify:

1. **Update the page props interface:**

```typescript
// OLD:
interface PageProps {
  params: Promise<{
    city: string;
  }>;
  searchParams: Promise<{
    lang?: string;
  }>;
}

// NEW:
interface PageProps {
  params: Promise<{
    lang: string;
    city: string;
  }>;
}
```

2. **Add dynamic guardrail at top of file:**

```typescript
export const dynamic = 'error';
```

3. **Update `generateStaticParams`** to produce the lang × city matrix:

```typescript
// OLD:
export async function generateStaticParams() {
  return citiesData.map((city) => ({
    city: city.slug,
  }));
}

// NEW:
import { SUPPORTED_LANGUAGES } from '@/lib/i18n';

export async function generateStaticParams() {
  return SUPPORTED_LANGUAGES.flatMap((lang) =>
    citiesData.map((city) => ({
      lang,
      city: city.slug,
    }))
  );
}
```

4. **Update `generateMetadata`:**

```typescript
// OLD:
export async function generateMetadata({ params, searchParams }: PageProps): Promise<Metadata> {
  const { city } = await params;
  const { lang } = await searchParams;
  // ...
  const isValidLang = !lang || validLanguages.includes(lang as typeof validLanguages[number]);
  const language = (isValidLang && lang ? lang : 'en') as typeof validLanguages[number];

// NEW:
import { resolveLanguage, SUPPORTED_LANGUAGES } from '@/lib/i18n';

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { city, lang: rawLang } = await params;
  const language = resolveLanguage(rawLang);
```

Remove the `robots: { index: false }` for invalid lang (middleware handles invalid langs now).

Replace the `alternates` block:

```typescript
// OLD:
alternates: {
  canonical: `${baseUrl}${canonicalPath}`,
  languages: {
    'x-default': `${baseUrl}${canonicalPath}`,
    'en': `${baseUrl}${canonicalPath}`,
    'de': `${baseUrl}${canonicalPath}?lang=de`,
    // ...
  },
},

// NEW:
alternates: {
  canonical: `${baseUrl}/${language}/${city}/buy-vs-rent`,
  languages: Object.fromEntries([
    ['x-default', `${baseUrl}/en/${city}/buy-vs-rent`],
    ...SUPPORTED_LANGUAGES.map((l) => [l, `${baseUrl}/${l}/${city}/buy-vs-rent`]),
  ]),
},
```

Update `openGraph.url`:

```typescript
url: `${baseUrl}/${language}/${city}/buy-vs-rent`,
```

5. **Update the page component:**

```typescript
// OLD:
export default async function CityBuyVsRentPage({ params, searchParams }: PageProps) {
  const { city } = await params;
  const { lang } = await searchParams;
  const language = (validLanguages.includes(lang as any) ? lang : 'en') as typeof validLanguages[number];

// NEW:
export default async function CityBuyVsRentPage({ params }: PageProps) {
  const { city, lang: rawLang } = await params;
  const language = resolveLanguage(rawLang);
```

6. **Update related cities links:**

```typescript
// OLD:
href={`/${relatedCity.slug}/buy-vs-rent${language !== 'en' ? `?lang=${language}` : ''}`}

// NEW:
href={`/${language}/${relatedCity.slug}/buy-vs-rent`}
```

7. **Remove `validLanguages` const** and the `searchParams` import/usage.

8. **Update `StructuredData` usage** — pass lang for URL construction:

```typescript
<StructuredData
  cityName={name}
  citySlug={city}
  countryCode={country_code}
  currencySymbol={cityData.currency_symbol}
  avgHomePrice={defaults.avg_home_price}
  avgRent={defaults.avg_rent}
  language={language}
/>
```

(No change needed here, but `StructuredData` will need updating in Task 9.)

- [ ] **Step 2: Copy error boundary**

```bash
cp app/[city]/buy-vs-rent/error.tsx app/[lang]/[city]/buy-vs-rent/error.tsx
```

- [ ] **Step 3: Delete old city directory**

```bash
git rm -r app/[city]/
```

- [ ] **Step 4: Verify TypeScript**

Run: `npm run type-check`

- [ ] **Step 5: Commit**

```bash
git add app/[lang]/[city]/ 
git commit -m "feat: move city pages to [lang]/[city] with 368-page static matrix"
```

---

## Task 5: Move Static Pages (`rankings`, `how-it-works`, `data-and-sources`, `privacy`, `calculator`)

**Files:**
- Create: `app/[lang]/rankings/page.tsx`
- Create: `app/[lang]/how-it-works/page.tsx`
- Create: `app/[lang]/data-and-sources/page.tsx`
- Create: `app/[lang]/privacy/page.tsx`
- Create: `app/[lang]/calculator/page.tsx`
- Delete: `app/rankings/`, `app/how-it-works/`, `app/data-and-sources/`, `app/privacy/`, `app/calculator/`

These pages currently don't use `searchParams` for lang (rankings, how-it-works, etc. have static metadata). The migration is simpler — just move them and ensure any internal links use the lang prefix.

- [ ] **Step 1: Move each static page**

For each page, copy to the new location. The pages that DON'T read `searchParams` (rankings, how-it-works, data-and-sources, privacy, calculator) just need:

1. Any internal `<Link href="/...">` updated to include lang prefix (if they have any)
2. Metadata updated if it contains canonical URLs

For `rankings/page.tsx` — update internal city links from `/${city.slug}/buy-vs-rent` to include lang:

```typescript
// The rankings page links to city pages. Update any such links:
// OLD:
href={`/${city.slug}/buy-vs-rent`}

// NEW (needs lang from params):
// Add params to the page component:
export default async function RankingsPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  // ... use lang in links:
  // href={`/${lang}/${city.slug}/buy-vs-rent`}
}
```

For `how-it-works`, `data-and-sources`, `privacy` — these are pure content pages. Just move them. If they have links to other pages, update with lang prefix.

For `calculator/page.tsx` — check if it links to city pages and update accordingly.

- [ ] **Step 2: Delete old directories**

```bash
git rm -r app/rankings/ app/how-it-works/ app/data-and-sources/ app/privacy/ app/calculator/
```

- [ ] **Step 3: Verify TypeScript**

Run: `npm run type-check`

- [ ] **Step 4: Commit**

```bash
git add app/[lang]/rankings/ app/[lang]/how-it-works/ app/[lang]/data-and-sources/ app/[lang]/privacy/ app/[lang]/calculator/
git commit -m "feat: move static pages under [lang]/ prefix"
```

---

## Task 6: Update Sitemap to Path-Based URLs

**Files:**
- Modify: `app/sitemap.ts`

- [ ] **Step 1: Rewrite sitemap.ts**

Replace the entire sitemap to use path-based URLs instead of `?lang=` params:

```typescript
import { MetadataRoute } from 'next';
import citiesData from '@/data/cities.json';
import { SUPPORTED_LANGUAGES } from '@/lib/i18n';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://rentorbuyworld.com';

  // 1. Static Pages (High Priority)
  const staticPages = SUPPORTED_LANGUAGES.flatMap((lang) => [
    {
      url: `${baseUrl}/${lang}/`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 1.0,
    },
    {
      url: `${baseUrl}/${lang}/rankings`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1.0,
    },
    {
      url: `${baseUrl}/${lang}/how-it-works`,
      lastModified: new Date('2026-02-08'),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/${lang}/data-and-sources`,
      lastModified: new Date('2026-02-08'),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/${lang}/privacy`,
      lastModified: new Date('2026-02-08'),
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    },
  ]);

  // 2. City Pages (Stratified Priorities)
  const cityPages = citiesData.flatMap((city, index) => {
    let priority: number;
    if (index < 50) priority = 0.8;
    else if (index < 200) priority = 0.6;
    else priority = 0.4;

    const lastModifiedDate = new Date(city.data_updated || '2024-12-01');

    return SUPPORTED_LANGUAGES.map((lang) => ({
      url: `${baseUrl}/${lang}/${city.slug}/buy-vs-rent`,
      lastModified: lastModifiedDate,
      changeFrequency: 'monthly' as const,
      priority,
    }));
  });

  return [...staticPages, ...cityPages];
}
```

- [ ] **Step 2: Verify no `?lang=` in output**

Run: `npm run build` and inspect the generated sitemap (or check the build output for sitemap entries).

- [ ] **Step 3: Commit**

```bash
git add app/sitemap.ts
git commit -m "feat: update sitemap to path-based i18n URLs"
```

---

## Task 7: Create Middleware for Redirects

**Files:**
- Create: `middleware.ts` (project root)

The middleware handles:
1. `/ -> /en/` (bare root redirect)
2. `/{city}/buy-vs-rent -> /en/{city}/buy-vs-rent` (legacy city paths without lang)
3. `/{city}/buy-vs-rent?lang=fr -> /fr/{city}/buy-vs-rent` (query-param migration)
4. `/?lang=de -> /de/` (home page query migration)
5. `/rankings?lang=es -> /es/rankings` (static page query migration)
6. All redirects are 308 (permanent, preserves method)
7. Non-lang query params (UTM, calculator params) are preserved

- [ ] **Step 1: Create middleware.ts**

```typescript
// middleware.ts
import { NextRequest, NextResponse } from 'next/server';
import { SUPPORTED_LANGUAGES, isValidLanguage, DEFAULT_LANGUAGE } from '@/lib/i18n';

// All known static page slugs (no lang prefix)
const STATIC_PAGES = new Set([
  'rankings',
  'how-it-works',
  'data-and-sources',
  'privacy',
  'calculator',
]);

export function middleware(request: NextRequest) {
  const { pathname, searchParams } = request.nextUrl;
  const langParam = searchParams.get('lang');

  // --- 1. Bare root: / -> /en/ ---
  if (pathname === '/') {
    if (langParam && isValidLanguage(langParam)) {
      // /?lang=fr -> /fr/
      const url = request.nextUrl.clone();
      url.pathname = `/${langParam}/`;
      url.searchParams.delete('lang');
      return NextResponse.redirect(url, 308);
    }
    const url = request.nextUrl.clone();
    url.pathname = `/${DEFAULT_LANGUAGE}/`;
    return NextResponse.redirect(url, 308);
  }

  // --- 2. Check if first segment is a valid language ---
  const segments = pathname.split('/').filter(Boolean);
  const firstSegment = segments[0];

  if (firstSegment && isValidLanguage(firstSegment)) {
    // Already has a valid lang prefix.
    // If there's still a ?lang= param, strip it (normalize).
    if (langParam) {
      const url = request.nextUrl.clone();
      url.searchParams.delete('lang');
      return NextResponse.redirect(url, 308);
    }
    // Valid lang prefix, no ?lang= — pass through.
    return NextResponse.next();
  }

  // --- 3. No valid lang prefix — this is a legacy URL ---
  // Determine target language from ?lang= or default to 'en'
  const targetLang = (langParam && isValidLanguage(langParam)) ? langParam : DEFAULT_LANGUAGE;

  // Check if this is a known static page: /rankings -> /{lang}/rankings
  if (STATIC_PAGES.has(firstSegment)) {
    const url = request.nextUrl.clone();
    url.pathname = `/${targetLang}${pathname}`;
    url.searchParams.delete('lang');
    return NextResponse.redirect(url, 308);
  }

  // Check if this looks like a city page: /{slug}/buy-vs-rent -> /{lang}/{slug}/buy-vs-rent
  if (segments.length >= 2 && segments[1] === 'buy-vs-rent') {
    const url = request.nextUrl.clone();
    url.pathname = `/${targetLang}${pathname}`;
    url.searchParams.delete('lang');
    return NextResponse.redirect(url, 308);
  }

  // For any other unrecognized path without lang prefix, prepend default language
  const url = request.nextUrl.clone();
  url.pathname = `/${targetLang}${pathname}`;
  if (langParam) url.searchParams.delete('lang');
  return NextResponse.redirect(url, 308);
}

export const config = {
  matcher: [
    // Match all paths except Next.js internals and static files
    '/((?!_next/static|_next/image|favicon.ico|icon.svg|apple-icon.png|manifest.webmanifest|og-image.png|images/|robots.txt|sitemap.xml).*)',
  ],
};
```

- [ ] **Step 2: Verify middleware handles key scenarios**

Start dev server: `npm run dev`

Test these URLs manually or via curl:
- `http://localhost:3000/` → should redirect to `/en/`
- `http://localhost:3000/?lang=fr` → should redirect to `/fr/`
- `http://localhost:3000/austin/buy-vs-rent` → should redirect to `/en/austin/buy-vs-rent`
- `http://localhost:3000/austin/buy-vs-rent?lang=de&price=500000` → should redirect to `/de/austin/buy-vs-rent?price=500000`
- `http://localhost:3000/rankings?lang=es` → should redirect to `/es/rankings`
- `http://localhost:3000/en/austin/buy-vs-rent` → should pass through (no redirect)
- `http://localhost:3000/en/austin/buy-vs-rent?lang=en` → should strip `?lang=en` and redirect

- [ ] **Step 3: Commit**

```bash
git add middleware.ts
git commit -m "feat: add middleware for legacy URL 308 redirects and ?lang= normalization"
```

---

## Task 8: Update Components — LanguageSelector, CityCard, Header

**Files:**
- Modify: `components/LanguageSelector.tsx`
- Modify: `components/CityCard.tsx`
- Modify: `components/Header.tsx`
- Modify: `components/Footer.tsx`

### 8a: LanguageSelector

Currently navigates by setting `?lang=` param. Must now navigate to `/{newLang}/...` path.

- [ ] **Step 1: Rewrite LanguageSelector**

```typescript
'use client';

import { usePathname, useRouter } from 'next/navigation';
import { SUPPORTED_LANGUAGES, type Language } from '@/lib/i18n';

interface LanguageOption {
  code: Language;
  label: string;
  flag: string;
}

const LANGUAGES: LanguageOption[] = [
  { code: 'en', label: 'English', flag: '🇺🇸' },
  { code: 'fr', label: 'Francais', flag: '🇫🇷' },
  { code: 'de', label: 'Deutsch', flag: '🇩🇪' },
  { code: 'es', label: 'Espanol', flag: '🇪🇸' },
  { code: 'it', label: 'Italiano', flag: '🇮🇹' },
  { code: 'nl', label: 'Nederlands', flag: '🇳🇱' },
  { code: 'sv', label: 'Svenska', flag: '🇸🇪' },
  { code: 'pt', label: 'Portugues', flag: '🇵🇹' },
];

export default function LanguageSelector() {
  const pathname = usePathname();
  const router = useRouter();

  // Extract current lang from path: /en/... -> 'en'
  const segments = pathname.split('/').filter(Boolean);
  const currentLang = (SUPPORTED_LANGUAGES.includes(segments[0] as Language) ? segments[0] : 'en') as Language;

  const handleLanguageChange = (newLang: Language) => {
    // Replace the lang segment in the current path
    const restOfPath = segments.slice(1).join('/');
    const newPath = `/${newLang}/${restOfPath}`;
    router.push(newPath);
  };

  return (
    <div className="relative inline-block">
      <select
        value={currentLang}
        onChange={(e) => handleLanguageChange(e.target.value as Language)}
        className="appearance-none bg-white border-2 border-gray-200 hover:border-blue-300 rounded-lg px-4 py-2 pr-10 text-sm font-medium text-gray-700 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent cursor-pointer transition-all"
        aria-label="Select language"
      >
        {LANGUAGES.map((lang) => (
          <option key={lang.code} value={lang.code}>
            {lang.flag} {lang.label}
          </option>
        ))}
      </select>
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
        <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
          <path
            fillRule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Commit LanguageSelector**

```bash
git add components/LanguageSelector.tsx
git commit -m "refactor: LanguageSelector uses path-based lang switching"
```

### 8b: CityCard

- [ ] **Step 3: Update CityCard link**

```typescript
// OLD (line 55):
href={`/${city.slug}/buy-vs-rent${language !== 'en' ? `?lang=${language}` : ''}`}

// NEW:
href={`/${language}/${city.slug}/buy-vs-rent`}
```

- [ ] **Step 4: Commit CityCard**

```bash
git add components/CityCard.tsx
git commit -m "refactor: CityCard links use path-based lang"
```

### 8c: Header

The Header needs to know the current language to prefix nav links. It currently has hardcoded hrefs like `/`, `/calculator`, `/how-it-works`, `/data-and-sources`.

- [ ] **Step 5: Update Header to accept `lang` prop**

Add `lang` prop to Header and prefix all nav links:

```typescript
// Add prop:
interface HeaderProps {
  lang?: string;
}

export default function Header({ lang = 'en' }: HeaderProps) {
  const navItems: NavigationItem[] = [
    { label: 'Home', href: `/${lang}/` },
    { label: 'Calculator', href: `/${lang}/calculator` },
    {
      label: 'Resources',
      href: '#',
      children: [
        { label: 'How It Works', href: `/${lang}/how-it-works` },
        { label: 'Data & Sources', href: `/${lang}/data-and-sources` },
      ],
    },
  ];
  // ... rest unchanged, but update the logo Link too:
  // <Link href={`/${lang}/`} ...>
```

- [ ] **Step 6: Update Footer links**

Check `Footer.tsx` for any internal links (to `/calculator`, `/how-it-works`, etc.) and add lang prefix. Footer receives `labels` — also add `lang` prop:

```typescript
interface FooterProps {
  labels: { /* ... existing ... */ };
  lang?: string;
}

export default function Footer({ labels, lang = 'en' }: FooterProps) {
  // Update all Link hrefs to use /${lang}/... prefix
```

Then update `app/[lang]/layout.tsx` to pass `lang` to Footer:

```typescript
<Footer labels={labels} lang={lang} />
```

- [ ] **Step 7: Commit Header and Footer**

```bash
git add components/Header.tsx components/Footer.tsx app/[lang]/layout.tsx
git commit -m "refactor: Header and Footer use lang-prefixed navigation links"
```

---

## Task 9: Update StructuredData and Calculator URL Sync

**Files:**
- Modify: `components/StructuredData.tsx`
- Modify: `components/calculator/Calculator.tsx`

### 9a: StructuredData

- [ ] **Step 1: Update StructuredData URL construction**

```typescript
// OLD (line 28):
const pageUrl = `${baseUrl}/${citySlug}/buy-vs-rent`;

// NEW:
const pageUrl = `${baseUrl}/${language}/${citySlug}/buy-vs-rent`;
```

- [ ] **Step 2: Commit**

```bash
git add components/StructuredData.tsx
git commit -m "fix: StructuredData URLs include lang prefix"
```

### 9b: Calculator URL Sync — Switch to `history.replaceState`

This is the most delicate change. Currently, `Calculator.tsx` uses `router.replace()` from `next/navigation` to sync calculator state to the URL. This triggers Next.js navigation and can cause server re-renders.

Switch to `history.replaceState()` which only updates the URL bar without any navigation.

- [ ] **Step 3: Remove `useRouter` import and usage in Calculator**

In `components/calculator/Calculator.tsx`:

1. Remove `useRouter` from the import:

```typescript
// OLD:
import { useSearchParams, usePathname, useRouter } from 'next/navigation';

// NEW:
import { useSearchParams, usePathname } from 'next/navigation';
```

2. Remove the `router` variable:

```typescript
// OLD (around line 76):
const router = useRouter();

// DELETE this line
```

3. Replace `router.replace()` with `history.replaceState()` in the URL sync effect (around line 389-393):

```typescript
// OLD:
const newUrl = params.toString() ? `${pathname}?${params.toString()}` : pathname;
isInternalUpdateRef.current = true;
router.replace(newUrl, { scroll: false });

// NEW:
const newUrl = params.toString() ? `${pathname}?${params.toString()}` : pathname;
isInternalUpdateRef.current = true;
window.history.replaceState(null, '', newUrl);
```

4. Remove `router` from the effect's dependency array:

```typescript
// OLD:
}, [debouncedUrlState, pathname, router, defaultHomePrice, defaultMonthlyRent, defaultInputs, searchParams]);

// NEW:
}, [debouncedUrlState, pathname, defaultHomePrice, defaultMonthlyRent, defaultInputs, searchParams]);
```

5. The URL sync effect currently clones `searchParams` to preserve `lang`. Since `lang` is no longer in searchParams (it's in the path), we should strip the `lang`-preserving logic. Actually, `searchParams` won't have `lang` anymore after migration, so the existing clone logic works fine — it just won't find `lang` to preserve, which is correct.

- [ ] **Step 4: Remove `language` prop's URL interaction**

The Calculator receives `language` as a prop but doesn't need to write it to the URL anymore. Verify there's no code that sets `lang` in searchParams. The `language` prop is only used for label lookups, which stays the same.

- [ ] **Step 5: Verify calculator state sync still works**

Run: `npm run dev`
Navigate to `/en/austin/buy-vs-rent`
1. Change a slider value
2. Check URL bar updates with calculator params (after 800ms debounce)
3. Check that changing language via LanguageSelector navigates to `/fr/austin/buy-vs-rent` and preserves no stale `?lang=` param
4. Check browser Back/Forward still works (re-hydration from URL)

- [ ] **Step 6: Commit**

```bash
git add components/calculator/Calculator.tsx
git commit -m "refactor: Calculator uses history.replaceState for client-only URL sync"
```

---

## Task 10: Build Verification

- [ ] **Step 1: Run full type check**

```bash
npm run type-check
```

Expected: Zero errors

- [ ] **Step 2: Run lint**

```bash
npm run lint
```

Expected: Zero errors (or only pre-existing warnings)

- [ ] **Step 3: Run production build**

```bash
npm run build
```

Expected output should show:
- Static pages generated for the lang × city matrix
- Look for `/(lang)/(city)/buy-vs-rent` in the route list
- Total static pages should be ~400+ (368 city + 40 static page variants + sitemap)
- NO routes showing as `λ` (dynamic/server) — all should be `○` (static) or `●` (SSG)

- [ ] **Step 4: Verify no `?lang=` in build output**

```bash
# After build, check the generated sitemap:
cat .next/server/app/sitemap.xml/route.js 2>/dev/null || echo "check sitemap output"
# Or start production server and fetch sitemap:
# curl http://localhost:3000/sitemap.xml | grep "lang="
```

Expected: Zero occurrences of `?lang=` in sitemap URLs.

- [ ] **Step 5: Verify `dynamic = 'error'` is enforced**

The build in Step 3 would have FAILED if any city route tried dynamic rendering. If the build succeeded, this is verified.

- [ ] **Step 6: Spot-check generated HTML**

```bash
# Start production server:
npx next start

# Check a city page has correct canonical:
curl -s http://localhost:3000/en/austin/buy-vs-rent | grep -o 'rel="canonical"[^>]*>'
# Expected: href="https://rentorbuyworld.com/en/austin/buy-vs-rent"

# Check hreflang cluster:
curl -s http://localhost:3000/fr/paris/buy-vs-rent | grep 'hreflang'
# Expected: 8 hreflang tags + x-default, all path-based
```

- [ ] **Step 7: Commit any final fixes and tag**

```bash
git add -A
git commit -m "build: verify i18n path routing - 368+ static pages generated"
```

---

## Task 11: Clean Up Stale Files

- [ ] **Step 1: Remove old route directories**

After verifying the build works, ensure all old routes are deleted:

```bash
# These should already be git rm'd in earlier tasks, but verify:
ls app/page.tsx 2>/dev/null && echo "STALE: app/page.tsx still exists"
ls app/[city]/ 2>/dev/null && echo "STALE: app/[city]/ still exists"
ls app/rankings/ 2>/dev/null && echo "STALE: app/rankings/ still exists"
ls app/how-it-works/ 2>/dev/null && echo "STALE: app/how-it-works/ still exists"
ls app/data-and-sources/ 2>/dev/null && echo "STALE: app/data-and-sources/ still exists"
ls app/privacy/ 2>/dev/null && echo "STALE: app/privacy/ still exists"
ls app/calculator/ 2>/dev/null && echo "STALE: app/calculator/ still exists"
```

- [ ] **Step 2: Remove unused exports from `components/LanguageSelector.tsx`**

The old `Language` type export from `LanguageSelector.tsx` may be imported elsewhere. Search for it:

```bash
grep -r "from.*LanguageSelector" --include="*.tsx" --include="*.ts"
```

If any file imports `Language` from LanguageSelector, update it to import from `@/lib/i18n` instead.

- [ ] **Step 3: Final commit**

```bash
git add -A
git commit -m "chore: clean up stale pre-migration files"
```

---

## Acceptance Criteria Verification

After all tasks complete, verify against the approved acceptance criteria:

| Criterion | How to verify |
|-----------|--------------|
| No `?lang=` URLs in internal links | `grep -r "?lang=" app/ components/ --include="*.tsx"` should return 0 results (except middleware redirect logic) |
| No `?lang=` in sitemap | `curl localhost:3000/sitemap.xml \| grep "lang="` returns 0 results |
| No `?lang=` in canonicals or hreflang | Inspect HTML of any city page — all alternates use path-based URLs |
| Every localized URL is self-canonical | `/fr/paris/buy-vs-rent` has `canonical` = `https://rentorbuyworld.com/fr/paris/buy-vs-rent` |
| Invalid language segment returns 404 | `/xx/austin/buy-vs-rent` should 404 (no `generateStaticParams` match) |
| Legacy URLs 308 to new paths | `curl -I localhost:3000/austin/buy-vs-rent?lang=de` shows `308` + `Location: /de/austin/buy-vs-rent` |
| Non-lang query params preserved | `curl -I "localhost:3000/austin/buy-vs-rent?lang=de&price=500000"` shows `Location: /de/austin/buy-vs-rent?price=500000` |
| Static generation confirmed | Build output shows all city routes as `○` or `●` (not `λ`) |
| `dynamic = 'error'` guardrail active | Build would fail if any city route tries dynamic rendering |
