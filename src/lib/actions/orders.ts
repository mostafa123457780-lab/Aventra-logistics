"use server";

import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

const ALLOWED_ROLES = ["ADMIN", "OPERATIONS_MANAGER"];
const STATUS_VALUES = ["Pending", "Confirmed", "Processing", "Completed", "Cancelled"];
const PAYMENT_VALUES = ["Unpaid", "Paid", "Partially Paid"];

async function requireOperationsRole() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/auth/login");

  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  if (!profile || !ALLOWED_ROLES.includes(profile.role)) {
    throw new Error("غير مصرح لك بتنفيذ هذا الإجراء");
  }

  return { supabase, user };
}

function validateOrderInput(formData: FormData) {
  const errors: Record<string, string> = {};

  const customer_id = formData.get("customer_id")?.toString().trim() ?? "";
  const order_date = formData.get("order_date")?.toString().trim() ?? "";
  const status = formData.get("status")?.toString().trim() ?? "Pending";
  const payment_status = formData.get("payment_status")?.toString().trim() ?? "Unpaid";
  const total_amount_raw = formData.get("total_amount")?.toString().trim() ?? "";
  const notes = formData.get("notes")?.toString().trim() || null;

  if (!customer_id) errors.customer_id = "العميل مطلوب";
  if (!order_date) errors.order_date = "تاريخ الطلب مطلوب";
  if (!STATUS_VALUES.includes(status)) errors.status = "حالة الطلب غير صحيحة";
  if (!PAYMENT_VALUES.includes(payment_status)) errors.payment_status = "حالة الدفع غير صحيحة";

  const total_amount = Number(total_amount_raw);
  if (!total_amount_raw || Number.isNaN(total_amount) || total_amount < 0) {
    errors.total_amount = "الإجمالي يجب أن يكون رقمًا موجبًا";
  }

  if (Object.keys(errors).length > 0) {
    return { errors };
  }

  return {
    data: { customer_id, order_date, status, payment_status, total_amount, notes },
  };
}

export async function createOrder(_prevState: unknown, formData: FormData) {
  const { supabase, user } = await requireOperationsRole();
  const validated = validateOrderInput(formData);
  if (validated.errors) return { errors: validated.errors };

  const order_number = `ORD-${Date.now().toString(36).toUpperCase()}`;

  const { data, error } = await supabase
    .from("orders")
    .insert({ ...validated.data, order_number, created_by: user.id })
    .select("id")
    .single();

  if (error) return { errors: { _form: error.message } };

  revalidatePath("/dashboard/operations/orders");
  redirect(`/dashboard/operations/orders/${data.id}`);
}

export async function updateOrder(orderId: string, _prevState: unknown, formData: FormData) {
  await requireOperationsRole();
  const validated = validateOrderInput(formData);
  if (validated.errors) return { errors: validated.errors };

  const supabase = await createClient();
  const { error } = await supabase
    .from("orders")
    .update({ ...validated.data, updated_at: new Date().toISOString() })
    .eq("id", orderId);

  if (error) return { errors: { _form: error.message } };

  revalidatePath("/dashboard/operations/orders");
  revalidatePath(`/dashboard/operations/orders/${orderId}`);
  return { success: true };
}

export async function deleteOrder(orderId: string) {
  await requireOperationsRole();
  const supabase = await createClient();

  const { error } = await supabase
    .from("orders")
    .update({ deleted_at: new Date().toISOString() })
    .eq("id", orderId);

  if (error) throw new Error(error.message);

  revalidatePath("/dashboard/operations/orders");
  redirect("/dashboard/operations/orders");
                                          }
  
