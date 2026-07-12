"use client";

import {
  Code2,
  Rocket,
  LayoutDashboard,
  AppWindow,
  ShoppingCart,
  Palette,
  Gauge,
  Search,
  Smartphone,
  Cable,
  Wrench,
  RefreshCw,
} from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ServiceCard } from "@/components/ui/ServiceCard";

const services = [
  {
    icon: Code2,
    title: "Website Development",
    description: "Custom, production-ready websites built from scratch with modern tooling.",
  },
  {
    icon: Rocket,
    title: "Landing Pages",
    description: "High-converting single pages engineered to turn visitors into leads.",
  },
  {
    icon: LayoutDashboard,
    title: "Dashboards",
    description: "Clear, data-dense interfaces that stay fast and easy to navigate.",
  },
  {
    icon: AppWindow,
    title: "Web Applications",
    description: "Interactive, full-featured apps built with React and modern frameworks.",
  },
  {
    icon: ShoppingCart,
    title: "E-commerce",
    description: "Storefronts designed to convert, from product pages to checkout.",
  },
  {
    icon: Palette,
    title: "UI/UX Frontend",
    description: "Interface design and implementation with obsessive attention to detail.",
  },
  {
    icon: Gauge,
    title: "Performance Optimization",
    description: "Faster loads, smoother interactions, and near-perfect Lighthouse scores.",
  },
  {
    icon: Search,
    title: "Technical SEO",
    description: "Clean markup, metadata, and structure built to be found and indexed.",
  },
  {
    icon: Smartphone,
    title: "Responsive Design",
    description: "Interfaces that feel native on every screen, from mobile to ultrawide.",
  },
  {
    icon: Cable,
    title: "API Integrations",
    description: "Connecting your site to the tools, data, and services it depends on.",
  },
  {
    icon: Wrench,
    title: "Maintenance",
    description: "Ongoing updates, fixes, and improvements after launch.",
  },
  {
    icon: RefreshCw,
    title: "Website Redesign",
    description: "Modernizing an existing site without losing what already works.",
  },
];

export function Services() {
  return (
    <section id="services" className="relative py-28 md:py-36">
      <div className="container-premium">
        <SectionHeading
          kicker="Services"
          title="Everything a modern website needs."
          description="From first line of code to post-launch support — one person, full ownership of the outcome."
        />

        <div className="mt-16 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <ServiceCard key={service.title} index={index} {...service} />
          ))}
        </div>
      </div>
    </section>
  );
}
