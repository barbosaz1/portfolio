"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

// Dot cursor with contextual labels. Elements opt in with data-cursor="Label";
// data-cursor-big turns the dot into a large cobalt disc carrying the label.
export function Cursor() {
  const ref = useRef<HTMLDivElement>(null);
  const [label, setLabel] = useState("");
  const [mode, setMode] = useState({ link: false, label: false, big: false });
  const [down, setDown] = useState(false);
  const [hidden, setHidden] = useState(true);

  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const el = ref.current;
    if (!fine || reduced || !el) return;

    const root = document.documentElement;
    root.classList.add("has-cursor");

    let tx = -100;
    let ty = -100;
    let x = -100;
    let y = -100;
    let raf = 0;

    const loop = () => {
      x += (tx - x) * 0.22;
      y += (ty - y) * 0.22;
      el.style.transform = `translate3d(${x.toFixed(1)}px,${y.toFixed(1)}px,0)`;
      raf = Math.abs(tx - x) + Math.abs(ty - y) > 0.1 ? requestAnimationFrame(loop) : 0;
    };

    const onMove = (e: PointerEvent) => {
      tx = e.clientX;
      ty = e.clientY;
      setHidden(false);
      if (!raf) raf = requestAnimationFrame(loop);
    };
    const onLeave = () => setHidden(true);
    const onDown = () => setDown(true);
    const onUp = () => setDown(false);
    const onOver = (e: PointerEvent) => {
      const target = e.target as Element | null;
      if (!target?.closest) return;
      const labelled = target.closest<HTMLElement>("[data-cursor]");
      const link = target.closest("a, button");
      setMode({
        label: !!labelled,
        big: !!labelled?.hasAttribute("data-cursor-big"),
        link: !labelled && !!link,
      });
      if (labelled) setLabel(labelled.dataset.cursor ?? "");
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    root.addEventListener("mouseleave", onLeave);
    window.addEventListener("pointerdown", onDown);
    window.addEventListener("pointerup", onUp);
    document.addEventListener("pointerover", onOver);

    return () => {
      cancelAnimationFrame(raf);
      root.classList.remove("has-cursor");
      window.removeEventListener("pointermove", onMove);
      root.removeEventListener("mouseleave", onLeave);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      document.removeEventListener("pointerover", onOver);
    };
  }, []);

  return (
    <div
      ref={ref}
      className={cn(
        "cursor",
        hidden && "is-hidden",
        mode.link && "is-link",
        mode.label && "is-label",
        mode.big && "is-big",
        down && "is-down",
      )}
      aria-hidden="true"
    >
      <span className="cursor__dot" />
      <span className="cursor__label">{label}</span>
    </div>
  );
}
