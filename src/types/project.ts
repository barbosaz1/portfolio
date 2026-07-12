export type ProjectAccent = {
  primary: string;
  soft: string;
  bg: string;
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
  tech: string[];
  accent: ProjectAccent;
  overview: string;
  objectives: string[];
  process: string[];
  results: string[];
};
