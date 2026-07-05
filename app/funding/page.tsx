import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Government Funded Fitness Courses QLD — Career Start",
  description:
    "FIT College is a Skills Assure Supplier under the Queensland Government's Career Start programme. Eligible students study the SIS30321 Certificate III in Fitness from a $1,750 co-contribution.",
};

const ELIGIBILITY = [
  "You live in Queensland",
  "You've finished or left school",
  "You don't already hold a Certificate III or higher qualification",
  "You're an Australian or New Zealand citizen, permanent resident, or hold an eligible visa",
];

export default function FundingPage() {
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
            QLD Government · Career Start · Skills Assure Supplier
          </p>
          <h1 className="font-display mt-3 max-w-3xl text-4xl font-bold uppercase leading-tight sm:text-5xl">
            Government-subsidised fitness courses in Queensland
          </h1>
          <p className="mt-5 max-w-xl text-lg text-white/80">
            FIT College is an approved Skills Assure Supplier under the
            Queensland Government&apos;s Career Start programme — eligible
            students study the SIS30321 Certificate III in Fitness for a
            fraction of the full fee.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <div className="grid gap-10 lg:grid-cols-[1fr_380px]">
          <div>
            <h2 className="font-display text-2xl font-bold uppercase">
              What you pay under Career Start
            </h2>
            <div className="mt-6 grid gap-6 sm:grid-cols-2">
              <div className="border-l-4 border-accent bg-white p-6 shadow-sm ring-1 ring-slate-200">
                <p className="font-display text-3xl font-bold text-accent">$1,750</p>
                <p className="mt-1 text-sm font-semibold">Concessional co-contribution</p>
                <p className="mt-2 text-sm text-slate-600">
                  For eligible concession card holders enrolling in the
                  SIS30321 Certificate III in Fitness.
                </p>
              </div>
              <div className="border-l-4 border-accent bg-white p-6 shadow-sm ring-1 ring-slate-200">
                <p className="font-display text-3xl font-bold text-accent">$2,000</p>
                <p className="mt-1 text-sm font-semibold">Standard co-contribution</p>
                <p className="mt-2 text-sm text-slate-600">
                  For all other eligible Career Start students — the Queensland
                  Government funds the balance of your training.
                </p>
              </div>
            </div>

            <h2 className="font-display mt-12 text-2xl font-bold uppercase">
              Are you eligible?
            </h2>
            <p className="mt-3 max-w-2xl text-slate-600">
              Career Start replaced the Certificate 3 Guarantee from 1 July
              2025. You&apos;re likely eligible if:
            </p>
            <ul className="mt-5 space-y-3">
              {ELIGIBILITY.map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="mt-1 h-4 w-4 shrink-0 bg-accent" style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%)" }} aria-hidden />
                  <span className="text-slate-700">{item}</span>
                </li>
              ))}
            </ul>
            <p className="mt-6 max-w-2xl text-sm text-slate-500">
              Over 40? You may instead qualify for up to $2,200 under the
              Skills Checkpoint programme. Eligibility is confirmed during
              enrolment — the fastest way to know is a five-minute call.
            </p>

            <h2 className="font-display mt-12 text-2xl font-bold uppercase">
              Not in Queensland?
            </h2>
            <p className="mt-3 max-w-2xl text-slate-600">
              Interest-free payment plans are available on all courses at every
              campus, Australia-wide. Talk to a Career Advisor about spreading
              your fees over manageable weekly payments.
            </p>
          </div>

          <aside>
            <div className="bg-brand p-6 text-white">
              <h2 className="font-display text-xl font-bold uppercase">
                Check your eligibility in 5 minutes
              </h2>
              <p className="mt-3 text-sm text-white/80">
                A Career Advisor will confirm your Career Start eligibility,
                your co-contribution amount and the next intake — no
                obligation.
              </p>
              <a
                href="tel:1300887017"
                className="mt-5 block rounded-full bg-accent px-5 py-3 text-center font-bold text-white hover:bg-accent-dark"
              >
                Call 1300 887 017
              </a>
              <Link
                href="/contact"
                className="mt-3 block rounded-full border border-white/40 px-5 py-3 text-center text-sm font-semibold text-white hover:border-accent"
              >
                Request a callback
              </Link>
            </div>
            <div className="mt-6 bg-slate-50 p-6 text-sm text-slate-600">
              <p className="font-semibold text-brand">The fine print</p>
              <p className="mt-2">
                FIT College (RTO 31903) is an approved Skills Assure Supplier
                for the Queensland Government Career Start programme.
                Co-contribution amounts apply to the SIS30321 Certificate III
                in Fitness and are set by the programme, not by FIT College.
              </p>
            </div>
          </aside>
        </div>
      </div>
    </>
  );
}
