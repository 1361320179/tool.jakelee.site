"use client";

import * as React from "react";

type Theme = "light" | "dark" | "system";
type ResolvedTheme = "light" | "dark";

type ThemeContextValue = {
  theme: Theme;
  resolvedTheme: ResolvedTheme;
  setTheme: (theme: Theme) => void;
};

const STORAGE_KEY = "theme";
const ThemeContext = React.createContext<ThemeContextValue | null>(null);

function getStoredTheme(): Theme {
  const savedTheme = window.localStorage.getItem(STORAGE_KEY);
  if (savedTheme === "light" || savedTheme === "dark" || savedTheme === "system") {
    return savedTheme;
  }
  return "system";
}

function getSystemTheme(): ResolvedTheme {
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

function getResolvedTheme(theme: Theme): ResolvedTheme {
  if (theme === "system") return getSystemTheme();
  return theme;
}

function applyTheme(theme: ResolvedTheme) {
  const root = document.documentElement;
  root.classList.remove("light", "dark");
  root.classList.add(theme);
  root.style.colorScheme = theme;
}

function setThemeCookie(theme: Theme) {
  document.cookie = `theme=${theme}; Path=/; Max-Age=31536000; SameSite=Lax`;
}

export function ThemeProvider({
  children,
  initialTheme = "system",
}: {
  children: React.ReactNode;
  initialTheme?: Theme;
}) {
  const [theme, setThemeState] = React.useState<Theme>(() => {
    if (typeof window === "undefined") return initialTheme;
    return getStoredTheme();
  });

  const [resolvedTheme, setResolvedTheme] = React.useState<ResolvedTheme>(() => {
    if (typeof window === "undefined") return "light";
    if (document.documentElement.classList.contains("dark")) return "dark";
    if (document.documentElement.classList.contains("light")) return "light";
    return getResolvedTheme(getStoredTheme());
  });

  React.useEffect(() => {
    const nextTheme = getStoredTheme();
    const nextResolvedTheme = getResolvedTheme(nextTheme);

    queueMicrotask(() => {
      setThemeState(nextTheme);
      setResolvedTheme(nextResolvedTheme);
      setThemeCookie(nextTheme);
      applyTheme(nextResolvedTheme);
    });
  }, []);

  React.useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    const handleSystemChange = () => {
      setResolvedTheme((currentResolvedTheme) => {
        const nextResolvedTheme = getSystemTheme();
        const currentTheme = getStoredTheme();

        if (currentTheme === "system") {
          applyTheme(nextResolvedTheme);
          return nextResolvedTheme;
        }

        return currentResolvedTheme;
      });
    };

    const handleStorage = (event: StorageEvent) => {
      if (event.key !== STORAGE_KEY) return;

      const nextTheme =
        event.newValue === "light" ||
        event.newValue === "dark" ||
        event.newValue === "system"
          ? event.newValue
          : "system";
      const nextResolvedTheme = getResolvedTheme(nextTheme);

      setThemeState(nextTheme);
      setResolvedTheme(nextResolvedTheme);
      setThemeCookie(nextTheme);
      applyTheme(nextResolvedTheme);
    };

    mediaQuery.addEventListener("change", handleSystemChange);
    window.addEventListener("storage", handleStorage);

    return () => {
      mediaQuery.removeEventListener("change", handleSystemChange);
      window.removeEventListener("storage", handleStorage);
    };
  }, []);

  const setTheme = React.useCallback((nextTheme: Theme) => {
    const nextResolvedTheme = getResolvedTheme(nextTheme);

    window.localStorage.setItem(STORAGE_KEY, nextTheme);
    setThemeCookie(nextTheme);
    setThemeState(nextTheme);
    setResolvedTheme(nextResolvedTheme);
    applyTheme(nextResolvedTheme);
  }, []);

  const value = React.useMemo(
    () => ({ theme, resolvedTheme, setTheme }),
    [theme, resolvedTheme, setTheme],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const context = React.useContext(ThemeContext);

  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider");
  }

  return context;
}
