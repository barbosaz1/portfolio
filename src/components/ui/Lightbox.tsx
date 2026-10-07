"use client";

import { useEffect, useRef, useState } from "react";
import { lockScroll } from "@/lib/scroll-lock";
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
  const closeRef = useRef<HTMLButtonElement>(null);

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
    const release = lockScroll();
    const previous = document.activeElement as HTMLElement | null;
    closeRef.current?.focus({ preventScroll: true });

    // Capture phase + stopImmediatePropagation so Escape closes only the
    // lightbox, not the case study underneath it.
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.stopImmediatePropagation();
        onClose();
      } else if (e.key === "ArrowRight" && images.length > 1) {
        e.stopImmediatePropagation();
        onNavigate((index! + 1) % images.length);
      } else if (e.key === "ArrowLeft" && images.length > 1) {
        e.stopImmediatePropagation();
        onNavigate((index! - 1 + images.length) % images.length);
      } else if (e.key === "+" || e.key === "=") {
        setScale((s) => Math.min(MAX_SCALE, s + 0.5));
      } else if (e.key === "-") {
        setScale((s) => Math.max(MIN_SCALE, s - 0.5));
      }
    };
    window.addEventListener("keydown", handleKey, true);

    return () => {
      window.removeEventListener("keydown", handleKey, true);
      release();
      previous?.focus?.({ preventScroll: true });
    };
  }, [isOpen, index, images.length, onClose, onNavigate]);

  const handleWheel = (e: React.WheelEvent) => {
    setScale((s) => {
      const next = Math.min(MAX_SCALE, Math.max(MIN_SCALE, s - e.deltaY * 0.0015 * s));
      if (next <= MIN_SCALE) setPosition({ x: 0, y: 0 });
      return next;
    });
  };

  const handleDoubleClick = () => {
    if (scale > MIN_SCALE) resetView();
    else setScale(2.5);
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
      className={cn("lb", isOpen && "is-open")}
      role="dialog"
      aria-modal="true"
      aria-label="Image viewer"
      aria-hidden={!isOpen}
      inert={!isOpen}
      onClick={onClose}
    >
      <div className="lb__bar" onClick={(e) => e.stopPropagation()}>
        <span className="num">
          {images.length > 1 ? `${(index ?? 0) + 1} / ${images.length}` : ""}
        </span>
        <div className="lb__tools">
          <button
            className="pill"
            type="button"
            aria-label="Zoom out"
            onClick={() => setScale((s) => Math.max(MIN_SCALE, s - 0.5))}
          >
            −
          </button>
          <button
            className="pill"
            type="button"
            aria-label="Zoom in"
            onClick={() => setScale((s) => Math.min(MAX_SCALE, s + 0.5))}
          >
            +
          </button>
          <button className="pill" type="button" onClick={resetView}>
            Reset
          </button>
          <button ref={closeRef} className="pill" type="button" onClick={onClose}>
            Close
            <kbd>Esc</kbd>
          </button>
        </div>
      </div>

      <div
        className="lb__stage"
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
          style={{
            transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
            transition: isDraggingUI ? "none" : "transform 0.2s ease-out",
            cursor: scale > 1 ? (isDraggingUI ? "grabbing" : "grab") : "zoom-in",
          }}
        />
      </div>

      <div className="lb__nav" onClick={(e) => e.stopPropagation()}>
        {images.length > 1 ? (
          <button
            className="pill"
            type="button"
            onClick={() => onNavigate(((index ?? 0) - 1 + images.length) % images.length)}
          >
            ← Prev
          </button>
        ) : (
          <span />
        )}
        <span className="muted">Scroll or double-click to zoom · Drag to pan</span>
        {images.length > 1 ? (
          <button
            className="pill"
            type="button"
            onClick={() => onNavigate(((index ?? 0) + 1) % images.length)}
          >
            Next →
          </button>
        ) : (
          <span />
        )}
      </div>
    </div>
  );
}
