import type { Metadata } from "next";

export const siteConfig: Metadata = {
  metadataBase: new URL("https://hafiz-subhan-portfolio.vercel.app"),
  title: "Hafiz Subhan | Full-Stack Software Engineer Portfolio",
  description:
    "Full-Stack Software Engineer portfolio of Hafiz Subhan. React, Next.js, TypeScript, Python, FastAPI, AI integrations, and production-ready web apps.",
  icons: {
    icon: "/vector.png",
    shortcut: "/vector.png",
    apple: "/vector.png",
  },
  keywords: [
    "hafiz subhan",
    "software engineer portfolio",
    "full-stack software engineer",
    "full stack developer",
    "react developer",
    "next.js developer",
    "typescript developer",
    "python developer",
    "fastapi developer",
    "ai integration engineer",
    "web developer",
    "portfolio",
    "resume",
    "cv",
    "frontend engineer",
    "backend engineer",
    "api development",
    "jwt authentication",
    "rbac",
    "computer vision projects",
    "tailwindcss",
  ] as string[],
  authors: {
    name: "Hafiz Subhan",
    url: "https://hafiz-subhan-portfolio.vercel.app",
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Hafiz Subhan | Full-Stack Software Engineer",
    description:
      "Portfolio and resume-focused profile showcasing React, Next.js, TypeScript, Python, FastAPI, AI integrations, and production-ready projects.",
    url: "https://hafiz-subhan-portfolio.vercel.app",
    siteName: "Hafiz Subhan Portfolio",
    type: "website",
    images: [
      {
        url: "/port.png",
        width: 1200,
        height: 630,
        alt: "Hafiz Subhan portfolio preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Hafiz Subhan | Full-Stack Software Engineer",
    description:
      "React, Next.js, TypeScript, Python, FastAPI, and AI-integrated web applications.",
    images: ["/port.png"],
  },
} as const;

