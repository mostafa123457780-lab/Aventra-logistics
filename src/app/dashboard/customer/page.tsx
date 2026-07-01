import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import { Package, FileText, Inbox } from "lucide-react";

export default async function CustomerOverviewPage() {
  const supabase = await createClient();
  const { data: userData } = await supabase.auth.getUser();

  const { data: customer } = await supabase
    .from("customers")
    .select("id")
    .eq("profile_id", userData.user!.id)
    .single();

  const [{ count: shipmentsCount }, { count: invoicesCount }, { count: requestsCount }] = customer
    ? await Promise.all([
        supabase.from("shipments").select("id", { count: "exact", head: true }).eq("customer_id", customer.id),
        supabase
          .from("invoices")
          .select("id", { count: "exact", head: true })
          .eq("customer_id", customer.id)
          .neq("payment_status", "Paid"),
        supabase.from("requests").select("id", { count: "exact", head: true }).eq("customer_id", customer.id),
      ])
    : [{ count: 0 }, { count: 0 }, { count: 0 }];

  const cards = [
    { href: "/dashboard/customer/shipments", label: "شحنات حالية", value: shipmentsCount ?? 0, icon: Package },
    { href: "/dashboard/customer/invoices", label: "فواتير غير مدفوعة", value: invoicesCount ?? 0, icon: FileText },
    { href: "/dashboard/customer/requests", label: "طلبات مفتوحة", value: requestsCount ?? 0, icon: Inbox },
  ];

  return (
    <div>
      <h1 className="text-2xl font-extrabold tracking-tight mb-6">نظرة عامة</h1>
      <div className="grid sm:grid-cols-3 gap-4">
        {cards.map((c) => {
          const Icon = c.icon;
          return (
            <Link
              key={c.href}
              href={c.href}
              className="bg-white border border-black/10 rounded-xl p-5 hover:border-amber transition-colors"
            >
              <Icon className="text-amber mb-3" size={22} />
              <div className="text-3xl font-extrabold">{c.value}</div>
              <div className="text-sm text-steel mt-1">{c.label}</div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
