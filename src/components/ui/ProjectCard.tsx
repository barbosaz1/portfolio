"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/types/project";

export function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: (index % 3) * 0.08 }}
    >
      <Link
        href={`/work/${project.slug}`}
        data-cursor="hover"
        className="group grid grid-cols-1 gap-6 border-t border-border py-10 last:border-b sm:grid-cols-[220px_1fr_auto] sm:items-center sm:gap-10"
      >
        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl border border-border-strong sm:w-[220px]">
          <Image
            src={project.coverImage}
            alt={project.coverAlt}
            fill
            sizes="220px"
            className="object-cover object-top transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110"
          />
        </div>

        <div>
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-fg-subtle">
            {project.category}
          </p>
          <h3 className="mt-2 text-2xl font-medium text-fg transition-colors duration-300 group-hover:text-accent-soft md:text-3xl">
            {project.name}
          </h3>
          <p className="font-display mt-1 italic text-fg-muted">{project.tagline}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {project.tech.map((tech) => (
              <span
                key={tech}
                className="rounded-full border border-border px-3 py-1 font-mono text-[11px] text-fg-subtle"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        <ArrowUpRight className="hidden h-6 w-6 flex-shrink-0 text-fg-subtle transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-fg sm:block" />
      </Link>
    </motion.div>
  );
}
