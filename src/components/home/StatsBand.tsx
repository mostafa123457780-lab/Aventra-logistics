import { Reveal } from "@/components/ui/reveal";

const stats = [
  { value: "12,400+", label: "شحنة شهريًا" },
  { value: "38", label: "دولة تغطية" },
  { value: "99.2%", label: "دقة التسليم في الوقت" },
  { value: "24/7", label: "دعم العمليات" },
];

export function StatsBand() {
  return (
    <section className="bg-ink2 text-white border-t border-white/10">
      <div className="max-w-6xl mx-auto px-6 py-10 grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
        {stats.map((s, i) => (
          <Reveal key={s.label} delay={i * 0.08}>
            <div className="num text-4xl text-amber" dir="ltr">
              {s.value}
            </div>
            <div className="text-xs text-[#8B98A4] mt-1.5 tracking-wide">{s.label}</div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
