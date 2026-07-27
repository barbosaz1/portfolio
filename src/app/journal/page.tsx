import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { FloatingWhatsApp } from "@/components/layout/FloatingWhatsApp";
import { JournalIndex } from "@/components/journal/JournalIndex";
import { getAllArticles } from "@/lib/journal";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Journal",
  description:
    "Writing on software development, frontend engineering, and the craft decisions behind building things well.",
  alternates: {
    canonical: `${siteConfig.url}/journal`,
  },
};

export default function JournalPage() {
  const articles = getAllArticles();

  return (
    <>
      <Header />
      <main>
        <JournalIndex articles={articles} />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </>
  );
}
