import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import readingTime from "reading-time";
import type { ArticleFrontmatter, ArticleMeta } from "@/types/article";

const JOURNAL_DIR = path.join(process.cwd(), "content/journal");

export function getArticleSlugs(): string[] {
  return fs
    .readdirSync(JOURNAL_DIR)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => file.replace(/\.mdx$/, ""));
}

export function getArticleSource(slug: string): string {
  return fs.readFileSync(path.join(JOURNAL_DIR, `${slug}.mdx`), "utf8");
}

export function getArticleMeta(slug: string): ArticleMeta {
  const raw = getArticleSource(slug);
  const { data, content } = matter(raw);
  const frontmatter = data as ArticleFrontmatter;
  const stats = readingTime(content);

  return {
    slug,
    title: frontmatter.title,
    excerpt: frontmatter.excerpt,
    date: frontmatter.date,
    category: frontmatter.category,
    readingTime: Math.max(1, Math.round(stats.minutes)),
  };
}

export function getAllArticles(): ArticleMeta[] {
  return getArticleSlugs()
    .map(getArticleMeta)
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getArticleBySlug(slug: string): ArticleMeta | undefined {
  return getAllArticles().find((article) => article.slug === slug);
}

export function getRelatedArticles(current: ArticleMeta, limit = 2): ArticleMeta[] {
  const others = getAllArticles().filter((article) => article.slug !== current.slug);
  const sameCategory = others.filter((article) => article.category === current.category);
  const rest = others.filter((article) => article.category !== current.category);
  return [...sameCategory, ...rest].slice(0, limit);
}

export function getAllCategories(): string[] {
  const categories = getAllArticles().map((article) => article.category);
  return Array.from(new Set(categories));
}
