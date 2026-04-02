'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';

import { CONTACT_EMAIL, PROJECTS, SOCIALS } from '@/constants';
import { MotionIn } from '@/components/motion/MotionIn';
import { API_BASE_URL, apiUrl } from '@/lib/api';

const CONTACT_REQUEST_TIMEOUT_MS = 70000;
const BACKEND_WARMUP_TIMEOUT_MS = 20000;

function toReadableError(value: unknown): string {
  if (!value) return '';
  if (typeof value === 'string') return value;
  if (Array.isArray(value)) {
    return value
      .map((item) => toReadableError(item))
      .filter(Boolean)
      .join('; ');
  }
  if (typeof value === 'object') {
    const obj = value as Record<string, unknown>;
    if (typeof obj.detail === 'string') return obj.detail;
    if (typeof obj.message === 'string') return obj.message;
    if (Array.isArray(obj.detail)) {
      return toReadableError(obj.detail);
    }
    return Object.entries(obj)
      .map(([k, v]) => `${k}: ${toReadableError(v) || String(v)}`)
      .join(', ');
  }
  return String(value);
}

function buildMailto({
  to,
  subject,
  body,
}: {
  to: string;
  subject: string;
  body: string;
}) {
  const params = new URLSearchParams();
  params.set('subject', subject);
  params.set('body', body);
  return `mailto:${to}?${params.toString()}`;
}

export function ContactPage() {
  const searchParams = useSearchParams();
  const qpProject = searchParams?.get('project') ?? undefined;

  const projectOptions = useMemo(() => {
    const set = new Set(PROJECTS.map((p) => p.title));
    return ['General', ...Array.from(set)];
  }, []);

  const [name, setName] = useState('');
  const [fromEmail, setFromEmail] = useState('');
  const [project, setProject] = useState(qpProject ?? 'General');
  const [projectMenuOpen, setProjectMenuOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [copied, setCopied] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitState, setSubmitState] = useState<'idle' | 'success' | 'error'>('idle');
  const [submitMessage, setSubmitMessage] = useState('');
  const projectMenuRef = useRef<HTMLDivElement | null>(null);

  const messageTemplates = useMemo(
    () => [
      'I want a portfolio website with premium UI and smooth interactions.',
      'I need a landing page redesign with better performance and conversion.',
      'I want full-stack development support for a startup MVP project.',
    ],
    []
  );

  const mailto = useMemo(() => {
    const subject = project && project !== 'General' ? `Project inquiry: ${project}` : 'Portfolio inquiry';
    const body =
      `Hi Subhan,\n\n` +
      (project && project !== 'General' ? `I’m interested in: ${project}\n\n` : '') +
      `Name: ${name || '(your name)'}\n` +
      `Email: ${fromEmail || '(your email)'}\n\n` +
      `Message:\n${message || '(write your message here)'}\n\n` +
      `— Sent from your portfolio website`;

    return buildMailto({
      to: CONTACT_EMAIL,
      subject,
      body,
    });
  }, [fromEmail, message, name, project]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      if (projectMenuRef.current && !projectMenuRef.current.contains(target)) {
        setProjectMenuOpen(false);
      }
    };
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setProjectMenuOpen(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    window.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      window.removeEventListener('keydown', handleEscape);
    };
  }, []);

  useEffect(() => {
    // Warm up free-tier backend so first submit is less likely to timeout.
    const endpoint = apiUrl('/health');
    const controller = new AbortController();
    const timeoutId = window.setTimeout(() => controller.abort(), BACKEND_WARMUP_TIMEOUT_MS);
    fetch(endpoint, {
      method: 'GET',
      signal: controller.signal,
      cache: 'no-store',
    })
      .catch(() => {
        // Ignore warmup failures; submit flow still handles user-facing errors.
      })
      .finally(() => {
        window.clearTimeout(timeoutId);
      });
    return () => {
      controller.abort();
      window.clearTimeout(timeoutId);
    };
  }, []);

  const handleSubmit = async () => {
    const trimmedName = name.trim();
    const trimmedEmail = fromEmail.trim();
    const trimmedMessage = message.trim();
    if (!trimmedName || !trimmedEmail || !trimmedMessage) {
      setSubmitState('error');
      setSubmitMessage('Please fill in name, email, and message.');
      return;
    }

    setSubmitting(true);
    setSubmitState('idle');
    setSubmitMessage('');
    try {
      const endpoint = apiUrl('/api/contact');
      const controller = new AbortController();
      const timeoutId = window.setTimeout(() => controller.abort(), CONTACT_REQUEST_TIMEOUT_MS);
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        signal: controller.signal,
        body: JSON.stringify({
          name: trimmedName,
          email: trimmedEmail,
          project,
          message: trimmedMessage,
        }),
      });
      window.clearTimeout(timeoutId);
      const contentType = res.headers.get('content-type') || '';
      const raw = await res.text();
      let data: { ok?: boolean; message?: string; detail?: string } = {};
      if (contentType.includes('application/json')) {
        data = JSON.parse(raw) as { ok?: boolean; message?: string; detail?: string };
      } else {
        // Most common case: endpoint returns HTML (wrong base URL / reverse-proxy page / frontend route).
        const looksHtml = raw.trim().startsWith('<!DOCTYPE') || raw.trim().startsWith('<html');
        if (res.status === 404) {
          throw new Error(
            `Endpoint not found at ${endpoint} (404). Another app may be running on this port, or FastAPI is not serving /api/contact.`
          );
        }
        if (looksHtml) {
          throw new Error(
            `Received HTML instead of JSON from ${endpoint}. Check NEXT_PUBLIC_API_BASE_URL and ensure it points to FastAPI.`
          );
        }
        throw new Error(`Unexpected non-JSON response from ${endpoint}.`);
      }
      if (!res.ok || !data.ok) {
        const readable = toReadableError(data.detail) || toReadableError(data.message);
        throw new Error(readable || 'Unable to send right now.');
      }
      setSubmitState('success');
      setSubmitMessage('Message sent successfully. I will get back to you soon.');
      setMessage('');
    } catch (err) {
      const msg = err instanceof Error ? err.message : '';
      const isBackendDown = msg.toLowerCase().includes('failed to fetch');
      const isAborted = err instanceof DOMException && err.name === 'AbortError';
      const isSmtpMissing = msg.toLowerCase().includes('smtp credentials are missing');
      setSubmitState('error');
      if (isAborted) {
        setSubmitMessage(
          `Request timed out after ${Math.round(
            CONTACT_REQUEST_TIMEOUT_MS / 1000
          )}s. Render free backend may be cold-starting. Please wait 10-20 seconds and try again.`
        );
      } else if (isBackendDown) {
        setSubmitMessage(`Backend is not reachable at ${API_BASE_URL}. Check NEXT_PUBLIC_API_BASE_URL.`);
      } else if (isSmtpMissing) {
        setSubmitMessage('Backend is running but SMTP is not configured. Set SMTP_USER and SMTP_PASSWORD in backend environment.');
      } else if (msg) {
        setSubmitMessage(`Could not send right now: ${msg}`);
      } else {
        setSubmitMessage('Could not send from server right now. Use the email fallback below.');
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="w-full">
      <section className="relative overflow-hidden pt-[110px] pb-16 min-h-[calc(100vh-72px)]">
        {/* background glow */}
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute -top-24 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-emerald-400/20 blur-3xl dark:bg-emerald-400/10" />
          <div className="absolute top-44 right-[-120px] h-[420px] w-[420px] rounded-full bg-cyan-400/20 blur-3xl dark:bg-cyan-400/10" />
        </div>

        <div className="mx-auto w-full max-w-5xl px-4 sm:px-6">
          <MotionIn>
            <div className="flex flex-col gap-4">
              <div className="inline-flex items-center gap-2 self-start rounded-full border border-gray-200 bg-white/70 px-4 py-2 text-sm font-semibold text-gray-700 backdrop-blur dark:border-white/10 dark:bg-white/5 dark:text-gray-200">
                <span className="h-2 w-2 rounded-full bg-emerald-500" />
                Available for work
              </div>

              <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-gray-900 dark:text-white">
                Let&apos;s work together.
              </h1>
              <p className="max-w-2xl text-base sm:text-lg text-gray-600 dark:text-gray-300">
                Send your project details directly. I receive your message by email, and I usually respond within 24 hours.
              </p>
            </div>
          </MotionIn>

          <div className="mt-10 grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-8">
            <MotionIn delay={0.05}>
              <div className="rounded-3xl border border-gray-200 bg-white/80 backdrop-blur p-6 sm:p-8 shadow-xl dark:border-white/10 dark:bg-white/5 dark:shadow-[#1a0a2e]/50">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div className="min-w-0">
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Contact</h2>
                    <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
                      Choose a project (optional) and write a quick message.
                    </p>
                  </div>
                  <Link
                    href="/#projects"
                    className="text-sm font-semibold text-emerald-600 hover:underline dark:text-cyan-300"
                  >
                    Back to projects →
                  </Link>
                </div>

                <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <label className="flex flex-col gap-2">
                    <span className="text-sm font-semibold text-gray-700 dark:text-gray-200">Your name</span>
                    <input
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Ali Khan"
                      className="h-11 rounded-xl border border-gray-200 bg-white px-4 text-gray-900 outline-none ring-0 focus:border-violet-400 dark:border-white/10 dark:bg-black/20 dark:text-white dark:focus:border-cyan-400"
                    />
                  </label>
                  <label className="flex flex-col gap-2">
                    <span className="text-sm font-semibold text-gray-700 dark:text-gray-200">Your email</span>
                    <input
                      value={fromEmail}
                      onChange={(e) => setFromEmail(e.target.value)}
                      placeholder="e.g. you@email.com"
                      inputMode="email"
                      className="h-11 rounded-xl border border-gray-200 bg-white px-4 text-gray-900 outline-none ring-0 focus:border-violet-400 dark:border-white/10 dark:bg-black/20 dark:text-white dark:focus:border-cyan-400"
                    />
                  </label>
                  <label className="flex flex-col gap-2 sm:col-span-2">
                    <span className="text-sm font-semibold text-gray-700 dark:text-gray-200">Project</span>
                    <div ref={projectMenuRef} className="relative">
                      <button
                        type="button"
                        onClick={() => setProjectMenuOpen((v) => !v)}
                        className="h-11 w-full rounded-xl border border-gray-200 bg-white px-4 text-left text-gray-900 outline-none ring-0 transition focus:border-violet-400 dark:border-white/10 dark:bg-black/20 dark:text-white dark:focus:border-cyan-400"
                      >
                        <span className="truncate block pr-6">{project}</span>
                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500 dark:text-gray-300">▼</span>
                      </button>
                      {projectMenuOpen ? (
                        <motion.div
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.16, ease: 'easeOut' }}
                          className="absolute z-20 mt-2 w-full max-h-64 overflow-auto rounded-xl border border-gray-200 bg-white shadow-xl dark:border-white/10 dark:bg-[#110a22]"
                        >
                          {projectOptions.map((p) => {
                            const isActive = p === project;
                            return (
                              <button
                                key={p}
                                type="button"
                                onClick={() => {
                                  setProject(p);
                                  setProjectMenuOpen(false);
                                }}
                                className={`w-full px-4 py-2.5 text-left text-sm transition ${
                                  isActive
                                    ? 'bg-emerald-500/15 text-emerald-700 dark:text-cyan-200'
                                    : 'text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-white/10'
                                }`}
                              >
                                {p}
                              </button>
                            );
                          })}
                        </motion.div>
                      ) : null}
                    </div>
                  </label>
                  <label className="flex flex-col gap-2 sm:col-span-2">
                    <span className="text-sm font-semibold text-gray-700 dark:text-gray-200">Message</span>
                    <textarea
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Tell me what you want to build, your timeline, expected budget, and any links."
                      rows={6}
                      className="resize-none rounded-xl border border-gray-200 bg-white px-4 py-3 text-gray-900 outline-none ring-0 focus:border-violet-400 dark:border-white/10 dark:bg-black/20 dark:text-white dark:focus:border-cyan-400"
                    />
                    <div className="flex flex-wrap gap-2">
                      {messageTemplates.map((template) => (
                        <button
                          key={template}
                          type="button"
                          onClick={() => setMessage(template)}
                          className="rounded-full border border-emerald-400/35 px-3 py-1 text-xs font-semibold text-emerald-700 hover:bg-emerald-500/10 dark:border-cyan-400/35 dark:text-cyan-200 dark:hover:bg-cyan-400/10"
                        >
                          Use template
                        </button>
                      ))}
                    </div>
                  </label>
                </div>

                <div className="mt-6 flex flex-col sm:flex-row gap-3">
                  <button
                    type="button"
                    onClick={handleSubmit}
                    disabled={submitting}
                    className="inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-semibold brand-button transition disabled:opacity-70"
                  >
                    {submitting ? 'Sending...' : 'Send message'}
                  </button>
                  <a
                    href={mailto}
                    className="inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-semibold border border-gray-300 bg-white/70 hover:bg-white dark:bg-white/5 dark:hover:bg-white/10 dark:border-white/10 transition"
                  >
                    Open email app
                  </a>
                  <button
                    type="button"
                    onClick={async () => {
                      try {
                        await navigator.clipboard.writeText(CONTACT_EMAIL);
                        setCopied(true);
                        window.setTimeout(() => setCopied(false), 1400);
                      } catch {
                        setCopied(false);
                      }
                    }}
                    className="inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-semibold border border-gray-300 bg-white/70 hover:bg-white dark:bg-white/5 dark:hover:bg-white/10 dark:border-white/10 transition"
                  >
                    {copied ? 'Copied!' : 'Copy email'}
                  </button>
                </div>
                {submitState !== 'idle' ? (
                  <div
                    className={`mt-4 rounded-xl px-4 py-3 text-sm ${
                      submitState === 'success'
                        ? 'border border-emerald-400/40 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300'
                        : 'border border-rose-400/40 bg-rose-500/10 text-rose-700 dark:text-rose-300'
                    }`}
                  >
                    {submitMessage}
                  </div>
                ) : null}

                <div className="mt-6 rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-600 dark:border-white/10 dark:bg-white/5 dark:text-gray-300">
                  Tip: if your email app doesn’t open, just copy my email and send a message directly.
                </div>
              </div>
            </MotionIn>

            <MotionIn delay={0.1}>
              <div className="rounded-3xl border border-gray-200 bg-white/70 backdrop-blur p-6 shadow-xl dark:border-white/10 dark:bg-white/5 dark:shadow-[#1a0a2e]/50">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Elsewhere</h3>
                <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
                  Prefer socials? I’m active here.
                </p>

                <div className="mt-5 flex flex-col gap-3">
                  {SOCIALS.map(({ link, name, icon: Icon }) => (
                    <Link
                      key={name}
                      href={link}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="group flex items-center justify-between rounded-2xl border border-gray-200 bg-white/70 px-4 py-3 hover:bg-white transition dark:border-white/10 dark:bg-white/5 dark:hover:bg-white/10"
                    >
                      <div className="flex items-center gap-3">
                        <div className="grid place-items-center h-10 w-10 rounded-xl bg-gray-100 text-gray-800 dark:bg-white/10 dark:text-white">
                          <Icon className="h-5 w-5" />
                        </div>
                        <div className="text-sm font-semibold text-gray-900 dark:text-white">{name}</div>
                      </div>
                      <span className="text-sm text-gray-500 group-hover:text-emerald-600 dark:text-gray-400 dark:group-hover:text-cyan-300">
                        Open →
                      </span>
                    </Link>
                  ))}
                </div>

                <motion.div
                  className="mt-6 rounded-2xl border border-gray-200 bg-gradient-to-r from-emerald-500/10 to-cyan-500/10 p-4 dark:border-white/10"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, ease: 'easeOut' }}
                >
                  <div className="text-sm font-semibold text-gray-900 dark:text-white">Response time</div>
                  <div className="mt-1 text-sm text-gray-600 dark:text-gray-300">
                    Usually within 24 hours.
                  </div>
                </motion.div>
              </div>
            </MotionIn>
          </div>

          {/* Scroll content so the page doesn't "stop" */}
          <div className="mt-14 grid grid-cols-1 lg:grid-cols-3 gap-4">
            {[
              {
                title: '1) Tell me your goal',
                text: 'A short message is enough: what you want, deadline, and any reference links.',
              },
              {
                title: '2) I reply with a plan',
                text: 'You’ll get a clear scope, timeline, and next steps (fast + honest).',
              },
              {
                title: '3) Build + polish',
                text: 'I focus on clean UI, smooth motion, and performance that feels premium.',
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-3xl border border-gray-200 bg-white/70 backdrop-blur p-6 transition hover:-translate-y-0.5 hover:shadow-lg dark:border-white/10 dark:bg-white/5"
              >
                <div className="text-sm font-semibold brand-gradient-text">{item.title}</div>
                <div className="mt-2 text-sm text-gray-600 dark:text-gray-300">{item.text}</div>
              </div>
            ))}
          </div>

          <div className="mt-10">
            <div className="rounded-3xl border border-gray-200 bg-white/70 backdrop-blur p-6 sm:p-8 dark:border-white/10 dark:bg-white/5">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Quick FAQ</h3>
              <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  {
                    q: 'Do you work with small budgets?',
                    a: 'Yes. If scope is clear, we can ship a strong version fast and iterate.',
                  },
                  {
                    q: 'Can you redesign my existing site?',
                    a: 'Yes. I can keep your content and upgrade the UI, motion, and performance.',
                  },
                  {
                    q: 'Do you provide hosting?',
                    a: 'I can set up deployment and provide hosting + maintenance support.',
                  },
                  {
                    q: 'How fast can you start?',
                    a: 'Usually immediately. Send your requirements and I’ll confirm availability.',
                  },
                ].map((f) => (
                  <div
                    key={f.q}
                    className="rounded-2xl border border-gray-200 bg-white/70 p-5 transition hover:-translate-y-0.5 hover:shadow-lg dark:border-white/10 dark:bg-white/5"
                  >
                    <div className="text-sm font-semibold text-gray-900 dark:text-white">{f.q}</div>
                    <div className="mt-2 text-sm text-gray-600 dark:text-gray-300">{f.a}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

