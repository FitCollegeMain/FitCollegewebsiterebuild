import type { Metadata } from "next";
import Link from "next/link";
import { COMPLETE_PT, COURSES, DELIVERY_MODES, FIT_ELITE } from "@/data/courses";

export const metadata: Metadata = {
  title: "Complete PT — Certificate III + IV in Fitness Package",
  description:
    "Complete PT pairs the SIS30321 Certificate III and SIS40221 Certificate IV in Fitness into one enrolment — 32 units from beginner to fully qualified Personal Trainer, on campus or online.",
};

const INCLUSIONS: { label: string; completePt: boolean; fitElite: boolean }[] = [
  { label: "Certificate III in Fitness — SIS30321", completePt: true, fitElite: true },
  { label: "Certificate IV in Fitness — SIS40221", completePt: true, fitElite: true },
  { label: "Advanced Skills — boxing · suspension · kettlebell (30 CPD)", completePt: false, fitElite: true },
  { label: "Specialisation — S&C Coach (incl. ASCA L1) or NDIS Disability Skill Set", completePt: false, fitElite: true },
];

function Tick({ on }: { on: boolean }) {
  return on ? (
    <span className="font-bold text-accent" aria-label="included">✓</span>
  ) : (
    <span className="text-slate-300" aria-label="not included">—</span>
  );
}

export default function CompletePtPage() {
  const [certIII, certIV] = COURSES;

  return (
    <>
      <section className="relative overflow-hidden bg-brand text-white">
        <div
          className="pointer-events-none absolute -right-20 top-0 h-full w-2/5 bg-accent"
          style={{ clipPath: "polygon(45% 0, 100% 0, 100% 100%, 0 100%)" }}
          aria-hidden
        />
        <div className="relative mx-auto max-w-6xl px-4 py-20 sm:px-6">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-white/60">
            {COMPLETE_PT.descriptor} · Nationally recognised
          </p>
          <h1 className="font-display mt-3 max-w-3xl text-4xl font-bold uppercase leading-tight sm:text-5xl">
            Complete PT: beginner to
            <br />
            Personal Trainer
          </h1>
          <p className="mt-5 max-w-xl text-lg text-white/80">
            Becoming a fully qualified Personal Trainer is a simple two-step
            process. Complete PT packages both certificates into one enrolment
            and one payment plan — finish your Cert III, roll straight into
            your Cert IV.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="tel:1300887017"
              className="rounded-full bg-accent px-6 py-3 font-bold text-white hover:bg-accent-dark"
            >
              Chat with a Career Advisor
            </a>
            <Link
              href="/funding"
              className="rounded-full border border-white/40 px-6 py-3 font-semibold text-white hover:border-accent"
            >
              Funding &amp; payment plans
            </Link>
          </div>
        </div>
      </section>

      {/* Course breakdown — 15 + 17 = 32 */}
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-x-12 gap-y-6 px-4 py-12 text-center sm:px-6">
          <div>
            <p className="font-display text-4xl font-bold text-accent">{certIII.stats.units}</p>
            <p className="mt-1 text-xs font-bold uppercase tracking-wide text-slate-500">
              Cert III units
            </p>
            <p className="text-xs text-slate-400">{certIII.role}</p>
          </div>
          <p className="font-display text-3xl font-bold text-slate-300" aria-hidden>+</p>
          <div>
            <p className="font-display text-4xl font-bold text-accent">{certIV.stats.units}</p>
            <p className="mt-1 text-xs font-bold uppercase tracking-wide text-slate-500">
              Cert IV units
            </p>
            <p className="text-xs text-slate-400">{certIV.role}</p>
          </div>
          <p className="font-display text-3xl font-bold text-slate-300" aria-hidden>=</p>
          <div>
            <p className="font-display text-4xl font-bold text-brand">{COMPLETE_PT.totalUnits}</p>
            <p className="mt-1 text-xs font-bold uppercase tracking-wide text-slate-500">
              Total units
            </p>
            <p className="text-xs text-slate-400">Fully qualified Personal Trainer</p>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        {/* Two-step pathway */}
        <h2 className="font-display text-2xl font-bold uppercase">The two-step pathway</h2>
        <div className="mt-6 grid gap-6 md:grid-cols-2">
          {COMPLETE_PT.steps.map((step, i) => (
            <Link
              key={step.code}
              href={`/courses/${COURSES[i].slug}`}
              className="group border-l-4 border-accent bg-white p-6 shadow-sm ring-1 ring-slate-200 transition hover:shadow-md"
            >
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-accent">
                {step.kicker}
              </p>
              <h3 className="mt-2 text-xl font-bold group-hover:text-accent">{step.title}</h3>
              <p className="text-sm font-semibold text-slate-500">{step.code}</p>
              <p className="mt-3 text-sm leading-relaxed text-slate-600">{step.text}</p>
              <p className="mt-4 text-sm font-bold text-accent-dark">Course details →</p>
            </Link>
          ))}
        </div>

        {/* Study modes */}
        <h2 className="font-display mt-14 text-2xl font-bold uppercase">Study it your way</h2>
        <p className="mt-3 max-w-2xl text-slate-600">
          Times shown are per certificate — full-time students go from zero to
          qualified PT in around 16 weeks.
        </p>
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

        {/* Complete PT vs FIT Elite */}
        <h2 className="font-display mt-14 text-2xl font-bold uppercase">
          Complete PT or FIT Elite™?
        </h2>
        <div className="mt-6 overflow-x-auto">
          <table className="w-full min-w-[560px] text-sm">
            <thead>
              <tr className="bg-brand text-left text-white">
                <th className="px-4 py-3 font-semibold">What&apos;s included</th>
                <th className="px-4 py-3 text-center font-semibold">Complete PT</th>
                <th className="bg-accent px-4 py-3 text-center font-semibold">FIT Elite™</th>
              </tr>
            </thead>
            <tbody>
              {INCLUSIONS.map((row) => (
                <tr key={row.label} className="border-b border-slate-100">
                  <td className="px-4 py-3 text-slate-700">{row.label}</td>
                  <td className="px-4 py-3 text-center">
                    <Tick on={row.completePt} />
                  </td>
                  <td className="bg-red-50/50 px-4 py-3 text-center">
                    <Tick on={row.fitElite} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-4 max-w-2xl text-sm text-slate-500">
          {FIT_ELITE.name} is Complete PT plus advanced skills and a
          specialisation — ask a Career Advisor to upgrade your enrolment at
          any time.{" "}
          <Link href="/fit-elite" className="font-semibold text-accent hover:underline">
            Explore FIT Elite™ →
          </Link>
        </p>

        {/* CTA */}
        <section className="mt-12 flex flex-col items-start justify-between gap-6 bg-brand p-8 text-white sm:flex-row sm:items-center sm:p-10">
          <div>
            <h2 className="font-display text-2xl font-bold uppercase">
              Start your fitness education your way
            </h2>
            <p className="mt-2 max-w-xl text-white/80">
              Three intakes a year on campus, start online within 72 hours —
              with funding and interest-free payment plan options sorted before
              you begin.
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
