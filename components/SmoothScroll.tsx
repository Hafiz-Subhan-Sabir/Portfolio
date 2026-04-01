'use client';

import { useEffect, useLayoutEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';

type LenisLike = {
  destroy: () => void;
  raf: (t: number) => void;
  scrollTo: (target: string | number | HTMLElement, options?: { offset?: number; immediate?: boolean }) => void;
};

export function SmoothScroll() {
  const pathname = usePathname();
  const lenisRef = useRef<LenisLike | null>(null);
  const rafRef = useRef<number | null>(null);

  const getAnchorOffset = (href: string): number => {
    return href === '#about-me' ? -72 : -88;
  };

  useEffect(() => {
    let mounted = true;

    (async () => {
      const Lenis = (await import('lenis')).default;
      if (!mounted) return;

      // Optional: Sync Lenis with GSAP ScrollTrigger if present.
      // (Keeps pinned sections and scroll animations stable.)
      let ScrollTrigger: any = null;
      try {
        const gsapMod = await import('gsap');
        const stMod = await import('gsap/ScrollTrigger');
        const gsap = (gsapMod as any).default ?? gsapMod;
        ScrollTrigger = (stMod as any).ScrollTrigger ?? (stMod as any).default;
        if (ScrollTrigger) gsap.registerPlugin(ScrollTrigger);
      } catch {
        ScrollTrigger = null;
      }

      const lenis: LenisLike = new Lenis({
        duration: 1.15,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        touchMultiplier: 1.8,
      }) as unknown as LenisLike;

      lenisRef.current = lenis;

      const raf = (time: number) => {
        lenis.raf(time);
        if (ScrollTrigger) ScrollTrigger.update();
        rafRef.current = requestAnimationFrame(raf);
      };
      rafRef.current = requestAnimationFrame(raf);

      if (ScrollTrigger) {
        try {
          (lenis as any).on?.('scroll', () => ScrollTrigger.update());
          ScrollTrigger.refresh();
        } catch {
          // ignore
        }
      }

      const scrollToAnchor = (href: string, immediate = false) => {
        if (!href || href === '#') return;
        const el = document.querySelector(href) as HTMLElement | null;
        if (!el) return;
        lenis.scrollTo(el, { offset: getAnchorOffset(href), immediate });
      };

      const onClick = (e: MouseEvent) => {
        if (e.defaultPrevented) return;
        const target = e.target as HTMLElement | null;
        const a = target?.closest?.('a[href^="#"]') as HTMLAnchorElement | null;
        if (!a) return;

        const href = a.getAttribute('href');
        if (!href || href === '#') return;

        e.preventDefault();
        scrollToAnchor(href, false);
      };

      document.addEventListener('click', onClick);
      (lenis as any).__anchorClickHandler = onClick;

      const navEntry = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming | undefined;
      const isReload = navEntry?.type === 'reload';

      // On reload, always start from top as requested.
      if (isReload) {
        lenis.scrollTo(0, { immediate: true });
        if (window.location.hash) {
          history.replaceState(null, '', window.location.pathname);
        }
      } else {
        // Restore cross-page anchor navigation quickly (e.g. /contact -> /#timeline).
        const pending = sessionStorage.getItem('pending_anchor');
        const initialHash = pending || window.location.hash || '';
        if (initialHash && initialHash.startsWith('#')) {
          let attempts = 0;
          const maxAttempts = 24;
          const tryScroll = () => {
            const el = document.querySelector(initialHash) as HTMLElement | null;
            if (el) {
              scrollToAnchor(initialHash, true);
              requestAnimationFrame(() => scrollToAnchor(initialHash, true));
              if (pending) {
                sessionStorage.removeItem('pending_anchor');
              }
              return;
            }
            attempts += 1;
            if (attempts < maxAttempts) requestAnimationFrame(tryScroll);
          };
          tryScroll();
        }
      }
    })();

    return () => {
      mounted = false;
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = null;

      const lenis = lenisRef.current as any;
      const onClick = lenis?.__anchorClickHandler as ((e: MouseEvent) => void) | undefined;
      if (onClick) document.removeEventListener('click', onClick);

      lenisRef.current?.destroy();
      lenisRef.current = null;
    };
  }, []);

  useLayoutEffect(() => {
    if (pathname !== '/') return;
    const lenis = lenisRef.current;
    if (!lenis) return;

    const pending = sessionStorage.getItem('pending_anchor');
    const targetHash = pending || window.location.hash || '';
    if (!targetHash || !targetHash.startsWith('#')) return;

    let attempts = 0;
    let rafId: number | null = null;
    const maxAttempts = 42;
    const tryScroll = () => {
      const el = document.querySelector(targetHash) as HTMLElement | null;
      if (el && lenisRef.current) {
        const offset = getAnchorOffset(targetHash);
        // Apply scroll quickly and re-apply once to survive post-hydration adjustments.
        lenisRef.current.scrollTo(el, { offset, immediate: true });
        requestAnimationFrame(() => {
          lenisRef.current?.scrollTo(el, { offset, immediate: true });
        });
        window.setTimeout(() => {
          lenisRef.current?.scrollTo(el, { offset, immediate: true });
        }, 80);
        if (pending) sessionStorage.removeItem('pending_anchor');
        return;
      }
      attempts += 1;
      if (attempts < maxAttempts) {
        rafId = requestAnimationFrame(tryScroll);
      }
    };
    tryScroll();

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [pathname]);

  return null;
}

