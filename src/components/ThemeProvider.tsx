"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  syncThemePreferenceCookie,
  THEME_STORAGE_KEY,
} from "@/lib/theme";

export type ThemePreference = "light" | "dark" | "system";

type ThemeContextValue = {
  theme: ThemePreference;
  resolvedTheme: "light" | "dark";
  setTheme: (t: ThemePreference) => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

function getSystemTheme(): "light" | "dark" {
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

function resolveTheme(preference: ThemePreference): "light" | "dark" {
  if (preference === "system") return getSystemTheme();
  return preference;
}

function applyDomTheme(resolved: "light" | "dark") {
  const root = document.documentElement;
  if (resolved === "dark") root.classList.add("dark");
  else root.classList.remove("dark");
  root.style.colorScheme = resolved;
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<ThemePreference>("system");
  const [resolvedTheme, setResolvedTheme] = useState<"light" | "dark">(
    "light",
  );

  const setTheme = useCallback((t: ThemePreference) => {
    setThemeState(t);
    try {
      localStorage.setItem(THEME_STORAGE_KEY, t);
    } catch {
      /* private mode, etc. */
    }
    syncThemePreferenceCookie(t);
    const resolved = resolveTheme(t);
    applyDomTheme(resolved);
    setResolvedTheme(resolved);
  }, []);

  useEffect(() => {
    let stored: ThemePreference = "system";
    try {
      const raw = localStorage.getItem(THEME_STORAGE_KEY);
      if (raw === "light" || raw === "dark" || raw === "system") stored = raw;
    } catch {
      /* ignore */
    }
    queueMicrotask(() => {
      setThemeState(stored);
      const resolved = resolveTheme(stored);
      setResolvedTheme(resolved);
    });
    syncThemePreferenceCookie(stored);
    applyDomTheme(resolveTheme(stored));
  }, []);

  useEffect(() => {
    if (theme !== "system") return;
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = () => {
      const resolved = resolveTheme("system");
      setResolvedTheme(resolved);
      applyDomTheme(resolved);
    };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, [theme]);

  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key !== THEME_STORAGE_KEY) return;
      const raw = e.newValue;
      const next: ThemePreference =
        raw === "light" || raw === "dark" || raw === "system"
          ? raw
          : "system";
      setThemeState(next);
      syncThemePreferenceCookie(next);
      const resolved = resolveTheme(next);
      setResolvedTheme(resolved);
      applyDomTheme(resolved);
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const value = useMemo(
    () => ({ theme, resolvedTheme, setTheme }),
    [theme, resolvedTheme, setTheme],
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error("useTheme debe usarse dentro de ThemeProvider");
  }
  return ctx;
}
