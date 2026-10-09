export type ProjectAccent = {
  primary: string;
  soft: string;
  bg: string;
};

export type ProjectDetailImage = {
  src: string;
  alt: string;
  position?: string;
};

export type Project = {
  slug: string;
  name: string;
  category: string;
  tagline: string;
  summary: string;
  /** Omitted for projects that only run locally. */
  liveUrl?: string;
  coverImage: string;
  coverAlt: string;
  /** Designed banner in the project's own UI; used as the cover where present. */
  banner?: {
    src: string;
    alt: string;
    /** CSS object-position, so the important part survives wide crops. */
    position?: string;
  };
  detailImages: [ProjectDetailImage, ProjectDetailImage];
  tech: string[];
  accent: ProjectAccent;
  overview: string;
  objectives: string[];
  process: string[];
  results: string[];
  learnings: string;
  /** Overrides for projects that aren't a typical web case study (e.g. open-source tools). */
  liveUrlLabel?: string;
  ctaHeading?: string;
  ctaBody?: string;
  ctaButtonLabel?: string;
  ctaMessage?: string;
};
