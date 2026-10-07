import type { Metadata, Viewport } from "next";
import { Archivo } from "next/font/google";
import "./globals.css";
import { siteConfig } from "@/lib/site-config";
import { projects } from "@/lib/projects-data";
import { SiteShell } from "@/components/site/SiteShell";

const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin", "latin-ext"],
  axes: ["wdth"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.title,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  alternates: {
    canonical: siteConfig.url,
  },
  keywords: [
    "Rodrigo Barbosa",
    "Software Developer",
    "Software Engineer",
    "Computer Engineering",
    "Java Developer",
    "Next.js Developer",
    "React Developer",
    "Portfolio",
  ],
  authors: [{ name: siteConfig.name, url: siteConfig.url }],
  creator: siteConfig.name,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    title: siteConfig.title,
    description: siteConfig.description,
    siteName: siteConfig.title,
    images: [{ url: siteConfig.ogImage, width: 1200, height: 630, alt: siteConfig.title }],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  // Icons come from src/app/icon.svg, favicon.ico and apple-icon.png.
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#e4e6e0" },
    { media: "(prefers-color-scheme: dark)", color: "#1b1e23" },
  ],
};

// Runs before first paint. Marks JS + motion support on <html> so the hero can
// start in its pre-entrance state, skips the loader on repeat visits, and adds
// a failsafe: if the page script never reports in, hidden content is restored.
const bootScript = `(function(){var h=document.documentElement;h.classList.add('js');try{if(matchMedia('(prefers-reduced-motion: no-preference)').matches)h.classList.add('motion');else h.classList.add('rb-skip-loader');if(sessionStorage.getItem('rb-visited')||/^#case\\//.test(location.hash))h.classList.add('rb-skip-loader');}catch(e){h.classList.add('rb-skip-loader');}setTimeout(function(){if(!h.classList.contains('rb-ready'))h.classList.add('rb-fail');},9000);})();`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const personJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: siteConfig.name,
    url: siteConfig.url,
    jobTitle: siteConfig.role,
    email: siteConfig.email,
    image: `${siteConfig.url}${siteConfig.portrait}`,
    sameAs: [siteConfig.social.github],
    alumniOf: { "@type": "CollegeOrUniversity", name: "Universidade Portucalense" },
    knowsAbout: [
      "Software Development",
      "Java",
      "Spring Boot",
      "TypeScript",
      "React",
      "Next.js",
      "Interface Design",
    ],
  };

  const overviewProjects = projects.map((p) => ({
    slug: p.slug,
    name: p.name,
    tech: p.tech,
  }));

  return (
    <html lang="en" className={archivo.variable} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: bootScript }} />
      </head>
      <body data-tone="base">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <a className="skip" href="#main">
          Skip to content
        </a>
        <SiteShell projects={overviewProjects}>{children}</SiteShell>
      </body>
    </html>
  );
}
