import { createClient } from "@/lib/supabase/server";
import { EmptyState } from "@/components/dashboard/EmptyState";
import { Warehouse as WarehouseIcon } from "lucide-react";

export default async function AdminWarehousesPage() {
  const supabase = await createClient();

  const { data: warehouses } = await supabase
    .from("warehouses")
    .select("id, warehouse_name, warehouse_code, country, city, capacity")
    .order("warehouse_name", { ascending: true });

  return (
    <div>
      <h1 className="text-2xl font-extrabold tracking-tight mb-6">المستودعات</h1>

      {!warehouses || warehouses.length === 0 ? (
        <EmptyState
          title="مفيش مستودعات مُسجّلة لسه"
          hint="أضف مستودع من Supabase Table Editor، أو سيتم بناء فورم إضافة من هنا في مرحلة لاحقة."
        />
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
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
    </div>
  );
}
