import type { Metadata } from "next";
import Link from "next/link";
import { HEAD_OFFICE } from "@/data/locations";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with FIT College — call 1300 887 017 or send us an enquiry.",
};

export default function ContactPage() {
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
            Contact Us
          </h1>
          <p className="mt-3 max-w-2xl text-white/80">
            The fastest answer is a five-minute chat with a Career Advisor —
            call{" "}
            <a href="tel:1300887017" className="font-bold text-white underline decoration-accent decoration-2 underline-offset-4">
              1300 887 017
            </a>{" "}
            or request a callback below.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="grid gap-10 lg:grid-cols-[1fr_380px]">
          <form
            className="rounded-xl border border-slate-200 bg-white p-8 shadow-sm"
            action="#"
            method="post"
          >
            <h2 className="text-xl font-bold text-brand">Send an enquiry</h2>
            <p className="mt-1 text-sm text-slate-500">
              Fill in the form and our team will get back to you.
            </p>
            <div className="mt-6 grid gap-5 sm:grid-cols-2">
              <label className="block text-sm">
                <span className="font-semibold text-slate-700">Name</span>
                <input
                  type="text"
                  name="name"
                  required
                  className="mt-1.5 w-full rounded-lg border border-slate-300 px-3 py-2 focus:border-accent focus:outline-none"
                />
              </label>
              <label className="block text-sm">
                <span className="font-semibold text-slate-700">Phone</span>
                <input
                  type="tel"
                  name="phone"
                  className="mt-1.5 w-full rounded-lg border border-slate-300 px-3 py-2 focus:border-accent focus:outline-none"
                />
              </label>
              <label className="block text-sm sm:col-span-2">
                <span className="font-semibold text-slate-700">Email</span>
                <input
                  type="email"
                  name="email"
                  required
                  className="mt-1.5 w-full rounded-lg border border-slate-300 px-3 py-2 focus:border-accent focus:outline-none"
                />
              </label>
              <label className="block text-sm sm:col-span-2">
                <span className="font-semibold text-slate-700">Message</span>
                <textarea
                  name="message"
                  rows={5}
                  required
                  className="mt-1.5 w-full rounded-lg border border-slate-300 px-3 py-2 focus:border-accent focus:outline-none"
                />
              </label>
            </div>
            <button
              type="submit"
              className="mt-6 rounded-full bg-accent px-6 py-2.5 text-sm font-bold text-white hover:bg-accent-dark"
            >
              Send enquiry
            </button>
            <p className="mt-3 text-xs text-slate-400">
              Note: this form isn&apos;t connected to a backend yet.
            </p>
          </form>

          <aside className="space-y-6">
            <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-lg font-bold text-brand">Call us</h2>
              <a
                href="tel:1300887017"
                className="mt-2 inline-block text-2xl font-extrabold text-accent-dark hover:underline"
              >
                {HEAD_OFFICE.phone}
              </a>
              <p className="mt-1 text-sm text-slate-500">
                Monday to Friday, business hours (AEST)
              </p>
            </div>
            <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-lg font-bold text-brand">Head office</h2>
              <address className="mt-2 text-sm not-italic leading-relaxed text-slate-600">
                {HEAD_OFFICE.address}
                <br />
                {HEAD_OFFICE.suburb} {HEAD_OFFICE.state} {HEAD_OFFICE.postcode}
              </address>
            </div>
            <div className="rounded-xl bg-slate-50 p-6">
              <h2 className="text-lg font-bold text-brand">Visit a campus</h2>
              <p className="mt-2 text-sm text-slate-600">
                Prefer to talk in person? Book a tour at any of our campuses
                across Australia.
              </p>
              <Link
                href="/locations"
                className="mt-4 inline-block text-sm font-semibold text-accent-dark hover:underline"
              >
                Find your nearest campus →
              </Link>
            </div>
          </aside>
        </div>
      </div>
    </>
  );
}
