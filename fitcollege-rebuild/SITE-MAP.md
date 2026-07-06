# FIT College — New Site Map

**46 pages** (45 in `sitemap.xml` + 1 deliberately unlisted partner lander) replace ~95 declared legacy URLs plus a long tail of orphans. Old→new mapping lives in `redirect-map.csv` (115 rows); launch sequence in the Cutover Runbook.

---

## Site structure

### Home & hubs (priority 1.0 / 0.9 · weekly)
| Page | URL |
|---|---|
| Homepage | `/` |
| All courses | `/courses.html` |
| Campus locations | `/locations.html` |
| Funding & Career Start (eligibility checker) | `/funding.html` |
| Study Online (consolidates 7 legacy URLs) | `/study-online.html` |

### Courses (priority 0.8 · monthly) — 13 pages + calendar
| Page | URL |
|---|---|
| FIT Elite™ — Dual-Career PT Program | `/course-fit-elite.html` |
| SIS30321 Certificate III in Fitness | `/course-cert-iii.html` |
| SIS40221 Certificate IV in Fitness | `/course-cert-iv.html` |
| SIS50321 Diploma of Sport | `/course-diploma-sport.html` |
| Strength & Conditioning (ASCA L1) | `/course-strength-conditioning.html` |
| CHCSS00130 Disability Skill Set (absorbs 3 legacy URLs) | `/course-disability-support.html` |
| TAE40122 Training & Assessment (absorbs 2 legacy URLs) | `/course-tae.html` |
| TAE40116 → TAE40122 Upgrade — **new this round** | `/course-tae-upgrade.html` |
| SIT30222 Certificate III in Travel — **new this round** | `/course-cert-iii-travel.html` |
| HLTAID011 Provide First Aid (absorbs 2 legacy URLs) | `/course-first-aid.html` |
| HLTAID009 Provide CPR | `/course-cpr.html` |
| Short Courses (CEC) | `/course-short-courses.html` |
| International Pathways | `/course-international.html` |
| Course calendar | `/course-calendar.html` |

### Campuses (priority 0.7 · monthly) — 20 pages
| State | Campuses |
|---|---|
| QLD | Brisbane Carseldine · Brisbane Fortitude Valley · Gold Coast Nerang · Ipswich · Sunshine Coast Maroochydore · Toowoomba · Cairns City Centre |
| NSW | Sydney City Centre · Sydney Parramatta · Sydney Penrith · Sydney Caringbah · Newcastle |
| VIC | Melbourne South Melbourne · Melbourne Wantirna · Geelong |
| WA | Perth Joondalup · Perth Bibra Lake |
| SA / ACT / TAS | Adelaide Glenelg · Canberra Deakin · Hobart Aquatic Centre |

*(URL pattern: `/location-<city-suburb>.html` — retired: Melbourne Prahran, "Newland")*

### Information (priority 0.6 · monthly)
| Page | URL |
|---|---|
| About FIT College (consolidates About / RPL `#rpl` / USI `#usi`) | `/about.html` |
| Contact — Chat with a Career Advisor | `/contact.html` |
| FAQs (absorbs 2 legacy FAQ URLs + insurance page) | `/faqs.html` |

### Legal & reference (priority 0.3 · yearly)
| Page | URL | Status |
|---|---|---|
| Privacy Policy | `/privacy.html` | **Verbatim** live copy, migrated 6 Jul 2026 |
| Terms of Use | `/terms.html` | **Verbatim** live copy, migrated 6 Jul 2026 |
| Student Handbook & Policies | `/student-handbook.html` | Current **v3.6** handbook + 6-policy PDF library |

### Not in sitemap (deliberate)
| Page | URL | Why |
|---|---|---|
| Affiliate Exclusive Offer | `/affiliate-deal.html` | Partner-gym entry links only — kept out of organic discovery |
| Staff referral form | `/staffleadform` (legacy, kept live) | Internal — noindex |
| Blog | `blog.fitcollege.edu.au` | Separate HubSpot property — footer-linked |

---

## robots.txt (deployed with the sitemap at cutover)

- **Adds `Sitemap: https://www.fitcollege.edu.au/sitemap.xml`** — the legacy robots.txt declared no sitemap at all
- Keeps legacy admin disallows: `/adm/`, `/Members/`, `/imagedetail.aspx`, `/cdn-cgi/`
- Blocks retired utility endpoints: `/thank-you`, `/landing-thanks`, `/promo-thanks`

## Numbers at a glance

| Metric | Old site | New site |
|---|---|---|
| Declared sitemap URLs | ~95 (mixed canonical + legacy + promo) | 45 (canonical only) |
| Duplicate URL structures | Same page at 2–3 URLs (About, RPL, USI, FAQs, 3 campuses, 3 courses) | 0 — one URL per page |
| Expired campaign pages indexed | ~22 | 0 (all 301/410) |
| Sitemap declared in robots.txt | No | Yes |
| Redirect rows mapped | — | 115 (`redirect-map.csv`) |

*If Kook implements clean URLs instead of `.html` paths, regenerate `sitemap.xml` and the CSV targets from the same source — flagged in both files.*
