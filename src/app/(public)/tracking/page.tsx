"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import type { ShipmentStatus } from "@/types/database";

const STATUS_FLOW: ShipmentStatus[] = [
  "Pending",
  "Picked Up",
  "In Warehouse",
  "In Transit",
  "Customs Clearance",
  "Out For Delivery",
  "Delivered",
];

const STATUS_LABELS_AR: Record<ShipmentStatus, string> = {
  Pending: "قيد المعالجة",
  Processing: "جاري التجهيز",
  "Picked Up": "تم الاستلام",
  "In Warehouse": "في المستودع",
  "In Transit": "في الطريق",
  "Customs Clearance": "تخليص جمركي",
  "Out For Delivery": "خرجت للتسليم",
  Delivered: "تم التسليم",
  Cancelled: "ملغاة",
};

// Mock dataset — replace with GET /api/tracking/:trackingNumber backed by Supabase.
const MOCK_SHIPMENTS: Record<string, { origin: string; destination: string; status: ShipmentStatus }> = {
  "AVT-2026-04821": { origin: "جدة (JED)", destination: "القاهرة (CAI)", status: "In Transit" },
  "AVT-2026-01190": { origin: "شنغهاي (SHA)", destination: "الإسكندرية (ALY)", status: "Customs Clearance" },
};

export default function TrackingPage() {
  const [code, setCode] = useState("");
  const [result, setResult] = useState<typeof MOCK_SHIPMENTS[string] | null | undefined>(undefined);

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    const found = MOCK_SHIPMENTS[code.trim().toUpperCase()];
    setResult(found ?? null);
  }

  return (
    <div className="bg-paper min-h-[70vh] py-16">
      <div className="max-w-3xl mx-auto px-6">
        <Reveal className="mb-10 text-center">
          <span className="font-mono text-xs text-rust">تتبع الشحنة</span>
          <h1 className="text-3xl font-extrabold mt-2 mb-3">فين شحنتك دلوقتي؟</h1>
          <p className="text-steel">
            جرّب رقم: <span className="font-mono" dir="ltr">AVT-2026-04821</span>
          </p>
        </Reveal>

        <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3 mb-10">
          <Input
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="مثال: AVT-2026-04821"
            dir="ltr"
            className="font-mono rounded-full"
          />
          <Button type="submit" variant="dark" className="!rounded-full whitespace-nowrap">
            تتبع
          </Button>
        </form>

        {result === null && (
          <p className="text-center text-rust text-sm">
            مفيش شحنة بهذا الرقم. تأكد من رقم البوليصة وحاول تاني.
          </p>
        )}

        {result && (
          <Reveal className="bg-white border border-black/10 rounded-2xl p-6 sm:p-8">
            <div className="flex items-center justify-between text-sm font-bold mb-8">
              <span>{result.origin}</span>
              <span className="text-steel font-mono text-xs">{code.toUpperCase()}</span>
              <span>{result.destination}</span>
            </div>
            <div className="grid grid-cols-7 gap-1 text-[10px] font-mono text-center">
              {STATUS_FLOW.map((status) => {
                const currentIndex = STATUS_FLOW.indexOf(result.status);
                const stepIndex = STATUS_FLOW.indexOf(status);
                const done = stepIndex <= currentIndex;
                const isCurrent = stepIndex === currentIndex;
                return (
                  <div
                    key={status}
                    className={`border-t-2 pt-1.5 ${
                      isCurrent ? "border-amber text-amber" : done ? "border-ink text-ink" : "border-steel/30 text-steel/60"
                    }`}
                  >
                    {STATUS_LABELS_AR[status]}
                  </div>
                );
              })}
            </div>
          </Reveal>
        )}
      </div>
    </div>
  );
}
