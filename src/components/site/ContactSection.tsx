"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { scrollToId } from "@/components/site/SiteShell";
import { siteConfig } from "@/lib/site-config";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

// Three offset lines assemble into one statement as the section arrives;
// "work" stretches along the width axis on the way in.
export function animateContact(section: HTMLElement, desktop: boolean) {
  const off = desktop ? 1 : 0.4;
  const st = { trigger: section, start: "top bottom", end: "top 12%", scrub: 0.6 };
  const q = gsap.utils.selector(section);
  gsap.fromTo(q(".cl1"), { xPercent: -35 * off }, { xPercent: 0, ease: "none", scrollTrigger: st });
  gsap.fromTo(
    q(".cl2"),
    { xPercent: 30 * off, fontVariationSettings: '"wdth" 62, "wght" 280' },
    {
      xPercent: 0,
      fontVariationSettings: '"wdth" 125, "wght" 280',
      ease: "none",
      scrollTrigger: { ...st },
    },
  );
  gsap.fromTo(q(".cl3"), { xPercent: -22 * off }, { xPercent: 0, ease: "none", scrollTrigger: { ...st } });

  const items = q(".c-in");
  gsap.set(items, { autoAlpha: 0, y: 18 });
  ScrollTrigger.batch(items, {
    start: "top 95%",
    once: true,
    onEnter: (batch) =>
      gsap.to(batch, { autoAlpha: 1, y: 0, duration: 1.1, ease: "expo.out", stagger: 0.07 }),
  });
}

export function ContactSection({ ownMotion = true }: { ownMotion?: boolean }) {
  const ref = useRef<HTMLElement>(null);
  const [clock, setClock] = useState("--:--");
  const [copied, setCopied] = useState<"idle" | "ok" | "fail">("idle");

  useEffect(() => {
    let fmt: Intl.DateTimeFormat;
    try {
      fmt = new Intl.DateTimeFormat("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
        timeZone: siteConfig.timezone,
      });
    } catch {
      fmt = new Intl.DateTimeFormat("en-GB", { hour: "2-digit", minute: "2-digit" });
    }
    const tick = () => setClock(fmt.format(new Date()));
    tick();
    const id = window.setInterval(tick, 15000);
    return () => window.clearInterval(id);
  }, []);

  useEffect(() => {
    if (copied === "idle") return;
    const id = window.setTimeout(() => setCopied("idle"), 2200);
    return () => window.clearTimeout(id);
  }, [copied]);

  useLayoutEffect(() => {
    const section = ref.current;
    if (!ownMotion || !section) return;
    if (!document.documentElement.classList.contains("motion")) return;
    const mm = gsap.matchMedia();
    mm.add({ desk: "(min-width: 900px)", mob: "(max-width: 899.98px)" }, (ctx) => {
      animateContact(section, !!ctx.conditions?.desk);
    });
    return () => mm.revert();
  }, [ownMotion]);

  const copy = () => {
    if (!navigator.clipboard) {
      setCopied("fail");
      return;
    }
    navigator.clipboard.writeText(siteConfig.email).then(
      () => setCopied("ok"),
      () => setCopied("fail"),
    );
  };

  return (
    <section
      ref={ref}
      className="contact"
      id="contact"
      data-tone="accent"
      data-nav="contact"
      aria-labelledby="contactTitle"
    >
      <p className="lbl">Contact</p>
      <h2 className="contact__title" id="contactTitle" aria-label="Let's work together">
        <span className="cl cl1" aria-hidden="true">
          Let&apos;s
        </span>
        <span className="cl cl2" aria-hidden="true">
          work
        </span>
        <span className="cl cl3" aria-hidden="true">
          together
        </span>
      </h2>

      <div className="contact__grid">
        <div className="contact__mail c-in">
          <p className="lbl">The fastest way to reach me</p>
          <a className="contact__email" href={siteConfig.emailHref()}>
            {siteConfig.email}
          </a>
          <div>
            <button className={cn("copy", copied === "ok" && "is-done")} type="button" onClick={copy}>
              {copied === "ok"
                ? "Copied to clipboard"
                : copied === "fail"
                  ? "Copy failed, use the link above"
                  : "Copy email address"}
            </button>
          </div>
        </div>
        <ul className="contact__links">
          <li className="c-in">
            <a href={siteConfig.whatsapp.href()} target="_blank" rel="noopener noreferrer">
              <span>WhatsApp</span>
              <span className="lbl">{siteConfig.whatsapp.display}</span>
              <span aria-hidden="true">↗</span>
            </a>
          </li>
          <li className="c-in">
            <a href={siteConfig.social.github} target="_blank" rel="noopener noreferrer">
              <span>GitHub</span>
              <span className="lbl">{siteConfig.social.githubHandle}</span>
              <span aria-hidden="true">↗</span>
            </a>
          </li>
          <li className="c-in">
            <a href={siteConfig.resumeUrl} download={siteConfig.resumeFileName}>
              <span>Curriculum vitae</span>
              <span className="lbl">PDF</span>
              <span aria-hidden="true">↓</span>
            </a>
          </li>
        </ul>
      </div>

      <footer className="foot">
        <span suppressHydrationWarning>
          © {new Date().getFullYear()} {siteConfig.name}
        </span>
        <span className="num">
          {clock} {siteConfig.city}
        </span>
        <span>Designed and built from scratch</span>
        <button className="ul" type="button" onClick={() => scrollToId("top")}>
          Back to top
        </button>
      </footer>
    </section>
  );
}
