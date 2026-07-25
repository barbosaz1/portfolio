import { SectionHeading } from "@/components/ui/SectionHeading";

const capabilities = [
  "Website Development",
  "Landing Pages",
  "Dashboards",
  "Web Applications",
  "E-commerce",
  "UI/UX Frontend",
  "Performance Optimization",
  "Technical SEO",
  "Responsive Design",
  "API Integrations",
  "Maintenance",
  "Website Redesign",
];

export function Capabilities() {
  return (
    <section className="relative border-t border-border py-24 md:py-32">
      <div className="container-premium grid grid-cols-1 gap-10 md:grid-cols-[1fr_1.4fr] md:gap-16">
        <SectionHeading kicker="Capabilities" title="What I build." />
        <ul className="grid grid-cols-1 gap-x-10 gap-y-4 sm:grid-cols-2">
          {capabilities.map((item) => (
            <li key={item} className="border-b border-border pb-4 text-lg text-fg-muted">
              {item}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
