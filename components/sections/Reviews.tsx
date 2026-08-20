"use client";
import { motion } from "framer-motion";
import { REVIEWS } from "@/lib/reviews";
import { SITE } from "@/lib/site";
import RevealOnScroll from "@/components/ui/RevealOnScroll";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const QUOTE_PATH =
  "M14 0C6 4 0 12 0 22c0 8 5 14 12 14s12-6 12-13c0-6-4-10-9-10-1 0-2 0-3 .3C13 8 17 3 24 0h-10zM38 0c-8 4-14 12-14 22c0 8 5 14 12 14s12-6 12-13c0-6-4-10-9-10-1 0-2 0-3 .3C37 8 41 3 48 0H38z";

export default function Reviews() {
  const reduced = useReducedMotion();

  return (
    <section className="relative overflow-hidden bg-bgDeep px-4 py-24 text-bg">
      <span
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 select-none font-display text-[16rem] font-bold leading-none text-gold/[0.07] md:text-[24rem]"
      >
        {SITE.ratingAverage}
      </span>

      <div className="relative mx-auto max-w-4xl text-center">
        <h2 className="font-display text-4xl">
          {SITE.ratingAverage} rated by {SITE.ratingCount} clients
        </h2>
        <div className="mt-12 columns-1 gap-6 md:columns-2 [&>*]:mb-6 [&>*]:break-inside-avoid">
          {REVIEWS.map((review, i) => (
            <RevealOnScroll
              key={review.id}
              variant="scale"
              delay={(i % 2) * 0.1}
              className={`rounded-xl border border-gold/10 bg-bg/5 p-6 text-left transition-colors duration-300 hover:border-gold/30 hover:bg-bg/10 ${
                i % 3 === 1 ? "md:mt-8" : ""
              }`}
            >
              <svg
                aria-hidden
                width="48"
                height="36"
                viewBox="0 0 48 36"
                fill="none"
                className="text-gold/50"
              >
                <motion.path
                  d={QUOTE_PATH}
                  stroke="currentColor"
                  strokeWidth="1.5"
                  fill="none"
                  strokeDasharray={240}
                  initial={reduced ? false : { strokeDashoffset: 240 }}
                  whileInView={{ strokeDashoffset: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.2, ease: "easeOut" }}
                />
              </svg>
              <p className="mt-3 font-body italic">&ldquo;{review.quote}&rdquo;</p>
              <p className="mt-3 text-sm text-gold">{review.rating} / 5</p>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
