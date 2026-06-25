import { Reveal } from "@/components/ui/reveal";
import { Ship, Plane, Truck, Warehouse, FileCheck2, Link2 } from "lucide-react";

const services = [
  { icon: Ship, title: "شحن بحري", desc: "حاويات FCL/LCL على أكبر خطوط الملاحة العالمية." },
  { icon: Plane, title: "شحن جوي", desc: "للشحنات العاجلة والحساسة للوقت، بتغطية عالمية." },
  { icon: Truck, title: "شحن بري", desc: "نقل داخلي وإقليمي بأسطول مراقَب لحظيًا." },
  { icon: Warehouse, title: "تخزين ومستودعات", desc: "إدارة مخزون دقيقة بمناطق ورفوف مرقّمة لكل شحنة." },
  { icon: FileCheck2, title: "تخليص جمركي", desc: "إدارة المستندات والرسوم لتقليل وقت الإفراج." },
  { icon: Link2, title: "شحن متعدد الوسائط", desc: "دمج أكثر من وسيلة في رحلة واحدة موحّدة التتبع." },
];

export function ServicesGrid() {
  return (
    <section id="services" className="bg-ink text-white py-20">
      <div className="max-w-6xl mx-auto px-6">
        <Reveal className="mb-12">
          <span className="font-mono text-xs text-amber">خدماتنا</span>
          <h2 className="text-3xl font-extrabold tracking-tight leading-[1.25] mt-2">أي وسيلة شحن تحتاجها، جاهزة.</h2>
        </Reveal>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((s, i) => {
            const Icon = s.icon;
            return (
              <Reveal key={s.title} delay={i * 0.05}>
                <div className="bg-ink2 border border-white/10 rounded-xl p-6 hover:border-amber transition-colors h-full">
                  <Icon className="text-amber mb-3" size={26} strokeWidth={1.75} />
                  <h3 className="font-bold mb-1">{s.title}</h3>
                  <p className="text-[14.5px] text-[#9AA6B1] leading-relaxed">{s.desc}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
