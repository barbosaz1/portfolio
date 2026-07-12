"use client";

import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";

type ServiceCardProps = {
  icon: LucideIcon;
  title: string;
  description: string;
  index: number;
};

export function ServiceCard({ icon: Icon, title, description, index }: ServiceCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: (index % 3) * 0.08 }}
      className="group relative overflow-hidden rounded-2xl border border-border bg-bg-elevated/40 p-7 transition-colors duration-500 hover:border-border-strong hover:bg-bg-elevated"
    >
      <div
        className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-accent/0 blur-2xl transition-colors duration-500 group-hover:bg-accent/15"
        aria-hidden
      />
      <Icon
        className="h-6 w-6 text-accent-soft transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-0.5 group-hover:scale-110"
        strokeWidth={1.5}
      />
      <h3 className="mt-5 text-lg font-medium text-fg">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-fg-muted">{description}</p>
    </motion.div>
  );
}
