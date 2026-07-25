"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Project } from "@/types/project";

export function NextProjectBand({ project }: { project: Project }) {
  return (
    <Link
      href={`/work/${project.slug}`}
      data-cursor="hover"
      className="group relative block overflow-hidden border-t border-border"
    >
      <div className="absolute inset-0">
        <Image
          src={project.coverImage}
          alt=""
          fill
          sizes="100vw"
          className="object-cover object-top opacity-15 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105 group-hover:opacity-25"
        />
        <div className="absolute inset-0 bg-bg/80" />
      </div>

      <div className="container-premium relative z-10 flex flex-col items-center justify-center gap-5 py-28 text-center md:py-40">
        <span className="font-mono text-xs uppercase tracking-[0.2em] text-fg-subtle">
          Next Project
        </span>
        <span className="max-w-3xl text-4xl font-medium text-fg transition-colors duration-300 group-hover:text-accent-soft md:text-6xl">
          {project.name}
        </span>
        <span className="font-display text-xl italic text-fg-muted">{project.tagline}</span>
        <span className="mt-4 flex items-center gap-2 text-sm text-fg-muted transition-colors duration-300 group-hover:text-fg">
          View Case Study
          <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-2" />
        </span>
      </div>
    </Link>
  );
}
