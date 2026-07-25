import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { FloatingWhatsApp } from "@/components/layout/FloatingWhatsApp";
import { Hero } from "@/components/sections/Hero";
import { Manifesto } from "@/components/sections/Manifesto";
import { FeaturedWork } from "@/components/sections/FeaturedWork";
import { Philosophy } from "@/components/sections/Philosophy";
import { Process } from "@/components/sections/Process";
import { TechStack } from "@/components/sections/TechStack";
import { JournalPreview } from "@/components/sections/JournalPreview";
import { ClosingCTA } from "@/components/sections/ClosingCTA";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Manifesto />
        <FeaturedWork />
        <Philosophy />
        <Process />
        <TechStack />
        <JournalPreview />
        <ClosingCTA />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </>
  );
}
