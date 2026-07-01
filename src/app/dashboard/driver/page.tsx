import { createClient } from "@/lib/supabase/server";
import { StatusBadge } from "@/components/dashboard/StatusBadge";
import { EmptyState } from "@/components/dashboard/EmptyState";

export default async function DriverPage() {
  const supabase = await createClient();
  const { data: userData } = await supabase.auth.getUser();

  const { data: driver } = await supabase
    .from("drivers")
    .select("id, license_number, status, vehicles(plate_number, vehicle_type)")
    .eq("profile_id", userData.user!.id)
    .single();

  const { data: trips } = driver
    ? await supabase
        .from("trips")
        .select("id, status, created_at, shipments(tracking_number, origin, destination)")
        .eq("driver_id", driver.id)
        .order("created_at", { ascending: false })
    : { data: [] };

  const vehicle = driver && Array.isArray((driver as any).vehicles) ? (driver as any).vehicles[0] : (driver as any)?.vehicles;

  return (
    <div>
      <h1 className="text-2xl font-extrabold tracking-tight mb-6">رحلاتي</h1>

      {!driver ? (
        <EmptyState
          title="حسابك لسه مش مربوط بصف سائق"
          hint="اطلب من الأدمن يربط حسابك بجدول drivers عشان تقدر تشوف رحلاتك."
        />
      ) : (
        <>
          <div className="bg-white border border-black/10 rounded-xl p-5 mb-6 flex flex-wrap gap-6">
            <div>
              <div className="text-xs text-steel mb-1">رقم الرخصة</div>
              <div className="font-mono font-bold" dir="ltr">
                {driver.license_number}
              </div>
            </div>
            <div>
              <div className="text-xs text-steel mb-1">المركبة</div>
              <div className="font-bold">{vehicle?.plate_number ?? "غير معيّنة"}</div>
            </div>
            <div>
              <div className="text-xs text-steel mb-1">الحالة</div>
              <StatusBadge status={driver.status} />
            </div>
          </div>

          {!trips || trips.length === 0 ? (
            <EmptyState title="مفيش رحلات معيّنة لك لسه" />
          ) : (
            <div className="bg-white border border-black/10 rounded-xl overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-right text-steel border-b border-black/10">
                    <th className="p-4 font-medium">رقم البوليصة</th>
                    <th className="p-4 font-medium">المسار</th>
                    <th className="p-4 font-medium">الحالة</th>
                    <th className="p-4 font-medium">التاريخ</th>
                  </tr>
                </thead>
                <tbody>
                  {trips.map((t: any) => {
                    const shipment = Array.isArray(t.shipments) ? t.shipments[0] : t.shipments;
                    return (
                      <tr key={t.id} className="border-b border-black/5 last:border-0">
                        <td className="p-4 font-mono" dir="ltr">
                          {shipment?.tracking_number ?? "—"}
                        </td>
                        <td className="p-4">
                          {shipment?.origin} → {shipment?.destination}
                        </td>
                        <td className="p-4">
                          <StatusBadge status={t.status} />
                        </td>
                        <td className="p-4 text-steel">{new Date(t.created_at).toLocaleDateString("ar-EG")}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </>
      )}
    </div>
  );
}
