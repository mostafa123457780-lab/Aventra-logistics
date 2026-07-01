import { createClient } from "@/lib/supabase/server";
import { StatusBadge } from "@/components/dashboard/StatusBadge";
import { EmptyState } from "@/components/dashboard/EmptyState";

export default async function AdminDriversPage() {
  const supabase = await createClient();

  const { data: drivers } = await supabase
    .from("drivers")
    .select("id, license_number, status, profiles(full_name, phone), vehicles(plate_number), branches(branch_name)")
    .order("created_at", { ascending: false });

  return (
    <div>
      <h1 className="text-2xl font-extrabold tracking-tight mb-6">السائقون</h1>

      {!drivers || drivers.length === 0 ? (
        <EmptyState
          title="مفيش سائقين مُسجّلين لسه"
          hint="أضف سائق بربط حساب بدور DRIVER بصف في جدول drivers."
        />
      ) : (
        <div className="bg-white border border-black/10 rounded-xl overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-right text-steel border-b border-black/10">
                <th className="p-4 font-medium">الاسم</th>
                <th className="p-4 font-medium">رقم الرخصة</th>
                <th className="p-4 font-medium">الهاتف</th>
                <th className="p-4 font-medium">المركبة</th>
                <th className="p-4 font-medium">الفرع</th>
                <th className="p-4 font-medium">الحالة</th>
              </tr>
            </thead>
            <tbody>
              {drivers.map((d: any) => {
                const profile = Array.isArray(d.profiles) ? d.profiles[0] : d.profiles;
                const vehicle = Array.isArray(d.vehicles) ? d.vehicles[0] : d.vehicles;
                const branch = Array.isArray(d.branches) ? d.branches[0] : d.branches;
                return (
                  <tr key={d.id} className="border-b border-black/5 last:border-0">
                    <td className="p-4 font-bold">{profile?.full_name ?? "—"}</td>
                    <td className="p-4 font-mono" dir="ltr">
                      {d.license_number}
                    </td>
                    <td className="p-4 text-steel" dir="ltr">
                      {profile?.phone ?? "—"}
                    </td>
                    <td className="p-4 text-steel font-mono" dir="ltr">
                      {vehicle?.plate_number ?? "—"}
                    </td>
                    <td className="p-4 text-steel">{branch?.branch_name ?? "—"}</td>
                    <td className="p-4">
                      <StatusBadge status={d.status} />
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
