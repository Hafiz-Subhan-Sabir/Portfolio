"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const milestones = [
  {
    year: "2026",
    items: [
      {
        title: "AI-powered Full Stack Delivery",
        subtitle: "Systems, security, and premium UI",
        description:
          "Shipping full-stack systems with AI integrations, secure auth flows, and polished motion — from requirements to deployment.",
      },
    ],
  },
  {
    year: "2025",
    items: [
      {
        title: "Secure Systems + Payments",
        subtitle: "Auth, roles, and integrations",
        description:
          "Built secure authentication systems (JWT/RBAC), integrated payments, and delivered production-style dashboards with strong UX and maintainability.",
      },
    ],
  },
  {
    year: "2024",
    items: [
      {
        title: "Product UI + Scroll Systems",
        subtitle: "Frontend engineering",
        description:
          "Built interactive interfaces with GSAP/ScrollTrigger, smooth scroll, clean layout systems, and performance-first UX.",
      },
    ],
  },
  {
    year: "2023",
    items: [
      {
        title: "Backend Foundations",
        subtitle: "APIs and architecture",
        description:
          "Strengthened backend skills with Python frameworks, ORM patterns, secure password hashing, and practical debugging/optimization.",
      },
    ],
  },
  {
    year: "2022",
    items: [
      {
        title: "Strong Fundamentals",
        subtitle: "Web + problem solving",
        description:
          "Strengthened core web foundations, debugging skills, and system thinking through consistent building and iteration.",
      },
    ],
  },
] as const;

export const Timeline = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const progressRef = useRef<HTMLDivElement | null>(null);
  const headingRef = useRef<HTMLDivElement | null>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const section = sectionRef.current;
    const progress = progressRef.current;
    const heading = headingRef.current;
    if (!section || !progress || !heading) return;

    const ctx = gsap.context(() => {
      gsap.set(progress, { scaleY: 0, transformOrigin: "top" });
      const setScale = gsap.quickSetter(progress, "scaleY");
      ScrollTrigger.create({
        trigger: section,
        start: "top 10%",
        end: "bottom 10%",
        scrub: true,
        onUpdate: (self) => {
          // Keep deterministic behavior in both directions.
          const p = Math.max(0, Math.min(1, self.progress));
          setScale(p);
        },
        onLeaveBack: () => setScale(0),
        onEnter: () => setScale(0),
      });

      // Local timeline reveal (avoids conflicts with global reveal engine).
      gsap.fromTo(
        heading,
        { autoAlpha: 0, y: 26 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.75,
          ease: "power3.out",
          scrollTrigger: {
            trigger: heading,
            start: "top 90%",
            once: false,
            toggleActions: "play reverse play reverse",
          },
        }
      );

      const items = itemRefs.current.filter(Boolean) as HTMLDivElement[];
      if (items.length) {
        items.forEach((el, index) => {
          const fromX = index % 2 === 0 ? 54 : -54; // right, left, right, left
          gsap.set(el, { autoAlpha: 0, x: fromX, y: 18 });

          ScrollTrigger.create({
            trigger: el,
            start: "top 88%",
            end: "bottom 22%",
            onEnter: () => {
              gsap.to(el, {
                autoAlpha: 1,
                x: 0,
                y: 0,
                duration: 0.9,
                ease: "power3.out",
                overwrite: "auto",
              });
            },
            onEnterBack: () => {
              gsap.to(el, {
                autoAlpha: 1,
                x: 0,
                y: 0,
                duration: 0.82,
                ease: "power3.out",
                overwrite: "auto",
              });
            },
            onLeaveBack: () => {
              gsap.set(el, { autoAlpha: 0, x: fromX, y: 18 });
            },
          });
        });
      }
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="timeline"
      ref={(el) => {
        sectionRef.current = el;
      }}
      className="relative flex flex-col items-center justify-center py-24 px-6 md:px-16 overflow-hidden scroll-mt-24"
    >
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-20 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-emerald-500/10 blur-3xl" />
        <div className="absolute top-44 right-[-120px] h-[420px] w-[420px] rounded-full bg-cyan-500/10 blur-3xl" />
      </div>
      <div className="w-full max-w-5xl">
        <div
          ref={(el) => {
            headingRef.current = el;
          }}
          className="mb-10"
        >
          <p className="text-xs tracking-[0.25em] text-slate-400 uppercase">
            Milestones
          </p>
          <h2 className="mt-2 text-3xl md:text-4xl font-semibold brand-gradient-text">
            Timeline that tells a story
          </h2>
        </div>

        <div className="relative">
          <div
            className="absolute left-4 md:left-1/2 md:-translate-x-1/2 top-0 bottom-0 w-px origin-top bg-gradient-to-b from-emerald-400/60 via-cyan-400/50 to-blue-500/50"
          />
          <div
            ref={(el) => {
              progressRef.current = el;
            }}
            className="absolute left-4 md:left-1/2 md:-translate-x-1/2 top-0 bottom-0 w-px origin-top bg-gradient-to-b from-emerald-400 via-cyan-400 to-blue-500 opacity-90"
            style={{ transform: "scaleY(0)" }}
          />

          <div className="space-y-16 md:space-y-20">
            {milestones.map((block, blockIndex) => (
              <div
                key={block.year}
                ref={(el) => {
                  itemRefs.current[blockIndex] = el;
                }}
                className="relative md:grid md:grid-cols-2 md:gap-10"
              >
                <div className="absolute left-2 md:left-1/2 md:-translate-x-1/2 top-2 h-3.5 w-3.5 rounded-full bg-cyan-300 shadow-[0_0_0_6px_rgba(34,211,238,0.18)]" />

                <div
                  className={[
                    "pl-10 md:pl-0 mb-4 md:mb-0",
                    blockIndex % 2 === 0 ? "md:col-start-1 md:text-right md:pr-10" : "md:col-start-2 md:pl-10",
                  ].join(" ")}
                >
                  <div className="text-3xl md:text-5xl font-semibold text-gray-900 dark:text-white">
                    {block.year}
                  </div>
                  <div className="mt-2 text-sm text-gray-600 dark:text-gray-300">
                    {block.items[0]?.subtitle}
                  </div>
                </div>

                <div
                  className={[
                    "pl-10",
                    blockIndex % 2 === 0 ? "md:col-start-2 md:pl-10" : "md:col-start-1 md:pl-0 md:text-right md:pr-10",
                  ].join(" ")}
                >
                  {block.items.map((item) => (
                    <div
                      key={item.title}
                      className="group rounded-3xl border border-gray-200 bg-white/70 backdrop-blur p-6 md:p-7 shadow-xl transition hover:-translate-y-0.5 hover:shadow-2xl dark:border-white/10 dark:bg-white/5 dark:shadow-black/30"
                    >
                      <h3 className="text-lg md:text-xl font-semibold text-gray-900 dark:text-white">
                        {item.title}
                      </h3>
                      <p className="mt-2 text-sm md:text-base text-gray-600 dark:text-gray-300 leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

