"use client";

import {
  SiNextdotjs,
  SiReact,
  SiTypescript,
  SiTailwindcss,
  SiNodedotjs,
  SiVercel,
  SiGithub,
  SiFigma,
  SiSupabase,
  SiFirebase,
  SiFramer,
  SiGreensock,
} from "react-icons/si";
import { SectionHeading } from "@/components/ui/SectionHeading";

const stack = [
  { icon: SiNextdotjs, label: "Next.js" },
  { icon: SiReact, label: "React" },
  { icon: SiTypescript, label: "TypeScript" },
  { icon: SiTailwindcss, label: "Tailwind CSS" },
  { icon: SiNodedotjs, label: "Node.js" },
  { icon: SiVercel, label: "Vercel" },
  { icon: SiGithub, label: "GitHub" },
  { icon: SiFigma, label: "Figma" },
  { icon: SiSupabase, label: "Supabase" },
  { icon: SiFirebase, label: "Firebase" },
  { icon: SiFramer, label: "Framer Motion" },
  { icon: SiGreensock, label: "GSAP" },
];

export function TechStack() {
  return (
    <section className="relative overflow-hidden border-y border-border py-24 md:py-32">
      <div className="container-premium mb-14">
        <SectionHeading kicker="Tech Stack" title="Tools I build with." />
      </div>

      <div className="group relative flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
        <div className="flex w-max flex-shrink-0 animate-marquee items-center gap-16 pr-16 group-hover:[animation-play-state:paused]">
          {[...stack, ...stack].map(({ icon: Icon, label }, i) => (
            <div
              key={`${label}-${i}`}
              className="flex flex-shrink-0 items-center gap-3 text-fg-muted transition-colors duration-300 hover:text-fg"
            >
              <Icon className="h-7 w-7" aria-hidden />
              <span className="whitespace-nowrap font-mono text-sm">{label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
