import { HomeExperience } from "@/components/home/HomeExperience";
import { projects } from "@/lib/projects-data";
import { getAllArticles } from "@/lib/journal";

export default function Home() {
  return <HomeExperience projects={projects} articles={getAllArticles()} />;
}
