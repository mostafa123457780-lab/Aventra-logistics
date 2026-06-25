"use client";

import { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { forgotPasswordSchema, type ForgotPasswordValues } from "@/lib/validations/auth";
import { createClient } from "@/lib/supabase/client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function ForgotPasswordPage() {
  const [submitted, setSubmitted] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ForgotPasswordValues>({ resolver: zodResolver(forgotPasswordSchema) });

  async function onSubmit(values: ForgotPasswordValues) {
    const supabase = createClient();
    await supabase.auth.resetPasswordForEmail(values.email, {
      redirectTo: `${window.location.origin}/auth/reset-password`,
    });
    // Always show success, even if the email isn't registered (avoid leaking account existence).
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="text-center">
        <h1 className="text-2xl font-extrabold tracking-tight mb-3">شيك على إيميلك 📩</h1>
        <p className="text-steel text-sm">
          لو الإيميل ده مسجّل عندنا، هتلاقي لينك لإعادة تعيين كلمة السر في صندوق الوارد.
        </p>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-2xl font-extrabold tracking-tight mb-2">نسيت كلمة السر؟</h1>
      <p className="text-steel text-sm mb-7">اكتب إيميلك وهنبعتلك لينك لإعادة التعيين.</p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <Input {...register("email")} type="email" dir="ltr" placeholder="البريد الإلكتروني" />
          {errors.email && <p className="text-rust text-xs mt-1">{errors.email.message}</p>}
        </div>
        <Button type="submit" variant="dark" disabled={isSubmitting} className="w-full">
          {isSubmitting ? "جاري الإرسال..." : "إرسال لينك إعادة التعيين"}
        </Button>
      </form>

      <p className="text-sm text-center mt-5">
        <Link href="/auth/login" className="font-bold text-ink hover:text-amber">
          رجوع لتسجيل الدخول
        </Link>
      </p>
    </div>
  );
}
