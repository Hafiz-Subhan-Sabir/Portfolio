import { HeroContent } from "@/components/sub/hero-content";

export const Hero = () => {
  return (
    <div className="relative flex flex-col h-full w-full">
      {/* Neon backdrop blobs (no space theme) */}
      <div className="pointer-events-none absolute inset-0 -z-20 overflow-hidden">
        <div className="absolute -top-28 left-1/2 h-[540px] w-[540px] -translate-x-1/2 rounded-full bg-[rgba(34,197,94,0.22)] blur-3xl dark:bg-[rgba(34,197,94,0.14)]" />
        <div className="absolute top-24 right-[-140px] h-[480px] w-[480px] rounded-full bg-[rgba(34,211,238,0.22)] blur-3xl dark:bg-[rgba(34,211,238,0.14)]" />
        <div className="absolute bottom-[-180px] left-[-160px] h-[520px] w-[520px] rounded-full bg-[rgba(59,130,246,0.18)] blur-3xl dark:bg-[rgba(59,130,246,0.12)]" />
      </div>

      <HeroContent />
    </div>
  );
};

