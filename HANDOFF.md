# Developer Hand-off — FIT College Website Rebuild

This document is for the web developer taking the rebuild to production. It
covers how the site is built, where the content lives, the patterns you need
to know, and — most importantly — the **prioritised list of what's still
stubbed** and must be wired up before launch.

---

## 1. Stack & why

| Layer | Choice | Notes |
| --- | --- | --- |
| Framework | Next.js 15 (App Router) | File-based routing under `app/` |
| UI | React 19 | Mostly server components; two client components (see §5) |
| Styling | Tailwind CSS 4 | Config-less; theme tokens live in `app/globals.css` under `@theme` |
| Language | TypeScript (strict) | |
| Fonts | `next/font/google` | Poppins + Archivo (Archivo is a stand-in — see §4) |
| Hosting target | Either static export **or** Node server | See §6 |

**Design principle:** the site is intentionally low-JS. Almost everything is
static HTML rendered at build time. Interactivity that would normally need
JavaScript (mobile menu, dropdowns, the campus filter, accordions) is done
with **CSS only** so the site works as a pure static export (§5). Only the
lead-capture modal ships React to the browser.

### Run it

```bash
npm install
npm run dev          # http://localhost:3000 — the working demo
npm run build        # server build
STATIC_EXPORT=1 npm run build   # static HTML → ./out
```

Requires Node 20+ (developed on Node 22, npm 10).

---

## 2. Repo map

```
app/
  layout.tsx          Root layout: fonts, <SiteHeader>, <SiteFooter>, metadata
  globals.css         Brand tokens (@theme), all custom CSS + CSS-only interactivity
  page.tsx            Home
  courses/
    page.tsx                                    Courses index
    [slug]/page.tsx                             Cert III / Cert IV (from data/courses.ts)
    complete-pt/page.tsx                        Cert III + IV package
    international-fitness-student-pathway/page.tsx   CRICOS / student-visa
  fit-elite/page.tsx  FIT Elite™
  study-online/page.tsx
  locations/
    page.tsx          Campus finder (state filter)
    [slug]/page.tsx   One page per campus (20)
  funding/page.tsx    QLD Career Start
  faqs/page.tsx       FAQs + FAQPage JSON-LD
  contact/page.tsx    Contact (form has NO backend yet)

components/
  SiteHeader.tsx      Nav, Courses dropdown, mobile hamburger, tap-to-call
  SiteFooter.tsx
  AustraliaMap.tsx    SVG map, clickable states → /locations#<state>
  LocationCard.tsx    (client) hover reveals a zoomed campus map over the tile
  LeadCta.tsx         (client) lead-capture button + modal + advisor routing
  ReviewsMarquee.tsx  Side-scrolling reviews
  UspMarquee.tsx      Side-scrolling USP banner

data/                 ← ALL CONTENT LIVES HERE (see §3)
  locations.ts  courses.ts  intakes.ts  reviews.ts  faqs.ts
  statePaths.ts advisors.ts
```

---

## 3. The data model — edit content here, not JSX

Pages are generated from typed data files. To change copy or add records you
edit `data/*.ts`; the pages re-render automatically.

| File | Owns | Notes for editing |
| --- | --- | --- |
| `locations.ts` | 20 campuses | Each entry's `slug` is its URL (`/locations/<slug>`). Fields: name, venue, address, suburb, state, postcode, phone, lat/lng. Also exports `PHONE`, `HEAD_OFFICE`, `STATE_NAMES`, `locationsByState()`. |
| `courses.ts` | Cert III, Cert IV, Complete PT, International, FIT Elite, the 10 USP proof-points | `COURSES` drives `/courses/[slug]`. `getCourse(slug)` for detail. Also `COMPLETE_PT`, `INTERNATIONAL`, `FIT_ELITE`, `PROOF_POINTS`, `DELIVERY_MODES`. |
| `intakes.ts` | Feb/May/Sep intake model + the September timetable | `NEXT_INTAKE`, `INTAKE_MONTHS`, `TIMETABLE` (4 rows). Update `NEXT_INTAKE` as intakes roll over. |
| `reviews.ts` | 10 reviews for the marquee | ⚠️ **PLACEHOLDER** — see §7. |
| `faqs.ts` | 4 FAQ groups / 13 Q&As | Also feeds the FAQPage JSON-LD on `/faqs`. |
| `advisors.ts` | 9 sales advisors + postcode routing | See §5 (lead capture). |
| `statePaths.ts` | Generated SVG path per state | Machine-generated from GeoJSON; don't hand-edit. |

---

## 4. Brand & fonts

Tokens are in `app/globals.css`:

- `--color-brand` Core Black `#181818`
- `--color-accent` Energy Red `#CE2829` (`--color-accent-dark` `#a81f20`)
- `--color-academy` Academy Blue `#21428d`

Accessibility rule already applied throughout: **no red text on black** — red
is used for fills/buttons, not body text, to keep AA contrast.

**Font swap before launch:** the brand font is the licensed **Halyard
Display**. We can't ship that webfont, so `Archivo` (Google Fonts) stands in
via `next/font/google` in `app/layout.tsx`. When you have the licensed files,
swap Archivo for a `next/font/local` Halyard Display — it's a ~5-line change
in `layout.tsx`; the `.font-display` utility and everything downstream stays
the same.

---

## 5. Patterns you need to know

### CSS-only interactivity (no JS)
So the site can be a static export, these use pure CSS — if you change the
markup, keep the mechanism intact:

- **Mobile hamburger** — hidden checkbox `#nav-toggle` + peer/sibling
  selectors in `globals.css` (including the explicit icon-swap rules).
- **Courses dropdown** — `group-hover` / `focus-within`.
- **Campus finder filter** — `:target` + `:has()`. Clicking a state pill
  navigates to `#<state>` and CSS hides the non-matching campuses;
  `#all-campuses` resets. (`.finder:has(section:target) …`)
- **FAQ accordions** — native `<details>`.

### Lead capture (`components/LeadCta.tsx`) — the important one
Every "Chat with a Career Advisor" CTA across the site is a
`<LeadCta source="…">`. The flow:

1. Modal captures **Name, Phone, Email, postcode, Australian citizenship**.
2. On submit it calls `saveLead()` then `advisorForPostcode(postcode)` from
   `data/advisors.ts`, and shows the matched advisor's name/phone/email and a
   **"Book a time with {firstName}"** button (their HubSpot meeting link).
3. International citizenship also surfaces the CRICOS pathway.

**What's real vs stubbed here:**

- ⚠️ `saveLead()` currently writes to **`localStorage` + `console.info`
  only**. Leads are NOT reaching a CRM. The `TODO` at the top of the function
  marks where the HubSpot Forms API call goes (needs portal ID + form GUID).
- ⚠️ `POSTCODE_CLUSTERS` in `advisors.ts` is **empty**, so
  `advisorForPostcode()` returns the fallback (**Dean Eggins**) for *every*
  postcode. Fill the clusters to activate territory routing.
- ⚠️ **Marcus Krause's** `meetingLink` is a broken Teams safelinks URL
  (flagged with a `NOTE` in `advisors.ts`). His territory can't go live until
  it's replaced with his real HubSpot link.

---

## 6. Build & deploy

Two supported targets from one codebase (`next.config.ts` switches on
`STATIC_EXPORT`):

| | Command | Use when |
| --- | --- | --- |
| **Static** | `STATIC_EXPORT=1 npm run build` → `./out` | Cheapest hosting (S3/Netlify/Nginx). No server. Forms need an external endpoint (HubSpot Forms API is a browser POST, so this is fine once wired). |
| **Server** | `npm run build` + `npm start` | If you add Next API routes / server-side form handling later. |

The static export is what the demo/preview uses. Nothing in the current
feature set *requires* a Node server — the HubSpot Forms API is a client-side
POST — so static hosting is viable for launch if you prefer.

---

## 7. Pre-launch checklist (prioritised)

**Blockers — must do before public launch:**

1. **Real reviews.** `data/reviews.ts` holds 10 clearly-marked *placeholder*
   testimonials (persona-voiced composites). Do **not** launch invented
   testimonials — swap for real recent 5★ Trustpilot reviews. Layout stays.
2. **HubSpot Forms API.** Wire `saveLead()` in `LeadCta.tsx` to HubSpot
   (portal ID + form GUID) so leads reach the CRM. Currently localStorage-only.
3. **Postcode clusters.** Fill `POSTCODE_CLUSTERS` in `advisors.ts` so leads
   route to the right advisor instead of all falling back to Dean Eggins.
4. **Marcus Krause's meeting link.** Replace the broken Teams safelinks URL.
5. **Contact form backend.** `app/contact/page.tsx` posts nowhere.

**Should do:**

6. **Halyard Display webfont** swap in `layout.tsx` (§4).
7. **Redirects from the old URLs.** The previous site had a very different URL
   structure — see [SITEMAP.md](./SITEMAP.md) for the full old→new redirect
   map you'll need at the CDN/host level for SEO.
8. **Photography / imagery.** The rebuild currently ships no campus/course
   photos — it's type- and colour-led. Add real imagery.
9. **Campus "why study here" copy** is a shared template, not per-campus.

**Deferred (business sign-off):**

10. Any "guaranteed interview" promise (flagged in the strategy docs — needs
    CEO sign-off before it goes on the site).

---

## 8. Content parked / deliberately left out

- Old-site campuses **Prahran** and a **Fiji** campus appeared in source
  material but aren't in `locations.ts` — confirm with the business whether
  they're current before adding.
- Many old-site URLs were one-off promo/affiliate landing pages
  (`/Christmaspromo`, `/Contact/…AffiliatePage-…`, etc.) — intentionally not
  rebuilt. See SITEMAP.md.
