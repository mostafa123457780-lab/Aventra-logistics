export function EmptyState({ title, hint }: { title: string; hint?: string }) {
  return (
    <div className="text-center py-16 border border-dashed border-black/15 rounded-xl">
      <p className="font-bold text-ink mb-1">{title}</p>
      {hint && <p className="text-sm text-steel">{hint}</p>}
    </div>
  );
}
