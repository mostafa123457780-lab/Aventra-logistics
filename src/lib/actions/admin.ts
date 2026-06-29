"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import type { UserRole } from "@/types/database";

const VALID_ROLES: UserRole[] = [
  "ADMIN",
  "OPERATIONS_MANAGER",
  "ACCOUNTANT",
  "WAREHOUSE_MANAGER",
  "WAREHOUSE_EMPLOYEE",
  "DRIVER",
  "CUSTOMER",
];

export async function updateUserRoleAction(formData: FormData) {
  const userId = formData.get("user_id");
  const role = formData.get("role");

  if (typeof userId !== "string" || typeof role !== "string") return;
  if (!VALID_ROLES.includes(role as UserRole)) return;

  const supabase = await createClient();
  // RLS (the admin_all_profiles policy) only allows this write to succeed
  // when the signed-in user's own role is ADMIN — anyone else just gets a
  // silent no-op, so this is safe to expose as a plain form action.
  await supabase.from("profiles").update({ role }).eq("id", userId);

  revalidatePath("/dashboard/admin/users");
}
