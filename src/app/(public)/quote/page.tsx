"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { quoteSchema, type QuoteFormValues } from "@/lib/validations/quote";
import { Input, Textarea } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";

const serviceOptions = [
  { value: "Sea Freight", label: "شحن بحري" },
  { value: "Air Freight", label: "شحن جوي" },
  { value: "Land Freight", label: "شحن بري" },
  { value: "Multimodal", label: "متعدد الوسائط" },
];

export default function QuotePage() {
  const [submitted, setSubmitted] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<QuoteFormValues>({ resolver: zodResolver(quoteSchema) });

  async function onSubmit(values: QuoteFormValues) {
    const res = await fetch("/api/requests", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });
    if (res.ok) {
      setSubmitted(true);
      reset();
    }
  }

  return (
    <div className="bg-paper py-16">
      <div className="max-w-2xl mx-auto px-6">
        <Reveal className="mb-10">
          <span className="font-mono text-xs text-rust">عرض سعر</span>
          <h1 className="text-3xl font-extrabold mt-2 mb-3">احكي لنا عن شحنتك</h1>
          <p className="text-steel">هنرد عليك بعرض سعر مفصّل في أقل من 24 ساعة.</p>
        </Reveal>

        {submitted ? (
          <Reveal className="bg-white border border-black/10 rounded-xl p-8 text-center">
            <h2 className="font-bold text-lg mb-2">تم استلام طلبك ✅</h2>
            <p className="text-steel text-sm">فريق المبيعات هيتواصل معاك على الإيميل أو الهاتف اللي كتبته.</p>
          </Reveal>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="bg-white border border-black/10 rounded-xl p-6 sm:p-8 space-y-5">
            <div className="grid sm:grid-cols-2 gap-5">
              <Field label="الاسم بالكامل" error={errors.full_name?.message}>
                <Input {...register("full_name")} placeholder="مثال: محمد أحمد" />
              </Field>
              <Field label="اسم الشركة (اختياري)">
                <Input {...register("company_name")} placeholder="اسم شركتك" />
              </Field>
            </div>

            <div className="grid sm:grid-cols-2 gap-5">
              <Field label="البريد الإلكتروني" error={errors.email?.message}>
                <Input {...register("email")} type="email" dir="ltr" placeholder="name@company.com" />
              </Field>
              <Field label="رقم الهاتف" error={errors.phone?.message}>
                <Input {...register("phone")} dir="ltr" placeholder="+20 1xx xxx xxxx" />
              </Field>
            </div>

            <Field label="نوع الشحن" error={errors.service_type?.message}>
              <select
                {...register("service_type")}
                className="w-full rounded-xl border border-black/15 px-4 py-3 outline-none focus:border-amber bg-white"
                defaultValue=""
              >
                <option value="" disabled>
                  اختر نوع الشحن
                </option>
                {serviceOptions.map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </select>
            </Field>

            <div className="grid sm:grid-cols-2 gap-5">
              <Field label="نقطة الانطلاق" error={errors.origin?.message}>
                <Input {...register("origin")} placeholder="مثال: جدة" />
              </Field>
              <Field label="نقطة الوصول" error={errors.destination?.message}>
                <Input {...register("destination")} placeholder="مثال: القاهرة" />
              </Field>
            </div>

            <Field label="تفاصيل الشحنة" error={errors.description?.message}>
              <Textarea {...register("description")} placeholder="نوع البضاعة، الوزن التقريبي، التوقيت المطلوب..." />
            </Field>

            <Button type="submit" variant="dark" disabled={isSubmitting} className="w-full">
              {isSubmitting ? "بنبعت الطلب..." : "اطلب عرض السعر"}
            </Button>
          </form>
        )}
      </div>
    </div>
  );
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="text-sm font-bold text-ink2 mb-1.5 block">{label}</span>
      {children}
      {error && <span className="text-rust text-xs mt-1 block">{error}</span>}
    </label>
  );
}
