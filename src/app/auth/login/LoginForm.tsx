"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, type LoginValues } from "@/lib/validations/auth";
import { createClient } from "@/lib/supabase/client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [serverError, setServerError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginValues>({ resolver: zodResolver(loginSchema) });

  async function onSubmit(values: LoginValues) {
    setServerError(null);
    const supabase = createClient();
    const { error } = await supabase.auth.signInWithPassword(values);

    if (error) {
      setServerError("البريد الإلكتروني أو كلمة السر غير صحيحة.");
      return;
    }

    router.push(searchParams.get("next") || "/dashboard");
    router.refresh();
  }

  return (
    <div>
      <h1 className="text-2xl font-extrabold tracking-tight mb-2">تسجيل الدخول</h1>
      <p className="text-steel text-sm mb-7">ادخل بياناتك للوصول لحسابك.</p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <Input {...register("email")} type="email" dir="ltr" placeholder="البريد الإلكتروني" />
          {errors.email && <p className="text-rust text-xs mt-1">{errors.email.message}</p>}
        </div>
        <div>
          <Input {...register("password")} type="password" placeholder="كلمة السر" />
          {errors.password && <p className="text-rust text-xs mt-1">{errors.password.message}</p>}
        </div>

        {serverError && <p className="text-rust text-sm">{serverError}</p>}

        <Button type="submit" variant="dark" disabled={isSubmitting} className="w-full">
          {isSubmitting ? "جاري الدخول..." : "تسجيل الدخول"}
        </Button>
      </form>

      <div className="flex items-center justify-between mt-5 text-sm">
        <Link href="/auth/forgot-password" className="text-steel hover:text-amber">
          نسيت كلمة السر؟
        </Link>
        <Link href="/auth/register" className="font-bold text-ink hover:text-amber">
          إنشاء حساب جديد
        </Link>
      </div>
    </div>
  );
}
