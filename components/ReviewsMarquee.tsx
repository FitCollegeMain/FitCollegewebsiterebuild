import { REVIEWS, type Review } from "@/data/reviews";

function Stars() {
  return (
    <div className="flex gap-0.5 text-accent" aria-label="5 out of 5 stars">
      {Array.from({ length: 5 }, (_, i) => (
        <svg key={i} viewBox="0 0 20 20" className="h-4 w-4 fill-current" aria-hidden>
          <path d="M10 1.5l2.6 5.3 5.9.9-4.2 4.1 1 5.8L10 14.9l-5.3 2.7 1-5.8L1.5 7.7l5.9-.9L10 1.5z" />
        </svg>
      ))}
    </div>
  );
}

function ReviewCard({ review }: { review: Review }) {
  return (
    <figure className="flex w-80 shrink-0 flex-col border-l-4 border-accent bg-white p-6 shadow-sm ring-1 ring-slate-200">
      <Stars />
      <blockquote className="mt-3 flex-1 text-sm leading-relaxed text-slate-600">
        &ldquo;{review.text}&rdquo;
      </blockquote>
      <figcaption className="mt-4">
        <p className="text-sm font-bold text-brand">{review.name}</p>
        <p className="text-xs text-slate-500">{review.detail}</p>
      </figcaption>
    </figure>
  );
}

export default function ReviewsMarquee() {
  return (
    <div className="marquee overflow-hidden" aria-label="Recent 5-star student reviews">
      <div className="marquee-track flex gap-6 py-2 pr-6">
        {/* list rendered twice for a seamless loop; second copy is hidden from
            screen readers so reviews aren't announced twice */}
        {REVIEWS.map((review) => (
          <ReviewCard key={review.name} review={review} />
        ))}
        <div className="flex gap-6" aria-hidden>
          {REVIEWS.map((review) => (
            <ReviewCard key={`dup-${review.name}`} review={review} />
          ))}
        </div>
      </div>
    </div>
  );
}
