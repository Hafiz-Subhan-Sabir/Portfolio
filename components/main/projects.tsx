'use client';

import { useState, useCallback, useMemo, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { PROJECTS } from '@/constants';

export const Projects = () => {
  const [openDetails, setOpenDetails] = useState<Record<string, boolean>>({});
  const sectionRef = useRef<HTMLElement | null>(null);
  const featuredProjects = useMemo(
    () => PROJECTS.filter((p) => (p as { featured?: boolean }).featured),
    []
  );
  const otherProjects = useMemo(
    () => PROJECTS.filter((p) => !(p as { featured?: boolean }).featured),
    []
  );
  const toggleDetails = useCallback((title: string) => {
    setOpenDetails((prev) => ({ ...prev, [title]: !prev[title] }));
  }, []);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const section = sectionRef.current;
    if (!section) return;

    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      const groups = [
        ...Array.from(section.querySelectorAll<HTMLElement>('[data-project-group="featured"]')),
        ...Array.from(section.querySelectorAll<HTMLElement>('[data-project-group="other"]')),
      ];

      groups.forEach((group) => {
        const cards = Array.from(group.querySelectorAll<HTMLElement>('[data-project-card]'));
        if (!cards.length) return;

        gsap.set(cards, { opacity: 0, y: 26 });

        ScrollTrigger.create({
          trigger: group,
          start: 'top 84%',
          onEnter: () => {
            gsap.to(cards, {
              opacity: 1,
              y: 0,
              duration: 0.82,
              stagger: 0.14,
              ease: 'power3.out',
              overwrite: 'auto',
            });
          },
          onLeaveBack: () => {
            gsap.set(cards, { opacity: 0, y: 26 });
          },
        });
      });
    }, section);

    return () => ctx.revert();
  }, [featuredProjects.length, otherProjects.length]);

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative min-h-screen bg-gray-100/90 dark:bg-[#030014]/40 scroll-mt-24"
    >
      <div className="w-full max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-10 py-12 lg:py-16">
        <div className="mb-6" data-reveal="fade-up">
          <h2 className="text-3xl sm:text-4xl font-semibold brand-gradient-text">Featured Projects</h2>
          <p className="mt-1 text-sm uppercase tracking-[0.18em] text-gray-500 dark:text-gray-400">Good projects first</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5" data-project-group="featured">
          {featuredProjects.map((project) => (
            <article
              key={project.title}
              data-project-card="true"
              className="group rounded-3xl border border-gray-200 bg-white/85 p-4 shadow-lg backdrop-blur dark:border-white/10 dark:bg-white/5"
            >
              <div className="relative h-60 sm:h-72 w-full overflow-hidden rounded-2xl bg-gray-200 dark:bg-black/30">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover media-soft"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
              <h3 className="mt-4 text-lg font-semibold text-gray-900 dark:text-white">{project.title}</h3>
              {"stack" in project ? (
                <div className="mt-1 text-[11px] tracking-[0.14em] uppercase text-gray-500 dark:text-gray-400">
                  {(project as { stack?: string }).stack}
                </div>
              ) : null}
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-300 leading-relaxed">{project.description}</p>
              <div className="mt-4 flex flex-wrap items-center gap-2">
                <Link
                  href={`/contact?project=${encodeURIComponent(project.title)}`}
                  className="inline-flex rounded-full px-3 py-1.5 text-xs font-semibold brand-button"
                >
                  Contact
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>

      {otherProjects.length ? (
        <div className="w-full max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-10 pb-16">
          <div className="mb-5" data-reveal="fade-up">
            <h3 className="text-2xl sm:text-3xl font-semibold text-gray-900 dark:text-white">More Projects</h3>
            <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">Additional builds with clean architecture and practical workflows.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5" data-project-group="other">
            {otherProjects.map((project) => (
              <article
                key={project.title}
                data-project-card="true"
                className="group rounded-3xl border border-gray-200 bg-white/80 p-4 shadow-lg backdrop-blur dark:border-white/10 dark:bg-white/5"
              >
                <div className="relative h-52 w-full overflow-hidden rounded-2xl bg-gray-200 dark:bg-black/30">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover media-soft"
                    sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                  />
                </div>
                <h4 className="mt-4 text-lg font-semibold text-gray-900 dark:text-white">{project.title}</h4>
                {openDetails[project.title] ? (
                  <>
                    {"stack" in project ? (
                      <div className="mt-1 text-[11px] tracking-[0.14em] uppercase text-gray-500 dark:text-gray-400">
                        {(project as { stack?: string }).stack}
                      </div>
                    ) : null}
                    <p className="mt-2 text-sm text-gray-600 dark:text-gray-300 leading-relaxed">{project.description}</p>
                  </>
                ) : null}
                <div className="mt-4 flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => toggleDetails(project.title)}
                    className="inline-flex rounded-full px-3 py-1.5 text-xs font-semibold text-emerald-600 dark:text-cyan-300 border border-emerald-500/30 dark:border-cyan-400/30"
                  >
                    {openDetails[project.title] ? "Hide details" : "View details"}
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      ) : null}
    </section>
  );
};
