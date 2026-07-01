import { createClient } from "@/lib/supabase/server";
import { StatusBadge } from "@/components/dashboard/StatusBadge";
import { EmptyState } from "@/components/dashboard/EmptyState";
import { FileText, CheckCircle2, Wallet } from "lucide-react";

export default async function AccountantPage() {
  const supabase = await createClient();

  const [{ count: unpaidInvoices }, { count: paidInvoices }, { data: payments }] = await Promise.all([
    supabase.from("invoices").select("id", { count: "exact", head: true }).neq("payment_status", "Paid"),
    supabase.from("invoices").select("id", { count: "exact", head: true }).eq("payment_status", "Paid"),
    supabase
      .from("payments")
      .select("id, amount, method, paid_at, invoices(invoice_number, customers(profiles(full_name)))")
      .order("paid_at", { ascending: false })
      .limit(50),
  ]);

  const cards = [
    { label: "فواتير غير مدفوعة", value: unpaidInvoices ?? 0, icon: FileText },
    { label: "فواتير مدفوعة بالكامل", value: paidInvoices ?? 0, icon: CheckCircle2 },
    { label: "آخر المدفوعات", value: payments?.length ?? 0, icon: Wallet },
  ];

  return (
    <div>
      <h1 className="text-2xl font-extrabold tracking-tight mb-6">لوحة الحسابات</h1>

      <div className="grid sm:grid-cols-3 gap-4 mb-8">
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

      <h2 className="text-lg font-bold mb-3">آخر المدفوعات</h2>
      {!payments || payments.length === 0 ? (
        <EmptyState title="مفيش مدفوعات مُسجّلة لسه" />
      ) : (
        <div className="bg-white border border-black/10 rounded-xl overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-right text-steel border-b border-black/10">
                <th className="p-4 font-medium">رقم الفاتورة</th>
                <th className="p-4 font-medium">العميل</th>
                <th className="p-4 font-medium">المبلغ</th>
                <th className="p-4 font-medium">طريقة الدفع</th>
                <th className="p-4 font-medium">التاريخ</th>
              </tr>
            </thead>
            <tbody>
              {payments.map((p: any) => {
                const invoice = Array.isArray(p.invoices) ? p.invoices[0] : p.invoices;
                const customer = invoice && Array.isArray(invoice.customers) ? invoice.customers[0] : invoice?.customers;
                const profile = customer && Array.isArray(customer.profiles) ? customer.profiles[0] : customer?.profiles;
                return (
                  <tr key={p.id} className="border-b border-black/5 last:border-0">
                    <td className="p-4 font-mono" dir="ltr">
                      {invoice?.invoice_number ?? "—"}
                    </td>
                    <td className="p-4 font-bold">{profile?.full_name ?? "—"}</td>
                    <td className="p-4 font-bold" dir="ltr">
                      {p.amount} ج.م
                    </td>
                    <td className="p-4 text-steel">{p.method}</td>
                    <td className="p-4 text-steel">{new Date(p.paid_at).toLocaleDateString("ar-EG")}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
