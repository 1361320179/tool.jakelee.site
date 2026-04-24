"use client";

import * as React from "react";
import type { SiteLocale } from "@/i18n/config";
import type { ToolsSiteDictionary } from "@/i18n/types";

type LocaleContextValue = {
  locale: SiteLocale;
  dictionary: ToolsSiteDictionary;
};

const LocaleContext = React.createContext<LocaleContextValue | null>(null);

export function LocaleProvider({
  locale,
  dictionary,
  children,
}: {
  locale: SiteLocale;
  dictionary: ToolsSiteDictionary;
  children: React.ReactNode;
}) {
  const value = React.useMemo(
    () => ({ locale, dictionary }),
    [locale, dictionary],
  );
  return (
    <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>
  );
}

export function useLocaleContext() {
  const ctx = React.useContext(LocaleContext);
  if (!ctx) {
    throw new Error("useLocaleContext must be used within LocaleProvider");
  }
  return ctx;
}
