import { FaWhatsapp } from "react-icons/fa6";
import { siteConfig } from "@/lib/site-config";
import { MagneticButton } from "./MagneticButton";
import { cn } from "@/lib/utils";

type WhatsAppButtonProps = {
  label?: string;
  message?: string;
  variant?: "primary" | "secondary";
  className?: string;
};

export function WhatsAppButton({
  label = "Chat on WhatsApp",
  message,
  variant = "primary",
  className,
}: WhatsAppButtonProps) {
  return (
    <MagneticButton
      href={siteConfig.whatsapp.href(message)}
      target="_blank"
      rel="noopener noreferrer"
      variant={variant}
      className={cn(className)}
    >
      <FaWhatsapp className="h-4 w-4 text-[var(--color-whatsapp)]" aria-hidden />
      {label}
    </MagneticButton>
  );
}
