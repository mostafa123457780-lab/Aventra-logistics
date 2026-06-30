import { createClient } from "@/lib/supabase/server";
import { StatusBadge } from "@/components/dashboard/StatusBadge";
import { EmptyState } from "@/components/dashboard/EmptyState";
import { Wallet, AlertCircle, Receipt, CheckCircle2 } from "lucide-react";

export default async function AccountantPage() {
  const supabase = await createClient();

  const [{ data: invoices }, { count: unpaidCount }, { count: overdueCount }] = await Promise.all([
    supabase
      .from("invoices")
      .select("id, invoice_number, amount, payment_status, created_at")
      .order("created_at", { ascending: false })
      .limit(25),
    supabase.from("invoices").select("id", { count: "exact", head: true }).neq("payment_status", "Paid"),
    supabase.from("invoices").select("id", { count: "exact", head: true }).eq("payment_status", "Overdue"),
  ]);

  const { data: payments } = await supabase
    .from("payments")
    .select("id, amount, payment_method, payment_date, invoices(invoice_number)")
    .order("payment_date", { ascending: false })
    .limit(20);

  const { data: expenses } = await supabase
    .from("expenses")
    .select("id, expense_type, amount, notes, created_at")
    .order("created_at", { ascending: false })
    .limit(20);

  const totalAmount = (invoices ?? []).reduce((sum, inv) => sum + (inv.amount ?? 0), 0);
  const paidCount = (invoices ?? []).filter((i) => i.payment_status === "Paid").length;

  const cards = [
    { label: "إجمالي قيمة الفواتير", value: `${totalAmount.toLocaleString("ar-EG")} ج.م`, icon: Wallet },
    { label: "فواتير غير مدفوعة", value: unpaidCount ?? 0, icon: AlertCircle },
    { label: "فواتير متأخرة", value: overdueCount ?? 0, icon: Receipt },
    { label: "فواتير مدفوعة", value: paidCount, icon: CheckCircle2 },
  ];

  return (
    <div>
      <h1 className="text-2xl font-extrabold tracking-tight mb-6">الحسابات</h1>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {cards.map((c) => {
          const Icon = c.icon;
          return (
            <div key={c.label} className="bg-white border border-black/10 rounded-xl p-5">
              <Icon className="text-amber mb-3" size={22} />
              <div className="text-2xl font-extrabold" dir="ltr">
                {c.value}
              </div>
              <div className="text-sm text-steel mt-1">{c.label}</div>
            </div>
          );
        })}
      </div>

      <h2 className="text-lg font-bold mb-3">أحدث الفواتير</h2>
      {!invoices || invoices.length === 0 ? (
        <EmptyState title="مفيش فواتير لسه" />
      ) : (
        <div className="bg-white border border-black/10 rounded-xl overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-right text-steel border-b border-black/10">
                <th className="p-4 font-medium">رقم الفاتورة</th>
                <th className="p-4 font-medium">المبلغ</th>
                <th className="p-4 font-medium">الحالة</th>
                <th className="p-4 font-medium">التاريخ</th>
              </tr>
            </thead>
            <tbody>
              {invoices.map((inv) => (
                <tr key={inv.id} className="border-b border-black/5 last:border-0">
                  <td className="p-4 font-mono" dir="ltr">
                    {inv.invoice_number}
                  </td>
                  <td className="p-4 font-bold" dir="ltr">
                    {inv.amount} ج.م
                  </td>
                  <td className="p-4">
                    <StatusBadge status={inv.payment_status} />
                  </td>
                  <td className="p-4 text-steel">{new Date(inv.created_at).toLocaleDateString("ar-EG")}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <h2 className="text-lg font-bold mb-3 mt-8">الدفعات</h2>
      {!payments || payments.length === 0 ? (
        <EmptyState title="مفيش دفعات مُسجّلة لسه" />
      ) : (
        <div className="bg-white border border-black/10 rounded-xl overflow-x-auto mb-8">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-right text-steel border-b border-black/10">
                <th className="p-4 font-medium">رقم الفاتورة</th>
                <th className="p-4 font-medium">المبلغ</th>
                <th className="p-4 font-medium">طريقة الدفع</th>
                <th className="p-4 font-medium">التاريخ</th>
              </tr>
            </thead>
            <tbody>
              {payments.map((p) => {
                const invoice = Array.isArray(p.invoices) ? p.invoices[0] : p.invoices;
                return (
                  <tr key={p.id} className="border-b border-black/5 last:border-0">
                    <td className="p-4 font-mono" dir="ltr">
                      {invoice?.invoice_number ?? "—"}
                    </td>
                    <td className="p-4 font-bold" dir="ltr">
                      {p.amount} ج.م
                    </td>
                    <td className="p-4">{p.payment_method ?? "—"}</td>
                    <td className="p-4 text-steel">{new Date(p.payment_date).toLocaleDateString("ar-EG")}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      <h2 className="text-lg font-bold mb-3">المصروفات</h2>
      {!expenses || expenses.length === 0 ? (
        <EmptyState title="مفيش مصروفات مُسجّلة لسه" />
      ) : (
        <div className="bg-white border border-black/10 rounded-xl overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-right text-steel border-b border-black/10">
                <th className="p-4 font-medium">النوع</th>
                <th className="p-4 font-medium">المبلغ</th>
                <th className="p-4 font-medium">ملاحظات</th>
                <th className="p-4 font-medium">التاريخ</th>
              </tr>
            </thead>
            <tbody>
              {expenses.map((e) => (
                <tr key={e.id} className="border-b border-black/5 last:border-0">
                  <td className="p-4 font-bold">{e.expense_type ?? "—"}</td>
                  <td className="p-4" dir="ltr">
                    {e.amount} ج.م
                  </td>
                  <td className="p-4 text-steel">{e.notes ?? "—"}</td>
                  <td className="p-4 text-steel">{new Date(e.created_at).toLocaleDateString("ar-EG")}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
