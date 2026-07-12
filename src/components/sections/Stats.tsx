"use client";

import { motion } from "framer-motion";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";

const stats = [
  { display: <AnimatedCounter to={100} suffix="%" />, label: "Responsive" },
  { display: "SEO", label: "Optimized" },
  { display: "High", label: "Performance" },
  { display: "Scalable", label: "Code" },
  { display: "Custom", label: "Design" },
];

export function Stats() {
  return (
    <section className="relative border-b border-border py-20">
      <div className="container-premium">
        <div className="grid grid-cols-2 gap-y-12 sm:grid-cols-5 sm:gap-y-0">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10% 0px" }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: index * 0.08 }}
              className="border-l border-border pl-5 first:border-l-0 first:pl-0 sm:first:border-l-0"
            >
              <div className="font-display text-4xl italic text-fg md:text-5xl">
                {stat.display}
              </div>
              <p className="mt-2 font-mono text-xs uppercase tracking-[0.15em] text-fg-subtle">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
