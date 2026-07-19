import Link from "next/link";
import { Mail, Phone, MapPin } from "lucide-react";
import { ContactForm } from "@/components/forms/ContactForm";

export default function ContactPage() {
  return (
    <main className="max-w-5xl mx-auto px-6 py-16">
      <Link href="/" className="text-sm text-steel hover:text-ink transition-colors">
        ← الرئيسية
      </Link>

      <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight mt-4 mb-3">تواصل معنا</h1>
      <p className="text-steel text-lg max-w-2xl mb-12">
        فريقنا جاهز للرد على استفساراتك ومساعدتك في اختيار الحل اللوجستي المناسب لشركتك.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-start gap-3">
            <Mail className="text-amber shrink-0 mt-1" size={20} />
            <div>
              <div className="font-bold text-sm">البريد الإلكتروني</div>
              <div className="text-steel text-sm" dir="ltr">sales@aventra-logistics.com</div>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Phone className="text-amber shrink-0 mt-1" size={20} />
            <div>
              <div className="font-bold text-sm">الهاتف</div>
              <div className="text-steel text-sm" dir="ltr">+20 100 000 0000</div>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <MapPin className="text-amber shrink-0 mt-1" size={20} />
            <div>
              <div className="font-bold text-sm">المقر الرئيسي</div>
              <div className="text-steel text-sm">القاهرة، جمهورية مصر العربية</div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-3">
          <ContactForm />
        </div>
      </div>
    </main>
  );
}
