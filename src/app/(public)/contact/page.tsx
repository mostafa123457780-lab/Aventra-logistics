import { Reveal } from "@/components/ui/reveal";
import { Input, Textarea } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Mail, Phone, MapPin } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="bg-paper py-16">
      <div className="max-w-5xl mx-auto px-6 grid lg:grid-cols-2 gap-12">
        <Reveal>
          <span className="font-mono text-xs text-rust">تواصل معنا</span>
          <h1 className="text-3xl font-extrabold mt-2 mb-6">إحنا هنا لو احتجت أي مساعدة</h1>

          <div className="space-y-4 text-sm">
            <div className="flex items-center gap-3">
              <Mail size={18} className="text-amber" />
              <span dir="ltr">contact@aventra.com</span>
            </div>
            <div className="flex items-center gap-3">
              <Phone size={18} className="text-amber" />
              <span dir="ltr">+20 000 000 0000</span>
            </div>
            <div className="flex items-center gap-3">
              <MapPin size={18} className="text-amber" />
              <span>القاهرة، مصر</span>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <form className="bg-white border border-black/10 rounded-xl p-6 space-y-4">
            <Input placeholder="الاسم بالكامل" />
            <Input type="email" dir="ltr" placeholder="name@company.com" />
            <Textarea placeholder="رسالتك..." />
            <Button type="submit" variant="dark" className="w-full">
              إرسال الرسالة
            </Button>
          </form>
        </Reveal>
      </div>
    </div>
  );
}
