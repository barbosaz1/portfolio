"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/types/project";
import { BrowserFrame } from "./BrowserFrame";
import { MagneticButton } from "./MagneticButton";

export function ProjectCard({ project, index }: { project: Project; index: number }) {
  const liveHost = project.liveUrl.replace(/^https?:\/\//, "");

  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: index * 0.1 }}
      className="group"
    >
      <Link href={`/projects/${project.slug}`} data-cursor="hover" className="block">
        <div className="overflow-hidden rounded-2xl transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-1">
          <BrowserFrame url={liveHost}>
            <div className="relative aspect-[16/10.5] w-full overflow-hidden">
              <Image
                src={project.coverImage}
                alt={project.coverAlt}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover object-top transition-transform duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.06]"
              />
              <div
                className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                style={{
                  background: `linear-gradient(180deg, transparent 40%, ${project.accent.bg}CC 100%)`,
                }}
              />
              <div className="absolute inset-0 flex translate-y-3 items-end justify-end p-5 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                <span className="flex items-center gap-2 rounded-full bg-fg px-4 py-2 text-xs font-medium text-bg">
                  View Details
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </span>
              </div>
            </div>
          </BrowserFrame>
        </div>
      </Link>

      <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-fg-subtle">
            {project.category}
          </p>
          <h3 className="mt-2 text-2xl font-medium text-fg">{project.name}</h3>
          <p className="mt-1 text-fg-muted">{project.tagline}</p>
        </div>

        <div className="flex flex-shrink-0 items-center gap-3">
          <MagneticButton
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            variant="secondary"
            className="!px-5 !py-2.5 text-xs"
          >
            View Website
          </MagneticButton>
          <Link
            href={`/projects/${project.slug}`}
            data-cursor="hover"
            className="text-sm text-fg-muted underline-offset-4 transition-colors hover:text-fg hover:underline"
          >
            Case Study
          </Link>
        </div>
      </div>

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
    </motion.article>
  );
}
