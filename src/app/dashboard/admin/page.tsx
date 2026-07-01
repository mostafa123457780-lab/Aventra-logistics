import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import { Package, Users, Warehouse, FileText } from "lucide-react";

export default async function AdminOverviewPage() {
  const supabase = await createClient();

  const [{ count: shipments }, { count: customers }, { count: warehouses }, { count: openInvoices }] =
    await Promise.all([
      supabase.from("shipments").select("id", { count: "exact", head: true }),
      supabase.from("customers").select("id", { count: "exact", head: true }),
      supabase.from("warehouses").select("id", { count: "exact", head: true }),
      supabase.from("invoices").select("id", { count: "exact", head: true }).neq("payment_status", "Paid"),
    ]);

  const cards = [
    { href: "/dashboard/admin/shipments", label: "إجمالي الشحنات", value: shipments ?? 0, icon: Package },
    { href: "/dashboard/admin/customers", label: "العملاء", value: customers ?? 0, icon: Users },
    { href: "/dashboard/admin/warehouses", label: "المستودعات", value: warehouses ?? 0, icon: Warehouse },
    { href: "/dashboard/admin/invoices", label: "فواتير غير مدفوعة", value: openInvoices ?? 0, icon: FileText },
  ];

  return (
    <div>
      <h1 className="text-2xl font-extrabold tracking-tight mb-6">نظرة عامة — Admin</h1>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map((c) => {
          const Icon = c.icon;
          return (
            <Link
              key={c.label}
              href={c.href}
              className="bg-white border border-black/10 rounded-xl p-5 hover:border-amber hover:shadow-sm transition-all block"
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
