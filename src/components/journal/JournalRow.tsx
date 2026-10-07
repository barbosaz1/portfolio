import Link from "next/link";
import type { ArticleMeta } from "@/types/article";

// UTC keeps server and client rendering the same date string.
export function formatArticleDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  });
}

// "security, privacy and hardware" - derived so new categories show up on their own.
export function describeTopics(articles: ArticleMeta[]) {
  const topics = Array.from(new Set(articles.map((a) => a.category.toLowerCase())));
  if (topics.length <= 1) return topics[0] ?? "";
  return `${topics.slice(0, -1).join(", ")} and ${topics[topics.length - 1]}`;
}

export function JournalRow({
  article,
  showExcerpt = false,
}: {
  article: ArticleMeta;
  showExcerpt?: boolean;
}) {
  return (
    <li>
      <Link href={`/journal/${article.slug}`} className="jrow" data-cursor="Read">
        <span className="jrow__date jrow__meta num muted">{formatArticleDate(article.date)}</span>
        <span className="jrow__body">
          <span className="jrow__title">{article.title}</span>
          {showExcerpt && <span className="jrow__excerpt muted">{article.excerpt}</span>}
        </span>
        <span className="jrow__cat jrow__meta">
          {article.category}
          <span className="muted"> · {article.readingTime} min</span>
        </span>
        <span className="jrow__arrow" aria-hidden="true">
          →
        </span>
      </Link>
    </li>
  );
}
