import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Services from "@/components/sections/Services";
import Experience from "@/components/sections/Experience";
import Reviews from "@/components/sections/Reviews";
import Team from "@/components/sections/Team";
import LocationHours from "@/components/sections/LocationHours";
import Footer from "@/components/sections/Footer";
import StickyBookBar from "@/components/ui/StickyBookBar";

export default function Home() {
  return (
    <main>
      <Hero />
      <About />
      <Services />
      <Experience />
      <Reviews />
      <Team />
      <LocationHours />
      <Footer />
      <StickyBookBar />
    </main>
  );
}
