"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Hero, Intro, JournalSection, Path, Skills, Work } from "@/components/home/sections";
import {
  createHeroType,
  fitHero,
  initMarquee,
  initMediaHover,
  initScrollMotion,
  playHeroIntro,
} from "@/components/home/motion";
import { CaseStudyBody, caseImages } from "@/components/case/CaseStudyBody";
import { ContactSection } from "@/components/site/ContactSection";
import { useSiteUI } from "@/components/site/SiteShell";
import { Lightbox } from "@/components/ui/Lightbox";
import { onLoaderDone } from "@/lib/loader-signal";
import { lockScroll } from "@/lib/scroll-lock";
import { trapTab } from "@/lib/focus-trap";
import { cn } from "@/lib/utils";
import type { Project } from "@/types/project";
import type { ArticleMeta } from "@/types/article";

gsap.registerPlugin(ScrollTrigger);

const motionOn = () => document.documentElement.classList.contains("motion");
const insetFrom = (r: DOMRect, height: number) => {
  const W = window.innerWidth;
  const px = (n: number) => `${Math.max(0, n).toFixed(0)}px`;
  return `inset(${px(r.top)} ${px(W - r.right)} ${px(height - r.bottom)} ${px(r.left)})`;
};

const mediaIn = (root: HTMLElement | null, i: number) =>
  root?.querySelector<HTMLElement>(`.proj[data-i="${i}"] .proj__media`) ?? null;

type Pending = { mode: "open" | "next"; from: DOMRect | null };

export function HomeExperience({
  projects,
  articles,
}: {
  projects: Project[];
  articles: ArticleMeta[];
}) {
  const rootRef = useRef<HTMLElement>(null);
  const caseRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const { openOverview, registerCaseOpener } = useSiteUI();

  const [caseIndex, setCaseIndex] = useState(0);
  const [caseOpen, setCaseOpen] = useState(false);
  const [lightbox, setLightbox] = useState<number | null>(null);
  // Imperative overlay state lives in a ref so animation callbacks always see
  // the latest values without re-subscribing listeners.
  const cs = useRef({
    open: false,
    busy: false,
    pushed: false,
    index: 0,
    scrollY: 0,
    opener: null as HTMLElement | null,
    pending: null as Pending | null,
  });

  const closeLightbox = useCallback(() => setLightbox(null), []);

  /* ---------------- Case study overlay ---------------- */

  const openCase = useCallback(
    (i: number, fromEl: HTMLElement | null, fromHistory = false) => {
      const s = cs.current;
      if (s.open || s.busy || !projects[i]) return;
      s.open = true;
      s.busy = true;
      s.index = i;
      s.scrollY = window.scrollY;
      s.opener = document.activeElement as HTMLElement | null;
      s.pending = { mode: "open", from: fromEl ? fromEl.getBoundingClientRect() : null };
      // Next hard-reloads on Back into history entries that lack its internal
      // __NA marker (it's missing after a fresh load of a URL with a hash), so
      // only add a #case entry when the current one is router-managed.
      const routerManaged = !!(window.history.state as { __NA?: boolean } | null)?.__NA;
      if (!fromHistory && routerManaged) {
        try {
          // Drop any #section hash from the entry we'll return to, otherwise
          // going Back re-scrolls the page to that section.
          if (window.location.hash) {
            window.history.replaceState(null, "", window.location.pathname + window.location.search);
          }
          window.history.pushState(null, "", `#case/${projects[i].slug}`);
          s.pushed = true;
        } catch {}
      }
      setCaseIndex(i);
      setCaseOpen(true);
    },
    [projects],
  );

  const closeCase = useCallback(() => {
    const s = cs.current;
    const el = caseRef.current;
    if (!s.open || s.busy || !el) return;
    s.busy = true;
    const q = gsap.utils.selector(el);
    // Back-navigation can move the page underneath; put it where it was.
    const restoreScroll = () => {
      if (Math.abs(window.scrollY - s.scrollY) > 2) window.scrollTo(0, s.scrollY);
    };
    restoreScroll();

    const finish = () => {
      restoreScroll();
      gsap.set([el, ...q(".case__hero, .case__bg, .case__art, .case__close, .case__body")], {
        clearProps: "all",
      });
      s.open = false;
      s.busy = false;
      setLightbox(null);
      setCaseOpen(false);
      const opener = s.opener;
      if (opener && document.contains(opener)) opener.focus({ preventScroll: true });
    };
    if (!motionOn()) {
      finish();
      return;
    }

    const r = mediaIn(rootRef.current, s.index)?.getBoundingClientRect();
    const hero = q(".case__hero")[0] as HTMLElement;
    const canFlip =
      !!r && el.scrollTop < 8 && r.bottom > 0 && r.top < window.innerHeight && r.width > 0;
    const tl = gsap.timeline({ onComplete: finish });
    tl.to(q(".case__body, .case__close"), { autoAlpha: 0, duration: 0.35, ease: "power2.in" }, 0);
    if (canFlip && r) {
      tl.to(hero, { clipPath: insetFrom(r, hero.offsetHeight), duration: 0.9, ease: "expo.inOut" }, 0.1).to(
        q(".case__bg"),
        { opacity: 0, duration: 0.5, ease: "power2.inOut" },
        0.45,
      );
    } else {
      tl.to(el, { autoAlpha: 0, duration: 0.5, ease: "power2.inOut" }, 0.1);
    }
  }, []);

  const requestCloseCase = useCallback(() => {
    const s = cs.current;
    if (s.pushed) {
      s.pushed = false;
      window.history.back();
      // popstate closes the overlay; this is only a safety net.
      window.setTimeout(() => {
        if (cs.current.open && !cs.current.busy) closeCase();
      }, 400);
      return;
    }
    // Opened from a #case deep link: clean the URL on the way out.
    if (window.location.hash.startsWith("#case/")) {
      try {
        window.history.replaceState(null, "", window.location.pathname + window.location.search);
      } catch {}
    }
    closeCase();
  }, [closeCase]);

  const nextCase = useCallback(() => {
    const s = cs.current;
    if (s.busy || !caseRef.current) return;
    const n = (s.index + 1) % projects.length;
    const swap = () => {
      s.index = n;
      s.pending = { mode: "next", from: null };
      if (caseRef.current) caseRef.current.scrollTop = 0;
      if (s.pushed) {
        try {
          window.history.replaceState(null, "", `#case/${projects[n].slug}`);
        } catch {}
      }
      // Keep the page underneath aligned with the open project so closing lands in place.
      const target = rootRef.current?.querySelector<HTMLElement>(`.proj[data-i="${n}"]`);
      if (target) {
        window.scrollTo(0, target.getBoundingClientRect().top + window.scrollY + window.innerHeight * 0.7);
      }
      s.scrollY = window.scrollY;
      setCaseIndex(n);
    };
    if (!motionOn()) {
      swap();
      return;
    }
    s.busy = true;
    const q = gsap.utils.selector(caseRef.current);
    gsap.to(q(".case__body, .case__hero"), {
      autoAlpha: 0,
      duration: 0.4,
      ease: "power2.in",
      onComplete: swap,
    });
  }, [projects]);

  // Runs the open / next-project animation right after React renders the content.
  useLayoutEffect(() => {
    const s = cs.current;
    const pending = s.pending;
    const el = caseRef.current;
    if (!pending || !el) return;
    s.pending = null;
    el.scrollTop = 0;

    const done = () => {
      s.busy = false;
      closeRef.current?.focus({ preventScroll: true });
    };
    if (!motionOn()) {
      done();
      return;
    }

    const q = gsap.utils.selector(el);
    const hero = q(".case__hero")[0] as HTMLElement;
    const reveal = q(".case__body .r");
    const chars = q(".case__title .ch");

    if (pending.mode === "open") {
      const r = pending.from;
      const visible = !!r && r.bottom > 0 && r.top < window.innerHeight;
      const from = visible && r ? insetFrom(r, hero.offsetHeight) : "inset(0px 0px 0px 0px)";
      gsap
        .timeline({ onComplete: done })
        .set(reveal, { autoAlpha: 0, y: 40 })
        .set(chars, { yPercent: 115 })
        .fromTo(q(".case__bg"), { opacity: 0 }, { opacity: 1, duration: 0.6, ease: "power2.out" }, 0)
        .fromTo(
          hero,
          { clipPath: from, opacity: visible ? 1 : 0 },
          { clipPath: "inset(0px 0px 0px 0px)", opacity: 1, duration: 1.1, ease: "expo.inOut" },
          0,
        )
        .fromTo(q(".case__art"), { scale: 1.12 }, { scale: 1, duration: 1.5, ease: "expo.out" }, 0.05)
        .fromTo(q(".case__close"), { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.4 }, 0.7)
        .to(chars, { yPercent: 0, duration: 1, ease: "expo.out", stagger: 0.02 }, 0.6)
        .to(reveal, { autoAlpha: 1, y: 0, duration: 0.9, ease: "expo.out", stagger: 0.06 }, 0.7);
    } else {
      gsap.set(chars, { yPercent: 115 });
      gsap.set(reveal, { autoAlpha: 0, y: 40 });
      gsap
        .timeline({ onComplete: done })
        .set(q(".case__body, .case__hero"), { autoAlpha: 1 })
        .fromTo(
          hero,
          { clipPath: "inset(0px 0px 100% 0px)" },
          { clipPath: "inset(0px 0px 0% 0px)", duration: 1, ease: "expo.inOut" },
          0,
        )
        .to(chars, { yPercent: 0, duration: 1, ease: "expo.out", stagger: 0.02 }, 0.4)
        .to(reveal, { autoAlpha: 1, y: 0, duration: 0.9, ease: "expo.out", stagger: 0.06 }, 0.5);
    }
  }, [caseOpen, caseIndex]);

  // While open: lock page scroll, Escape closes, Tab stays inside.
  useEffect(() => {
    if (!caseOpen) return;
    const release = lockScroll();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        requestCloseCase();
        return;
      }
      trapTab(e, caseRef.current);
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      release();
    };
  }, [caseOpen, requestCloseCase]);

  // Back / forward between #case/... and the page.
  useEffect(() => {
    const onPop = () => {
      const s = cs.current;
      const match = window.location.hash.match(/^#case\/(.+)$/);
      if (s.open && !match) {
        s.pushed = false;
        closeCase();
      } else if (!s.open && match) {
        const i = projects.findIndex((p) => p.slug === decodeURIComponent(match[1]));
        if (i > -1) openCase(i, null, true);
      }
    };
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, [projects, openCase, closeCase]);

  // Let the overview panel open case studies in place.
  useEffect(() => {
    registerCaseOpener((slug) => {
      const i = projects.findIndex((p) => p.slug === slug);
      if (i > -1) openCase(i, mediaIn(rootRef.current, i));
    });
    return () => registerCaseOpener(null);
  }, [projects, openCase, registerCaseOpener]);

  /* ---------------- Page motion ---------------- */

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const html = document.documentElement;
    html.classList.remove("rb-fail");
    html.classList.add("rb-ready");

    const MOTION = motionOn();
    const FINE = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const cleanups: (() => void)[] = [];
    fitHero(root);

    const heroType = createHeroType(root, FINE && MOTION);
    cleanups.push(heroType.destroy);

    let ctx: gsap.Context | null = null;
    let mm: gsap.MatchMedia | null = null;
    if (MOTION) {
      ScrollTrigger.config({ ignoreMobileResize: true });
      ctx = gsap.context(() => {
        // y: 0 matters - GSAP would otherwise read the CSS pre-hide
        // translateY(115%) as a pixel offset and keep it after the intro.
        gsap.set(".hero__line .ch", { y: 0, yPercent: 115 });
        gsap.set(".h-in, .hero__note", { autoAlpha: 0 });
        mm = initScrollMotion(root, heroType);
      }, root);

      let played = false;
      const play = () => {
        if (played) return;
        played = true;
        ctx?.add(() => playHeroIntro(root, heroType.enable));
      };
      const off = onLoaderDone(play);
      const fallback = window.setTimeout(play, 6000);
      cleanups.push(off, () => window.clearTimeout(fallback));

      if (FINE) cleanups.push(initMediaHover(root));
      cleanups.push(initMarquee(root));
    }

    // Once fonts settle: refit, recompute triggers, then honour deep links.
    let alive = true;
    (document.fonts ? document.fonts.ready : Promise.resolve()).then(() => {
      if (!alive) return;
      fitHero(root);
      if (MOTION) ScrollTrigger.refresh();
      const hash = window.location.hash;
      const caseMatch = hash.match(/^#case\/(.+)$/);
      if (caseMatch) {
        const i = projects.findIndex((p) => p.slug === decodeURIComponent(caseMatch[1]));
        if (i > -1) openCase(i, null, true);
      } else if (hash.length > 1) {
        const target = document.getElementById(hash.slice(1));
        if (target) window.scrollTo(0, target.getBoundingClientRect().top + window.scrollY);
      }
    });

    let lastW = window.innerWidth;
    let resizeTimer = 0;
    const onResize = () => {
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(() => {
        if (window.innerWidth === lastW) return;
        lastW = window.innerWidth;
        fitHero(root);
        if (MOTION) ScrollTrigger.refresh();
      }, 180);
    };
    window.addEventListener("resize", onResize);
    cleanups.push(() => {
      alive = false;
      window.removeEventListener("resize", onResize);
      window.clearTimeout(resizeTimer);
    });

    if (!MOTION) heroType.enable();

    return () => {
      cleanups.forEach((fn) => fn());
      (mm as gsap.MatchMedia | null)?.revert();
      ctx?.revert();
    };
  }, [projects, openCase]);

  const project = projects[caseIndex];
  const nextProject = projects[(caseIndex + 1) % projects.length];

  return (
    <>
      <main id="main" ref={rootRef}>
        <Hero onOverview={openOverview} />
        <Intro />
        <Work projects={projects} onOpenCase={(i, from) => openCase(i, from)} />
        <Skills />
        <Path />
        <JournalSection articles={articles} />
        <ContactSection ownMotion={false} />
      </main>

      <div
        ref={caseRef}
        className={cn("case", caseOpen && "is-open")}
        role="dialog"
        aria-modal="true"
        aria-labelledby="caseTitle"
        aria-hidden={!caseOpen}
        inert={!caseOpen}
      >
        <div className="case__bg" />
        <div className="case__hero">
          <div className="case__art">
            <Image
              key={project.slug}
              src={project.coverImage}
              alt={project.coverAlt}
              fill
              sizes="100vw"
            />
          </div>
        </div>
        <CaseStudyBody
          project={project}
          index={caseIndex}
          total={projects.length}
          titleId="caseTitle"
          onZoom={setLightbox}
          next={
            <button className="case__next r" type="button" data-cursor="Next" onClick={nextCase}>
              <span className="lbl muted">Next project</span>
              <span className="case__nexttitle">{nextProject.name}</span>
            </button>
          }
        />
        <button ref={closeRef} className="pill case__close" type="button" onClick={requestCloseCase}>
          Close
          <kbd>Esc</kbd>
        </button>
      </div>

      <Lightbox
        images={caseImages(project)}
        index={lightbox}
        onClose={closeLightbox}
        onNavigate={setLightbox}
      />
    </>
  );
}
