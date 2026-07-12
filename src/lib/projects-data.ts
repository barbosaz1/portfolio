import type { Project } from "@/types/project";

export const projects: Project[] = [
  {
    slug: "bela-flor-cleaning",
    name: "Bela Flor Cleaning",
    category: "Local Service Business",
    tagline: "Elegance in every detail.",
    summary:
      "A boutique home cleaning brand serving Cape Cod, reimagined as a warm, editorial website that feels as considered as the homes it cares for.",
    liveUrl: "https://belaflorcleaning.com",
    coverImage: "/images/projects/bela-flor-cleaning/cover.png",
    coverAlt:
      "Bela Flor Cleaning homepage showing a softly lit living room with the headline Elegance in every detail.",
    tech: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "Vercel"],
    accent: {
      primary: "#D98C73",
      soft: "#F1D9CE",
      bg: "#18120f",
    },
    overview:
      "Bela Flor is a boutique home cleaning service on Cape Cod that wanted to be perceived the way it operates: meticulous, high-touch, and a step above the generic local-service competition. The brief was to design and build a site that could justify a premium position in the market purely through the quality of the experience.",
    objectives: [
      "Position the brand above typical local cleaning-service competitors",
      "Make requesting a quote effortless on any device",
      "Reflect the meticulous, high-touch nature of the service through the design itself",
    ],
    process: [
      "Studied the brand's boutique positioning and the Cape Cod market it serves, then built a visual language around soft light, generous whitespace, and editorial typography instead of the stock-photo grids common in the industry.",
      "Structured the site around Philosophy, Services, and Experience so visitors understand the brand's value before they ever see a price.",
      "Built the front end in Next.js with Tailwind CSS and Framer Motion for a fast, smooth-scrolling experience, then optimized every image and font for a clean load on mobile.",
    ],
    results: [
      "A live, production website at belaflorcleaning.com representing the brand across desktop and mobile.",
      "A clear, low-friction path from homepage to quote request.",
      "A visual identity that reads as premium and trustworthy at a glance — the core goal behind the project.",
    ],
  },
  {
    slug: "rb-investimentos",
    name: "R&B Investimentos",
    category: "Real Estate & Investment",
    tagline: "Assets that appreciate with vision and rigor.",
    summary:
      "A real estate investment and renovation company that acquires, restores, and builds homes — presented through a bold, dark, confidence-driven interface built to earn trust from investors and buyers alike.",
    liveUrl: "https://r-b-ebon.vercel.app",
    coverImage: "/images/projects/rb-investimentos/cover.png",
    coverAlt:
      "R&B Investimentos homepage with a large R&B logotype on a dark background and the headline Assets that appreciate with vision and rigor.",
    tech: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "Vercel"],
    accent: {
      primary: "#4C86F7",
      soft: "#BBD3FF",
      bg: "#0a0f1c",
    },
    overview:
      "R&B Investimentos invests in, restores, and builds homes that appreciate over time. The company needed a digital presence that communicates financial credibility and long-term vision to investors and prospective clients — not another templated real-estate listings site.",
    objectives: [
      "Communicate financial credibility and long-term vision, not just property listings",
      "Give the brand a bold, confident identity built around large-scale typography",
      "Structure the information so serious inquiries are easy for both investors and homeowners to make",
    ],
    process: [
      "Translated the company's positioning — assets that appreciate with vision and rigor — into a dark, high-contrast interface where oversized type and negative space carry the brand instead of stock property photography.",
      "Organized the site around Who We Are, Services, Process, Projects, and FAQ so both investors and homeowners can find what they need quickly.",
      "Built with Next.js and Tailwind CSS for performance, and deployed on Vercel for fast, reliable delivery.",
    ],
    results: [
      "A live website at r-b-ebon.vercel.app representing the company's full offering.",
      "A distinct, memorable visual identity that stands apart from typical real-estate sites.",
      "A structure built to scale as the company adds more projects and case studies over time.",
    ],
  },
];

export function getProjectBySlug(slug: string) {
  return projects.find((project) => project.slug === slug);
}
