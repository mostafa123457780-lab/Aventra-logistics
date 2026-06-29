import { createClient } from "@/lib/supabase/server";
import { EmptyState } from "@/components/dashboard/EmptyState";

export default async function AdminCustomersPage() {
  const supabase = await createClient();

  const { data: customers } = await supabase
    .from("customers")
    .select("id, company_name, address, created_at, profiles(full_name, email, phone)")
    .order("created_at", { ascending: false });

  return (
    <div>
      <h1 className="text-2xl font-extrabold tracking-tight mb-6">العملاء</h1>

      {!customers || customers.length === 0 ? (
        <EmptyState title="مفيش عملاء مُسجّلين لسه" />
      ) : (
        <div className="bg-white border border-black/10 rounded-xl overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-right text-steel border-b border-black/10">
                <th className="p-4 font-medium">الاسم</th>
                <th className="p-4 font-medium">الشركة</th>
                <th className="p-4 font-medium">البريد الإلكتروني</th>
                <th className="p-4 font-medium">الهاتف</th>
                <th className="p-4 font-medium">تاريخ التسجيل</th>
              </tr>
            </thead>
            <tbody>
              {customers.map((c) => {
                const profile = Array.isArray(c.profiles) ? c.profiles[0] : c.profiles;
                return (
                  <tr key={c.id} className="border-b border-black/5 last:border-0">
                    <td className="p-4 font-bold">{profile?.full_name ?? "—"}</td>
                    <td className="p-4">{c.company_name ?? "—"}</td>
                    <td className="p-4" dir="ltr">
                      {profile?.email ?? "—"}
                    </td>
                    <td className="p-4" dir="ltr">
                      {profile?.phone ?? "—"}
                    </td>
                    <td className="p-4 text-steel">{new Date(c.created_at).toLocaleDateString("ar-EG")}</td>
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
