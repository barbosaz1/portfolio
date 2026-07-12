"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";

const focusAreas = [
  "Frontend Architecture",
  "Motion Design",
  "Performance Engineering",
  "Design Systems",
];

export function About() {
  return (
    <section id="about" className="relative py-28 md:py-36">
      <div className="container-premium">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-2 lg:gap-12">
          <div>
            <SectionHeading
              kicker="About"
              title="Selective by design."
              description="I'm a Web Developer & Frontend Engineer focused on React, Next.js, and TypeScript — constantly studying new tools and refining the craft so every project ships faster, cleaner, and more polished than the one before it."
            />

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-15% 0px" }}
              transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="mt-10 flex flex-wrap gap-3"
            >
              {focusAreas.map((area) => (
                <span
                  key={area}
                  className="rounded-full border border-border-strong px-4 py-2 font-mono text-xs text-fg-muted"
                >
                  {area}
                </span>
              ))}
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-15% 0px" }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="relative flex flex-col justify-center rounded-3xl border border-border bg-bg-elevated/60 p-10 md:p-12"
          >
            <span className="font-display text-6xl leading-none text-accent-soft">&ldquo;</span>
            <p className="font-display mt-2 text-2xl italic leading-snug text-fg md:text-3xl">
              The projects shown here represent only a small part of what I&apos;m capable of.
            </p>
            <p className="mt-6 text-fg-muted">
              Every new project is built from scratch, tailored to the specific needs of each
              client — not assembled from a template. What you see below is a floor, not a
              ceiling.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
