"use client";

import { useActionState } from "react";
import { createOrder, updateOrder } from "@/lib/actions/orders";

const STATUS_OPTIONS = ["Pending", "Confirmed", "Processing", "Completed", "Cancelled"];
const PAYMENT_OPTIONS = ["Unpaid", "Paid", "Partially Paid"];

type Customer = { id: string; company_name: string | null };

type OrderFormProps = {
  customers: Customer[];
  order?: {
    id: string;
    customer_id: string;
    order_date: string;
    status: string;
    payment_status: string;
    total_amount: number;
    notes: string | null;
  };
};

export function OrderForm({ customers, order }: OrderFormProps) {
  const action = order ? updateOrder.bind(null, order.id) : createOrder;
  const [state, formAction, isPending] = useActionState(action, { errors: {} } as any);

  const errors = state?.errors ?? {};

  return (
    <form action={formAction} className="space-y-5 max-w-xl">
      <div>
        <label className="block text-sm font-bold mb-1.5">العميل</label>
        <select
          name="customer_id"
          defaultValue={order?.customer_id ?? ""}
          className="w-full border border-black/10 rounded-lg p-2.5 text-sm"
        >
          <option value="">اختر العميل</option>
          {customers.map((c) => (
            <option key={c.id} value={c.id}>
              {c.company_name ?? "بدون اسم"}
            </option>
          ))}
        </select>
        {errors.customer_id && <p className="text-rust text-xs mt-1">{errors.customer_id}</p>}
      </div>

      <div>
        <label className="block text-sm font-bold mb-1.5">تاريخ الطلب</label>
        <input
          type="date"
          name="order_date"
          defaultValue={order?.order_date ?? new Date().toISOString().slice(0, 10)}
          className="w-full border border-black/10 rounded-lg p-2.5 text-sm"
        />
        {errors.order_date && <p className="text-rust text-xs mt-1">{errors.order_date}</p>}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-bold mb-1.5">حالة الطلب</label>
          <select
            name="status"
            defaultValue={order?.status ?? "Pending"}
            className="w-full border border-black/10 rounded-lg p-2.5 text-sm"
          >
            {STATUS_OPTIONS.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-bold mb-1.5">حالة الدفع</label>
          <select
            name="payment_status"
            defaultValue={order?.payment_status ?? "Unpaid"}
            className="w-full border border-black/10 rounded-lg p-2.5 text-sm"
          >
            {PAYMENT_OPTIONS.map((p) => (
              <option key={p} value={p}>{p}</option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-bold mb-1.5">الإجمالي</label>
        <input
          type="number"
          step="0.01"
          min="0"
          name="total_amount"
          defaultValue={order?.total_amount ?? ""}
          className="w-full border border-black/10 rounded-lg p-2.5 text-sm"
        />
        {errors.total_amount && <p className="text-rust text-xs mt-1">{errors.total_amount}</p>}
      </div>

      <div>
        <label className="block text-sm font-bold mb-1.5">ملاحظات</label>
        <textarea
          name="notes"
          defaultValue={order?.notes ?? ""}
          rows={3}
          className="w-full border border-black/10 rounded-lg p-2.5 text-sm"
        />
      </div>

      {errors._form && <p className="text-rust text-sm">{errors._form}</p>}

      <button
        type="submit"
        disabled={isPending}
        className="bg-amber text-ink font-bold text-sm px-6 py-2.5 rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50"
      >
        {isPending ? "جارٍ الحفظ..." : order ? "حفظ التعديلات" : "إنشاء الطلب"}
      </button>
    </form>
  );
}
