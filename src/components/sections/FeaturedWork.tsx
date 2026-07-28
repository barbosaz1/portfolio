"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import { BrowserFrame } from "@/components/ui/BrowserFrame";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { projects } from "@/lib/projects-data";
import { cn } from "@/lib/utils";

export function FeaturedWork() {
  return (
    <section id="work" className="relative scroll-mt-24 py-28 md:py-36">
      <div className="container-premium">
        <SectionHeading
          kicker="Featured Work"
          title="Every project. Zero shortcuts."
          description="Every project here was designed and built end-to-end - from first concept to the version that's live today."
        />
      </div>

      <div className="mt-20 flex flex-col gap-28 md:gap-36">
        {projects.map((project, index) => {
          const liveHost = project.liveUrl.replace(/^https?:\/\//, "");
          const reversed = index % 2 === 1;

          return (
            <div key={project.slug} className="container-premium">
              <div
                className={cn(
                  "grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16",
                )}
              >
                <motion.div
                  initial={{ opacity: 0, x: reversed ? 40 : -40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-10% 0px" }}
                  transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                  className={cn(reversed && "lg:order-2")}
                >
                  <Link href={`/work/${project.slug}`} data-cursor="hover" className="group block">
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
                        </div>
                      </BrowserFrame>
                    </div>
                  </Link>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: reversed ? -40 : 40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-10% 0px" }}
                  transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
                  className={cn(reversed && "lg:order-1")}
                >
                  <span className="font-mono text-xs uppercase tracking-[0.2em] text-fg-subtle">
                    {String(index + 1).padStart(2, "0")} - {project.category}
                  </span>

                  <h3 className="mt-4 text-4xl font-medium tracking-tight text-fg md:text-5xl">
                    {project.name}
                  </h3>
                  <p className="font-display mt-2 text-xl italic text-fg-muted">
                    {project.tagline}
                  </p>

                  <p className="mt-6 max-w-md text-fg-muted">{project.summary}</p>

                  <div className="mt-6 flex flex-wrap gap-2">
                    {project.tech.map((tech) => (
                      <span
                        key={tech}
                        className="rounded-full border border-border px-3 py-1 font-mono text-[11px] text-fg-subtle"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="mt-8 flex flex-wrap items-center gap-4">
                    <MagneticButton
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      variant="secondary"
                      className="!px-5 !py-2.5 text-xs"
                    >
                      Visit Live Site
                      <ArrowUpRight className="h-3.5 w-3.5" />
                    </MagneticButton>
                    <Link
                      href={`/work/${project.slug}`}
                      data-cursor="hover"
                      className="group flex items-center gap-1.5 text-sm text-fg-muted transition-colors hover:text-fg"
                    >
                      Read Case Study
                      <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                    </Link>
                  </div>
                </motion.div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="container-premium mt-20 flex justify-center md:mt-28">
        <MagneticButton href="/work" variant="secondary">
          View All Work
          <ArrowRight className="h-4 w-4" />
        </MagneticButton>
      </div>
    </section>
  );
}
