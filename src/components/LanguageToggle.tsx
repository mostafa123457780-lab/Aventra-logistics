"use client";

import { useLanguage } from "@/lib/i18n/LanguageContext";

export function LanguageToggle({ className = "" }: { className?: string }) {
  const { lang, setLang } = useLanguage();

  return (
    <button
      type="button"
      onClick={() => setLang(lang === "ar" ? "en" : "ar")}
      className={`inline-flex items-center gap-1.5 rounded-full border border-white/30 bg-white/10 backdrop-blur-sm px-3.5 py-1.5 text-xs font-bold text-white hover:bg-white/20 transition-colors ${className}`}
    >
      {lang === "ar" ? "EN" : "AR"}
    </button>
  );
}
