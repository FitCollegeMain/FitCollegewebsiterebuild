import { PROOF_POINTS } from "@/data/courses";

function UspItem({ stat, label }: { stat: string; label: string }) {
  return (
    <div className="flex w-72 shrink-0 flex-col border-l-2 border-accent pl-4">
      <p className="font-display text-2xl font-bold uppercase text-accent">{stat}</p>
      <p className="mt-1 text-sm leading-relaxed text-slate-600">{label}</p>
    </div>
  );
}

/* Continuous side-scrolling USP banner — same marquee mechanics as the
   reviews block (pauses on hover, honours prefers-reduced-motion). */
export default function UspMarquee() {
  return (
    <div className="marquee overflow-hidden" aria-label="Why study with FIT College">
      <div className="marquee-track usp-track flex gap-10 py-1 pr-10">
        {PROOF_POINTS.map((point) => (
          <UspItem key={point.stat} stat={point.stat} label={point.label} />
        ))}
        <div className="flex gap-10" aria-hidden>
          {PROOF_POINTS.map((point) => (
            <UspItem key={`dup-${point.stat}`} stat={point.stat} label={point.label} />
          ))}
        </div>
      </div>
    </div>
  );
}
