"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import { cn } from "@/lib/utils";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { EmailButton } from "@/components/ui/EmailButton";
import { MenuOverlay } from "./MenuOverlay";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 24);
  });

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 2.0 }}
        className={cn(
          "fixed inset-x-0 top-0 z-[9991] transition-colors duration-500",
          scrolled || open
            ? "border-b border-border bg-bg/75 backdrop-blur-md"
            : "bg-transparent",
        )}
      >
        <div className="container-premium flex h-20 items-center justify-between">
          <Link
            href="/"
            data-cursor="hover"
            onClick={() => setOpen(false)}
            className="text-xl tracking-tight text-fg"
          >
            Rodrigo <span className="font-display italic text-accent-soft">Barbosa</span>
          </Link>

          <div className="flex items-center gap-3">
            <EmailButton
              label="Email"
              variant="secondary"
              className="hidden !px-5 !py-2.5 text-xs sm:inline-flex"
            />
            <WhatsAppButton
              label="WhatsApp"
              variant="secondary"
              className="hidden !px-5 !py-2.5 text-xs sm:inline-flex"
            />
            <button
              type="button"
              data-cursor="hover"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
              className="flex h-10 items-center gap-2.5 rounded-full border border-border-strong px-4 text-fg"
            >
              <span className="hidden font-mono text-xs uppercase tracking-[0.15em] sm:inline">
                {open ? "Close" : "Menu"}
              </span>
              <span className="relative flex h-3 w-4 flex-shrink-0 flex-col justify-between">
                <span
                  className={cn(
                    "h-px w-full bg-fg transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]",
                    open && "translate-y-[5.5px] rotate-45",
                  )}
                />
                <span
                  className={cn(
                    "h-px w-full bg-fg transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]",
                    open && "-translate-y-[5.5px] -rotate-45",
                  )}
                />
              </span>
            </button>
          </div>
        </div>
      </motion.header>

      <MenuOverlay open={open} onClose={() => setOpen(false)} />
    </>
  );
}
