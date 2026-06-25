import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import type { UserRole } from "@/types/database";

const ROLE_HOME: Record<UserRole, string> = {
  CUSTOMER: "/dashboard/customer",
  ADMIN: "/dashboard/admin",
  OPERATIONS_MANAGER: "/dashboard/operations",
  ACCOUNTANT: "/dashboard/accountant",
  WAREHOUSE_MANAGER: "/dashboard/warehouse",
  WAREHOUSE_EMPLOYEE: "/dashboard/warehouse",
  DRIVER: "/dashboard/driver",
};

export default async function DashboardIndexPage() {
  const supabase = await createClient();
  const { data: userData } = await supabase.auth.getUser();
  if (!userData.user) redirect("/auth/login");

  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", userData.user.id)
    .single();

  const role: UserRole = (profile?.role as UserRole) ?? "CUSTOMER";
  redirect(ROLE_HOME[role]);
}
