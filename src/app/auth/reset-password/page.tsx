"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { resetPasswordSchema, type ResetPasswordValues } from "@/lib/validations/auth";
import { createClient } from "@/lib/supabase/client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function ResetPasswordPage() {
  const router = useRouter();
  const [serverError, setServerError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ResetPasswordValues>({ resolver: zodResolver(resetPasswordSchema) });

  async function onSubmit(values: ResetPasswordValues) {
    setServerError(null);
    const supabase = createClient();
    const { error } = await supabase.auth.updateUser({ password: values.password });

    if (error) {
      setServerError("اللينك منتهي أو غير صحيح. اطلب لينك جديد.");
      return;
    }
    router.push("/dashboard");
  }

  return (
    <div>
      <h1 className="text-2xl font-extrabold tracking-tight mb-2">تعيين كلمة سر جديدة</h1>
      <p className="text-steel text-sm mb-7">اكتب كلمة السر الجديدة بتاعتك.</p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <Input {...register("password")} type="password" placeholder="كلمة السر الجديدة" />
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
          {isSubmitting ? "جاري الحفظ..." : "حفظ كلمة السر"}
        </Button>
      </form>
    </div>
  );
}
