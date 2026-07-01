import { createClient } from "@/lib/supabase/server";
import { StatusBadge } from "@/components/dashboard/StatusBadge";
import { EmptyState } from "@/components/dashboard/EmptyState";

export default async function AdminContainersPage() {
  const supabase = await createClient();

  const { data: containers } = await supabase
    .from("containers")
    .select("id, container_number, container_type, status, warehouses(warehouse_name)")
    .order("created_at", { ascending: false });

  return (
    <div>
      <h1 className="text-2xl font-extrabold tracking-tight mb-6">الحاويات</h1>

      {!containers || containers.length === 0 ? (
        <EmptyState title="مفيش حاويات مُسجّلة لسه" />
      ) : (
        <div className="bg-white border border-black/10 rounded-xl overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-right text-steel border-b border-black/10">
                <th className="p-4 font-medium">رقم الحاوية</th>
                <th className="p-4 font-medium">النوع</th>
                <th className="p-4 font-medium">المستودع</th>
                <th className="p-4 font-medium">الحالة</th>
              </tr>
            </thead>
            <tbody>
              {containers.map((c: any) => {
                const warehouse = Array.isArray(c.warehouses) ? c.warehouses[0] : c.warehouses;
                return (
                  <tr key={c.id} className="border-b border-black/5 last:border-0">
                    <td className="p-4 font-mono" dir="ltr">
                      {c.container_number}
                    </td>
                    <td className="p-4">{c.container_type}</td>
                    <td className="p-4 text-steel">{warehouse?.warehouse_name ?? "—"}</td>
                    <td className="p-4">
                      <StatusBadge status={c.status} />
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
