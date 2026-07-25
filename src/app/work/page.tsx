import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { FloatingWhatsApp } from "@/components/layout/FloatingWhatsApp";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { Capabilities } from "@/components/sections/Capabilities";
import { Testimonials } from "@/components/sections/Testimonials";
import { GridNoiseBackground } from "@/components/ui/GridNoiseBackground";
import { projects } from "@/lib/projects-data";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Selected case studies — websites designed and built end-to-end, from first concept to production.",
  alternates: {
    canonical: `${siteConfig.url}/work`,
  },
};

export default function WorkPage() {
  return (
    <>
      <Header />
      <main>
        <section className="relative overflow-hidden pb-16 pt-32 md:pt-40">
          <GridNoiseBackground />
          <div className="container-premium relative z-10">
            <SectionHeading
              kicker="Work"
              title="Selected case studies."
              description="Every project here was designed and built end-to-end — from first concept to the version that's live today. More will land as they ship."
            />
          </div>
        </section>

        <section className="container-premium pb-20">
          <div className="flex flex-col">
            {projects.map((project, i) => (
              <ProjectCard key={project.slug} project={project} index={i} />
            ))}
          </div>
        </section>

        <Capabilities />
        <Testimonials />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </>
  );
}
