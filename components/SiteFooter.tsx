import Link from "next/link";
import { HEAD_OFFICE } from "@/data/locations";

const FOOTER_LINKS = [
  { href: "/courses", label: "Courses" },
  { href: "/fit-elite", label: "FIT Elite™" },
  { href: "/courses/international-fitness-student-pathway", label: "International (CRICOS)" },
  { href: "/study-online", label: "Study Online" },
  { href: "/locations", label: "Locations" },
  { href: "/funding", label: "Funding" },
  { href: "/faqs", label: "FAQs" },
  { href: "/contact", label: "Contact" },
];

export default function SiteFooter() {
  return (
    <footer className="bg-brand text-white">
      <div className="h-1.5 bg-accent" />
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <div className="flex flex-col justify-between gap-8 sm:flex-row">
          <div className="flex flex-col gap-2 text-sm text-white/80">
            <p className="font-display text-base font-bold uppercase text-white">
              FIT College
            </p>
            <p className="font-semibold text-white">{HEAD_OFFICE.name}</p>
            <p>
              {HEAD_OFFICE.address}, {HEAD_OFFICE.suburb} {HEAD_OFFICE.state}{" "}
              {HEAD_OFFICE.postcode}
            </p>
            <p>
              Phone:{" "}
              <a href="tel:1300887017" className="font-semibold text-white underline-offset-4 hover:underline hover:decoration-accent">
                {HEAD_OFFICE.phone}
              </a>
            </p>
          </div>
          <nav className="flex flex-col gap-2 text-sm">
            {FOOTER_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-white/80 underline-offset-4 hover:underline hover:decoration-accent"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
        <p className="mt-8 text-xs text-white/50">
          © {new Date().getFullYear()} FIT College · RTO 31903 · SIS30321
          Certificate III in Fitness · SIS40221 Certificate IV in Fitness
        </p>
      </div>
    </footer>
  );
}
