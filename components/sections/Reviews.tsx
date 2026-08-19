import { REVIEWS } from "@/lib/reviews";
import { SITE } from "@/lib/site";
import RevealOnScroll from "@/components/ui/RevealOnScroll";

export default function Reviews() {
  return (
    <section className="bg-bgDeep px-4 py-24 text-bg">
      <div className="mx-auto max-w-4xl text-center">
        <h2 className="font-display text-4xl">
          {SITE.ratingAverage} rated by {SITE.ratingCount} clients
        </h2>
        <div className="mt-12 grid gap-8 md:grid-cols-2">
          {REVIEWS.map((review) => (
            <RevealOnScroll key={review.id} className="rounded-xl bg-bg/5 p-6 text-left">
              <p className="font-body italic">&ldquo;{review.quote}&rdquo;</p>
              <p className="mt-3 text-sm text-gold">{review.rating} / 5</p>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
