"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { SectionLink } from "@/components/site/SectionLink";
import { useSiteUI } from "@/components/site/SiteShell";
import { siteConfig } from "@/lib/site-config";
import { cn } from "@/lib/utils";

export function Nav() {
  const pathname = usePathname();
  const { openOverview, menuOpen, setMenuOpen } = useSiteUI();
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const lastY = useRef(0);
  const menuOpenRef = useRef(menuOpen);

  useEffect(() => {
    menuOpenRef.current = menuOpen;
  }, [menuOpen]);

  // Hide while scrolling down past the first screen, reveal on scroll up.
  useEffect(() => {
    lastY.current = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 40);
      if (Math.abs(y - lastY.current) > 4) {
        setHidden(y > lastY.current && y > window.innerHeight * 0.6 && !menuOpenRef.current);
      }
      lastY.current = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={cn("nav", hidden && !menuOpen && "is-hidden", scrolled && "is-scrolled")}>
      <SectionLink section="top" className="nav__logo" aria-label="Rodrigo Barbosa, back to top">
        {siteConfig.initials}
      </SectionLink>

      <p className="nav__status">
        <span className="dot" />
        {siteConfig.status}
      </p>

      <nav className="nav__links" aria-label="Primary">
        <SectionLink section="work" className="nav__link ul" data-nav="work">
          Work
        </SectionLink>
        <SectionLink section="about" className="nav__link ul" data-nav="about">
          About
        </SectionLink>
        <Link
          href="/journal"
          className={cn("nav__link ul", pathname.startsWith("/journal") && "is-active")}
        >
          Journal
        </Link>
        <SectionLink section="contact" className="nav__link ul" data-nav="contact">
          Contact
        </SectionLink>
        <button className="pill" type="button" onClick={openOverview}>
          Overview
          <kbd>I</kbd>
        </button>
        <a
          className="pill pill--solid nav__cv"
          href={siteConfig.resumeUrl}
          download={siteConfig.resumeFileName}
        >
          CV
        </a>
        <button
          className="pill nav__menu"
          type="button"
          data-toggle-menu
          aria-expanded={menuOpen}
          aria-controls="menu"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? "Close" : "Menu"}
        </button>
      </nav>
    </header>
  );
}
