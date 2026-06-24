import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-ink2 text-steel py-12">
      <div className="max-w-6xl mx-auto px-6 grid sm:grid-cols-3 gap-8 text-sm">
        <div>
          <span className="font-display font-extrabold text-xl text-white">AVENTRA</span>
          <p className="mt-3 leading-relaxed">
            شريكك اللوجستي من نقطة الشحن لباب التسليم، بنظام تتبع وتخزين موحّد.
          </p>
        </div>
        <div>
          <h4 className="text-white font-bold mb-3">روابط سريعة</h4>
          <ul className="space-y-2">
            <li><Link href="/services" className="hover:text-amber">خدماتنا</Link></li>
            <li><Link href="/tracking" className="hover:text-amber">تتبع الشحنة</Link></li>
            <li><Link href="/quote" className="hover:text-amber">اطلب عرض سعر</Link></li>
            <li><Link href="/faq" className="hover:text-amber">الأسئلة الشائعة</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-bold mb-3">تواصل معنا</h4>
          <p className="font-mono text-xs" dir="ltr">contact@aventra.com</p>
          <p className="font-mono text-xs mt-1" dir="ltr">+20 000 000 0000</p>
        </div>
      </div>
      <div className="max-w-6xl mx-auto px-6 mt-10 pt-6 border-t border-white/10 text-xs text-center">
        © {new Date().getFullYear()} AVENTRA Logistics
      </div>
    </footer>
  );
}
