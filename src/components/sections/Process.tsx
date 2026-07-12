"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SectionHeading } from "@/components/ui/SectionHeading";

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    title: "Initial Conversation",
    description:
      "We talk through your goals, your audience, and what success actually looks like for the project.",
  },
  {
    title: "Planning",
    description:
      "I map out structure, content, and scope before a single line of code gets written.",
  },
  {
    title: "Design",
    description:
      "A visual direction tailored to your brand, shaped with you before development begins.",
  },
  {
    title: "Development",
    description: "The design comes to life in code — fast, responsive, and built to last.",
  },
  {
    title: "Revisions",
    description: "We refine the details together until everything feels exactly right.",
  },
  {
    title: "Launch",
    description: "Your site goes live — polished, tested, and ready for real visitors.",
  },
];

export function Process() {
  const containerRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const line = lineRef.current;
    if (!container || !line) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        line,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: container,
            start: "top 75%",
            end: "bottom 65%",
            scrub: 0.6,
          },
        },
      );
    }, container);

    return () => ctx.revert();
  }, []);

  return (
    <section id="process" className="relative py-28 md:py-36">
      <div className="container-premium">
        <SectionHeading
          kicker="Process"
          title="A clear path from idea to launch."
          description="No surprises — you'll always know exactly what's happening and what comes next."
        />

        <div ref={containerRef} className="relative mt-16 max-w-2xl">
          <div className="absolute left-4 top-2 bottom-2 w-px bg-border" />
          <div
            ref={lineRef}
            className="absolute left-4 top-2 bottom-2 w-px origin-top bg-accent"
            style={{ transform: "scaleY(0)" }}
          />

          <div className="flex flex-col gap-14">
            {steps.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-20% 0px" }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="relative pl-12"
              >
                <span className="absolute left-0 top-0 flex h-8 w-8 items-center justify-center rounded-full border border-border-strong bg-bg font-mono text-xs text-fg-muted">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="text-xl font-medium text-fg">{step.title}</h3>
                <p className="mt-1.5 text-fg-muted">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
