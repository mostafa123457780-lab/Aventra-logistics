import { NextRequest, NextResponse } from "next/server";
import { quoteSchema } from "@/lib/validations/quote";
import { createAdminClient } from "@/lib/supabase/admin";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const parsed = quoteSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  // Honeypot tripped — silently pretend success so the bot doesn't learn
  // to avoid this field, but never touch the database.
  if (parsed.data.website) {
    return NextResponse.json({ ok: true, persisted: false });
  }

  const hasSupabase =
    !!process.env.NEXT_PUBLIC_SUPABASE_URL && !!process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!hasSupabase) {
    // Supabase isn't connected yet — don't break the form, just log it.
    console.warn("[quote] Supabase env vars missing, request not persisted:", parsed.data);
    return NextResponse.json({ ok: true, persisted: false });
  }

  const supabase = createAdminClient();
  const v = parsed.data;
  const description = [
    `الاسم: ${v.full_name}`,
    v.company_name ? `الشركة: ${v.company_name}` : null,
    `الإيميل: ${v.email}`,
    `الهاتف: ${v.phone}`,
    `من: ${v.origin} إلى: ${v.destination}`,
    `التفاصيل: ${v.description}`,
  ]
    .filter(Boolean)
    .join(" | ");

  const { error } = await supabase.from("requests").insert({
    request_type: v.service_type,
    description,
    status: "new",
  });

  if (error) {
    console.error("[quote] Supabase insert failed:", error);
    return NextResponse.json({ error: "Failed to save request" }, { status: 500 });
  }

  return NextResponse.json({ ok: true, persisted: true });
}
