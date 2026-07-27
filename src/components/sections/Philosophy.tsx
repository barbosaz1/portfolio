"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { cn } from "@/lib/utils";

const beliefs = [
  {
    title: "Craft over shortcuts",
    text: "Clean, readable code and obsessive attention to the details most people skip - because those are exactly the details visitors notice, even if they can't say why.",
  },
  {
    title: "Performance is a feature",
    text: "A beautiful site that loads slowly isn't beautiful - it's abandoned. Speed and technical SEO aren't afterthoughts; they're part of the design.",
  },
  {
    title: "Respect the smallest screen",
    text: "Most visitors will meet a site on a phone, one-handed, mid-scroll. If it doesn't work brilliantly there, it doesn't really work.",
  },
  {
    title: "Say less, build more",
    text: "No jargon, no fifteen-slide decks - just direct communication and a stack chosen because it fits the job, not because it's trending.",
  },
];

export function Philosophy() {
  return (
    <section id="philosophy" className="relative scroll-mt-24 py-28 md:py-36">
      <div className="container-premium">
        <SectionHeading kicker="Philosophy" title="What I believe, in practice." />

        <div className="mt-16 flex flex-col">
          {beliefs.map((belief, i) => (
            <motion.div
              key={belief.title}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-15% 0px" }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: (i % 2) * 0.08 }}
              className={cn(
                "grid grid-cols-1 gap-4 border-t border-border py-10 last:border-b md:grid-cols-[1fr_2fr] md:gap-16",
                i % 2 === 1 && "md:ml-[10%]",
              )}
            >
              <div className="flex items-baseline gap-4 md:block md:gap-0">
                <span className="font-mono text-sm text-fg-subtle">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3
                  className={cn(
                    "text-2xl font-medium text-fg md:mt-2 md:text-3xl",
                    i % 2 === 1 && "font-display italic",
                  )}
                >
                  {belief.title}
                </h3>
              </div>
              <p className="max-w-xl text-lg text-fg-muted md:text-xl">{belief.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
