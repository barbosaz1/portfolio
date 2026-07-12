"use client";

import { motion } from "framer-motion";
import {
  Code,
  Zap,
  Search,
  Sparkles,
  Smartphone,
  MessagesSquare,
  BadgeCheck,
  Focus,
  TrendingUp,
  Cpu,
} from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";

const reasons = [
  { icon: Code, title: "Clean Code", description: "Readable, maintainable code that scales with your project, not against it." },
  { icon: Zap, title: "Performance", description: "Sites built to load fast and stay fast, on every device and connection." },
  { icon: Search, title: "SEO", description: "Technical foundations that help search engines find and rank your site." },
  { icon: Sparkles, title: "Modern Design", description: "Current, considered interfaces — never a dated, generic template." },
  { icon: Smartphone, title: "Mobile-First", description: "Designed for the screen most visitors will actually use first." },
  { icon: MessagesSquare, title: "Simple Communication", description: "No jargon, no friction — clear updates from kickoff to launch." },
  { icon: BadgeCheck, title: "Quality Delivery", description: "Every detail reviewed before it ships, not after you notice it." },
  { icon: Focus, title: "Attention to Detail", description: "The small, easy-to-skip details are usually the ones that matter most." },
  { icon: TrendingUp, title: "Scalability", description: "Architecture that holds up as your traffic and content grow." },
  { icon: Cpu, title: "Modern Tech Stack", description: "Next.js, React, and TypeScript — the tools powering today's best products." },
];

export function WhyWorkWithMe() {
  return (
    <section id="why" className="relative py-28 md:py-36">
      <div className="container-premium">
        <SectionHeading
          kicker="Why Work With Me"
          title="Craft is the whole pitch."
          description="No account managers, no hand-offs between departments — just direct, careful work from someone who cares how it turns out."
        />

        <div className="mt-16 grid grid-cols-1 border-t border-border md:grid-cols-2">
          {reasons.map(({ icon: Icon, title, description }, index) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10% 0px" }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: (index % 2) * 0.1 }}
              className="group flex items-start gap-5 border-b border-border py-7 md:odd:pr-10 md:even:pl-10"
            >
              <Icon
                className="mt-1 h-5 w-5 flex-shrink-0 text-fg-subtle transition-colors duration-300 group-hover:text-accent-soft"
                strokeWidth={1.5}
              />
              <div>
                <h3 className="text-base font-medium text-fg">{title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-fg-muted">{description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
