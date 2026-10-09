import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CasePage } from "@/components/case/CasePage";
import { heroImage } from "@/components/case/CaseStudyBody";
import { projects, getProjectBySlug } from "@/lib/projects-data";
import { siteConfig } from "@/lib/site-config";

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return {};
  const share = heroImage(project);

  return {
    title: `${project.name} - Case Study`,
    description: project.summary,
    alternates: {
      canonical: `${siteConfig.url}/work/${project.slug}`,
    },
    openGraph: {
      title: `${project.name} - Case Study | ${siteConfig.name}`,
      description: project.summary,
      images: [{ url: share.src, alt: share.alt }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${project.name} - Case Study`,
      description: project.summary,
      images: [share.src],
    },
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const index = projects.findIndex((p) => p.slug === slug);
  if (index === -1) notFound();
  const project = projects[index];
  const nextProject = projects[(index + 1) % projects.length];

  const projectJsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.name,
    description: project.summary,
    url: `${siteConfig.url}/work/${project.slug}`,
    image: `${siteConfig.url}${heroImage(project).src}`,
    creator: {
      "@type": "Person",
      name: siteConfig.name,
      url: siteConfig.url,
    },
    keywords: project.tech.join(", "),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(projectJsonLd) }}
      />
      <CasePage
        project={project}
        index={index}
        total={projects.length}
        nextProject={nextProject}
      />
    </>
  );
}
