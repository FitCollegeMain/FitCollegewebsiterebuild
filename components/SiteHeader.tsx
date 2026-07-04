import Link from "next/link";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/courses", label: "Courses" },
  { href: "/locations", label: "Locations" },
  { href: "/contact", label: "Contact" },
];

export default function SiteHeader() {
  return (
    <header className="bg-brand text-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
        <Link href="/" className="text-xl font-extrabold tracking-tight">
          FIT <span className="text-accent">College</span>
        </Link>
        <nav className="flex items-center gap-6 text-sm font-medium">
          {NAV_LINKS.map((link) => (
            <Link key={link.href} href={link.href} className="hover:text-accent">
              {link.label}
            </Link>
          ))}
          <a
            href="tel:1300887017"
            className="rounded-full bg-accent px-4 py-2 font-semibold text-brand hover:bg-accent-dark"
          >
            1300 887 017
          </a>
        </nav>
      </div>
    </header>
  );
}
