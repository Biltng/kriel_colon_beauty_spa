import RevealOnScroll from "@/components/ui/RevealOnScroll";

export default function About() {
  return (
    <section className="mx-auto max-w-3xl px-4 py-24 text-center">
      <RevealOnScroll>
        <h2 className="font-display text-3xl md:text-4xl text-terracotta">Our Philosophy</h2>
        <p className="mt-6 font-body text-lg leading-relaxed">
          Our primary focus is your well-being, and client satisfaction is our top priority. We
          are committed to meeting your needs and ensuring you leave feeling completely
          satisfied. Kriel Colon Hydrotherapy offers the best services in town, dedicated to
          providing the highest level of care and comfort for our clients.
        </p>
      </RevealOnScroll>
    </section>
  );
}
