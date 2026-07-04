import Link from "next/link";
import { HEAD_OFFICE } from "@/data/locations";

const FOOTER_LINKS = [
  { href: "/courses", label: "Courses" },
  { href: "/locations", label: "Locations" },
  { href: "/contact", label: "Contact" },
];

export default function SiteFooter() {
  return (
    <footer className="bg-brand text-white">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <div className="flex flex-col justify-between gap-8 sm:flex-row">
          <div className="flex flex-col gap-2 text-sm text-white/80">
            <p className="font-semibold text-white">{HEAD_OFFICE.name}</p>
            <p>
              {HEAD_OFFICE.address}, {HEAD_OFFICE.suburb} {HEAD_OFFICE.state}{" "}
              {HEAD_OFFICE.postcode}
            </p>
            <p>
              Phone:{" "}
              <a href="tel:1300887017" className="text-accent hover:underline">
                {HEAD_OFFICE.phone}
              </a>
            </p>
          </div>
          <nav className="flex flex-col gap-2 text-sm">
            {FOOTER_LINKS.map((link) => (
              <Link key={link.href} href={link.href} className="text-white/80 hover:text-accent">
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
        <p className="mt-6 text-xs text-white/50">
          © {new Date().getFullYear()} FIT College. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
