import Link from "next/link";

const NAV_LINKS = [
  { href: "/courses", label: "Courses" },
  { href: "/fit-elite", label: "FIT Elite™" },
  { href: "/study-online", label: "Study Online" },
  { href: "/locations", label: "Locations" },
  { href: "/funding", label: "Funding" },
  { href: "/contact", label: "Contact" },
];

/*
  The mobile menu is CSS-only (hidden checkbox + peer-checked panel), so it
  needs no JavaScript and works in static exports too.
*/
export default function SiteHeader() {
  return (
    <header className="bg-brand text-white">
      <div className="relative mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4 sm:px-6">
        <Link href="/" className="flex items-baseline gap-2">
          <span className="font-display text-xl font-bold uppercase tracking-tight">
            FIT College
          </span>
          <span className="hidden text-[10px] font-semibold uppercase tracking-widest text-white/50 sm:inline">
            RTO 31903
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-5 text-sm font-semibold lg:flex">
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

        {/* Mobile: tap-to-call + menu toggle */}
        <div className="flex items-center gap-1 lg:hidden">
          <a
            href="tel:1300887017"
            aria-label="Call FIT College on 1300 887 017"
            className="rounded-full bg-accent p-2.5 text-white hover:bg-accent-dark"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current" aria-hidden>
              <path d="M6.6 10.8a15.6 15.6 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.25 11.4 11.4 0 0 0 3.6.58 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1 11.4 11.4 0 0 0 .57 3.6 1 1 0 0 1-.25 1z" />
            </svg>
          </a>
          <input type="checkbox" id="nav-toggle" className="peer sr-only" />
          <label
            htmlFor="nav-toggle"
            aria-label="Open menu"
            className="-mr-2 cursor-pointer select-none p-2"
          >
            <svg
              viewBox="0 0 24 24"
              className="icon-open block h-6 w-6 fill-none stroke-current stroke-2"
              aria-hidden
            >
              <path strokeLinecap="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
            <svg
              viewBox="0 0 24 24"
              className="icon-close hidden h-6 w-6 fill-none stroke-current stroke-2"
              aria-hidden
            >
              <path strokeLinecap="round" d="M6 6l12 12M18 6L6 18" />
            </svg>
          </label>

          {/* Mobile panel */}
          <nav className="absolute left-0 right-0 top-full z-30 hidden flex-col border-t border-white/10 bg-brand px-4 pb-6 pt-2 shadow-lg peer-checked:flex">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="border-b border-white/10 py-3.5 text-base font-semibold"
              >
                {link.label}
              </Link>
            ))}
            <a
              href="tel:1300887017"
              className="mt-5 rounded-full bg-accent px-5 py-3 text-center font-bold text-white hover:bg-accent-dark"
            >
              Chat with a Career Advisor
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
}
