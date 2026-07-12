"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

type Tag = "h1" | "h2" | "h3" | "h4" | "p" | "span" | "div";

type RevealTextProps = {
  text: string;
  as?: Tag;
  className?: string;
  delay?: number;
  stagger?: number;
};

export function RevealText({
  text,
  as: TagName = "span",
  className,
  delay = 0,
  stagger = 0.045,
}: RevealTextProps) {
  const words = text.split(" ");
  const Component = TagName;

  return (
    <Component className={cn(className)}>
      {words.map((word, i) => (
        <span
          key={`${word}-${i}`}
          className="inline-block overflow-hidden align-top pb-[0.15em] -mb-[0.15em]"
        >
          <motion.span
            className="inline-block will-change-transform"
            initial={{ y: "115%" }}
            whileInView={{ y: "0%" }}
            viewport={{ once: true, margin: "0px 0px -10% 0px" }}
            transition={{
              duration: 0.9,
              ease: [0.16, 1, 0.3, 1],
              delay: delay + i * stagger,
            }}
          >
            {word}
            {i < words.length - 1 ? " " : ""}
          </motion.span>
        </span>
      ))}
    </Component>
  );
}
