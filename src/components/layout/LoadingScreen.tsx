"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const STORAGE_KEY = "rb-portfolio-loaded";
const DURATION_MS = 1900;
const EXIT_DELAY_MS = 300;

export function LoadingScreen() {
  const [show, setShow] = useState(true);
  const [displayCount, setDisplayCount] = useState(0);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const alreadyVisited = Boolean(sessionStorage.getItem(STORAGE_KEY));
    const duration = alreadyVisited ? 0 : DURATION_MS;

    document.body.style.overflow = alreadyVisited ? "" : "hidden";

    // The visible percentage and the unlock itself are driven by plain
    // wall-clock timers, never requestAnimationFrame — rAF can be fully
    // paused by the browser while a tab is backgrounded, which would
    // otherwise leave this screen (and the scroll lock) stuck indefinitely
    // for anyone who opens the site in a background tab.
    const startedAt = Date.now();
    const interval =
      duration > 0
        ? window.setInterval(() => {
            const elapsed = Date.now() - startedAt;
            setDisplayCount(Math.min(100, Math.round((elapsed / duration) * 100)));
          }, 40)
        : undefined;

    const finish = window.setTimeout(() => {
      if (interval) window.clearInterval(interval);
      setDisplayCount(100);
      sessionStorage.setItem(STORAGE_KEY, "1");
      window.setTimeout(
        () => {
          setShow(false);
          document.body.style.overflow = "";
        },
        alreadyVisited ? 0 : EXIT_DELAY_MS,
      );
    }, duration);

    return () => {
      if (interval) window.clearInterval(interval);
      window.clearTimeout(finish);
    };
  }, []);

  return (
    <div
      className={cn(
        "fixed inset-0 z-[9998] flex flex-col items-center justify-center bg-bg transition-opacity duration-500 ease-out",
        show ? "opacity-100" : "pointer-events-none opacity-0",
      )}
      aria-hidden={!show}
    >
      <div
        className={cn(
          "absolute inset-0 bg-bg transition-[clip-path] duration-700 ease-[cubic-bezier(0.76,0,0.24,1)]",
          show ? "[clip-path:inset(0%_0%_0%_0%)]" : "[clip-path:inset(0%_0%_100%_0%)]",
        )}
      />

      <div className="relative z-10 flex flex-col items-center gap-6">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-baseline gap-3 text-4xl md:text-5xl tracking-tight"
        >
          <span className="font-medium text-fg">Rodrigo</span>
          <span className="font-display italic text-accent-soft">Barbosa</span>
        </motion.div>

        <div className="flex items-center gap-3 font-mono text-xs text-fg-subtle">
          <span className="h-px w-10 bg-border-strong" />
          <span className="tabular-nums">{displayCount.toString().padStart(3, "0")}%</span>
          <span className="h-px w-10 bg-border-strong" />
        </div>

        <div className="h-px w-40 overflow-hidden bg-border">
          <div
            className="h-full bg-accent transition-[width] duration-100 ease-linear"
            style={{ width: `${displayCount}%` }}
          />
        </div>
      </div>
    </div>
  );
}
