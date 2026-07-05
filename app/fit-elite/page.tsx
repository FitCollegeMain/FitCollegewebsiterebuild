import type { Metadata } from "next";
import Link from "next/link";
import { FIT_ELITE, INTAKES } from "@/data/courses";

export const metadata: Metadata = {
  title: "FIT Elite™ — The Dual-Career Personal Trainer Program",
  description:
    "Certificate III + IV in Fitness, a 30-CEC short course pack, and an NDIS disability or ASCA strength & conditioning stream. Earn in disability support from week one while you build your PT business.",
};

export default function FitElitePage() {
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
            {FIT_ELITE.descriptor}
          </p>
          <h1 className="font-display mt-3 max-w-3xl text-4xl font-bold uppercase leading-tight sm:text-5xl">
            {FIT_ELITE.name}: two careers,
            <br />
            one program
          </h1>
          <p className="mt-5 max-w-xl text-lg text-white/80">
            Most new Personal Trainers struggle for one reason: a client book
            takes months to build. FIT Elite™ graduates don&apos;t wait —
            qualify for paid disability support work from week one while your
            PT business grows.
          </p>
          <a
            href="tel:1300887017"
            className="mt-8 inline-block rounded-full bg-accent px-6 py-3 font-bold text-white hover:bg-accent-dark"
          >
            Chat with a Career Advisor
          </a>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <h2 className="font-display text-2xl font-bold uppercase">
              Everything in the program
            </h2>
            <ul className="mt-6 space-y-4">
              {FIT_ELITE.includes.map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="mt-1 h-4 w-4 shrink-0 bg-accent" style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%)" }} aria-hidden />
                  <span className="text-slate-700">{item}</span>
                </li>
              ))}
            </ul>
            <p className="mt-6 text-sm text-slate-500">
              Three fixed intakes each year — {INTAKES}. Interest-free payment
              plans available.
            </p>
          </div>

          <div>
            <h2 className="font-display text-2xl font-bold uppercase">
              Choose your specialty stream
            </h2>
            <div className="mt-6 space-y-5">
              {FIT_ELITE.streams.map((stream) => (
                <div key={stream.name} className="border-l-4 border-accent bg-white p-6 shadow-sm ring-1 ring-slate-200">
                  <h3 className="font-bold">{stream.name}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">
                    {stream.detail}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <section className="mt-14 bg-slate-50 p-8 sm:p-10">
          <h2 className="font-display text-2xl font-bold uppercase">
            Why a dual career works
          </h2>
          <div className="mt-6 grid gap-8 md:grid-cols-3">
            <div>
              <p className="font-display text-2xl font-bold text-accent">Week 1</p>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">
                The NDIS disability stream qualifies you for paid support work
                immediately — income security while you find your feet.
              </p>
            </div>
            <div>
              <p className="font-display text-2xl font-bold text-accent">Months 1–6</p>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">
                Build your PT client book on your terms — without the pressure
                of needing every session to pay the rent.
              </p>
            </div>
            <div>
              <p className="font-display text-2xl font-bold text-accent">Beyond</p>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">
                Train a wider range of clients than a standard PT — adaptive and
                inclusive exercise is the industry&apos;s fastest-growing
                stream.
              </p>
            </div>
          </div>
        </section>

        <section className="mt-10 flex flex-col items-start justify-between gap-6 bg-brand p-8 text-white sm:flex-row sm:items-center sm:p-10">
          <div>
            <h2 className="font-display text-2xl font-bold uppercase">
              Talk it through with a real person
            </h2>
            <p className="mt-2 max-w-xl text-white/80">
              Five minutes with a Career Advisor will tell you if FIT Elite™
              fits your goals, your schedule and your budget.
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
