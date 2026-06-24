import { Reveal } from "@/components/ui/reveal";

const steps = [
  { n: "01", title: "استلام الشحنة", desc: "معاينة وتسجيل البوليصة في النظام لحظة الاستلام.", active: false },
  { n: "02", title: "تخزين بالمستودع", desc: "فهرسة الموقع والرف داخل أقرب مستودع لخط الشحن.", active: false },
  { n: "03", title: "عبور / ترانزيت", desc: "تحديثات موقع لحظية بحري، جوي، أو بري حسب نوع الخدمة.", active: true },
  { n: "04", title: "تخليص جمركي", desc: "متابعة الأوراق والرسوم قبل الإفراج عن الشحنة.", active: false },
  { n: "05", title: "تسليم نهائي", desc: "توقيع استلام رقمي وإغلاق البوليصة بالفاتورة.", active: false },
];

export function ProcessTimeline() {
  return (
    <section className="max-w-6xl mx-auto px-6 py-20">
      <Reveal className="mb-12">
        <span className="font-mono text-xs text-rust">رحلة الشحنة</span>
        <h2 className="text-3xl font-extrabold mt-2">من التسليم لنا… لحد ما توصل.</h2>
      </Reveal>
      <div className="grid md:grid-cols-5 gap-6">
        {steps.map((step, i) => (
          <Reveal key={step.n} delay={i * 0.08}>
            <div className={`relative pt-8 border-t-2 ${step.active ? "border-amber" : "border-ink"}`}>
              <span
                className={`num absolute -top-2 -right-1 text-3xl ${
                  step.active ? "text-amber/25" : "text-ink/15"
                }`}
              >
                {step.n}
              </span>
              <h3 className="font-bold mb-1">{step.title}</h3>
              <p className="text-sm text-steel">{step.desc}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
