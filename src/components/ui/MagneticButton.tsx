"use client";

import { type ReactNode } from "react";
import { motion } from "framer-motion";
import { useMagnetic } from "@/hooks/useMagnetic";
import { cn } from "@/lib/utils";

type BaseProps = {
  children: ReactNode;
  className?: string;
  variant?: "primary" | "secondary" | "ghost";
  strength?: number;
};

type ButtonAsLink = BaseProps & {
  href: string;
  target?: string;
  rel?: string;
  download?: string | boolean;
  onClick?: never;
};

type ButtonAsButton = BaseProps & {
  href?: never;
  onClick?: () => void;
  type?: "button" | "submit";
};

type MagneticButtonProps = ButtonAsLink | ButtonAsButton;

const variants: Record<NonNullable<BaseProps["variant"]>, string> = {
  primary:
    "bg-fg text-bg hover:shadow-[0_0_40px_-8px_rgba(124,92,255,0.55)] hover:bg-accent-soft",
  secondary:
    "border border-border-strong text-fg bg-transparent hover:border-fg hover:bg-fg/5",
  ghost: "text-fg-muted hover:text-fg",
};

export function MagneticButton(props: MagneticButtonProps) {
  const { children, className, variant = "primary", strength = 0.3 } = props;
  const { ref, x, y, onMouseMove, onMouseLeave } = useMagnetic(strength);

  const baseClass = cn(
    "group relative inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 text-sm font-medium tracking-tight transition-colors duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]",
    variants[variant],
    className,
  );

  const motionProps = {
    style: { x, y },
    onMouseMove,
    onMouseLeave,
    whileTap: { scale: 0.96 },
  };

  if ("href" in props && typeof props.href === "string") {
    return (
      <motion.a
        ref={ref as React.RefObject<HTMLAnchorElement>}
        href={props.href}
        target={props.target}
        rel={props.rel}
        download={props.download}
        data-cursor="hover"
        className={baseClass}
        {...motionProps}
      >
        {children}
      </motion.a>
    );
  }

  return (
    <motion.button
      ref={ref as React.RefObject<HTMLButtonElement>}
      type={props.type ?? "button"}
      onClick={props.onClick}
      data-cursor="hover"
      className={baseClass}
      {...motionProps}
    >
      {children}
    </motion.button>
  );
}
