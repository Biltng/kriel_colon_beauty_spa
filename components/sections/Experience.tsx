"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import RevealOnScroll from "@/components/ui/RevealOnScroll";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const STEPS = [
  { title: "Arrive & Unwind", copy: "Step into a space designed for calm from the first breath." },
  { title: "Your Treatment", copy: "Colon hydrotherapy, body treatments, and facials tailored to you." },
  { title: "Leave Renewed", copy: "Walk out lighter, calmer, and cared for." },
];

export default function Experience() {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  const hue = useTransform(scrollYProgress, [0, 0.5, 1], [reduced ? 0 : -15, 0, reduced ? 0 : 15]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.9, 1, 0.94]);
  const filter = useTransform(hue, (h) => `hue-rotate(${h}deg) saturate(${reduced ? 1 : 1.15})`);

  return (
    <section ref={ref} className="relative overflow-hidden bg-bg px-4 py-24">
      <span
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 -z-0 -translate-x-1/2 -translate-y-1/2 select-none font-display text-[16rem] font-bold leading-none text-bgDeep/[0.04] md:text-[24rem]"
      >
        RENEW
      </span>

      <div className="relative mx-auto grid max-w-5xl gap-16 md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
        <div className="md:sticky md:top-24 md:h-fit">
          <RevealOnScroll variant="clip" role="media">
            <motion.div
              style={{ scale, filter }}
              className="mx-auto aspect-[4/3] w-full max-w-md overflow-hidden rounded-2xl bg-gradient-to-br from-terracotta via-gold to-green shadow-2xl shadow-bgDeep/20"
            >
              <div className="h-full w-full bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.35),transparent_60%)]" />
            </motion.div>
          </RevealOnScroll>
        </div>

        <div className="flex flex-col gap-24 py-8">
          {STEPS.map((step, i) => (
            <RevealOnScroll
              key={step.title}
              variant={i % 2 === 1 ? "slide-right" : "slide-left"}
              delay={0.1}
            >
              <span className="font-body text-sm uppercase tracking-[0.3em] text-goldDark">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-2 font-display text-3xl text-terracotta md:text-4xl">{step.title}</h3>
              <p className="mt-3 font-body text-lg text-text/80">{step.copy}</p>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
