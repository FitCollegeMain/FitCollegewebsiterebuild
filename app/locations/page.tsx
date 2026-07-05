import type { Metadata } from "next";
import Link from "next/link";
import { HEAD_OFFICE, locationsByState } from "@/data/locations";
import LocationCard from "@/components/LocationCard";

export const metadata: Metadata = {
  title: "Campus Locations",
  description:
    "Find your nearest FIT College campus. Campuses across Queensland, New South Wales, Victoria, South Australia, Western Australia, ACT and Tasmania.",
};

export default function LocationsPage() {
  const groups = locationsByState().filter((group) => group.locations.length > 0);
  const totalCampuses = groups.reduce((sum, group) => sum + group.locations.length, 0);

  return (
    <>
      <section className="relative overflow-hidden bg-brand text-white">
        <div
          className="pointer-events-none absolute -right-20 top-0 hidden h-full w-2/5 bg-accent sm:block"
          style={{ clipPath: "polygon(45% 0, 100% 0, 100% 100%, 0 100%)" }}
          aria-hidden
        />
        <div className="relative mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <h1 className="font-display text-3xl font-bold uppercase tracking-tight sm:text-5xl">
            Campus Locations
          </h1>
          <p className="mt-3 max-w-2xl text-white/80">
            Study at any of our {totalCampuses} campuses across Australia, hosted
            inside leading gyms and fitness facilities — or study online from
            anywhere.
          </p>
        </div>
        <div className="h-2 bg-accent" />
      </section>

      {/* State filter — CSS-only via :target. Clicking a state hides the
          other states' campuses; "All campuses" resets the view. */}
      <div className="campus-filter">
        <nav className="sticky top-0 z-10 border-b border-slate-200 bg-white/95 backdrop-blur">
          <div className="mx-auto flex max-w-6xl gap-2 overflow-x-auto px-4 py-3 sm:px-6">
            <a
              href="#all-campuses"
              className="filter-pill whitespace-nowrap rounded-full border border-slate-200 px-4 py-1.5 text-sm font-semibold text-slate-700 hover:border-accent"
            >
              All campuses
            </a>
            {groups.map((group) => (
              <a
                key={group.state}
                href={`#${group.state.toLowerCase()}`}
                className="filter-pill whitespace-nowrap rounded-full border border-slate-200 px-4 py-1.5 text-sm font-medium text-slate-700 hover:border-accent"
              >
                {group.state}
              </a>
            ))}
          </div>
        </nav>

        <div className="finder mx-auto max-w-6xl px-4 py-12 sm:px-6">
          {groups.map((group) => (
            <section key={group.state} id={group.state.toLowerCase()} className="scroll-mt-20 py-6">
              <h2 className="font-display text-2xl font-bold uppercase text-brand">
                {group.stateName}
                <span className="ml-3 align-middle text-sm font-medium text-slate-400">
                  {group.locations.length}{" "}
                  {group.locations.length === 1 ? "campus" : "campuses"}
                </span>
              </h2>
              <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {group.locations.map((location) => (
                  <LocationCard key={location.slug} location={location} />
                ))}
              </div>
              <a
                href="#all-campuses"
                className="filter-reset mt-8 hidden text-sm font-semibold text-accent hover:underline"
              >
                ← Show all campuses
              </a>
            </section>
          ))}
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-4 pb-12 sm:px-6">
        <section className="mt-2 rounded-xl bg-slate-50 p-8">
          <h2 className="text-xl font-bold text-brand">Can&apos;t make it to a campus?</h2>
          <p className="mt-2 max-w-2xl text-slate-600">
            All of our fitness courses are also available online, so you can
            study from anywhere in Australia —{" "}
            <Link href="/study-online" className="font-semibold text-accent hover:underline">
              see how online study works
            </Link>
            . Contact our team to find out which study option suits you best.
          </p>
          <p className="mt-4 text-sm text-slate-600">
            <span className="font-semibold text-brand">{HEAD_OFFICE.name}:</span>{" "}
            {HEAD_OFFICE.address}, {HEAD_OFFICE.suburb} {HEAD_OFFICE.state}{" "}
            {HEAD_OFFICE.postcode} ·{" "}
            <a href="tel:1300887017" className="font-semibold text-accent-dark hover:underline">
              {HEAD_OFFICE.phone}
            </a>
          </p>
        </section>
      </div>
    </>
  );
}
