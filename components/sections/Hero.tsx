"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { SITE } from "@/lib/site";
import BookNowButton from "@/components/ui/BookNowButton";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const HEADLINE_WORDS = SITE.name.split(" ");

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });

  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", reduced ? "0%" : "30%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", reduced ? "0%" : "60%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, reduced ? 1 : 0]);

  return (
    <section
      ref={ref}
      className="relative flex h-screen items-center justify-center overflow-hidden bg-bgDeep text-bg"
    >
      <motion.div
        style={{ y: imageY }}
        className="absolute inset-0 -top-[10%] h-[120%] bg-[url('/images/hero-spa.jpg')] bg-cover bg-center opacity-60"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-bgDeep/20 via-transparent to-bgDeep" />

      <div
        aria-hidden
        className="motion-safe:animate-[drift_18s_ease-in-out_infinite] absolute -left-1/4 top-1/4 h-[60vw] w-[60vw] rounded-full bg-terracotta/20 blur-3xl motion-reduce:hidden"
      />
      <div
        aria-hidden
        className="motion-safe:animate-[drift_22s_ease-in-out_infinite_reverse] absolute -right-1/4 bottom-0 h-[50vw] w-[50vw] rounded-full bg-gold/20 blur-3xl motion-reduce:hidden"
      />

      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="relative z-10 flex flex-col items-center gap-6 px-4 text-center"
      >
        <h1 className="flex flex-wrap justify-center gap-x-4 font-display text-5xl md:text-7xl">
          {HEADLINE_WORDS.map((word, i) => (
            <motion.span
              key={word + i}
              initial={reduced ? false : { opacity: 0, y: 40, filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.9, delay: reduced ? 0 : 0.15 * i, ease: [0.16, 1, 0.3, 1] }}
            >
              {word}
            </motion.span>
          ))}
        </h1>
        <motion.p
          initial={reduced ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: reduced ? 0 : 0.15 * HEADLINE_WORDS.length + 0.1 }}
          className="max-w-xl font-body text-lg text-bg/90"
        >
          Our primary focus is your well-being.
        </motion.p>
        <motion.div
          initial={reduced ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: reduced ? 0 : 0.15 * HEADLINE_WORDS.length + 0.3 }}
        >
          <BookNowButton href={SITE.freshaBaseUrl} />
        </motion.div>
      </motion.div>

      <svg
        aria-hidden
        className="absolute inset-x-0 bottom-0 z-10 h-16 w-full text-bg md:h-24"
        viewBox="0 0 1440 100"
        preserveAspectRatio="none"
      >
        <path d="M0,40 C360,100 1080,0 1440,60 L1440,100 L0,100 Z" fill="currentColor" />
      </svg>
    </section>
  );
}
