import Link from "next/link";

const FAQS = [
  {
    q: "إزاي أقدر أتابع شحنتي؟",
    a: "تقدر تتابع شحنتك من صفحة تتبع الشحنة بإدخال رقم البوليصة (Tracking Number) اللي بتوصلك بعد تأكيد الطلب.",
  },
  {
    q: "إيه أنواع الشحن اللي بتقدموها؟",
    a: "بنقدّم شحن بحري، شحن جوي، نقل بري على مستوى الجمهورية، وخدمات تخزين ومستودعات آمنة.",
  },
  {
    q: "إزاي أطلب عرض سعر؟",
    a: "من صفحة (اطلب عرض سعر) املأ بيانات الشحنة (نوع الخدمة، نقطة الانطلاق، الوجهة)، وفريق المبيعات هيتواصل معاك خلال ٢٤ ساعة.",
  },
  {
    q: "هل ممكن أتابع حساباتي وفواتيري أونلاين؟",
    a: "أيوه، بعد إنشاء حساب تقدر تدخل على لوحة التحكم بتاعتك وتشوف كل شحناتك وفواتيرك وطلباتك في مكان واحد.",
  },
  {
    q: "إزاي أتواصل مع فريق الدعم؟",
    a: "تقدر تتواصل معانا من صفحة (تواصل معنا) بالبريد الإلكتروني أو الهاتف، أو تبعت رسالة مباشرة من الفورم وهنرد عليك بسرعة.",
  },
];

export default function FAQPage() {
  return (
    <main className="max-w-3xl mx-auto px-6 py-16">
      <Link href="/" className="text-sm text-steel hover:text-ink transition-colors">
        ← الرئيسية
      </Link>

      <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight mt-4 mb-3">الأسئلة الشائعة</h1>
      <p className="text-steel text-lg mb-12">إجابات على أكتر الأسئلة اللي بتوصلنا من عملائنا.</p>

      <div className="space-y-4">
        {FAQS.map((item) => (
          <details key={item.q} className="bg-white border border-black/10 rounded-2xl p-5 group">
            <summary className="font-bold cursor-pointer list-none flex items-center justify-between">
              {item.q}
              <span className="text-amber group-open:rotate-45 transition-transform text-xl leading-none">+</span>
            </summary>
            <p className="text-steel text-sm mt-3 leading-relaxed">{item.a}</p>
          </details>
        ))}
      </div>
    </main>
  );
}
