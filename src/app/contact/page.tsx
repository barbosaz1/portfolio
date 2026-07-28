import type { Metadata } from "next";
import { Mail, MessageSquare, Search, Send } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { FloatingWhatsApp } from "@/components/layout/FloatingWhatsApp";
import { RevealText } from "@/components/ui/RevealText";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { GridNoiseBackground } from "@/components/ui/GridNoiseBackground";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch about a role, a collaboration, or a project - WhatsApp, email, or whatever's easiest for you.",
  alternates: {
    canonical: `${siteConfig.url}/contact`,
  },
};

const steps = [
  {
    icon: Send,
    title: "You reach out",
    text: "A message on WhatsApp or a quick email - a couple of lines about the role or what you're working on is plenty to start.",
  },
  {
    icon: MessageSquare,
    title: "I reply personally",
    text: "No forms, no recruiter middleman, no automated funnel. I read every message myself and respond directly.",
  },
  {
    icon: Search,
    title: "We figure out the fit",
    text: "A short conversation to understand what you're looking for and whether I'm the right fit - no pressure either way.",
  },
];

export default function ContactPage() {
  return (
    <>
      <Header />
      <main>
        <section className="relative overflow-hidden py-32 md:py-44">
          <GridNoiseBackground />

          <div className="container-premium relative z-10 flex flex-col items-center text-center">
            <p className="mb-6 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.2em] text-fg-subtle">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              Contact
            </p>

            <h1 className="max-w-3xl text-4xl font-medium leading-[1.05] tracking-tight text-fg sm:text-5xl md:text-6xl">
              <RevealText text="Let's build something" />{" "}
              <RevealText
                text="incredible."
                as="span"
                className="font-display italic text-accent-soft"
                delay={0.3}
              />
            </h1>

            <p className="mt-7 max-w-lg text-balance text-lg text-fg-muted">
              Whether it&apos;s a role, a collaboration, or just a technical conversation,
              I&apos;d be glad to talk.
            </p>

            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <WhatsAppButton
                label="Chat on WhatsApp"
                variant="primary"
                className="!px-9 !py-4 text-base"
              />
              <MagneticButton
                href={siteConfig.emailHref()}
                variant="secondary"
                className="!px-9 !py-4 text-base"
              >
                <Mail className="h-4 w-4" aria-hidden />
                Send Email
              </MagneticButton>
            </div>
          </div>
        </section>

        <section className="relative border-t border-border py-24 md:py-32">
          <div className="container-premium">
            <h2 className="text-center font-mono text-xs uppercase tracking-[0.2em] text-fg-subtle">
              What Happens Next
            </h2>

            <div className="mt-12 grid grid-cols-1 gap-10 md:grid-cols-3 md:gap-8">
              {steps.map(({ icon: Icon, title, text }, i) => (
                <div key={title} className="flex flex-col gap-4 border-t border-border pt-8">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-sm text-fg-subtle">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <Icon className="h-5 w-5 text-accent-soft" strokeWidth={1.5} />
                  </div>
                  <h3 className="text-xl font-medium text-fg">{title}</h3>
                  <p className="text-fg-muted">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <FloatingWhatsApp />
    </>
  );
}
