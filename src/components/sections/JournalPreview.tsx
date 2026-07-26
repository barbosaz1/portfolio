import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ArticleCard } from "@/components/ui/ArticleCard";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { getAllArticles } from "@/lib/journal";

export function JournalPreview() {
  const articles = getAllArticles().slice(0, 3);
  if (articles.length === 0) return null;

  return (
    <section id="journal" className="relative scroll-mt-24 py-28 md:py-36">
      <div className="container-premium">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <SectionHeading
            kicker="Journal"
            title="Notes on building things well."
            className="max-w-xl"
          />
          <Link
            href="/journal"
            data-cursor="hover"
            className="group hidden items-center gap-1.5 text-sm text-fg-muted transition-colors hover:text-fg sm:flex"
          >
            All Articles
            <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="mt-12 flex flex-col">
          {articles.map((article, i) => (
            <ArticleCard key={article.slug} article={article} index={i} featured={i === 0} />
          ))}
        </div>

        <div className="mt-10 flex justify-center sm:hidden">
          <MagneticButton href="/journal" variant="secondary">
            All Articles
          </MagneticButton>
        </div>
      </div>
    </section>
  );
}
