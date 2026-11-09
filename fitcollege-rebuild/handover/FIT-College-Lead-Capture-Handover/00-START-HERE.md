# FIT College: lead capture + Career Advisor routing

**Handover for Kook · 9 November 2026**
Owner: Stanley Campbell. Nothing goes live without Stanley's sign-off.

## What it does

Every enquiry uses one form. Every submission gets the information pack and becomes a lead.

1. **Screen 1: the HubSpot form.** Name, email, mobile, course, where they live (postcode, or country if overseas). reCAPTCHA is on. The course is preselected from the page the visitor came from.
2. **Screen 2: shown by our code** once HubSpot reports the submission succeeded:
   > "Thanks, Jess, your info pack is on its way. Tess Szabath, your local Career Advisor, will be in touch within 1 business day."

   It then offers **Book a time now** (Tess's HubSpot calendar) and **Call us now** (1300 887 017).

## Who gets the lead (first match wins)

1. **Non-fitness course** → Shay Best. This covers Disability Support Skill Set, Cert IV in Training & Assessment, TAE Upgrade (TAE40116 to TAE40122), First Aid / CPR, Cert III in Travel, International Student Pathways, and any new course added later.
2. **Lives outside Australia** → FIT College Career Advisor [PENDING decision].
3. **Postcode in POSTCODE MASTER vNOV26** (2,664 postcodes) → that postcode's advisor. Applies to Not sure yet, FIT Elite™ Dual-Career PT Program, Cert III in Fitness, Cert IV in Fitness, Diploma of Sport (Coaching), Strength & Conditioning, CEC Short Courses.
4. **Anything else** → the team ("one of our Career Advisors").

## Start here

1. Open `01-overview/lead-capture-demo.html` in a browser and click through it. It's the whole flow, working offline.
2. Skim `01-overview/FIT-College-Advisor-Routing.pdf` (13 slides).
3. Build the HubSpot side from `03-hubspot/`, or confirm Stanley has: the form, properties and workflows.
4. Put `02-website-code/` into the CMS (steps below).
5. Run the acceptance tests (deck slide 12).

## Website steps

1. Add `js/advisor-data.js` and `js/advisor-router.js` sitewide, in that order.
2. Add `css/lead-capture.css` to the main stylesheet. It uses the existing design tokens.
3. On the contact page, place the markup from `snippet.html`. Keep both `#book` and `#infopack`: every sitewide CTA already links to one or the other.
4. Fill in `window.FIT_HUBSPOT`: `portalId`, `formId`, `editor`. Until then the page shows a labelled stand-in form, so the flow can be tested end to end.
5. **Verify** the HubSpot method and event names marked `[KOOK]` in `advisor-router.js` against HubSpot's current developer docs. They couldn't be checked from where the prototype was built.
6. Set up GTM to forward the dataLayer events to GA4 (`03-hubspot/workflows.md`, Tracking).

`02-website-code/reference/` has the prototype's contact page and full stylesheet, for context only.

## HubSpot steps

| File | Use it to |
|---|---|
| `form-spec.csv` | Build the form: every field, hidden field and setting |
| `new-contact-properties.csv` | Create the new properties first |
| `course-dropdown-options.txt` | Set the course dropdown. Labels must match exactly |
| `workflows.md` | Build the owner, info pack, SMS and task workflows |
| `owner-workflow-branch-values.txt` | Paste-ready postcode lists for each owner branch |
| `postcode-owner-lookup.csv` | Postcode → advisor table (custom code or imports) |

## When the postcode sheet or course list changes

Nobody edits code. Run from the repo:

```
python3 tools/build_advisor_routing.py "POSTCODE MASTER.xlsx"
```

Then:
- redeploy `js/advisor-data.js`
- re-paste any changed branch in the owner workflow from `owner-workflow-branch-values.txt`

The script stops if a postcode has two owners or an owner isn't in `advisors.csv`. Sources are in `04-data-and-tools/`.

## Still pending (from Stanley)

- [ ] **Promotion form's hidden fields and settings**, to copy into the new form
- [ ] **HubSpot portal ID, form ID and editor type**, once the form is built
- [ ] **Info pack guides for each course**, and the "Not sure yet" pack
- [ ] **Owner for overseas fitness leads**
- [ ] **Confirm** Diploma of Sport, Strength & Conditioning and CEC route by postcode
- [ ] **Round-robin team booking link**, for unmatched and overseas leads
- [ ] **Owners for 6 populated postcodes** missing from the sheet (`postcode-sheet-gaps.csv`)
- [ ] **Confirm** "NICOLA WILLIAMS" in the sheet is Nicky Wood
- [ ] **Compliance check** on the consent wording (phone, SMS and email)

## Notes

- **Staff mobiles are deliberately not in the website data.** The data file is public. The phone option is 1300 887 017.
- **Booking links** are on the AP1 HubSpot meetings domain (`meetings-ap1.hubspot.com/...`). Click-test all 10 on the live domain.
