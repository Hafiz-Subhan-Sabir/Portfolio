'use client';

import { useEffect, useState } from 'react';

const STORAGE_KEY = 'portfolio_theme';
type Theme = 'light' | 'dark';

function getStoredTheme(): Theme {
  if (typeof window === 'undefined') return 'dark';
  const t = localStorage.getItem(STORAGE_KEY);
  return t === 'light' || t === 'dark' ? t : 'dark';
}

export function ThemeToggle({ compact = false }: { compact?: boolean }) {
  const [theme, setTheme] = useState<Theme>(getStoredTheme);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(theme);
    localStorage.setItem(STORAGE_KEY, theme);
  }, [theme]);

  return (
    <div className="flex rounded-full border border-gray-300 dark:border-white/10 bg-white/60 dark:bg-white/5 p-0.5 backdrop-blur">
      <button
        type="button"
        onClick={() => setTheme('light')}
        className={`rounded-full ${compact ? 'px-2.5 py-1 text-[11px]' : 'px-3 py-1.5 text-sm'} font-medium transition ${
          theme === 'light'
            ? 'bg-white text-gray-900 shadow'
            : 'text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white'
        }`}
        aria-pressed={theme === 'light'}
      >
        Light
      </button>
      <button
        type="button"
        onClick={() => setTheme('dark')}
        className={`rounded-full ${compact ? 'px-2.5 py-1 text-[11px]' : 'px-3 py-1.5 text-sm'} font-medium transition ${
          theme === 'dark'
            ? 'brand-button shadow'
            : 'text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white'
        }`}
        aria-pressed={theme === 'dark'}
      >
        Dark
      </button>
    </div>
  );
}
