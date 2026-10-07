import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { animateContact } from "@/components/site/ContactSection";

gsap.registerPlugin(ScrollTrigger);

export const DESK = "(min-width: 900px)";

/* Fit the two name lines to the viewport width (capped by height on desktop). */
export function fitHero(root: HTMLElement) {
  const h1 = root.querySelector<HTMLElement>(".hero__name");
  if (!h1) return;
  h1.style.fontSize = "100px";
  const [w1, w2] = Array.from(h1.querySelectorAll<HTMLElement>(".hero__word")).map(
    (w) => w.getBoundingClientRect().width,
  );
  if (!w1 || !w2) return;
  const note = h1.querySelector<HTMLElement>(".hero__note");
  const noteW =
    note && getComputedStyle(note).display !== "none" ? note.getBoundingClientRect().width + 32 : 0;
  const avail = h1.clientWidth;
  let fs = 100 * Math.min((avail * 0.985) / w1, (avail - noteW) / w2);
  if (window.matchMedia(DESK).matches) fs = Math.min(fs, window.innerHeight * 0.3);
  h1.style.fontSize = `${Math.floor(fs)}px`;
}

export type HeroType = {
  enable: () => void;
  setScroll: (progress: number) => void;
  destroy: () => void;
};

/* Hero letters condense near the cursor and as the pinned hero scrolls away. */
export function createHeroType(root: HTMLElement, interactive: boolean): HeroType {
  const chars = Array.from(root.querySelectorAll<HTMLElement>(".hero__line .ch"));
  const BASE = { w: 112, g: 640 };
  const END = { w: 64, g: 820 };
  const state = chars.map(() => ({ w: BASE.w, g: BASE.g }));
  const hero = root.querySelector<HTMLElement>("#top");
  let enabled = false;
  let raf = 0;
  let mx = -1e4;
  let my = -1e4;
  let inside = false;
  let scrollP = 0;

  const clamp = (v: number, a: number, b: number) => Math.min(b, Math.max(a, v));

  const frame = () => {
    raf = 0;
    const bw = BASE.w + (END.w - BASE.w) * scrollP;
    const bg = BASE.g + (END.g - BASE.g) * scrollP;
    const infl = interactive && inside ? clamp(1 - scrollP * 6, 0, 1) : 0;
    const radius = Math.max(220, window.innerWidth * 0.2);
    const rects = infl > 0 ? chars.map((c) => c.getBoundingClientRect()) : null;
    let moving = false;
    chars.forEach((c, i) => {
      let tw = bw;
      let tg = bg;
      if (rects) {
        const r = rects[i];
        const d = Math.hypot(mx - (r.left + r.width / 2), (my - (r.top + r.height / 2)) * 1.3);
        const t = clamp(1 - d / radius, 0, 1);
        const e = t * t * (3 - 2 * t) * infl;
        tw = bw + (62 - bw) * e;
        tg = bg + (900 - bg) * e;
      }
      const s = state[i];
      s.w += (tw - s.w) * 0.16;
      s.g += (tg - s.g) * 0.16;
      if (Math.abs(tw - s.w) > 0.08 || Math.abs(tg - s.g) > 0.4) moving = true;
      c.style.fontVariationSettings = `"wdth" ${s.w.toFixed(1)}, "wght" ${s.g.toFixed(0)}`;
    });
    if (moving) req();
  };
  const req = () => {
    if (!raf && enabled) raf = requestAnimationFrame(frame);
  };
  const onMove = (e: PointerEvent) => {
    mx = e.clientX;
    my = e.clientY;
    inside = true;
    req();
  };
  const onLeave = () => {
    inside = false;
    req();
  };
  if (interactive && hero) {
    hero.addEventListener("pointermove", onMove, { passive: true });
    hero.addEventListener("pointerleave", onLeave);
  }

  return {
    enable() {
      enabled = true;
      req();
    },
    setScroll(p) {
      scrollP = p;
      req();
    },
    destroy() {
      cancelAnimationFrame(raf);
      raf = 0;
      enabled = false;
      hero?.removeEventListener("pointermove", onMove);
      hero?.removeEventListener("pointerleave", onLeave);
      chars.forEach((c) => (c.style.fontVariationSettings = ""));
    },
  };
}

export function playHeroIntro(root: HTMLElement, onComplete: () => void) {
  const q = gsap.utils.selector(root);
  gsap
    .timeline({ onComplete })
    .fromTo(
      q(".hero__line .ch"),
      { y: 0, yPercent: 115 },
      { y: 0, yPercent: 0, duration: 1.3, ease: "expo.out", stagger: 0.035 },
      0,
    )
    .fromTo(q(".hero__note"), { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.9 }, 0.6)
    .fromTo(
      q(".h-in"),
      { autoAlpha: 0, y: 14 },
      { autoAlpha: 1, y: 0, duration: 1, ease: "expo.out", stagger: 0.06 },
      0.4,
    );
}

function revealChars(el: Element | null | undefined, opts: { start?: string; stagger?: number } = {}) {
  if (!el) return;
  const chars = el.querySelectorAll(".ch");
  gsap.set(chars, { yPercent: 115 });
  ScrollTrigger.create({
    trigger: el,
    start: opts.start ?? "top 85%",
    once: true,
    onEnter: () =>
      gsap.to(chars, { yPercent: 0, duration: 1.2, ease: "expo.out", stagger: opts.stagger ?? 0.025 }),
  });
}

function batchIn(
  els: Element[],
  vars: { start?: string; from?: gsap.TweenVars; to?: gsap.TweenVars } = {},
) {
  if (!els.length) return;
  gsap.set(els, { autoAlpha: 0, y: 18, ...(vars.from ?? {}) });
  ScrollTrigger.batch(els, {
    start: vars.start ?? "top 90%",
    once: true,
    onEnter: (batch) =>
      gsap.to(batch, {
        autoAlpha: 1,
        y: 0,
        duration: 1.1,
        ease: "expo.out",
        stagger: 0.07,
        ...(vars.to ?? {}),
      }),
  });
}

/* All scroll choreography for the home page. Returns the matchMedia instance
   so the caller can revert it on unmount. */
export function initScrollMotion(root: HTMLElement, heroType: HeroType) {
  const mm = gsap.matchMedia();
  mm.add({ desk: DESK, mob: "(max-width: 899.98px)" }, (ctx) => {
    const desk = !!ctx.conditions?.desk;
    const q = gsap.utils.selector(root);
    const hero = q("#top")[0] as HTMLElement;

    /* HERO - pinned. The name parts, condenses, and reveals the statement between the lines. */
    if (desk) {
      gsap
        .timeline({
          scrollTrigger: {
            trigger: hero,
            start: "top top",
            end: "+=120%",
            pin: q(".hero__pin")[0],
            scrub: 0.6,
            onUpdate: (s) => heroType.setScroll(s.progress),
          },
        })
        .to(q(".hero__line--1"), { xPercent: -22, yPercent: -40, ease: "none", duration: 1 }, 0)
        .to(q(".hero__line--2"), { xPercent: 22, yPercent: 40, ease: "none", duration: 1 }, 0)
        .to(q(".hero__facts, .hero__foot"), { autoAlpha: 0, y: -16, ease: "none", duration: 0.25 }, 0)
        .fromTo(
          q(".hero__statement"),
          { autoAlpha: 0, y: 40, filter: "blur(10px)" },
          { autoAlpha: 1, y: 0, filter: "blur(0px)", ease: "power2.out", duration: 0.4 },
          0.35,
        );
    } else {
      const st = { trigger: hero, start: "top top", end: "bottom top", scrub: true };
      gsap.to(q(".hero__line--1"), { xPercent: -10, ease: "none", scrollTrigger: st });
      gsap.to(q(".hero__line--2"), { xPercent: 10, ease: "none", scrollTrigger: { ...st } });
    }

    /* INTRO - statement fills in word by word as you read; portrait uncovers. */
    const statement = q(".intro__statement")[0];
    gsap.fromTo(
      q(".intro__statement .w"),
      { opacity: 0.12 },
      {
        opacity: 1,
        ease: "none",
        stagger: 0.1,
        scrollTrigger: { trigger: statement, start: "top 80%", end: "bottom 45%", scrub: true },
      },
    );
    const portrait = q(".portrait")[0];
    gsap.fromTo(
      portrait,
      { clipPath: "inset(100% 0% 0% 0%)" },
      {
        clipPath: "inset(0% 0% 0% 0%)",
        duration: 1.5,
        ease: "expo.inOut",
        scrollTrigger: { trigger: portrait, start: "top 85%", once: true },
      },
    );
    batchIn(q(".fact"), { from: { "--line": 0 }, to: { "--line": 1 } });

    /* WORK - each project grows from a small frame to the full stage; title and metadata follow. */
    revealChars(q(".work__title")[0], { stagger: 0.03 });
    q(".proj").forEach((p) => {
      const pq = gsap.utils.selector(p);
      const media = pq(".proj__media")[0];
      const img = pq(".proj__img")[0];
      const chars = pq(".proj__title .ch");
      const meta = pq(".r");
      if (desk) {
        gsap
          .timeline({ scrollTrigger: { trigger: p, start: "top 75%", end: "bottom bottom", scrub: 0.8 } })
          .fromTo(
            media,
            { clipPath: "inset(20% 30% 20% 30%)" },
            { clipPath: "inset(0% 0% 0% 0%)", ease: "power2.inOut", duration: 0.5 },
            0,
          )
          .fromTo(img, { scale: 1.45 }, { scale: 1, ease: "power2.out", duration: 0.6 }, 0)
          .fromTo(
            chars,
            { yPercent: 115 },
            { yPercent: 0, ease: "power3.out", stagger: 0.012, duration: 0.22 },
            0.18,
          )
          .fromTo(
            meta,
            { autoAlpha: 0, y: 24 },
            { autoAlpha: 1, y: 0, ease: "power2.out", stagger: 0.04, duration: 0.2 },
            0.34,
          )
          .to(img, { yPercent: -5, ease: "none", duration: 0.4 }, 0.6);
        gsap.fromTo(
          pq(".proj__bar i"),
          { scaleX: 0 },
          {
            scaleX: 1,
            ease: "none",
            scrollTrigger: { trigger: p, start: "top top", end: "bottom bottom", scrub: true },
          },
        );
        gsap.to(pq(".proj__stage"), {
          scale: 0.93,
          opacity: 0.3,
          ease: "none",
          scrollTrigger: { trigger: p, start: "bottom bottom", end: "bottom top", scrub: true },
        });
      } else {
        const st = { trigger: media, start: "top 85%", once: true };
        gsap.fromTo(
          media,
          { clipPath: "inset(12% 12% 12% 12%)" },
          { clipPath: "inset(0% 0% 0% 0%)", duration: 1.3, ease: "expo.out", scrollTrigger: st },
        );
        gsap.fromTo(
          img,
          { scale: 1.3 },
          { scale: 1, duration: 1.6, ease: "expo.out", scrollTrigger: { ...st } },
        );
        gsap.set(chars, { yPercent: 115 });
        ScrollTrigger.create({
          trigger: pq(".proj__title")[0],
          start: "top 92%",
          once: true,
          onEnter: () =>
            gsap.to(chars, { yPercent: 0, duration: 1.1, ease: "expo.out", stagger: 0.02 }),
        });
        gsap.set(meta, { autoAlpha: 0, y: 16 });
        ScrollTrigger.create({
          trigger: pq(".proj__side")[0],
          start: "top 92%",
          once: true,
          onEnter: () =>
            gsap.to(meta, { autoAlpha: 1, y: 0, duration: 1, ease: "expo.out", stagger: 0.06 }),
        });
      }
    });

    /* SKILLS - the categories scroll sideways while the section is held in place. */
    const track = q(".skills__track")[0] as HTMLElement;
    const panels = q(".skill-panel:not(.skill-panel--intro):not(.skill-panel--end)");
    const words = (panel: Element) => [
      ...Array.from(panel.querySelectorAll(".skill-panel__name .ch")),
      ...Array.from(panel.querySelectorAll(".skill")),
    ];
    revealChars(q(".skills__title")[0], { start: "top 70%", stagger: 0.03 });
    if (desk && track) {
      const dist = () => Math.max(0, track.scrollWidth - window.innerWidth);
      const progress = q(".skills__progress i");
      const tween = gsap.to(track, {
        x: () => -dist(),
        ease: "none",
        scrollTrigger: {
          trigger: q(".skills")[0],
          start: "top top",
          end: () => "+=" + dist(),
          pin: q(".skills__pin")[0],
          scrub: 0.8,
          invalidateOnRefresh: true,
          onUpdate: (s) => gsap.set(progress, { scaleX: s.progress }),
        },
      });
      panels.forEach((panel) => {
        const w = words(panel);
        gsap.set(w, { yPercent: 110 });
        ScrollTrigger.create({
          trigger: panel,
          containerAnimation: tween,
          start: "left 80%",
          once: true,
          onEnter: () =>
            gsap.to(w, { yPercent: 0, duration: 1.1, ease: "expo.out", stagger: 0.018 }),
        });
      });
    } else {
      panels.forEach((panel) => {
        const w = words(panel);
        gsap.set(w, { yPercent: 110 });
        ScrollTrigger.create({
          trigger: panel,
          start: "top 85%",
          once: true,
          onEnter: () =>
            gsap.to(w, { yPercent: 0, duration: 1.1, ease: "expo.out", stagger: 0.018 }),
        });
      });
    }

    /* PATH + JOURNAL - rules draw in like a timeline being written. */
    q(".path__title").forEach((title) => revealChars(title, { stagger: 0.04 }));
    batchIn(q(".path__row"), { from: { "--line": 0, y: 10 }, to: { "--line": 1, duration: 1.3 } });
    batchIn(q(".jrow"), { from: { "--line": 0, y: 10 }, to: { "--line": 1, duration: 1.3 } });

    /* CONTACT */
    const contact = q("#contact")[0] as HTMLElement | undefined;
    if (contact) animateContact(contact, desk);
  });
  return mm;
}

/* Project media drifts toward the cursor. */
export function initMediaHover(root: HTMLElement) {
  const offs: (() => void)[] = [];
  root.querySelectorAll<HTMLElement>(".proj__media").forEach((m) => {
    const inner = m.querySelector<HTMLElement>(".proj__hover");
    if (!inner) return;
    const qx = gsap.quickTo(inner, "x", { duration: 0.9, ease: "power3" });
    const qy = gsap.quickTo(inner, "y", { duration: 0.9, ease: "power3" });
    const enter = () => gsap.to(inner, { scale: 1.05, duration: 1, ease: "expo.out" });
    const move = (e: PointerEvent) => {
      const r = m.getBoundingClientRect();
      qx(((e.clientX - r.left) / r.width - 0.5) * -24);
      qy(((e.clientY - r.top) / r.height - 0.5) * -16);
    };
    const leave = () => {
      qx(0);
      qy(0);
      gsap.to(inner, { scale: 1, duration: 1, ease: "expo.out" });
    };
    m.addEventListener("pointerenter", enter);
    m.addEventListener("pointermove", move);
    m.addEventListener("pointerleave", leave);
    offs.push(() => {
      m.removeEventListener("pointerenter", enter);
      m.removeEventListener("pointermove", move);
      m.removeEventListener("pointerleave", leave);
      gsap.killTweensOf(inner);
      gsap.set(inner, { clearProps: "transform" });
    });
  });
  return () => offs.forEach((off) => off());
}

/* Marquee: base drift follows scroll direction; velocity adds speed and skew. */
export function initMarquee(root: HTMLElement) {
  const track = root.querySelector<HTMLElement>(".marquee__track");
  if (!track || !track.parentElement) return () => {};
  let x = 0;
  let w = 0;
  let skew = 0;
  let vel = 0;
  let dir = 1;
  let run = false;
  let lastY = window.scrollY;
  let last = 0;
  let raf = 0;
  const clamp = (v: number, a: number, b: number) => Math.min(b, Math.max(a, v));
  const measure = () => {
    w = (track.firstElementChild as HTMLElement | null)?.getBoundingClientRect().width ?? 0;
  };
  measure();
  window.addEventListener("resize", measure);
  document.fonts?.ready.then(measure);

  const loop = (now: number) => {
    raf = 0;
    if (!run) return;
    const dt = Math.min(64, now - last) / 16.67;
    last = now;
    const y = window.scrollY;
    const dy = y - lastY;
    lastY = y;
    vel += (dy - vel) * 0.18;
    if (Math.abs(dy) > 0.5) dir = Math.sign(dy);
    x -= (dir * 0.9 + vel * 0.35) * dt;
    if (w) {
      while (x <= -w) x += w;
      while (x > 0) x -= w;
    }
    skew += (clamp(-vel * 0.22, -9, 9) - skew) * 0.12;
    track.style.transform = `translate3d(${x.toFixed(2)}px,0,0) skewX(${skew.toFixed(2)}deg)`;
    raf = requestAnimationFrame(loop);
  };
  const io = new IntersectionObserver(([entry]) => {
    run = entry.isIntersecting;
    if (run && !raf) {
      last = performance.now();
      lastY = window.scrollY;
      raf = requestAnimationFrame(loop);
    }
  });
  io.observe(track.parentElement);

  return () => {
    run = false;
    cancelAnimationFrame(raf);
    io.disconnect();
    window.removeEventListener("resize", measure);
    track.style.transform = "";
  };
}
