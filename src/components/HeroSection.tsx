"use client";

import Link from "next/link";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { LanguageToggle } from "@/components/LanguageToggle";

export default function HeroSection() {
  const { t } = useLanguage();

  return (
    <section className="relative w-full h-screen overflow-hidden">
      <div
        className="absolute inset-0 w-full h-full bg-cover bg-center"
        style={{ backgroundImage: "url('/hero-bg.jpg')" }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/30" />
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/70 to-transparent" />
      </div>

      <div className="absolute top-6 inset-x-0 z-20 flex justify-end px-6 md:px-12 lg:px-16">
        <LanguageToggle />
      </div>

      <div className="relative z-10 flex flex-col justify-center items-start h-full max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
        <div className="max-w-3xl">
          <div className="mb-6">
            <span className="text-5xl md:text-7xl font-bold text-white tracking-tight">
              {t.hero.brand}
            </span>
            <span className="block text-lg md:text-2xl font-light text-blue-400 mt-1 tracking-widest">
              {t.hero.tagline}
            </span>
          </div>

          <h1 className="text-3xl md:text-5xl lg:text-7xl font-bold text-white leading-tight mt-4">
            {t.hero.titleLine1}
            <br />
            <span className="text-blue-400">{t.hero.titleLine2}</span>
            <br />
            <span className="text-blue-300">{t.hero.titleLine3}</span>
          </h1>

          <p className="mt-6 text-lg md:text-xl text-gray-200 max-w-2xl leading-relaxed">
            {t.hero.description}
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/dashboard"
              className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-all duration-300 shadow-lg hover:shadow-blue-500/30 transform hover:-translate-y-1"
            >
              {t.hero.getStarted}
            </Link>
            <Link
              href="/services"
              className="px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/30 hover:bg-white/20 text-white font-semibold rounded-lg transition-all duration-300"
            >
              {t.hero.exploreServices}
            </Link>
          </div>
        </div>
      </div>

      <div className="absolute bottom-10 left-0 right-0 z-20 max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
          <StatItem number="50+" label={t.stats.countries} />
          <StatItem number="1,200+" label={t.stats.vehicles} />
          <StatItem number="10,000+" label={t.stats.clients} />
          <StatItem number="2M+" label={t.stats.deliveries} />
          <StatItem number="15+" label={t.stats.experience} />
        </div>
      </div>
    </section>
  );
}

function StatItem({ number, label }: { number: string; label: string }) {
  return (
    <div className="text-center">
      <div className="text-2xl md:text-3xl font-bold text-white">{number}</div>
      <div className="text-xs md:text-sm text-gray-300 uppercase tracking-wider mt-1">{label}</div>
    </div>
  );
}
