"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

type SkillItem =
  | { type: "icon"; label: string; iconSrc: string }
  | { type: "text"; label: string };

type SkillGroup = {
  title: string;
  subtitle: string;
  items: SkillItem[];
  visual:
    | { kind: "icon"; src: string; alt: string }
    | { kind: "locks" }
    | { kind: "none" };
};

function Pill({ item }: { item: SkillItem }) {
  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white/70 px-3 py-2 text-sm font-semibold text-gray-700 shadow-sm backdrop-blur transition hover:shadow-md hover:-translate-y-0.5 dark:border-white/10 dark:bg-white/5 dark:text-gray-200">
      {item.type === "icon" ? (
        <span className="grid place-items-center h-7 w-7 rounded-full bg-white/70 dark:bg-white/10 border border-gray-200/70 dark:border-white/10">
          <Image
            src={item.iconSrc}
            alt={item.label}
            width={16}
            height={16}
            className="object-contain"
            style={{ width: "auto", height: "auto" }}
          />
        </span>
      ) : null}
      <span>{item.label}</span>
    </div>
  );
}

export function SkillsPinned() {
  const groups = useMemo<SkillGroup[]>(
    () => [
      {
        title: "Frontend & Motion",
        subtitle: "UI foundations + advanced animations",
        visual: { kind: "icon", src: "/skills/framer.png", alt: "Frontend & Motion" },
        items: [
          { type: "icon", label: "HTML", iconSrc: "/skills/html.png" },
          { type: "icon", label: "CSS", iconSrc: "/skills/css.png" },
          { type: "icon", label: "TailwindCSS", iconSrc: "/skills/tailwind.png" },
          { type: "text", label: "GSAP (advanced animations)" },
          { type: "icon", label: "TypeScript", iconSrc: "/skills/ts.png" },
          { type: "icon", label: "React", iconSrc: "/skills/react.png" },
          { type: "icon", label: "Next.js", iconSrc: "/skills/next.png" },
          { type: "text", label: "Proper Layout & Grid Structuring" },
          { type: "text", label: "Re-designing Systems" },
        ],
      },
      {
        title: "Backend & Security",
        subtitle: "API systems, auth, and secure architecture",
        visual: { kind: "locks" },
        items: [
          { type: "text", label: "Python" },
          { type: "text", label: "Django" },
          { type: "text", label: "Flask" },
          { type: "text", label: "FastAPI" },
          { type: "text", label: "JWT, RBAC, Authentication Systems" },
          { type: "text", label: "ORM, Secure Password Hashing" },
          { type: "text", label: "Problem Debugging & Optimization" },
          { type: "text", label: "Deployment & Maintenance" },
        ],
      },
      {
        title: "AI & Data Systems",
        subtitle: "AI product engineering and model workflows",
        visual: { kind: "icon", src: "/vector.png", alt: "AI System" },
        items: [
          { type: "text", label: "AI Integrations (API keys, custom chatbots, SaaS AI systems)" },
          { type: "text", label: "Data Collection & AI Model Training" },
          { type: "text", label: "AI, ML, DL, LLM Integrations" },
          { type: "text", label: "Prompt Engineering & AI Tools Usage" },
          { type: "text", label: "Learning New Technologies" },
        ],
      },
      {
        title: "System Design & Delivery",
        subtitle: "Documentation, modeling, and implementation quality",
        visual: { kind: "icon", src: "/skills/figma.png", alt: "System Design" },
        items: [
          { type: "text", label: "Requirements Gathering, SRS Documentation" },
          { type: "text", label: "DFDs, ERDs, System Design" },
          { type: "text", label: "Agile & Waterfall Models" },
          { type: "text", label: "Git, GitHub" },
          { type: "text", label: "APK Development Basics" },
        ],
      },
      {
        title: "Operations & Leadership",
        subtitle: "Execution, collaboration, and freelance delivery",
        visual: { kind: "icon", src: "/skills/ops.svg", alt: "Operations & Leadership" },
        items: [
          { type: "text", label: "Team Leadership, Time Management" },
          { type: "text", label: "Freelancer Workflow" },
          { type: "text", label: "Collaboration Tools (ClickUp, Slack, Google Chat)" },
          { type: "text", label: "VideoCipher (video protection), Vimeo (high-quality streaming)" },
          { type: "text", label: "Payment Integrations (Stripe, Local & Bank Payments)" },
        ],
      },
    ],
    []
  );

  const sectionRef = useRef<HTMLElement | null>(null);
  const pinRef = useRef<HTMLDivElement | null>(null);
  const viewportRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const leftCardRef = useRef<HTMLDivElement | null>(null);
  const orbRef = useRef<HTMLDivElement | null>(null);
  const btnRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const [active, setActive] = useState(0);
  const stRef = useRef<ScrollTrigger | null>(null);
  const lastActiveRef = useRef<number>(-1);

  const jumpTo = (index: number) => {
    const st = stRef.current as any;
    if (!st) return;
    const total = groups.length;
    if (total <= 1) return;
    const progress = Math.min(1, Math.max(0, index / (total - 1)));
    const start = st.start as number;
    const end = st.end as number;
    const targetY = start + (end - start) * progress;
    const lenis = (typeof window !== "undefined" ? (window as any).__lenis : null) as
      | { scrollTo: (y: number, opts?: any) => void }
      | null;
    if (lenis?.scrollTo) lenis.scrollTo(targetY, { immediate: false });
    else window.scrollTo({ top: targetY, behavior: "smooth" });
  };

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const section = sectionRef.current;
    const pinEl = pinRef.current;
    const viewport = viewportRef.current;
    const track = trackRef.current;
    if (!section || !pinEl || !viewport || !track) return;

    const panels = Array.from(track.querySelectorAll<HTMLElement>("[data-skill-panel]"));
    if (!panels.length) return;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add("(min-width: 1024px)", () => {
        const total = panels.length;
        const getViewportH = () => viewport.clientHeight || window.innerHeight;
        const getScrollDistance = () => getViewportH() * (total - 1);

        const mainST = ScrollTrigger.create({
          trigger: section,
          start: "top top+=86",
          end: () => `+=${getScrollDistance()}`,
          pin: pinEl,
          pinSpacing: true,
          scrub: 1,
          anticipatePin: 1,
          fastScrollEnd: true,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const idx = Math.min(total - 1, Math.max(0, Math.round(self.progress * (total - 1))));

            if (idx !== lastActiveRef.current) {
              lastActiveRef.current = idx;
              setActive(idx);

              // Move the active-orb to the selected phase button (premium "AI" feel).
              const orb = orbRef.current;
              const card = leftCardRef.current;
              const btn = btnRefs.current[idx];
              if (orb && card && btn) {
                const cardRect = card.getBoundingClientRect();
                const btnRect = btn.getBoundingClientRect();
                const y = btnRect.top - cardRect.top + btnRect.height / 2 - 60;
                gsap.to(orb, { y, duration: 0.45, ease: "power3.out", overwrite: true });
              }

              const p = panels[idx];
              if (p) {
                const pills = p.querySelectorAll(".skill-pill");
                gsap.fromTo(
                  pills,
                  { opacity: 0, y: 10 },
                  { opacity: 1, y: 0, duration: 0.45, stagger: 0.06, ease: "power2.out", overwrite: true }
                );
              }
            }
          },
        });
        stRef.current = mainST;

        gsap.to(track, {
          y: () => -getViewportH() * (panels.length - 1),
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top top+=86",
            end: () => `+=${getScrollDistance()}`,
            scrub: 1,
            invalidateOnRefresh: true,
          },
        });
        // Initial reveal
        lastActiveRef.current = 0;
        const p0 = panels[0];
        if (p0) {
          const pills0 = p0.querySelectorAll(".skill-pill");
          gsap.set(pills0, { opacity: 1, y: 0 });
        }
        ScrollTrigger.refresh();
      });

      mm.add("(max-width: 1023px)", () => {
        gsap.set(track, { clearProps: "transform" });
        setActive(0);
        stRef.current = null;
        lastActiveRef.current = -1;
      });

      return () => mm.revert();
    }, section);

    return () => ctx.revert();
  }, [groups.length]);

  return (
    <section
      id="skills"
      ref={(el) => {
        sectionRef.current = el;
      }}
      className="relative w-full py-24 overflow-x-clip scroll-mt-24"
    >
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-24 left-1/2 h-[560px] w-[560px] -translate-x-1/2 rounded-full bg-emerald-500/10 blur-3xl" />
        <div className="absolute top-44 right-[-140px] h-[520px] w-[520px] rounded-full bg-cyan-500/10 blur-3xl" />
      </div>

      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
        {/* Mobile title */}
        <div className="mb-8 lg:hidden" data-reveal="fade-up">
          <h2 className="mt-2 text-3xl md:text-4xl font-semibold text-gray-900 dark:text-white">
            Skills
          </h2>
        </div>

        {/* Desktop (pinned) */}
        <div
          ref={(el) => {
            pinRef.current = el;
          }}
          className="hidden lg:grid w-full grid-cols-1 lg:grid-cols-[320px_1fr] gap-8 lg:gap-12 items-start"
        >
          {/* Left column: phases */}
          <div className="lg:sticky lg:top-[96px] min-w-0">
            <div
              ref={(el) => {
                leftCardRef.current = el;
              }}
              className="relative overflow-hidden rounded-3xl border border-gray-200 bg-white/70 backdrop-blur p-5 shadow-xl dark:border-white/10 dark:bg-white/5"
            >
              {/* Active orb */}
              <div
                ref={(el) => {
                  orbRef.current = el;
                }}
                className="pointer-events-none absolute left-[-40px] top-[88px] h-[120px] w-[120px] rounded-full blur-2xl opacity-70"
                style={{
                  background:
                    "radial-gradient(circle at 30% 30%, rgba(var(--neon-c) / 0.55), transparent 60%), radial-gradient(circle at 60% 60%, rgba(var(--neon-g) / 0.45), transparent 60%)",
                }}
              />
              <div className="mb-4">
                <h2 className="text-3xl font-semibold text-gray-900 dark:text-white">Skills</h2>
                <div className="mt-2 h-px w-full bg-gradient-to-r from-emerald-500/40 via-cyan-400/30 to-transparent" />
              </div>
              <div className="text-xs tracking-[0.22em] uppercase text-gray-500 dark:text-gray-400">
                Phases
              </div>
              <div className="mt-4 flex flex-col gap-2">
                {groups.map((g, i) => (
                  <button
                    key={g.title}
                    type="button"
                    ref={(el) => {
                      btnRefs.current[i] = el;
                    }}
                    onClick={() => {
                      jumpTo(i);
                    }}
                    className={[
                      "w-full text-left rounded-2xl border px-4 py-3 transition relative overflow-hidden hover:-translate-y-0.5 hover:shadow-lg",
                      i === active
                        ? "border-transparent bg-gradient-to-r from-emerald-500/20 to-cyan-500/15 shadow-[0_0_0_1px_rgba(34,211,238,0.15)]"
                        : "border-gray-200 bg-white/60 hover:bg-white dark:border-white/10 dark:bg-white/5 dark:hover:bg-white/10",
                    ].join(" ")}
                  >
                    {i === active ? (
                      <span className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-emerald-400 to-cyan-400" />
                    ) : null}
                    <div className="flex items-center gap-3">
                      {g.visual.kind === "icon" ? (
                        <span className="grid place-items-center h-9 w-9 rounded-2xl border border-gray-200 bg-white/70 dark:border-white/10 dark:bg-white/5">
                          <Image
                            src={g.visual.src}
                            alt={g.visual.alt}
                            width={18}
                            height={18}
                            style={{ width: "auto", height: "auto" }}
                          />
                        </span>
                      ) : g.visual.kind === "locks" ? (
                        <span className="relative h-9 w-9 rounded-2xl border border-gray-200 bg-white/70 dark:border-white/10 dark:bg-white/5 overflow-hidden">
                          <span className="absolute inset-0 bg-cyan-400/10 blur-xl" />
                          <Image
                            src="/lock-main.png"
                            alt="Security"
                            width={30}
                            height={30}
                            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-[42%]"
                            style={{ width: "auto", height: "auto" }}
                          />
                          <Image
                            src="/lock-top.png"
                            alt="Security"
                            width={20}
                            height={20}
                            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-[92%]"
                            style={{ width: "auto", height: "auto" }}
                          />
                        </span>
                      ) : null}
                      <div className="min-w-0">
                        <div className="text-sm font-semibold text-gray-900 dark:text-white">
                          {g.title}
                        </div>
                        <div className="mt-0.5 text-xs text-gray-600 dark:text-gray-300">
                          {g.subtitle}
                        </div>
                      </div>
                    </div>
                    <div className="mt-0.5 text-xs text-gray-600 dark:text-gray-300">
                      {/* kept for layout compatibility */}
                    </div>
                  </button>
                ))}
              </div>
              <div className="mt-4 h-1.5 w-full rounded-full bg-gray-200/70 dark:bg-white/10 overflow-hidden">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-cyan-400 transition-[width] duration-200"
                  style={{ width: `${((active + 1) / groups.length) * 100}%` }}
                />
              </div>
            </div>
          </div>

          {/* Right column: pinned panels */}
          <div className="relative overflow-hidden rounded-3xl border border-gray-200 bg-white/70 backdrop-blur shadow-xl dark:border-white/10 dark:bg-white/5 min-w-0">
            <div className="pointer-events-none absolute inset-0">
              <div className="absolute -top-24 -right-24 h-[420px] w-[420px] rounded-full bg-cyan-500/10 blur-3xl" />
              <div className="absolute -bottom-28 -left-28 h-[520px] w-[520px] rounded-full bg-emerald-500/10 blur-3xl" />
              <div className="ai-scanline" />
              <div className="absolute inset-0 opacity-[0.06] dark:opacity-[0.08]"
                style={{
                  backgroundImage:
                    "linear-gradient(to right, rgba(255,255,255,0.22) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.22) 1px, transparent 1px)",
                  backgroundSize: "48px 48px",
                }}
              />
            </div>
            <div
              ref={(el) => {
                viewportRef.current = el;
              }}
              className="relative h-[520px] sm:h-[560px] lg:h-[620px]"
            >
              <div
                ref={(el) => {
                  trackRef.current = el;
                }}
                className="absolute inset-0 flex flex-col will-change-transform"
              >
                {groups.map((g, idx) => (
                  <div
                    key={g.title}
                    data-skill-panel
                    data-index={idx}
                    className="h-full w-full shrink-0 p-6 sm:p-8"
                  >
                    <div className="flex items-end justify-between gap-4">
                      <div>
                        <h3 className="text-sm font-semibold brand-gradient-text">{g.title}</h3>
                        <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">{g.subtitle}</p>
                      </div>
                      <div className="flex items-center gap-3">
                        {g.visual.kind === "icon" ? (
                          <div className="grid place-items-center h-11 w-11 rounded-2xl border border-gray-200 bg-white/70 dark:border-white/10 dark:bg-white/5">
                            <Image
                              src={g.visual.src}
                              alt={g.visual.alt}
                              width={22}
                              height={22}
                              style={{ width: "auto", height: "auto" }}
                            />
                          </div>
                        ) : g.visual.kind === "locks" ? (
                          <div className="relative h-12 w-12">
                            <div className="absolute inset-0 rounded-2xl bg-cyan-400/15 blur-xl" />
                            <Image
                              src="/lock-main.png"
                              alt="Security"
                              width={46}
                              height={46}
                              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-[42%]"
                              style={{ width: "auto", height: "auto" }}
                            />
                            <Image
                              src="/lock-top.png"
                              alt="Security"
                              width={30}
                              height={30}
                              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-[92%]"
                              style={{ width: "auto", height: "auto" }}
                            />
                          </div>
                        ) : null}
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        {idx + 1} / {groups.length}
                      </div>
                      </div>
                    </div>

                    <div className="mt-6 flex flex-wrap gap-3">
                      {g.items.map((item) => (
                        <div key={`${g.title}-${item.label}`} className="skill-pill">
                          <Pill item={item} />
                        </div>
                      ))}
                    </div>

                    <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {[
                        { t: "Deliver", d: "Production-ready UI with clean architecture" },
                        { t: "Polish", d: "Premium motion + micro-interactions" },
                        { t: "Speed", d: "Fast pages, smooth scroll, optimized assets" },
                        { t: "Quality", d: "Maintainable code + consistent styling" },
                      ].map((b) => (
                        <div
                          key={`${g.title}-${b.t}`}
                          className="rounded-2xl border border-gray-200 bg-white/60 p-4 backdrop-blur dark:border-white/10 dark:bg-white/5"
                        >
                          <div className="text-sm font-semibold text-gray-900 dark:text-white">{b.t}</div>
                          <div className="mt-1 text-sm text-gray-600 dark:text-gray-300">{b.d}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Mobile (stacked, no pin) */}
        <div className="lg:hidden space-y-6" data-reveal="fade-up" data-reveal-stagger="0.08" data-reveal-children="[data-mobile-skill-card]">
          {groups.map((g, idx) => (
            <div
              key={g.title}
              data-mobile-skill-card="true"
              data-reveal={idx % 2 === 0 ? "fade-left" : "fade-right"}
              className="rounded-3xl border border-gray-200 bg-white/70 backdrop-blur p-6 shadow-xl dark:border-white/10 dark:bg-white/5"
            >
              <div className="flex items-center justify-between gap-4">
                <div>
                  <h3 className="text-base font-semibold text-gray-900 dark:text-white">{g.title}</h3>
                  <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">{g.subtitle}</p>
                </div>
                {g.visual.kind === "icon" ? (
                  <div className="grid place-items-center h-11 w-11 rounded-2xl border border-gray-200 bg-white/70 dark:border-white/10 dark:bg-white/5">
                    <Image
                      src={g.visual.src}
                      alt={g.visual.alt}
                      width={22}
                      height={22}
                      style={{ width: "auto", height: "auto" }}
                    />
                  </div>
                ) : g.visual.kind === "locks" ? (
                  <div className="relative h-12 w-12">
                    <div className="absolute inset-0 rounded-2xl bg-cyan-400/15 blur-xl" />
                    <Image
                      src="/lock-main.png"
                      alt="Security"
                      width={46}
                      height={46}
                      className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-[42%]"
                      style={{ width: "auto", height: "auto" }}
                    />
                    <Image
                      src="/lock-top.png"
                      alt="Security"
                      width={30}
                      height={30}
                      className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-[92%]"
                      style={{ width: "auto", height: "auto" }}
                    />
                  </div>
                ) : null}
              </div>

              <div className="mt-4 flex flex-wrap gap-2.5">
                {g.items.map((item) => (
                  <Pill key={`${g.title}-${item.label}`} item={item} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

