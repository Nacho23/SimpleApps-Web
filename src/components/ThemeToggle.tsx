"use client";

import { useTheme } from "@/components/ThemeProvider";
import { startTransition, useEffect, useState } from "react";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    startTransition(() => {
      setMounted(true);
    });
  }, []);

  const isDark = resolvedTheme === "dark";
  /** Misma etiqueta en servidor y primer render cliente evita hydration mismatch (resolvedTheme difiere). */
  const a11yThemeLabel = !mounted
    ? "Cambiar tema"
    : isDark
      ? "Activar tema claro"
      : "Activar tema oscuro";

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="relative flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200/80 bg-white/80 text-slate-600 shadow-sm backdrop-blur-sm transition hover:border-primary/25 hover:text-primary dark:border-slate-700/80 dark:bg-slate-800/80 dark:text-slate-300 dark:hover:border-primary/40 dark:hover:text-sky-300"
      aria-label={a11yThemeLabel}
    >
      {!mounted ? (
        <span
          className="h-4 w-4 rounded-full bg-slate-200 opacity-60"
          aria-hidden
        />
      ) : isDark ? (
        <svg
          className="h-[18px] w-[18px]"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.75}
          aria-hidden
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
          />
        </svg>
      ) : (
        <svg
          className="h-[18px] w-[18px]"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.75}
          aria-hidden
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
          />
        </svg>
      )}
    </button>
  );
}
