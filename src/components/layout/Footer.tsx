import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-ink2 text-[#8B98A4] py-14 text-[14.5px] leading-[1.7]">
      <div className="max-w-6xl mx-auto px-6 grid sm:grid-cols-3 gap-8 text-sm">
        <div>
          <span className="font-display font-extrabold tracking-tight leading-[1.25] text-xl text-white">AVENTRA</span>
          <p className="mt-3 leading-relaxed">
            شريكك اللوجستي من نقطة الشحن لباب التسليم، بنظام تتبع وتخزين موحّد.
          </p>
        </div>
        <div>
          <h4 className="text-white font-bold mb-3">روابط سريعة</h4>
          <ul className="space-y-2.5">
            <li><Link href="/services" className="relative pr-3.5 before:content-['—'] before:absolute before:right-0 before:text-amber/70 hover:text-white transition-colors">خدماتنا</Link></li>
            <li><Link href="/tracking" className="relative pr-3.5 before:content-['—'] before:absolute before:right-0 before:text-amber/70 hover:text-white transition-colors">تتبع الشحنة</Link></li>
            <li><Link href="/quote" className="relative pr-3.5 before:content-['—'] before:absolute before:right-0 before:text-amber/70 hover:text-white transition-colors">اطلب عرض سعر</Link></li>
            <li><Link href="/faq" className="relative pr-3.5 before:content-['—'] before:absolute before:right-0 before:text-amber/70 hover:text-white transition-colors">الأسئلة الشائعة</Link></li>
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
