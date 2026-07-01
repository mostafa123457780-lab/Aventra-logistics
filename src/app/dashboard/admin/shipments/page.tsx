import { createClient } from "@/lib/supabase/server";
import { StatusBadge } from "@/components/dashboard/StatusBadge";
import { EmptyState } from "@/components/dashboard/EmptyState";

export default async function AdminShipmentsPage() {
  const supabase = await createClient();

  const { data: shipments } = await supabase
    .from("shipments")
    .select("id, tracking_number, origin, destination, service_type, status, created_at, customers(profiles(full_name))")
    .order("created_at", { ascending: false })
    .limit(100);

  return (
    <div>
      <h1 className="text-2xl font-extrabold tracking-tight mb-6">كل الشحنات</h1>

      {!shipments || shipments.length === 0 ? (
        <EmptyState title="مفيش شحنات مُسجّلة لسه" />
      ) : (
        <div className="bg-white border border-black/10 rounded-xl overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-right text-steel border-b border-black/10">
                <th className="p-4 font-medium">رقم البوليصة</th>
                <th className="p-4 font-medium">العميل</th>
                <th className="p-4 font-medium">المسار</th>
                <th className="p-4 font-medium">النوع</th>
                <th className="p-4 font-medium">الحالة</th>
                <th className="p-4 font-medium">التاريخ</th>
              </tr>
            </thead>
            <tbody>
              {shipments.map((s: any) => {
                const customer = Array.isArray(s.customers) ? s.customers[0] : s.customers;
                const profile = customer && Array.isArray(customer.profiles) ? customer.profiles[0] : customer?.profiles;
                return (
                  <tr key={s.id} className="border-b border-black/5 last:border-0">
                    <td className="p-4 font-mono" dir="ltr">
                      {s.tracking_number}
                    </td>
                    <td className="p-4 font-bold">{profile?.full_name ?? "—"}</td>
                    <td className="p-4">
                      {s.origin} → {s.destination}
                    </td>
                    <td className="p-4 text-steel">{s.service_type ?? "—"}</td>
                    <td className="p-4">
                      <StatusBadge status={s.status} />
                    </td>
                    <td className="p-4 text-steel">{new Date(s.created_at).toLocaleDateString("ar-EG")}</td>
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
