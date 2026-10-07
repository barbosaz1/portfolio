"use client";

import { useEffect, useState } from "react";
import { markLoaderDone } from "@/lib/loader-signal";
import { siteConfig } from "@/lib/site-config";
import { cn } from "@/lib/utils";

const VISITED_KEY = "rb-visited";

// First visit per session: counts to 100 while fonts load, then wipes up.
// Everything runs on setTimeout/setInterval plus a CSS transition, so it can
// never get stuck if the browser pauses animation frames (background tabs).
// It never locks scrolling.
export function Loader() {
  const [count, setCount] = useState(0);
  const [phase, setPhase] = useState<"counting" | "out" | "gone">("counting");

  useEffect(() => {
    const root = document.documentElement;
    // Repeat visit / reduced motion: CSS already hides the loader.
    if (root.classList.contains("rb-skip-loader")) {
      markLoaderDone();
      return;
    }
    try {
      sessionStorage.setItem(VISITED_KEY, "1");
    } catch {}

    const timers: number[] = [];
    const later = (fn: () => void, ms: number) => timers.push(window.setTimeout(fn, ms));
    const start = Date.now();

    // Ease toward 84 while waiting.
    const tick = window.setInterval(() => {
      const t = Math.min(1, (Date.now() - start) / 1100);
      setCount((c) => Math.max(c, Math.round(84 * (1 - Math.pow(1 - t, 2)))));
    }, 40);

    let finished = false;
    const finish = () => {
      if (finished) return;
      finished = true;
      window.clearInterval(tick);
      setCount(100);
      later(() => setPhase("out"), 350);
      later(markLoaderDone, 350 + 450);
      later(() => setPhase("gone"), 350 + 1150);
    };

    const fontsReady = document.fonts ? document.fonts.ready : Promise.resolve();
    Promise.all([
      Promise.race([fontsReady, new Promise((r) => window.setTimeout(r, 2500))]),
      new Promise((r) => window.setTimeout(r, 1000)),
    ]).then(finish);
    // Hard ceiling, whatever happens with fonts.
    later(finish, 4000);

    return () => {
      window.clearInterval(tick);
      timers.forEach((id) => window.clearTimeout(id));
    };
  }, []);

  if (phase === "gone") return null;

  return (
    <div className={cn("loader", phase === "out" && "is-out")} aria-hidden="true">
      <div className="loader__row">
        <span className="loader__name">{siteConfig.name}</span>
        <span className="loader__count">{String(count).padStart(3, "0")}</span>
      </div>
      <div className="loader__bar">
        <i style={{ transform: `scaleX(${count / 100})` }} />
      </div>
    </div>
  );
}
