"use client";

import { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema, type RegisterValues } from "@/lib/validations/auth";
import { createClient } from "@/lib/supabase/client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function RegisterPage() {
  const [submitted, setSubmitted] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterValues>({ resolver: zodResolver(registerSchema) });

  async function onSubmit(values: RegisterValues) {
    setServerError(null);
    const supabase = createClient();
    const { error } = await supabase.auth.signUp({
      email: values.email,
      password: values.password,
      options: {
        // Picked up by the handle_new_user trigger (see supabase/schema.sql)
        // to populate the profiles table with role = CUSTOMER by default.
        data: { full_name: values.full_name, phone: values.phone },
      },
    });

    if (error) {
      setServerError(error.message === "User already registered" ? "البريد الإلكتروني مستخدم من قبل." : "حصل خطأ، حاول تاني.");
      return;
    }
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="text-center">
        <h1 className="text-2xl font-extrabold tracking-tight mb-3">تأكد من بريدك الإلكتروني ✅</h1>
        <p className="text-steel text-sm">
          بعتنا لينك تأكيد على إيميلك. افتحه ودوس على اللينك عشان تفعّل حسابك وتقدر تسجل دخول.
        </p>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-2xl font-extrabold tracking-tight mb-2">إنشاء حساب جديد</h1>
      <p className="text-steel text-sm mb-7">سجّل عشان تتابع شحناتك وفواتيرك.</p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <Input {...register("full_name")} placeholder="الاسم بالكامل" />
          {errors.full_name && <p className="text-rust text-xs mt-1">{errors.full_name.message}</p>}
        </div>
        <div>
          <Input {...register("email")} type="email" dir="ltr" placeholder="البريد الإلكتروني" />
          {errors.email && <p className="text-rust text-xs mt-1">{errors.email.message}</p>}
        </div>
        <div>
          <Input {...register("phone")} dir="ltr" placeholder="رقم الهاتف" />
          {errors.phone && <p className="text-rust text-xs mt-1">{errors.phone.message}</p>}
        </div>
        <div>
          <Input {...register("password")} type="password" placeholder="كلمة السر" />
          {errors.password && <p className="text-rust text-xs mt-1">{errors.password.message}</p>}
        </div>
        <div>
          <Input {...register("confirm_password")} type="password" placeholder="تأكيد كلمة السر" />
          {errors.confirm_password && (
            <p className="text-rust text-xs mt-1">{errors.confirm_password.message}</p>
          )}
        </div>

        {serverError && <p className="text-rust text-sm">{serverError}</p>}

        <Button type="submit" variant="dark" disabled={isSubmitting} className="w-full">
          {isSubmitting ? "جاري الإنشاء..." : "إنشاء الحساب"}
        </Button>
      </form>

      <p className="text-sm text-center mt-5">
        عندك حساب؟{" "}
        <Link href="/auth/login" className="font-bold text-ink hover:text-amber">
          سجّل دخولك
        </Link>
      </p>
    </div>
  );
}
