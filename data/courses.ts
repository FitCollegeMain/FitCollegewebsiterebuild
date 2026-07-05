export interface UnitOfCompetency {
  code: string;
  name: string;
}

export interface DeliveryMode {
  kicker: string; // e.g. "Face to face"
  label: string; // e.g. "Full time"
  rows: [string, string][]; // [field, value]
  bestFor: string;
}

export interface Course {
  slug: string;
  code: string;
  name: string;
  role: string; // career outcome title, e.g. "Fitness Instructor"
  outcome: string;
  description: string;
  duration: string;
  intakes: string;
  stats: {
    units: number;
    nominalHours: number;
    hoursPerWeek: number;
    monthsAllowable: number;
  };
  units: UnitOfCompetency[];
  notes: string[];
}

export const INTAKES = "February, May and September";

/* Delivery modes — identical for both certificates (Course Guide 2026, p5). */
export const DELIVERY_MODES: DeliveryMode[] = [
  {
    kicker: "Face to face",
    label: "Full time",
    rows: [
      ["Delivery", "7 weeks / certificate"],
      ["Schedule", "Day classes, Mon–Thu 10am–1pm"],
      ["Intakes", "Feb · May · Sep"],
      ["Completion", "~8 weeks"],
    ],
    bestFor: "Fastest finish",
  },
  {
    kicker: "Face to face",
    label: "Part time",
    rows: [
      ["Delivery", "14 weeks / certificate"],
      ["Schedule", "Night classes, 2 evenings 6pm–9pm"],
      ["Intakes", "Feb · May · Sep"],
      ["Completion", "~15 weeks"],
    ],
    bestFor: "Around working hours",
  },
  {
    kicker: "Self paced",
    label: "Online",
    rows: [
      ["Enrol", "Anytime"],
      ["Start", "Within 72 hours"],
      ["Self study", "15 hrs / week"],
      ["Completion", "~6 months (up to 12)"],
    ],
    bestFor: "Flexibility",
  },
];

export const COURSES: Course[] = [
  {
    slug: "certificate-iii-in-fitness",
    code: "SIS30321",
    name: "Certificate III in Fitness",
    role: "Fitness Instructor",
    outcome: "Fitness Coach / Gym Instructor",
    description:
      "Your entry point into the fitness industry. Learn to plan and deliver group sessions and gym programs, ready to work as a qualified Gym Instructor.",
    duration: "7 weeks full-time or 14 weeks part-time",
    intakes: INTAKES,
    stats: {
      units: 15,
      nominalHours: 1242,
      hoursPerWeek: 27,
      monthsAllowable: 12,
    },
    units: [
      { code: "HLTAID011", name: "Provide First Aid" },
      { code: "SISFFIT047", name: "Use anatomy & physiology knowledge for safe, effective exercise" },
      { code: "SISFFIT032", name: "Complete pre-exercise screening & service orientation" },
      { code: "SISFFIT033", name: "Complete client fitness assessments" },
      { code: "SISFFIT040", name: "Develop & instruct gym-based programs for individual clients" },
      { code: "SISFFIT035", name: "Plan group exercise sessions" },
      { code: "SISFFIT036", name: "Instruct group exercise sessions" },
      { code: "SISFFIT052", name: "Provide healthy eating information" },
      { code: "SISXIND009", name: "Respond to interpersonal conflict" },
      { code: "SIRXSLS001", name: "Sell to the retail customer" },
      { code: "BSBOPS304", name: "Deliver & monitor a service to customers" },
      { code: "HLTWHS001", name: "Participate in workplace health & safety" },
      { code: "BSBPEF301", name: "Organise personal work priorities" },
      { code: "BSBCRT311", name: "Apply critical thinking skills in a team environment" },
      { code: "CHCPRP003", name: "Reflect on & improve own professional practice" },
    ],
    notes: [
      "Qualifies you to instruct group fitness classes and gym programs as a Fitness Instructor — step one of the Personal Training pathway.",
    ],
  },
  {
    slug: "certificate-iv-in-fitness",
    code: "SIS40221",
    name: "Certificate IV in Fitness",
    role: "Personal Trainer",
    outcome: "Personal Trainer",
    description:
      "Become a fully qualified Personal Trainer. Design tailored client programs, train clients one-on-one, and build the skills to run your own PT business.",
    duration: "7 weeks full-time or 14 weeks part-time",
    intakes: INTAKES,
    stats: {
      units: 17,
      nominalHours: 966,
      hoursPerWeek: 21,
      monthsAllowable: 12,
    },
    units: [
      { code: "SISFFIT041", name: "Develop personalised exercise programs" },
      { code: "SISFFIT042", name: "Instruct personalised exercise sessions" },
      { code: "SISFFIT034", name: "Assess client movement & provide exercise advice" },
      { code: "SISFFIT049", name: "Use exercise science principles in instruction" },
      { code: "SISFFIT043", name: "Personalised programs for body-composition goals" },
      { code: "SISFFIT044", name: "Personalised programs for older clients" },
      { code: "SISFFIT045", name: "Personalised programs for adolescent clients" },
      { code: "SISFFIT046", name: "Plan & instruct online exercise sessions" },
      { code: "SISFFIT050", name: "Support exercise behaviour change" },
      { code: "SISFFIT053", name: "Support healthy eating for fitness clients" },
      { code: "HLTPOP014", name: "Assess readiness for & effect behaviour change" },
      { code: "SISFFIT051", name: "Establish & maintain professional practice" },
      { code: "CHCCOM006", name: "Establish & manage client relationships" },
      { code: "BSBESB302", name: "Develop and present business proposals" },
      { code: "BSBESB301", name: "Investigate business opportunities" },
      { code: "HLTAID009", name: "Provide cardiopulmonary resuscitation" },
      { code: "CHCEDS040", name: "Search & access online information" },
    ],
    notes: [
      "Qualifies you to deliver personalised instruction and programs as a Personal Trainer — step two of the Personal Training pathway.",
      "Includes a four-week Behaviour Project Report from the Nutrition & Behaviour Change topic.",
      "Student visa pathway available (CRICOS 110302D): 25 hrs/week blended study, 6-month student-visa eligible, intakes Jan · Apr · Jul · Oct — see the International Student Pathway for details.",
    ],
  },
];

export function getCourse(slug: string): Course | undefined {
  return COURSES.find((course) => course.slug === slug);
}

/* Complete PT — the Certificate III + IV package. Almost every student buys
   both certificates together; this is the named bundle. */
export const COMPLETE_PT = {
  name: "Complete PT",
  descriptor: "The Certificate III + IV Package",
  totalUnits: 32,
  steps: [
    {
      kicker: "Step 01 · Instruct",
      title: "Certificate III in Fitness",
      code: "SIS30321",
      text: "Qualifies you to instruct group fitness classes and gym programs as a Fitness Instructor.",
    },
    {
      kicker: "Step 02 · Personalise",
      title: "Certificate IV in Fitness",
      code: "SIS40221",
      text: "Qualifies you to deliver personalised instruction and programs as a Personal Trainer.",
    },
  ],
};

/* Verifiable specifics — provable claims used in place of superlatives
   (per the 2026 growth strategy: "real classrooms, provable claims").
   Shown as a continuous side-scrolling USP banner on the home page. */
export const PROOF_POINTS = [
  {
    stat: "5 days",
    label: "Assessments marked within five business days",
  },
  {
    stat: "3 intakes",
    label: "Fixed February, May and September intakes — doors close, then open again",
  },
  {
    stat: "0 hours",
    label: "No mandatory placement hours required to graduate",
  },
  {
    stat: "20 campuses",
    label: "Real classrooms inside working gyms, in every mainland state plus Tasmania",
  },
  {
    stat: "24/7",
    label: "Round-the-clock help requests through the learning platform",
  },
  {
    stat: "12 hours",
    label: "Of live virtual coaching support available every week",
  },
  {
    stat: "$0 interest",
    label: "Interest-free payment plans on every course",
  },
  {
    stat: "Since 2009",
    label: "Graduating work-ready trainers across Australia and internationally",
  },
  {
    stat: "100% TAE",
    label: "Every educator is a TAE-qualified PT with real industry experience",
  },
  {
    stat: "1 per campus",
    label: "A Careers Liaison at every campus connecting you to local jobs",
  },
];

/* International Student Pathway — CRICOS-approved courses for student-visa
   study (fitcollege.edu.au/courses/international-fitness-student-pathway). */
export const INTERNATIONAL = {
  name: "International Student Pathway",
  slug: "international-fitness-student-pathway",
  courses: [
    {
      code: "SIS30321",
      name: "Certificate III in Fitness",
      cricos: "110301E",
      duration: "Two terms — 6-month student visa",
    },
    {
      code: "SIS40221",
      name: "Certificate IV in Fitness",
      cricos: "110302D",
      duration: "Two terms — 6-month student visa",
    },
    {
      code: "SIS50321",
      name: "Diploma of Sport — Coaching",
      cricos: "114406H",
      duration: "One year of study",
    },
  ],
  bundle:
    "The most popular pathway bundles the Cert III & IV plus the Diploma for two full years of study.",
  campuses: ["Brisbane", "Gold Coast", "Sydney", "Melbourne", "Perth", "Tasmania"],
  englishTests: [
    { test: "IELTS Academic", requirement: "6.0 overall, no band less than 5.5" },
    {
      test: "TOEFL iBT",
      requirement: "64 overall — min. Reading 5, Listening 5, Speaking 14, Writing 15",
    },
    {
      test: "Cambridge English: Advanced (CAE)",
      requirement: "169 overall, no less than 154 in any component",
    },
    {
      test: "Pearson PTE Academic",
      requirement: "50 overall, no less than 36 in any communication band",
    },
  ],
};

/* FIT Elite™ — the Dual-Career Personal Trainer Program.
   Complete PT + Advanced Skills (30 CPD) + a specialisation stream. */
export const FIT_ELITE = {
  name: "FIT Elite™",
  descriptor: "The Dual-Career Personal Trainer Program",
  includes: [
    "Complete PT — SIS30321 Certificate III + SIS40221 Certificate IV in Fitness",
    "Advanced Skills — boxing, suspension and kettlebell training (30 CPD, no extra study load)",
    "Your choice of specialisation stream",
  ],
  streams: [
    {
      name: "NDIS Disability Skill Set (CHCSS00130)",
      detail:
        "Qualify to work in disability support alongside your PT qualification — paid hours from week one while your client book grows.",
    },
    {
      name: "Strength & Conditioning (ASCA Level 1 accredited)",
      detail:
        "Coach athletes and sports teams with the Australian Strength and Conditioning Association's Level 1 accreditation.",
    },
  ],
};
