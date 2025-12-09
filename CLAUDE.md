# CLAUDE.md

## 1. Project Context
* **Goal:** Build a Rent vs. Buy Calculator (Programmatic SEO).
* **Stack:** Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS, Recharts.
* **Core Philosophy:** "Speed is Trust." INP < 100ms. Zero CLS.

## 2. Commands & Workflow
* **Dev:** `npm run dev`
* **Build:** `npm run build` (Generates 46 SSG pages)
* **Lint:** `npm run lint`
* **Validation:** `npx tsx lib/validate-cities.ts` (Run before commit)

## 3. Coding Standards (Shadcn/UI)
* **Components:** Use `components/ui` primitives (Radix-based). Do not invent new buttons.
* **Styling:** Use `cn()` for class merging.
* **State:** Prefer URL Search Params (`?homePrice=...`) over global state for shareability.
* **Internationalization:** NEVER hardcode currency symbols ($). Use `currency_symbol` from props.

## 4. Visual Standards (Anti-AI Look)
* **Depth:** Cards need `border-slate-200/60` + `shadow-sm` + `backdrop-blur`.
* **Typography:** Headings `tracking-tight` & `font-semibold`.
* **Colors:** Text is `slate-900` (not black). Background is `slate-50` radial gradient.
* **Interaction:** All interactive elements must have `transition-all duration-200`.

## 5. Ad Implementation Rules (Strict)
* **CLS Protection:** All ad containers MUST have `min-height` defined in CSS.
* **Strategy:** `afterInteractive` loading.
* **Placement:** Sidebar (Desktop), Between Inputs/Chart (Mobile).

## 6. Power User Prompts
* **Planning:** If a task involves >2 files, run `/plan` first.
* **Complex Math:** Use `think hard` when modifying `lib/finance.ts` logic.
* **Debugging:** Check `lib/country-config.ts` if calculations look wrong for a specific country.