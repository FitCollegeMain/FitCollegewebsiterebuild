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

### E. Affiliate / partner pages — business call → REVIEW
Real partnerships. Decide as a group: (a) keep as a single CMS-driven
"Partners" template with one page per active partner, or (b) retire lapsed
partners. Do **not** auto-migrate all — many partners may be inactive.

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
Keep and link from the rebuild footer; verify each is current.

`/Contact/TermsofUse-361/` · `/Contact/PrivacyPolicy-360/` ·
`/Study/StudentHandbook-516/` · `/Study/AuditInformation-574/` ·
`/BecomeaPersonalTrainer/FITCollegeInsurance-603/` (insurance scheme — REVIEW: keep as info page?)

### H. Courses with NO rebuild equivalent → IMPLEMENT? (build-vs-retire decision)
These are real course pages the 40-page rebuild does **not** cover. Each needs a
yes/no on whether the course is still offered.

| Old URL | Question |
|---|---|
| `/courses/certificate-iv-in-weight-management` | Still offered? If yes → build a course page; if no → 301 to `courses.html` |
| `/courses/certificate-iii-in-travel` | Travel Training Australia brand — is this in scope for fitcollege.edu.au or a separate site? |
| `/courses/upgrade-tae40116-to-tae40122` | TAE upgrade pathway — fold into `course-tae.html` or keep standalone? |
| `/courses/fitness-professional` | Career/overview page — maps to `courses.html` or its own landing? |
| `/Study/EnrolNow-385/` course-adjacent | confirm enrol flow parity |

### I. Retired campuses → 301 (rebuild dropped them)
| Old URL | Note |
|---|---|
| `/locations/melbourne-prahran-` | **Rebuild has no Prahran** (note the broken trailing `-` — likely already dead). Confirm closure → 301 to `location-melbourne-south-melbourne.html` or `locations.html` |
| `/Locations/Newland-1812/` | "Newland" campus — unclear/possibly typo. Identify → map or retire |

> Cross-check: rebuild **adds** first-class Geelong and Adelaide-Glenelg campus
> pages that only existed as legacy numeric URLs before. Confirm both campuses
> are actually operating before publishing.

### J. Blog subdomain → REVIEW (separate migration track)
`blog.fitcollege.edu.au` is a **separate subdomain** with its own posts
(e.g. `/5-free-biohacks-to-upgrade-your-body-and-mind`) and is **out of scope of
the 40-page rebuild**. Decide: migrate posts into the new site's content system,
leave the blog as-is, or retire. Not covered by the rebuild today — flagging it
so it isn't lost.

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
- [ ] Produce the **full old-URL → new-URL redirect spreadsheet** for Kook to implement

### 3. Get the definitive unindexed list from Google Search Console
- [ ] Export **GSC → Pages → Not indexed** ("Crawled – currently not indexed", "Discovered – not indexed", "Duplicate", "Excluded by noindex").
- [ ] Reconcile against Part 1 (this audit is sitemap + index-probe based; GSC is authoritative).
- [ ] Add a proper `sitemap.xml` (current one mixes canonical + legacy URLs) and **declare it in `robots.txt`** (currently missing).

### 4. Pre-production flags to remove (README "Demo-only")
- [ ] Remove `<meta name="robots" content="noindex, nofollow">` from all 41 pages.
- [ ] Replace 35 `.img-slot` placeholder blocks with Damian's photography.
- [ ] Remove all visible `[CONFIRM]` chips once content is verified.

### 5. Rebuild coverage gaps (from this audit)
- [ ] Decide implement-vs-retire for **Weight Management**, **Cert III Travel**, **TAE upgrade**, **fitness-professional** (Part 1-H).
- [ ] Affiliate/partner strategy (Part 1-E) — one CMS "Partners" template vs retire lapsed.
- [ ] Blog subdomain plan (Part 1-J) — migrate / keep / retire.
- [ ] Insurance page (`FITCollegeInsurance-603`) — keep as info page?

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
