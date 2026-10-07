"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { SectionLink } from "@/components/site/SectionLink";
import { useSiteUI } from "@/components/site/SiteShell";
import { siteConfig } from "@/lib/site-config";
import { lockScroll } from "@/lib/scroll-lock";
import { trapTab } from "@/lib/focus-trap";
import { cn } from "@/lib/utils";

const sections = [
  { id: "work", label: "Work" },
  { id: "about", label: "About" },
  { id: "skills", label: "Toolkit" },
  { id: "path", label: "Path" },
];

export function MobileMenu() {
  const { menuOpen, setMenuOpen, openOverview } = useSiteUI();
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!menuOpen) return;
    const release = lockScroll();
    // Flips the nav's colour so it stays readable over the inverted menu.
    document.documentElement.classList.add("menu-open");
    const onKey = (e: KeyboardEvent) =>
      trapTab(e, menuRef.current, document.querySelector<HTMLElement>("[data-toggle-menu]"));
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.documentElement.classList.remove("menu-open");
      release();
    };
  }, [menuOpen]);

  return (
    <div
      ref={menuRef}
      id="menu"
      className={cn("menu", menuOpen && "is-open")}
      aria-hidden={!menuOpen}
      inert={!menuOpen}
    >
      <nav className="menu__nav" aria-label="Mobile">
        {sections.map((s, i) => (
          <SectionLink
            key={s.id}
            section={s.id}
            style={{ "--i": i } as React.CSSProperties}
          >
            {s.label}
          </SectionLink>
        ))}
        <Link
          href="/journal"
          style={{ "--i": sections.length } as React.CSSProperties}
          onClick={() => setMenuOpen(false)}
        >
          Journal
        </Link>
        <SectionLink section="contact" style={{ "--i": sections.length + 1 } as React.CSSProperties}>
          Contact
        </SectionLink>
      </nav>
      <div className="menu__foot">
        <button className="pill" type="button" onClick={openOverview}>
          Overview
        </button>
        <a className="pill" href={siteConfig.resumeUrl} download={siteConfig.resumeFileName}>
          CV
        </a>
        <a className="pill" href={siteConfig.emailHref()}>
          Email
        </a>
        <a className="pill" href={siteConfig.whatsapp.href()} target="_blank" rel="noopener noreferrer">
          WhatsApp
        </a>
      </div>
    </div>
  );
}
