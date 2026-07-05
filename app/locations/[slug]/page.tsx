import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { LOCATIONS, STATE_NAMES, type CampusLocation } from "@/data/locations";
import { INTAKE_MONTHS, NEXT_INTAKE, TIMETABLE } from "@/data/intakes";

export const dynamicParams = false;

export function generateStaticParams() {
  return LOCATIONS.map((location) => ({ slug: location.slug }));
}

function getLocation(slug: string): CampusLocation | undefined {
  return LOCATIONS.find((location) => location.slug === slug);
}

function fullAddress(location: CampusLocation) {
  return `${location.address}, ${location.suburb} ${location.state} ${location.postcode}`;
}

function mapsSearchUrl(location: CampusLocation) {
  const query = `${location.venue}, ${fullAddress(location)}`;
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
}

function mapsEmbedUrl(location: CampusLocation) {
  return `https://maps.google.com/maps?q=${encodeURIComponent(fullAddress(location))}&z=15&output=embed`;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const location = getLocation(slug);
  if (!location) return {};
  return {
    title: `Personal Training Courses ${location.suburb} — ${location.name} Campus`,
    description: `Become a Personal Trainer in ${location.suburb}. FIT College's ${location.name} campus is hosted at ${location.venue} — Certificate III & IV in Fitness with three intakes a year.`,
  };
}

const COURSES = [
  {
    code: "SIS30321",
    name: "Certificate III in Fitness",
    outcome: "Fitness Coach / Gym Instructor",
    description:
      "Your entry point into the fitness industry. Learn to plan and deliver group sessions and gym programs, ready to work as a qualified Gym Instructor.",
  },
  {
    code: "SIS40221",
    name: "Certificate IV in Fitness",
    outcome: "Personal Trainer",
    description:
      "Become a fully qualified Personal Trainer. Design tailored client programs, train clients one-on-one, and build the skills to run your own PT business.",
  },
];

export default async function CampusPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const location = getLocation(slug);
  if (!location) notFound();

  return (
    <>
      <section className="relative overflow-hidden bg-brand text-white">
        <div
          className="pointer-events-none absolute -right-20 top-0 h-full w-2/5 bg-accent"
          style={{ clipPath: "polygon(45% 0, 100% 0, 100% 100%, 0 100%)" }}
          aria-hidden
        />
        <div className="relative mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <nav className="text-sm text-white/60">
            <Link href="/locations" className="underline-offset-4 hover:underline hover:decoration-accent">
              Locations
            </Link>{" "}
            / <span className="text-white/90">{location.name}</span>
          </nav>
          <h1 className="font-display mt-4 text-3xl font-bold uppercase tracking-tight sm:text-5xl">
            {location.name} Campus
          </h1>
          <p className="mt-3 max-w-2xl text-white/80">
            Hosted at {location.venue} in {location.suburb},{" "}
            {STATE_NAMES[location.state]} — train in a real, working fitness
            facility from day one.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="grid gap-10 lg:grid-cols-[1fr_380px]">
          <div>
            <h2 className="font-display text-2xl font-bold uppercase text-brand">Courses at this campus</h2>
            <div className="mt-6 space-y-6">
              {COURSES.map((course) => (
                <div
                  key={course.code}
                  className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm"
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
                </div>
              ))}
            </div>

            <h2 className="font-display mt-12 text-2xl font-bold uppercase text-brand">Why study here</h2>
            <p className="mt-4 max-w-2xl leading-relaxed text-slate-600">
              Our {location.name} campus operates inside {location.venue}, so you
              learn on the gym floor with real equipment and real members — not
              in a classroom pretending to be one. With intakes in February, May
              and September, you can graduate as a qualified Personal Trainer in
              as little as 14 weeks full-time or 29 weeks part-time.
              Assessments are marked within five business days, and there are no
              mandatory placement hours.
            </p>
            {location.state === "QLD" && (
              <p className="mt-4 max-w-2xl text-sm text-slate-600">
                Studying in Queensland?{" "}
                <Link href="/funding" className="font-semibold text-accent hover:underline">
                  Career Start funding
                </Link>{" "}
                may subsidise your Certificate III at this campus.
              </p>
            )}
          </div>

          <aside>
            <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="font-display text-lg font-bold uppercase text-brand">Campus details</h2>
              <dl className="mt-4 space-y-3 text-sm">
                <div>
                  <dt className="font-semibold text-slate-500">Venue</dt>
                  <dd className="text-slate-700">{location.venue}</dd>
                </div>
                <div>
                  <dt className="font-semibold text-slate-500">Address</dt>
                  <dd className="text-slate-700">
                    {location.address}
                    <br />
                    {location.suburb} {location.state} {location.postcode}
                  </dd>
                </div>
                <div>
                  <dt className="font-semibold text-slate-500">Phone</dt>
                  <dd>
                    <a
                      href={`tel:${location.phone.replace(/\s/g, "")}`}
                      className="font-semibold text-brand hover:underline"
                    >
                      {location.phone}
                    </a>
                  </dd>
                </div>
              </dl>
              <a
                href={mapsSearchUrl(location)}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-block w-full rounded-full bg-accent px-5 py-2.5 text-center text-sm font-bold text-white hover:bg-accent-dark"
              >
                Get directions
              </a>
            </div>
            <div className="mt-6 overflow-hidden rounded-xl border border-slate-200 bg-slate-100 shadow-sm">
              <iframe
                title={`Map of FIT College ${location.name}`}
                src={mapsEmbedUrl(location)}
                className="h-72 w-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </aside>
        </div>

        {/* Next intake timetable */}
        <section className="mt-14">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-accent">
                {NEXT_INTAKE.isFinalOfYear ? "Final intake of the year" : "Next intake"}
              </p>
              <h2 className="font-display mt-1 text-2xl font-bold uppercase text-brand">
                {NEXT_INTAKE.name} intake timetable
              </h2>
            </div>
            <p className="text-sm text-slate-500">
              Face-to-face intakes run {INTAKE_MONTHS} — when doors close, the
              next intake is months away.
            </p>
          </div>
          <div className="mt-6 overflow-x-auto">
            <table className="w-full min-w-[640px] text-sm">
              <thead>
                <tr className="bg-brand text-left text-white">
                  <th className="px-4 py-3 font-semibold">Course</th>
                  <th className="px-4 py-3 font-semibold">Mode</th>
                  <th className="px-4 py-3 font-semibold">Schedule</th>
                  <th className="px-4 py-3 font-semibold">Starts</th>
                </tr>
              </thead>
              <tbody>
                {TIMETABLE.map((row) => (
                  <tr
                    key={`${row.code}-${row.mode}`}
                    className="border-b border-slate-100 even:bg-slate-50"
                  >
                    <td className="px-4 py-3 font-semibold text-brand">
                      {row.course}{" "}
                      <span className="font-normal text-slate-400">({row.code})</span>
                    </td>
                    <td className="px-4 py-3 text-slate-700">{row.mode}</td>
                    <td className="px-4 py-3 text-slate-700">{row.schedule}</td>
                    <td className="px-4 py-3 font-bold text-accent-dark">{row.starts}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-xs text-slate-400">
            September 2026 timetable shown — confirm session times for{" "}
            {location.name} with a Career Advisor when you enrol.
          </p>
        </section>

        <section className="mt-14 rounded-xl bg-brand p-8 text-white">
          <h2 className="font-display text-xl font-bold uppercase">Ready to get started?</h2>
          <p className="mt-2 max-w-2xl text-white/80">
            Chat with a Career Advisor to book a campus tour at {location.venue}{" "}
            or to find out about the next intake at {location.name}.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <a
              href="tel:1300887017"
              className="rounded-full bg-accent px-6 py-2.5 text-sm font-bold text-white hover:bg-accent-dark"
            >
              Call 1300 887 017
            </a>
            <Link
              href="/locations"
              className="rounded-full border border-white/40 px-6 py-2.5 text-sm font-semibold text-white hover:border-accent"
            >
              All locations
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}
