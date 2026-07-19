"use server";

import { createAdminClient } from "@/lib/supabase/admin";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validateContact(formData: FormData) {
  const errors: Record<string, string> = {};

  const name = formData.get("name")?.toString().trim() ?? "";
  const email = formData.get("email")?.toString().trim() ?? "";
  const phone = formData.get("phone")?.toString().trim() ?? "";
  const message = formData.get("message")?.toString().trim() ?? "";
  const website = formData.get("website")?.toString().trim() ?? "";

  if (website) {
    return { honeypot: true };
  }

  if (!name) errors.name = "الاسم مطلوب";
  if (!email || !EMAIL_RE.test(email)) errors.email = "بريد إلكتروني غير صحيح";
  if (!message || message.length < 10) errors.message = "الرسالة قصيرة جدًا";

  if (Object.keys(errors).length > 0) return { errors };

  return { data: { name, email, phone: phone || null, message } };
}

export async function submitContactRequest(_prevState: unknown, formData: FormData) {
  const validated = validateContact(formData);
  if (validated.honeypot) return { success: true };
  if (validated.errors) return { errors: validated.errors };

  const supabase = createAdminClient();
  const { error } = await supabase.from("requests").insert({
    request_type: "contact",
    description: validated.data!.message,
    contact_name: validated.data!.name,
    contact_email: validated.data!.email,
    contact_phone: validated.data!.phone,
    status: "Pending",
  });

  if (error) return { errors: { _form: "حصل خطأ، حاول تاني لاحقًا" } };
  return { success: true };
}

function validateQuote(formData: FormData) {
  const errors: Record<string, string> = {};

  const name = formData.get("name")?.toString().trim() ?? "";
  const email = formData.get("email")?.toString().trim() ?? "";
  const phone = formData.get("phone")?.toString().trim() ?? "";
  const serviceType = formData.get("service_type")?.toString().trim() ?? "";
  const origin = formData.get("origin")?.toString().trim() ?? "";
  const destination = formData.get("destination")?.toString().trim() ?? "";
  const details = formData.get("details")?.toString().trim() ?? "";
  const website = formData.get("website")?.toString().trim() ?? "";

  if (website) return { honeypot: true };

  if (!name) errors.name = "الاسم مطلوب";
  if (!email || !EMAIL_RE.test(email)) errors.email = "بريد إلكتروني غير صحيح";
  if (!serviceType) errors.service_type = "اختر نوع الخدمة";
  if (!origin) errors.origin = "نقطة الانطلاق مطلوبة";
  if (!destination) errors.destination = "الوجهة مطلوبة";

  if (Object.keys(errors).length > 0) return { errors };

  const description = `نوع الخدمة: ${serviceType}\nمن: ${origin}\nإلى: ${destination}\nهاتف: ${phone || "—"}\nتفاصيل: ${details || "—"}`;

  return { data: { name, email, description } };
}

export async function submitQuoteRequest(_prevState: unknown, formData: FormData) {
  const validated = validateQuote(formData);
  if (validated.honeypot) return { success: true };
  if (validated.errors) return { errors: validated.errors };

  const supabase = createAdminClient();
  const { error } = await supabase.from("requests").insert({
    request_type: "quote",
    description: validated.data!.description,
    contact_name: validated.data!.name,
    contact_email: validated.data!.email,
    status: "Pending",
  });

  if (error) return { errors: { _form: "حصل خطأ، حاول تاني لاحقًا" } };
  return { success: true };
    }
