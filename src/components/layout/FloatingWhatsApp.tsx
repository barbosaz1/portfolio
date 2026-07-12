"use client";

import { useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { FaWhatsapp } from "react-icons/fa6";
import { siteConfig } from "@/lib/site-config";
import { useMagnetic } from "@/hooks/useMagnetic";

export function FloatingWhatsApp() {
  const [visible, setVisible] = useState(false);
  const { scrollY } = useScroll();
  const { ref, x, y, onMouseMove, onMouseLeave } = useMagnetic(0.25);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setVisible(latest > (typeof window !== "undefined" ? window.innerHeight * 0.85 : 800));
  });

  return (
    <AnimatePresence>
      {visible && (
        <motion.a
          ref={ref as React.RefObject<HTMLAnchorElement>}
          href={siteConfig.whatsapp.href()}
          target="_blank"
          rel="noopener noreferrer"
          data-cursor="hover"
          aria-label="Chat on WhatsApp"
          initial={{ opacity: 0, scale: 0.6, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.6, y: 20 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          style={{ x, y }}
          onMouseMove={onMouseMove}
          onMouseLeave={onMouseLeave}
          className="fixed bottom-6 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[var(--color-whatsapp)] text-bg shadow-[0_8px_30px_-6px_rgba(37,211,102,0.55)] md:bottom-8 md:right-8"
        >
          <span className="absolute inset-0 -z-10 animate-ping rounded-full bg-[var(--color-whatsapp)] opacity-40 [animation-duration:2.4s]" />
          <FaWhatsapp className="h-6 w-6 text-white" aria-hidden />
        </motion.a>
      )}
    </AnimatePresence>
  );
}
