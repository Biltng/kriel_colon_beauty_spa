import RevealOnScroll from "@/components/ui/RevealOnScroll";

const STEPS = [
  { title: "Arrive & Unwind", copy: "Step into a space designed for calm from the first breath." },
  { title: "Your Treatment", copy: "Colon hydrotherapy, body treatments, and facials tailored to you." },
  { title: "Leave Renewed", copy: "Walk out lighter, calmer, and cared for." },
];

export default function Experience() {
  return (
    <section className="bg-bg px-4 py-24">
      <div className="mx-auto flex max-w-3xl flex-col gap-24">
        {STEPS.map((step, i) => (
          <RevealOnScroll key={step.title} className={i % 2 === 1 ? "text-right" : "text-left"}>
            <h3 className="font-display text-3xl text-terracotta">{step.title}</h3>
            <p className="mt-3 font-body text-lg text-text/80">{step.copy}</p>
          </RevealOnScroll>
        ))}
      </div>
    </section>
  );
}
