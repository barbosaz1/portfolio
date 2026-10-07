import type { Metadata } from "next";
import { JournalIndex } from "@/components/journal/JournalIndex";
import { describeTopics } from "@/components/journal/JournalRow";
import { ContactSection } from "@/components/site/ContactSection";
import { SplitChars } from "@/components/ui/Split";
import { getAllArticles } from "@/lib/journal";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Journal",
  description:
    "Writing by Rodrigo Barbosa on security, privacy, hardware and the engineering decisions behind building software.",
  alternates: {
    canonical: `${siteConfig.url}/journal`,
  },
};

export default function JournalPage() {
  const articles = getAllArticles();

  return (
    <main id="main">
      <section data-tone="base" aria-labelledby="journalTitle">
        <header className="page-head">
          <h1 className="page-head__title" id="journalTitle">
            <SplitChars text="Journal" />
          </h1>
          <p className="page-head__intro muted">
            {articles.length} articles on {describeTopics(articles)}. Written while studying,
            building and taking things apart.
          </p>
        </header>
        <JournalIndex articles={articles} />
      </section>
      <ContactSection />
    </main>
  );
}
