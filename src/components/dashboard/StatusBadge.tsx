const STATUS_STYLES: Record<string, string> = {
  Paid: "bg-green-100 text-green-700",
  Delivered: "bg-green-100 text-green-700",
  Pending: "bg-amber/20 text-amber",
  "In Transit": "bg-blue-100 text-blue-700",
  Cancelled: "bg-rust/10 text-rust",
  Returned: "bg-rust/10 text-rust",
  Active: "bg-green-100 text-green-700",
  "Off Duty": "bg-black/5 text-steel",
  Suspended: "bg-rust/10 text-rust",
  Maintenance: "bg-amber/20 text-amber",
  Inactive: "bg-black/5 text-steel",
  Empty: "bg-black/5 text-steel",
  Loading: "bg-amber/20 text-amber",
  "Partially Paid": "bg-amber/20 text-amber",
};

export function StatusBadge({ status }: { status: string }) {
  const style = STATUS_STYLES[status] ?? "bg-black/5 text-steel";
  return (
    <span className={`inline-block rounded-full px-3 py-1 text-xs font-bold ${style}`}>
      {status}
    </span>
  );
}
