import Link from "next/link";
import { LOCATIONS } from "@/data/locations";

export default function HomePage() {
  return (
    <section className="bg-gradient-to-b from-brand to-brand-light text-white">
      <div className="mx-auto max-w-6xl px-4 py-24 sm:px-6">
        <h1 className="max-w-2xl text-4xl font-extrabold tracking-tight sm:text-5xl">
          Launch your career in fitness
        </h1>
        <p className="mt-4 max-w-xl text-lg text-white/80">
          Nationally recognised Certificate III and IV fitness courses,
          delivered at {LOCATIONS.length} campuses across Australia and online.
        </p>
        <Link
          href="/locations"
          className="mt-8 inline-block rounded-full bg-accent px-6 py-3 font-semibold text-brand hover:bg-accent-dark"
        >
          Find a campus near you
        </Link>
      </div>
    </section>
  );
}
