import { createClient } from "@/lib/supabase/server";
import { StatusBadge } from "@/components/dashboard/StatusBadge";
import { EmptyState } from "@/components/dashboard/EmptyState";
import { Boxes, Layers as ContainerIcon } from "lucide-react";

export default async function WarehouseRolePage() {
  const supabase = await createClient();

  const [{ data: inventory }, { data: containers }] = await Promise.all([
    supabase
      .from("inventory")
      .select("id, item_name, sku, quantity, status, warehouses(warehouse_name)")
      .order("item_name", { ascending: true })
      .limit(100),
    supabase
      .from("containers")
      .select("id, container_number, container_type, status, warehouses(warehouse_name)")
      .order("created_at", { ascending: false })
      .limit(50),
  ]);

  return (
    <div>
      <h1 className="text-2xl font-extrabold tracking-tight mb-6">لوحة المستودعات</h1>

      <div className="flex items-center gap-2 mb-3">
        <Boxes size={18} className="text-amber" />
        <h2 className="text-lg font-bold">المخزون</h2>
      </div>
      {!inventory || inventory.length === 0 ? (
        <EmptyState title="مفيش أصناف مُسجّلة لسه" />
      ) : (
        <div className="bg-white border border-black/10 rounded-xl overflow-x-auto mb-8">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-right text-steel border-b border-black/10">
                <th className="p-4 font-medium">الصنف</th>
                <th className="p-4 font-medium">SKU</th>
                <th className="p-4 font-medium">الكمية</th>
                <th className="p-4 font-medium">المستودع</th>
                <th className="p-4 font-medium">الحالة</th>
              </tr>
            </thead>
            <tbody>
              {inventory.map((i: any) => {
                const warehouse = Array.isArray(i.warehouses) ? i.warehouses[0] : i.warehouses;
                return (
                  <tr key={i.id} className="border-b border-black/5 last:border-0">
                    <td className="p-4 font-bold">{i.item_name}</td>
                    <td className="p-4 font-mono text-steel" dir="ltr">
                      {i.sku ?? "—"}
                    </td>
                    <td className="p-4">{i.quantity}</td>
                    <td className="p-4 text-steel">{warehouse?.warehouse_name ?? "—"}</td>
                    <td className="p-4">{i.status ? <StatusBadge status={i.status} /> : "—"}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      <div className="flex items-center gap-2 mb-3">
        <ContainerIcon size={18} className="text-amber" />
        <h2 className="text-lg font-bold">الحاويات</h2>
      </div>
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
