# HubSpot form fixes (in-house)

**Checked 11 Nov 2026 by loading both live forms.** Not for Kook.

| Form | Form ID | Share link |
|---|---|---|
| Information Pack | `cd7c4efe-24e7-4a2d-b495-fc3daf42bd76` | https://share-ap1.hsforms.com/1zXxO_iTnSi20lfw9r0K9dgcmydz |
| Careers Consult | `2e5b35fb-e821-4f50-9f6f-db82c5eba654` | https://share-ap1.hsforms.com/1Lls1--ghT1Cfb9uCxeumVAcmydz |

Both forms are currently **identical copies of the August 2024 FIT Elite promo form**. As they stand, every website lead would be recorded as a FIT Elite promo lead.

## Must fix before go-live

1. **`course_enquiry` defaults to "FIT ELITE™ PERSONAL TRAINER COURSE"** (hidden) in both forms.
   - Recommended: make it a **visible dropdown**, "Course you're interested in", with the options below.
   - Kook will preselect it from the page the visitor came from.
   - Whatever you choose, remove the FIT Elite default.
2. **`leadsource` is "August 2024 Promo Page"** in both forms. Set a value per form, e.g. "Website – Careers Consult" and "Website – Information Pack".
3. **Promo copy is built into both forms.** Remove "Become a Fitness Professional in 14 Weeks" and "Study Certificate III (SIS30321) & IV (SIS40221) in Fitness 100% on Campus". Both forms now appear on every course page.
4. **Both submit buttons say "Request Info Pack".** Change them to:
   - Careers Consult: "Book my Careers Consult"
   - Information Pack: "Get the Information Pack"
5. **Add hidden fields** for the website to fill. Create the contact properties first if they don't exist.
   - `lead_source_page`: the page the visitor came from
   - `lead_context`: e.g. "checker-eligible" from the funding checker
   - `assigned_advisor`: the advisor the website matched. Make it a dropdown of the 10 advisor names plus "FIT College Career Advisor"
   - `lead_routing`: which rule matched, as a dropdown: postcode / course / overseas / unmatched
6. **After submit: show an inline thank-you message, not a redirect.** The website replaces it with its own panel. A redirect would skip that panel.

## Course dropdown options

The labels and internal values must match exactly, because the website routes on them:

```
Not sure yet
FIT Elite™ Dual-Career PT Program
Cert III in Fitness
Cert IV in Fitness
Diploma of Sport (Coaching)
Strength & Conditioning
CEC Short Courses
Disability Support Skill Set
Cert IV in Training & Assessment
TAE Upgrade (TAE40116 to TAE40122)
First Aid / CPR
Cert III in Travel
International Student Pathways
```

If `course_enquiry` must keep its existing option values, send Kook a mapping (website label → HubSpot value) instead.

## Worth reviewing

- **Post Code is required.** Overseas visitors must enter something. A non-Australian postcode simply won't match an advisor and goes to the team.
- **Citizen / permanent resident question.** The website treats **No** as an international lead (routing rule 2). Decide who owns those leads.
- **Consent text** says "FIT College needs the contact information you provide to contact you about our products and services". Every lead now gets an SMS, so consider naming phone, SMS and email.
- **Old hidden fields:**
  - `n00n6f00000emalt` and `n00n6f00000luzqn` look like old Salesforce field IDs
  - `widgetanalyticsid` and `have_you_put_this_person_through_the_unquailed_email_sequence_`

  Keep them only if something still uses them.
- **reCAPTCHA** is on in both forms. Keep it.
