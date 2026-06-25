import Link from "next/link";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-[calc(100vh-64px)] grid lg:grid-cols-2">
      <div className="hidden lg:flex flex-col justify-between bg-ink text-white p-12">
        <Link href="/" className="font-display font-extrabold text-2xl tracking-tight">
          AVENTRA
        </Link>
        <div>
          <span className="font-mono text-xs text-amber">بوابة العملاء والفريق</span>
          <h2 className="text-3xl font-extrabold tracking-tight leading-[1.25] mt-3 max-w-sm">
            تابع شحناتك وفواتيرك من مكان واحد.
          </h2>
        </div>
        <p className="text-[#8B98A4] text-sm">© {new Date().getFullYear()} AVENTRA Logistics</p>
      </div>
      <div className="flex items-center justify-center p-6 sm:p-12 bg-paper">
        <div className="w-full max-w-sm">{children}</div>
      </div>
    </div>
  );
}
