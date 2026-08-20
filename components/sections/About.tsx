import Image from "next/image";
import RevealOnScroll from "@/components/ui/RevealOnScroll";

export default function About() {
  return (
    <section className="relative overflow-x-hidden py-24">
      <div className="grid items-center gap-10 md:grid-cols-2">
        <div className="order-2 px-4 md:order-1 md:pl-[max(1rem,calc((100vw-1024px)/2+1rem))] md:pr-10">
          <RevealOnScroll variant="slide-right">
            <h2 className="font-display text-3xl md:text-4xl text-terracotta">Our Philosophy</h2>
            <p className="mt-6 font-body text-lg leading-relaxed">
              Our primary focus is your well-being, and client satisfaction is our top priority. We
              are committed to meeting your needs and ensuring you leave feeling completely
              satisfied. Kriel Colon Hydrotherapy offers the best services in town, dedicated to
              providing the highest level of care and comfort for our clients.
            </p>
          </RevealOnScroll>
        </div>
        <RevealOnScroll variant="clip" role="media" className="order-1 md:order-2 md:w-[calc(50vw+1rem)]">
          <div className="overflow-hidden shadow-2xl shadow-bgDeep/20 md:rounded-l-2xl">
            <Image
              src="/images/venue-2.jpg"
              alt="Inside Kriel Colon & Beauty Spa"
              width={1535}
              height={848}
              className="h-full w-full object-cover"
            />
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
