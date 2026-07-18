import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { OrderForm } from "@/components/orders/OrderForm";
import { StatusBadge } from "@/components/dashboard/StatusBadge";

export default async function OrderDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createClient();

  const { data: order } = await supabase
    .from("orders")
    .select("id, customer_id, order_date, status, payment_status, total_amount, notes, order_number, customers(company_name)")
    .eq("id", id)
    .is("deleted_at", null)
    .single();

  if (!order) notFound();

  const { data: customers } = await supabase
    .from("customers")
    .select("id, company_name")
    .is("deleted_at", null)
    .order("company_name", { ascending: true });

  const { data: shipments } = await supabase
    .from("shipments")
    .select("id, tracking_number, status")
    .eq("order_id", id)
    .is("deleted_at", null);

  const customer = Array.isArray(order.customers) ? order.customers[0] : order.customers;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight" dir="ltr">
            {order.order_number}
          </h1>
          <p className="text-sm text-steel mt-1">{customer?.company_name ?? "بدون عميل"}</p>
        </div>
        <StatusBadge status={order.status} />
      </div>

      <OrderForm customers={customers ?? []} order={order} />

      <div className="mt-10">
        <h2 className="text-lg font-bold mb-3">الشحنات المرتبطة</h2>
        {!shipments || shipments.length === 0 ? (
          <p className="text-sm text-steel">مفيش شحنات مرتبطة بالطلب ده لسه.</p>
        ) : (
          <div className="bg-white border border-black/10 rounded-xl overflow-hidden">
            {shipments.map((s: any) => (
              <div key={s.id} className="flex items-center justify-between p-4 border-b border-black/5 last:border-0">
                <span className="font-mono text-sm" dir="ltr">{s.tracking_number}</span>
                <StatusBadge status={s.status} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
