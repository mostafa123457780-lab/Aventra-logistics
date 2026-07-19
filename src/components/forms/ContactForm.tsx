"use client";

import { useActionState } from "react";
import { submitContactRequest } from "@/lib/actions/public-requests";

const initialState = { errors: {} as Record<string, string>, success: false };

export function ContactForm() {
  const [state, formAction, isPending] = useActionState(submitContactRequest, initialState as any);
  const errors = state?.errors ?? {};

  if (state?.success) {
    return (
      <div className="bg-white border border-black/10 rounded-2xl p-8 text-center">
        <h3 className="text-xl font-bold mb-2">وصلتنا رسالتك</h3>
        <p className="text-steel">هنرد عليك في أقرب وقت ممكن.</p>
      </div>
    );
  }

  return (
    <form action={formAction} className="space-y-5 bg-white border border-black/10 rounded-2xl p-8">
      <input type="text" name="website" className="hidden" tabIndex={-1} autoComplete="off" />

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

      <div>
        <label className="block text-sm font-bold mb-1.5">رقم الهاتف (اختياري)</label>
        <input name="phone" className="w-full border border-black/10 rounded-lg p-2.5 text-sm" dir="ltr" />
      </div>

      <div>
        <label className="block text-sm font-bold mb-1.5">رسالتك</label>
        <textarea name="message" rows={5} className="w-full border border-black/10 rounded-lg p-2.5 text-sm" />
        {errors.message && <p className="text-rust text-xs mt-1">{errors.message}</p>}
      </div>

      {errors._form && <p className="text-rust text-sm">{errors._form}</p>}

      <button
        type="submit"
        disabled={isPending}
        className="bg-ink text-white font-bold px-8 py-3 rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50"
      >
        {isPending ? "جارٍ الإرسال..." : "إرسال الرسالة"}
      </button>
    </form>
  );
        }
