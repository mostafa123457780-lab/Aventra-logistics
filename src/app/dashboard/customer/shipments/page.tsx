import { createClient } from "@/lib/supabase/server";
import { StatusBadge } from "@/components/dashboard/StatusBadge";
import { EmptyState } from "@/components/dashboard/EmptyState";

export default async function CustomerShipmentsPage() {
  const supabase = await createClient();
  const { data: userData } = await supabase.auth.getUser();

  const { data: customer } = await supabase
    .from("customers")
    .select("id")
    .eq("profile_id", userData.user!.id)
    .single();

  const { data: shipments } = customer
    ? await supabase
        .from("shipments")
        .select("id, tracking_number, origin, destination, service_type, status, created_at")
        .eq("customer_id", customer.id)
        .order("created_at", { ascending: false })
    : { data: [] };

  return (
    <div>
      <h1 className="text-2xl font-extrabold tracking-tight mb-6">شحناتي</h1>

      {!shipments || shipments.length === 0 ? (
        <EmptyState title="مفيش شحنات لسه" hint="أي شحنة تطلبها هتظهر هنا تلقائيًا." />
      ) : (
        <div className="bg-white border border-black/10 rounded-xl overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-right text-steel border-b border-black/10">
                <th className="p-4 font-medium">رقم البوليصة</th>
                <th className="p-4 font-medium">المسار</th>
                <th className="p-4 font-medium">النوع</th>
                <th className="p-4 font-medium">الحالة</th>
                <th className="p-4 font-medium">التاريخ</th>
              </tr>
            </thead>
            <tbody>
              {shipments.map((s) => (
                <tr key={s.id} className="border-b border-black/5 last:border-0">
                  <td className="p-4 font-mono" dir="ltr">{s.tracking_number}</td>
                  <td className="p-4">{s.origin} → {s.destination}</td>
                  <td className="p-4">{s.service_type}</td>
                  <td className="p-4"><StatusBadge status={s.status} /></td>
                  <td className="p-4 text-steel">{new Date(s.created_at).toLocaleDateString("ar-EG")}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
