import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center text-center px-6">
      <span className="font-display font-extrabold text-3xl tracking-tight mb-3">AVENTRA</span>
      <h1 className="text-2xl font-bold text-steel mb-8 max-w-md">
        نظام إدارة الشحن واللوجستيات — الواجهة التسويقية الكاملة هتتضاف في مرحلة لاحقة.
      </h1>
      <div className="flex gap-3">
        <Link href="/auth/login" className="bg-ink text-white rounded-lg px-6 py-3 text-sm font-bold">
          تسجيل الدخول
        </Link>
        <Link href="/auth/register" className="border border-black/15 rounded-lg px-6 py-3 text-sm font-bold">
          إنشاء حساب
        </Link>
      </div>
    </main>
  );
}
