import type { Metadata } from "next";
import Link from "next/link";
import { FAQ_GROUPS } from "@/data/faqs";

export const metadata: Metadata = {
  title: "FAQs — Personal Training Course Questions Answered",
  description:
    "Answers to the questions we hear most about FIT College's fitness courses — accreditation, course lengths, online study, payment plans, RPL and fitness careers.",
};

/* FAQPage structured data — helps search and AI answer engines cite these
   answers directly (AEO priority from the 2026 SEO report). */
function faqJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ_GROUPS.flatMap((group) =>
      group.faqs.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: { "@type": "Answer", text: faq.answer },
      }))
    ),
  };
}

export default function FaqsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd()) }}
      />
      <section className="relative overflow-hidden bg-brand text-white">
        <div
          className="pointer-events-none absolute -right-20 top-0 hidden h-full w-2/5 bg-accent sm:block"
          style={{ clipPath: "polygon(45% 0, 100% 0, 100% 100%, 0 100%)" }}
          aria-hidden
        />
        <div className="relative mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <h1 className="font-display text-3xl font-bold uppercase tracking-tight sm:text-5xl">
            Frequently asked questions
          </h1>
          <p className="mt-3 max-w-2xl text-white/80">
            Wondering what FIT College is all about, which qualification you
            need, or how study actually works? Start here.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-4xl px-4 py-14 sm:px-6">
        {FAQ_GROUPS.map((group) => (
          <section key={group.title} className="mb-12">
            <h2 className="font-display text-2xl font-bold uppercase text-brand">
              {group.title}
            </h2>
            <div className="mt-5 divide-y divide-slate-200 border-y border-slate-200">
              {group.faqs.map((faq) => (
                <details key={faq.question} className="group">
                  <summary className="flex cursor-pointer items-center justify-between gap-4 py-5 text-left font-semibold text-brand [&::-webkit-details-marker]:hidden">
                    {faq.question}
                    <span
                      className="shrink-0 text-accent transition-transform group-open:rotate-90"
                      aria-hidden
                    >
                      ▶
                    </span>
                  </summary>
                  <p className="max-w-3xl pb-6 text-sm leading-relaxed text-slate-600">
                    {faq.answer}
                  </p>
                </details>
              ))}
            </div>
          </section>
        ))}

        <section className="flex flex-col items-start justify-between gap-6 bg-brand p-8 text-white sm:flex-row sm:items-center">
          <div>
            <h2 className="font-display text-xl font-bold uppercase">
              Still have a question?
            </h2>
            <p className="mt-2 max-w-xl text-white/80">
              Five minutes with a Career Advisor answers most of them — or send
              us an enquiry and we&apos;ll get back to you.
            </p>
          </div>
          <div className="flex shrink-0 flex-wrap gap-3">
            <a
              href="tel:1300887017"
              className="rounded-full bg-accent px-6 py-3 font-bold text-white hover:bg-accent-dark"
            >
              Call 1300 887 017
            </a>
            <Link
              href="/contact"
              className="rounded-full border border-white/40 px-6 py-3 font-semibold text-white hover:border-accent"
            >
              Contact us
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}
