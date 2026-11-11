# Lead capture + Career Advisor routing: implementation spec

**For:** Kook (website build)
**Owner:** Stanley Campbell, FIT College. Nothing goes live without Stanley's sign-off.
**Scope:** the website only, up to and including what the visitor sees after submitting a form. FIT College manages HubSpot in-house (workflows, owners, emails, SMS).

---

## 1. Summary

The site has two lead buttons, each opening its own HubSpot form:

| Button | HubSpot form | What the visitor gets |
|---|---|---|
| **Book a Careers Consult** | Careers Consult form | A call from their Career Advisor, or a time booked in that advisor's calendar straight away |
| **Download an Information Pack** | Information Pack form | The course information pack, then a follow-up from their Career Advisor |

When either form is submitted, the website replaces it with a **"what happens next"** panel (screen 2). The panel is the same for both forms apart from the wording. It shows the visitor's **Career Advisor**: name, phone, email, and buttons to **book a time now** or **call now**.

The advisor is worked out **in the browser** from a lookup table in the website: postcode → advisor, plus a few course rules. **Don't wait for HubSpot.** HubSpot takes about 6 minutes to assign a contact owner, and the visitor needs their advisor's details instantly.

---

## 2. The two buttons (sitewide)

| Old text | New text | Links to |
|---|---|---|
| Chat with a Career Advisor | **Book a Careers Consult** | the Careers Consult form |
| Request an Info Pack / Request an info pack | **Download an Information Pack** | the Information Pack form |
| Funding checker result buttons (5): "Book your advisor call", "Talk it through with an advisor", "See your options", "Plan ahead with an advisor", "Chat with a Career Advisor" | **Book a Careers Consult** | the Careers Consult form (keep the `?from=checker-…` parameter, see §5) |

- **283 links on 46 pages.** Every one is listed in `cta-inventory.csv`, with page, current text, new text, current link and element class.
- **Header nav:** the red header button becomes "Book a Careers Consult".
- **Contact page:** title, meta and H1 currently say "Chat with a Career Advisor". Suggested title: *Book a Careers Consult or Download an Information Pack | FIT College*.
- **Language:** around the Careers Consult button, write about the advisor, not "us". For example, "Call Tess now" or "Call the Career Advisor team", not "Call us now".
- **Where the forms live:** your call. Either two pages, or one contact page with a switch between the two forms. The links only need to open the right form. If you use one page, the prototype's anchors are `#consult` (also `#book`) and `#infopack`.

---

## 3. The two HubSpot forms

Both are HubSpot **v2 embeds**. The form renders in the page, not in an iframe, so the website can read and set its fields.

**Information Pack form**
```html
<script charset="utf-8" type="text/javascript" src="//js-ap1.hsforms.net/forms/embed/v2.js"></script>
<script>
  hbspt.forms.create({
    portalId: "21226391",
    formId: "cd7c4efe-24e7-4a2d-b495-fc3daf42bd76",
    region: "ap1"
  });
</script>
```
Share link: https://share-ap1.hsforms.com/1zXxO_iTnSi20lfw9r0K9dgcmydz

**Careers Consult form**
```html
<script charset="utf-8" type="text/javascript" src="//js-ap1.hsforms.net/forms/embed/v2.js"></script>
<script>
  hbspt.forms.create({
    portalId: "21226391",
    formId: "2e5b35fb-e821-4f50-9f6f-db82c5eba654",
    region: "ap1"
  });
</script>
```
Share link: https://share-ap1.hsforms.com/1Lls1--ghT1Cfb9uCxeumVAcmydz

### Fields on the live forms (checked 11 Nov 2026)

Both forms currently have the same fields:

| Internal name | Label | Type | Used by the website for |
|---|---|---|---|
| `firstname` | First Name* | text | Screen 2 greeting; prefilling the booking calendar |
| `lastname` | Last Name* | text | Prefilling the booking calendar |
| `email` | Email* | email | Prefilling the booking calendar |
| `phone` | Phone Number* | tel | |
| `zip` | Post Code* | text | **Routing** (§4) |
| `are_you_an_australian_citizen_or_preminent_resident_` | Are you an Australian citizen or permanent resident?* | select: Yes / No | **Routing** (§4) |
| `course_enquiry` | Course Enquiry | hidden | **Routing** (§4). The website must set it (§5) |
| `utm_widget_source`, `utm_widget_medium`, `utm_widget_campaign`, `utm_widget_term` | | hidden | Filled from the page URL's `utm_*` parameters |
| `leadsource`, `hs_lead_status`, `widgetanalyticsid`, `n00n6f00000emalt`, `n00n6f00000luzqn`, `have_you_put_this_person_through_the_unquailed_email_sequence_` | | hidden | Leave alone: FIT College manages these |

reCAPTCHA is switched on in both forms.

**Being fixed in HubSpot by FIT College:** both forms are copies of an old FIT Elite promo form. FIT College is updating them; see §9 for what changes. Field names above stay the same unless FIT College tells you otherwise.

---

## 4. Routing: who the visitor's Career Advisor is

Apply these rules to the submitted values. **The first match wins.**

| # | Rule | Advisor shown |
|---|---|---|
| 1 | Course is a **non-fitness course** (see `course-routing.csv`, column `route_to` ≠ `postcode`), or any course not listed there | **Shay Best** |
| 2 | Answered **No** to "Australian citizen or permanent resident?" | Overseas/international owner: **[decision pending]**. Use the Career Advisor team until confirmed |
| 3 | Postcode is in the lookup table | That postcode's advisor |
| 4 | Anything else (postcode not in the table, blank, overseas) | **Career Advisor team** (head office details) |

**Postcode clean-up before lookup:**
- strip everything but digits
- if 3 digits remain, add a leading 0 (NT: "800" becomes "0800")

**Data** (in `data/`):
- `advisor-lookup.json`: everything in one file, ready to use (shape below)
- `advisors.csv`: advisor name, email, phone, HubSpot booking link
- `postcode-master.csv`: 2,664 postcodes, each with its advisor (POSTCODE MASTER vNOV26)
- `course-routing.csv`: course labels, and whether each routes by postcode or to a named advisor

```json
{
  "advisors": {
    "tess-szabath": { "name": "Tess Szabath", "firstName": "Tess", "phone": "0457 279 143",
                      "email": "tess.szabath@fitcollege.edu.au",
                      "meetingUrl": "https://meetings-ap1.hubspot.com/tess-szabath" },
    "_fallback":    { "name": "FIT College Career Advisor", "phone": "1300 887 017",
                      "email": "info@fitcollege.edu.au", "meetingUrl": "" }
  },
  "postcodes": { "4558": "tess-szabath", "...": "..." },
  "courses":   { "Cert IV in Fitness": "postcode", "First Aid / CPR": "shay-best", "...": "...",
                 "*unlisted*": "shay-best", "*overseas*": "_fallback" }
}
```

**The table must ship with the website**, not be fetched from HubSpot. Hosting it as a static JSON file, or as a CMS collection, is your choice. FIT College will send an updated file whenever territories change; nothing else about the build should need to change. If you'd like FIT College to edit advisor phone numbers and booking links in the CMS, say so and we'll agree a format.

**Test cases**

| Course | Postcode | Citizen/PR | Expect |
|---|---|---|---|
| Cert IV in Fitness | 4558 | Yes | Tess Szabath |
| Cert IV in Fitness | 4000 | Yes | Thomas Jordan |
| Cert III in Fitness | 2150 | Yes | Matthew Johnson |
| Not sure yet | 800 | Yes | Sam Russell |
| Not sure yet | 3000 | Yes | Dean Eggins |
| Not sure yet | 6027 | Yes | Nicky Wood |
| First Aid / CPR | 4558 | Yes | Shay Best |
| Cert IV in Training & Assessment | 2000 | No | Shay Best |
| Cert III in Fitness | 4558 | No | International owner (team for now) |
| Cert III in Fitness | 2055 | Yes | Career Advisor team (2055 isn't in the table yet) |

---

## 5. What the website sends into the form

**Course (`course_enquiry`).** The live forms have no visible course question. The hidden `course_enquiry` currently defaults to "FIT ELITE™ PERSONAL TRAINER COURSE", which would tag every lead as FIT Elite. FIT College is choosing between:
- **(A) Recommended:** FIT College adds a visible course dropdown to both forms, with options exactly as in `course-routing.csv`. The website preselects it from the page the visitor came from.
- **(B)** The website shows its own course dropdown above the form and writes the choice into `course_enquiry`.

Either way, **preselect the course from the page the visitor came from**. A "Download an Information Pack" button on the Cert IV page should arrive with Cert IV selected. Page → course:

| Came from | Course |
|---|---|
| course-fit-elite | FIT Elite™ Dual-Career PT Program |
| course-cert-iii | Cert III in Fitness |
| course-cert-iv | Cert IV in Fitness |
| course-diploma-sport | Diploma of Sport (Coaching) |
| course-strength-conditioning | Strength & Conditioning |
| course-short-courses | CEC Short Courses |
| course-disability-support | Disability Support Skill Set |
| course-tae | Cert IV in Training & Assessment |
| course-tae-upgrade | TAE Upgrade (TAE40116 to TAE40122) |
| course-first-aid, course-cpr | First Aid / CPR |
| course-cert-iii-travel | Cert III in Travel |
| course-international | International Student Pathways |
| funding (checker) | Cert III in Fitness |
| anything else | Not sure yet |

Using the referring page is fine. A `?course=` parameter on the button link is more reliable if you prefer it.

**Other hidden fields to fill when the form has them.** FIT College is adding the last three.

| Field | Value |
|---|---|
| `utm_widget_source` / `_medium` / `_campaign` / `_term` | from `utm_source` / `utm_medium` / `utm_campaign` / `utm_term` in the URL |
| `lead_source_page` | URL of the page they came from |
| `lead_context` | the `from` URL parameter, e.g. `checker-eligible` from the funding checker |
| `assigned_advisor`, `lead_routing` | the advisor's name and the rule that matched (§4), set just before submit, so HubSpot has them without waiting for its own assignment |

v2 embed callbacks: set values in `onFormReady`, update routing fields in `onBeforeFormSubmit`, show screen 2 in `onFormSubmitted`. Check these against HubSpot's current v2 embed docs.

---

## 6. Screen 2: after submit

Replace the form with this panel. Layout is identical for both forms; the wording differs. The visual is on deck slide 4.

**Careers Consult**
> **Thanks, Jess, your Careers Consult request is in**
> Tess Szabath, your local Career Advisor, will call you **within 1 business day** to run through your options.
>
> [Advisor card]
>
> **Want to lock in a time now?**
> [📅 Book a time now · Pick a time in Tess's calendar] [☎ Call Tess now · 0457 279 143]

**Information Pack**
> **Thanks, Jess, your information pack is on its way**
> Check your inbox for the Cert IV in Fitness information pack. Tess Szabath, your local Career Advisor, will be in touch **within 1 business day**.
>
> [Advisor card]
>
> **Don't want to wait?**
> [📅 Book a time now · Pick a time in Tess's calendar] [☎ Call Tess now · 0457 279 143]

**Advisor card:**
- initials
- name
- role: "Your local Career Advisor", or "Career Advisor for First Aid / CPR" when matched by course
- phone, as a `tel:` link
- email, as a `mailto:` link

**Variations**

| Situation | Change |
|---|---|
| Matched by course (rule 1) | "Shay Best, the Career Advisor for First Aid / CPR, will…" |
| No match (rule 4) or international (pending) | "A Career Advisor will…". Card shows "Career Advisor team", 1300 887 017, info@fitcollege.edu.au. No booking button; the call button says "Call the Career Advisor team" |
| Course is "Not sure yet" (Information Pack) | "Check your inbox for the course guide." |
| Information pack PDF available for the course **[optional, pending]** | Add a "Download the [course] information pack" button, so "Download" is literal. FIT College will supply PDF links per course if wanted |

**Book a time now:**
- opens the advisor's `meetingUrl` (a HubSpot meetings page)
- inline is preferred: `meetingUrl?embed=true&firstname=…&lastname=…&email=…` in an iframe about 700px tall
- or as a link in a new tab
- prefill first name, last name and email
- under the calendar, add: "No times showing? Call Tess on 0457 279 143."

---

## 7. Tracking (GTM dataLayer → GA4)

Push these events. Each one carries `lead_form` (consult or infopack), `assigned_advisor` and `lead_routing`.

| Event | When | GA4 conversion |
|---|---|---|
| `lead_submitted` | HubSpot submission succeeded | yes |
| `advisor_book_opened` | "Book a time now" tapped | |
| `advisor_meeting_booked` | Booking completed in the HubSpot calendar (it posts a message to the page; confirm the payload) | yes |
| `advisor_call_clicked` | Advisor phone number or "Call … now" tapped | yes |
| `advisor_email_clicked` | Advisor email tapped | |

---

## 8. Acceptance checklist

- [ ] Every link in `cta-inventory.csv` has the new text and opens the right form
- [ ] Each form embeds and submits on the live domain (reCAPTCHA working)
- [ ] The course is preselected from the source page; `course_enquiry` is no longer "FIT ELITE…" for other courses
- [ ] UTM hidden fields are filled from the URL
- [ ] Screen 2 appears straight after submit, with the right advisor for every row in §4's test table
- [ ] Wording is right for each form; no "us" around the Careers Consult
- [ ] Phone and email links work on mobile; "Book a time now" opens the right calendar, prefilled
- [ ] All 10 advisor booking links work on the live domain
- [ ] GA4 receives the conversions in §7
- [ ] Works at phone width; keyboard focus moves to the screen 2 heading
- [ ] Stanley sign-off

---

## 9. Being handled by FIT College (FYI, no action for Kook)

These affect what you receive, not what you build:
- **Course question and hidden field defaults.** Remove the FIT Elite defaults and add a course dropdown (§5, option A).
- **Form copy.** Remove the FIT Elite promo text from both forms ("Become a Fitness Professional in 14 Weeks…"). Set the submit buttons: "Book my Careers Consult" and "Get the Information Pack".
- **New hidden fields:** `lead_source_page`, `lead_context`, `assigned_advisor`, `lead_routing`.
- **Lead source** values per form, replacing "August 2024 Promo Page".
- **Decisions:** the international owner, and information pack PDFs per course.
- **Updated postcode table:** 6 populated postcodes are missing, including 2055 North Sydney.

## 10. Questions

Stanley Campbell, FIT College.
