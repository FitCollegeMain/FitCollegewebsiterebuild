# Sitemap — Previous Site vs Rebuild

Compares the **previous** live site (`fitcollege.edu.au`, from its
`sitemap.xml`) against **this** rebuild, and gives the old→new redirect map
you'll need to preserve SEO. Legend: ✅ rebuilt · 🔀 merged into another page ·
🕒 not yet rebuilt · 🗑️ intentionally retired.

---

## 1. This rebuild — full sitemap (33 pages)

```
/                                                     Home
/courses                                              Courses index
  /courses/certificate-iii-in-fitness                 Cert III (SIS30321)
  /courses/certificate-iv-in-fitness                  Cert IV (SIS40221)
  /courses/complete-pt                                Complete PT (Cert III + IV)
  /courses/international-fitness-student-pathway       CRICOS / student visa
/fit-elite                                            FIT Elite™ dual-career program
/study-online                                         Online fitness courses
/locations                                            Campus finder (filter by state)
  /locations/brisbane-fortitude-valley                ┐
  /locations/brisbane-carseldine                      │
  /locations/cairns-city-centre                       │
  /locations/gold-coast-nerang                        │
  /locations/ipswich                                  │
  /locations/sunshine-coast-maroochydore              │
  /locations/toowoomba                                │
  /locations/newcastle                                │  20 campus pages,
  /locations/sydney-caringbah                         │  one per campus,
  /locations/sydney-city-centre                       │  statically generated
  /locations/sydney-penrith                           │  from data/locations.ts
  /locations/sydney-parramatta                        │
  /locations/geelong-north                            │
  /locations/melbourne-south-melbourne                │
  /locations/melbourne-wantirna                       │
  /locations/adelaide-glenelg                         │
  /locations/perth-joondalup                          │
  /locations/perth-bibra-lake                         │
  /locations/canberra-deakin                          │
  /locations/hobart                                   ┘
/funding                                              QLD Career Start funding
/faqs                                                 FAQs (+ FAQPage JSON-LD)
/about                                                About FIT College
/contact                                              Contact (form backend TODO)
```

> Nav note: `/about`, `/faqs` and `/contact` are grouped under a **Contact**
> dropdown in the header (mirroring the Courses dropdown).

---

## 2. Previous site — sitemap, grouped

The old sitemap listed ~95 URLs. Grouped by intent:

**Core**
- `/` · `/faqs` + `/FAQs-1837/` · `/thank-you/`

**Study / about (RTO info)**
- `/Study/AboutUs-446/` · `/Study/EnrolNow-385/` · `/Study/Funding-513/`
- `/Study/StudentHandbook-516/` · `/Study/AuditInformation-574/`
- `/Study/AboutUs/USIUniqueStudentIdentifier-475/` · `/Study/AboutUs/RPL-478/`
- `/Study/Salesforce-627/` (internal)

**Courses**
- `/Courses/Courses-482/` (index) · `/courses/fitness-professional`
- `/courses/certificate-iii-in-fitness` · `/courses/certificate-iv-in-fitness`
- `/courses/elite-personal-trainer` · `/courses/international-fitness-student-pathway`
- `/courses/diploma-of-sport-coaching` · `/courses/strength-and-conditioning`
- `/Courses/DisabilityWorker-780/` · `/nds-disability-course` · `/courses/disability-support`
- `/courses/first-aid-provider` · `/courses/HLTAID011-provide-first-aid` · `/courses/HLTAID009-provide-cpr`
- `/courses/trainer-and-assessor` · `/courses/tae40122-certificate-iv-in-training-and-assessment` · `/courses/upgrade-tae40116-to-tae40122`
- `/courses/certificate-iv-in-weight-management` · `/courses/certificate-iii-in-travel`

**Study online**
- `/study-online/online-fitness-courses`
- `/StudyOnline/StudyOnlineRequirements-605/` · `/StudyOnline/TourOnlineLearningPlatform/`
- `/StudyOnline/CourseAssessmentProcess-607/` · `/StudyOnline/StudyOnlineLocations-608/`
- `/StudyOnline/StudyOnlineCoursesOffered-609/`

**Locations**
- `/Locations/LocationFinder-453/` (finder) + ~22 `/locations/<slug>` pages
- Plus legacy variants: `/Locations/Newland-1812/`, `/Locations/Geelong-1813/`,
  `/Locations/AdelaideGlenelg-1819/`, `/Locations/Adelaide-Glenelg-82/`,
  `/Locations/Geelong-NorthGeelong-81/`

**Contact / legal**
- `/Contact` · `/Contact/PrivacyPolicy-360/` · `/Contact/TermsofUse-361/`
- `/Contact/RequestanInfoPack-514/` (+ `(backup)-659/`) · `/Contact/StaffLeadForm-597/`
- `/Contact/Slideshow-363/` · `/BecomeaPersonalTrainer/FITCollegeInsurance-603/`

**Promo / affiliate / campaign landing pages** (all one-off marketing)
- `/launch-sale-fit-elite` · `/Christmaspromo` · `/JanuaryPromo` · `/MarchMadnessSale`
- `/Affiliatedeal` · `/bondpathway` · `/Expo` · `/LinAs` · `/landing` (+`-thanks`)
- `/promo` (+`-thanks`) · and every `/Contact/…AffiliatePage-…`, `…Partner…`,
  `…OpenDay…`, `…Offer…`, `…Promo…` URL.

---

## 3. Old → new redirect map

Set these as 301s at the host/CDN before cutover.

| Previous URL | New URL | |
| --- | --- | --- |
| `/` | `/` | ✅ |
| `/faqs`, `/FAQs-1837/` | `/faqs` | ✅ |
| `/Courses/Courses-482/` | `/courses` | ✅ |
| `/courses/certificate-iii-in-fitness` | `/courses/certificate-iii-in-fitness` | ✅ |
| `/courses/certificate-iv-in-fitness` | `/courses/certificate-iv-in-fitness` | ✅ |
| `/courses/fitness-professional` | `/courses` | 🔀 |
| `/courses/elite-personal-trainer` | `/fit-elite` | ✅ |
| `/courses/international-fitness-student-pathway` | `/courses/international-fitness-student-pathway` | ✅ |
| `/courses/strength-and-conditioning` | `/fit-elite` | 🔀 stream within FIT Elite |
| `/nds-disability-course`, `/courses/disability-support`, `/Courses/DisabilityWorker-780/` | `/fit-elite` | 🔀 NDIS stream within FIT Elite |
| `/study-online/online-fitness-courses` | `/study-online` | ✅ |
| `/StudyOnline/*` (requirements, tour, assessment, locations, courses-offered) | `/study-online` | 🔀 consolidated |
| `/Study/Funding-513/` | `/funding` | ✅ |
| `/Study/AboutUs-446/` | `/about` | ✅ |
| `/Study/EnrolNow-385/`, `/Contact/RequestanInfoPack-514/` (+backup) | `/contact` (opens lead-capture modal) | 🔀 |
| `/Locations/LocationFinder-453/` | `/locations` | ✅ |
| `/locations/nerang` | `/locations/gold-coast-nerang` | ✅ slug changed |
| `/locations/hobart-city-centre` | `/locations/hobart` | ✅ slug changed |
| `/Locations/Geelong-1813/`, `/Locations/Geelong-NorthGeelong-81/` | `/locations/geelong-north` | ✅ |
| `/Locations/AdelaideGlenelg-1819/`, `/Locations/Adelaide-Glenelg-82/` | `/locations/adelaide-glenelg` | ✅ |
| other `/locations/<slug>` | same `<slug>` | ✅ |
| `/Contact`, `/Contact/*` | `/contact` | ✅ / 🔀 |
| `/thank-you/`, `/landing-thanks`, `/promo-thanks` | `/contact` (post-submit state) | 🔀 |
| all promo/affiliate landing pages | `/` (or campaign page if revived) | 🗑️ |

---

## 4. Content gaps — old pages with no rebuilt equivalent

Decisions for the business, grouped by recommendation:

**🕒 Consider rebuilding (real content, currently missing):**
- **RTO / compliance pages:** Student Handbook, Audit Information, USI, RPL
  info, Privacy Policy, Terms of Use. Legally/compliance-expected for an RTO — these
  should return as simple content pages (or link to PDFs).
- **First Aid** (`HLTAID011`, `HLTAID009`) and **TAE / Trainer & Assessor**
  (`tae40122`, upgrade path) courses — real offerings not in the rebuilt
  catalogue. Add to `data/courses.ts` if still sold.
- **Diploma of Sport Coaching** — referenced inside the International pathway
  but has no standalone page.
- **Insurance** (`/BecomeaPersonalTrainer/FITCollegeInsurance-603/`).

**❓ Confirm still offered, then add or retire:**
- Cert IV in Weight Management, Cert III in Travel — unusual; verify.
- Prahran and Fiji campuses (in old material, not in `locations.ts`).

**🗑️ Intentionally retired (no action beyond redirect to `/`):**
- All seasonal promos and affiliate/partner landing pages, `/Expo`, `/LinAs`,
  `/landing`, `/promo`, internal `/Study/Salesforce-627/` and staff forms.

> Counts: previous site ≈ 95 URLs (heavily inflated by one-off promo pages);
> rebuild = 32 evergreen pages. The reduction is deliberate — the rebuild is
> the durable core; campaign pages are handled separately by marketing.
