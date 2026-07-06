# Old Site Audit — Unindexed / Long-Tail Pages + Project To-Dos

**Site:** fitcollege.edu.au (RTO 31903) · **Against:** 40-page north-star rebuild · **Date:** July 2026

---

## How to read this

The rebuild consolidates fitcollege.edu.au down to **40 canonical pages**. The
live site is a legacy Kook CMS carrying **~95 declared URLs (sitemap)** *plus*
dozens of **orphaned URLs that are live and indexed but absent from the
sitemap** (seasonal promos, affiliate pages, duplicate URL structures, a
separate blog subdomain, and PDFs). Those long-tail pages are exactly what
needs an **implement / retire / redirect** decision — this document lists them.

### Method & honest caveat
- **Inventory** = the live `sitemap.xml` (95 URLs) + every URL surfaced through
  `site:fitcollege.edu.au` index probing + cross-reference against the rebuild's
  40 pages.
- **Index status** below is marked `indexed✓` where the URL was confirmed
  present in Google's index during this audit. Anything not confirmed is marked
  `verify (GSC)` — **the definitive "unindexed / Crawled-currently-not-indexed /
  Excluded" list can only come from Google Search Console**, which this audit
  cannot access. Treat the GSC "Pages → Not indexed" report as the source of
  truth and reconcile it against the tables below.
- `robots.txt` declares **no sitemap** and only disallows `/adm/`, `/Members/`,
  `/imagedetail.aspx`, `/cdn-cgi/`. So orphan pages are not being blocked — they
  are simply thin/expired/duplicate, which is why Google drops many of them.

### Decision key
| Tag | Meaning |
|---|---|
| **MIGRATE** | Core page — already rebuilt; move content across, then 301 the old URL |
| **301** | Duplicate or retired URL — redirect to the canonical rebuild page |
| **RETIRE** | Expired/thin campaign page — 301 to nearest relevant page or 410 |
| **IMPLEMENT?** | Real content with no rebuild equivalent — decide build-vs-retire |
| **REVIEW** | Business call needed (affiliate/partner/pathway strategy) |
| **NOINDEX** | Utility/form/internal — keep working but keep out of the index |

---

## Decisions locked (Stanley, July 2026)

| Question | Decision |
|---|---|
| **Courses to implement** | **Cert III in Travel (SIT30222)** and **TAE40116→TAE40122 upgrade** — both built (`course-cert-iii-travel.html`, `course-tae-upgrade.html`) and added to `courses.html` |
| **Courses to retire** | **Cert IV in Weight Management** and **fitness-professional** → 301 to `courses.html` |
| **Affiliate/partner pages** | Keep **only** the Staff referral form (`/staffleadform`) and **Affiliatedeal**; retire all other partner/affiliate pages |
| **Blog** | **Keep** — link out to the HubSpot-hosted `blog.fitcollege.edu.au` (footer link added sitewide) |
| **Retired campuses** | **Prahran** and **Newland-1812** → both retire |
| **Legal/reference** | **Privacy, Terms, Student Handbook** built and footer-linked sitewide. **Verbatim legal copy pasted** from the live pages (6 July 2026); handbook page now links the **current v3.6 handbook + 6-policy library** from `/Study/PoliciesandProcedures-516/` |
| **Insurance page** | **Retire** — `/BecomeaPersonalTrainer/FITCollegeInsurance-603/` → 301 to `faqs.html` |
| **Affiliatedeal** | **Kept + migrated** — built `affiliate-deal.html` (excluded from sitemap; partner-link entry only) |
| **GSC reconciliation** | **Closed per Stanley** — the index-probe audit is accepted as the final unindexed list; no GSC export will be run |

> Built this round: 5 new pages + sitewide footer legal/blog links. Legal copy
> is migrated structure only — **paste verbatim from the legal master** before
> publishing. Student Handbook still points at the stale **V4.6 (April 2019)** PDF.

---

## Part 1 — Page audit (implement / retire / redirect)

### A. Core canonical pages — already covered by the rebuild → MIGRATE + 301 legacy
| Old URL | Rebuild page | Action |
|---|---|---|
| `/` | `home.html` | MIGRATE |
| `/Courses/Courses-482/` | `courses.html` | MIGRATE + 301 |
| `/courses/certificate-iii-in-fitness` | `course-cert-iii.html` | MIGRATE |
| `/courses/certificate-iv-in-fitness` | `course-cert-iv.html` | MIGRATE |
| `/courses/elite-personal-trainer` | `course-fit-elite.html` | MIGRATE |
| `/courses/diploma-of-sport-coaching` | `course-diploma-sport.html` | MIGRATE |
| `/courses/strength-and-conditioning` | `course-strength-conditioning.html` | MIGRATE |
| `/courses/international-fitness-student-pathway` | `course-international.html` | MIGRATE |
| `/courses/trainer-and-assessor` + `/courses/tae40122-certificate-iv-in-training-and-assessment` | `course-tae.html` | MIGRATE + 301 (two URLs → one) |
| `/courses/first-aid-provider` + `/courses/HLTAID011-provide-first-aid` | `course-first-aid.html` | MIGRATE + 301 (two URLs → one) |
| `/courses/HLTAID009-provide-cpr` | `course-cpr.html` | MIGRATE |
| `/courses/disability-support` + `/Courses/DisabilityWorker-780/` + `/nds-disability-course` | `course-disability-support.html` | MIGRATE + 301 (**three** URLs → one) |
| `/Study/Funding-513/` | `funding.html` | MIGRATE + 301 (called out in README) |
| `/Study/AboutUs-446/` | `about.html` | MIGRATE |
| `/faqs` | `faqs.html` | MIGRATE |
| `/Contact` | `contact.html` | MIGRATE |
| `/Locations/LocationFinder-453/` | `locations.html` | MIGRATE + 301 |

### B. Duplicate URL structures — same content at multiple URLs → 301 consolidate
The legacy CMS exposes the *same page* under several path shapes. Each cluster
must collapse to one canonical rebuild URL.

| Duplicate old URLs | Canonical | Action |
|---|---|---|
| `/about-us` **and** `/Study/AboutUs-446/` | `about.html` | 301 both |
| `/Study/AboutUs/USIUniqueStudentIdentifier-475/` **and** `/Study/AboutUs-446/USIUniqueStudentIdentifier-475/` | `about.html` (USI section) | 301 both — README consolidates About/RPL/USI |
| `/Study/AboutUs/RPL-478/` **and** `/Study/AboutUs-446/RPL-478/` | `about.html` (RPL section) | 301 both |
| `/faqs`, `/FAQs-1837/`, `/Study/AboutUs-446/FAQs-474/` | `faqs.html` | 301 the two legacy variants |
| `/Locations/Adelaide-Glenelg-82/` **and** `/Locations/AdelaideGlenelg-1819/` | `location-adelaide-glenelg.html` | 301 both (rebuild promotes Glenelg to a first-class campus) |
| `/Locations/Geelong-NorthGeelong-81/` **and** `/Locations/Geelong-1813/` | `location-geelong.html` | 301 both |
| `/locations/hobart-city-centre` **and** `/Locations/Hobart-CityCentre-548/` | `location-hobart-aquatic-centre.html` | 301 both — **note: campus renamed/relocated (City Centre → Aquatic Centre); verify address** |

### C. Study Online cluster — 5+ legacy pages → one → 301 (README already flags)
| Old URL | Action |
|---|---|
| `/study-online/online-fitness-courses` | MIGRATE → `study-online.html` |
| `/StudyOnline/StudyOnline-448/` | 301 → `study-online.html` |
| `/StudyOnline/StudyOnlineRequirements-605/` | 301 |
| `/StudyOnline/TourOnlineLearningPlatform/` | 301 (or fold "platform tour" content in) |
| `/StudyOnline/CourseAssessmentProcess-607/` | 301 |
| `/StudyOnline/StudyOnlineLocations-608/` | 301 |
| `/StudyOnline/StudyOnlineCoursesOffered-609/` | 301 |

### D. Campaign / promo / sale pages — expired & seasonal → RETIRE
Thin, time-boxed acquisition pages. Most are already dropping out of the index
(classic "Crawled – currently not indexed"). **None have a rebuild equivalent
and none should.** 301 each to `funding.html` or the relevant course, or serve
410. Going forward these should be built from a single reusable promo template,
set to expire, and kept out of the sitemap.

`/mayintakesale` · `/JanuaryPromo` · `/Christmaspromo` · `/MarchMadnessSale` ·
`/SpringSale` · `/CyberSale` · `/FBOpromotion` · `/FBOPartnerPage-773/` ·
`/givewayshortcourse` · `/launch-sale-fit-elite` ·
`/Contact/NovemberPromoCompletePT-1791/` · `/Contact/NovemberPromoFITElite-1792/` ·
`/contact/FebruaryPromoFITElite` · `/Affiliatedeal` · `/landing` ·
`/landing-thanks` · `/promo` · `/promo-thanks` · `/Expo` ·
`/contact/FLG-FIT-College-Open-Day` · `/Contact/RoarActiveOpenDay-1789/` ·
`/LinAs`

> **Action:** confirm none are live/paid in current campaigns, then RETIRE.
> `funding.html` already carries the working eligibility checker that replaces
> the acquisition job these pages did piecemeal.

### E. Affiliate / partner pages → DECIDED: retire all except Staff form + Affiliatedeal
**Decision:** keep only `/staffleadform` (staff referral form, noindex) and
`/Affiliatedeal` (migrate to rebuild). Retire everything else below → 301 to
`funding.html` (`bondpathway` → `courses.html`; revisit if the Bond pathway is
reactivated).

`/Contact/WorldGymAffiliate-734/` · `/Contact/ClubLimeAffiliatePage-731/` ·
`/Contact/RoarAffiliatePage-729/` · `/Contact/SuncoastFitnessAffiliatePage-728/` ·
`/Contact/ZapPartnership-778/` · `/Contact/CrossfitRevelationAffiliatePage-784/` ·
`/Contact/TribeFitnessPartnerPage-774/` · `/Contact/LSKDOffer-765/` ·
`/contact/LTYB-FIT-College` · `/contact/AffiliateFacilityDiscount-612/` ·
`/bondpathway` (Bond University pathway — **likely keep, real pathway**)

### F. Utility / form / internal pages → NOINDEX (keep working, keep out of index)
| Old URL | Note |
|---|---|
| `/thank-you/`, `/landing-thanks`, `/promo-thanks` | form confirmation pages — noindex |
| `/Study/EnrolNow-385/` | enrol form — maps to contact/enrol flow |
| `/Contact/RequestanInfoPack-514/` | info-pack form — README: info pack = secondary CTA sitewide |
| `/Contact/RequestanInfoPack(backup)-659/` | **duplicate backup form — RETIRE** |
| `/Contact/StaffLeadForm-597/` · `/contact/AffiliateLeads-597/` | internal lead forms — noindex |
| `/Study/Salesforce-627/` | internal integration page — noindex/retire |
| `/Contact/Slideshow-363/` | legacy widget — retire |
| `/imagedetail.aspx` | already disallowed in robots.txt |

### G. Legal / compliance → KEEP (RTO-required)
**Built + footer-linked this round:** `privacy.html`, `terms.html`,
`student-handbook.html` (from `/Contact/PrivacyPolicy-360/`,
`/Contact/TermsofUse-361/`, `/Study/StudentHandbook-516/`). Legal copy is
migrated **structure only** — paste verbatim from the legal master before
publishing. Student Handbook still links the stale **V4.6 (April 2019)** PDF —
replace with the current version.

Still open: `/Study/AuditInformation-574/` (keep, verify current) ·
`/BecomeaPersonalTrainer/FITCollegeInsurance-603/` (insurance scheme — REVIEW: keep as info page?)

### H. Courses with NO rebuild equivalent → DECIDED
| Old URL | Decision |
|---|---|
| `/courses/certificate-iii-in-travel` | **IMPLEMENT** — built as `course-cert-iii-travel.html` (SIT30222), added to `courses.html` |
| `/courses/upgrade-tae40116-to-tae40122` | **IMPLEMENT** — built as `course-tae-upgrade.html` (standalone), added to `courses.html` |
| `/courses/certificate-iv-in-weight-management` | **RETIRE** → 301 to `courses.html` |
| `/courses/fitness-professional` | **RETIRE** → 301 to `courses.html` |
| `/Study/EnrolNow-385/` course-adjacent | confirm enrol flow parity |

### I. Retired campuses → DECIDED: both retire
| Old URL | Decision |
|---|---|
| `/locations/melbourne-prahran-` | **RETIRE** (Prahran closed) → 301 to `location-melbourne-south-melbourne.html` |
| `/Locations/Newland-1812/` | **RETIRE** → 301 to `locations.html` |

> Cross-check: rebuild **adds** first-class Geelong and Adelaide-Glenelg campus
> pages that only existed as legacy numeric URLs before. Confirm both campuses
> are actually operating before publishing.

### J. Blog subdomain → DECIDED: keep + link out
`blog.fitcollege.edu.au` is a **separate subdomain** with its own posts
(e.g. `/5-free-biohacks-to-upgrade-your-body-and-mind`). **Decision:** keep it —
the blog is built on HubSpot; a footer **Blog** link to `blog.fitcollege.edu.au`
was added sitewide. No migration into the 40-page rebuild.

### K. PDFs / `/userfiles/` → KEEP but review
Many course guides and policies are indexed as standalone PDFs
(`/userfiles/Course_Guides/...`, Student Handbook v4.6 **April 2019**, Refund
Policy v1.5). Some are years old. Review for currency, keep canonical downloads,
301 or 404 stale ones. These are a real chunk of indexed URLs.

---

## Part 2 — Project To-Do list

### 1. Content verification — resolve every `[CONFIRM]` chip (108 across 34 pages)
Nothing publishes with a visible `[CONFIRM]` chip. Grouped by source:
- **[ ] Campus NAP details** (~20) — feed from the **GBP audit workbook → NAP Master tab** onto all 20 campus pages (address, phone, hours, map).
- **[ ] Per-campus timetables** (~20) — intake/timetable per campus from the course team.
- **[ ] Per-course details** (~22) — durations, unit lists, delivery modes (`[CONFIRM per course]` / `[CONFIRM with course team]`).
- **[ ] CEC pack size** — report says 30, live site says "up to 50" (README) — pick one.
- **[ ] CRICOS / international status** — confirm for `course-international.html`.
- **[ ] Career Start figures** — re-verify against the official QLD Government source at build time.

### 2. Redirect map (301s) — required before launch
- [ ] `/Study/Funding-513/` → `funding.html` *(README)*
- [ ] Study Online cluster (7 URLs, Part 1-C) → `study-online.html` *(README)*
- [ ] About / RPL / USI variants (Part 1-B) → `about.html` *(README)*
- [ ] **All duplicate URL clusters in Part 1-B** (locations, FAQs, about) → canonical
- [ ] **Multi-URL course collapses** (disability ×3, first-aid ×2, TAE ×2) → single course page
- [ ] Retired campuses (Prahran, Newland) → nearest campus / `locations.html`
- [ ] Campaign/promo pages (Part 1-D) → `funding.html` or 410
- [ ] Stale PDFs (Part 1-K) → current version or 404
- [x] Produce the **full old-URL → new-URL redirect spreadsheet** for Kook — **`redirect-map.csv`** (110 rows)
- [x] Launch-day playbook — **`CUTOVER.md`** (go/no-go gates, redirect smoke test, GSC/GBP steps, RPL/USI consolidation detail, rollback)

### 3. Google Search Console — CLOSED per Stanley (July 2026)
- [x] ~~Export GSC → Pages → Not indexed and reconcile~~ — **decision: dropped.** The index-probe audit (Part 1) is accepted as the final unindexed list. Mitigation: CUTOVER.md Phase 3 watches server logs for unmapped legacy URLs post-launch and adds redirect rows as they surface.
- [x] Add a proper `sitemap.xml` — **built** (45 canonical URLs, this repo) and **declared in `robots.txt`** (also built; old file had no Sitemap line). Both deploy at cutover only — see **`CUTOVER.md`**.

### 4. Pre-production flags to remove (README "Demo-only")
- [ ] Remove `<meta name="robots" content="noindex, nofollow">` from all 41 pages.
- [ ] Replace 35 `.img-slot` placeholder blocks with Damian's photography.
- [ ] Remove all visible `[CONFIRM]` chips once content is verified.

### 5. Rebuild coverage gaps (from this audit)
- [x] Course implement-vs-retire decided — **built** Cert III Travel + TAE upgrade; **retiring** Weight Management + fitness-professional (Part 1-H).
- [x] Affiliate/partner strategy decided — keep Staff form + Affiliatedeal, retire the rest (Part 1-E).
- [x] Blog decided — keep + footer link to HubSpot blog (Part 1-J).
- [x] **Verbatim legal copy pasted** into `privacy.html` / `terms.html` from the live pages (6 July 2026, Stanley-approved source).
- [x] **Student Handbook updated** — links current **v3.6** handbook + 6-policy library from `/Study/PoliciesandProcedures-516/`; stale 2019 PDF gets a 301.
- [x] `/Affiliatedeal` **migrated** — `affiliate-deal.html` built (excluded from sitemap).
- [x] Insurance page (`FITCollegeInsurance-603`) — **retire** → 301 to `faqs.html`.

### 6. Integrations & automation (README)
- [ ] Eligibility-checker answers → HubSpot properties (see comments in `funding.html`).
- [ ] Enquiries trigger the FIT College SMS speed-to-lead automation.
- [ ] Confirm enrol / info-pack forms reach the same CRM endpoints as today.

### 7. Governance / sign-off (README)
- [ ] Guaranteed-interview commitment — **excluded pending capacity stress-test + CEO sign-off**.
- [ ] Keep the repo **private** — internal demo of an unapproved rebuild.
- [ ] **Nothing goes live without Stanley's sign-off.**

---

*Generated for the `unindexed-pages-audit` branch. Part 1 index status is
best-effort via public index probing; treat Google Search Console as the
authoritative source for the final unindexed list.*
