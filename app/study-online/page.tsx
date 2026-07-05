import type { Metadata } from "next";
import Link from "next/link";
import LeadCta from "@/components/LeadCta";
import { COURSES } from "@/data/courses";

export const metadata: Metadata = {
  title: "Study Online — Online Fitness Courses",
  description:
    "Study the SIS30321 Certificate III and SIS40221 Certificate IV in Fitness online — from anywhere, at any time, on any device, with 7-day education support and no mandatory gym hours.",
};

const SUPPORT_FEATURES = [
  {
    title: "7 days a week education support",
    text: "Education support from 7am–7pm, seven days a week, plus 24/7 help requests through the learning platform.",
  },
  {
    title: "12 hours of virtual support sessions",
    text: "Drop-in virtual sessions with campus trainers via the learning platform — and face-to-face help any time you visit one of our 20+ campuses.",
  },
  {
    title: "Feedback within five business days",
    text: "Video assessments are reviewed with feedback typically within 72 hours, and written assessments marked within five business days.",
  },
  {
    title: "Upgrade to campus any time",
    text: "Online students can switch to on-campus study or drop into a campus session — your enrolment moves with you.",
  },
];

const REQUIREMENTS = [
  "A computer or device that connects to the internet",
  "A smartphone or video camera to record practical demonstrations",
  "Access to gym equipment or a fitness facility (or visit a campus)",
  "A few friends or family members willing to act as practice clients",
];

export default function StudyOnlinePage() {
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
            Virtual Campus · SIS30321 + SIS40221
          </p>
          <h1 className="font-display mt-3 max-w-3xl text-4xl font-bold uppercase leading-tight sm:text-5xl">
            Study personal training online
          </h1>
          <p className="mt-5 max-w-xl text-lg text-white/80">
            Study from anywhere, at any time, on any device. Built for people
            who need flexibility and real support — with no mandatory gym hours
            and the option to drop into any campus.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <LeadCta
              source="study-online"
              className="rounded-full bg-accent px-6 py-3 font-bold text-white hover:bg-accent-dark"
            >
              Chat with a Career Advisor
            </LeadCta>
            <Link
              href="/courses"
              className="rounded-full border border-white/40 px-6 py-3 font-semibold text-white hover:border-accent"
            >
              See the courses
            </Link>
          </div>
        </div>
      </section>

      {/* Study-at-your-pace strip */}
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:grid-cols-3 sm:px-6">
          <div>
            <p className="font-display text-3xl font-bold uppercase text-accent">
              3–6 months
            </p>
            <p className="mt-1 text-sm leading-relaxed text-slate-600">
              Finish fast by allocating 25–30 hours a week — or spread each
              certificate over up to 12 months.
            </p>
          </div>
          <div>
            <p className="font-display text-3xl font-bold uppercase text-accent">
              7am–7pm, 7 days
            </p>
            <p className="mt-1 text-sm leading-relaxed text-slate-600">
              Education support every day of the week, plus 24/7 help requests
              on the learning platform.
            </p>
          </div>
          <div>
            <p className="font-display text-3xl font-bold uppercase text-accent">
              0 gym hours
            </p>
            <p className="mt-1 text-sm leading-relaxed text-slate-600">
              No mandatory placement — record video demonstrations and get
              feedback, typically within 72 hours.
            </p>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        {/* Support */}
        <h2 className="font-display text-2xl font-bold uppercase">
          Unparalleled support, not a login and good luck
        </h2>
        <p className="mt-3 max-w-2xl text-slate-600">
          Online study lives on our dedicated cloud learning platform with
          direct lines to real teachers — one of the highest completion rates
          in the industry comes from support, not luck.
        </p>
        <div className="mt-8 grid gap-6 sm:grid-cols-2">
          {SUPPORT_FEATURES.map((feature) => (
            <div
              key={feature.title}
              className="border-l-4 border-accent bg-white p-6 shadow-sm ring-1 ring-slate-200"
            >
              <h3 className="font-bold">{feature.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">{feature.text}</p>
            </div>
          ))}
        </div>

        {/* Courses online */}
        <h2 className="font-display mt-14 text-2xl font-bold uppercase">
          Courses you can study online
        </h2>
        <div className="mt-6 grid gap-6 md:grid-cols-2">
          {COURSES.map((course) => (
            <div
              key={course.code}
              className="border-l-4 border-accent bg-white p-6 shadow-sm ring-1 ring-slate-200"
            >
              <p className="text-xs font-bold uppercase tracking-wide text-accent">
                {course.code}
              </p>
              <h3 className="mt-1 text-lg font-bold">{course.name}</h3>
              <p className="text-sm font-semibold text-slate-500">
                Career outcome: {course.outcome}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-slate-600">
                {course.description}
              </p>
            </div>
          ))}
        </div>
        <div className="relative mt-6 overflow-hidden bg-brand p-8 text-white">
          <div
            className="pointer-events-none absolute right-0 top-0 h-full w-40 bg-accent"
            style={{ clipPath: "polygon(60% 0, 100% 0, 100% 100%, 0 100%)" }}
            aria-hidden
          />
          <div className="relative max-w-2xl">
            <h3 className="font-display text-xl font-bold uppercase">
              FIT Elite™ online
            </h3>
            <p className="mt-2 text-sm text-white/80">
              Add the advanced skills pack (boxing, suspension and kettlebell —
              30 CPD) and a specialisation — ASCA-accredited Strength &amp;
              Conditioning or the NDIS Disability Skill Set — to your online
              enrolment.
            </p>
            <Link
              href="/fit-elite"
              className="mt-4 inline-block rounded-full bg-white px-5 py-2 text-sm font-bold text-brand hover:bg-white/90"
            >
              Explore FIT Elite™
            </Link>
          </div>
        </div>

        {/* Honest expectations — what online study actually involves */}
        <section className="mt-14 bg-slate-50 p-8 sm:p-10">
          <h2 className="font-display text-2xl font-bold uppercase">
            What online study actually involves
          </h2>
          <p className="mt-3 max-w-2xl text-slate-600">
            Studying personal training online is flexible, but it isn&apos;t
            passive — you&apos;ll demonstrate real training skills on camera.
            Here&apos;s what you need before you start:
          </p>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2">
            {REQUIREMENTS.map((item) => (
              <li key={item} className="flex gap-3">
                <span
                  className="mt-1 h-4 w-4 shrink-0 bg-accent"
                  style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%)" }}
                  aria-hidden
                />
                <span className="text-slate-700">{item}</span>
              </li>
            ))}
          </ul>
          <p className="mt-6 max-w-2xl text-sm text-slate-500">
            Not sure whether online or on-campus suits you better? That&apos;s
            exactly what a five-minute chat with a Career Advisor is for — and
            you can switch modes after enrolling.
          </p>
        </section>

        {/* CTA */}
        <section className="mt-10 flex flex-col items-start justify-between gap-6 bg-brand p-8 text-white sm:flex-row sm:items-center sm:p-10">
          <div>
            <h2 className="font-display text-2xl font-bold uppercase">
              Start from wherever you are
            </h2>
            <p className="mt-2 max-w-xl text-white/80">
              Three intakes a year, interest-free payment plans, and a Virtual
              Campus that&apos;s been turning out work-ready trainers since
              2009.
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
