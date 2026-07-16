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
  liveUrl: string;
  coverImage: string;
  coverAlt: string;
  detailImages: [ProjectDetailImage, ProjectDetailImage];
  tech: string[];
  accent: ProjectAccent;
  overview: string;
  objectives: string[];
  process: string[];
  results: string[];
};
