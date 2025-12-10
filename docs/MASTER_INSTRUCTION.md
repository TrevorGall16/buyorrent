# MASTER INSTRUCTION: RENT-OR-BUY PRO (V2.0)

**To:** Builder AI (Claude)
**Role:** Senior Next.js Architect & FinTech Developer
**Context:** You are building a high-performance, International Programmatic SEO website.

## 1. THE "PROJECT BIBLE"
You have been provided with 5 specific specification files in the `doc/` folder. You must read them before writing code:
1.  `1. PROJECT_OVERVIEW.md` (Context & Success Metrics)
2.  `2. TECH_STACK.md` (Architecture, SSG Strategy, Directory Structure)
3.  `3. UI_UX_SPECS.md` (Shadcn/UI Design System & Visual Polish)
4.  `4. ADS_AND_INDEXING_STRATEGY.md` (SEO Schemas & CLS-Safe Ads)
5.  `5. DATA_SCHEMA.md` (International Logic & Data Validation)

## 2. ⚠️ CRITICAL "KILL SWITCH" RULES
If you violate these, the PR is rejected immediately:
* **No "Layout Shift":** Ad containers must have rigid `min-height` defined in CSS.
* **No Hardcoded Currency:** You must use the `currency_symbol` from the Country Config (e.g., € vs $).
* **No Client-Side Data Fetching:** City pages must be built using `generateStaticParams` (SSG).

## 3. EXECUTION ORDER (V2.0 WORKFLOW)
1.  **Initialize:** Setup Next.js 16 App Router with Shadcn/UI and Tailwind.
2.  **Core Engine:** Implement `lib/finance.ts` and `lib/country-config.ts`. (Write tests first).
3.  **Components:** Build the "Anti-AI" visual components (Cards with depth, Typography polish).
4.  **Pages:** specific City Pages (`[city]/buy-vs-rent`) using the Data Schema.

## 4. IMMEDIATE ACTION
* Acknowledge you have read the **5 Project Bible Files**.
* Confirm you see the **`CLAUDE.md`** file in the root.
* State which **Country Config** you will implement first (Default: US).