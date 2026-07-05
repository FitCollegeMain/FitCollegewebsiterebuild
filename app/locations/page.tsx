import type { Metadata } from "next";
import Link from "next/link";
import { HEAD_OFFICE, locationsByState, type CampusLocation } from "@/data/locations";

export const metadata: Metadata = {
  title: "Campus Locations",
  description:
    "Find your nearest FIT College campus. Campuses across Queensland, New South Wales, Victoria, South Australia, Western Australia, ACT and Tasmania.",
};

function mapsUrl(location: CampusLocation) {
  const query = `${location.venue}, ${location.address}, ${location.suburb} ${location.state} ${location.postcode}`;
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
}

function LocationCard({ location }: { location: CampusLocation }) {
  return (
    <div className="flex flex-col rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-md">
      <h3 className="text-lg font-bold text-brand">
        <Link href={`/locations/${location.slug}`} className="hover:underline">
          {location.name}
        </Link>
      </h3>
      <p className="mt-1 text-sm font-medium text-accent-dark">{location.venue}</p>
      <address className="mt-3 text-sm not-italic leading-relaxed text-slate-600">
        {location.address}
        <br />
        {location.suburb} {location.state} {location.postcode}
      </address>
      <div className="mt-4 flex flex-1 items-end gap-4 text-sm font-semibold">
        <a href={`tel:${location.phone.replace(/\s/g, "")}`} className="text-brand hover:underline">
          {location.phone}
        </a>
        <a
          href={mapsUrl(location)}
          target="_blank"
          rel="noopener noreferrer"
          className="text-accent-dark hover:underline"
        >
          Get directions
        </a>
        <Link
          href={`/locations/${location.slug}`}
          className="ml-auto text-brand hover:underline"
        >
          View campus →
        </Link>
      </div>
    </div>
  );
}

export default function LocationsPage() {
  const groups = locationsByState().filter((group) => group.locations.length > 0);
  const totalCampuses = groups.reduce((sum, group) => sum + group.locations.length, 0);

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

      <nav className="sticky top-0 z-10 border-b border-slate-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-6xl gap-2 overflow-x-auto px-4 py-3 sm:px-6">
          {groups.map((group) => (
            <a
              key={group.state}
              href={`#${group.state.toLowerCase()}`}
              className="whitespace-nowrap rounded-full border border-slate-200 px-4 py-1.5 text-sm font-medium text-slate-700 hover:border-accent hover:text-brand"
            >
              {group.state}
            </a>
          ))}
        </div>
      </nav>

      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
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
          </section>
        ))}

        <section className="mt-10 rounded-xl bg-slate-50 p-8">
          <h2 className="text-xl font-bold text-brand">Can&apos;t make it to a campus?</h2>
          <p className="mt-2 max-w-2xl text-slate-600">
            All of our fitness courses are also available online, so you can
            study from anywhere in Australia. Contact our team to find out which
            study option suits you best.
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
