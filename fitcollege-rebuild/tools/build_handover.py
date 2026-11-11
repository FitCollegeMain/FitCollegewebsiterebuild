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

    # ================= KOOK: documentation + data only =================
    start_pack(KOOK)
    w("00-START-HERE.md", start_here())
    cp("handover-src/SPEC.md", "SPEC.md")
    cp("handover-src/cta-inventory.csv", "cta-inventory.csv")
    cp("FIT-College-Advisor-Routing.pdf", "FIT-College-Advisor-Routing.pdf")
    cp("handover-src/FIT-College-Course-Guide-2026.pdf", "assets/FIT-College-Course-Guide-2026.pdf")
    w("data/advisor-lookup.json", lookup_json())
    for f in ["advisors.csv", "postcode-master.csv", "course-routing.csv"]:
        cp(f"data/{f}", f"data/{f}")
    zip_pack(KOOK)

    # ================= IN-HOUSE: HubSpot =================
    start_pack(INHOUSE)
    w("00-README.md", inhouse_readme())
    cp("handover-src/hubspot-form-fixes.md", "hubspot-form-fixes.md")
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

All four trigger on a submission of either website form: **Careers Consult** or **Information Pack**.

## 1. Set contact owner (only if blank)

- **Enrol:** form submitted AND Contact owner is unknown. Never overwrite an existing owner: a returning lead stays with the advisor they already know.
- **Branches, top to bottom, first match wins.** These are the same rules the website uses on screen 2:
  1. `course_enquiry` is any of the non-fitness courses → **{shay}**
  2. Australian citizen or permanent resident = No → **{overseas}** [PENDING decision]
  3. to 11. `zip` is any of [list] → that advisor (one branch per advisor)
  - None matched → round-robin across Career Advisors
- In every branch, also set `assigned_advisor` and `lead_routing` (postcode / course / overseas / unmatched).
- Paste-ready values: `owner-workflow-branch-values.txt`.
- **Check first:** whether HubSpot accepts this many values in one "is any of" condition (Ryan Crilly has 1,057). If not, split a branch into several OR'd conditions, or use a custom-code action (Operations Hub) with `postcode-owner-lookup.csv`.

## 2. Send the info pack (everyone)

- Email the guide for `course_enquiry`, one branch per course.
- For "Not sure yet", send the general course guide.
- [PENDING] Which guides exist for each course.

## 3. SMS speed-to-lead

- Name the advisor and repeat "within 1 business day".
- If the lead has already booked through the calendar, send a booking confirmation instead of "we'll call you shortly".

## 4. Task for the owner

- "Call new lead", due in 1 business day, so the promise on screen 2 is kept.
"""


def lookup_json():
    """advisors + postcodes + course rules in one JSON file, for the website."""
    import json
    advs = {}
    for a in advisors():
        advs[a["advisor_id"]] = {
            "name": a["display_name"],
            "firstName": a["display_name"].split()[0] if a["advisor_id"] != "_fallback" else "",
            "phone": a["phone"].strip(),
            "email": a["email"].strip().lower(),
            "meetingUrl": a["meeting_url"].strip(),
        }
    by_sheet = {a["sheet_owner_name"].strip().upper(): a["advisor_id"] for a in advisors() if a["sheet_owner_name"].strip()}
    pcs = {}
    for r in csv.DictReader(open(ROOT / "data" / "postcode-master.csv", encoding="utf-8")):
        pcs[r["postcode"].zfill(4)] = by_sheet[r["owner"].strip().upper()]
    _, routing = courses()
    doc = {
        "_about": "FIT College advisor lookup. Rules (first match wins): 1) courses[course] is an advisor id -> that advisor; "
                  "2) not an Australian citizen/PR -> courses['*overseas*']; 3) postcodes[postcode] -> that advisor; "
                  "4) otherwise -> advisors['_fallback']. Courses not listed -> courses['*unlisted*']. "
                  "infoPacks: courses whose Information Pack screen shows a 'Download the course guide' button (host the PDF in assets/). "
                  "Generated " + TODAY + " from POSTCODE MASTER vNOV26.",
        "advisors": advs,
        "postcodes": dict(sorted(pcs.items())),
        "courses": routing,
        # The 2026 Course Guide covers Cert III, Cert IV and FIT Elite only.
        "infoPacks": {c: "FIT-College-Course-Guide-2026.pdf" for c in
                      ["Not sure yet", "FIT Elite™ Dual-Career PT Program", "Cert III in Fitness", "Cert IV in Fitness"]
                      if c in routing},
    }
    return json.dumps(doc, ensure_ascii=False, indent=1) + "\n"


def start_here():
    return f"""# FIT College: lead capture + Career Advisor routing

**Handover for Kook · {TODAY}**
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
| `assets/FIT-College-Course-Guide-2026.pdf` | The information pack: host it on the site for the screen 2 download button |

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
- [ ] HubSpot form tidy-up, including the new course dropdown (FIT College will confirm its field name), FIT Elite defaults removed, button labels and new hidden fields
- [ ] Confirm Diploma of Sport, Strength & Conditioning and CEC route by postcode
- [ ] Updated postcode table (6 missing populated postcodes)

FIT College will send an updated `advisor-lookup.json` whenever territories or advisor details change.
"""


def inhouse_readme():
    return f"""# FIT College: HubSpot side of the lead capture (in-house)

**{TODAY} · Not for Kook.** Kook's pack covers the website only and ends at form submission.

## Build order

1. **Fix the two live forms** (`hubspot-form-fixes.md`). Both are copies of the August 2024 FIT Elite promo form. Tell Kook if any field names change.
2. **Build the workflows** in `workflows.md`: owner, information pack, SMS and call task.
   - Owner branch values: `owner-workflow-branch-values.txt`
   - Postcode lookup: `postcode-owner-lookup.csv`
   - Tip: if the website already filled `assigned_advisor` (see the fixes list), the owner workflow can branch on that instead of the long postcode lists.
3. **Fix the postcode sheet gaps** (`postcode-sheet-gaps.csv`), then send Kook a new `advisor-lookup.json`. Run `tools/build_handover.py` to regenerate it.

## Still to do

- [ ] Fix both live forms (`hubspot-form-fixes.md`)
- [ ] Add the course dropdown to both forms (options in `hubspot-form-fixes.md`) and tell Kook the field name
- [ ] Make Post Code optional, or hidden, when citizen/PR = No, so international leads can come through with a blank postcode
- [ ] Information pack email: the 2026 Course Guide covers Cert III, Cert IV and FIT Elite; decide what other courses receive (Diploma, S&C, CEC and the non-fitness courses)
- [ ] Confirm Diploma of Sport, Strength & Conditioning and CEC route by postcode
- [ ] Round-robin team booking link
- [ ] Compliance check on the consent wording (phone, SMS and email)
- [ ] Confirm "NICOLA WILLIAMS" in the sheet is Nicky Wood
"""


if __name__ == "__main__":
    main()
