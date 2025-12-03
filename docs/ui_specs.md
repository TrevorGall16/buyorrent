# SPECIFICATION: UI/UX & AD PLACEMENT

## 1. Visual Style
* **Theme:** "Trustworthy Fintech." Clean whites, soft grays, deep greens for "Money Saved."
* **Typography:** Sans-serif (Inter or Geist). High legibility.

## 2. Input Strategy: "Quick" vs "Advanced" Mode
To avoid overwhelming the user, use a Progressive Disclosure UI:

**A. "Quick View" (Default State):**
* **Goal:** Instant gratification.
* **Visible Inputs:**
    1.  **Target City** (Dropdown with Search).
    2.  **Home Price** (Slider + Input).
    3.  **Monthly Rent** (Slider + Input).
* **Behavior:** The graph updates instantly as these change.

**B. "Advanced Settings" (Accordion/Toggle):**
* **Trigger:** A button labeled "Advanced Settings" or "Fine-tune assumptions."
* **Hidden Inputs:** Down Payment, Interest Rate, Taxes, Maintenance, Security Deposit, Broker Fees.

## 3. Component: The Results Area
* **The "Data Trust" Badge:** Top right of the calculator must say: *"Market Data for [City] • Updated [Month/Year]"*
* **The Graph:** Dual Line Chart (Recharts).
    * Line A (Red): Renter Net Worth.
    * Line B (Green): Owner Net Worth.
* **The "Detailed Breakdown" Table:**
    * Below the chart, show a comparison table with these rows:
        * *Upfront Costs:* (Down payment + Closing Fees vs. Deposit + Broker Fee)
        * *Monthly Costs:* (Mortgage + Tax + Maint vs. Rent)
        * *Opportunity Cost:* (Money lost by tying up cash)
        * *Net Proceeds at Year X:* (Sale price - Mortgage balance - Selling fees)

## 4. ⚠️ AD REVENUE & CLS PROTECTION (STRICT)
**The Golden Rule:** The layout must NEVER shift when an ad loads.

### Ad Slots:
1.  **Sidebar (Desktop):**
    * Location: Right column, sticky.
    * CSS: `width: 300px; min-height: 600px; background: #f9f9f9;`
2.  **In-Content (Mobile):**
    * Location: Between "Input Section" and "Chart Section."
    * CSS: `width: 100%; height: 250px; background: #f9f9f9;`
3.  **Footer (Global):**
    * Location: Fixed bottom overlay (optional).
    * CSS: `height: 50px; position: fixed; bottom: 0;`

**Lazy Loading:** Set `loading="lazy"` on all ad scripts.