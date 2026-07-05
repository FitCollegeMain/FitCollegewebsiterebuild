import type { Metadata } from "next";
import Link from "next/link";
import LeadCta from "@/components/LeadCta";

export const metadata: Metadata = {
  title: "About FIT College — Fitness Education Since 2009",
  description:
    "FIT College is a nationally recognised RTO (31903) delivering fitness, personal training and sport coaching qualifications since 2009 — taught inside real, fully operational gyms by working industry professionals.",
};

const DIFFERENTIATORS = [
  {
    title: "Real gyms, not classrooms",
    text: "Our campuses sit inside fully operational fitness centres — not small studios. Students train around reception, real PT sessions, facility marketing, maintenance and member engagement, so they graduate knowing how a gym actually runs.",
  },
  {
    title: "Taught by working professionals",
    text: "Senior instructors hold a university degree or fitness credential plus a Certificate IV in Training & Assessment, and bring a minimum of five years' active industry experience — because they still work in the field they teach.",
  },
  {
    title: "Honest about the industry",
    text: "We prepare students for the real job: early starts, weekend work, client management and the realities of self-employment — alongside the genuine rewards of a career in fitness.",
  },
];

const ORG_FACTS = [
  { label: "RTO number", value: "31903" },
  { label: "ABN", value: "51 143 802 966" },
  { label: "CRICOS provider code", value: "03926G" },
  { label: "Head office", value: "Maroochydore, QLD" },
];

export default function AboutPage() {
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
            Established 2009 · RTO 31903
          </p>
          <h1 className="font-display mt-3 max-w-3xl text-4xl font-bold uppercase leading-tight sm:text-5xl">
            About FIT College
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-white/80">
            Established in 2009, FIT College is a Registered Training
            Organisation delivering high-quality, nationally recognised
            qualifications in fitness, personal training and sport coaching —
            and a trusted fitness-education leader across Australia and the
            Pacific.
          </p>
        </div>
      </section>

      {/* Stat strip */}
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:grid-cols-4 sm:px-6">
          <div>
            <p className="font-display text-3xl font-bold uppercase text-accent">
              Since 2009
            </p>
            <p className="mt-1 text-sm text-slate-600">
              15+ years training work-ready fitness professionals.
            </p>
          </div>
          <div>
            <p className="font-display text-3xl font-bold uppercase text-accent">
              20+ campuses
            </p>
            <p className="mt-1 text-sm text-slate-600">
              Inside real gyms, Australia-wide — plus the Virtual Campus online.
            </p>
          </div>
          <div>
            <p className="font-display text-3xl font-bold uppercase text-accent">
              Lowest risk
            </p>
            <p className="mt-1 text-sm text-slate-600">
              The lowest achievable RTO risk rating, renewed on five-year terms
              at every audit.
            </p>
          </div>
          <div>
            <p className="font-display text-3xl font-bold uppercase text-accent">
              7am–7pm, 7 days
            </p>
            <p className="mt-1 text-sm text-slate-600">
              Real education support, every day of the week.
            </p>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        {/* Who we are */}
        <div className="grid gap-10 lg:grid-cols-[1fr_360px]">
          <div>
            <h2 className="font-display text-2xl font-bold uppercase">
              What makes FIT College different
            </h2>
            <div className="mt-6 space-y-6">
              {DIFFERENTIATORS.map((item) => (
                <div
                  key={item.title}
                  className="border-l-4 border-accent bg-white p-6 shadow-sm ring-1 ring-slate-200"
                >
                  <h3 className="text-lg font-bold">{item.title}</h3>
                  <p className="mt-2 leading-relaxed text-slate-600">{item.text}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Org facts */}
          <aside>
            <div className="bg-slate-50 p-6">
              <h2 className="font-display text-lg font-bold uppercase">
                The registration
              </h2>
              <dl className="mt-4 divide-y divide-slate-200 border-y border-slate-200">
                {ORG_FACTS.map((fact) => (
                  <div
                    key={fact.label}
                    className="flex items-baseline justify-between gap-4 py-3"
                  >
                    <dt className="text-sm text-slate-500">{fact.label}</dt>
                    <dd className="text-sm font-bold text-brand">{fact.value}</dd>
                  </div>
                ))}
              </dl>
              <p className="mt-4 text-xs text-slate-500">
                Nationally recognised training delivered under the Australian
                Skills Quality Authority (ASQA) framework.
              </p>
            </div>
            <div className="mt-6 bg-brand p-6 text-white">
              <h2 className="font-display text-lg font-bold uppercase">
                Ready to talk it through?
              </h2>
              <p className="mt-2 text-sm text-white/80">
                Flexible, interest-free payment plans and a five-minute chat to
                find the right course for you.
              </p>
              <LeadCta
                source="about"
                className="mt-4 block w-full rounded-full bg-accent px-5 py-3 text-center font-bold text-white hover:bg-accent-dark"
              >
                Request an info pack
              </LeadCta>
              <a
                href="tel:1300887017"
                className="mt-3 block rounded-full border border-white/40 px-5 py-3 text-center text-sm font-semibold text-white hover:border-accent"
              >
                Call 1300 887 017
              </a>
            </div>
          </aside>
        </div>

        {/* CTA band */}
        <section className="mt-14 flex flex-col items-start justify-between gap-6 bg-slate-50 p-8 sm:flex-row sm:items-center sm:p-10">
          <div>
            <h2 className="font-display text-2xl font-bold uppercase">
              Come see a campus
            </h2>
            <p className="mt-2 max-w-xl text-slate-600">
              The best way to understand the FIT College difference is to stand
              in one of our gyms. Find your nearest campus and book a look
              around.
            </p>
          </div>
          <Link
            href="/locations"
            className="shrink-0 rounded-full bg-brand px-6 py-3 font-bold text-white hover:bg-brand-light"
          >
            Find a campus →
          </Link>
        </section>
      </div>
    </>
  );
}
