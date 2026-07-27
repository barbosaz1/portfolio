"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import gsap from "gsap";
import { RevealText } from "@/components/ui/RevealText";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { EmailButton } from "@/components/ui/EmailButton";
import { GridNoiseBackground } from "@/components/ui/GridNoiseBackground";
import { GlowOrb } from "@/components/ui/GlowOrb";

const fadeUp = {
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0 },
};

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const portraitRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const portrait = portraitRef.current;
    if (!section || !portrait) return;

    gsap.set(portrait, { x: 0, y: 0, rotation: 0 });

    const handleMove = (e: PointerEvent) => {
      const rect = section.getBoundingClientRect();
      const relX = (e.clientX - rect.left) / rect.width - 0.5;
      const relY = (e.clientY - rect.top) / rect.height - 0.5;
      gsap.to(portrait, {
        x: relX * 26,
        y: relY * 20,
        rotation: relX * 2.5,
        duration: 1.1,
        ease: "power3.out",
        overwrite: "auto",
      });
    };

    section.addEventListener("pointermove", handleMove);
    return () => section.removeEventListener("pointermove", handleMove);
  }, []);

  return (
    <section
      id="top"
      ref={sectionRef}
      className="relative flex min-h-[100svh] items-center overflow-hidden pt-28 pb-20"
    >
      <GridNoiseBackground />

      <div className="container-premium relative z-10 grid grid-cols-1 items-center gap-16 lg:grid-cols-[1.1fr_0.9fr] lg:gap-8">
        <div>
          <motion.div
            {...fadeUp}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            className="mb-6 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.2em] text-fg-subtle"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            Software Developer
          </motion.div>

          <h1 className="text-[13vw] font-medium leading-[0.98] tracking-tight sm:text-6xl md:text-7xl lg:text-[5.2rem]">
            <RevealText text="Rodrigo Barbosa" as="span" className="block text-fg" delay={0.25} />
            <RevealText
              text="Software Developer."
              as="span"
              className="font-display block italic text-accent-soft"
              delay={0.55}
            />
          </h1>

          <motion.p
            {...fadeUp}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 1.1 }}
            className="mt-7 max-w-xl text-lg text-fg md:text-xl"
          >
            I build software with the same care most people only spend on the parts you can see.
          </motion.p>

          <motion.p
            {...fadeUp}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 1.25 }}
            className="mt-4 max-w-lg text-balance text-fg-muted"
          >
            Right now that shows up as fast, considered websites — but the same standard carries
            into everything else I build, developer tools included.
          </motion.p>

          <motion.div
            {...fadeUp}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 1.45 }}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <MagneticButton href="#work" variant="primary">
              View Work
            </MagneticButton>
            <WhatsAppButton label="Chat on WhatsApp" variant="secondary" />
            <EmailButton label="Send Email" variant="secondary" />
          </motion.div>
        </div>

        <div className="relative mx-auto w-full max-w-sm lg:max-w-none">
          <div ref={portraitRef} className="relative mx-auto aspect-[4/5] w-full max-w-sm">
            <GlowOrb
              color="var(--color-accent)"
              size={420}
              animation="float-slow"
              className="left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
            />
            <GlowOrb
              color="var(--color-accent-2)"
              size={260}
              animation="float"
              className="-right-10 bottom-0"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
              className="relative h-full w-full"
            >
              <div className="absolute inset-6 rounded-[2.5rem] border border-border-strong/60 backdrop-blur-[1px]" />
              <Image
                src="/images/rodrigo-barbosa.png"
                alt="Portrait of Rodrigo Barbosa, Software Developer"
                fill
                priority
                sizes="(max-width: 1024px) 60vw, 32vw"
                className="object-contain object-bottom drop-shadow-[0_30px_60px_rgba(0,0,0,0.55)]"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.6, ease: [0.16, 1, 0.3, 1] }}
              className="absolute -left-4 bottom-6 flex items-center gap-2 rounded-full border border-border-strong bg-bg-elevated/80 px-4 py-2 text-xs text-fg backdrop-blur-md md:-left-8"
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent-2 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-accent-2" />
              </span>
              Available for new projects
            </motion.div>
          </div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 1.9 }}
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-fg-subtle md:flex"
      >
        <span className="font-mono text-[10px] uppercase tracking-[0.3em]">Scroll</span>
        <span className="h-10 w-px overflow-hidden bg-border-strong">
          <motion.span
            className="block h-full w-full bg-accent"
            animate={{ y: ["-100%", "100%"] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          />
        </span>
      </motion.div>
    </section>
  );
}
