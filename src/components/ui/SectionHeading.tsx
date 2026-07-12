"use client";

import { motion } from "framer-motion";
import { RevealText } from "./RevealText";
import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  kicker?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
};

export function SectionHeading({
  kicker,
  title,
  description,
  align = "left",
  className,
}: SectionHeadingProps) {
  return (
    <div className={cn("max-w-2xl", align === "center" && "mx-auto text-center", className)}>
      {kicker && (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-15% 0px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className={cn(
            "mb-4 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.2em] text-fg-subtle",
            align === "center" && "justify-center",
          )}
        >
          <span className="h-1.5 w-1.5 rounded-full bg-accent" />
          {kicker}
        </motion.div>
      )}

      <RevealText
        text={title}
        as="h2"
        className="text-4xl font-medium leading-[1.05] tracking-tight text-fg md:text-5xl"
      />

      {description && (
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-15% 0px" }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="mt-5 text-balance text-fg-muted"
        >
          {description}
        </motion.p>
      )}
    </div>
  );
}
