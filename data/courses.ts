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
