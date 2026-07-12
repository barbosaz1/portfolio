"use client";

import { motion } from "framer-motion";
import { Mail } from "lucide-react";
import { RevealText } from "@/components/ui/RevealText";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { GridNoiseBackground } from "@/components/ui/GridNoiseBackground";
import { siteConfig } from "@/lib/site-config";

export function Contact() {
  return (
    <section id="contact" className="relative overflow-hidden py-32 md:py-44">
      <GridNoiseBackground />

      <div className="container-premium relative z-10 flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-15% 0px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mb-6 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.2em] text-fg-subtle"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-accent" />
          Contact
        </motion.div>

        <h2 className="max-w-3xl text-4xl font-medium leading-[1.05] tracking-tight text-fg sm:text-5xl md:text-6xl">
          <RevealText text="Let's build something" />{" "}
          <RevealText text="incredible." as="span" className="font-display italic text-accent-soft" delay={0.3} />
        </h2>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-15% 0px" }}
          transition={{ duration: 0.6, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="mt-7 max-w-lg text-balance text-lg text-fg-muted"
        >
          If you&apos;re looking for a modern, fast website built with real attention to detail,
          let&apos;s talk. I&apos;d be glad to discuss your project.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-15% 0px" }}
          transition={{ duration: 0.6, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          <WhatsAppButton label="Chat on WhatsApp" variant="primary" className="!px-9 !py-4 text-base" />
          <MagneticButton href={siteConfig.emailHref()} variant="secondary" className="!px-9 !py-4 text-base">
            <Mail className="h-4 w-4" aria-hidden />
            Send Email
          </MagneticButton>
        </motion.div>
      </div>
    </section>
  );
}
