"use client";

import { useEffect, useMemo, useRef, useState } from "react";

import { MotionIn } from "@/components/motion/MotionIn";
import { EDUCATION_HIGHLIGHTS, TESTIMONIALS } from "@/constants";

type StatKey = "clients" | "solo" | "team";

function extractFirstNumber(text: string, fallback: number): number {
  const match = text.match(/\d+/);
  return match ? Number(match[0]) : fallback;
}

export function TestimonialsEducation() {
  const statsWrapRef = useRef<HTMLDivElement | null>(null);
  const [counts, setCounts] = useState<Record<StatKey, number>>({
    clients: 0,
    solo: 0,
    team: 0,
  });

  const targets = useMemo(
    () => ({
      clients: extractFirstNumber(EDUCATION_HIGHLIGHTS.satisfiedClients, 35),
      solo: extractFirstNumber(EDUCATION_HIGHLIGHTS.soloProjects, 10),
      team: extractFirstNumber(EDUCATION_HIGHLIGHTS.teamProjects, 20),
    }),
    []
  );

  useEffect(() => {
    const root = statsWrapRef.current;
    if (!root) return;

    let rafIds: number[] = [];
    let hasPlayed = false;

    const cancelAll = () => {
      rafIds.forEach((id) => cancelAnimationFrame(id));
      rafIds = [];
    };

    const animateCount = (key: StatKey, target: number, durationMs: number) => {
      const startAt = performance.now();
      const tick = (now: number) => {
        const elapsed = now - startAt;
        const p = Math.min(1, elapsed / durationMs);
        const eased = 1 - Math.pow(1 - p, 3);
        const next = Math.round(target * eased);
        setCounts((prev) => (prev[key] === next ? prev : { ...prev, [key]: next }));
        if (p < 1) {
          const id = requestAnimationFrame(tick);
          rafIds.push(id);
        }
      };
      const id = requestAnimationFrame(tick);
      rafIds.push(id);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (hasPlayed) return;
          hasPlayed = true;
          cancelAll();
          setCounts({ clients: 0, solo: 0, team: 0 });
          animateCount("clients", targets.clients, 2200);
          animateCount("solo", targets.solo, 2100);
          animateCount("team", targets.team, 2300);
          return;
        }

        // Reset so the counter can replay each time this section is revisited.
        hasPlayed = false;
        cancelAll();
        setCounts({ clients: 0, solo: 0, team: 0 });
      },
      { threshold: 0.45 }
    );

    observer.observe(root);

    return () => {
      observer.disconnect();
      cancelAll();
    };
  }, [targets.clients, targets.solo, targets.team]);

  return (
    <section id="testimonials" className="relative w-full py-20 scroll-mt-24">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
        <MotionIn>
          <div
            className="rounded-3xl border p-6 sm:p-8 shadow-xl backdrop-blur"
            data-reveal="fade-up"
            style={{
              borderColor: "rgb(var(--neon-c) / 0.25)",
              background:
                "linear-gradient(160deg, rgb(var(--card) / 0.92), rgb(var(--card) / 0.82))",
              boxShadow: "0 22px 40px rgb(2 6 23 / 0.22)",
            }}
          >
            <div className="mb-6" data-reveal="fade-up">
              <p className="text-xs uppercase tracking-[0.2em] text-gray-500 dark:text-cyan-200/80">Client Satisfaction</p>
              <h2 className="mt-2 text-3xl sm:text-4xl font-semibold brand-gradient-text">
                Testimonials & Education
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4" data-reveal="fade-up" data-reveal-stagger="0.08" data-reveal-children="article">
              {TESTIMONIALS.map((item, idx) => (
                <article
                  key={`${item.name}-${item.role}`}
                  data-reveal={idx % 2 === 0 ? "fade-left" : "fade-right"}
                  className="rounded-2xl border p-5 transition hover:-translate-y-1 hover:shadow-lg"
                  style={{
                    borderColor: "rgb(var(--neon-c) / 0.2)",
                    background:
                      "linear-gradient(180deg, rgb(var(--neon-c) / 0.08), rgb(var(--neon-g) / 0.06))",
                  }}
                >
                  <p className="text-sm text-gray-700 dark:text-gray-200 leading-relaxed">"{item.text}"</p>
                  <div className="mt-4">
                    <div className="text-sm font-semibold text-gray-900 dark:text-white">{item.name}</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">{item.role}</div>
                  </div>
                </article>
              ))}
            </div>

            <div
              className="mt-6 rounded-2xl border p-5"
              data-reveal="fade-up"
              style={{
                borderColor: "rgb(var(--neon-c) / 0.2)",
                background:
                  "linear-gradient(160deg, rgb(var(--card) / 0.88), rgb(var(--card) / 0.8))",
              }}
            >
              <h3 className="text-sm font-semibold uppercase tracking-[0.12em] text-gray-500 dark:text-cyan-200/80">
                Education & Delivery Background
              </h3>
              <p className="mt-3 text-sm text-gray-700 dark:text-gray-200">{EDUCATION_HIGHLIGHTS.education}</p>
              <p className="mt-2 text-sm text-gray-700 dark:text-gray-200">{EDUCATION_HIGHLIGHTS.technicalSummary}</p>
              <div
                ref={statsWrapRef}
                className="mt-4 rounded-xl border px-4 py-3 text-sm font-extrabold tracking-wide"
                style={{
                  borderColor: "rgb(var(--neon-c) / 0.4)",
                  background:
                    "linear-gradient(90deg, rgb(var(--neon-g) / 0.22), rgb(var(--neon-c) / 0.22))",
                  color: "rgb(var(--text))",
                  boxShadow: "0 0 24px rgb(var(--neon-c) / 0.25)",
                }}
              >
                Satisfied Clients: {counts.clients}+
              </div>
              <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div
                  data-reveal="fade-left"
                  className="rounded-xl border px-4 py-3 text-sm font-bold text-gray-800 dark:text-gray-100"
                  style={{
                    borderColor: "rgb(var(--neon-g) / 0.45)",
                    background:
                      "linear-gradient(180deg, rgb(var(--neon-g) / 0.2), rgb(var(--card) / 0.82))",
                    boxShadow: "0 0 22px rgb(var(--neon-g) / 0.22)",
                  }}
                >
                  Delivered {counts.solo}+ solo projects end-to-end.
                </div>
                <div
                  data-reveal="fade-right"
                  className="rounded-xl border px-4 py-3 text-sm font-bold text-gray-800 dark:text-gray-100"
                  style={{
                    borderColor: "rgb(var(--neon-c) / 0.45)",
                    background:
                      "linear-gradient(180deg, rgb(var(--neon-c) / 0.2), rgb(var(--card) / 0.82))",
                    boxShadow: "0 0 22px rgb(var(--neon-c) / 0.22)",
                  }}
                >
                  Collaborated with teams on {counts.team}+ projects.
                </div>
              </div>
            </div>
          </div>
        </MotionIn>
      </div>
    </section>
  );
}
