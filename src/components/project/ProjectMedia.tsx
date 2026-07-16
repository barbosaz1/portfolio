"use client";

import { useState, type ReactNode } from "react";
import Image from "next/image";
import { Maximize2 } from "lucide-react";
import { BrowserFrame } from "@/components/ui/BrowserFrame";
import { Lightbox, type LightboxImage } from "@/components/ui/Lightbox";
import type { ProjectDetailImage } from "@/types/project";

type ProjectMediaProps = {
  coverImage: string;
  coverAlt: string;
  liveHost: string;
  detailImages: [ProjectDetailImage, ProjectDetailImage];
  children: ReactNode;
};

export function ProjectMedia({
  coverImage,
  coverAlt,
  liveHost,
  detailImages,
  children,
}: ProjectMediaProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const images: LightboxImage[] = [
    { src: coverImage, alt: coverAlt },
    ...detailImages.map((detail) => ({ src: detail.src, alt: detail.alt })),
  ];

  return (
    <>
      <section className="container-premium">
        <button
          type="button"
          data-cursor="hover"
          onClick={() => setActiveIndex(0)}
          aria-label={`View larger: ${coverAlt}`}
          className="group relative mx-auto block w-full max-w-5xl text-left"
        >
          <BrowserFrame url={liveHost}>
            <div className="relative aspect-[1200/798] w-full">
              <Image
                src={coverImage}
                alt={coverAlt}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 1024px"
                className="object-cover object-top transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.02]"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-bg/0 opacity-0 transition-all duration-300 group-hover:bg-bg/30 group-hover:opacity-100">
                <span className="flex items-center gap-2 rounded-full bg-fg px-4 py-2 text-xs font-medium text-bg">
                  <Maximize2 className="h-3.5 w-3.5" />
                  View Larger
                </span>
              </div>
            </div>
          </BrowserFrame>
        </button>
      </section>

      {children}

      <section className="container-premium pb-24 md:pb-32">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {detailImages.map((detail, i) => (
            <button
              key={detail.src}
              type="button"
              data-cursor="hover"
              onClick={() => setActiveIndex(i + 1)}
              aria-label={`View larger: ${detail.alt}`}
              className="group relative aspect-[4/3] overflow-hidden rounded-2xl border border-border-strong text-left"
            >
              <Image
                src={detail.src}
                alt={detail.alt}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className={`object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.05] ${detail.position ?? "object-center"}`}
              />
              <div className="absolute inset-0 flex items-center justify-center bg-bg/0 opacity-0 transition-all duration-300 group-hover:bg-bg/30 group-hover:opacity-100">
                <span className="flex items-center gap-2 rounded-full bg-fg px-4 py-2 text-xs font-medium text-bg">
                  <Maximize2 className="h-3.5 w-3.5" />
                  View Larger
                </span>
              </div>
            </button>
          ))}
        </div>
      </section>

      <Lightbox
        images={images}
        index={activeIndex}
        onClose={() => setActiveIndex(null)}
        onNavigate={setActiveIndex}
      />
    </>
  );
}
