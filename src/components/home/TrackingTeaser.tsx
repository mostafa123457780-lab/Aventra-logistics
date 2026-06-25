import Link from "next/link";
import { Reveal } from "@/components/ui/reveal";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function TrackingTeaser() {
  return (
    <section className="py-20 max-w-6xl mx-auto px-6">
      <Reveal className="grid lg:grid-cols-2 gap-10 items-center bg-white rounded-2xl p-8 lg:p-12 border border-black/10">
        <div>
          <span className="font-mono text-xs text-rust">تتبع لحظي</span>
          <h2 className="text-2xl lg:text-3xl font-extrabold tracking-tight leading-[1.25] mt-2 mb-3">
            فين شحنتك دلوقتي؟ اعرف بدقة.
          </h2>
          <p className="text-steel">
            اكتب رقم البوليصة وشوف آخر تحديث، الموقع، والوقت المتوقع للتسليم.
          </p>
        </div>
        <form action="/tracking" className="flex flex-col sm:flex-row gap-3">
          <Input name="awb" placeholder="مثال: AVT-2026-04821" dir="ltr" className="font-mono rounded-full" />
          <Button variant="dark" type="submit" className="!rounded-full whitespace-nowrap">
            تتبع
          </Button>
        </form>
      </Reveal>
    </section>
  );
}
