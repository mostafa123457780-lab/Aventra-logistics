"use client";

import { useInView } from "react-intersection-observer";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/lib/i18n/LanguageContext";

export default function StatsSection() {
  const { t } = useLanguage();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });

  const stats = [
    { number: 50, label: t.stats.countries, suffix: "+" },
    { number: 1200, label: t.stats.vehicles, suffix: "+" },
    { number: 10000, label: t.stats.clients, suffix: "+" },
    { number: 2000000, label: t.stats.deliveries, suffix: "+" },
    { number: 15, label: t.stats.experience, suffix: "+" },
  ];

  const [counts, setCounts] = useState(stats.map(() => 0));

  useEffect(() => {
    if (!inView) return;
    stats.forEach((stat, index) => {
      let start = 0;
      const end = stat.number;
      const step = Math.max(1, Math.floor(end / 60));
      const interval = setInterval(() => {
        start += step;
        if (start >= end) {
          start = end;
          clearInterval(interval);
        }
        setCounts((prev) => {
          const next = [...prev];
          next[index] = start;
          return next;
        });
      }, 30);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView]);

  return (
    <section ref={ref} className="py-20 bg-blue-900 text-white">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="text-center"
            >
              <div className="text-4xl md:text-5xl font-bold">
                {counts[index].toLocaleString()}
                {stat.suffix}
              </div>
              <div className="mt-2 text-sm text-blue-200 uppercase tracking-wider">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
