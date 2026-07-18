import Link from "next/link";
import { Ship, Plane, Truck, Warehouse, Cpu } from "lucide-react";

const services = [
  { icon: Ship, title: "شحن بحري عالمي", description: "خدمات شحن بحري سريعة وموثوقة تربط أهم الموانئ حول العالم." },
  { icon: Plane, title: "شحن جوي", description: "حلول شحن جوي سريعة للشحنات الحساسة للوقت في أي مكان بالعالم." },
  { icon: Truck, title: "نقل بري", description: "تغطية على مستوى الجمهورية بأسطول حديث لنقل بري فعّال." },
  { icon: Warehouse, title: "تخزين ومستودعات", description: "حلول تخزين آمنة مع إدارة مخزون متقدمة." },
  { icon: Cpu, title: "تكنولوجيا ذكية", description: "حلول لوجستية مدعومة بالذكاء الاصطناعي والتتبع اللحظي." },
];

export default function ServicesPage() {
  return (
    <main className="max-w-6xl mx-auto px-6 py-16">
      <Link href="/" className="text-sm text-steel hover:text-ink transition-colors">
        ← الرئيسية
      </Link>

      <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight mt-4 mb-3">خدماتنا</h1>
      <p className="text-steel text-lg max-w-2xl mb-12">
        من الشحن البحري لحلول التكنولوجيا الذكية، بنقدّم خدمات لوجستية شاملة تناسب احتياجات شركتك.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service) => {
          const Icon = service.icon;
          return (
            <div key={service.title} className="bg-white border border-black/10 rounded-2xl p-6">
              <div className="w-12 h-12 rounded-xl bg-amber/15 flex items-center justify-center mb-4">
                <Icon className="w-6 h-6 text-amber" />
              </div>
              <h3 className="text-lg font-bold mb-2">{service.title}</h3>
              <p className="text-steel text-sm leading-relaxed">{service.description}</p>
            </div>
          );
        })}
      </div>

      <div className="mt-12 text-center">
        <Link
          href="/auth/register"
          className="inline-block bg-ink text-white font-bold px-8 py-3.5 rounded-lg hover:opacity-90 transition-opacity"
        >
          ابدأ الآن
        </Link>
      </div>
    </main>
  );
      }
