"use client";

import { createContext, useContext, useEffect, useState } from "react";

type Theme = "default" | "orange";

type ThemeContextValue = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

const STORAGE_KEY = "app-theme";

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>("default");

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);

    if (saved === "orange" || saved === "default") {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setThemeState(saved);
      document.documentElement.dataset.theme = saved;
    }
  }, []);

  function setTheme(theme: Theme) {
    setThemeState(theme);
    localStorage.setItem(STORAGE_KEY, theme);
    document.documentElement.dataset.theme = theme;
  }

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error("useTheme must be used inside ThemeProvider");
  }

  return context;
}
