"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import type { ArticleMeta } from "@/types/article";

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

type ArticleCardProps = {
  article: ArticleMeta;
  index?: number;
  featured?: boolean;
};

export function ArticleCard({ article, index = 0, featured = false }: ArticleCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: (index % 3) * 0.08 }}
    >
      <Link
        href={`/journal/${article.slug}`}
        data-cursor="hover"
        className={cn(
          "group flex flex-col gap-3 border-t border-border py-8 last:border-b sm:flex-row sm:items-center sm:justify-between sm:gap-8",
          featured && "py-10",
        )}
      >
        <div className="flex-1">
          <div className="flex flex-wrap items-center gap-3 font-mono text-xs uppercase tracking-[0.15em] text-fg-subtle">
            <span>{article.category}</span>
            <span className="h-1 w-1 rounded-full bg-fg-subtle" />
            <span>{formatDate(article.date)}</span>
            <span className="h-1 w-1 rounded-full bg-fg-subtle" />
            <span>{article.readingTime} min read</span>
          </div>
          <h3
            className={cn(
              "mt-3 font-medium text-fg transition-colors duration-300 group-hover:text-accent-soft",
              featured ? "text-3xl md:text-5xl" : "text-2xl md:text-3xl",
            )}
          >
            {article.title}
          </h3>
          <p
            className={cn(
              "mt-2 text-fg-muted",
              featured ? "max-w-2xl text-lg" : "max-w-xl",
            )}
          >
            {article.excerpt}
          </p>
        </div>
        <ArrowUpRight className="h-5 w-5 flex-shrink-0 text-fg-subtle transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-fg" />
      </Link>
    </motion.div>
  );
}
