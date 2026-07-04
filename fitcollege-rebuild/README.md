# FIT College — Full Site Rebuild (North-Star Prototype)
**RTO 31903 · July 2026 · Prototype for Kook CMS implementation**

## What this is
A complete, navigable rebuild of fitcollege.edu.au — 40 pages generated
from shared templates and one design system, built to be implemented on
Kook's existing CMS. No frameworks, no build step: semantic HTML,
one stylesheet (`css/site.css`), one tiny vanilla JS file (`js/site.js`).

Start at **index.html** (internal review hub) or **home.html** (the site).

## Structure
- `home.html` — homepage (single-thesis hero, pathways, funding strip, proof grid, campus network, intakes)
- `courses.html` + 11 course pages — one template, instantiated per course
- `locations.html` + 20 campus pages — one template per campus, LocalBusiness schema stubs
- `funding.html` — Career Start acquisition lander with working 60-second eligibility checker
- `study-online.html` — consolidates the current 5-page Study Online cluster (301s required)
- `faqs.html`, `about.html` (consolidates About/RPL/USI), `contact.html`, `course-calendar.html`

## Rules baked in sitewide
1. **CTA hierarchy:** "Chat with a Career Advisor" primary everywhere; info pack secondary.
2. **Verifiable specifics only** — superlatives removed per the 2026 growth strategy.
3. **No dollar pricing** except regulated Career Start co-contribution figures on funding.html.
4. **Header renders once** (fixes duplicated nav block); no tracking pixels in <head>.
5. **Pinch-zoom enabled** on every page (fixes accessibility defect).
6. **Valid OG tags** on every page (fixes the malformed FIT Elite share image).
7. Schema: Organization sitewide; Course + FAQPage on course pages; FAQPage on funding/faqs; LocalBusiness on campus pages.

## Before anything publishes
- Everything marked **[CONFIRM]** needs verification: campus NAP details
  (feed from the GBP audit workbook NAP Master tab), course durations,
  per-campus course lists, intake dates, CEC pack size (report says 30,
  live site says "up to 50"), CRICOS/international status.
- Career Start figures are current as at July 2026 — re-verify against
  the official QLD Government source at build time.
- The guaranteed-interview commitment is NOT included anywhere —
  pending capacity stress-test and CEO sign-off.
- Eligibility checker answers must map to HubSpot properties (see
  comments in funding.html); enquiries trigger the FITCollege SMS
  speed-to-lead automation.
- 301 map required: old funding URL → funding.html; retired Study
  Online cluster → study-online.html; About/RPL/USI → about.html.
- Nothing goes live without Stanley's sign-off.

## Running the demo locally
No build step. Either open `index.html` directly, or serve it:
```
python3 -m http.server 8000
# then open http://localhost:8000
```

## Deploying to GitHub Pages
1. Push to a repo (see below). **Keep the repo private** — this is an
   internal working demo of an unapproved rebuild.
2. Repo **Settings → Pages → Source: GitHub Actions**. The included
   workflow (`.github/workflows/pages.yml`) deploys on every push to main.
   Note: Pages on a **private** repo requires a paid GitHub plan; on a
   free plan the published site is public even if the repo is private —
   the `noindex, nofollow` tag on every page is the safety net either way.
3. `index.html` (the review hub) is the Pages landing page; `home.html`
   is the site entry.

## Demo-only flags to remove at production
- `<meta name="robots" content="noindex, nofollow">` on every page
- `.img-slot` placeholder blocks (replaced by Damian's photography)
- All visible `[CONFIRM]` chips once content is verified
