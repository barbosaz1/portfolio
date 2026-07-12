import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { projects } from "@/lib/projects-data";

export function Projects() {
  return (
    <section id="projects" className="relative py-28 md:py-36">
      <div className="container-premium">
        <SectionHeading
          kicker="Selected Work"
          title="Two projects. Zero shortcuts."
          description="Every site here was designed and built end-to-end — from first concept to the version that's live today."
        />

        <div className="mt-16 grid grid-cols-1 gap-16 lg:grid-cols-2 lg:gap-x-10 lg:gap-y-0">
          {projects.map((project, index) => (
            <ProjectCard key={project.slug} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
