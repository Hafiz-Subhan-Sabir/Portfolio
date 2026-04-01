"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

type Msg = { role: "user" | "bot"; text: string };

const QUICK_TOPICS = [
  "What is your name?",
  "Can you briefly introduce yourself?",
  "How many years of experience do you have?",
  "What services do you offer?",
  "What technologies do you use?",
  "How do you estimate project cost?",
  "How long does a project usually take?",
  "Do you work solo or with teams?",
  "Can you redesign an existing website?",
  "Do you build full-stack apps?",
  "Do you handle deployment?",
  "Do you provide hosting and maintenance?",
  "How many revisions are included?",
  "How can we start working together?",
] as const;

const FALLBACK_TEXT =
  "Thanks for your question. I can share complete details through the contact page so I can respond based on your exact project needs.";

const containsAny = (q: string, terms: string[]): boolean => terms.some((t) => q.includes(t));

function getCustomReply(question: string): string {
  const q = question.toLowerCase().replace(/[^\w\s]/g, " ").replace(/\s+/g, " ").trim();

  if (containsAny(q, ["who are you", "about you", "introduce", "briefly introduce", "intro"])) {
    return "I am Hafiz Subhan, a Full-Stack Software Engineer. I build modern web products with clean UI, smooth interactions, and reliable backend systems.";
  }
  if (containsAny(q, ["your name", "what is your name", "name", "hafiz", "subhan"])) {
    return "My name is Hafiz Subhan.";
  }
  if (containsAny(q, ["experience", "how many years", "years of experience", "how long have you", "exp"])) {
    return "I have around 3+ years of practical development experience across freelance, personal, and team-based software projects.";
  }
  if (containsAny(q, ["service", "offer", "what do you do", "what can you do"])) {
    return "I offer portfolio websites, business websites, landing pages, dashboards, and full-stack product development. I also provide redesigns, API integrations, performance optimization, and deployment support.";
  }
  if (containsAny(q, ["skill", "tech stack", "technology", "stack", "react", "next", "python", "fastapi", "typescript"])) {
    return "My core stack includes React, Next.js, TypeScript, Tailwind CSS, Python, and FastAPI. I also work on secure authentication, APIs, AI integrations, and scalable architecture.";
  }
  if (containsAny(q, ["budget", "cost", "price", "charges", "pricing", "rate"])) {
    return "Pricing depends on scope, timeline, and feature complexity. After understanding your requirements, I share a clear estimate with a practical delivery plan.";
  }
  if (containsAny(q, ["timeline", "how long", "delivery", "take", "deadline", "duration"])) {
    return "Simple websites can be delivered quickly, while larger full-stack products need more time. I always provide a realistic timeline after reviewing your requirements.";
  }
  if (containsAny(q, ["solo", "team", "collaborat", "independent"])) {
    return "I work both independently and in team environments. I have delivered 10+ solo projects and collaborated on 20+ team projects.";
  }
  if (containsAny(q, ["redesign", "existing website", "improve my website", "revamp", "ui ux"])) {
    return "Yes. I can redesign your existing website to improve UI, responsiveness, performance, and overall user experience without losing your core content.";
  }
  if (containsAny(q, ["full stack", "fullstack", "backend", "api", "database", "authentication"])) {
    return "Yes, I build full-stack applications including frontend, backend APIs, authentication, database workflows, and production deployment support.";
  }
  if (containsAny(q, ["deploy", "deployment", "vercel", "pythonanywhere", "production", "server"])) {
    return "Yes, I handle deployment workflows and production setup for both frontend and backend systems.";
  }
  if (containsAny(q, ["hosting", "maintenan", "support", "after launch", "bug fix"])) {
    return "Yes. I provide hosting setup guidance and maintenance support, including updates, monitoring, and issue fixes.";
  }
  if (containsAny(q, ["revision", "changes", "update", "edits"])) {
    return "Revisions are absolutely possible. I usually include practical revision rounds and keep communication clear so the final result matches your expectations.";
  }
  if (containsAny(q, ["communication", "update frequency", "progress", "milestone", "report"])) {
    return "I keep communication simple and consistent with regular progress updates, clear milestones, and quick feedback loops.";
  }
  if (containsAny(q, ["start", "hire", "work together", "contact", "begin", "onboard"])) {
    return "You can start by sharing your project idea through the contact page. I will review it and reply with scope, timeline, and next steps.";
  }
  if (containsAny(q, ["project", "portfolio", "case study"])) {
    return "My portfolio includes product-focused, full-stack, and AI-integrated projects with responsive UI, clean architecture, and practical workflows.";
  }
  return FALLBACK_TEXT;
}

export function ChatBot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([
    {
      role: "bot",
      text:
        "Welcome. I would be happy to help. You can ask about my services, tech stack, budget process, timeline, solo/team collaboration, deployment, maintenance, or project workflow.",
    },
  ]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const lastBot = useMemo(() => {
    const bots = messages.filter((m) => m.role === "bot");
    return (bots.length ? bots[bots.length - 1].text : "") ?? "";
  }, [messages]);

  const send = (forcedText?: string) => {
    const text = (forcedText ?? input).trim();
    if (!text) return;
    const reply = getCustomReply(text);
    setMessages((m) => [...m, { role: "user", text }, { role: "bot", text: reply }]);
    setInput("");
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages]);

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-5 sm:right-5 z-[70]">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="brand-button rounded-full px-5 py-3 text-sm font-semibold shadow-xl shadow-black/25 ring-1 ring-white/20 transition hover:scale-[1.02]"
        aria-label="Open chat"
      >
        Chat
      </button>

      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.98 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="mt-3 w-[calc(100vw-1.5rem)] max-w-[390px] h-[min(78vh,640px)] flex flex-col overflow-hidden rounded-3xl border border-gray-200 bg-white/90 backdrop-blur-2xl shadow-2xl dark:border-white/10 dark:bg-[#060612]/85"
          >
            <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200/70 dark:border-white/10 bg-gradient-to-r from-emerald-500/10 via-cyan-500/10 to-transparent">
              <div>
                <div className="text-sm font-semibold text-gray-900 dark:text-white">Ask Subhan</div>
                <div className="mt-0.5 text-[11px] text-gray-500 dark:text-gray-400">
                  Portfolio assistant
                </div>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="text-sm font-semibold text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
              >
                Close
              </button>
            </div>

            <div className="flex-1 overflow-auto px-4 py-3 space-y-2">
              {messages.map((m, i) => (
                <div
                  key={i}
                  className={[
                    "rounded-2xl px-3 py-2.5 text-sm leading-relaxed shadow-sm",
                    m.role === "user"
                      ? "ml-auto bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 text-gray-900 dark:text-white border border-emerald-500/25"
                      : "mr-auto bg-gray-100/85 text-gray-800 dark:bg-white/5 dark:text-gray-200 border border-gray-200/70 dark:border-white/10",
                    "max-w-[85%]",
                  ].join(" ")}
                >
                  {m.text}
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            <div className="px-4 py-3 border-t border-gray-200/70 dark:border-white/10 bg-gradient-to-b from-transparent to-emerald-500/[0.03] dark:to-cyan-500/[0.04]">
              <div className="mb-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-gray-500 dark:text-gray-400">
                Suggested questions
              </div>
              <div className="mb-1 text-[11px] text-gray-500 dark:text-gray-400">
                Scroll to see more
              </div>
              <div className="mb-3 max-h-[120px] overflow-y-auto pr-1">
                {QUICK_TOPICS.map((topic) => (
                  <button
                    key={topic}
                    type="button"
                    onClick={() => send(topic)}
                    className="mr-2 mb-2 inline-flex rounded-full border border-emerald-500/35 dark:border-cyan-400/35 px-3 py-1.5 text-[11px] font-semibold text-emerald-700 dark:text-cyan-200 hover:bg-emerald-500/10 dark:hover:bg-cyan-400/10 transition"
                  >
                    {topic}
                  </button>
                ))}
              </div>
              <div className="flex gap-2">
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") send();
                  }}
                  placeholder="Type a message..."
                  className="h-11 flex-1 rounded-2xl border border-gray-200 bg-white/95 px-3 text-sm outline-none focus:border-emerald-400 dark:border-white/10 dark:bg-black/35 dark:text-white dark:focus:border-cyan-400"
                />
                <button
                  type="button"
                  onClick={() => send()}
                  className="h-11 rounded-2xl px-4 text-sm font-semibold brand-button shadow-md"
                >
                  Send
                </button>
              </div>
              {lastBot === FALLBACK_TEXT ? (
                <div className="mt-3 rounded-2xl border border-emerald-400/30 dark:border-cyan-400/40 bg-gradient-to-r from-emerald-500/10 to-cyan-500/10 px-3 py-2.5">
                  <div className="text-xs text-gray-600 dark:text-gray-300">
                    Need a custom answer for your project?
                  </div>
                  <Link
                    href="/contact"
                    className="mt-2 inline-flex rounded-full px-3 py-1.5 text-xs font-semibold bg-gradient-to-r from-emerald-400 to-cyan-400 text-black shadow-[0_0_18px_rgba(34,211,238,0.35)]"
                  >
                    Contact me
                  </Link>
                </div>
              ) : null}
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

