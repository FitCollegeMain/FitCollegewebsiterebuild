"use client";

import Link from "next/link";
import { useState } from "react";
import type { CampusLocation } from "@/data/locations";

function fullAddress(location: CampusLocation) {
  return `${location.address}, ${location.suburb} ${location.state} ${location.postcode}`;
}

function mapsSearchUrl(location: CampusLocation) {
  const query = `${location.venue}, ${fullAddress(location)}`;
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
}

function mapsEmbedUrl(location: CampusLocation) {
  // Tight zoom so the hover preview reads as "here's exactly where it is"
  return `https://maps.google.com/maps?q=${encodeURIComponent(fullAddress(location))}&z=16&output=embed`;
}

export default function LocationCard({ location }: { location: CampusLocation }) {
  // The map iframe only gets its src on first hover/focus, so the locations
  // page doesn't load 20 Google Maps embeds upfront.
  const [mapLoaded, setMapLoaded] = useState(false);

  return (
    <div
      className="group relative flex flex-col overflow-hidden border-l-4 border-accent bg-white p-6 shadow-sm ring-1 ring-slate-200 transition hover:shadow-lg"
      onMouseEnter={() => setMapLoaded(true)}
      onFocus={() => setMapLoaded(true)}
    >
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
        <Link
          href={`/locations/${location.slug}`}
          className="ml-auto rounded-full bg-accent px-4 py-1.5 text-xs font-bold text-white transition group-hover:bg-accent-dark"
        >
          View campus →
        </Link>
      </div>

      {/* Hover state — a zoomed-in map takes over the tile */}
      <div
        className="pointer-events-none absolute inset-0 flex flex-col justify-end bg-brand opacity-0 transition-opacity duration-300 group-focus-within:pointer-events-auto group-focus-within:opacity-100 group-hover:pointer-events-auto group-hover:opacity-100 motion-reduce:transition-none"
        aria-hidden={!mapLoaded}
      >
        {/* Fallback panel shown behind/before the map loads */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-sm font-semibold text-white/60">
            📍 {location.suburb} {location.state}
          </span>
        </div>
        {mapLoaded && (
          <iframe
            title={`Map of ${location.name}`}
            src={mapsEmbedUrl(location)}
            className="absolute inset-0 h-full w-full border-0"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        )}
        <div className="relative flex items-center justify-between gap-3 bg-brand/95 px-4 py-3">
          <div className="min-w-0">
            <p className="truncate text-sm font-bold text-white">{location.name}</p>
            <a
              href={mapsSearchUrl(location)}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-semibold text-white/70 underline-offset-2 hover:underline"
            >
              Get directions
            </a>
          </div>
          <Link
            href={`/locations/${location.slug}`}
            className="shrink-0 rounded-full bg-accent px-4 py-2 text-xs font-bold text-white hover:bg-accent-dark"
          >
            View campus →
          </Link>
        </div>
      </div>
    </div>
  );
}
