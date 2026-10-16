import Hero from "@/components/Hero";
import Trust from "@/components/Trust";
import Games from "@/components/Games";
import HowItWorks from "@/components/HowItWorks";
import Calculator from "@/components/Calculator";
import Support from "@/components/Support";
import Reviews from "@/components/Reviews";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="relative">
      <Hero />
      <Trust />
      <Games />
      <HowItWorks />
      <Support />
      <Reviews />
      <FAQ />
      <Footer />
    </main>
  );
}