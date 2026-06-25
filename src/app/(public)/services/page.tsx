import { Reveal } from "@/components/ui/reveal";
import { ServicesGrid } from "@/components/home/ServicesGrid";
import { Button } from "@/components/ui/button";

export default function ServicesPage() {
  return (
    <div>
      <section className="bg-ink2 text-white py-16">
        <div className="max-w-4xl mx-auto px-6">
          <Reveal>
            <span className="font-mono text-xs text-amber">خدماتنا</span>
            <h1 className="text-4xl font-extrabold tracking-tight leading-[1.25] mt-2 mb-4">حل شحن واحد، لكل وسيلة نقل.</h1>
            <p className="text-steel text-lg leading-relaxed max-w-2xl">
              اختار الخدمة المناسبة لشحنتك، أو سيبنا نقترح أفضل دمج بين أكثر
              من وسيلة لتقليل الوقت والتكلفة.
            </p>
          </Reveal>
        </div>
      </section>

      <ServicesGrid />

      <section className="max-w-4xl mx-auto px-6 py-16 text-center">
        <Reveal>
          <h2 className="text-2xl font-extrabold tracking-tight leading-[1.25] mb-4">مش متأكد أي خدمة تناسبك؟</h2>
          <p className="text-steel mb-7">احكي لنا تفاصيل شحنتك وهنرد عليك بعرض سعر مناسب.</p>
          <Button href="/quote" variant="dark">
            اطلب عرض سعر
          </Button>
        </Reveal>
      </section>
    </div>
  );
}
