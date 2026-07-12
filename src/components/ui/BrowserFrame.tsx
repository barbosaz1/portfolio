import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type BrowserFrameProps = {
  children: ReactNode;
  url?: string;
  className?: string;
};

export function BrowserFrame({ children, url, className }: BrowserFrameProps) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-2xl border border-border-strong bg-bg-elevated-2 shadow-2xl shadow-black/40",
        className,
      )}
    >
      <div className="flex items-center gap-2 border-b border-border bg-bg-elevated px-4 py-3">
        <span className="h-2.5 w-2.5 rounded-full bg-fg-subtle/30" />
        <span className="h-2.5 w-2.5 rounded-full bg-fg-subtle/30" />
        <span className="h-2.5 w-2.5 rounded-full bg-fg-subtle/30" />
        {url && (
          <span className="ml-3 truncate rounded-full bg-bg px-3 py-1 font-mono text-[11px] text-fg-subtle">
            {url}
          </span>
        )}
      </div>
      <div className="relative">{children}</div>
    </div>
  );
}
