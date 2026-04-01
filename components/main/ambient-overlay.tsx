"use client";

export function AmbientOverlay() {
  return (
    <div className="pointer-events-none fixed inset-0 z-[15]">
      <div className="hidden md:flex absolute top-1/2 left-5 -translate-y-1/2 flex-col gap-20 items-center opacity-25">
        <span className="text-[8px] tracking-[0.45em] uppercase -rotate-90 whitespace-nowrap text-white/65">latitude.30.15</span>
        <div className="w-px h-24 bg-gradient-to-b from-transparent via-white/60 to-transparent" />
        <span className="text-[8px] tracking-[0.45em] uppercase -rotate-90 whitespace-nowrap text-white/65">longitude.71.52</span>
      </div>

      <div className="absolute bottom-10 left-8 hidden md:block max-w-xs">
        <p className="italic text-white/35 text-base leading-relaxed">
          "The stage is set in silence; the light is merely a consequence of thought."
        </p>
      </div>

      <div className="absolute top-24 right-10 h-4 w-4 rotate-45 bg-[#f7e295]/70 blur-[0.3px] animate-pulse hidden md:block" />
      <div className="absolute bottom-24 left-24 h-3 w-3 rotate-45 bg-[#f7e295]/55 blur-[0.3px] animate-pulse hidden md:block" />
    </div>
  );
}

