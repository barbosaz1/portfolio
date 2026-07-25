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
    detailImages: [
      {
        src: "/images/projects/bela-flor-cleaning/detail-1.png",
        alt: "Bela Flor Cleaning services section with editorial photography and service cards.",
        position: "object-top",
      },
      {
        src: "/images/projects/bela-flor-cleaning/detail-2.png",
        alt: "Bela Flor Cleaning consultation booking screen next to a luxury bathroom photograph.",
        position: "object-left",
      },
    ],
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
    learnings:
      "The biggest lesson from Bela Flor wasn't technical — it was learning to let restraint do the selling. Every instinct says 'add more proof, more copy, more convincing.' The version that actually converts is the one that trusts good photography and confident whitespace to do that work instead.",
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
    detailImages: [
      {
        src: "/images/projects/rb-investimentos/detail-1.png",
        alt: "R&B Investimentos services grid showcasing the four investment offerings with property photography.",
        position: "object-top",
      },
      {
        src: "/images/projects/rb-investimentos/detail-2.png",
        alt: "R&B Investimentos contact section and footer with brand navigation.",
        position: "object-bottom",
      },
    ],
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
    learnings:
      "R&B pushed me to trust scale and negative space as the entire first impression, with almost no supporting photography. It's a useful discipline: when you can't lean on imagery, typography and rhythm have to carry the whole argument on their own.",
  },
  {
    slug: "xubz-theme",
    name: "Xubz Dark",
    category: "Open Source / Developer Tool",
    tagline: "A VS Code theme where every color has a job.",
    summary:
      "A premium dark theme for Visual Studio Code built for long coding sessions — a full design system across the editor, sidebar, terminal, debugger, and Git, where color is used as a semantic signal instead of decoration.",
    liveUrl: "https://github.com/barbosaz1/xubz-theme",
    liveUrlLabel: "View on GitHub",
    coverImage: "/images/projects/xubz-theme/cover.png",
    coverAlt:
      "Xubz Dark theme applied in VS Code, showing syntax-highlighted TypeScript with cyan keywords, green functions, and gold classes.",
    detailImages: [
      {
        src: "/images/projects/xubz-theme/detail-1.png",
        alt: "Xubz Dark theme applied to a Python file, showing decorators, dataclasses, and comments.",
        position: "object-top",
      },
      {
        src: "/images/projects/xubz-theme/detail-2.png",
        alt: "Xubz Dark theme applied to a Rust file, showing macros, lifetimes, and structs.",
        position: "object-top",
      },
    ],
    tech: ["VS Code API", "JSON", "TextMate Grammars", "Design Systems"],
    accent: {
      primary: "#7CF7B8",
      soft: "#CFF9E4",
      bg: "#111418",
    },
    overview:
      "Xubz Dark started from a simple frustration: most dark themes pick a color palette and apply it uniformly, so keywords, types, and errors all fight for the same visual weight. The goal was a theme that behaves like a design system — where color is assigned by semantic importance, not by category alone, and where red is reserved exclusively for real problems (errors, diagnostics, breakpoints) so no keyword or type ever looks broken.",
    objectives: [
      "Build a genuinely distinguishable syntax palette that holds up during 12+ hour sessions",
      "Reserve red exclusively for errors and diagnostics — never for keywords or types",
      "Redesign every VS Code surface (sidebar, tabs, terminal, debugger, Git, IntelliSense) as one coherent system, not just the editor",
    ],
    process: [
      "Defined a semantic color hierarchy first — keywords, functions, classes, types, and constants each got a distinct, reasoned color — before touching a single line of the VS Code theme schema.",
      "Wrote the full workbench color set (550+ keys) and TextMate/semantic token rules by hand, covering TypeScript, Python, Rust, Go, C#, Java, HTML/CSS, and more.",
      "Packaged it as a real VS Code extension with `vsce`, tested it on real multi-language code, and rendered accurate preview screenshots straight from the theme's own color values.",
    ],
    results: [
      "A complete, installable VS Code theme extension published on GitHub with a tagged v1.0.0 release.",
      "A consistent visual system across every VS Code surface, not just editor syntax highlighting.",
      "A documented, reusable color reference other developers can extend or fork.",
    ],
    learnings:
      "Designing a theme forces a different kind of discipline than designing a UI: every decision has to survive being stared at for hours without becoming noise. The hardest part wasn't picking pretty colors — it was saying no to color wherever it didn't carry meaning.",
    ctaHeading: "Curious about this project?",
    ctaBody: "I build tools and interfaces with the same care I put into client websites. Let's talk.",
    ctaButtonLabel: "Chat About This Project",
    ctaMessage: "Hi Rodrigo, I saw the Xubz Dark theme case study and I'd like to talk about a project.",
  },
];

export function getProjectBySlug(slug: string) {
  return projects.find((project) => project.slug === slug);
}
