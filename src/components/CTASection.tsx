"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useLanguage } from "@/lib/i18n/LanguageContext";

export default function CTASection() {
  const { t } = useLanguage();

  return (
    <section className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-900 to-purple-900" />
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 lg:px-16 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <span className="text-sm font-semibold text-blue-300 uppercase tracking-wider">
            {t.cta.eyebrow}
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-white mt-4">{t.cta.title}</h2>
          <p className="mt-4 text-lg text-blue-100 max-w-2xl mx-auto">{t.cta.description}</p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              href="/auth/register"
              className="px-8 py-4 bg-white text-blue-900 font-semibold rounded-lg hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300"
            >
              {t.cta.getStarted}
            </Link>
            <Link
              href="/contact"
              className="px-8 py-4 bg-transparent border-2 border-white text-white font-semibold rounded-lg hover:bg-white/10 transition-all duration-300"
            >
              {t.cta.contactSales}
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
