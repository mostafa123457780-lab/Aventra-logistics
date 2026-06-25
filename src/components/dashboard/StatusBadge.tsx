import { cn } from "@/lib/utils";

const COLORS: Record<string, string> = {
  Pending: "bg-steel/15 text-steel",
  Processing: "bg-steel/15 text-steel",
  "Picked Up": "bg-amber/15 text-amber",
  "In Warehouse": "bg-amber/15 text-amber",
  "In Transit": "bg-amber/15 text-amber",
  "Customs Clearance": "bg-rust/15 text-rust",
  "Out For Delivery": "bg-amber/15 text-amber",
  Delivered: "bg-emerald-100 text-emerald-700",
  Cancelled: "bg-rust/15 text-rust",
  Draft: "bg-steel/15 text-steel",
  "Partially Paid": "bg-amber/15 text-amber",
  Paid: "bg-emerald-100 text-emerald-700",
  Overdue: "bg-rust/15 text-rust",
};

export function StatusBadge({ status }: { status: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center text-xs font-bold px-2.5 py-1 rounded-full whitespace-nowrap",
        COLORS[status] ?? "bg-steel/15 text-steel"
      )}
    >
      {status}
    </span>
  );
}
