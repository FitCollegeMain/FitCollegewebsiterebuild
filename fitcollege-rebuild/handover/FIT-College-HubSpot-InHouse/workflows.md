# HubSpot workflows

All four trigger on a submission of **Website - Lead capture (advisor routing) 2026**.

## 1. Set contact owner (only if blank)

- **Enrol:** form submitted AND Contact owner is unknown. Never overwrite an existing owner: a returning lead stays with the advisor they already know.
- **Branches, top to bottom, first match wins.** These are the same rules the website uses on screen 2:
  1. `course_interest` is any of the non-fitness courses → **Shay Best**
  2. `where_do_you_live` = Outside Australia → **FIT College Career Advisor** [PENDING decision]
  3. to 11. `zip` is any of [list] → that advisor (one branch per advisor)
  - None matched → round-robin across Career Advisors
- In every branch, also set `assigned_advisor` and `lead_routing` (postcode / course / overseas / unmatched).
- Paste-ready values: `owner-workflow-branch-values.txt`.
- **Check first:** whether HubSpot accepts this many values in one "is any of" condition (Ryan Crilly has 1,057). If not, split a branch into several OR'd conditions, or use a custom-code action (Operations Hub) with `postcode-owner-lookup.csv`.

## 2. Send the info pack (everyone)

- Email the guide for `course_interest`, one branch per course.
- For "Not sure yet", send the general course guide.
- [PENDING] Which guides exist for each course.

## 3. SMS speed-to-lead

- Name the advisor and repeat "within 1 business day".
- If the lead has already booked through the calendar, send a booking confirmation instead of "we'll call you shortly".

## 4. Task for the owner

- "Call new lead", due in 1 business day, so the promise on screen 2 is kept.
