"use client";

import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function Testimonials() {
  return (
    <section id="testimonials" className="relative py-28 md:py-36">
      <div className="container-premium">
        <SectionHeading kicker="Testimonials" title="Client voices, coming soon." align="center" />

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-15% 0px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto mt-14 flex max-w-xl flex-col items-center gap-5 rounded-3xl border border-dashed border-border-strong px-10 py-16 text-center"
        >
          <Quote className="h-8 w-8 text-fg-subtle" strokeWidth={1.5} />
          <p className="text-lg text-fg-muted">
            This section will be updated as new client projects are completed — real feedback,
            from real work.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
