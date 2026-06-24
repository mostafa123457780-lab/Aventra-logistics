import { Reveal } from "@/components/ui/reveal";
import { Button } from "@/components/ui/button";

export function FinalCta() {
  return (
    <section className="bg-amber text-white">
      <Reveal className="max-w-6xl mx-auto px-6 py-16 text-center">
        <h2 className="text-3xl font-extrabold mb-4">جاهز تشحن مع أفنترا؟</h2>
        <p className="mb-7 text-white/90">احصل على عرض سعر مفصّل في أقل من 24 ساعة.</p>
        <Button href="/quote" variant="dark">
          اطلب عرض سعر الآن
        </Button>
      </Reveal>
    </section>
  );
}
