import Link from "next/link";

const NAV_LINKS = [
  { href: "/courses", label: "Courses" },
  { href: "/fit-elite", label: "FIT Elite™" },
  { href: "/locations", label: "Locations" },
  { href: "/funding", label: "Funding" },
  { href: "/contact", label: "Contact" },
];

export default function SiteHeader() {
  return (
    <header className="bg-brand text-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4 sm:px-6">
        <Link href="/" className="flex items-baseline gap-2">
          <span className="font-display text-xl font-bold uppercase tracking-tight">
            FIT College
          </span>
          <span className="hidden text-[10px] font-semibold uppercase tracking-widest text-white/50 sm:inline">
            RTO 31903
          </span>
        </Link>
        <nav className="flex items-center gap-5 text-sm font-semibold">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="underline-offset-4 hover:underline hover:decoration-accent hover:decoration-2"
            >
              {link.label}
            </Link>
          ))}
          <a
            href="tel:1300887017"
            className="rounded-full bg-accent px-4 py-2 font-bold text-white hover:bg-accent-dark"
          >
            Chat with a Career Advisor
          </a>
        </nav>
      </div>
    </header>
  );
}
