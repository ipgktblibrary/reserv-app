export function SelectBlock({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="mb-2 block text-xs font-semibold uppercase tracking-widest text-gray-400">
        {label}
      </label>
      <div className="relative w-full">{children}</div>
    </div>
  );
}
