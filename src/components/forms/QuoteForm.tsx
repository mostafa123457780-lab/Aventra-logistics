"use client";

import { useActionState } from "react";
import { submitQuoteRequest } from "@/lib/actions/public-requests";

const SERVICE_TYPES = ["شحن بحري", "شحن جوي", "نقل بري", "تخزين ومستودعات"];
const initialState = { errors: {} as Record<string, string>, success: false };

export function QuoteForm() {
  const [state, formAction, isPending] = useActionState(submitQuoteRequest, initialState as any);
  const errors = state?.errors ?? {};

  if (state?.success) {
    return (
      <div className="bg-white border border-black/10 rounded-2xl p-8 text-center">
        <h3 className="text-xl font-bold mb-2">وصلنا طلبك</h3>
        <p className="text-steel">هيتواصل معاك فريق المبيعات بعرض السعر خلال ٢٤ ساعة.</p>
      </div>
    );
  }

  return (
    <form action={formAction} className="space-y-5 bg-white border border-black/10 rounded-2xl p-8">
      <input type="text" name="website" className="hidden" tabIndex={-1} autoComplete="off" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-bold mb-1.5">الاسم</label>
          <input name="name" className="w-full border border-black/10 rounded-lg p-2.5 text-sm" />
          {errors.name && <p className="text-rust text-xs mt-1">{errors.name}</p>}
        </div>
        <div>
          <label className="block text-sm font-bold mb-1.5">البريد الإلكتروني</label>
          <input type="email" name="email" className="w-full border border-black/10 rounded-lg p-2.5 text-sm" dir="ltr" />
          {errors.email && <p className="text-rust text-xs mt-1">{errors.email}</p>}
        </div>
      </div>

      <div>
        <label className="block text-sm font-bold mb-1.5">رقم الهاتف (اختياري)</label>
        <input name="phone" className="w-full border border-black/10 rounded-lg p-2.5 text-sm" dir="ltr" />
      </div>

      <div>
        <label className="block text-sm font-bold mb-1.5">نوع الخدمة</label>
        <select name="service_type" className="w-full border border-black/10 rounded-lg p-2.5 text-sm">
          <option value="">اختر نوع الخدمة</option>
          {SERVICE_TYPES.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
        {errors.service_type && <p className="text-rust text-xs mt-1">{errors.service_type}</p>}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-bold mb-1.5">نقطة الانطلاق</label>
          <input name="origin" className="w-full border border-black/10 rounded-lg p-2.5 text-sm" />
          {errors.origin && <p className="text-rust text-xs mt-1">{errors.origin}</p>}
        </div>
        <div>
          <label className="block text-sm font-bold mb-1.5">الوجهة</label>
          <input name="destination" className="w-full border border-black/10 rounded-lg p-2.5 text-sm" />
          {errors.destination && <p className="text-rust text-xs mt-1">{errors.destination}</p>}
        </div>
      </div>

      <div>
        <label className="block text-sm font-bold mb-1.5">تفاصيل إضافية (اختياري)</label>
        <textarea name="details" rows={4} className="w-full border border-black/10 rounded-lg p-2.5 text-sm" />
      </div>

      {errors._form && <p className="text-rust text-sm">{errors._form}</p>}

      <button
        type="submit"
        disabled={isPending}
        className="bg-amber text-ink font-bold px-8 py-3 rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50"
      >
        {isPending ? "جارٍ الإرسال..." : "اطلب عرض السعر"}
      </button>
    </form>
  );
          }
