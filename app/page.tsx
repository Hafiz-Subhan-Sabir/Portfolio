import { Hero } from "@/components/main/hero";
import { Projects } from "@/components/main/projects";
import { ResumeSection } from "@/components/main/resume-section";
import { SkillsPinned } from "@/components/main/skills-pinned";
import { TestimonialsEducation } from "@/components/main/testimonials-education";
import { Timeline } from "@/components/main/timeline";

export default function Home() {
  return (
    <main className="h-full w-full">
      <div className="flex flex-col gap-20">
        <Hero />
        <SkillsPinned />
        <div data-reveal="fade-right" data-reveal-duration="0.9" data-reveal-delay="0.08">
          <Timeline />
        </div>
        <div data-reveal="fade-up" data-reveal-duration="0.92" data-reveal-delay="0.12">
          <ResumeSection />
        </div>
        <div data-reveal="fade-left" data-reveal-duration="0.92" data-reveal-delay="0.16">
          <TestimonialsEducation />
        </div>
        <div data-reveal="fade-right" data-reveal-duration="0.95" data-reveal-delay="0.2">
          <Projects />
        </div>
      </div>
    </main>
  );
}

