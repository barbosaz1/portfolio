"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, animate, motion, useMotionValue } from "framer-motion";

const STORAGE_KEY = "rb-portfolio-loaded";

export function LoadingScreen() {
  const [show, setShow] = useState(true);
  const [displayCount, setDisplayCount] = useState(0);
  const count = useMotionValue(0);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const alreadyVisited = Boolean(sessionStorage.getItem(STORAGE_KEY));
    document.body.style.overflow = alreadyVisited ? "" : "hidden";

    const controls = animate(count, 100, {
      duration: alreadyVisited ? 0.01 : 1.9,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setDisplayCount(Math.round(v)),
      onComplete: () => {
        sessionStorage.setItem(STORAGE_KEY, "1");
        window.setTimeout(
          () => {
            setShow(false);
            document.body.style.overflow = "";
          },
          alreadyVisited ? 0 : 300,
        );
      },
    });

    return () => controls.stop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-[9998] flex flex-col items-center justify-center bg-bg"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <motion.div
            className="absolute inset-0 bg-bg"
            initial={{ clipPath: "inset(0% 0% 0% 0%)" }}
            exit={{ clipPath: "inset(0% 0% 100% 0%)" }}
            transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
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
              <motion.div
                className="h-full bg-accent"
                style={{ width: `${displayCount}%` }}
                transition={{ ease: "linear" }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
