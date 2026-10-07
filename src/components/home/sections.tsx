"use client";

import Image from "next/image";
import Link from "next/link";
import { SectionLink } from "@/components/site/SectionLink";
import { JournalRow, describeTopics } from "@/components/journal/JournalRow";
import { PlainChars, SplitChars, SplitWords } from "@/components/ui/Split";
import { siteConfig } from "@/lib/site-config";
import { intro, path, skills } from "@/lib/portfolio-content";
import type { Project } from "@/types/project";
import type { ArticleMeta } from "@/types/article";

const pad2 = (n: number) => String(n).padStart(2, "0");
const hostOf = (url: string) => url.replace(/^https?:\/\//, "").replace(/\/$/, "");

export function Hero({ onOverview }: { onOverview: () => void }) {
  const year = new Date().getFullYear();
  return (
    <section className="hero" id="top" data-tone="base" aria-label="Introduction">
      <div className="hero__pin">
        <div className="hero__facts">
          <p className="hero__fact">
            <span className="lbl muted">Discipline</span>
            <span className="h-in">{siteConfig.discipline}</span>
          </p>
          <p className="hero__fact">
            <span className="lbl muted">Role</span>
            <span className="h-in">{siteConfig.role}</span>
          </p>
          <p className="hero__fact">
            <span className="lbl muted">Based in</span>
            <span className="h-in">
              {siteConfig.location}, {siteConfig.relocation.toLowerCase()}
            </span>
          </p>
          <p className="hero__fact">
            <span className="lbl muted">Contact</span>
            <a className="h-in ul" href={siteConfig.emailHref()}>
              {siteConfig.email}
            </a>
          </p>
        </div>

        <h1
          className="hero__name"
          aria-label={`${siteConfig.name}, ${siteConfig.role.toLowerCase()}`}
        >
          <span className="hero__line hero__line--1" aria-hidden="true">
            <span className="hero__word">
              <PlainChars text={siteConfig.firstName.toUpperCase()} />
            </span>
          </span>
          <span className="hero__line hero__line--2" aria-hidden="true">
            <span className="hero__note" suppressHydrationWarning>
              Portfolio {year}. Selected work, toolkit and path.
            </span>
            <span className="hero__word">
              <PlainChars text={siteConfig.lastName.toUpperCase()} />
            </span>
          </span>
        </h1>

        <div className="hero__mid">
          <p className="hero__statement">{siteConfig.statement}</p>
        </div>

        <div className="hero__foot">
          <button className="scan-btn h-in" type="button" onClick={onOverview}>
            Short on time? <u>Open the 20-second overview</u>
            <kbd>I</kbd>
          </button>
          <SectionLink section="about" className="scrollcue h-in">
            <span>Scroll to explore</span>
            <span className="scrollcue__bar">
              <i />
            </span>
          </SectionLink>
        </div>
      </div>
    </section>
  );
}

export function Intro() {
  const group = (
    <span className="marquee__group">
      {[0, 1, 2].map((k) => (
        <span key={k} style={{ display: "contents" }}>
          <span className="mq mq--a">{siteConfig.role}</span>
          <span className="mq mq--b">{siteConfig.discipline}</span>
        </span>
      ))}
    </span>
  );

  return (
    <section
      className="intro"
      id="about"
      data-tone="inv"
      data-nav="about"
      aria-labelledby="aboutLabel"
    >
      <p className="intro__label lbl muted" id="aboutLabel">
        About
      </p>
      <p className="intro__statement">
        <SplitWords text={intro.statement} />
      </p>
      <div className="intro__grid">
        <figure className="portrait">
          <div className="portrait__inner">
            <Image
              src={siteConfig.portrait}
              alt={`Portrait of ${siteConfig.name}`}
              fill
              sizes="(max-width: 600px) 100vw, (max-width: 900px) 66vw, 33vw"
            />
          </div>
        </figure>
        <dl className="facts">
          {intro.facts.map((fact) => (
            <div className="fact" key={fact.label}>
              <dt className="lbl muted">{fact.label}</dt>
              <dd>{fact.value}</dd>
            </div>
          ))}
        </dl>
      </div>
      <div className="marquee" aria-hidden="true">
        <div className="marquee__track">
          {group}
          {group}
        </div>
      </div>
    </section>
  );
}

export function Work({
  projects,
  onOpenCase,
}: {
  projects: Project[];
  onOpenCase: (index: number, from: HTMLElement | null) => void;
}) {
  const n = projects.length;
  const mediaOf = (el: HTMLElement) =>
    el.closest(".proj")?.querySelector<HTMLElement>(".proj__media") ?? null;

  return (
    <section className="work" id="work" data-tone="base" data-nav="work" aria-labelledby="workTitle">
      <header className="work__head">
        <h2 className="work__title" id="workTitle">
          <span className="line">
            <SplitChars text="Selected" />
          </span>
          <span className="line">
            <SplitChars text="work" />
            <span className="work__count">{n} projects</span>
          </span>
        </h2>
        <p className="work__hint muted">
          From client websites to native developer tools, each designed and built end-to-end.
          Scroll through them, or open one for the full story.
        </p>
      </header>

      {projects.map((p, i) => (
        <article
          className="proj"
          data-i={i}
          id={`project-${p.slug}`}
          aria-labelledby={`pt-${i}`}
          key={p.slug}
        >
          <div className="proj__stage">
            <div className="proj__top">
              <span className="num">
                {pad2(i + 1)} / {pad2(n)}
              </span>
              <span className="muted">{p.category}</span>
              <span className="proj__bar" aria-hidden="true">
                <i />
              </span>
              <span className="num">{hostOf(p.liveUrl)}</span>
            </div>

            <button
              className="proj__media"
              type="button"
              data-cursor="View case"
              data-cursor-big
              aria-label={`Open case study: ${p.name}`}
              onClick={(e) => onOpenCase(i, e.currentTarget)}
              onPointerEnter={(e) => e.currentTarget.closest(".proj")?.classList.add("is-hover")}
              onPointerLeave={(e) =>
                e.currentTarget.closest(".proj")?.classList.remove("is-hover")
              }
            >
              <span className="proj__hover">
                <span className="proj__img">
                  <Image src={p.coverImage} alt={p.coverAlt} fill sizes="100vw" />
                </span>
              </span>
            </button>

            <div className="proj__bottom">
              <h3 className="proj__title" id={`pt-${i}`}>
                <SplitChars text={p.name} />
              </h3>
              <div className="proj__side">
                <p className="proj__desc r">{p.summary}</p>
                <dl className="proj__meta">
                  <div className="r">
                    <dt className="lbl muted">Role</dt>
                    <dd>Design and development</dd>
                  </div>
                  <div className="r">
                    <dt className="lbl muted">Stack</dt>
                    <dd>{p.tech.join(", ")}</dd>
                  </div>
                </dl>
                <Link
                  className="pill proj__open r"
                  href={`/work/${p.slug}`}
                  onClick={(e) => {
                    if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
                    e.preventDefault();
                    onOpenCase(i, mediaOf(e.currentTarget));
                  }}
                >
                  Open case study
                </Link>
              </div>
            </div>
          </div>
        </article>
      ))}
    </section>
  );
}

export function Skills() {
  const total = skills.reduce((sum, group) => sum + group.items.length, 0);
  return (
    <section
      className="skills"
      id="skills"
      data-tone="inv"
      data-nav="work"
      aria-labelledby="skillsTitle"
    >
      <div className="skills__pin">
        <div className="skills__head">
          <p className="muted">Toolkit</p>
          <p className="skills__legend">
            <span>Core</span>
            <span className="muted">Familiar</span>
          </p>
        </div>
        <div className="skills__track">
          <div className="skill-panel skill-panel--intro">
            <h2 className="skills__title" id="skillsTitle">
              <span className="line">
                <SplitChars text="What I" />
              </span>
              <span className="line">
                <SplitChars text="build with" />
              </span>
            </h2>
            <p className="skills__sub muted">
              {total} tools across {skills.length} areas. Full contrast marks the ones I use most.
            </p>
          </div>
          {skills.map((group) => (
            <section className="skill-panel" aria-label={group.category} key={group.category}>
              <div className="skill-panel__top muted">
                <span>{group.category}</span>
                <span className="num">{group.items.length} tools</span>
              </div>
              <h3 className="skill-panel__name">
                <SplitChars text={group.category} />
              </h3>
              <ul className="skill-list">
                {group.items.map((item) => (
                  <li className="skill-mask" key={item.name}>
                    <span
                      className={`skill is-${item.level}`}
                      data-cursor={item.level === "core" ? "Core" : "Familiar"}
                    >
                      {item.name}
                    </span>
                  </li>
                ))}
              </ul>
            </section>
          ))}
          <div className="skill-panel skill-panel--end muted">
            Education and more projects follow below.
          </div>
        </div>
        <div className="skills__progress" aria-hidden="true">
          <i />
        </div>
      </div>
    </section>
  );
}

export function Path() {
  const groups = Array.from(new Set(path.map((entry) => entry.group)));
  return (
    <section className="path" id="path" data-tone="base" data-nav="about" aria-labelledby="pathTitle">
      <header className="path__head">
        <h2 className="path__title" id="pathTitle">
          <SplitChars text="Path" />
        </h2>
        <p className="path__intro muted">
          Education, a few projects beyond this site, and languages. The full detail is in the CV.
        </p>
      </header>
      {groups.map((group) => (
        <div className="path__group" key={group}>
          <h3 className="path__gname muted">{group}</h3>
          <ol className="path__list">
            {path
              .filter((entry) => entry.group === group)
              .map((entry) => (
                <li className="path__row" key={entry.title}>
                  <span className="path__period num muted">{entry.period}</span>
                  {entry.href ? (
                    <a
                      className="path__what"
                      href={entry.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      data-cursor="GitHub"
                    >
                      {entry.title} ↗
                    </a>
                  ) : (
                    <span className="path__what">{entry.title}</span>
                  )}
                  <span className="path__where">{entry.place}</span>
                  <span className="path__note muted">{entry.note ?? ""}</span>
                </li>
              ))}
          </ol>
        </div>
      ))}
      <div className="path__cta">
        <a className="pill" href={siteConfig.social.github} target="_blank" rel="noopener noreferrer">
          GitHub profile
        </a>
        <a className="pill pill--solid" href={siteConfig.resumeUrl} download={siteConfig.resumeFileName}>
          Download the full CV
        </a>
      </div>
    </section>
  );
}

export function JournalSection({ articles }: { articles: ArticleMeta[] }) {
  if (articles.length === 0) return null;
  return (
    <section className="path journal" id="journal" data-tone="inv" aria-labelledby="journalTitle">
      <header className="path__head">
        <h2 className="path__title path__title--condensed" id="journalTitle">
          <SplitChars text="Journal" />
        </h2>
        <p className="path__intro muted">
          {`Writing on ${describeTopics(articles)} - the thinking that doesn't fit in a case study.`}
        </p>
      </header>
      <ol>
        {articles.map((article) => (
          <JournalRow article={article} key={article.slug} />
        ))}
      </ol>
      <div className="path__cta">
        <Link className="pill" href="/journal">
          All articles
        </Link>
      </div>
    </section>
  );
}
