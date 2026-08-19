import { SITE } from "@/lib/site";
import BookNowButton from "@/components/ui/BookNowButton";

export default function Hero() {
  return (
    <section className="relative flex h-screen items-center justify-center overflow-hidden bg-bgDeep text-bg">
      <div className="absolute inset-0 bg-[url('/images/hero-spa.jpg')] bg-cover bg-center opacity-60" />
      <div className="relative z-10 flex flex-col items-center gap-6 text-center px-4">
        <h1 className="font-display text-5xl md:text-7xl">{SITE.name}</h1>
        <p className="max-w-xl font-body text-lg text-bg/90">
          Our primary focus is your well-being.
        </p>
        <BookNowButton href={SITE.freshaBaseUrl} />
      </div>
    </section>
  );
}
