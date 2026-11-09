#!/usr/bin/env python3
"""
Build the postcode -> Career Advisor routing data for the lead capture flow.

SOURCE OF TRUTH
  data/postcode-master.csv   postcode,state,owner   (exported from POSTCODE MASTER xlsx)
  data/advisors.csv          one row per advisor: email, HubSpot meeting URL, owner ID
  data/course-routing.csv    which courses route by postcode vs to a named advisor

OUTPUTS (never hand-edit these, re-run this script)
  js/advisor-data.js               loaded by the website (works from file:// and any CMS)
  data/hubspot-postcode-owner.csv  for HubSpot: postcode -> advisor email / owner ID

USAGE
  python3 tools/build_advisor_routing.py                       # rebuild from the CSVs
  python3 tools/build_advisor_routing.py "POSTCODE MASTER.xlsx" # refresh the CSV from a new
                                                                # spreadsheet first (needs openpyxl)
The script stops with an error if a postcode has two owners or an owner in
the sheet has no matching row in advisors.csv, so a bad sheet can't ship.
"""
import csv, json, re, sys, collections, datetime
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
PC_CSV = ROOT / "data" / "postcode-master.csv"
ADV_CSV = ROOT / "data" / "advisors.csv"
COURSE_CSV = ROOT / "data" / "course-routing.csv"
OUT_JS = ROOT / "js" / "advisor-data.js"
OUT_HS = ROOT / "data" / "hubspot-postcode-owner.csv"
OUT_WF = ROOT / "data" / "hubspot-workflow-lists.txt"


def refresh_from_xlsx(path):
    import openpyxl  # only needed for this step
    ws = openpyxl.load_workbook(path, read_only=True).worksheets[0]
    rows = list(ws.iter_rows(values_only=True))
    header = [str(h or "").strip().upper() for h in rows[0]]
    i_pc, i_st, i_ow = header.index("POSTCODE"), header.index("STATE"), header.index("OWNER")
    with open(PC_CSV, "w", newline="") as f:
        w = csv.writer(f)
        w.writerow(["postcode", "state", "owner"])
        for r in rows[1:]:
            if r[i_pc] is None:
                continue
            w.writerow([str(r[i_pc]).strip().split(".")[0].zfill(4),
                        str(r[i_st] or "").strip(), str(r[i_ow] or "").strip()])
    print(f"Refreshed {PC_CSV.name} from {path}")


def main():
    if len(sys.argv) > 1:
        refresh_from_xlsx(sys.argv[1])

    advisors = list(csv.DictReader(open(ADV_CSV, newline="", encoding="utf-8")))
    by_sheet_name = {a["sheet_owner_name"].strip().upper(): a for a in advisors if a["sheet_owner_name"].strip()}

    errors, warnings = [], []
    mapping, states = {}, {}
    for n, row in enumerate(csv.DictReader(open(PC_CSV, newline="", encoding="utf-8")), start=2):
        pc = row["postcode"].strip().zfill(4)
        owner = row["owner"].strip().upper()
        if not re.fullmatch(r"\d{4}", pc):
            errors.append(f"line {n}: postcode '{row['postcode']}' is not 4 digits")
            continue
        if owner not in by_sheet_name:
            errors.append(f"line {n}: owner '{row['owner']}' has no row in advisors.csv (sheet_owner_name)")
            continue
        aid = by_sheet_name[owner]["advisor_id"]
        if pc in mapping and mapping[pc] != aid:
            errors.append(f"postcode {pc} assigned to both {mapping[pc]} and {aid}")
        mapping[pc] = aid
        states[pc] = row["state"].strip()

    # Course routing: "postcode" or an advisor_id. *unlisted* and *overseas* are defaults.
    adv_ids = {a["advisor_id"] for a in advisors}
    course_routing = {}
    for n, row in enumerate(csv.DictReader(open(COURSE_CSV, newline="", encoding="utf-8")), start=2):
        label, route = row["course_label"].strip(), row["route_to"].strip()
        if route != "postcode" and route not in adv_ids:
            errors.append(f"course-routing.csv line {n}: route_to '{route}' is not 'postcode' or an advisor_id")
        course_routing[label] = route
    for key in ("*unlisted*", "*overseas*"):
        if key not in course_routing:
            errors.append(f"course-routing.csv is missing the {key} row")

    if errors:
        print("BUILD FAILED:\n  " + "\n  ".join(errors))
        sys.exit(1)

    counts = collections.Counter(mapping.values())
    for a in advisors:
        if a["advisor_id"] == "_fallback":
            continue
        if not counts.get(a["advisor_id"]) and a["advisor_id"] not in course_routing.values():
            warnings.append(f"{a['display_name']} owns no postcodes and no courses, so is never matched")
        if not a["meeting_url"].strip():
            warnings.append(f"{a['display_name']} has no meeting_url yet")

    # Website data: advisor details (no staff mobiles, by design) + postcodes grouped per advisor.
    public_advisors = {
        a["advisor_id"]: {
            "name": a["display_name"],
            "firstName": a["display_name"].split()[0] if a["advisor_id"] != "_fallback" else "",
            "email": a["email"],
            "meetingUrl": a["meeting_url"].strip(),
            "hubspotOwnerId": a["hubspot_owner_id"].strip(),
        }
        for a in advisors
    }
    grouped = collections.defaultdict(list)
    for pc, aid in sorted(mapping.items()):
        grouped[aid].append(pc)

    stamp = datetime.date.today().isoformat()
    js = (
        "/* GENERATED by tools/build_advisor_routing.py on " + stamp + ". Do not hand-edit:\n"
        "   change data/postcode-master.csv or data/advisors.csv and re-run the script.\n"
        f"   {len(mapping)} postcodes across {len(grouped)} advisors. */\n"
        "window.FIT_ADVISORS = " + json.dumps(public_advisors, indent=1) + ";\n"
        "window.FIT_POSTCODES_BY_ADVISOR = {\n"
        + ",\n".join(f' "{aid}": "{" ".join(pcs)}"' for aid, pcs in grouped.items())
        + "\n};\n"
        "/* Course routing: 'postcode' or an advisor id. Order = order shown in the form. */\n"
        "window.FIT_COURSE_ROUTING = " + json.dumps(course_routing, indent=1, ensure_ascii=False) + ";\n"
    )
    OUT_JS.write_text(js, encoding="utf-8")

    adv_by_id = {a["advisor_id"]: a for a in advisors}
    with open(OUT_HS, "w", newline="", encoding="utf-8") as f:
        w = csv.writer(f)
        w.writerow(["postcode", "state", "advisor_name", "advisor_email", "hubspot_owner_id"])
        for pc, aid in sorted(mapping.items()):
            a = adv_by_id[aid]
            w.writerow([pc, states[pc], a["display_name"], a["email"], a["hubspot_owner_id"]])

    # Paste-ready values for the HubSpot "set contact owner" workflow.
    shay_courses = [c for c, r in course_routing.items() if r != "postcode" and not c.startswith("*")]
    lines = [
        "HUBSPOT OWNER WORKFLOW: paste-ready branch values (generated " + stamp + ")",
        "Enrol when: form submission on the lead capture form AND Contact owner is unknown.",
        "Branches are checked top to bottom; first match wins (same rules as the website).",
        "",
        "BRANCH 1  Course interest is any of  ->  " + adv_by_id[course_routing["*unlisted*"]]["display_name"],
        "  " + "; ".join(shay_courses),
        "  (Plus any new course on the site that is not routed by postcode.)",
        "",
        "BRANCH 2  Where do you live = Outside Australia  ->  " + adv_by_id.get(course_routing["*overseas*"], {}).get("display_name", "team fallback"),
        "",
    ]
    for k, (aid, pcs) in enumerate(sorted(grouped.items(), key=lambda x: -len(x[1])), start=3):
        lines += [f"BRANCH {k}  Postal code is any of ({len(pcs)} values)  ->  {adv_by_id[aid]['display_name']}", "  " + ", ".join(pcs), ""]
    lines += ["NONE MATCHED  ->  round-robin across Career Advisors (lead_routing = unmatched)"]
    OUT_WF.write_text("\n".join(lines) + "\n", encoding="utf-8")

    print(f"OK: {len(mapping)} postcodes -> {OUT_JS.relative_to(ROOT)}, {OUT_HS.relative_to(ROOT)}")
    for aid, c in counts.most_common():
        print(f"  {adv_by_id[aid]['display_name']:<18} {c:>5}")
    if warnings:
        print("WARNINGS:\n  " + "\n  ".join(warnings))


if __name__ == "__main__":
    main()
