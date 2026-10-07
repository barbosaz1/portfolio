"use client";

import { useMemo, useState } from "react";
import { JournalRow } from "@/components/journal/JournalRow";
import { cn } from "@/lib/utils";
import type { ArticleMeta } from "@/types/article";

export function JournalIndex({ articles }: { articles: ArticleMeta[] }) {
  const categories = useMemo(
    () => ["All", ...Array.from(new Set(articles.map((a) => a.category)))],
    [articles],
  );
  const [active, setActive] = useState("All");
  const filtered = active === "All" ? articles : articles.filter((a) => a.category === active);

  return (
    <>
      <div className="filters" role="group" aria-label="Filter by category">
        {categories.map((category) => (
          <button
            key={category}
            type="button"
            aria-pressed={active === category}
            className={cn("pill", active === category && "is-active")}
            onClick={() => setActive(category)}
          >
            {category}
          </button>
        ))}
      </div>
      <ol className="jlist">
        {filtered.map((article) => (
          <JournalRow article={article} key={article.slug} showExcerpt />
        ))}
        {filtered.length === 0 && (
          <li className="jlist__empty muted">No articles in this category yet.</li>
        )}
      </ol>
    </>
  );
}
