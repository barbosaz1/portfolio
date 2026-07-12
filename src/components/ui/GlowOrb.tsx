import { cn } from "@/lib/utils";

type GlowOrbProps = {
  className?: string;
  color?: string;
  size?: number;
  animation?: "float" | "float-slow" | "none";
};

export function GlowOrb({
  className,
  color = "var(--color-accent)",
  size = 480,
  animation = "float-slow",
}: GlowOrbProps) {
  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none absolute rounded-full opacity-30 blur-[100px]",
        animation === "float" && "animate-float",
        animation === "float-slow" && "animate-float-slow",
        className,
      )}
      style={{
        width: size,
        height: size,
        background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
      }}
    />
  );
}
