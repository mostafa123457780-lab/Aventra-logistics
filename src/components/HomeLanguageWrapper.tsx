"use client";

import type { ReactNode } from "react";
import { useLanguage } from "@/lib/i18n/LanguageContext";

export function HomeLanguageWrapper({ children }: { children: ReactNode }) {
  const { lang } = useLanguage();

  return (
    <div dir={lang === "ar" ? "rtl" : "ltr"} lang={lang}>
      {children}
    </div>
  );
}
