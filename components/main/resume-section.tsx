"use client";

import { RESUME_DATA } from "@/constants";
import { MotionIn } from "@/components/motion/MotionIn";

export function ResumeSection() {
  const DownloadIcon = RESUME_DATA.downloadIcon;

  return (
    <section id="resume" className="relative w-full py-20 scroll-mt-24">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute top-8 left-1/2 h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-emerald-500/10 blur-3xl" />
        <div className="absolute bottom-0 right-[-120px] h-[360px] w-[360px] rounded-full bg-cyan-500/10 blur-3xl" />
      </div>
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
        <MotionIn>
          <div
            className="rounded-3xl border border-gray-200 bg-gradient-to-br from-white/90 via-white/80 to-emerald-50/70 p-6 sm:p-8 shadow-xl backdrop-blur dark:border-white/10 dark:bg-gradient-to-br dark:from-[#0f0b1f]/95 dark:via-[#120a22]/90 dark:to-[#06222a]/70"
            data-reveal="fade-up"
          >
            <p className="text-xs uppercase tracking-[0.2em] text-gray-500 dark:text-cyan-300/80" data-reveal="fade">
              Resume
            </p>
            <h2 className="mt-2 text-3xl sm:text-4xl font-semibold text-gray-900 dark:text-white">
              {RESUME_DATA.title}
            </h2>
            <p className="mt-4 max-w-3xl text-sm sm:text-base text-gray-600 dark:text-gray-300" data-reveal="fade-up">
              {RESUME_DATA.summary}
            </p>

            <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-5">
              <div
                data-reveal="fade-left"
                className="rounded-2xl border border-gray-200 bg-white/75 p-5 transition hover:-translate-y-1 hover:shadow-lg dark:border-white/10 dark:bg-white/5"
              >
                <h3 className="text-sm font-semibold uppercase tracking-[0.12em] text-gray-500 dark:text-cyan-200/80">
                  Target Roles
                </h3>
                <ul className="mt-3 space-y-2 text-sm text-gray-700 dark:text-gray-200" data-reveal="fade-up" data-reveal-stagger="0.06">
                  {RESUME_DATA.targetRoles.map((role, idx) => (
                    <li key={`${role}-${idx}`}>
                      - {role}
                    </li>
                  ))}
                </ul>
              </div>
              <div
                data-reveal="fade-right"
                className="rounded-2xl border border-gray-200 bg-white/75 p-5 transition hover:-translate-y-1 hover:shadow-lg dark:border-white/10 dark:bg-white/5"
              >
                <h3 className="text-sm font-semibold uppercase tracking-[0.12em] text-gray-500 dark:text-cyan-200/80">
                  Core Skills
                </h3>
                <p className="mt-3 text-sm text-gray-700 dark:text-gray-200">{RESUME_DATA.coreSkills}</p>
              </div>
            </div>

            <div
              data-reveal="fade-up"
              data-reveal-stagger="0.1"
              data-reveal-children="article"
              className="mt-5 rounded-2xl border border-gray-200 bg-white/75 p-5 dark:border-white/10 dark:bg-white/5"
            >
              <h3 className="text-sm font-semibold uppercase tracking-[0.12em] text-gray-500 dark:text-cyan-200/80">
                Experience
              </h3>
              <div className="mt-4 space-y-4">
                {RESUME_DATA.experience.map((exp) => (
                  <article key={exp.title}>
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <h4 className="text-base font-semibold text-gray-900 dark:text-white">{exp.title}</h4>
                      <span className="text-xs text-gray-500 dark:text-gray-400">{exp.period}</span>
                    </div>
                    <ul className="mt-2 space-y-1.5 text-sm text-gray-700 dark:text-gray-200">
                      {exp.bullets.map((bullet) => (
                        <li key={bullet}>- {bullet}</li>
                      ))}
                    </ul>
                  </article>
                ))}
              </div>
            </div>

            <div
              data-reveal="fade-up"
              className="mt-5 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-gray-200 bg-white/75 p-5 dark:border-white/10 dark:bg-white/5"
            >
              <div>
                <h3 className="text-sm font-semibold uppercase tracking-[0.12em] text-gray-500 dark:text-cyan-200/80">
                  Education
                </h3>
                <p className="mt-1 text-sm text-gray-700 dark:text-gray-200">{RESUME_DATA.education}</p>
              </div>
              <a
                href={RESUME_DATA.resumeLink}
                download
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold brand-button"
              >
                <DownloadIcon className="h-4 w-4" />
                {RESUME_DATA.resumeLinkLabel}
              </a>
            </div>
          </div>
        </MotionIn>
      </div>
    </section>
  );
}
