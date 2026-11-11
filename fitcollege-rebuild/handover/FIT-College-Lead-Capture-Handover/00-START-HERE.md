# FIT College: lead capture + Career Advisor routing

**Handover for Kook · 11 November 2026**
Owner: Stanley Campbell. Nothing goes live without Stanley's sign-off.

## In one paragraph

The site gets two lead buttons: **Book a Careers Consult** and **Download an Information Pack**. Each opens its own HubSpot form. When the form is submitted, the website shows a "what happens next" panel straight away. The panel has the visitor's Career Advisor (name, phone, email), says they'll be in touch within 1 business day, and offers to book a time in that advisor's calendar or call now. The advisor comes from a lookup table in the website (postcode → advisor, plus course rules). HubSpot takes about 6 minutes to assign an owner, so the website can't wait for it. Everything inside HubSpot after submission is handled by FIT College in-house.

## What's in this pack

| File | What it's for |
|---|---|
| `FIT-College-Advisor-Routing.pdf` | **Read first.** 13 slides: the flow, the screens, the rules |
| `SPEC.md` | **The build spec:** buttons, both forms and their field names, routing rules, screen 2 wording, tracking, acceptance checklist |
| `cta-inventory.csv` | All 283 buttons and links on 46 pages: current text, new text, where they go |
| `data/advisor-lookup.json` | The lookup table, ready to use: advisors, 2,664 postcodes, course rules |
| `data/*.csv` | The same data as spreadsheets |

## What you're building

1. **Rename the buttons sitewide** and point each to its form (`cta-inventory.csv`).
2. **Embed the two HubSpot forms** (SPEC §3), with the course preselected and hidden fields filled (SPEC §5).
3. **Match the advisor in the browser** after submit (SPEC §4), using `advisor-lookup.json`.
4. **Show screen 2** with the right wording for each form (SPEC §6).
5. **Push the tracking events** (SPEC §7).
6. **Test against the acceptance checklist** (SPEC §8).

How you build it is up to you. Nothing in this pack is code to copy.

## Waiting on FIT College

These don't block starting the build:
- [ ] HubSpot form tidy-up: course question, FIT Elite defaults removed, button labels, new hidden fields
- [ ] Owner for international (non-citizen / non-PR) leads
- [ ] Confirm Diploma of Sport, Strength & Conditioning and CEC route by postcode
- [ ] Information pack PDFs per course (optional; enables a real download button)
- [ ] Updated postcode table (6 missing populated postcodes)

FIT College will send an updated `advisor-lookup.json` whenever territories or advisor details change.
