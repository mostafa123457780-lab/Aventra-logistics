import Link from "next/link";
import { createAdminClient } from "@/lib/supabase/admin";
import { StatusBadge } from "@/components/dashboard/StatusBadge";

export default async function TrackingPage({
  searchParams,
}: {
  searchParams: Promise<{ number?: string }>;
}) {
  const { number } = await searchParams;
  const trackingNumber = number?.trim();

  let shipment: any = null;
  let history: any[] = [];
  let notFoundMsg = false;

  if (trackingNumber) {
    const supabase = createAdminClient();
    const { data } = await supabase
      .from("shipments")
      .select("id, tracking_number, origin, destination, service_type, status, created_at")
      .eq("tracking_number", trackingNumber)
      .is("deleted_at", null)
      .maybeSingle();

    if (data) {
      shipment = data;
      const { data: events } = await supabase
        .from("shipment_tracking")
        .select("id, status, location, notes, created_at")
        .eq("shipment_id", data.id)
        .order("created_at", { ascending: false });
      history = events ?? [];
    } else {
      notFoundMsg = true;
    }
  }

  return (
    <main className="max-w-3xl mx-auto px-6 py-16">
      <Link href="/" className="text-sm text-steel hover:text-ink transition-colors">
        ← الرئيسية
      </Link>

      <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight mt-4 mb-3">تتبع الشحنة</h1>
      <p className="text-steel text-lg mb-8">أدخل رقم البوليصة (Tracking Number) لمتابعة حالة شحنتك.</p>

      <form action="/tracking" method="GET" className="flex gap-3 mb-10">
        <input
          type="text"
          name="number"
          defaultValue={trackingNumber}
          placeholder="مثال: AVT-2026-000123"
          dir="ltr"
          className="flex-1 border border-black/10 rounded-lg p-3 text-sm"
        />
        <button
          type="submit"
          className="bg-ink text-white font-bold px-6 py-3 rounded-lg hover:opacity-90 transition-opacity shrink-0"
        >
          تتبّع
        </button>
      </form>

      {notFoundMsg && (
        <div className="bg-white border border-black/10 rounded-2xl p-6 text-center text-steel">
          مفيش شحنة برقم البوليصة ده. تأكد من الرقم وحاول تاني.
        </div>
      )}

      {shipment && (
        <div className="bg-white border border-black/10 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <span className="font-mono font-bold" dir="ltr">{shipment.tracking_number}</span>
            <StatusBadge status={shipment.status} />
          </div>
          <div className="grid grid-cols-2 gap-4 text-sm text-steel mb-6">
            <div>من: <span className="text-ink font-bold">{shipment.origin}</span></div>
            <div>إلى: <span className="text-ink font-bold">{shipment.destination}</span></div>
            <div>نوع الخدمة: <span className="text-ink font-bold">{shipment.service_type}</span></div>
          </div>

          {history.length > 0 && (
            <div className="border-t border-black/10 pt-4">
              <h2 className="font-bold text-sm mb-3">سجل الحالة</h2>
              <div className="space-y-3">
                {history.map((h) => (
                  <div key={h.id} className="flex items-start justify-between text-sm">
                    <div>
                      <StatusBadge status={h.status} />
                      {h.location && <span className="text-steel mr-2">{h.location}</span>}
                    </div>
                    <span className="text-steel text-xs">
                      {new Date(h.created_at).toLocaleDateString("ar-EG")}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </main>
  );
          }
