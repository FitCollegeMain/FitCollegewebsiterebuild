# FIT College — Full URL Cutover Runbook

**Old site:** fitcollege.edu.au (legacy Kook CMS, ~95 sitemap URLs + long tail)
**New site:** 45-page rebuild (this repo) implemented on Kook CMS
**Companion files:** `redirect-map.csv` (110 mapped URLs) · `sitemap.xml` · `robots.txt` · `OLD-SITE-AUDIT.md`
**Owner:** Stanley (nothing goes live without sign-off) · **Implementer:** Kook

> This is the launch-day playbook for cutting every old URL over to the new
> structure — including the **RPL/USI/About consolidation** (§5), the Study
> Online collapse, campaign retirements and campus retirements — without
> losing rankings, GBP traffic or live campaign spend.

---

## Phase 0 — Go/No-Go gate (all must be YES before a date is set)

| # | Gate | Source |
|---|---|---|
| 0.1 | All 108 `[CONFIRM]` chips resolved (NAP, timetables, course details, CEC size, CRICOS) | README / audit §Part 2.1 |
| 0.2 | ~~Verbatim legal copy~~ **DONE 6 Jul 2026** — pasted verbatim from live PrivacyPolicy-360 / TermsofUse-361 | audit §1-G |
| 0.3 | ~~Current handbook~~ **DONE 6 Jul 2026** — links current **v3.6** handbook + 6-policy library from PoliciesandProcedures-516; carry `/userfiles/` PDFs over unchanged | `student-handbook.html` |
| 0.4 | Career Start figures re-verified against official QLD Government source | README |
| 0.5 | `.img-slot` placeholders replaced with Damian's photography | README |
| 0.6 | Eligibility checker mapped to HubSpot properties; SMS speed-to-lead tested end-to-end | `funding.html` comments |
| 0.7 | No live paid campaigns pointing at pages being retired (check ad accounts vs audit §1-D) | marketing |
| 0.8 | ~~GSC reconciliation~~ **CLOSED per Stanley** — index-probe audit accepted as final; Phase 3 log-watching is the safety net for unmapped long-tail URLs | audit §Part 2.3 |
| 0.9 | **Stanley's sign-off** | — |

## Phase 1 — T-minus 1 week (prep, zero user impact)

1. **Freeze old-site content.** No new pages, promos or URL changes on the legacy CMS after this point — the redirect map is built against a snapshot.
2. **Full backup/export** of the legacy CMS (pages + `/userfiles/` PDFs).
3. **Load `redirect-map.csv` into Kook's redirect engine** on staging. Rules:
   - All redirects are **server-side 301** (not meta-refresh, not JS).
   - Rows with `redirect_type=410` return **410 Gone** (retired backup form, Salesforce page, Slideshow widget).
   - Rows with empty `new_url` and `action=KEEP/NOINDEX` are **not redirected** — they stay live (Staff Lead Form, Affiliatedeal, audit info, `/userfiles/` current PDFs) with `noindex` where marked.
   - Legacy CMS URLs are case-insensitive in the wild (`/Contact/` vs `/contact/`) — match **case-insensitively** and with/without trailing slash.
   - **One hop only:** old URL → final URL. No chains (e.g. `/Study/AboutUs/RPL-478/` must go straight to `/about.html#rpl`, not via `/about-us`).
4. **Crawl the staging site** (Screaming Frog or similar): 0 broken internal links, 1 `<title>`/OG set per page, header renders once, pinch-zoom enabled.
5. **Verify GSC + GA4 + GBP access** for whoever runs post-launch monitoring; note baseline rankings for the top 20 queries.

## Phase 2 — Launch day (in this order)

| Step | Action | Verify |
|---|---|---|
| 2.1 | Deploy the 45 new pages to production | spot-check 5 pages render |
| 2.2 | **Remove `<meta name="robots" content="noindex, nofollow">` from all pages** | `curl -s <url> \| grep -c noindex` → 0 |
| 2.3 | Activate the full 301/410 ruleset from `redirect-map.csv` | run the smoke test below |
| 2.4 | Deploy `robots.txt` (adds the previously missing `Sitemap:` line) | `curl https://www.fitcollege.edu.au/robots.txt` |
| 2.5 | Deploy `sitemap.xml` (45 canonical URLs only — no legacy, no promo, no duplicates) | fetch + XML-validate |
| 2.6 | Submit `sitemap.xml` in GSC; use **URL Inspection → Request indexing** on home, courses, funding, locations | GSC shows "Success" |
| 2.7 | Update **GBP website links** for all 20 campuses to the new `location-*.html` URLs (from the NAP Master tab) | click each GBP link |
| 2.8 | Update HubSpot forms/meeting links + SMS automation endpoints to new URLs; send one live test enquiry | SMS arrives < 5 min |
| 2.9 | Repoint any live ad campaigns/bio links/email footers at new URLs | marketing checklist |

**Redirect smoke test** (run against production; every line must return `301` + the mapped target, per `redirect-map.csv`):

```bash
while IFS=, read -r old new type _; do
  [ "$type" = "301" ] || continue
  printf '%s -> ' "$old"
  curl -s -o /dev/null -w '%{http_code} %{redirect_url}\n' "https://www.fitcollege.edu.au${old%%#*}"
done < redirect-map.csv
```

Priority spot-checks (highest-traffic/highest-risk):
`/Study/Funding-513/` → funding · `/Courses/Courses-482/` → courses · all 7 Study Online URLs → study-online · the 3 disability URLs → one course page · `/Study/AboutUs/RPL-478/` → `/about.html#rpl` · `/locations/hobart-city-centre` → hobart-aquatic-centre.

## Phase 3 — T-plus monitoring

- **Day 1–3 (daily):** GSC Coverage for spikes in 404s; server logs for unmapped legacy URLs → add rows to `redirect-map.csv` and redeploy; confirm forms + SMS still firing.
- **Week 1–2:** GSC "Pages → Not indexed" — retired campaign/duplicate URLs should move to "Page with redirect"; new pages should begin indexing. Re-request indexing for stragglers.
- **Week 2–6 (weekly):** rank tracking vs the Phase 1 baseline. A temporary wobble is normal; sustained drops on money pages (funding, cert-iii, cert-iv, fit-elite) → check the redirect for that page first.
- **Keep 301s live ≥ 12 months** (permanently is fine — they're one config file). Never recycle a retired URL for new content.

## Rollback (if the site is materially broken at launch)

1. Re-point DNS/CMS to the legacy snapshot (Phase 1 backup).
2. **Do NOT leave the new `sitemap.xml` submitted** while rolled back — remove it in GSC.
3. Root-cause, fix on staging, re-run Phase 2 from step 2.1. Redirect config is additive, so a re-launch reuses the same tested ruleset.

---

## §5 — RPL / USI / About consolidation cutover (detail)

The rebuild collapses the old About cluster into a single `about.html` with
in-page anchors (`#rpl`, `#usi` — added to the page for this cutover):

| Old URL | New target | Notes |
|---|---|---|
| `/Study/AboutUs-446/` | `/about.html` | main About page |
| `/about-us` | `/about.html` | clean-URL duplicate of the same page |
| `/Study/AboutUs/RPL-478/` | `/about.html#rpl` | RPL section anchor |
| `/Study/AboutUs-446/RPL-478/` | `/about.html#rpl` | RPL path variant (both live URLs confirmed indexed) |
| `/Study/AboutUs/USIUniqueStudentIdentifier-475/` | `/about.html#usi` | USI section anchor |
| `/Study/AboutUs-446/USIUniqueStudentIdentifier-475/` | `/about.html#usi` | USI path variant |
| `/Study/AboutUs-446/FAQs-474/` | `/faqs.html` | FAQ content moved to the FAQ page, not About |

Cutover notes:
- Fragments (`#rpl`) survive a 301 in every major browser — the server sends
  `Location: /about.html#rpl` and the browser scrolls to the section.
- **Content parity check before launch:** the old RPL page describes the
  evidence-portfolio process in more depth than the current `about.html`
  summary. Since GSC reconciliation was dropped (gate 0.8), assume the RPL
  page has organic entrances and expand the `#rpl` section to match intent —
  a 301 onto thinner content is how consolidations leak rankings.
- The Student Handbook also covers RPL — `student-handbook.html` and
  `about.html#rpl` cross-link (already wired).
- RPL enquiries route to the Career Advisor CTA (no separate RPL form in the
  rebuild) — confirm HubSpot tags these so the course team still sees them.

---

## Deliberately NOT redirected (decision record)

- **KEEP live:** `/staffleadform` (+ `/Contact/StaffLeadForm-597/`) staff referral form (noindex) · `/Study/AuditInformation-574/` · current `/userfiles/` PDFs (carry over unchanged — 7 current policy PDFs are linked from `student-handbook.html`) · `blog.fitcollege.edu.au` (HubSpot — footer-linked, untouched by this cutover)
- **Migrated:** `/Affiliatedeal` → `affiliate-deal.html` (built; excluded from `sitemap.xml` — partner-link entry only)
- **410 Gone:** `/Contact/RequestanInfoPack(backup)-659/` · `/Study/Salesforce-627/` · `/Contact/Slideshow-363/`
- **Retired (decided 6 Jul 2026):** `/BecomeaPersonalTrainer/FITCollegeInsurance-603/` → 301 to `faqs.html` · stale 2019 handbook PDF → 301 to `student-handbook.html`
- **All decisions closed — no open items remain in this runbook.**
