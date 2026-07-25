"use client";

import { useMemo, useState } from "react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ArticleCard } from "@/components/ui/ArticleCard";
import { GridNoiseBackground } from "@/components/ui/GridNoiseBackground";
import { cn } from "@/lib/utils";
import type { ArticleMeta } from "@/types/article";

export function JournalIndex({ articles }: { articles: ArticleMeta[] }) {
  const categories = useMemo(
    () => ["All", ...Array.from(new Set(articles.map((a) => a.category)))],
    [articles],
  );
  const [active, setActive] = useState("All");

  const filtered =
    active === "All" ? articles : articles.filter((a) => a.category === active);

  return (
    <section className="relative pb-28 pt-32 md:pb-36 md:pt-40">
      <GridNoiseBackground />

      <div className="container-premium relative z-10">
        <SectionHeading
          kicker="Journal"
          title="Notes on building things well."
          description="Writing on frontend engineering, design systems, and the craft decisions that don't usually make it into a case study."
        />

        <div className="mt-10 flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              data-cursor="hover"
              onClick={() => setActive(category)}
              className={cn(
                "rounded-full border px-4 py-2 font-mono text-xs uppercase tracking-[0.1em] transition-colors duration-300",
                active === category
                  ? "border-fg bg-fg text-bg"
                  : "border-border-strong text-fg-muted hover:border-fg hover:text-fg",
              )}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="mt-8 flex flex-col">
          {filtered.map((article, i) => (
            <ArticleCard key={article.slug} article={article} index={i} featured={i === 0} />
          ))}

          {filtered.length === 0 && (
            <p className="border-t border-border py-16 text-center text-fg-muted">
              No articles in this category yet.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
