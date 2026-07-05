import type { Metadata } from "next";
import Link from "next/link";
import LeadCta from "@/components/LeadCta";
import { notFound } from "next/navigation";
import { COURSES, DELIVERY_MODES, getCourse } from "@/data/courses";

export const dynamicParams = false;

export function generateStaticParams() {
  return COURSES.map((course) => ({ slug: course.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const course = getCourse(slug);
  if (!course) return {};
  return {
    title: `${course.code} ${course.name} — Become a ${course.role}`,
    description: `${course.description} ${course.stats.units} units, full-time, part-time or online delivery, with intakes in ${course.intakes}.`,
  };
}

export default async function CoursePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const course = getCourse(slug);
  if (!course) notFound();

  const stats = [
    { stat: `${course.stats.units}`, label: "Units of competency" },
    { stat: course.stats.nominalHours.toLocaleString(), label: "Nominal hours" },
    { stat: `${course.stats.hoursPerWeek}`, label: "Hours per week" },
    { stat: `${course.stats.monthsAllowable}`, label: "Months allowable" },
  ];

  return (
    <>
      <section className="relative overflow-hidden bg-brand text-white">
        <div
          className="pointer-events-none absolute -right-20 top-0 hidden h-full w-2/5 bg-accent sm:block"
          style={{ clipPath: "polygon(45% 0, 100% 0, 100% 100%, 0 100%)" }}
          aria-hidden
        />
        <div className="relative mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <nav className="text-sm text-white/60">
            <Link href="/courses" className="underline-offset-4 hover:underline hover:decoration-accent">
              Courses
            </Link>{" "}
            / <span className="text-white/90">{course.name}</span>
          </nav>
          <p className="mt-4 text-xs font-bold uppercase tracking-[0.2em] text-white/60">
            {course.role} · {course.code} · Nationally recognised
          </p>
          <h1 className="font-display mt-3 max-w-3xl text-4xl font-bold uppercase leading-tight sm:text-5xl">
            {course.name}
          </h1>
          <p className="mt-5 max-w-xl text-lg text-white/80">{course.description}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <LeadCta
              source="course-page"
              className="rounded-full bg-accent px-6 py-3 font-bold text-white hover:bg-accent-dark"
            >
              Chat with a Career Advisor
            </LeadCta>
            <Link
              href="/courses/complete-pt"
              className="rounded-full border border-white/40 px-6 py-3 font-semibold text-white hover:border-accent"
            >
              Get both certificates — Complete PT
            </Link>
          </div>
        </div>
      </section>

      {/* Course stats */}
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:grid-cols-2 sm:px-6 lg:grid-cols-4">
          {stats.map((item) => (
            <div key={item.label}>
              <p className="font-display text-3xl font-bold uppercase text-accent">
                {item.stat}
              </p>
              <p className="mt-1 text-sm leading-relaxed text-slate-600">{item.label}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        {/* Delivery modes */}
        <h2 className="font-display text-2xl font-bold uppercase">Choose how you study</h2>
        <div className="mt-6 grid gap-6 md:grid-cols-3">
          {DELIVERY_MODES.map((mode) => (
            <div key={mode.label} className="border-t-4 border-accent bg-white shadow-sm ring-1 ring-slate-200">
              <div className="bg-brand px-5 py-4 text-white">
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/60">
                  {mode.kicker}
                </p>
                <p className="font-display text-lg font-bold uppercase">{mode.label}</p>
              </div>
              <dl className="divide-y divide-slate-100 px-5 py-2 text-sm">
                {mode.rows.map(([field, value]) => (
                  <div key={field} className="flex items-baseline justify-between gap-3 py-2.5">
                    <dt className="shrink-0 text-xs font-semibold uppercase tracking-wide text-slate-400">
                      {field}
                    </dt>
                    <dd className="text-right font-semibold text-slate-700">{value}</dd>
                  </div>
                ))}
              </dl>
              <p className="border-t border-slate-100 px-5 py-3 text-xs font-semibold text-accent-dark">
                Best for: {mode.bestFor}
              </p>
            </div>
          ))}
        </div>

        {/* Notes */}
        <div className="mt-10 space-y-3">
          {course.notes.map((note) => (
            <p key={note} className="flex max-w-3xl gap-3 text-sm leading-relaxed text-slate-600">
              <span
                className="mt-1 h-3.5 w-3.5 shrink-0 bg-accent"
                style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%)" }}
                aria-hidden
              />
              {note}
            </p>
          ))}
        </div>

        {/* Units of competency — collapsed by default to keep the page lean */}
        <details className="group mt-10 bg-slate-50">
          <summary className="flex cursor-pointer items-center justify-between gap-4 p-6 font-display text-lg font-bold uppercase [&::-webkit-details-marker]:hidden">
            The {course.stats.units} units of competency
            <span className="shrink-0 text-accent transition-transform group-open:rotate-90" aria-hidden>
              ▶
            </span>
          </summary>
          <ul className="grid gap-x-10 gap-y-3 px-6 pb-8 sm:grid-cols-2">
            {course.units.map((unit) => (
              <li key={unit.code} className="flex gap-3 text-sm">
                <span className="w-24 shrink-0 font-bold text-accent">{unit.code}</span>
                <span className="text-slate-700">{unit.name}</span>
              </li>
            ))}
          </ul>
        </details>

        {/* Cross-sell + CTA */}
        <section className="mt-10 flex flex-col items-start justify-between gap-6 bg-brand p-8 text-white sm:flex-row sm:items-center sm:p-10">
          <div>
            <h2 className="font-display text-2xl font-bold uppercase">
              Most students take both certificates
            </h2>
            <p className="mt-2 max-w-xl text-white/80">
              The Complete PT package pairs the Cert III and Cert IV into one
              enrolment — 32 units to fully qualified Personal Trainer, with
              interest-free payment plans.
            </p>
          </div>
          <div className="flex shrink-0 flex-wrap gap-3">
            <Link
              href="/courses/complete-pt"
              className="rounded-full bg-accent px-6 py-3 font-bold text-white hover:bg-accent-dark"
            >
              See Complete PT
            </Link>
            <Link
              href="/locations"
              className="rounded-full border border-white/40 px-6 py-3 font-semibold text-white hover:border-accent"
            >
              Find a campus
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}
