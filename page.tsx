import { createClient } from "@/lib/supabase/server";
import { EmptyState } from "@/components/dashboard/EmptyState";

export default async function AdminAuditLogPage() {
  const supabase = await createClient();

  const { data: logs } = await supabase
    .from("audit_logs")
    .select("id, action, table_name, record_id, created_at, profiles(full_name, email)")
    .order("created_at", { ascending: false })
    .limit(50);

  return (
    <div>
      <h1 className="text-2xl font-extrabold tracking-tight mb-6">سجل الأمان</h1>
      <p className="text-sm text-steel mb-6">
        سجل بكل العمليات الحساسة في النظام. هذا السجل للقراءة فقط ولا يمكن لأي مستخدم تعديله.
      </p>

      {!logs || logs.length === 0 ? (
        <EmptyState
          title="مفيش سجلات أمان لسه"
          hint="السجل بيتعبّى تلقائيًا من خلال إجراءات backend موثّقة. لو حابب نفعّل تسجيل تلقائي لعمليات معيّنة، قولنا أي عمليات بالتحديد."
        />
      ) : (
        <div className="bg-white border border-black/10 rounded-xl overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-right text-steel border-b border-black/10">
                <th className="p-4 font-medium">المستخدم</th>
                <th className="p-4 font-medium">الإجراء</th>
                <th className="p-4 font-medium">الجدول</th>
                <th className="p-4 font-medium">السجل</th>
                <th className="p-4 font-medium">التاريخ</th>
              </tr>
            </thead>
            <tbody>
              {logs.map((l) => {
                const profile = Array.isArray(l.profiles) ? l.profiles[0] : l.profiles;
                return (
                  <tr key={l.id} className="border-b border-black/5 last:border-0">
                    <td className="p-4 font-bold">{profile?.full_name ?? "نظام"}</td>
                    <td className="p-4">{l.action}</td>
                    <td className="p-4 font-mono" dir="ltr">
                      {l.table_name}
                    </td>
                    <td className="p-4 font-mono text-steel" dir="ltr">
                      {l.record_id ?? "—"}
                    </td>
                    <td className="p-4 text-steel">{new Date(l.created_at).toLocaleString("ar-EG")}</td>
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
