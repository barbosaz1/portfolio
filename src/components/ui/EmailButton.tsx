import { Mail } from "lucide-react";
import { siteConfig } from "@/lib/site-config";
import { MagneticButton } from "./MagneticButton";
import { cn } from "@/lib/utils";

type EmailButtonProps = {
  label?: string;
  subject?: string;
  variant?: "primary" | "secondary";
  className?: string;
};

export function EmailButton({
  label = "Email",
  subject,
  variant = "secondary",
  className,
}: EmailButtonProps) {
  return (
    <MagneticButton href={siteConfig.emailHref(subject)} variant={variant} className={cn(className)}>
      <Mail className="h-4 w-4" aria-hidden />
      {label}
    </MagneticButton>
  );
}
