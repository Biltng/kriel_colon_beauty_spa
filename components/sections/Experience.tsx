import Image from "next/image";
import RevealOnScroll from "@/components/ui/RevealOnScroll";

const STEPS = [
  { title: "Arrive & Unwind", copy: "Step into a space designed for calm from the first breath." },
  { title: "Your Treatment", copy: "Colon hydrotherapy, body treatments, and facials tailored to you." },
  { title: "Leave Renewed", copy: "Walk out lighter, calmer, and cared for." },
];

export default function Experience() {
  return (
    <section className="relative overflow-hidden bg-bg px-4 py-24">
      <div
        aria-hidden
        className="absolute left-1/2 top-0 h-full w-full -translate-x-1/2 bg-[radial-gradient(ellipse_at_top,_var(--color-accent-terracotta)_0%,_transparent_60%)] opacity-10"
      />
      <RevealOnScroll variant="clip" className="relative mx-auto mb-16 max-w-2xl overflow-hidden rounded-2xl shadow-2xl shadow-bgDeep/20">
        <Image
          src="/images/venue-3.jpg"
          alt="A treatment room at Kriel Colon & Beauty Spa"
          width={329}
          height={182}
          className="h-full w-full object-cover"
        />
      </RevealOnScroll>
      <div className="relative mx-auto flex max-w-3xl flex-col gap-24">
        {STEPS.map((step, i) => (
          <RevealOnScroll
            key={step.title}
            variant={i % 2 === 1 ? "slide-right" : "slide-left"}
            delay={0.1}
            className={i % 2 === 1 ? "text-right" : "text-left"}
          >
            <span className="font-body text-sm uppercase tracking-[0.3em] text-gold">
              {String(i + 1).padStart(2, "0")}
            </span>
            <h3 className="mt-2 font-display text-3xl text-terracotta md:text-4xl">{step.title}</h3>
            <p className="mt-3 font-body text-lg text-text/80">{step.copy}</p>
          </RevealOnScroll>
        ))}
      </div>
    </section>
  );
}
