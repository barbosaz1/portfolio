import { cn } from "@/lib/utils";
import { GlowOrb } from "./GlowOrb";

export function GridNoiseBackground({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={cn("bg-noise bg-grid pointer-events-none absolute inset-0 overflow-hidden", className)}
    >
      <GlowOrb
        color="var(--color-accent)"
        size={620}
        className="-left-32 -top-40"
        animation="float-slow"
      />
      <GlowOrb
        color="var(--color-accent-2)"
        size={480}
        className="-right-24 top-1/3"
        animation="float"
      />
    </div>
  );
}
