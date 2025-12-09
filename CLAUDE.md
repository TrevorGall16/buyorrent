## 1. Project Context
* **Goal:** Build a Rent vs. Buy Calculator (International Programmatic SEO).
* **Stack:** Next.js 16 (App Router), React 19, TypeScript 5.6, Tailwind CSS 3.4.
* **Core Philosophy:** "Speed is Trust." INP < 100ms. Zero CLS. **Pure Tailwind (No UI Libs).**

## 2. Tech Stack & Constraints
```json
{
  "next": "^16.0.7",
  "react": "^19.2.1",
  "typescript": "^5.6.0",
  "tailwindcss": "^3.4.0",
  "recharts": "^2.15.4"
}

UI Framework: NONE. Do NOT use Shadcn, Radix, Material UI, or Mantine.

    Components: Build custom, lightweight components in components/ui/ (e.g., Button.tsx, Slider.tsx) using utility classes.

    State: URL Search Params (?homePrice=...) is the Source of Truth for calculator state.

3. Commands

    Dev: npm run dev

    Build: npm run build (Generates 51 SSG pages)

    Lint: npm run lint

    Type Check: npm run type-check (Run before every commit)

    Validate: npx tsx lib/validate-cities.ts

4. Coding Standards

    Structure:

        app/[city]/buy-vs-rent/ -> The SEO Engine (Server Component).

        components/calculator/ -> The Logic (Client Component).

        lib/finance.ts -> The Math (Pure Functions).

    Internationalization:

        NEVER hardcode currency symbols ($). Use city.currency_symbol.

        All UI text must use the labels object from lib/country-config.ts.

    Imports: Use absolute imports: import { cn } from '@/lib/utils'.

5. Visual Standards (The "Anti-AI" Look)

CRITICAL: Avoid the "Default Bootstrap" look. Apply these polish rules to your Custom Components:

    Depth: All cards must have a 1px top highlight to simulate light.

        Tailwind: border border-slate-200/60 shadow-sm border-t-white/60

    Typography:

        Headings: tracking-tight + text-slate-900.

        Labels: text-sm font-medium text-slate-600.

    Motion: Interactive elements must feel alive.

        Rule: active:scale-95 transition-all duration-200 hover:shadow-md.

    Colors: Never use pure black (#000). Use slate-900 or zinc-900.

6. Ad Implementation (Strict)

    CLS Rule: All ad containers MUST have a min-height defined in Tailwind (e.g., min-h-[250px]).

    Placement:

        Desktop: Sidebar (Sticky).

        Mobile: Between Input Section and Chart.

    Loading: Use next/script with strategy="afterInteractive".

7. Power User Prompts (Architecture)

    Planning: If a task involves >2 files, run /plan first.

    Complex Math: Use think hard when modifying lib/finance.ts.

    Git Context: When debugging, check git history (git log -p filename) to understand past changes.

    Optimization: Use "Batching" -> Implement Header, Footer, and Layout in ONE response.

8. Critical Files (Read-Only)

    lib/finance.ts (Core Math - Do not touch without specific instruction)

    data/cities.json (Source of Truth for SSG)

    doc/MASTER_INSTRUCTION.md (Workflow Rules)