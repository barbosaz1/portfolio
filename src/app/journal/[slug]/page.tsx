import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { compileMDX } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypePrettyCode from "rehype-pretty-code";
import { ContactSection } from "@/components/site/ContactSection";
import { JournalRow, formatArticleDate } from "@/components/journal/JournalRow";
import { TableOfContents } from "@/components/ui/TableOfContents";
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
  const nextArticle =
    allArticles.length > 1 ? allArticles[(currentIndex + 1) % allArticles.length] : null;

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
      <main id="main">
        <article data-tone="base" aria-labelledby="articleTitle">
          <header className="article-head">
            <Link className="pill" href="/journal">
              ← Journal
            </Link>
            <div className="article-head__kicker">
              <span>{article.category}</span>
              <span className="muted num">{formatArticleDate(article.date)}</span>
              <span className="muted">{article.readingTime} min read</span>
            </div>
            <h1 className="article-head__title" id="articleTitle">
              {article.title}
            </h1>
            <p className="article-head__excerpt muted">{article.excerpt}</p>
          </header>

          <div className="article-body">
            <aside className="article-body__toc">
              <TableOfContents items={toc} />
            </aside>
            <div className="article-body__content prose">{content}</div>
          </div>

          {related.length > 0 && (
            <section className="related" aria-labelledby="relatedTitle">
              <h2 className="lbl muted" id="relatedTitle">
                Related
              </h2>
              <ol>
                {related.map((relatedArticle) => (
                  <JournalRow article={relatedArticle} key={relatedArticle.slug} />
                ))}
              </ol>
            </section>
          )}

          {nextArticle && (
            <Link className="next-link" href={`/journal/${nextArticle.slug}`} data-cursor="Read">
              <span className="lbl muted">Next article</span>
              <span className="next-link__title">{nextArticle.title}</span>
            </Link>
          )}
        </article>
        <ContactSection />
      </main>
    </>
  );
}
