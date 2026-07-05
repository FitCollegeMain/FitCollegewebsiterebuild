import { LOCATIONS, STATE_NAMES, type StateCode } from "@/data/locations";
import { STATE_PATHS } from "@/data/statePaths";

/*
  Self-contained SVG map of Australia — the brand's "Campuses Australia Wide"
  graphic (dark landmass, Energy Red markers). Each STATE is the click
  target, linking to its section of the locations page; the campus pins are
  decorative markers on top. Outlines from rowanhogan/australian-states
  GeoJSON, simplified and projected with the constants below.
*/
const LON_MIN = 112.5;
const LON_MAX = 154.5;
const LAT_MAX = -9.5;
const LAT_MIN = -44.5;
const W = 840;
const H = 786;

const px = (lng: number) => ((lng - LON_MIN) / (LON_MAX - LON_MIN)) * W;
const py = (lat: number) => ((LAT_MAX - lat) / (LAT_MAX - LAT_MIN)) * H;

export default function AustraliaMap() {
  const campusCount = (code: string) =>
    LOCATIONS.filter((l) => l.state === code).length;

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      role="img"
      aria-label="Map of Australia — click a state to see its FIT College campuses"
      className="h-auto w-full"
    >
      {STATE_PATHS.map((state) => {
        const count = campusCount(state.code);
        const path = (
          <path
            d={state.d}
            strokeWidth="1.5"
            className={
              count > 0
                ? "cursor-pointer fill-[#242424] stroke-[#3a3a3a] transition-colors duration-150 hover:fill-[#3d2223] hover:stroke-accent"
                : "fill-[#1e1e1e] stroke-[#2e2e2e]"
            }
          />
        );
        if (count === 0) {
          return <g key={state.code}>{path}</g>;
        }
        return (
          <a
            key={state.code}
            href={`/locations#${state.code.toLowerCase()}`}
            aria-label={`${STATE_NAMES[state.code as StateCode]} — ${count} ${count === 1 ? "campus" : "campuses"}`}
          >
            <title>{`${STATE_NAMES[state.code as StateCode]} — ${count} ${count === 1 ? "campus" : "campuses"}`}</title>
            {path}
          </a>
        );
      })}
      {/* Campus markers — decorative; the states carry the interaction */}
      {LOCATIONS.map((location) => (
        <circle
          key={location.slug}
          cx={px(location.lng)}
          cy={py(location.lat)}
          r="7"
          fill="#ce2829"
          stroke="#181818"
          strokeWidth="2.5"
          pointerEvents="none"
        />
      ))}
    </svg>
  );
}
