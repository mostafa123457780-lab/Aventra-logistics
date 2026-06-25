import { createClient } from "@/lib/supabase/server";
import { EmptyState } from "@/components/dashboard/EmptyState";

export default async function CustomerRequestsPage() {
  const supabase = await createClient();
  const { data: userData } = await supabase.auth.getUser();

  const { data: customer } = await supabase
    .from("customers")
    .select("id")
    .eq("profile_id", userData.user!.id)
    .single();

  const { data: requests } = customer
    ? await supabase
        .from("requests")
        .select("id, request_type, description, status, created_at")
        .eq("customer_id", customer.id)
        .order("created_at", { ascending: false })
    : { data: [] };

  return (
    <div>
      <h1 className="text-2xl font-extrabold tracking-tight mb-6">طلباتي</h1>

      {!requests || requests.length === 0 ? (
        <EmptyState title="مفيش طلبات لسه" hint="طلبات عروض الأسعار اللي تبعتها هتظهر هنا." />
      ) : (
        <div className="space-y-3">
          {requests.map((r) => (
            <div key={r.id} className="bg-white border border-black/10 rounded-xl p-5">
              <div className="flex items-center justify-between mb-2">
                <span className="font-bold">{r.request_type}</span>
                <span className="text-xs text-steel">{new Date(r.created_at).toLocaleDateString("ar-EG")}</span>
              </div>
              <p className="text-sm text-steel">{r.description}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
