import { Reveal } from "@/components/ui/reveal";

const values = [
  { title: "الدقة أولًا", desc: "كل بوليصة مرتبطة برقم تتبع واحد لا يتكرر، من الاستلام لحد التسليم." },
  { title: "شفافية كاملة", desc: "عميلك يشوف نفس البيانات اللي عندك، لحظة بلحظة، من غير وسيط." },
  { title: "شبكة موحّدة", desc: "مستودعات وخطوط شحن مختلفة، تحت نظام تشغيل واحد." },
];

export default function AboutPage() {
  return (
    <div className="bg-paper">
      <section className="bg-ink text-white py-20">
        <div className="max-w-4xl mx-auto px-6">
          <Reveal>
            <span className="font-mono text-xs text-amber">عن أفنترا</span>
            <h1 className="text-4xl font-extrabold tracking-tight leading-[1.25] mt-2 mb-5">
              بنينا أفنترا عشان الشحنة متضيعش بين الأنظمة.
            </h1>
            <p className="text-steel text-lg leading-relaxed">
              بدأنا كشركة تخليص جمركي صغيرة، وكبرنا لشبكة لوجستية تدير الشحن
              البحري والجوي والبري والمستودعات تحت منصة واحدة، فريقك وعميلك
              يشوفوا نفس الصورة دايمًا.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-6 py-16 grid md:grid-cols-3 gap-6">
        {values.map((v, i) => (
          <Reveal key={v.title} delay={i * 0.08}>
            <div className="bg-white rounded-xl border border-black/10 p-6 h-full">
              <h3 className="font-bold mb-2 text-ink">{v.title}</h3>
              <p className="text-sm text-steel leading-relaxed">{v.desc}</p>
            </div>
          </Reveal>
        ))}
      </section>
    </div>
  );
}
