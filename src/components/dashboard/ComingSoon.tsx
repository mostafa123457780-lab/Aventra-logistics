export function ComingSoon({ title }: { title: string }) {
  return (
    <div>
      <h1 className="text-2xl font-extrabold tracking-tight mb-3">{title}</h1>
      <div className="bg-white border border-dashed border-black/15 rounded-xl p-10 text-center">
        <p className="font-bold mb-1">قريبًا</p>
        <p className="text-sm text-steel">هذه اللوحة قيد التطوير في المرحلة الجاية.</p>
      </div>
    </div>
  );
}
