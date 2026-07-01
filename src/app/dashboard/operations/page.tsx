import { createClient } from "@/lib/supabase/server";
import { StatusBadge } from "@/components/dashboard/StatusBadge";
import { EmptyState } from "@/components/dashboard/EmptyState";
import { Truck, Package, Users } from "lucide-react";

export default async function OperationsPage() {
  const supabase = await createClient();

  const [{ count: activeVehicles }, { count: activeDrivers }, { data: trips }] = await Promise.all([
    supabase.from("vehicles").select("id", { count: "exact", head: true }).eq("status", "Active"),
    supabase.from("drivers").select("id", { count: "exact", head: true }).eq("status", "Active"),
    supabase
      .from("trips")
      .select("id, status, created_at, shipments(tracking_number), vehicles(plate_number), drivers(profiles(full_name))")
      .order("created_at", { ascending: false })
      .limit(50),
  ]);

  const cards = [
    { label: "مركبات نشطة", value: activeVehicles ?? 0, icon: Truck },
    { label: "سائقون نشطون", value: activeDrivers ?? 0, icon: Users },
    { label: "رحلات حديثة", value: trips?.length ?? 0, icon: Package },
  ];

  return (
    <div>
      <h1 className="text-2xl font-extrabold tracking-tight mb-6">لوحة العمليات</h1>

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

      <h2 className="text-lg font-bold mb-3">آخر الرحلات</h2>
      {!trips || trips.length === 0 ? (
        <EmptyState title="مفيش رحلات مُسجّلة لسه" hint="الرحلات هتظهر هنا أول ما تتعيّن مركبة وسائق لشحنة." />
      ) : (
        <div className="bg-white border border-black/10 rounded-xl overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-right text-steel border-b border-black/10">
                <th className="p-4 font-medium">رقم البوليصة</th>
                <th className="p-4 font-medium">السائق</th>
                <th className="p-4 font-medium">المركبة</th>
                <th className="p-4 font-medium">الحالة</th>
                <th className="p-4 font-medium">التاريخ</th>
              </tr>
            </thead>
            <tbody>
              {trips.map((t: any) => {
                const shipment = Array.isArray(t.shipments) ? t.shipments[0] : t.shipments;
                const vehicle = Array.isArray(t.vehicles) ? t.vehicles[0] : t.vehicles;
                const driver = Array.isArray(t.drivers) ? t.drivers[0] : t.drivers;
                const driverProfile = driver && Array.isArray(driver.profiles) ? driver.profiles[0] : driver?.profiles;
                return (
                  <tr key={t.id} className="border-b border-black/5 last:border-0">
                    <td className="p-4 font-mono" dir="ltr">
                      {shipment?.tracking_number ?? "—"}
                    </td>
                    <td className="p-4">{driverProfile?.full_name ?? "غير معيّن"}</td>
                    <td className="p-4 font-mono text-steel" dir="ltr">
                      {vehicle?.plate_number ?? "—"}
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
    </div>
  );
}
