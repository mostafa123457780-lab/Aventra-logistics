import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { signOutAction } from "@/lib/actions/auth";
import type { UserRole } from "@/types/database";
import { LogOut } from "lucide-react";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient();
  const { data: userData } = await supabase.auth.getUser();

  if (!userData.user) {
    redirect("/auth/login");
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("full_name, role")
    .eq("id", userData.user.id)
    .single();

  // Fallback role if the profiles row hasn't been created yet
  // (e.g. the handle_new_user trigger from supabase/schema.sql hasn't run).
  const role: UserRole = (profile?.role as UserRole) ?? "CUSTOMER";

  return (
    <div className="flex flex-col lg:flex-row">
      <Sidebar role={role} />
      <div className="flex-1">
        <div className="flex items-center justify-between border-b border-black/10 px-6 py-3.5 bg-white">
          <span className="text-sm text-steel">
            أهلًا، <span className="font-bold text-ink">{profile?.full_name ?? userData.user.email}</span>
          </span>
          <form action={signOutAction}>
            <button className="flex items-center gap-1.5 text-sm text-steel hover:text-rust transition-colors">
              <LogOut size={16} /> تسجيل الخروج
            </button>
          </form>
        </div>
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
}
