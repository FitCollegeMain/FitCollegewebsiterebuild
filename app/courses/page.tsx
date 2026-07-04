import type { Metadata } from "next";
import Link from "next/link";
import { COURSES } from "@/data/courses";

export const metadata: Metadata = {
  title: "Fitness Courses",
  description:
    "Nationally recognised Certificate III and Certificate IV in Fitness, delivered at campuses across Australia and online.",
};

export default function CoursesPage() {
  return (
    <>
      <section className="bg-brand text-white">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
            Fitness Courses
          </h1>
          <p className="mt-3 max-w-2xl text-white/80">
            Nationally recognised vocational qualifications that take you from
            beginner to fully qualified Personal Trainer.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="grid gap-8 md:grid-cols-2">
          {COURSES.map((course) => (
            <div
              key={course.code}
              className="flex flex-col rounded-xl border border-slate-200 bg-white p-8 shadow-sm"
            >
              <p className="text-xs font-semibold uppercase tracking-wide text-accent-dark">
                {course.code}
              </p>
              <h2 className="mt-1 text-2xl font-bold text-brand">{course.name}</h2>
              <p className="mt-1 text-sm font-medium text-slate-500">
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
                <a
                  href="tel:1300887017"
                  className="rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-brand hover:bg-accent-dark"
                >
                  Enquire now
                </a>
                <Link
                  href="/locations"
                  className="rounded-full border border-slate-300 px-5 py-2.5 text-sm font-semibold text-brand hover:border-accent"
                >
                  Find a campus
                </Link>
              </div>
            </div>
          ))}
        </div>

        <section className="mt-12 rounded-xl bg-slate-50 p-8">
          <h2 className="text-xl font-bold text-brand">Study online</h2>
          <p className="mt-2 max-w-2xl text-slate-600">
            Both courses are also available fully online with the same
            nationally recognised outcome, so you can study from anywhere in
            Australia at your own pace.
          </p>
          <Link
            href="/contact"
            className="mt-5 inline-block rounded-full bg-brand px-6 py-2.5 text-sm font-semibold text-white hover:bg-brand-light"
          >
            Ask about online study
          </Link>
        </section>
      </div>
    </>
  );
}
