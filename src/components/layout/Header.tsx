"use client";

import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";

const navLinks = [
  { label: "About", href: "/#about" },
  { label: "Projects", href: "/#projects" },
  { label: "Services", href: "/#services" },
  { label: "Process", href: "/#process" },
  { label: "Contact", href: "/#contact" },
];

export function Header({ variant = "full" }: { variant?: "full" | "minimal" }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 24);
  });

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 2.0 }}
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-colors duration-500",
          scrolled ? "border-b border-border bg-bg/75 backdrop-blur-md" : "bg-transparent",
        )}
      >
        <div className="container-premium flex h-20 items-center justify-between">
          <Link href="/" data-cursor="hover" className="text-xl tracking-tight text-fg">
            Rodrigo <span className="font-display italic text-accent-soft">Barbosa</span>
          </Link>

          {variant === "full" && (
            <nav className="hidden items-center gap-9 md:flex">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  data-cursor="hover"
                  className="text-sm text-fg-muted transition-colors duration-300 hover:text-fg"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          )}

          <div className="flex items-center gap-3">
            {variant === "minimal" && (
              <Link
                href="/#projects"
                data-cursor="hover"
                className="hidden text-sm text-fg-muted transition-colors hover:text-fg sm:inline"
              >
                ← All Projects
              </Link>
            )}
            <WhatsAppButton
              label="WhatsApp"
              variant="secondary"
              className="hidden !px-5 !py-2.5 text-xs sm:inline-flex"
            />
            {variant === "full" && (
              <button
                type="button"
                data-cursor="hover"
                aria-label="Toggle menu"
                onClick={() => setOpen((v) => !v)}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-border-strong text-fg md:hidden"
              >
                {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
              </button>
            )}
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && variant === "full" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-8 bg-bg/98 backdrop-blur-xl md:hidden"
          >
            {navLinks.map((link, i) => (
              <motion.div
                key={link.href}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.08 * i, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              >
                <Link
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="text-3xl text-fg"
                >
                  {link.label}
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
