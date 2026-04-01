"use client";

import { useEffect, useState } from "react";

export function CustomCursor() {
  const [xy, setXy] = useState({ x: -100, y: -100 });
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const onMove = (e: MouseEvent) => setXy({ x: e.clientX, y: e.clientY });
    const onDown = () => setActive(true);
    const onUp = () => setActive(false);
    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
    };
  }, []);

  return (
    <>
      <div
        className="hidden lg:block fixed top-0 left-0 z-[99998] pointer-events-none rounded-full border border-[#f7e295]/55"
        style={{
          width: active ? 16 : 24,
          height: active ? 16 : 24,
          transform: `translate(${xy.x - (active ? 8 : 12)}px, ${xy.y - (active ? 8 : 12)}px)`,
          transition: "width 120ms ease, height 120ms ease, transform 45ms linear",
          mixBlendMode: "difference",
        }}
      />
      <div
        className="hidden lg:block fixed top-0 left-0 z-[99999] pointer-events-none h-1.5 w-1.5 rounded-full bg-[#f7e295]"
        style={{
          transform: `translate(${xy.x - 3}px, ${xy.y - 3}px)`,
          transition: "transform 25ms linear",
          boxShadow: "0 0 10px rgba(247,226,149,0.45)",
        }}
      />
    </>
  );
}

