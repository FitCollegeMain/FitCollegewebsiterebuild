# FIT College: lead capture + Career Advisor routing (website)

**Handover for Kook · 11 November 2026**
Owner: Stanley Campbell. Nothing goes live without Stanley's sign-off.

**Scope:** the website side only, up to the moment the form is submitted. FIT College builds the HubSpot form and everything that happens to the lead inside HubSpot in-house. You only need the form's IDs and field names (below).

## What it does

Every enquiry uses one form. Every submission gets the information pack and becomes a lead.

1. **Screen 1: the HubSpot form**, embedded on the page. The course is preselected from the page the visitor came from.
2. **Screen 2: shown by our code** the moment HubSpot reports the submission succeeded:
   > "Thanks, Jess, your info pack is on its way. Tess Szabath, your local Career Advisor, will be in touch within 1 business day."

   It shows Tess's **phone, email and booking link**, with **Book a time now** (her HubSpot calendar) and **Call Tess now** buttons. Unmatched leads see 1300 887 017 and info@fitcollege.edu.au.

**Why the advisor lookup lives in the website:** HubSpot takes about 6 minutes to assign a contact owner. Screen 2 can't wait for that, so the advisor table (`js/advisor-data.js`) is in the website code and the match happens in the browser, instantly.

## Who the website shows (first match wins)

1. **Non-fitness course** → Shay Best. This covers Disability Support Skill Set, Cert IV in Training & Assessment, TAE Upgrade (TAE40116 to TAE40122), First Aid / CPR, Cert III in Travel, International Student Pathways, and any new course added later.
2. **Lives outside Australia** → FIT College Career Advisor [PENDING decision].
3. **Postcode in POSTCODE MASTER vNOV26** (2,664 postcodes) → that postcode's advisor. Applies to Not sure yet, FIT Elite™ Dual-Career PT Program, Cert III in Fitness, Cert IV in Fitness, Diploma of Sport (Coaching), Strength & Conditioning, CEC Short Courses.
4. **Anything else** → the Career Advisor team.

## Start here

1. Open `01-overview/lead-capture-demo.html` in a browser and click through it. It's the whole flow, working offline.
2. Skim `01-overview/FIT-College-Advisor-Routing.pdf`.
3. Build it from `02-website-code/` (steps below).
4. Run the acceptance tests (deck slide 12).

## Website steps

1. Add `js/advisor-data.js` and `js/advisor-router.js` sitewide, in that order.
2. Add `css/lead-capture.css` to the main stylesheet. It uses the existing design tokens.
3. On the contact page, place the markup from `snippet.html`. Keep both `#book` and `#infopack`: every sitewide CTA already links to one or the other.
4. Fill in `window.FIT_HUBSPOT` (`portalId`, `formId`, `editor`) when FIT College sends them. Until then the page shows a labelled stand-in form, so the flow can be built and tested end to end.
5. **Verify** the HubSpot embed method and event names marked `[KOOK]` in `advisor-router.js` against HubSpot's current developer docs. They couldn't be checked from where the prototype was built.
6. Push the tracking events below to GA4 through GTM.

`02-website-code/reference/` has the prototype's contact page and full stylesheet, for context only.

## The HubSpot form: what the website needs

FIT College builds the form in-house and will send:
- the **portal ID** and **form ID**
- the **form editor** used: `new` or `legacy`

The region is `ap1`. The form is set to show an inline thank-you message, not a redirect, so screen 2 can replace it.

**Fields the website reads** after submit, to pick the advisor and prefill the calendar:
- `firstname`, `lastname`, `email`
- `course_interest`: options match `03-data-and-tools/data/course-routing.csv` exactly
- `where_do_you_live`: Australia / Outside Australia
- `zip`, `country`

**Hidden fields the website writes:**
- `lead_source_page`: the page they came from
- `lead_context`: e.g. checker-eligible
- UTMs, `gclid`, `fbclid`, taken from the URL
- On legacy embeds only, also `assigned_advisor` and `lead_routing`

**Extra hidden fields:** if FIT College adds any that the website must fill in, they'll tell you, and they go in `context()` in `advisor-router.js`.

## Tracking events (GTM dataLayer → GA4)

Each event carries `assigned_advisor` and `lead_routing`.

| Event | Fires when | Conversion? |
|---|---|---|
| `lead_submitted` | the HubSpot form submitted successfully | yes |
| `advisor_book_opened` | tapped "Book a time now" | |
| `advisor_meeting_booked` | the HubSpot calendar booking completed | yes |
| `advisor_call_clicked` | tapped the advisor's phone number or "Call … now" | yes |
| `advisor_email_clicked` | tapped the advisor's email | |

## When the postcode sheet or course list changes

Nobody edits code. FIT College runs this from the repo, and you redeploy `js/advisor-data.js`:

```
python3 tools/build_advisor_routing.py "POSTCODE MASTER.xlsx"
```

The script stops if a postcode has two owners or an owner isn't in `advisors.csv`. Sources are in `03-data-and-tools/`.

## Waiting on FIT College

- [ ] HubSpot portal ID, form ID and editor type
- [ ] Any extra hidden fields the website must fill
- [ ] Owner for overseas fitness leads (rule 2)
- [ ] Confirm Diploma of Sport, Strength & Conditioning and CEC route by postcode
- [ ] Team booking link for unmatched and overseas leads (they see the phone number only until then)

## Notes

- **Advisor mobiles and emails are in the website data on purpose** (Stanley's decision), so screen 2 can show them instantly. The file is public, so anyone can read all ten numbers.
- **Managing advisor details in the CMS (optional).** If the CMS has editable collections, advisor name, phone, email and booking link could live there, so marketing can update them without a deploy.
  - The CMS would output `window.FIT_ADVISORS` in the same shape as `advisor-data.js`.
  - Postcodes stay generated from the sheet.
  - Keep one source per field so the two can't disagree.
- **Booking links** are on the AP1 HubSpot meetings domain (`meetings-ap1.hubspot.com/...`). Click-test all 10 on the live domain.
