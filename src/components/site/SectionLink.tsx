"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSiteUI } from "@/components/site/SiteShell";

type SectionLinkProps = Omit<React.ComponentProps<typeof Link>, "href"> & {
  section: string;
};

// Links to a home-page section. On the home page it scrolls smoothly in place;
// anywhere else it navigates to /#section.
export function SectionLink({ section, onClick, ...rest }: SectionLinkProps) {
  const pathname = usePathname();
  const { scrollToSection } = useSiteUI();

  return (
    <Link
      {...rest}
      href={section === "top" ? "/" : `/#${section}`}
      onClick={(e) => {
        onClick?.(e);
        if (pathname === "/" && !e.defaultPrevented) {
          e.preventDefault();
          scrollToSection(section);
        }
      }}
    />
  );
}
