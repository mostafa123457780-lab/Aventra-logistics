"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section className="bg-ink text-white relative overflow-hidden">
      <Image
        src="/hero-bg.jpg"
        alt="أسطول أفنترا للشحن البحري والجوي والبري"
        fill
        priority
        className="object-cover object-center"
      />
      {/* Dark gradient overlay so text stays readable over the photo */}
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/85 to-ink/60" />
      <div className="absolute inset-0 bg-ink/30" />

      <div className="max-w-6xl mx-auto px-6 py-20 lg:py-28 grid lg:grid-cols-2 gap-14 items-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <div className="inline-flex items-center gap-2 font-mono text-xs text-amber border border-amber/40 rounded-full px-3 py-1 mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-amber" />
            بوليصة شحن رقمية لحظية
          </div>
          <h1 className="text-4xl lg:text-[3.2rem] leading-[1.15] font-extrabold mb-6">
            من الميناء إلى باب عميلك،
            <br />
            نوثّق <span className="text-amber">كل خطوة</span> باسمها.
          </h1>
          <p className="text-steel text-lg leading-relaxed max-w-md mb-9">
            أفنترا تدير شحناتك بحريًا وجويًا وبريًا مع تتبع لحظي ومستودعات
            مرتبطة بنظام واحد، فمفيش مرحلة بتضيع من حساباتك.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button href="/tracking" variant="primary">
              تتبع شحنتك الآن
            </Button>
            <Button href="/quote" variant="outline">
              اطلب عرض سعر
            </Button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
        >
          <WaybillCard />
        </motion.div>
      </div>
    </section>
  );
}

function WaybillCard() {
  return (
    <div className="perforated bg-paper text-ink rounded-2xl p-6 shadow-2xl relative">
      <div className="absolute -top-3 left-6 bg-rust text-white text-[10px] font-mono px-2 py-1 rounded stamp shadow-md">
        CUSTOMS CLEARED
      </div>
      <div className="flex items-center justify-between mb-5 pt-2">
        <span className="text-xs font-mono text-steel">WAYBILL / بوليصة الشحن</span>
        <span className="font-mono text-sm font-bold tracking-wider" dir="ltr">
          AVT-2026-04821
        </span>
      </div>
      <div className="flex items-center justify-between text-sm font-bold mb-2">
        <span>
          جدة <span className="font-mono text-steel text-xs">JED</span>
        </span>
        <span>
          القاهرة <span className="font-mono text-steel text-xs">CAI</span>
        </span>
      </div>
      <svg viewBox="0 0 300 20" className="w-full h-5 mb-4">
        <line
          x1="5"
          y1="10"
          x2="295"
          y2="10"
          stroke="#5B6B7A"
          strokeWidth="2"
          strokeDasharray="6 7"
          className="animate-dash"
        />
        <circle cx="5" cy="10" r="4" fill="#0B1B2B" />
        <circle cx="295" cy="10" r="4" fill="#FF7A1A" />
        <circle r="5" fill="#FF7A1A">
          <animateMotion dur="4.5s" repeatCount="indefinite" path="M5,10 L295,10" />
        </circle>
      </svg>
      <div className="grid grid-cols-4 gap-1 text-[10px] font-mono text-center">
        <div className="text-amber border-t-2 border-amber pt-1.5">استلام ✓</div>
        <div className="text-amber border-t-2 border-amber pt-1.5">مستودع ✓</div>
        <div className="text-ink border-t-2 border-ink pt-1.5">عبور</div>
        <div className="text-steel/60 border-t-2 border-steel/30 pt-1.5">تسليم</div>
      </div>
    </div>
  );
}
