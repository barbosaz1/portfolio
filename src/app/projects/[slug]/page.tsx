import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, Check } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { FloatingWhatsApp } from "@/components/layout/FloatingWhatsApp";
import { ProjectMedia } from "@/components/project/ProjectMedia";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { RevealText } from "@/components/ui/RevealText";
import { GridNoiseBackground } from "@/components/ui/GridNoiseBackground";
import { projects, getProjectBySlug } from "@/lib/projects-data";
import { siteConfig } from "@/lib/site-config";

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return {};

  return {
    title: `${project.name} — Case Study`,
    description: project.summary,
    alternates: {
      canonical: `${siteConfig.url}/projects/${project.slug}`,
    },
    openGraph: {
      title: `${project.name} — Case Study | ${siteConfig.name}`,
      description: project.summary,
      images: [{ url: project.coverImage, width: 1200, height: 798, alt: project.coverAlt }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${project.name} — Case Study`,
      description: project.summary,
      images: [project.coverImage],
    },
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  const liveHost = project.liveUrl.replace(/^https?:\/\//, "");
  const otherProject = projects.find((p) => p.slug !== project.slug);

  const projectJsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.name,
    description: project.summary,
    url: `${siteConfig.url}/projects/${project.slug}`,
    image: `${siteConfig.url}${project.coverImage}`,
    creator: {
      "@type": "Person",
      name: siteConfig.name,
      url: siteConfig.url,
    },
    keywords: project.tech.join(", "),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(projectJsonLd) }}
      />
      <Header variant="minimal" />
      <main
        className="relative"
        style={
          {
            "--case-accent": project.accent.primary,
          } as React.CSSProperties
        }
      >
        <section className="relative overflow-hidden pb-16 pt-32 md:pt-40">
          <GridNoiseBackground />
          <div
            className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[560px] opacity-25 blur-3xl"
            style={{
              background: `radial-gradient(60% 60% at 50% 0%, ${project.accent.primary}, transparent 70%)`,
            }}
            aria-hidden
          />

          <div className="container-premium relative z-10">
            <Link
              href="/#projects"
              data-cursor="hover"
              className="inline-flex items-center gap-2 text-sm text-fg-muted transition-colors hover:text-fg"
            >
              <ArrowLeft className="h-4 w-4" />
              All Projects
            </Link>

            <div className="mt-8 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.2em] text-fg-subtle">
              <span
                className="h-1.5 w-1.5 rounded-full"
                style={{ background: "var(--case-accent)" }}
              />
              {project.category}
            </div>

            <h1 className="mt-5 max-w-3xl text-5xl font-medium leading-[1.02] tracking-tight text-fg md:text-7xl">
              <RevealText text={project.name} />
            </h1>

            <p className="font-display mt-5 max-w-xl text-2xl italic text-[var(--case-accent)]">
              {project.tagline}
            </p>

            <p className="mt-6 max-w-2xl text-lg text-fg-muted">{project.summary}</p>

            <div className="mt-9 flex flex-wrap items-center gap-4">
              <MagneticButton href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                Visit Live Site
                <ArrowUpRight className="h-4 w-4" />
              </MagneticButton>
              <WhatsAppButton
                label="Discuss a Project Like This"
                variant="secondary"
                message={`Hi Rodrigo, I saw the ${project.name} case study and I'd like to talk about a website project.`}
              />
            </div>

            <div className="mt-8 flex flex-wrap gap-2">
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
        </section>

        <ProjectMedia
          coverImage={project.coverImage}
          coverAlt={project.coverAlt}
          liveHost={liveHost}
          detailImages={project.detailImages}
        >
          <section className="container-premium py-24 md:py-32">
            <div className="grid grid-cols-1 gap-16 lg:grid-cols-[1fr_1.4fr]">
              <div>
                <h2 className="text-2xl font-medium text-fg">Overview</h2>
                <p className="mt-4 text-fg-muted">{project.overview}</p>

                <h3 className="mt-10 text-sm font-mono uppercase tracking-[0.2em] text-fg-subtle">
                  Objectives
                </h3>
                <ul className="mt-4 flex flex-col gap-3">
                  {project.objectives.map((objective) => (
                    <li key={objective} className="flex items-start gap-3 text-fg-muted">
                      <Check
                        className="mt-1 h-4 w-4 flex-shrink-0"
                        style={{ color: "var(--case-accent)" }}
                      />
                      {objective}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-medium text-fg">Process</h2>
                <div className="mt-4 flex flex-col gap-6">
                  {project.process.map((paragraph, index) => (
                    <div key={index} className="flex gap-4">
                      <span className="font-mono text-sm text-fg-subtle">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <p className="text-fg-muted">{paragraph}</p>
                    </div>
                  ))}
                </div>

                <h2 className="mt-12 text-2xl font-medium text-fg">Results</h2>
                <ul className="mt-4 flex flex-col gap-3">
                  {project.results.map((result) => (
                    <li key={result} className="flex items-start gap-3 text-fg-muted">
                      <Check
                        className="mt-1 h-4 w-4 flex-shrink-0"
                        style={{ color: "var(--case-accent)" }}
                      />
                      {result}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>
        </ProjectMedia>

        <section className="relative overflow-hidden border-t border-border py-24 md:py-32">
          <div className="container-premium flex flex-col items-center text-center">
            <h2 className="max-w-2xl text-3xl font-medium leading-tight text-fg md:text-4xl">
              Want something like this for your brand?
            </h2>
            <p className="mt-4 max-w-lg text-fg-muted">
              Every project starts with a conversation. Let&apos;s talk about what you&apos;re
              trying to build.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <WhatsAppButton
                label="Chat on WhatsApp"
                message={`Hi Rodrigo, I saw the ${project.name} case study and I'd like to talk about a website project.`}
              />
              {otherProject && (
                <MagneticButton href={`/projects/${otherProject.slug}`} variant="secondary">
                  Next Case Study
                  <ArrowUpRight className="h-4 w-4" />
                </MagneticButton>
              )}
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <FloatingWhatsApp />
    </>
  );
}
