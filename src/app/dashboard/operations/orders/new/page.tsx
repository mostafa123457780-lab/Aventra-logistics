import { createClient } from "@/lib/supabase/server";
import { OrderForm } from "@/components/orders/OrderForm";

export default async function NewOrderPage() {
  const supabase = await createClient();
  const { data: customers } = await supabase
    .from("customers")
    .select("id, company_name")
    .is("deleted_at", null)
    .order("company_name", { ascending: true });

  return (
    <div>
      <h1 className="text-2xl font-extrabold tracking-tight mb-6">طلب جديد</h1>
      <OrderForm customers={customers ?? []} />
    </div>
  );
}
