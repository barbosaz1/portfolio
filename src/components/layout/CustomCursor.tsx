"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

const HOVER_SELECTOR = 'a, button, [data-cursor="hover"], input, textarea, select';

export function CustomCursor() {
  const [hovering, setHovering] = useState(false);
  const [visible, setVisible] = useState(false);

  const dotX = useMotionValue(-100);
  const dotY = useMotionValue(-100);
  const ringX = useSpring(dotX, { stiffness: 500, damping: 40, mass: 0.5 });
  const ringY = useSpring(dotY, { stiffness: 500, damping: 40, mass: 0.5 });

  const hoveringRef = useRef(false);

  useEffect(() => {
    const isFine = window.matchMedia("(pointer: fine)").matches;
    if (!isFine) return;
    document.documentElement.classList.add("has-custom-cursor");

    const handleMove = (e: PointerEvent) => {
      dotX.set(e.clientX);
      dotY.set(e.clientY);
      if (!visible) setVisible(true);

      const target = (e.target as HTMLElement)?.closest?.(HOVER_SELECTOR);
      const isHovering = Boolean(target);
      if (isHovering !== hoveringRef.current) {
        hoveringRef.current = isHovering;
        setHovering(isHovering);
      }
    };

    const handleLeave = () => setVisible(false);

    window.addEventListener("pointermove", handleMove);
    document.addEventListener("pointerleave", handleLeave);

    return () => {
      document.documentElement.classList.remove("has-custom-cursor");
      window.removeEventListener("pointermove", handleMove);
      document.removeEventListener("pointerleave", handleLeave);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <motion.div
        className="cursor-dot"
        style={{ x: dotX, y: dotY, translateX: "-50%", translateY: "-50%" }}
        animate={{ opacity: visible ? (hovering ? 0 : 1) : 0, scale: hovering ? 0.5 : 1 }}
        transition={{ duration: 0.2 }}
      />
      <motion.div
        className="cursor-ring"
        style={{ x: ringX, y: ringY, translateX: "-50%", translateY: "-50%" }}
        animate={{
          opacity: visible ? 1 : 0,
          width: hovering ? 64 : 36,
          height: hovering ? 64 : 36,
          backgroundColor: hovering ? "rgba(124, 92, 255, 0.12)" : "rgba(0,0,0,0)",
          borderColor: hovering ? "rgba(124, 92, 255, 0.6)" : "rgba(246, 245, 241, 0.16)",
        }}
      />
    </>
  );
}
