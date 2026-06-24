import Link from "next/link";
import { Button } from "@/components/ui/button";

const navLinks = [
  { href: "/", label: "الرئيسية" },
  { href: "/about", label: "عن الشركة" },
  { href: "/services", label: "خدماتنا" },
  { href: "/tracking", label: "تتبع الشحنة" },
  { href: "/blog", label: "المدونة" },
  { href: "/faq", label: "الأسئلة الشائعة" },
  { href: "/contact", label: "تواصل معنا" },
];

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-paper/90 backdrop-blur border-b border-black/10">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <span className="font-display font-extrabold text-2xl tracking-tight text-ink">
            AVENTRA
          </span>
          <span className="hidden sm:inline text-xs font-mono text-steel border-r border-steel pr-2 mr-1">
            LOGISTICS
          </span>
        </Link>

        <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-ink2">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className="hover:text-amber transition-colors">
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          {/* Full locale routing (ar/en) is wired up via src/locales — see README Phase 2 */}
          <button
            className="text-xs font-mono border border-steel/40 rounded-full px-3 py-1.5 text-steel hover:border-amber hover:text-amber transition-colors"
            aria-label="Switch language"
          >
            EN
          </button>
          <Button href="/quote" variant="primary" className="hidden sm:inline-flex !px-4 !py-2 text-sm">
            اطلب عرض سعر
          </Button>
        </div>
      </div>
    </header>
  );
}
