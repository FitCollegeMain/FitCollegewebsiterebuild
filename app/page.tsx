import Link from "next/link";
import { LOCATIONS } from "@/data/locations";
import { COURSES } from "@/data/courses";

export default function HomePage() {
  return (
    <>
      <section className="bg-gradient-to-b from-brand to-brand-light text-white">
        <div className="mx-auto max-w-6xl px-4 py-24 sm:px-6">
          <h1 className="max-w-2xl text-4xl font-extrabold tracking-tight sm:text-5xl">
            Launch your career in fitness
          </h1>
          <p className="mt-4 max-w-xl text-lg text-white/80">
            Nationally recognised Certificate III and IV fitness courses,
            delivered at {LOCATIONS.length} campuses across Australia and online.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/locations"
              className="rounded-full bg-accent px-6 py-3 font-semibold text-brand hover:bg-accent-dark"
            >
              Find a campus near you
            </Link>
            <Link
              href="/courses"
              className="rounded-full border border-white/40 px-6 py-3 font-semibold text-white hover:border-accent hover:text-accent"
            >
              Explore courses
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <h2 className="text-2xl font-bold text-brand">Our courses</h2>
        <div className="mt-6 grid gap-6 md:grid-cols-2">
          {COURSES.map((course) => (
            <Link
              key={course.code}
              href="/courses"
              className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-md"
            >
              <p className="text-xs font-semibold uppercase tracking-wide text-accent-dark">
                {course.code}
              </p>
              <h3 className="mt-1 text-lg font-bold text-brand">{course.name}</h3>
              <p className="text-sm font-medium text-slate-500">
                Career outcome: {course.outcome}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-slate-600">
                {course.description}
              </p>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
