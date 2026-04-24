"use client";

import { useSyncExternalStore } from "react";
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/components/site/theme-provider";
import { useLocaleContext } from "@/components/i18n/locale-context";

const subscribe = () => () => {};
const getClient = () => true;
const getServer = () => false;

export function ThemeToggle() {
  const { setTheme, resolvedTheme } = useTheme();
  const mounted = useSyncExternalStore(subscribe, getClient, getServer);
  const { dictionary } = useLocaleContext();
  const { switchToLight, switchToDark } = dictionary.theme;

  if (!mounted) {
    return (
      <Button
        variant="ghost"
        size="icon"
        className="size-10 border border-border/70 bg-background/60"
        aria-label={switchToDark}
      >
        <span className="size-4" />
      </Button>
    );
  }

  const isDark = resolvedTheme === "dark";

  return (
    <Button
      type="button"
      variant="ghost"
      size="icon"
      className="size-10 border border-border/70 bg-background/60"
      aria-label={isDark ? switchToLight : switchToDark}
      onClick={() => setTheme(isDark ? "light" : "dark")}
    >
      {isDark ? <Sun className="size-4" /> : <Moon className="size-4" />}
    </Button>
  );
}
