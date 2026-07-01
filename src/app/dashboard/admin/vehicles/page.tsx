import { createClient } from "@/lib/supabase/server";
import { StatusBadge } from "@/components/dashboard/StatusBadge";
import { EmptyState } from "@/components/dashboard/EmptyState";

export default async function AdminVehiclesPage() {
  const supabase = await createClient();

  const { data: vehicles } = await supabase
    .from("vehicles")
    .select("id, plate_number, vehicle_type, capacity_kg, status, branches(branch_name)")
    .order("plate_number", { ascending: true });

  return (
    <div>
      <h1 className="text-2xl font-extrabold tracking-tight mb-6">المركبات</h1>

      {!vehicles || vehicles.length === 0 ? (
        <EmptyState title="مفيش مركبات مُسجّلة لسه" />
      ) : (
        <div className="bg-white border border-black/10 rounded-xl overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-right text-steel border-b border-black/10">
                <th className="p-4 font-medium">رقم اللوحة</th>
                <th className="p-4 font-medium">النوع</th>
                <th className="p-4 font-medium">السعة</th>
                <th className="p-4 font-medium">الفرع</th>
                <th className="p-4 font-medium">الحالة</th>
              </tr>
            </thead>
            <tbody>
              {vehicles.map((v: any) => {
                const branch = Array.isArray(v.branches) ? v.branches[0] : v.branches;
                return (
                  <tr key={v.id} className="border-b border-black/5 last:border-0">
                    <td className="p-4 font-mono" dir="ltr">
                      {v.plate_number}
                    </td>
                    <td className="p-4">{v.vehicle_type}</td>
                    <td className="p-4 text-steel">{v.capacity_kg ? `${v.capacity_kg} كجم` : "—"}</td>
                    <td className="p-4 text-steel">{branch?.branch_name ?? "—"}</td>
                    <td className="p-4">
                      <StatusBadge status={v.status} />
                    </td>
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
