#!/usr/bin/env python3
"""
Build the two handover packs for the lead capture + advisor routing work.

  python3 tools/build_handover.py

  handover/FIT-College-Lead-Capture-Handover/   for Kook: the WEBSITE only
      (form embed, advisor lookup, screen 2, tracking). Ends at the moment
      the HubSpot form is submitted.
  handover/FIT-College-HubSpot-InHouse/         for FIT College: building the
      HubSpot form, properties and workflows in-house.

Each folder is also zipped. Re-run after any change (sheet, courses, HubSpot
IDs, router) so both packs match the repo. Run build_advisor_routing.py and
build_demo.py first.
"""
import csv, datetime, re, shutil, zipfile
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
OUT_PARENT = ROOT / "handover"
KOOK = "FIT-College-Lead-Capture-Handover"
INHOUSE = "FIT-College-HubSpot-InHouse"
TODAY = datetime.date.today().strftime("%-d %B %Y")
OUT = None  # set per pack


def w(rel, text):
    p = OUT / rel
    p.parent.mkdir(parents=True, exist_ok=True)
    p.write_text(text, encoding="utf-8")


def cp(src, rel):
    p = OUT / rel
    p.parent.mkdir(parents=True, exist_ok=True)
    shutil.copy2(ROOT / src, p)


def lead_css():
    css = (ROOT / "css" / "site.css").read_text(encoding="utf-8")
    start = css.index("/* ==========================================================================\n   LEAD CAPTURE")
    end = css.index("/* END LEAD CAPTURE */") + len("/* END LEAD CAPTURE */")
    return css[start:end] + "\n"


def courses():
    rows = list(csv.DictReader(open(ROOT / "data" / "course-routing.csv", encoding="utf-8")))
    return [r for r in rows if not r["course_label"].startswith("*")], {r["course_label"]: r["route_to"] for r in rows}


def advisors():
    return list(csv.DictReader(open(ROOT / "data" / "advisors.csv", encoding="utf-8")))


def start_pack(name):
    global OUT
    OUT = OUT_PARENT / name
    if OUT.exists():
        shutil.rmtree(OUT)
    OUT.mkdir(parents=True)


def zip_pack(name):
    zpath = OUT_PARENT / f"{name}.zip"
    if zpath.exists():
        zpath.unlink()
    with zipfile.ZipFile(zpath, "w", zipfile.ZIP_DEFLATED) as z:
        for p in sorted(OUT.rglob("*")):
            if p.is_file():
                z.write(p, Path(name) / p.relative_to(OUT))
    files = [p for p in OUT.rglob("*") if p.is_file()]
    print(f"Built {OUT.relative_to(ROOT)} ({len(files)} files) and {zpath.relative_to(ROOT)} ({zpath.stat().st_size // 1024} KB)")


def main():
    course_rows, routing = courses()
    adv_name = {a["advisor_id"]: a["display_name"] for a in advisors()}

    # ================= KOOK: website only =================
    start_pack(KOOK)
    cp("FIT-College-Advisor-Routing.pdf", "01-overview/FIT-College-Advisor-Routing.pdf")
    cp("advisor-routing-deck.html", "01-overview/deck/advisor-routing-deck.html")
    cp("js/advisor-data.js", "01-overview/deck/js/advisor-data.js")
    cp("js/advisor-router.js", "01-overview/deck/js/advisor-router.js")
    cp("lead-capture-demo.html", "01-overview/lead-capture-demo.html")
    cp("js/advisor-router.js", "02-website-code/js/advisor-router.js")
    cp("js/advisor-data.js", "02-website-code/js/advisor-data.js")
    w("02-website-code/css/lead-capture.css", lead_css())
    cp("contact.html", "02-website-code/reference/contact.html")
    cp("css/site.css", "02-website-code/reference/site.css")
    w("02-website-code/snippet.html", SNIPPET)
    for f in ["postcode-master.csv", "advisors.csv", "course-routing.csv"]:
        cp(f"data/{f}", f"03-data-and-tools/data/{f}")
    cp("tools/build_advisor_routing.py", "03-data-and-tools/tools/build_advisor_routing.py")
    w("00-START-HERE.md", start_here(course_rows, routing, adv_name))
    zip_pack(KOOK)

    # ================= IN-HOUSE: HubSpot =================
    start_pack(INHOUSE)
    w("00-README.md", inhouse_readme())
    w("form-spec.csv", form_spec_csv(course_rows))
    w("new-contact-properties.csv", PROPS_CSV)
    w("course-dropdown-options.txt",
      "Paste these as the course_interest dropdown options, in this order.\n"
      "Labels AND internal values must match exactly: the website routes on them.\n\n"
      + "\n".join(r["course_label"] for r in course_rows) + "\n")
    w("workflows.md", workflows_md(routing, adv_name))
    cp("data/hubspot-workflow-lists.txt", "owner-workflow-branch-values.txt")
    cp("data/hubspot-postcode-owner.csv", "postcode-owner-lookup.csv")
    cp("data/postcode-sheet-gaps.csv", "postcode-sheet-gaps.csv")
    zip_pack(INHOUSE)


SNIPPET = """<!-- =====================================================================
     FIT College lead capture: everything a page needs.
     One form for every enquiry. Every submission gets the info pack and
     becomes a lead; screen 2 names the advisor and offers book or call.
     ===================================================================== -->

<!-- 1. Where the form goes (contact page). Keep BOTH anchors: sitewide
        "Chat with a Career Advisor" links to #book and "Request an Info
        Pack" links to #infopack. -->
<section id="infopack">
  <div data-lead-flow id="book"></div>
  <noscript><p>Call <a href="tel:1300887017">1300 887 017</a> to speak with a Career Advisor.</p></noscript>
</section>

<!-- Optional: force a course on a specific page, e.g. a course landing page.
     Otherwise the course is preselected from the page the visitor came from.
<div data-lead-flow data-course="Cert IV in Fitness"></div> -->

<!-- 2. HubSpot config, BEFORE the router. FIT College supplies these once
        it has built the form in-house. -->
<script>
  window.FIT_HUBSPOT = {
    region: 'ap1',          // FIT College portal is on the AP1 data centre
    portalId: '',           // [PENDING] from the HubSpot form's embed code
    formId: '',             // [PENDING] from the HubSpot form's embed code
    editor: 'new',          // 'new' (current form editor) or 'legacy'
    bookingMode: 'embed'    // 'embed' = calendar opens in the page; 'link' = new tab
  };
</script>

<!-- 3. Data, then router (order matters). Sitewide is fine. -->
<script src="/js/advisor-data.js"></script>
<script src="/js/advisor-router.js"></script>

<!-- 4. Styles: add css/lead-capture.css to the main stylesheet. -->
"""

PROPS_CSV = """internal_name,label,field_type,group,options,notes
where_do_you_live,Where do you live?,dropdown,Contact information,"Australia;Outside Australia",Visible. Controls postcode vs country (conditional logic).
lead_source_page,Lead source page,single-line text,Conversion information,,Hidden. Page on our site the lead came from. Set by the website.
lead_context,Lead context,single-line text,Conversion information,,"Hidden. e.g. checker-eligible from the funding checker. Set by the website."
assigned_advisor,Assigned Career Advisor,dropdown,Conversion information,"Dean Eggins;Marcus Krause;Matthew Johnson;Nicky Wood;Paul Mountain;Ryan Crilly;Sam Russell;Shay Best;Tess Szabath;Thomas Jordan;FIT College Career Advisor",Hidden. Set by the owner workflow (and by the website on legacy embeds).
lead_routing,Lead routing rule,dropdown,Conversion information,"postcode;course;overseas;unmatched",Hidden. Which rule matched. Use unmatched for sheet-gap reports.
course_interest,Course interest,dropdown,Contact information,See course-dropdown-options.txt,"Visible. Confirm whether this property already exists; if so, align its options."
"""


def form_spec_csv(course_rows):
    rows = [
        ["order", "field (internal name)", "label shown", "type", "visible/hidden", "required", "rules / options"],
        [1, "firstname", "First name", "single-line text", "visible", "yes", ""],
        [2, "lastname", "Last name", "single-line text", "visible", "yes", ""],
        [3, "email", "Email", "email", "visible", "yes", ""],
        [4, "mobilephone", "Mobile", "phone", "visible", "yes", "Turn ON the country code dropdown, default Australia (+61)"],
        [5, "course_interest", "Course you're interested in", "dropdown", "visible", "yes",
         "Options exactly as course-dropdown-options.txt (" + str(len(course_rows)) + " options, default 'Not sure yet')"],
        [6, "where_do_you_live", "Where do you live?", "dropdown", "visible", "yes", "Australia (default) / Outside Australia"],
        [7, "zip", "Postcode", "single-line text", "visible if Australia", "yes", "4 characters. Placeholder: e.g. 4558"],
        [8, "country", "Country", "single-line text", "visible if Outside Australia", "yes", ""],
        [9, "(consent text)", "By submitting, you agree FIT College may contact you about study options by phone, SMS and email. See our Privacy Policy.",
         "rich text / legal consent", "visible", "", "[PENDING compliance check] Link Privacy Policy"],
        [10, "lead_source_page", "", "hidden", "hidden", "", "Set by website"],
        [11, "lead_context", "", "hidden", "hidden", "", "Set by website"],
        [12, "assigned_advisor", "", "hidden", "hidden", "", "Set by owner workflow (website sets it on legacy embeds)"],
        [13, "lead_routing", "", "hidden", "hidden", "", "Set by owner workflow (website sets it on legacy embeds)"],
        [14, "utm_source / utm_medium / utm_campaign / utm_term / utm_content", "", "hidden", "hidden", "", "Set by website from the URL (skip any HubSpot already captures)"],
        [15, "gclid / fbclid", "", "hidden", "hidden", "", "Set by website from the URL"],
        [16, "[PENDING] promotion form hidden fields", "", "hidden", "hidden", "", "Copy from the latest promotion capture form in HubSpot"],
        ["", "", "", "", "", "", ""],
        ["SETTING", "CAPTCHA (reCAPTCHA)", "ON", "", "", "", ""],
        ["SETTING", "Submit button text", "Send me my info pack", "", "", "", ""],
        ["SETTING", "After submit", "Inline thank-you message (never a redirect: the website replaces it with screen 2)", "", "", "", ""],
        ["SETTING", "Pre-populate fields with known values", "OFF for hidden fields", "", "", "", ""],
        ["SETTING", "Form name", "Website - Lead capture (advisor routing) 2026", "", "", "", ""],
        ["SETTING", "Region / editor", "ap1 / note which editor was used (new or legacy)", "", "", "", ""],
    ]
    from io import StringIO
    buf = StringIO()
    csv.writer(buf).writerows(rows)
    return buf.getvalue()


def workflows_md(routing, adv_name):
    overseas = adv_name.get(routing.get("*overseas*"), "the team (round-robin)")
    shay = adv_name.get(routing.get("*unlisted*"), "Shay Best")
    return f"""# HubSpot workflows

All four trigger on a submission of **Website - Lead capture (advisor routing) 2026**.

## 1. Set contact owner (only if blank)

- **Enrol:** form submitted AND Contact owner is unknown. Never overwrite an existing owner: a returning lead stays with the advisor they already know.
- **Branches, top to bottom, first match wins.** These are the same rules the website uses on screen 2:
  1. `course_interest` is any of the non-fitness courses → **{shay}**
  2. `where_do_you_live` = Outside Australia → **{overseas}** [PENDING decision]
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
"""


def start_here(course_rows, routing, adv_name):
    postcode_courses = [r["course_label"] for r in course_rows if r["route_to"] == "postcode"]
    other = [r["course_label"] for r in course_rows if r["route_to"] != "postcode"]
    return f"""# FIT College: lead capture + Career Advisor routing (website)

**Handover for Kook · {TODAY}**
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

1. **Non-fitness course** → {adv_name.get(routing['*unlisted*'], 'Shay Best')}. This covers {', '.join(other)}, and any new course added later.
2. **Lives outside Australia** → {adv_name.get(routing['*overseas*'], 'team')} [PENDING decision].
3. **Postcode in POSTCODE MASTER vNOV26** (2,664 postcodes) → that postcode's advisor. Applies to {', '.join(postcode_courses)}.
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
"""


def inhouse_readme():
    return f"""# FIT College: HubSpot side of the lead capture (in-house)

**{TODAY} · Not for Kook.** Kook's pack covers the website only and ends at form submission.

## Build order

1. **Create the properties** in `new-contact-properties.csv`.
2. **Build the form** to `form-spec.csv`. Then send Kook:
   - the portal ID and form ID
   - which form editor was used (new or legacy)
   - any extra hidden fields the website must fill
3. **Paste the course dropdown options** from `course-dropdown-options.txt`. Labels and values must match exactly, because the website routes on them.
4. **Build the workflows** in `workflows.md`: owner, info pack, SMS and call task.
   - Owner branch values: `owner-workflow-branch-values.txt`
   - Postcode lookup: `postcode-owner-lookup.csv`
5. **Fix the postcode sheet gaps** in `postcode-sheet-gaps.csv`, then re-run `tools/build_advisor_routing.py` and give Kook the new `js/advisor-data.js`.

## Still to do

- [ ] Copy the latest promotion capture form's hidden fields and settings into the new form
- [ ] Info pack guide for each course, plus the "Not sure yet" pack
- [ ] Owner for overseas fitness leads
- [ ] Round-robin team booking link
- [ ] Compliance check on the consent wording (phone, SMS and email)
- [ ] Confirm "NICOLA WILLIAMS" in the sheet is Nicky Wood
"""


if __name__ == "__main__":
    main()
