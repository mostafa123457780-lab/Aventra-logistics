"use client";

import { useState } from "react";
import { Reveal } from "@/components/ui/reveal";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    q: "إزاي أتابع شحنتي؟",
    a: "من صفحة تتبع الشحنة، اكتب رقم البوليصة (مثال AVT-2026-04821) وهتشوف آخر حالة وموقع للشحنة لحظيًا.",
  },
  {
    q: "كل قد إيه ياخد عرض السعر؟",
    a: "بنرد على طلبات عروض السعر في أقل من 24 ساعة عمل من خلال البريد الإلكتروني أو الهاتف اللي تكتبه في الطلب.",
  },
  {
    q: "بتشحنوا لكل الدول؟",
    a: "تغطيتنا الحالية بتشمل 38 دولة عبر الشحن البحري والجوي والبري. تواصل معانا للتأكد من تغطية وجهتك بالتحديد.",
  },
  {
    q: "ممكن أدمج أكتر من وسيلة شحن في نفس الطلب؟",
    a: "أيوه، خدمة الشحن متعدد الوسائط بتدمج بحري وجوي وبري في رحلة واحدة بتتبع موحّد لتقليل الوقت والتكلفة.",
  },
];

export default function FaqPage() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="bg-paper py-16">
      <div className="max-w-2xl mx-auto px-6">
        <Reveal className="mb-10">
          <span className="font-mono text-xs text-rust">الأسئلة الشائعة</span>
          <h1 className="text-3xl font-extrabold tracking-tight leading-[1.25] mt-2">عندك سؤال؟ يمكن جاوبنا عليه هنا.</h1>
        </Reveal>

        <div className="space-y-3">
          {faqs.map((item, i) => {
            const isOpen = open === i;
            return (
              <Reveal key={item.q} delay={i * 0.05}>
                <div className="bg-white border border-black/10 rounded-xl overflow-hidden">
                  <button
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="w-full flex items-center justify-between text-right px-5 py-4 font-bold"
                  >
                    {item.q}
                    <ChevronDown
                      size={18}
                      className={`text-amber transition-transform ${isOpen ? "rotate-180" : ""}`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-4 text-sm text-steel leading-relaxed">{item.a}</div>
                  )}
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </div>
  );
}
