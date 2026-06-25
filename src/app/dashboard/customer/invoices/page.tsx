import { createClient } from "@/lib/supabase/server";
import { StatusBadge } from "@/components/dashboard/StatusBadge";
import { EmptyState } from "@/components/dashboard/EmptyState";

export default async function CustomerInvoicesPage() {
  const supabase = await createClient();
  const { data: userData } = await supabase.auth.getUser();

  const { data: customer } = await supabase
    .from("customers")
    .select("id")
    .eq("profile_id", userData.user!.id)
    .single();

  const { data: invoices } = customer
    ? await supabase
        .from("invoices")
        .select("id, invoice_number, amount, payment_status, created_at")
        .eq("customer_id", customer.id)
        .order("created_at", { ascending: false })
    : { data: [] };

  return (
    <div>
      <h1 className="text-2xl font-extrabold tracking-tight mb-6">فواتيري</h1>

      {!invoices || invoices.length === 0 ? (
        <EmptyState title="مفيش فواتير لسه" hint="هتظهر هنا أول ما تتولّد فاتورة لشحنة." />
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
                  <td className="p-4 font-mono" dir="ltr">{inv.invoice_number}</td>
                  <td className="p-4 font-bold" dir="ltr">{inv.amount} ج.م</td>
                  <td className="p-4"><StatusBadge status={inv.payment_status} /></td>
                  <td className="p-4 text-steel">{new Date(inv.created_at).toLocaleDateString("ar-EG")}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
