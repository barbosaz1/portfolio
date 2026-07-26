"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, RotateCcw, X, ZoomIn, ZoomOut } from "lucide-react";
import { cn } from "@/lib/utils";

export type LightboxImage = {
  src: string;
  alt: string;
};

type LightboxProps = {
  images: LightboxImage[];
  index: number | null;
  onClose: () => void;
  onNavigate: (index: number) => void;
};

const MIN_SCALE = 1;
const MAX_SCALE = 4;

export function Lightbox({ images, index, onClose, onNavigate }: LightboxProps) {
  const isOpen = index !== null;
  const image = images[index ?? 0];

  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDraggingUI, setIsDraggingUI] = useState(false);
  const [trackedSrc, setTrackedSrc] = useState(image?.src);
  const dragState = useRef({ dragging: false, startX: 0, startY: 0, originX: 0, originY: 0 });

  // Reset zoom/pan whenever the active image changes (React-recommended
  // "adjust state during render" pattern instead of an effect).
  if (image && image.src !== trackedSrc) {
    setTrackedSrc(image.src);
    setScale(1);
    setPosition({ x: 0, y: 0 });
  }

  const resetView = () => {
    setScale(1);
    setPosition({ x: 0, y: 0 });
  };

  useEffect(() => {
    if (!isOpen) return;

    document.body.style.overflow = "hidden";

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight" && images.length > 1) onNavigate((index! + 1) % images.length);
      if (e.key === "ArrowLeft" && images.length > 1)
        onNavigate((index! - 1 + images.length) % images.length);
      if (e.key === "+" || e.key === "=") setScale((s) => Math.min(MAX_SCALE, s + 0.5));
      if (e.key === "-") setScale((s) => Math.max(MIN_SCALE, s - 0.5));
    };
    window.addEventListener("keydown", handleKey);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKey);
    };
  }, [isOpen, index, images.length, onClose, onNavigate]);

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    setScale((s) => {
      const next = Math.min(MAX_SCALE, Math.max(MIN_SCALE, s - e.deltaY * 0.0015 * s));
      if (next <= MIN_SCALE) setPosition({ x: 0, y: 0 });
      return next;
    });
  };

  const handleDoubleClick = () => {
    if (scale > MIN_SCALE) {
      resetView();
    } else {
      setScale(2.5);
    }
  };

  const handlePointerDown = (e: React.PointerEvent) => {
    if (scale <= MIN_SCALE) return;
    dragState.current = {
      dragging: true,
      startX: e.clientX,
      startY: e.clientY,
      originX: position.x,
      originY: position.y,
    };
    setIsDraggingUI(true);
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!dragState.current.dragging) return;
    setPosition({
      x: dragState.current.originX + (e.clientX - dragState.current.startX),
      y: dragState.current.originY + (e.clientY - dragState.current.startY),
    });
  };

  const handlePointerUp = () => {
    dragState.current.dragging = false;
    setIsDraggingUI(false);
  };

  if (!image) return null;

  return (
    <div
      className={cn(
        "fixed inset-0 z-[9997] flex items-center justify-center bg-bg/95 backdrop-blur-md transition-opacity duration-300 ease-out",
        isOpen ? "opacity-100" : "pointer-events-none opacity-0",
      )}
      aria-hidden={!isOpen}
      onClick={onClose}
    >
      <div
        className="absolute inset-x-0 top-0 z-10 flex items-center justify-between p-4 md:p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <span className="font-mono text-xs text-fg-subtle">
          {images.length > 1 ? `${(index ?? 0) + 1} / ${images.length}` : ""}
        </span>
        <div className="flex items-center gap-2">
          <button
            type="button"
            data-cursor="hover"
            aria-label="Zoom out"
            onClick={() => setScale((s) => Math.max(MIN_SCALE, s - 0.5))}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-border-strong bg-bg-elevated/80 text-fg transition-colors hover:bg-bg-elevated"
          >
            <ZoomOut className="h-4 w-4" />
          </button>
          <button
            type="button"
            data-cursor="hover"
            aria-label="Zoom in"
            onClick={() => setScale((s) => Math.min(MAX_SCALE, s + 0.5))}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-border-strong bg-bg-elevated/80 text-fg transition-colors hover:bg-bg-elevated"
          >
            <ZoomIn className="h-4 w-4" />
          </button>
          <button
            type="button"
            data-cursor="hover"
            aria-label="Reset zoom"
            onClick={resetView}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-border-strong bg-bg-elevated/80 text-fg transition-colors hover:bg-bg-elevated"
          >
            <RotateCcw className="h-4 w-4" />
          </button>
          <button
            type="button"
            data-cursor="hover"
            aria-label="Close"
            onClick={onClose}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-border-strong bg-bg-elevated/80 text-fg transition-colors hover:bg-bg-elevated"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>

      {images.length > 1 && (
        <>
          <button
            type="button"
            data-cursor="hover"
            aria-label="Previous image"
            onClick={(e) => {
              e.stopPropagation();
              onNavigate(((index ?? 0) - 1 + images.length) % images.length);
            }}
            className="absolute left-4 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-border-strong bg-bg-elevated/80 text-fg transition-colors hover:bg-bg-elevated md:left-8"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            type="button"
            data-cursor="hover"
            aria-label="Next image"
            onClick={(e) => {
              e.stopPropagation();
              onNavigate(((index ?? 0) + 1) % images.length);
            }}
            className="absolute right-4 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-border-strong bg-bg-elevated/80 text-fg transition-colors hover:bg-bg-elevated md:right-8"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </>
      )}

      <motion.div
        key={image.src}
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className="relative flex h-full w-full items-center justify-center overflow-hidden px-6 py-20"
        onClick={(e) => e.stopPropagation()}
        onWheel={handleWheel}
        onDoubleClick={handleDoubleClick}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerUp}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={image.src}
          alt={image.alt}
          draggable={false}
          className={cn(
            "max-h-full max-w-full select-none rounded-lg shadow-2xl",
            scale > 1 ? "cursor-grab active:cursor-grabbing" : "cursor-zoom-in",
          )}
          style={{
            transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
            transition: isDraggingUI ? "none" : "transform 0.2s ease-out",
          }}
        />
      </motion.div>

      <p className="absolute bottom-4 left-1/2 hidden -translate-x-1/2 font-mono text-[11px] text-fg-subtle md:block">
        Scroll or double-click to zoom · Drag to pan · Esc to close
      </p>
    </div>
  );
}
