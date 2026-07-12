"use client";

import { FaGithub, FaWhatsapp } from "react-icons/fa6";
import { Mail, ArrowUp } from "lucide-react";
import { useLenis } from "lenis/react";
import { siteConfig } from "@/lib/site-config";

const socials = [
  { label: "GitHub", href: siteConfig.social.github, icon: FaGithub },
  { label: "WhatsApp", href: siteConfig.whatsapp.href(), icon: FaWhatsapp },
  { label: "Email", href: siteConfig.emailHref(), icon: Mail },
];

export function Footer() {
  const lenis = useLenis();

  return (
    <footer className="relative border-t border-border">
      <div className="container-premium flex flex-col gap-8 py-10 md:flex-row md:items-center md:justify-between">
        <p className="text-sm text-fg-subtle">
          © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
        </p>

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

          <button
            type="button"
            data-cursor="hover"
            aria-label="Back to top"
            onClick={() => lenis?.scrollTo(0, { duration: 1.4 })}
            className="ml-2 flex h-9 w-9 items-center justify-center rounded-full border border-border-strong text-fg-muted transition-colors duration-300 hover:text-fg"
          >
            <ArrowUp className="h-4 w-4" aria-hidden />
          </button>
        </div>
      </div>
    </footer>
  );
}
