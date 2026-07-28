"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { RevealText } from "@/components/ui/RevealText";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { GridNoiseBackground } from "@/components/ui/GridNoiseBackground";

export function ClosingCTA() {
  return (
    <section className="relative overflow-hidden py-32 md:py-44">
      <GridNoiseBackground />

      <div className="container-premium relative z-10 flex flex-col items-center text-center">
        <h2 className="max-w-2xl text-4xl font-medium leading-[1.05] tracking-tight text-fg sm:text-5xl md:text-6xl">
          <RevealText text="Let's build something" />{" "}
          <RevealText
            text="incredible."
            as="span"
            className="font-display italic text-accent-soft"
            delay={0.3}
          />
        </h2>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-15% 0px" }}
          transition={{ duration: 0.6, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="mt-6 max-w-md text-lg text-fg-muted"
        >
          Open to software developer roles and interesting collaborations - let&apos;s
          talk.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-15% 0px" }}
          transition={{ duration: 0.6, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mt-9 flex flex-wrap items-center justify-center gap-6"
        >
          <WhatsAppButton
            label="Chat on WhatsApp"
            variant="primary"
            className="!px-9 !py-4 text-base"
          />
          <Link
            href="/contact"
            data-cursor="hover"
            className="group flex items-center gap-1.5 text-sm text-fg-muted transition-colors hover:text-fg"
          >
            More ways to reach me
            <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
