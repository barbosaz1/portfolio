"use client";

import type { ReactNode } from "react";
import { ReactLenis, useLenis } from "lenis/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function SmoothScrollProvider({ children }: { children: ReactNode }) {
  useLenis(() => {
    ScrollTrigger.update();
  });

  return (
    <ReactLenis
      root
      options={{
        lerp: 0.1,
        duration: 1.2,
        smoothWheel: true,
        touchMultiplier: 1.5,
        anchors: { offset: -88 },
      }}
    >
      {children}
    </ReactLenis>
  );
}
