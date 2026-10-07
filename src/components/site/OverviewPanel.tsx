"use client";

import { useEffect, useRef } from "react";
import { useSiteUI } from "@/components/site/SiteShell";
import { siteConfig } from "@/lib/site-config";
import { path, skills } from "@/lib/portfolio-content";
import { lockScroll } from "@/lib/scroll-lock";
import { trapTab } from "@/lib/focus-trap";
import { cn } from "@/lib/utils";

export type OverviewProject = { slug: string; name: string; tech: string[] };

const pad2 = (n: number) => String(n).padStart(2, "0");

// The "20-second overview": everything a recruiter needs on one sheet.
export function OverviewPanel({ projects }: { projects: OverviewProject[] }) {
  const { overviewOpen, closeOverview, openProject } = useSiteUI();
  const sheetRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const lastFocus = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!overviewOpen) return;
    lastFocus.current = document.activeElement as HTMLElement | null;
    const release = lockScroll();
    if (sheetRef.current) sheetRef.current.scrollTop = 0;
    const focusTimer = window.setTimeout(
      () => closeRef.current?.focus({ preventScroll: true }),
      50,
    );
    const onKey = (e: KeyboardEvent) => trapTab(e, sheetRef.current);
    document.addEventListener("keydown", onKey);

    return () => {
      window.clearTimeout(focusTimer);
      document.removeEventListener("keydown", onKey);
      release();
      lastFocus.current?.focus?.({ preventScroll: true });
    };
  }, [overviewOpen]);

  const sections = [
    <div className="ix__bar" key="bar">
      <p className="lbl muted">20-second overview</p>
      <button ref={closeRef} className="pill" type="button" onClick={closeOverview}>
        Close
        <kbd>Esc</kbd>
      </button>
    </div>,
    <h2 className="ix__name" id="ixTitle" key="name">
      {siteConfig.firstName}
      <br />
      {siteConfig.lastName}
    </h2>,
    <p className="ix__role" key="role">
      {siteConfig.role}. {siteConfig.discipline} student.
    </p>,
    <p className="ix__tag muted" key="tag">
      {siteConfig.status}. Based in {siteConfig.location}, {siteConfig.relocation.toLowerCase()}.
    </p>,
    <div className="ix__actions" key="actions">
      <a className="pill pill--solid" href={siteConfig.emailHref()}>
        Email me
      </a>
      <a className="pill" href={siteConfig.resumeUrl} download={siteConfig.resumeFileName}>
        Download CV
      </a>
      <a className="pill" href={siteConfig.whatsapp.href()} target="_blank" rel="noopener noreferrer">
        WhatsApp
      </a>
      <a className="pill" href={siteConfig.social.github} target="_blank" rel="noopener noreferrer">
        GitHub
      </a>
    </div>,
    <section className="ix__sec" key="skills">
      <h3 className="muted">Skills</h3>
      <dl>
        {skills.map((group) => (
          <div className="ix__row" key={group.category}>
            <dt>{group.category}</dt>
            <dd>{group.items.map((item) => item.name).join(", ")}</dd>
          </div>
        ))}
      </dl>
    </section>,
    <section className="ix__sec" key="projects">
      <h3 className="muted">Projects</h3>
      <ol>
        {projects.map((project, i) => (
          <li key={project.slug}>
            <button className="ix__row" type="button" onClick={() => openProject(project.slug)}>
              <span className="k num">{pad2(i + 1)}</span>
              <span>
                <b>{project.name}</b>
                <br />
                <span className="muted">{project.tech.join(", ")}</span>
              </span>
            </button>
          </li>
        ))}
      </ol>
    </section>,
    <section className="ix__sec" key="path">
      <h3 className="muted">Education, projects and languages</h3>
      <ol>
        {path.map((entry) => (
          <li className="ix__row" key={entry.title}>
            <span className="k">{entry.period}</span>
            <span>
              {entry.title}
              {entry.place && (
                <>
                  <br />
                  <span className="muted">{entry.place}</span>
                </>
              )}
            </span>
          </li>
        ))}
      </ol>
    </section>,
  ];

  return (
    <aside className={cn("ix", overviewOpen && "is-open")} aria-hidden={!overviewOpen}>
      <div className="ix__scrim" onClick={closeOverview} />
      <div
        ref={sheetRef}
        className="ix__sheet"
        role="dialog"
        aria-modal="true"
        aria-labelledby="ixTitle"
        tabIndex={-1}
        inert={!overviewOpen}
      >
        {sections.map((node, i) => (
          <div key={i} style={{ "--i": i } as React.CSSProperties}>
            {node}
          </div>
        ))}
      </div>
    </aside>
  );
}
