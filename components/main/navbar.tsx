'use client';

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

import { NAV_LINKS, SOCIALS } from "@/constants";
import { ThemeToggle } from "@/components/main/ThemeToggle";

export const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const handleNavClick = (href: string) => (e: React.MouseEvent) => {
    if (!href.startsWith("#")) return;
    // When we're not on the homepage, `#hash` won't exist on this route.
    // Route to `/#hash` so sections work from pages like `/contact`.
    if (pathname !== "/") {
      e.preventDefault();
      setIsMobileMenuOpen(false);
      if (typeof window !== "undefined") {
        sessionStorage.setItem("pending_anchor", href);
      }
      router.push(`/${href}`, { scroll: false });
    }
  };

  return (
    <div className="w-full h-[72px] fixed top-0 left-0 right-0 shadow-lg shadow-black/10 dark:shadow-black/40 bg-white/80 dark:bg-[#0c0b12]/80 backdrop-blur-xl z-50 px-3 sm:px-6 lg:px-10 border-b border-gray-200/70 dark:border-white/10">
      {/* Navbar Container */}
      <div className="relative w-full h-full flex items-center justify-between m-auto px-0 sm:px-2 min-w-0 overflow-hidden">
        {/* Logo + Name */}
        <div className="relative flex items-center min-w-0 flex-1 pr-2">
          <Link href="#about-me" className="flex items-center min-w-0">
            <Image
              src="/vector.png"
              alt="Hafiz Subhan"
              width={38}
              height={38}
              draggable={false}
              className="cursor-pointer object-contain h-8 w-auto sm:h-9 dark:invert-0"
              style={{ width: "auto" }}
            />
            <span className="md:hidden ml-2 max-w-[150px] text-sm max-[430px]:text-[13px] font-semibold text-gray-900 dark:text-white truncate">
              Hafiz Subhan
            </span>
            <div className="hidden md:flex font-semibold ml-[10px] text-gray-800 dark:text-gray-300">
              Hafiz Subhan
            </div>
          </Link>
        </div>

        {/* Web Navbar */}
        <div className="hidden md:flex w-[740px] h-full flex-row items-center justify-between md:mr-6 lg:mr-10">
          <div className="flex items-center justify-between gap-5 w-full h-auto border border-gray-300/60 dark:border-white/10 bg-white/55 dark:bg-white/5 mr-[15px] px-[24px] py-[10px] rounded-full text-gray-700 dark:text-gray-200">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.title}
                href={link.link}
                className="nav-link-minimal cursor-pointer text-[10px] lg:text-[11px] uppercase tracking-[0.22em] lg:tracking-[0.24em] whitespace-nowrap hover:text-emerald-600 dark:hover:text-[#f7e295] transition"
                onClick={handleNavClick(link.link)}
              >
                {link.title}
              </Link>
            ))}
          </div>
        </div>

        <div className="hidden md:flex flex-row items-center gap-4">
          <ThemeToggle />
          {SOCIALS.map(({ link, name, icon: Icon }) => (
            <Link
              href={link}
              target="_blank"
              rel="noreferrer noopener"
              key={name}
            >
              <Icon className="h-6 w-6 text-gray-700 dark:text-white" />
            </Link>
          ))}
        </div>

        <div className="md:hidden flex items-center gap-1.5 shrink-0">
          <button
            className="grid place-items-center h-9 w-9 max-[430px]:h-8 max-[430px]:w-8 rounded-lg border border-gray-300/70 dark:border-white/15 bg-white/70 dark:bg-white/5 text-gray-800 dark:text-white focus:outline-none text-2xl max-[430px]:text-xl leading-none"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Open menu"
          >
            ☰
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="absolute top-[72px] left-0 w-full bg-white dark:bg-[#030014] border-b border-gray-200 dark:border-transparent p-4 flex flex-col items-center text-gray-700 dark:text-gray-300 md:hidden">
          <div className="mb-4">
            <ThemeToggle />
          </div>
          {/* Links */}
          <div className="flex flex-col items-center gap-4">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.title}
                href={link.link}
                className="cursor-pointer hover:text-emerald-600 dark:hover:text-[#f7e295] transition text-center"
                onClick={(e) => {
                  handleNavClick(link.link)(e);
                  setIsMobileMenuOpen(false);
                }}
              >
                {link.title}
              </Link>
            ))}
          </div>

          {/* Social Icons */}
          <div className="flex justify-center gap-6 mt-6">
            {SOCIALS.map(({ link, name, icon: Icon }) => (
              <Link
                href={link}
                target="_blank"
                rel="noreferrer noopener"
                key={name}
              >
                <Icon className="h-8 w-8 text-gray-700 dark:text-white" />
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

