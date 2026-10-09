"use client";

import { useCallback, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { CaseStudyBody, caseImages, heroImage } from "@/components/case/CaseStudyBody";
import { ContactSection } from "@/components/site/ContactSection";
import { Lightbox } from "@/components/ui/Lightbox";
import type { Project } from "@/types/project";

const pad2 = (n: number) => String(n).padStart(2, "0");

export function CasePage({
  project,
  index,
  total,
  nextProject,
}: {
  project: Project;
  index: number;
  total: number;
  nextProject: Project;
}) {
  const [lightbox, setLightbox] = useState<number | null>(null);
  const closeLightbox = useCallback(() => setLightbox(null), []);

  return (
    <>
      <main id="main" className="case-page">
        <section data-tone="base" aria-labelledby="caseTitle">
          <div className="case-page__back">
            <Link className="ul" href="/#work">
              ← All work
            </Link>
            <span className="num muted">
              {pad2(index + 1)} / {pad2(total)}
            </span>
          </div>
          <button
            className="case__hero"
            type="button"
            data-cursor="Zoom"
            aria-label={`View the homepage screenshot: ${project.coverAlt}`}
            onClick={() => setLightbox(0)}
          >
            <span className="case__art">
              <Image
                src={heroImage(project).src}
                alt={heroImage(project).alt}
                fill
                priority
                sizes="100vw"
                style={{ objectPosition: heroImage(project).position }}
              />
            </span>
          </button>
          <CaseStudyBody
            project={project}
            index={index}
            total={total}
            as="h1"
            titleId="caseTitle"
            onZoom={setLightbox}
            next={
              <Link className="case__next" href={`/work/${nextProject.slug}`} data-cursor="Next">
                <span className="lbl muted">Next project</span>
                <span className="case__nexttitle">{nextProject.name}</span>
              </Link>
            }
          />
        </section>
        <ContactSection />
      </main>
      <Lightbox
        images={caseImages(project)}
        index={lightbox}
        onClose={closeLightbox}
        onNavigate={setLightbox}
      />
    </>
  );
}
