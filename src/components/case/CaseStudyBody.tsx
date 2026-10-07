import Image from "next/image";
import { SplitChars } from "@/components/ui/Split";
import { siteConfig } from "@/lib/site-config";
import type { Project } from "@/types/project";

const pad2 = (n: number) => String(n).padStart(2, "0");
const hostOf = (url: string) => url.replace(/^https?:\/\//, "").replace(/\/$/, "");

const objectPositions: Record<string, string> = {
  "object-top": "50% 0%",
  "object-bottom": "50% 100%",
  "object-left": "0% 50%",
  "object-right": "100% 50%",
};

export function caseImages(project: Project) {
  return [
    { src: project.coverImage, alt: project.coverAlt },
    ...project.detailImages.map((d) => ({ src: d.src, alt: d.alt })),
  ];
}

// Shared by the home-page overlay and the standalone /work/[slug] page.
// Elements marked .r are revealed by the overlay's open animation.
export function CaseStudyBody({
  project,
  index,
  total,
  as: Heading = "h2",
  titleId,
  onZoom,
  next,
}: {
  project: Project;
  index: number;
  total: number;
  as?: "h1" | "h2";
  titleId: string;
  onZoom: (imageIndex: number) => void;
  next: React.ReactNode;
}) {
  const message =
    project.ctaMessage ??
    `Hi Rodrigo, I saw the ${project.name} case study and I'd like to get in touch.`;

  return (
    <div className="case__body">
      <p className="case__kicker muted r">
        <span className="num">
          {pad2(index + 1)} / {pad2(total)}
        </span>
        &nbsp;&nbsp;{project.category}
      </p>
      <Heading className="case__title" id={titleId}>
        <SplitChars text={project.name} />
      </Heading>
      <div className="case__intro">
        <p className="case__lead r">
          <span className="case__tagline">{project.tagline}</span>
          {project.summary}
        </p>
        {project.liveUrl && (
          <div className="case__cta r">
            <a
              className="pill pill--solid"
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              {project.liveUrlLabel ?? "Visit live site"} ↗
            </a>
          </div>
        )}
      </div>
      <dl className="case__meta r">
        <div>
          <dt className="lbl muted">Role</dt>
          <dd>Design and development</dd>
        </div>
        <div>
          <dt className="lbl muted">Stack</dt>
          <dd>{project.tech.join(", ")}</dd>
        </div>
        {project.liveUrl ? (
          <div>
            <dt className="lbl muted">
              {project.liveUrl.includes("github.com") ? "Source" : "Live site"}
            </dt>
            <dd>
              <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                {hostOf(project.liveUrl)}
              </a>
            </dd>
          </div>
        ) : (
          <div>
            <dt className="lbl muted">Status</dt>
            <dd>Local build, not publicly deployed</dd>
          </div>
        )}
        <div>
          <dt className="lbl muted">Questions</dt>
          <dd>
            <a href={siteConfig.whatsapp.href(message)} target="_blank" rel="noopener noreferrer">
              Ask me about it
            </a>
          </dd>
        </div>
      </dl>

      <div className="case__sections">
        <div className="case__block r">
          <h3 className="muted">Overview</h3>
          <p>{project.overview}</p>
        </div>
        <div className="case__block r">
          <h3 className="muted">Objectives</h3>
          <ol>
            {project.objectives.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ol>
        </div>
        <div className="case__block r">
          <h3 className="muted">Process</h3>
          <ol>
            {project.process.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ol>
        </div>
        <div className="case__block r">
          <h3 className="muted">Results</h3>
          <ol>
            {project.results.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ol>
        </div>
        <div className="case__block case__block--wide r">
          <h3 className="muted">Learnings</h3>
          <p className="case__learnings">{project.learnings}</p>
        </div>
      </div>

      <div className="case__gallery r">
        {project.detailImages.map((detail, i) => (
          <button
            key={detail.src}
            type="button"
            data-cursor="Zoom"
            aria-label={`View larger: ${detail.alt}`}
            onClick={() => onZoom(i + 1)}
          >
            <Image
              src={detail.src}
              alt={detail.alt}
              fill
              sizes="(max-width: 900px) 100vw, 60vw"
              style={{ objectPosition: objectPositions[detail.position ?? ""] ?? "50% 50%" }}
            />
          </button>
        ))}
      </div>

      {next}
    </div>
  );
}
