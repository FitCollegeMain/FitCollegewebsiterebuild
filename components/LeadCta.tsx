"use client";

import { useEffect, useState } from "react";
import { advisorForPostcode, type Advisor } from "@/data/advisors";

interface Lead {
  name: string;
  phone: string;
  email: string;
  postcode: string;
  citizenship: string;
  source: string;
  capturedAt: string;
}

const CITIZENSHIP_OPTIONS = [
  "Australian citizen",
  "Permanent resident",
  "New Zealand citizen",
  "International — student visa or other",
];

function saveLead(lead: Lead) {
  /* TODO: submit to the HubSpot Forms API (portal form or v3 submissions
     endpoint) so the lead lands in the CRM before the meeting is booked.
     Until that's wired, leads are kept client-side so nothing is lost
     during testing. */
  try {
    const existing = JSON.parse(localStorage.getItem("fit-leads") ?? "[]");
    existing.push(lead);
    localStorage.setItem("fit-leads", JSON.stringify(existing));
  } catch {
    /* storage unavailable — still proceed to booking */
  }
  console.info("[lead-capture]", lead);
}

function inputClass() {
  return "mt-1.5 w-full rounded-lg border border-slate-300 px-3 py-2.5 text-brand focus:border-accent focus:outline-none";
}

function LeadModal({ source, onClose }: { source: string; onClose: () => void }) {
  const [advisor, setAdvisor] = useState<Advisor | null>(null);
  const [isInternational, setIsInternational] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const lead: Lead = {
      name: String(data.get("name") ?? ""),
      phone: String(data.get("phone") ?? ""),
      email: String(data.get("email") ?? ""),
      postcode: String(data.get("postcode") ?? ""),
      citizenship: String(data.get("citizenship") ?? ""),
      source,
      capturedAt: new Date().toISOString(),
    };
    saveLead(lead);
    setIsInternational(lead.citizenship.startsWith("International"));
    setAdvisor(advisorForPostcode(lead.postcode));
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Chat with a Career Advisor"
    >
      <div
        className="max-h-[90vh] w-full max-w-md overflow-y-auto bg-white shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4 bg-brand p-6 text-white">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/60">
              FIT College
            </p>
            <h2 className="font-display mt-1 text-xl font-bold uppercase">
              {advisor ? "Meet your Career Advisor" : "Chat with a Career Advisor"}
            </h2>
          </div>
          <button
            onClick={onClose}
            aria-label="Close"
            className="-mr-2 -mt-2 p-2 text-white/70 hover:text-white"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5 fill-none stroke-current stroke-2" aria-hidden>
              <path strokeLinecap="round" d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
        </div>

        {!advisor ? (
          <form onSubmit={handleSubmit} className="space-y-4 p-6">
            <p className="text-sm text-slate-600">
              A few quick details and we&apos;ll match you with the Career
              Advisor for your area.
            </p>
            <label className="block text-sm">
              <span className="font-semibold text-brand">Name</span>
              <input type="text" name="name" required autoFocus className={inputClass()} />
            </label>
            <label className="block text-sm">
              <span className="font-semibold text-brand">Phone</span>
              <input
                type="tel"
                name="phone"
                required
                pattern="[0-9 +()-]{8,}"
                title="Enter a valid phone number"
                className={inputClass()}
              />
            </label>
            <label className="block text-sm">
              <span className="font-semibold text-brand">Email</span>
              <input type="email" name="email" required className={inputClass()} />
            </label>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-[130px_1fr]">
              <label className="block text-sm">
                <span className="font-semibold text-brand">Postcode</span>
                <input
                  type="text"
                  name="postcode"
                  required
                  inputMode="numeric"
                  pattern="[0-9]{4}"
                  title="Enter your 4-digit Australian postcode"
                  className={inputClass()}
                />
              </label>
              <label className="block text-sm">
                <span className="font-semibold text-brand">Citizenship status</span>
                <select name="citizenship" required className={inputClass()} defaultValue="">
                  <option value="" disabled>
                    Select…
                  </option>
                  {CITIZENSHIP_OPTIONS.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </label>
            </div>
            <button
              type="submit"
              className="w-full rounded-full bg-accent px-6 py-3 font-bold text-white hover:bg-accent-dark"
            >
              Match me with my advisor
            </button>
            <p className="text-xs text-slate-400">
              We&apos;ll only use these details to help with your enquiry.
              Prefer to talk right now? Call{" "}
              <a href="tel:1300887017" className="font-semibold text-accent-dark hover:underline">
                1300 887 017
              </a>
              .
            </p>
          </form>
        ) : (
          <div className="p-6">
            <div className="border-l-4 border-accent bg-slate-50 p-5">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-accent">
                Your local Career Advisor
              </p>
              <p className="font-display mt-1 text-2xl font-bold uppercase text-brand">
                {advisor.name}
              </p>
              <p className="mt-2 text-sm text-slate-600">
                {advisor.firstName} looks after your area and can answer
                anything about courses, funding, payment plans and intakes.
              </p>
              <dl className="mt-4 space-y-1 text-sm">
                <div className="flex gap-2">
                  <dt className="font-semibold text-slate-500">Phone:</dt>
                  <dd>
                    <a
                      href={`tel:${advisor.phone.replace(/\s/g, "")}`}
                      className="font-semibold text-brand hover:underline"
                    >
                      {advisor.phone}
                    </a>
                  </dd>
                </div>
                <div className="flex gap-2">
                  <dt className="font-semibold text-slate-500">Email:</dt>
                  <dd>
                    <a
                      href={`mailto:${advisor.email}`}
                      className="font-semibold text-brand hover:underline"
                    >
                      {advisor.email}
                    </a>
                  </dd>
                </div>
              </dl>
            </div>
            {isInternational && (
              <p className="mt-4 text-sm text-slate-600">
                Studying from overseas? You may want the{" "}
                <a
                  href="/courses/international-fitness-student-pathway"
                  className="font-semibold text-accent hover:underline"
                >
                  International Student Pathway (CRICOS)
                </a>{" "}
                — {advisor.firstName} can walk you through it.
              </p>
            )}
            <a
              href={advisor.meetingLink}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 block rounded-full bg-accent px-6 py-3 text-center font-bold text-white hover:bg-accent-dark"
            >
              Book a time with {advisor.firstName} →
            </a>
            <a
              href={`tel:${advisor.phone.replace(/\s/g, "")}`}
              className="mt-3 block rounded-full border border-slate-300 px-6 py-3 text-center text-sm font-semibold text-brand hover:border-accent"
            >
              Or call {advisor.firstName} now
            </a>
          </div>
        )}
      </div>
    </div>
  );
}

/**
 * Lead-acquisition CTA — renders a button that opens the capture form,
 * then hands the lead to their postcode-territory advisor's HubSpot
 * meeting calendar. `source` tags where on the site the lead came from.
 */
export default function LeadCta({
  children,
  className,
  source,
}: {
  children: React.ReactNode;
  className?: string;
  source: string;
}) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button type="button" className={className} onClick={() => setOpen(true)}>
        {children}
      </button>
      {open && <LeadModal source={source} onClose={() => setOpen(false)} />}
    </>
  );
}
