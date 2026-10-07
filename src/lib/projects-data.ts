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
      "A visual identity that reads as premium and trustworthy at a glance - the core goal behind the project.",
    ],
    learnings:
      "The biggest lesson from Bela Flor wasn't technical - it was learning to let restraint do the selling. Every instinct says 'add more proof, more copy, more convincing.' The version that actually converts is the one that trusts good photography and confident whitespace to do that work instead.",
  },
  {
    slug: "rb-investimentos",
    name: "R&B Investimentos",
    category: "Real Estate & Investment",
    tagline: "Real estate investment with a long-term view.",
    summary:
      "A real estate investment company in Vila do Conde and Póvoa de Varzim, redesigned around two clear paths - investors who want to join operations and owners with a property to propose - under an illustrated dusk skyline of the two towns.",
    liveUrl: "https://rb-investimentos.vercel.app",
    coverImage: "/images/projects/rb-investimentos/cover-2026.png",
    coverAlt:
      "R&B homepage: the serif headline Investimento imobiliário com visão de longo prazo over a cobalt-to-peach dusk illustration of the Vila do Conde and Póvoa de Varzim skyline.",
    detailImages: [
      {
        src: "/images/projects/rb-investimentos/detail-1-2026.png",
        alt: "R&B's illustrated map of Póvoa de Varzim, Vila do Conde, the Rio Ave and the coast, beside the Onde atuamos section.",
        position: "object-left",
      },
      {
        src: "/images/projects/rb-investimentos/detail-2-2026.png",
        alt: "R&B's investor onboarding page, a five-question flow starting with the investor's main objective.",
        position: "object-top",
      },
    ],
    tech: ["HTML", "CSS", "JavaScript (ES modules)", "SVG illustration", "Vercel"],
    accent: {
      primary: "#0F3386",
      soft: "#F4B49A",
      bg: "#0B1F4F",
    },
    overview:
      "R&B identifies, analyses and develops real estate investment opportunities across every parish of Vila do Conde and Póvoa de Varzim. The site has two audiences with opposite needs - people looking to invest, and owners who might have the next opportunity - and it has to earn the trust of both without ever reading like a sales pitch or a listings portal.",
    objectives: [
      "Give investors and property owners each a clear, separate path from the very first screen",
      "Make the brand feel local and specific to the two towns, not like generic real estate stock imagery",
      "Turn joining as an associate and proposing a property into short, guided flows instead of open-ended contact forms",
    ],
    process: [
      "Drew the hero as a dusk illustration of the two towns' skylines in cobalt and peach, paired with a serif headline and a single 'Quero investir' call to action, so the first impression is the place itself.",
      "Structured the homepage around 'Dois caminhos. A mesma exigência.' - one path for investors, one for owners - followed by an illustrated map of where R&B operates and a plain list of what owners will be asked for.",
      "Built the investor onboarding as its own five-question page and the property proposal as an in-page dialog, then added the legal pages and an explicit risk disclaimer an investment site needs.",
      "Kept the stack deliberately small: semantic HTML, hand-written CSS and vanilla ES modules for the header, scroll motion, hero and dialogs, with no framework to ship or maintain.",
    ],
    results: [
      "A live site at rb-investimentos.vercel.app with the homepage, investor onboarding, property proposal flow and privacy, cookie and terms pages.",
      "A visual identity rooted in the two towns, carried from the hero illustration through to the map.",
      "Clear separation between the two audiences, each with its own guided next step.",
    ],
    learnings:
      "The redesign was mostly about subtraction. The earlier version walked visitors through services, process, projects and an FAQ; this one asks a single question - are you here to invest, or do you have a property? - and lets each answer lead somewhere specific. Deciding what not to build mattered more than any individual component.",
  },
  {
    slug: "xubz-theme",
    name: "Xubz Dark",
    category: "Open Source / Developer Tool",
    tagline: "A VS Code theme where every color has a job.",
    summary:
      "A premium dark theme for Visual Studio Code built for long coding sessions - a full design system across the editor, sidebar, terminal, debugger, and Git, where color is used as a semantic signal instead of decoration.",
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
      "Xubz Dark started from a simple frustration: most dark themes pick a color palette and apply it uniformly, so keywords, types, and errors all fight for the same visual weight. The goal was a theme that behaves like a design system - where color is assigned by semantic importance, not by category alone, and where red is reserved exclusively for real problems (errors, diagnostics, breakpoints) so no keyword or type ever looks broken.",
    objectives: [
      "Build a genuinely distinguishable syntax palette that holds up during 12+ hour sessions",
      "Reserve red exclusively for errors and diagnostics - never for keywords or types",
      "Redesign every VS Code surface (sidebar, tabs, terminal, debugger, Git, IntelliSense) as one coherent system, not just the editor",
    ],
    process: [
      "Defined a semantic color hierarchy first - keywords, functions, classes, types, and constants each got a distinct, reasoned color - before touching a single line of the VS Code theme schema.",
      "Wrote the full workbench color set (550+ keys) and TextMate/semantic token rules by hand, covering TypeScript, Python, Rust, Go, C#, Java, HTML/CSS, and more.",
      "Packaged it as a real VS Code extension with `vsce`, tested it on real multi-language code, and rendered accurate preview screenshots straight from the theme's own color values.",
    ],
    results: [
      "A complete, installable VS Code theme extension published on GitHub with a tagged v1.0.0 release.",
      "A consistent visual system across every VS Code surface, not just editor syntax highlighting.",
      "A documented, reusable color reference other developers can extend or fork.",
    ],
    learnings:
      "Designing a theme forces a different kind of discipline than designing a UI: every decision has to survive being stared at for hours without becoming noise. The hardest part wasn't picking pretty colors - it was saying no to color wherever it didn't carry meaning.",
    ctaHeading: "Curious about this project?",
    ctaBody: "I build tools and interfaces with the same care I put into every project. Let's talk.",
    ctaButtonLabel: "Chat About This Project",
    ctaMessage: "Hi Rodrigo, I saw the Xubz Dark theme case study and I'd like to get in touch.",
  },
  {
    slug: "xubz-ui",
    name: "Xubz UI",
    category: "Open Source / Developer Tool",
    tagline: "A 49-component design system built to feel handcrafted, not generated.",
    summary:
      "A framework-agnostic UI kit shipped as native Web Components - one precision-instrument-inspired design language, a live tweakcn-style theme editor, and full documentation, usable from React, Vue, Svelte, PHP, Java, and Rust without a rewrite.",
    liveUrl: "https://xubz-ui.vercel.app/",
    coverImage: "/images/projects/xubz-ui/cover.png",
    coverAlt:
      "The Xubz UI theme editor showing a full color and shape customization panel beside a live grid of components - accordions, tabs, cards, and menus - updating in real time.",
    detailImages: [
      {
        src: "/images/projects/xubz-ui/detail-1.png",
        alt: "A Xubz UI dialog open over a blurred backdrop, confirming a gauge recalibration, showing the system's verdigris accent and signature asymmetric button corner.",
        position: "object-top",
      },
      {
        src: "/images/projects/xubz-ui/detail-2.png",
        alt: "The full Xubz UI component catalog page, showing all 49 components grouped into categories like Layout & Structure and Navigation in a dark-mode sidebar layout.",
        position: "object-top",
      },
    ],
    tech: ["Web Components", "TypeScript", "esbuild", "CSS Custom Properties"],
    accent: {
      primary: "#4FA48F",
      soft: "#C7ECDF",
      bg: "#141815",
    },
    overview:
      "Most AI-assisted design ends up looking the same: rounded gray cards, blue buttons, default Tailwind spacing. Xubz UI started from the opposite brief - invent a genuinely distinct visual language, modeled on precision measuring instruments rather than any existing design system, and prove it could scale to a real, production-shaped component library instead of staying a mood board. It also had to solve a harder problem than most UI kits bother with: working natively across every framework, not just React.",
    objectives: [
      "Invent a visual identity recognizable from a screenshot alone - no rounded-gray-card, blue-button defaults",
      "Cover the full surface of a real component library (49 components) on one consistent token system",
      "Ship it as genuinely framework-agnostic - usable from React, Vue, Svelte, PHP, Java, and Rust without per-framework rewrites",
    ],
    process: [
      "Designed the identity around precision instruments - calipers, dial gauges - before writing a line of component code: a neutral graphite palette, one signal accent color, radius that follows hierarchy instead of a single rounded default, and a 'settle' motion language instead of generic easing.",
      "Built the whole library as native Web Components (Custom Elements + Shadow DOM) rather than React components, so the same package works unmodified in any framework or backend that renders HTML - including PHP and Java template engines and Rust frontends like Dioxus and Leptos.",
      "Wrote all 49 components - forms, overlays, navigation, data display - on one shared token system, then built a live theme editor so every color, radius, and motion value is customizable and exportable as CSS, the same way tools like tweakcn work for shadcn/ui.",
    ],
    results: [
      "A complete, installable component package (`@xubz/elements`) covering every category a real product needs: forms, dialogs, menus, data tables, calendars, charts, and more.",
      "A documentation site with live, working examples of all 49 components and a full theme customizer, not static screenshots.",
      "A design language that reads as its own thing - verified by building it out fully rather than stopping at a handful of demo components.",
    ],
    learnings:
      "The hardest part wasn't inventing a color palette - it was making 49 components feel like they came from the same hand under real interaction, not just in static screenshots. Hover states, press feedback, and motion timing needed as much deliberate design as the color system itself; skipping them is exactly what makes generated-feeling UI feel generated.",
    ctaHeading: "Curious about this project?",
    ctaBody: "I design and build interfaces and tools with the same care I put into every project. Let's talk.",
    ctaButtonLabel: "Chat About This Project",
    ctaMessage: "Hi Rodrigo, I saw the Xubz UI project and I'd like to get in touch.",
  },
  {
    slug: "xiux",
    name: "xiux",
    category: "Open Source / Developer Tool",
    tagline: "Neovim, reimagined as a native IDE.",
    summary:
      "A from-scratch native IDE built on the idea of what Neovim would look like designed today: a real modal Vim engine, GPU-rendered text, and a first-class customization system, with no Electron and no browser engine anywhere in the stack.",
    liveUrl: "https://github.com/barbosaz1/xiux-ide",
    liveUrlLabel: "View on GitHub",
    coverImage: "/images/projects/xiux/cover.png",
    coverAlt:
      "xiux IDE showing its file explorer sidebar and a Rust source file with live syntax highlighting for keywords, types, and functions.",
    detailImages: [
      {
        src: "/images/projects/xiux/detail-1.png",
        alt: "The xiux Marketplace panel showing a scrollable gallery of over fifty built-in color themes with live Apply buttons.",
        position: "object-top",
      },
      {
        src: "/images/projects/xiux/detail-2.png",
        alt: "The xiux editor with a different built-in theme applied, showing the same Rust code re-colored instantly.",
        position: "object-top",
      },
    ],
    tech: ["Rust", "wgpu", "egui/eframe", "ropey", "GitHub Actions"],
    accent: {
      primary: "#7AA2F7",
      soft: "#C9D9FB",
      bg: "#11121a",
    },
    overview:
      "xiux is a personal, no-shortcuts attempt at answering a specific question: what would Neovim look like if someone designed it today, with modern rendering and zero legacy baggage, instead of cloning it feature-for-feature? That meant a real modal editing engine - not a syntax-highlighted text box with a few keybindings bolted on - a GPU-rendered viewport-culled text view instead of a webview, and a customization system deep enough that changing the whole feel of the editor is a two-click action, not a config-file archaeology project.",
    objectives: [
      "Implement a genuinely correct Vim modal engine - motions, operators, text objects, registers, macros, dot-repeat - not a shallow imitation",
      "Render everything on the GPU with a custom, viewport-culled text view so performance holds up regardless of file size",
      "Build a customization system deep enough to cover themes, fonts, cursor behavior, and layout without ever touching a config file by hand",
      "Prove it actually builds and runs natively on both Windows and macOS, not just on the machine it was written on",
    ],
    process: [
      "Built the editing engine first, in complete isolation from any UI: a rope-backed buffer, a recursive-descent parser for Normal-mode command sequences, and every motion/operator/text-object combination, so the modal logic could be reasoned about (and would keep working) independently of how it's eventually rendered.",
      "Wrote a custom, GPU-accelerated editor view on wgpu/egui that only ever lays out the visible rows, plus a from-scratch multi-language syntax highlighter and a keyword-and-buffer-based autocomplete engine, since there's no LSP yet to lean on.",
      "Layered on the parts that make an editor feel like a real tool day to day: an integrated terminal, a local live-preview server for web projects, a Git panel wired to the system's own git binary, and a Marketplace panel with over fifty built-in themes plus live font and cursor customization.",
      "Set up a Windows + macOS build matrix in GitHub Actions so 'it builds cross-platform' is a verified fact, not a claim - every push is compiled and tested on both operating systems on real runners.",
    ],
    results: [
      "A real, working native IDE: modal editing, GPU-rendered syntax highlighting, an integrated terminal, Git integration, and a 50+ theme gallery, all functioning end-to-end.",
      "A green CI matrix building and testing the full workspace on both windows-latest and macos-latest for every change.",
      "A codebase and README that are explicit about what's genuinely finished versus what's deliberately scoped out (LSP-based completion, a plugin runtime, DAP debugging) - the roadmap is the honest next-steps list, not marketing copy.",
    ],
    learnings:
      "The hardest part wasn't the Vim engine - it was resisting the pull to fake progress. It would have been easy to hardcode a few keybindings and call it 'Vim-like,' or ship a debugger panel that doesn't actually debug anything. The rule that kept the project honest was simple: if a feature isn't real yet, the UI has to say so in plain language instead of pretending. That constraint slowed some things down and made the whole thing more trustworthy to build on.",
    ctaHeading: "Curious about this project?",
    ctaBody: "I build tools and interfaces with the same care I put into every project. Let's talk.",
    ctaButtonLabel: "Chat About This Project",
    ctaMessage: "Hi Rodrigo, I saw the xiux IDE project and I'd like to get in touch.",
  },
  {
    slug: "vespera",
    name: "Véspera",
    category: "Interactive 3D Experience",
    tagline: "The hour before dark.",
    summary:
      "A scroll-driven WebGL story for a concept Dão wine brand: one continuous camera move from the granite hills, into a single grape, through the cellar and the bottle, and out into the night - every 3D object generated in code.",
    coverImage: "/images/projects/vespera/cover.jpg",
    coverAlt:
      "Véspera's hero moment: a black bottle of Lume 2021 on a podium, drawn in white ink lines against a sunburst, in the experience's line-art style.",
    detailImages: [
      {
        src: "/images/projects/vespera/detail-1.jpg",
        alt: "The final act of Véspera: the bottle on a granite slab at night, the vineyard rows and terrain rendered as white ink hatching.",
        position: "object-top",
      },
      {
        src: "/images/projects/vespera/detail-2.png",
        alt: "Véspera's Collection page, listing the three wines Lume, Sereno and Breu in large serif type on black.",
        position: "object-left",
      },
    ],
    tech: ["Next.js", "React Three Fiber", "Three.js", "GLSL shaders", "GSAP", "Lenis", "Zustand"],
    accent: {
      primary: "#D9482B",
      soft: "#ECE5D8",
      bg: "#070605",
    },
    overview:
      "Véspera is a fictional wine from the granite hills of Dão, built around one idea - the hour before dark - and three wines named after hours of the same day. Instead of a product page, the site is a single camera journey through nine acts: the land, the vine, the inside of a grape, the cellar, the bottle, the pour, the landscape, tasting, and the night. It's a personal project that runs locally, made to push how far a web page can go as a piece of storytelling.",
    objectives: [
      "Tell the whole story - land to grape to cellar to glass - as one continuous camera path instead of stacked sections",
      "Generate every 3D object in code, with no downloaded models or textures, so the experience loads instantly",
      "Keep the story fully readable without WebGL, and degrade gracefully on weaker hardware and for reduced-motion users",
    ],
    process: [
      "Wrote the concept, storyboard, 3D system, design system and art direction as five documents before building anything, so every act had a reason to exist and a defined hero moment.",
      "Built the worlds procedurally: a lathe-generated bottle with a physically based glass material and a canvas-drawn label, a shader-driven terrain, instanced vine leaves and barrels, and a custom shader for the wine pool.",
      "Drove the camera along one spline tied to scroll with GSAP and Lenis, and hid each jump in scale - landscape to grape to barrel grain - behind a noisy liquid dissolve.",
      "Added three quality tiers (full, optimized and a static no-WebGL version), live frame-rate monitoring, culling of off-screen worlds, and a fixed light count so shaders never recompile mid-scroll.",
    ],
    results: [
      "A working local build with all nine acts, plus About, Wine, Cellar, Collection and Contact pages.",
      "Zero binary 3D assets: the bottle, terrain, cellar, leaves and liquid are all generated at runtime.",
      "A consistent ink-drawing art direction across the 3D scenes and the editorial pages.",
    ],
    learnings:
      "The hardest problems were invisible ones. Adding or removing a single light makes WebGL recompile every shader and the scroll stutters, so the light count had to stay fixed and every mood change became an animation of existing lights. Performance work stopped being a final pass and became part of the art direction.",
    ctaHeading: "Want to see it running?",
    ctaBody: "Véspera only runs locally for now - I'm happy to walk you through it live.",
    ctaButtonLabel: "Ask for a walkthrough",
    ctaMessage: "Hi Rodrigo, I saw the Véspera project on your portfolio and I'd like to see it running.",
  },
];

export function getProjectBySlug(slug: string) {
  return projects.find((project) => project.slug === slug);
}
