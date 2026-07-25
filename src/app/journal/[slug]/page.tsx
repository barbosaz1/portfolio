import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { compileMDX } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypePrettyCode from "rehype-pretty-code";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { FloatingWhatsApp } from "@/components/layout/FloatingWhatsApp";
import { ArticleCard } from "@/components/ui/ArticleCard";
import { TableOfContents } from "@/components/ui/TableOfContents";
import { GridNoiseBackground } from "@/components/ui/GridNoiseBackground";
import { mdxComponents } from "@/components/journal/mdx-components";
import {
  getAllArticles,
  getArticleBySlug,
  getArticleSource,
  getRelatedArticles,
} from "@/lib/journal";
import { extractToc } from "@/lib/toc";
import { siteConfig } from "@/lib/site-config";
import type { ArticleFrontmatter } from "@/types/article";

export function generateStaticParams() {
  return getAllArticles().map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) return {};

  return {
    title: article.title,
    description: article.excerpt,
    alternates: {
      canonical: `${siteConfig.url}/journal/${slug}`,
    },
    openGraph: {
      type: "article",
      title: article.title,
      description: article.excerpt,
      publishedTime: article.date,
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.excerpt,
    },
  };
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) notFound();

  const source = getArticleSource(slug);
  const toc = extractToc(source);

  const { content } = await compileMDX<ArticleFrontmatter>({
    source,
    options: {
      parseFrontmatter: true,
      mdxOptions: {
        remarkPlugins: [remarkGfm],
        rehypePlugins: [rehypeSlug, [rehypePrettyCode, { theme: "one-dark-pro", keepBackground: false }]],
      },
    },
    components: mdxComponents,
  });

  const related = getRelatedArticles(article);
  const allArticles = getAllArticles();
  const currentIndex = allArticles.findIndex((a) => a.slug === slug);
  const nextArticle = allArticles[(currentIndex + 1) % allArticles.length];

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: article.title,
    description: article.excerpt,
    datePublished: article.date,
    author: { "@type": "Person", name: siteConfig.name, url: siteConfig.url },
    url: `${siteConfig.url}/journal/${slug}`,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <Header />
      <main className="relative">
        <section className="relative overflow-hidden pb-16 pt-32 md:pt-40">
          <GridNoiseBackground />
          <div className="container-premium relative z-10">
            <Link
              href="/journal"
              data-cursor="hover"
              className="inline-flex items-center gap-2 text-sm text-fg-muted transition-colors hover:text-fg"
            >
              <ArrowLeft className="h-4 w-4" />
              Journal
            </Link>

            <div className="mt-8 flex flex-wrap items-center gap-3 font-mono text-xs uppercase tracking-[0.2em] text-fg-subtle">
              <span>{article.category}</span>
              <span className="h-1 w-1 rounded-full bg-fg-subtle" />
              <span>{formatDate(article.date)}</span>
              <span className="h-1 w-1 rounded-full bg-fg-subtle" />
              <span>{article.readingTime} min read</span>
            </div>

            <h1 className="mt-5 max-w-3xl text-4xl font-medium leading-[1.05] tracking-tight text-fg md:text-6xl">
              {article.title}
            </h1>
          </div>
        </section>

        <section className="container-premium pb-24 md:pb-32">
          <div className="grid grid-cols-1 gap-16 lg:grid-cols-[1fr_3fr]">
            {toc.length > 0 && (
              <aside className="hidden lg:block">
                <div className="sticky top-28">
                  <TableOfContents items={toc} />
                </div>
              </aside>
            )}

            <article className="max-w-2xl">{content}</article>
          </div>
        </section>

        {related.length > 0 && (
          <section className="border-t border-border py-24 md:py-32">
            <div className="container-premium">
              <h2 className="font-mono text-sm uppercase tracking-[0.2em] text-fg-subtle">
                Related
              </h2>
              <div className="mt-6 flex flex-col">
                {related.map((relatedArticle, i) => (
                  <ArticleCard key={relatedArticle.slug} article={relatedArticle} index={i} />
                ))}
              </div>
            </div>
          </section>
        )}

        {nextArticle && (
          <Link
            href={`/journal/${nextArticle.slug}`}
            data-cursor="hover"
            className="group relative flex flex-col items-center justify-center gap-4 border-t border-border px-6 py-24 text-center transition-colors hover:bg-bg-elevated/40 md:py-32"
          >
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-fg-subtle">
              Next Article
            </span>
            <span className="max-w-2xl text-3xl font-medium text-fg transition-colors duration-300 group-hover:text-accent-soft md:text-5xl">
              {nextArticle.title}
            </span>
            <ArrowRight className="h-5 w-5 text-fg-subtle transition-transform duration-300 group-hover:translate-x-2" />
          </Link>
        )}
      </main>
      <Footer />
      <FloatingWhatsApp />
    </>
  );
}
