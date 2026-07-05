import type { Metadata } from "next";
import Link from "next/link";
import { INTERNATIONAL } from "@/data/courses";

export const metadata: Metadata = {
  title: "International Student Pathway — CRICOS Fitness Courses",
  description:
    "Study fitness in Australia on a student visa at a CRICOS-approved FIT College campus. Certificate III & IV in Fitness and the Diploma of Sport — bundle all three for two years of study.",
};

export default function InternationalPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-brand text-white">
        <div
          className="pointer-events-none absolute -right-20 top-0 hidden h-full w-2/5 bg-accent sm:block"
          style={{ clipPath: "polygon(45% 0, 100% 0, 100% 100%, 0 100%)" }}
          aria-hidden
        />
        <div className="relative mx-auto max-w-6xl px-4 py-20 sm:px-6">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-white/60">
            CRICOS-approved · Student visa study
          </p>
          <h1 className="font-display mt-3 max-w-3xl text-4xl font-bold uppercase leading-tight sm:text-5xl">
            International student pathways
          </h1>
          <p className="mt-5 max-w-xl text-lg text-white/80">
            Study fitness in Australia at a CRICOS-approved campus — from a
            single 6-month certificate to a two-year pathway bundling the Cert
            III, Cert IV and Diploma of Sport.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="tel:1300887017"
              className="rounded-full bg-accent px-6 py-3 font-bold text-white hover:bg-accent-dark"
            >
              Chat with a Career Advisor
            </a>
            <Link
              href="/contact"
              className="rounded-full border border-white/40 px-6 py-3 font-semibold text-white hover:border-accent"
            >
              Ask a question
            </Link>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        {/* CRICOS courses */}
        <h2 className="font-display text-2xl font-bold uppercase">
          CRICOS-approved courses
        </h2>
        <div className="mt-6 grid gap-6 md:grid-cols-3">
          {INTERNATIONAL.courses.map((course) => (
            <div
              key={course.cricos}
              className="flex flex-col border-l-4 border-accent bg-white p-6 shadow-sm ring-1 ring-slate-200"
            >
              <p className="text-xs font-bold uppercase tracking-wide text-accent">
                {course.code}
              </p>
              <h3 className="mt-1 text-lg font-bold">{course.name}</h3>
              <p className="mt-2 flex-1 text-sm text-slate-600">{course.duration}</p>
              <p className="mt-4 border-t border-slate-100 pt-3 text-xs font-semibold text-slate-500">
                CRICOS Course Code: {course.cricos}
              </p>
            </div>
          ))}
        </div>

        {/* Two-year bundle */}
        <div className="relative mt-8 overflow-hidden bg-brand p-8 text-white sm:p-10">
          <div
            className="pointer-events-none absolute right-0 top-0 hidden h-full w-48 bg-accent sm:block"
            style={{ clipPath: "polygon(60% 0, 100% 0, 100% 100%, 0 100%)" }}
            aria-hidden
          />
          <div className="relative max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-white/60">
              Most popular pathway
            </p>
            <h2 className="font-display mt-2 text-2xl font-bold uppercase">
              Two years of study, one pathway
            </h2>
            <p className="mt-3 text-white/80">{INTERNATIONAL.bundle}</p>
            <a
              href="tel:1300887017"
              className="mt-5 inline-block rounded-full bg-white px-6 py-2.5 text-sm font-bold text-brand hover:bg-white/90"
            >
              Plan your pathway
            </a>
          </div>
        </div>

        <div className="mt-14 grid gap-12 lg:grid-cols-2">
          {/* How it works */}
          <div>
            <h2 className="font-display text-2xl font-bold uppercase">
              How it works
            </h2>
            <ul className="mt-6 space-y-4">
              {[
                "Study face-to-face on campus — international students study in a face-to-face capacity, with intakes in January, April, July and October.",
                `CRICOS-approved campuses in ${INTERNATIONAL.campuses.join(", ")}.`,
                "Pay per term or semester in advance — payment is due by each term's census date, set out in your Letter of Offer.",
                "Your qualification is recognised through global fitness networks such as ICREPs.",
                "No mandatory placement hours — assessments are task-based, with 24/7 help requests and phone support 8am–5pm AEST weekdays.",
              ].map((item) => (
                <li key={item} className="flex gap-3">
                  <span
                    className="mt-1 h-4 w-4 shrink-0 bg-accent"
                    style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%)" }}
                    aria-hidden
                  />
                  <span className="text-sm leading-relaxed text-slate-700">{item}</span>
                </li>
              ))}
            </ul>
            <p className="mt-6 text-xs text-slate-400">
              FIT College does not provide migration or visa advice. Please
              discuss the appropriate visa with a registered migration agent.
            </p>
          </div>

          {/* English requirements */}
          <div>
            <h2 className="font-display text-2xl font-bold uppercase">
              English language requirements
            </h2>
            <p className="mt-3 text-sm text-slate-600">
              Meet the minimum score in any one approved test:
            </p>
            <div className="mt-5 divide-y divide-slate-100 border-y border-slate-200">
              {INTERNATIONAL.englishTests.map((row) => (
                <div key={row.test} className="flex flex-col gap-1 py-4 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
                  <p className="shrink-0 font-bold text-brand">{row.test}</p>
                  <p className="text-sm text-slate-600 sm:text-right">{row.requirement}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA */}
        <section className="mt-14 flex flex-col items-start justify-between gap-6 bg-brand p-8 text-white sm:flex-row sm:items-center sm:p-10">
          <div>
            <h2 className="font-display text-2xl font-bold uppercase">
              Start your Australian fitness career
            </h2>
            <p className="mt-2 max-w-xl text-white/80">
              Talk to our team about the right pathway, your campus, and your
              Letter of Offer.
            </p>
          </div>
          <a
            href="tel:1300887017"
            className="shrink-0 rounded-full bg-accent px-6 py-3 font-bold text-white hover:bg-accent-dark"
          >
            Call 1300 887 017
          </a>
        </section>
      </div>
    </>
  );
}
