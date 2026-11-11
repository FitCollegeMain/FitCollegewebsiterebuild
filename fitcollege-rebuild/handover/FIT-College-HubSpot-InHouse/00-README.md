# FIT College: HubSpot side of the lead capture (in-house)

**11 November 2026 · Not for Kook.** Kook's pack covers the website only and ends at form submission.

## Build order

1. **Fix the two live forms** (`hubspot-form-fixes.md`). Both are copies of the August 2024 FIT Elite promo form. Tell Kook if any field names change.
2. **Build the workflows** in `workflows.md`: owner, information pack, SMS and call task.
   - Owner branch values: `owner-workflow-branch-values.txt`
   - Postcode lookup: `postcode-owner-lookup.csv`
   - Tip: if the website already filled `assigned_advisor` (see the fixes list), the owner workflow can branch on that instead of the long postcode lists.
3. **Fix the postcode sheet gaps** (`postcode-sheet-gaps.csv`), then send Kook a new `advisor-lookup.json`. Run `tools/build_handover.py` to regenerate it.

## Still to do

- [ ] Fix both live forms (`hubspot-form-fixes.md`)
- [ ] Info pack guide for each course, plus the "Not sure yet" guide
- [ ] Info pack PDF links per course, if "Download" should be a real download (Kook adds a button)
- [ ] Owner for international (non-citizen / non-PR) leads
- [ ] Confirm Diploma of Sport, Strength & Conditioning and CEC route by postcode
- [ ] Round-robin team booking link
- [ ] Compliance check on the consent wording (phone, SMS and email)
- [ ] Confirm "NICOLA WILLIAMS" in the sheet is Nicky Wood
