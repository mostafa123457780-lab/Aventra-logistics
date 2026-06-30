import { createClient } from "@/lib/supabase/server";
import { EmptyState } from "@/components/dashboard/EmptyState";

export default async function AdminTrackingPage() {
  const supabase = await createClient();

  const { data: events } = await supabase
    .from("shipment_tracking")
    .select("id, location, status, notes, created_at, shipments(tracking_number)")
    .order("created_at", { ascending: false })
    .limit(50);

  return (
    <div>
      <h1 className="text-2xl font-extrabold tracking-tight mb-6">تتبع الشحنات</h1>

      {!events || events.length === 0 ? (
        <EmptyState title="مفيش تحديثات تتبع مُسجّلة لسه" />
      ) : (
        <div className="bg-white border border-black/10 rounded-xl overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-right text-steel border-b border-black/10">
                <th className="p-4 font-medium">رقم البوليصة</th>
                <th className="p-4 font-medium">الموقع</th>
                <th className="p-4 font-medium">الحالة</th>
                <th className="p-4 font-medium">ملاحظات</th>
                <th className="p-4 font-medium">التاريخ</th>
              </tr>
            </thead>
            <tbody>
              {events.map((e) => {
                const shipment = Array.isArray(e.shipments) ? e.shipments[0] : e.shipments;
                return (
                  <tr key={e.id} className="border-b border-black/5 last:border-0">
                    <td className="p-4 font-mono" dir="ltr">
                      {shipment?.tracking_number ?? "—"}
                    </td>
                    <td className="p-4">{e.location ?? "—"}</td>
                    <td className="p-4 font-bold">{e.status}</td>
                    <td className="p-4 text-steel">{e.notes ?? "—"}</td>
                    <td className="p-4 text-steel">{new Date(e.created_at).toLocaleString("ar-EG")}</td>
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
