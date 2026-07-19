import Link from "next/link";
import { QuoteForm } from "@/components/forms/QuoteForm";

export default function QuotePage() {
  return (
    <main className="max-w-2xl mx-auto px-6 py-16">
      <Link href="/" className="text-sm text-steel hover:text-ink transition-colors">
        ← الرئيسية
      </Link>

      <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight mt-4 mb-3">اطلب عرض سعر</h1>
      <p className="text-steel text-lg mb-12">
        احنا هنا نساعدك تشحن بضاعتك بأفضل سعر وأسرع وقت. املأ البيانات وهنتواصل معاك بعرض مخصص.
      </p>

      <QuoteForm />
    </main>
  );
}
