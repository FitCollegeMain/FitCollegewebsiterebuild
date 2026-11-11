# FIT College: HubSpot side of the lead capture (in-house)

**11 November 2026 · Not for Kook.** Kook's pack covers the website only and ends at form submission.

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
