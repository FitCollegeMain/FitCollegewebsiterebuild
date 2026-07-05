import Link from "next/link";
import { LOCATIONS } from "@/data/locations";
import { COURSES, FIT_ELITE } from "@/data/courses";
import UspMarquee from "@/components/UspMarquee";
import AustraliaMap from "@/components/AustraliaMap";
import ReviewsMarquee from "@/components/ReviewsMarquee";
import { NEXT_INTAKE } from "@/data/intakes";

export default function HomePage() {
  return (
    <>
      {/* Hero — Core Black first, white text, Energy Red for standout elements */}
      <section className="relative overflow-hidden bg-brand text-white">
        <div
          className="pointer-events-none absolute -right-24 top-0 h-full w-1/2 bg-accent/10"
          style={{ clipPath: "polygon(35% 0, 100% 0, 100% 100%, 0 100%)" }}
          aria-hidden
        />
        <div className="relative mx-auto max-w-6xl px-4 py-24 sm:px-6">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-white/60">
            Nationally recognised · RTO 31903
          </p>
          <h1 className="font-display mt-4 max-w-3xl text-4xl font-bold uppercase leading-tight tracking-tight sm:text-6xl">
            Study to become a<br />
            <span className="mt-2 inline-block bg-accent px-3 text-white">
              Personal Trainer
            </span>
          </h1>
          <p className="mt-5 max-w-xl text-lg text-white/80">
            Real classrooms inside working gyms at {LOCATIONS.length} campuses
            across Australia — or study online. Certificate III and IV in
            Fitness with interest-free payment plans and government funding for
            eligible Queenslanders.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="tel:1300887017"
              className="rounded-full bg-accent px-6 py-3 font-bold text-white hover:bg-accent-dark"
            >
              Chat with a Career Advisor
            </a>
            <Link
              href="/locations"
              className="rounded-full border border-white/40 px-6 py-3 font-semibold text-white hover:border-accent"
            >
              Find a campus near you
            </Link>
          </div>
        </div>
      </section>

      {/* Intake urgency — fixed Feb/May/Sep intakes are the honest deadline */}
      <a
        href="tel:1300887017"
        className="block bg-accent text-white transition hover:bg-accent-dark"
      >
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-x-6 gap-y-1 px-4 py-3 text-sm font-semibold sm:px-6">
          <p>
            <span className="font-display font-bold uppercase">
              {NEXT_INTAKE.isFinalOfYear
                ? "Final intake of 2026"
                : `${NEXT_INTAKE.name} intake`}
            </span>
            {" · "}
            {NEXT_INTAKE.startsLabel} — then doors close until February.
          </p>
          <p className="font-bold underline underline-offset-4">
            Secure your place →
          </p>
        </div>
      </a>

      {/* Provable claims — a side-scrolling banner of verifiable specifics */}
      <section className="overflow-hidden border-b border-slate-200 bg-white py-10">
        <UspMarquee />
      </section>

      {/* Courses */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <h2 className="font-display text-3xl font-bold uppercase tracking-tight">
          Our courses
        </h2>
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {COURSES.map((course) => (
            <Link
              key={course.code}
              href="/courses"
              className="group border-l-4 border-accent bg-white p-6 shadow-sm ring-1 ring-slate-200 transition hover:shadow-md"
            >
              <p className="text-xs font-bold uppercase tracking-wide text-accent">
                {course.code}
              </p>
              <h3 className="mt-1 text-xl font-bold group-hover:text-accent">
                {course.name}
              </h3>
              <p className="text-sm font-semibold text-slate-500">
                Career outcome: {course.outcome}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-slate-600">
                {course.description}
              </p>
            </Link>
          ))}
        </div>

        {/* FIT Elite promo — dual-career narrative as the hero story */}
        <div className="relative mt-8 overflow-hidden bg-brand p-8 text-white sm:p-10">
          <div
            className="pointer-events-none absolute right-0 top-0 h-full w-56 bg-accent"
            style={{ clipPath: "polygon(60% 0, 100% 0, 100% 100%, 0 100%)" }}
            aria-hidden
          />
          <div className="relative max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-white/60">
              {FIT_ELITE.descriptor}
            </p>
            <h2 className="font-display mt-2 text-3xl font-bold uppercase">
              {FIT_ELITE.name} — get paid while you build your client book
            </h2>
            <p className="mt-3 text-white/80">
              Both fitness certificates, a 30-CPD advanced skills pack, and an
              NDIS disability or ASCA strength &amp; conditioning stream.
              Disability support work pays from week one — so your income
              doesn&apos;t wait for your PT business to grow.
            </p>
            <Link
              href="/fit-elite"
              className="mt-6 inline-block rounded-full bg-white px-6 py-2.5 text-sm font-bold text-brand hover:bg-white/90"
            >
              Explore FIT Elite™
            </Link>
          </div>
        </div>
      </section>

      {/* Recent 5-star reviews — continuous scroller, pauses on hover */}
      <section className="overflow-hidden bg-white py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-accent">
            500+ reviews on Trustpilot
          </p>
          <h2 className="font-display mt-2 text-3xl font-bold uppercase tracking-tight">
            What our graduates say
          </h2>
        </div>
        <div className="mt-8">
          <ReviewsMarquee />
        </div>
      </section>

      {/* Campus map — the brand's "Campuses Australia Wide" graphic */}
      <section className="bg-brand text-white">
        <div className="h-1.5 bg-accent" />
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <div className="grid items-center gap-10 lg:grid-cols-[1fr_1.2fr]">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-white/60">
                {LOCATIONS.length} campuses · 7 states &amp; territories
              </p>
              <h2 className="font-display mt-3 text-3xl font-bold uppercase tracking-tight sm:text-4xl">
                Campuses
                <br />
                Australia&nbsp;wide
              </h2>
              <p className="mt-4 max-w-md text-white/80">
                Every red marker is a real classroom inside a working gym — from
                Cairns to Hobart, Perth to the Gold Coast. Click your state to
                see its campuses, or study online from anywhere in Australia.
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <Link
                  href="/locations"
                  className="rounded-full bg-accent px-6 py-3 font-bold text-white hover:bg-accent-dark"
                >
                  Browse all campuses
                </Link>
                <Link
                  href="/study-online"
                  className="rounded-full border border-white/40 px-6 py-3 font-semibold text-white hover:border-accent"
                >
                  Study online instead
                </Link>
              </div>
            </div>
            <AustraliaMap />
          </div>
        </div>
      </section>
    </>
  );
}
