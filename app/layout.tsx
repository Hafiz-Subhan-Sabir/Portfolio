import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import type { PropsWithChildren } from "react";

import { Footer } from "@/components/main/footer";
import { ChatBot } from "@/components/main/chatbot";
import { CustomCursor } from "@/components/main/custom-cursor";
import { Navbar } from "@/components/main/navbar";
import { SmoothScroll } from "@/components/SmoothScroll";
import { ThemeProvider } from "@/components/main/ThemeProvider";
import { RevealEngine } from "@/components/motion/RevealEngine";
import { siteConfig } from "@/config";
import { cn } from "@/lib/utils";

import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const viewport: Viewport = {
  themeColor: "#030014",
};

export const metadata: Metadata = siteConfig;
const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Hafiz Subhan",
  jobTitle: "Full-Stack Software Engineer",
  url: "https://hafiz-subhan-portfolio.vercel.app",
  image: "https://hafiz-subhan-portfolio.vercel.app/port.png",
  sameAs: [
    "https://github.com/Hafiz-Subhan-Sabir",
    "https://www.linkedin.com/in/hafiz-subhan-soft/",
  ],
  knowsAbout: [
    "React",
    "Next.js",
    "TypeScript",
    "Python",
    "FastAPI",
    "AI integrations",
    "JWT authentication",
    "RBAC",
  ],
};
const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Hafiz Subhan Portfolio",
  url: "https://hafiz-subhan-portfolio.vercel.app",
};

const themeScript = `
(function(){
  var t = localStorage.getItem('portfolio_theme');
  var theme = (t === 'light' || t === 'dark') ? t : 'dark';
  document.documentElement.classList.remove('light','dark');
  document.documentElement.classList.add(theme);
})();
`;

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en" suppressHydrationWarning data-scroll-behavior="smooth">
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
      </head>
      <body
        className={cn(
          "min-h-screen flex flex-col bg-gray-50 text-gray-900 dark:bg-[#030014] dark:text-gray-100 overflow-y-scroll overflow-x-clip transition-colors",
          inter.className
        )}
      >
        <ThemeProvider>
          <SmoothScroll />
          <CustomCursor />
          <RevealEngine />
          <Navbar />
          <div className="flex-1 flex flex-col min-w-0">
            {children}
          </div>
          <ChatBot />
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
