import { createClient } from "@/lib/supabase/server";
import { EmptyState } from "@/components/dashboard/EmptyState";
import { updateUserRoleAction } from "@/lib/actions/admin";
import type { UserRole } from "@/types/database";

const ROLE_LABELS: Record<UserRole, string> = {
  ADMIN: "أدمن",
  OPERATIONS_MANAGER: "مدير عمليات",
  ACCOUNTANT: "محاسب",
  WAREHOUSE_MANAGER: "مدير مخزن",
  WAREHOUSE_EMPLOYEE: "موظف مخزن",
  DRIVER: "سائق",
  CUSTOMER: "عميل",
};

const ALL_ROLES: UserRole[] = [
  "ADMIN",
  "OPERATIONS_MANAGER",
  "ACCOUNTANT",
  "WAREHOUSE_MANAGER",
  "WAREHOUSE_EMPLOYEE",
  "DRIVER",
  "CUSTOMER",
];

export default async function AdminUsersPage() {
  const supabase = await createClient();
  const { data: userData } = await supabase.auth.getUser();

  const { data: users } = await supabase
    .from("profiles")
    .select("id, full_name, email, phone, role, created_at")
    .order("created_at", { ascending: false });

  return (
    <div>
      <h1 className="text-2xl font-extrabold tracking-tight mb-6">المستخدمين</h1>

      {!users || users.length === 0 ? (
        <EmptyState title="مفيش مستخدمين لسه" />
      ) : (
        <div className="bg-white border border-black/10 rounded-xl overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-right text-steel border-b border-black/10">
                <th className="p-4 font-medium">الاسم</th>
                <th className="p-4 font-medium">البريد الإلكتروني</th>
                <th className="p-4 font-medium">الهاتف</th>
                <th className="p-4 font-medium">الدور</th>
                <th className="p-4 font-medium">تاريخ التسجيل</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u.id} className="border-b border-black/5 last:border-0">
                  <td className="p-4 font-bold">
                    {u.full_name}
                    {u.id === userData.user?.id && (
                      <span className="text-xs text-steel font-normal"> (أنت)</span>
                    )}
                  </td>
                  <td className="p-4" dir="ltr">
                    {u.email}
                  </td>
                  <td className="p-4" dir="ltr">
                    {u.phone ?? "—"}
                  </td>
                  <td className="p-4">
                    <form action={updateUserRoleAction} className="flex items-center gap-2">
                      <input type="hidden" name="user_id" value={u.id} />
                      <select
                        name="role"
                        defaultValue={u.role}
                        className="border border-black/15 rounded-lg px-2 py-1 text-xs bg-paper"
                      >
                        {ALL_ROLES.map((r) => (
                          <option key={r} value={r}>
                            {ROLE_LABELS[r]}
                          </option>
                        ))}
                      </select>
                      <button type="submit" className="text-xs font-bold text-amber hover:underline">
                        حفظ
                      </button>
                    </form>
                  </td>
                  <td className="p-4 text-steel">{new Date(u.created_at).toLocaleDateString("ar-EG")}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
