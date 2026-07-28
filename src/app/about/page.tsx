import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { FloatingWhatsApp } from "@/components/layout/FloatingWhatsApp";
import { RevealText } from "@/components/ui/RevealText";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { ResumeButton } from "@/components/ui/ResumeButton";
import { GridNoiseBackground } from "@/components/ui/GridNoiseBackground";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "About",
  description:
    "Software developer studying Computer Engineering - how I think, what I value, and why the work shown here is only the floor.",
  alternates: {
    canonical: `${siteConfig.url}/about`,
  },
};

const principles = [
  {
    title: "Constraints before inspiration boards",
    text: "I look at what a project actually needs - audience, content, technical limits - before I look at what's trendy. The constraints usually reveal the right design faster than a mood board does.",
  },
  {
    title: "Depth over breadth",
    text: "A handful of projects, built completely, teach more than dozens built halfway. I'd rather go deep on the tools I use and actually master them than collect shallow experience across everything at once.",
  },
  {
    title: "Comfortable being early",
    text: "Constantly studying new frameworks and rendering patterns - because the tools that feel unfamiliar today are the default in two years, and I'd rather be fluent before that happens.",
  },
];

const focusAreas = [
  "Frontend Architecture",
  "Motion Design",
  "Performance Engineering",
  "Design Systems",
];

export default function AboutPage() {
  return (
    <>
      <Header />
      <main>
        <section className="relative overflow-hidden pb-16 pt-32 md:pb-24 md:pt-40">
          <GridNoiseBackground />
          <div className="container-premium relative z-10">
            <p className="mb-8 font-mono text-xs uppercase tracking-[0.2em] text-fg-subtle">
              About
            </p>
            <h1 className="max-w-4xl text-4xl font-medium leading-[1.1] tracking-tight text-fg sm:text-5xl md:text-6xl lg:text-7xl">
              <RevealText text="The projects shown here" />{" "}
              <RevealText
                text="represent only a small part"
                as="span"
                className="font-display italic text-accent-soft"
                delay={0.25}
              />{" "}
              <RevealText text="of what I'm capable of." delay={0.5} />
            </h1>
            <p className="mt-8 max-w-2xl text-lg text-fg-muted md:text-xl">
              Every new project is built from scratch, tailored to the specific problem it&apos;s
              solving - not assembled from a template. What you&apos;ve seen so far is a floor,
              not a ceiling.
            </p>
            <p className="mt-4 max-w-2xl text-lg text-fg-muted md:text-xl">
              I&apos;m a software developer, currently studying Computer Engineering. Web is where
              most of my published work lives right now - it&apos;s not the limit of what I build.
            </p>

            <div className="mt-9">
              <ResumeButton label="Download Resume" variant="secondary" />
            </div>
          </div>
        </section>

        <section className="relative py-20 md:py-28">
          <div className="container-premium">
            <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-fg-subtle">
              How I Think
            </h2>

            <div className="mt-10 flex flex-col">
              {principles.map((principle, i) => (
                <div
                  key={principle.title}
                  className="grid grid-cols-1 gap-4 border-t border-border py-10 last:border-b md:grid-cols-[1fr_2fr] md:gap-16"
                >
                  <div className="flex items-baseline gap-4 md:block">
                    <span className="font-mono text-sm text-fg-subtle">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3 className="text-2xl font-medium text-fg md:mt-2 md:text-3xl">
                      {principle.title}
                    </h3>
                  </div>
                  <p className="max-w-xl text-lg text-fg-muted md:text-xl">{principle.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="relative py-20 md:py-28">
          <div className="container-premium">
            <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-fg-subtle">
              Focus Areas
            </h2>
            <div className="mt-8 flex flex-wrap gap-3">
              {focusAreas.map((area) => (
                <span
                  key={area}
                  className="rounded-full border border-border-strong px-5 py-2.5 text-sm text-fg"
                >
                  {area}
                </span>
              ))}
            </div>
          </div>
        </section>

        <section className="relative overflow-hidden border-t border-border py-24 md:py-32">
          <div className="container-premium flex flex-col items-center text-center">
            <h2 className="max-w-xl text-3xl font-medium leading-tight text-fg md:text-4xl">
              If this sounds like the kind of developer you&apos;re looking for -
            </h2>
            <div className="mt-8">
              <WhatsAppButton label="Let's Talk" message="Hi Rodrigo, I read your About page and I'd like to get in touch." />
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <FloatingWhatsApp />
    </>
  );
}
