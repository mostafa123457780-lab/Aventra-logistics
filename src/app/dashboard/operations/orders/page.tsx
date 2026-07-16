import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { StatusBadge } from "@/components/dashboard/StatusBadge";
import { EmptyState } from "@/components/dashboard/EmptyState";
import { Plus } from "lucide-react";

export default async function OrdersPage() {
  const supabase = await createClient();
  const { data: orders } = await supabase
    .from("orders")
    .select("id, order_number, order_date, status, payment_status, total_amount, customers(company_name)")
    .is("deleted_at", null)
    .order("created_at", { ascending: false });

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-extrabold tracking-tight">الطلبات</h1>
        <Link
          href="/dashboard/operations/orders/new"
          className="flex items-center gap-2 bg-amber text-ink font-bold text-sm px-4 py-2.5 rounded-lg hover:opacity-90 transition-opacity"
        >
          <Plus size={16} /> طلب جديد
        </Link>
      </div>

      {!orders || orders.length === 0 ? (
        <EmptyState title="مفيش طلبات مُسجّلة لسه" hint="الطلبات الجديدة هتظهر هنا أول ما تتضاف." />
      ) : (
        <div className="bg-white border border-black/10 rounded-xl overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-right text-steel border-b border-black/10">
                <th className="p-4 font-medium">رقم الطلب</th>
                <th className="p-4 font-medium">العميل</th>
                <th className="p-4 font-medium">التاريخ</th>
                <th className="p-4 font-medium">الحالة</th>
                <th className="p-4 font-medium">حالة الدفع</th>
                <th className="p-4 font-medium">الإجمالي</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((o: any) => {
                const customer = Array.isArray(o.customers) ? o.customers[0] : o.customers;
                return (
                  <tr key={o.id} className="border-b border-black/5 last:border-0">
                    <td className="p-4 font-mono" dir="ltr">
                      <Link href={`/dashboard/operations/orders/${o.id}`} className="text-amber font-bold hover:underline">
                        {o.order_number}
                      </Link>
                    </td>
                    <td className="p-4">{customer?.company_name ?? "—"}</td>
                    <td className="p-4 text-steel">{new Date(o.order_date).toLocaleDateString("ar-EG")}</td>
                    <td className="p-4"><StatusBadge status={o.status} /></td>
                    <td className="p-4"><StatusBadge status={o.payment_status} /></td>
                    <td className="p-4 font-mono" dir="ltr">{o.total_amount}</td>
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
