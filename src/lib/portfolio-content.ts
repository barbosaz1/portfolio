// Copy for the home page sections that isn't project or journal data.
// Education, skills and extra projects mirror the résumé in /public/resume.

export type SkillLevel = "core" | "familiar";

export type SkillGroup = {
  category: string;
  items: { name: string; level: SkillLevel }[];
};

export type PathEntry = {
  group: string;
  period: string;
  title: string;
  place: string;
  note?: string;
  href?: string;
};

export const intro = {
  statement:
    "I study Computer Engineering and move comfortably between backend logic and the visual layer around it. I'm drawn equally to code that is correct and interfaces that are considered - every project built from scratch, never assembled from a template.",
  facts: [
    { label: "Studying", value: "BSc Computer Engineering, Universidade Portucalense" },
    { label: "Based in", value: "Portugal, open to relocation" },
    { label: "Focus", value: "Full-stack development, interface design, developer tools" },
    {
      label: "Currently",
      value: "Open to software developer roles - deepening React and Next.js on a Java foundation",
    },
  ],
};

export const skills: SkillGroup[] = [
  {
    category: "Languages",
    items: [
      { name: "Java", level: "core" },
      { name: "TypeScript", level: "core" },
      { name: "JavaScript", level: "core" },
      { name: "Python", level: "core" },
      { name: "SQL & T-SQL", level: "core" },
      { name: "C#", level: "familiar" },
      { name: "Rust", level: "familiar" },
    ],
  },
  {
    category: "Frontend",
    items: [
      { name: "React", level: "core" },
      { name: "Next.js", level: "core" },
      { name: "HTML & CSS", level: "core" },
      { name: "Tailwind CSS", level: "core" },
      { name: "Web Components", level: "familiar" },
      { name: "Three.js & WebGL", level: "familiar" },
      { name: "GSAP", level: "familiar" },
      { name: "Framer Motion", level: "familiar" },
      { name: "Vite", level: "familiar" },
    ],
  },
  {
    category: "Backend & desktop",
    items: [
      { name: "Spring Boot", level: "core" },
      { name: "Node.js", level: "core" },
      { name: "REST APIs", level: "core" },
      { name: "MySQL", level: "core" },
      { name: "JavaFX", level: "familiar" },
      { name: "Electron", level: "familiar" },
      { name: "Maven", level: "familiar" },
    ],
  },
  {
    category: "Design & tools",
    items: [
      { name: "Figma", level: "core" },
      { name: "Git & GitHub", level: "core" },
      { name: "GitHub Actions", level: "familiar" },
      { name: "Vercel", level: "familiar" },
      { name: "Photoshop", level: "familiar" },
      { name: "After Effects", level: "familiar" },
      { name: "Unity", level: "familiar" },
    ],
  },
];

export const path: PathEntry[] = [
  {
    group: "Education",
    period: "In progress",
    title: "BSc Computer Engineering",
    place: "Universidade Portucalense",
  },
  {
    group: "More projects",
    period: "Academic",
    title: "UPT Event Management Portal",
    place: "Java 21, JavaFX, Spring Boot 3, MySQL",
    note: "Four-role platform shipped end-to-end as a desktop client and REST API.",
    href: "https://github.com/barbosaz1/JavaFxClient_Equipa10",
  },
  {
    group: "More projects",
    period: "Open source",
    title: "Cursed Runner",
    place: "Python",
    note: "Five esoteric languages unified behind one interactive CLI.",
    href: "https://github.com/barbosaz1/cursed-calculators",
  },
  {
    group: "Languages",
    period: "Native",
    title: "Portuguese",
    place: "",
  },
  {
    group: "Languages",
    period: "Professional",
    title: "English",
    place: "",
  },
];
