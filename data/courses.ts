export interface Course {
  code: string;
  name: string;
  outcome: string;
  description: string;
  duration: string;
  intakes: string;
}

export const INTAKES = "February, May and September";

export const COURSES: Course[] = [
  {
    code: "SIS30321",
    name: "Certificate III in Fitness",
    outcome: "Fitness Coach / Gym Instructor",
    description:
      "Your entry point into the fitness industry. Learn to plan and deliver group sessions and gym programs, ready to work as a qualified Gym Instructor.",
    duration: "14 weeks full-time or 29 weeks part-time",
    intakes: INTAKES,
  },
  {
    code: "SIS40221",
    name: "Certificate IV in Fitness",
    outcome: "Personal Trainer",
    description:
      "Become a fully qualified Personal Trainer. Design tailored client programs, train clients one-on-one, and build the skills to run your own PT business.",
    duration: "14 weeks full-time or 29 weeks part-time",
    intakes: INTAKES,
  },
];

/* Verifiable specifics — provable claims used in place of superlatives
   (per the 2026 growth strategy: "real classrooms, provable claims"). */
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
];

/* FIT Elite™ — the Dual-Career Personal Trainer Program.
   Cert III + Cert IV + 30-CEC short course pack + a specialty stream. */
export const FIT_ELITE = {
  name: "FIT Elite™",
  descriptor: "The Dual-Career Personal Trainer Program",
  includes: [
    "SIS30321 Certificate III in Fitness",
    "SIS40221 Certificate IV in Fitness",
    "30-CEC short course pack — kettlebell, boxing and suspension training",
    "Your choice of specialty stream",
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
