/*
  Face-to-face intakes run February, May and September — filling these three
  intakes is the core of the business, and the fixed dates are the honest
  urgency mechanic ("doors close, then open again").
  Update NEXT_INTAKE and TIMETABLE each intake cycle.
*/

export const INTAKE_MONTHS = "February, May and September";

export const NEXT_INTAKE = {
  name: "September 2026",
  /** Shown in urgency copy — this is the last intake of the year. */
  isFinalOfYear: true,
  startsLabel: "Classes start 7 September 2026",
};

export interface TimetableRow {
  course: string;
  code: string;
  mode: "Full Time" | "Part Time";
  schedule: string;
  starts: string; // display date
}

/** September 2026 intake — campus timetable (all campuses). */
export const TIMETABLE: TimetableRow[] = [
  {
    course: "Certificate III in Fitness",
    code: "SIS30321",
    mode: "Full Time",
    schedule: "Mon – Thu, 10am – 1pm",
    starts: "7 Sep 2026",
  },
  {
    course: "Certificate IV in Fitness",
    code: "SIS40221",
    mode: "Part Time",
    schedule: "Mon & Wed, 6pm – 9pm",
    starts: "7 Sep 2026",
  },
  {
    course: "Certificate III in Fitness",
    code: "SIS30321",
    mode: "Part Time",
    schedule: "Tue & Thu, 6pm – 9pm",
    starts: "8 Sep 2026",
  },
  {
    course: "Certificate IV in Fitness",
    code: "SIS40221",
    mode: "Full Time",
    schedule: "Mon – Thu, 10am – 1pm",
    starts: "26 Oct 2026",
  },
];
