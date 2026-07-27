import { Download } from "lucide-react";
import { siteConfig } from "@/lib/site-config";
import { MagneticButton } from "./MagneticButton";
import { cn } from "@/lib/utils";

type ResumeButtonProps = {
  label?: string;
  variant?: "primary" | "secondary";
  className?: string;
};

export function ResumeButton({
  label = "Resume",
  variant = "secondary",
  className,
}: ResumeButtonProps) {
  return (
    <MagneticButton
      href={siteConfig.resumeUrl}
      target="_blank"
      rel="noopener noreferrer"
      download="Rodrigo_Barbosa_Resume.pdf"
      variant={variant}
      className={cn(className)}
    >
      <Download className="h-4 w-4" aria-hidden />
      {label}
    </MagneticButton>
  );
}
