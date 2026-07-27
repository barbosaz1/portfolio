"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { FaGithub, FaWhatsapp } from "react-icons/fa6";
import { Mail, Download } from "lucide-react";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/lib/site-config";

const pages = [
  { label: "Home", href: "/" },
  { label: "Work", href: "/work" },
  { label: "Journal", href: "/journal" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

const socials = [
  { label: "GitHub", href: siteConfig.social.github, icon: FaGithub },
  { label: "WhatsApp", href: siteConfig.whatsapp.href(), icon: FaWhatsapp },
  { label: "Email", href: siteConfig.emailHref(), icon: Mail },
];

export function MenuOverlay({ open, onClose }: { open: boolean; onClose: () => void }) {
  const pathname = usePathname();

  return (
    <div
      className={cn(
        "fixed inset-0 z-[9990] flex flex-col bg-bg/98 backdrop-blur-xl transition-opacity duration-300 ease-out",
        open ? "opacity-100" : "pointer-events-none opacity-0",
      )}
      aria-hidden={!open}
    >
      <div className="bg-noise bg-grid pointer-events-none absolute inset-0 opacity-60" />

      <div className="container-premium relative z-10 flex flex-1 flex-col justify-center py-28">
        <nav className="flex flex-col">
          {pages.map((page, i) => {
            const isActive = pathname === page.href;
            return (
              <motion.div
                key={page.href}
                animate={{ opacity: open ? 1 : 0, y: open ? 0 : 24 }}
                transition={{
                  duration: 0.5,
                  ease: [0.16, 1, 0.3, 1],
                  delay: open ? 0.1 + i * 0.05 : 0,
                }}
              >
                <Link
                  href={page.href}
                  onClick={onClose}
                  data-cursor="hover"
                  className={cn(
                    "group flex items-baseline gap-4 border-t border-border py-4 last:border-b md:py-5",
                    isActive ? "text-fg" : "text-fg-muted",
                  )}
                >
                  <span className="font-mono text-sm text-fg-subtle">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-5xl font-medium tracking-tight transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-3 group-hover:text-fg md:text-7xl">
                    {page.label}
                  </span>
                  {isActive && (
                    <span className="ml-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-accent" />
                  )}
                </Link>
              </motion.div>
            );
          })}
        </nav>

        <motion.div
          animate={{ opacity: open ? 1 : 0, y: open ? 0 : 16 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: open ? 0.4 : 0 }}
          className="mt-14 flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between"
        >
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-fg-subtle">
              Based in
            </p>
            <p className="mt-2 text-lg text-fg">Portugal</p>
          </div>

          <div className="flex items-center gap-6">
            {socials.map(({ label, href, icon: Icon }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                data-cursor="hover"
                aria-label={label}
                className="text-fg-muted transition-colors duration-300 hover:text-fg"
              >
                <Icon className="h-5 w-5" aria-hidden />
              </a>
            ))}
            <a
              href={siteConfig.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              download="Rodrigo_Barbosa_Resume.pdf"
              data-cursor="hover"
              aria-label="Download Resume"
              className="text-fg-muted transition-colors duration-300 hover:text-fg"
            >
              <Download className="h-5 w-5" aria-hidden />
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
