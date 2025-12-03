# SPECIFICATION: BUSINESS LOGIC & USER FLOW

## 1. Core Concept
A financial calculator that determines the "Break Even Year" where buying a home becomes cheaper than renting.

## 2. The Algorithm (The Advanced Engine)
You must create a utility file (`lib/finance.ts`) handling these GRANULAR inputs.

**A. Purchase Inputs:**
* **Home Price** (Default: Local City Data)
* **Down Payment %** (User adjustable, default 20%)
* **Interest Rate** (User adjustable, default 6.5%)
* **Loan Term** (15/30 years)
* **Buying Closing Costs** (Default: 3% or Country Specific)
* **Property Tax Rate** (Default: City Data)
* **Home Maintenance** (Default: 1% annually)

**B. Rental Inputs:**
* **Monthly Rent** (Default: Local City Data)
* **Security Deposit** (Default: 1 month rent)
* **Broker Fee** (Default: 0 or 1 month rent - common in NYC/Germany)
* **Rent Inflation** (Default: 3%)

**C. Financial Inputs:**
* **Investment Return Rate** (Opportunity cost calculation, default 5%)
* **Marginal Tax Rate** (For mortgage interest deduction)

**Output Required:**
* Total Net Worth (Renter) vs Total Net Worth (Buyer) over time.
* **The "Crossover Point":** The exact year/month where Buyer Net Worth > Renter Net Worth.

## 3. Data Strategy (Programmatic)
You will use a JSON Source File (`data/cities.json`) to pre-fill the calculator.
* **Scale:** The app must be able to handle 500+ cities using this same logic.

## 4. Internationalization (i18n) & Country Logic
The Calculator must detect the selected Country and swap the **Default Assumptions**:

**Scenario A: USA 🇺🇸**
* **Closing Costs:** 3% (Buyer pays).
* **Agent Fees:** 0% (Seller pays typically).
* **Key Tax:** "Property Tax" (State dependent, avg 1.1%).

**Scenario B: France 🇫🇷**
* **Closing Costs:** LABEL: "Frais de Notaire". (Logic: ~7.5% for old build).
* **Key Tax:** LABEL: "Taxe Foncière".

**Scenario C: Germany 🇩🇪**
* **Closing Costs:** LABEL: "Kaufnebenkosten". (Logic: Notary + Transfer Tax + Agent = ~12%).
* **Impact:** Drastically increases the time to break even.

**Scenario D: UK 🇬🇧**
* **Closing Costs:** LABEL: "Stamp Duty" (SDLT).
* **Key Tax:** LABEL: "Council Tax".

## 5. Dynamic FAQ Logic (Programmatic SEO)
Below the calculator, generate an FAQ section that answers questions using the calculated data:
* **Q: "Is it better to buy or rent in [City]?"** (Logic: Based on BreakEvenYear < 5).
* **Q: "How much down payment do I need in [City]?"** (Logic: 20% of Avg Price).