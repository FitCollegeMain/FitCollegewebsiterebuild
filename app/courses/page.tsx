import type { Metadata } from "next";
import Link from "next/link";
import { COURSES, FIT_ELITE } from "@/data/courses";

export const metadata: Metadata = {
  title: "Fitness Courses — Certificate III & IV in Fitness",
  description:
    "Nationally recognised SIS30321 Certificate III and SIS40221 Certificate IV in Fitness, on campus or online, with interest-free payment plans and three intakes a year.",
};

export default function CoursesPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-brand text-white">
        <div
          className="pointer-events-none absolute -right-20 top-0 h-full w-2/5 bg-accent"
          style={{ clipPath: "polygon(45% 0, 100% 0, 100% 100%, 0 100%)" }}
          aria-hidden
        />
        <div className="relative mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <h1 className="font-display text-3xl font-bold uppercase tracking-tight sm:text-5xl">
            Fitness courses
          </h1>
          <p className="mt-3 max-w-2xl text-white/80">
            Nationally recognised qualifications that take you from beginner to
            qualified Personal Trainer — with interest-free payment plans so
            the fee never has to come first.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="grid gap-8 md:grid-cols-2">
          {COURSES.map((course) => (
            <div
              key={course.code}
              className="flex flex-col border-l-4 border-accent bg-white p-8 shadow-sm ring-1 ring-slate-200"
            >
              <p className="text-xs font-bold uppercase tracking-wide text-accent">
                {course.code}
              </p>
              <h2 className="font-display mt-1 text-2xl font-bold uppercase">
                {course.name}
              </h2>
              <p className="mt-1 text-sm font-semibold text-slate-500">
                Career outcome: {course.outcome}
              </p>
              <p className="mt-4 flex-1 leading-relaxed text-slate-600">
                {course.description}
              </p>
              <dl className="mt-6 space-y-2 border-t border-slate-100 pt-4 text-sm">
                <div className="flex gap-2">
                  <dt className="font-semibold text-slate-500">Duration:</dt>
                  <dd className="text-slate-700">{course.duration}</dd>
                </div>
                <div className="flex gap-2">
                  <dt className="font-semibold text-slate-500">Intakes:</dt>
                  <dd className="text-slate-700">{course.intakes}</dd>
                </div>
              </dl>
              <div className="mt-6 flex gap-3">
                <Link
                  href={`/courses/${course.slug}`}
                  className="rounded-full bg-accent px-5 py-2.5 text-sm font-bold text-white hover:bg-accent-dark"
                >
                  Course details →
                </Link>
                <a
                  href="tel:1300887017"
                  className="rounded-full border border-slate-300 px-5 py-2.5 text-sm font-semibold hover:border-accent hover:text-accent"
                >
                  Ask an advisor
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Complete PT — the Cert III + IV package */}
        <div className="mt-8 flex flex-col items-start justify-between gap-6 border-l-4 border-accent bg-slate-50 p-8 sm:flex-row sm:items-center">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-accent">
              The Certificate III + IV package
            </p>
            <h2 className="font-display mt-1 text-2xl font-bold uppercase">Complete PT</h2>
            <p className="mt-2 max-w-xl text-slate-600">
              Both certificates in one enrolment — 32 units from beginner to
              fully qualified Personal Trainer, with one interest-free payment
              plan.
            </p>
          </div>
          <Link
            href="/courses/complete-pt"
            className="shrink-0 rounded-full bg-brand px-6 py-3 font-bold text-white hover:bg-brand-light"
          >
            See the package →
          </Link>
        </div>

        {/* FIT Elite cross-sell */}
        <div className="relative mt-10 overflow-hidden bg-brand p-8 text-white sm:p-10">
          <div
            className="pointer-events-none absolute right-0 top-0 h-full w-48 bg-accent"
            style={{ clipPath: "polygon(60% 0, 100% 0, 100% 100%, 0 100%)" }}
            aria-hidden
          />
          <div className="relative max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-white/60">
              {FIT_ELITE.descriptor}
            </p>
            <h2 className="font-display mt-2 text-2xl font-bold uppercase">
              Want both certificates plus a specialty stream?
            </h2>
            <p className="mt-3 text-white/80">
              {FIT_ELITE.name} is Complete PT plus advanced skills — boxing,
              suspension and kettlebell training (30 CPD) — and your choice of
              an NDIS disability or ASCA strength &amp; conditioning
              specialisation.
            </p>
            <Link
              href="/fit-elite"
              className="mt-5 inline-block rounded-full bg-white px-6 py-2.5 text-sm font-bold text-brand hover:bg-white/90"
            >
              Explore FIT Elite™
            </Link>
          </div>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          <section className="bg-slate-50 p-8">
            <h2 className="font-display text-xl font-bold uppercase">Study online</h2>
            <p className="mt-2 text-slate-600">
              Both courses are available fully online with the same nationally
              recognised outcome — study from anywhere with 7-day support, no
              mandatory gym hours, and the option to drop into any campus.
            </p>
            <Link
              href="/study-online"
              className="mt-5 inline-block rounded-full bg-brand px-6 py-2.5 text-sm font-bold text-white hover:bg-brand-light"
            >
              How online study works
            </Link>
          </section>
          <section className="bg-slate-50 p-8">
            <h2 className="font-display text-xl font-bold uppercase">
              Already working in a gym?
            </h2>
            <p className="mt-2 text-slate-600">
              If you&apos;re gym staff, an athlete or an exercise-science
              student, ask about credit transfer and recognition of prior
              learning (RPL) — get credit for what you already do and finish
              faster.
            </p>
            <a
              href="tel:1300887017"
              className="mt-5 inline-block rounded-full bg-brand px-6 py-2.5 text-sm font-bold text-white hover:bg-brand-light"
            >
              Ask about RPL
            </a>
          </section>
        </div>
      </div>
    </>
  );
}
