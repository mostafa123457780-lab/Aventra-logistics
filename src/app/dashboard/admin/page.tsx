import { createClient } from "@/lib/supabase/server";
import { Package, Users, Warehouse, FileText } from "lucide-react";

export default async function AdminOverviewPage() {
  const supabase = await createClient();

  const [{ count: shipments }, { count: customers }, { count: warehouses }, { count: openInvoices }] =
    await Promise.all([
      supabase.from("shipments").select("id", { count: "exact", head: true }),
      supabase.from("customers").select("id", { count: "exact", head: true }),
      supabase.from("warehouses").select("id", { count: "exact", head: true }),
      supabase
        .from("invoices")
        .select("id", { count: "exact", head: true })
        .neq("payment_status", "Paid"),
    ]);

  const cards = [
    { label: "إجمالي الشحنات", value: shipments ?? 0, icon: Package },
    { label: "العملاء", value: customers ?? 0, icon: Users },
    { label: "المستودعات", value: warehouses ?? 0, icon: Warehouse },
    { label: "فواتير غير مدفوعة", value: openInvoices ?? 0, icon: FileText },
  ];

  return (
    <div>
      <h1 className="text-2xl font-extrabold tracking-tight mb-6">نظرة عامة — Admin</h1>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map((c) => {
          const Icon = c.icon;
          return (
            <div key={c.label} className="bg-white border border-black/10 rounded-xl p-5">
              <Icon className="text-amber mb-3" size={22} />
              <div className="text-3xl font-extrabold">{c.value}</div>
              <div className="text-sm text-steel mt-1">{c.label}</div>
            </div>
          );
        })}
      </div>
      <p className="text-sm text-steel mt-8">
        إدارة الشحنات، المستخدمين، والتقارير التفصيلية هتُبنى في مرحلة لاحقة.
      </p>
    </div>
  );
}
