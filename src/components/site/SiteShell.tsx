"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { usePathname, useRouter } from "next/navigation";
import { Nav } from "@/components/site/Nav";
import { OverviewPanel, type OverviewProject } from "@/components/site/OverviewPanel";
import { MobileMenu } from "@/components/site/MobileMenu";
import { Cursor } from "@/components/site/Cursor";
import { Loader } from "@/components/site/Loader";

type CaseOpener = (slug: string) => void;

type SiteUI = {
  overviewOpen: boolean;
  openOverview: () => void;
  closeOverview: () => void;
  menuOpen: boolean;
  setMenuOpen: (open: boolean) => void;
  /** The home page registers this so the overview can open case studies in place. */
  registerCaseOpener: (opener: CaseOpener | null) => void;
  openProject: (slug: string) => void;
  scrollToSection: (id: string) => void;
};

const SiteUIContext = createContext<SiteUI | null>(null);

export function useSiteUI() {
  const ctx = useContext(SiteUIContext);
  if (!ctx) throw new Error("useSiteUI must be used inside SiteShell");
  return ctx;
}

const prefersReducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export function scrollToId(id: string) {
  const behavior: ScrollBehavior = prefersReducedMotion() ? "auto" : "smooth";
  if (id === "top") {
    window.scrollTo({ top: 0, behavior });
    return;
  }
  const el = document.getElementById(id);
  if (!el) return;
  window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY, behavior });
}

export function SiteShell({
  projects,
  children,
}: {
  projects: OverviewProject[];
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [overviewOpen, setOverviewOpen] = useState(false);
  const [menuOpen, setMenuOpenState] = useState(false);
  const caseOpener = useRef<CaseOpener | null>(null);

  // Close transient UI on navigation ("adjust state during render" pattern).
  const [trackedPath, setTrackedPath] = useState(pathname);
  if (pathname !== trackedPath) {
    setTrackedPath(pathname);
    setMenuOpenState(false);
    setOverviewOpen(false);
  }

  const openOverview = useCallback(() => {
    setMenuOpenState(false);
    setOverviewOpen(true);
  }, []);
  const closeOverview = useCallback(() => setOverviewOpen(false), []);
  const setMenuOpen = useCallback((open: boolean) => setMenuOpenState(open), []);
  const registerCaseOpener = useCallback((opener: CaseOpener | null) => {
    caseOpener.current = opener;
  }, []);

  const openProject = useCallback(
    (slug: string) => {
      const wasOpen = overviewOpen;
      setOverviewOpen(false);
      setMenuOpenState(false);
      if (caseOpener.current) {
        const opener = caseOpener.current;
        window.setTimeout(() => opener(slug), wasOpen ? 350 : 0);
      } else {
        router.push(`/work/${slug}`);
      }
    },
    [overviewOpen, router],
  );

  const scrollToSection = useCallback(
    (id: string) => {
      if (menuOpen) {
        setMenuOpenState(false);
        window.setTimeout(() => scrollToId(id), 450);
      } else {
        scrollToId(id);
      }
    },
    [menuOpen],
  );

  // Keyboard: "I" toggles the overview anywhere, Escape closes overview/menu.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      const typing =
        !!target && (/input|textarea|select/i.test(target.tagName) || target.isContentEditable);
      const blocking = document.querySelector(".case.is-open, .lb.is-open");

      if (e.key === "Escape") {
        if (blocking) return;
        setOverviewOpen(false);
        setMenuOpenState(false);
        return;
      }
      if (
        !typing &&
        !blocking &&
        !e.metaKey &&
        !e.ctrlKey &&
        !e.altKey &&
        (e.key === "i" || e.key === "I")
      ) {
        setMenuOpenState(false);
        setOverviewOpen((open) => !open);
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  // Section tones: the body colour follows whichever section crosses the
  // viewport centre, and the nav underlines the matching link.
  useEffect(() => {
    const body = document.body;
    body.dataset.tone = "base";
    delete body.dataset.section;

    let io: IntersectionObserver | null = null;
    const timer = window.setTimeout(() => {
      const sections = Array.from(
        document.querySelectorAll<HTMLElement>("#main [data-tone]"),
      );
      io = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            const el = entry.target as HTMLElement;
            body.dataset.tone = el.dataset.tone ?? "base";
            if (el.dataset.nav) body.dataset.section = el.dataset.nav;
            else delete body.dataset.section;
          });
        },
        { rootMargin: "-50% 0px -50% 0px" },
      );
      sections.forEach((s) => io!.observe(s));
    }, 0);

    return () => {
      window.clearTimeout(timer);
      io?.disconnect();
    };
  }, [pathname]);

  const value = useMemo<SiteUI>(
    () => ({
      overviewOpen,
      openOverview,
      closeOverview,
      menuOpen,
      setMenuOpen,
      registerCaseOpener,
      openProject,
      scrollToSection,
    }),
    [
      overviewOpen,
      openOverview,
      closeOverview,
      menuOpen,
      setMenuOpen,
      registerCaseOpener,
      openProject,
      scrollToSection,
    ],
  );

  return (
    <SiteUIContext.Provider value={value}>
      <Loader />
      <Cursor />
      <Nav />
      {children}
      <OverviewPanel projects={projects} />
      <MobileMenu />
    </SiteUIContext.Provider>
  );
}
