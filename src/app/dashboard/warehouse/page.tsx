import { createClient } from "@/lib/supabase/server";
import { EmptyState } from "@/components/dashboard/EmptyState";
import { Warehouse as WarehouseIcon } from "lucide-react";

export default async function WarehousePage() {
  const supabase = await createClient();

  const { data: warehouses } = await supabase
    .from("warehouses")
    .select("id, warehouse_name, warehouse_code, country, city, capacity")
    .order("warehouse_name", { ascending: true });

  const { data: inventory } = await supabase
    .from("inventory")
    .select("id, item_name, sku, quantity, status")
    .order("id", { ascending: false })
    .limit(20);

  const { data: locations } = await supabase
    .from("warehouse_locations")
    .select("id, zone, rack, shelf, bin, warehouses(warehouse_name)")
    .order("id", { ascending: false })
    .limit(20);

  return (
    <div>
      <h1 className="text-2xl font-extrabold tracking-tight mb-6">المستودعات</h1>

      {!warehouses || warehouses.length === 0 ? (
        <EmptyState
          title="مفيش مستودعات مُسجّلة لسه"
          hint="أضف مستودع من Supabase Table Editor، أو سيتم بناء فورم إضافة من هنا قريبًا."
        />
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {warehouses.map((w) => (
            <div key={w.id} className="bg-white border border-black/10 rounded-xl p-5">
              <WarehouseIcon className="text-amber mb-3" size={22} />
              <div className="font-bold">{w.warehouse_name}</div>
              <div className="text-xs text-steel font-mono mt-0.5" dir="ltr">
                {w.warehouse_code}
              </div>
              <div className="text-sm text-steel mt-2">
                {w.city}، {w.country}
              </div>
              {w.capacity != null && <div className="text-sm text-steel mt-1">السعة: {w.capacity}</div>}
            </div>
          ))}
        </div>
      )}

      <h2 className="text-lg font-bold mb-3">أحدث حركة مخزون</h2>
      {!inventory || inventory.length === 0 ? (
        <EmptyState title="مفيش بنود مخزون مُسجّلة لسه" />
      ) : (
        <div className="bg-white border border-black/10 rounded-xl overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-right text-steel border-b border-black/10">
                <th className="p-4 font-medium">البند</th>
                <th className="p-4 font-medium">SKU</th>
                <th className="p-4 font-medium">الكمية</th>
                <th className="p-4 font-medium">الحالة</th>
              </tr>
            </thead>
            <tbody>
              {inventory.map((i) => (
                <tr key={i.id} className="border-b border-black/5 last:border-0">
                  <td className="p-4 font-bold">{i.item_name}</td>
                  <td className="p-4 font-mono text-steel" dir="ltr">
                    {i.sku ?? "—"}
                  </td>
                  <td className="p-4">{i.quantity}</td>
                  <td className="p-4 text-steel">{i.status ?? "—"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <h2 className="text-lg font-bold mb-3 mt-8">مواقع التخزين</h2>
      {!locations || locations.length === 0 ? (
        <EmptyState title="مفيش مواقع تخزين مُسجّلة لسه" />
      ) : (
        <div className="bg-white border border-black/10 rounded-xl overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-right text-steel border-b border-black/10">
                <th className="p-4 font-medium">المستودع</th>
                <th className="p-4 font-medium">المنطقة</th>
                <th className="p-4 font-medium">الرف</th>
                <th className="p-4 font-medium">الدرف</th>
                <th className="p-4 font-medium">الصندوق</th>
              </tr>
            </thead>
            <tbody>
              {locations.map((l) => {
                const wh = Array.isArray(l.warehouses) ? l.warehouses[0] : l.warehouses;
                return (
                  <tr key={l.id} className="border-b border-black/5 last:border-0">
                    <td className="p-4 font-bold">{wh?.warehouse_name ?? "—"}</td>
                    <td className="p-4">{l.zone ?? "—"}</td>
                    <td className="p-4">{l.rack ?? "—"}</td>
                    <td className="p-4">{l.shelf ?? "—"}</td>
                    <td className="p-4">{l.bin ?? "—"}</td>
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
