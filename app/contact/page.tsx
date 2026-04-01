import type { Metadata } from "next";

import { ContactPage } from "@/components/main/contact-page";

export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "Contact Hafiz Subhan | Full-Stack Software Engineer",
  description:
    "Contact Hafiz Subhan for full-stack web development, React/Next.js projects, AI integrations, and portfolio/resume inquiries.",
  alternates: {
    canonical: "/contact",
  },
};

export default function Contact() {
  return <ContactPage />;
}

