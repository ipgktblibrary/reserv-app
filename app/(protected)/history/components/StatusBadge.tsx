type StatusBadgeProps = {
  status: string;
};

export function StatusBadge({ status }: StatusBadgeProps) {
  const styles: Record<string, string> = {
    confirmed: "bg-green-100 text-green-700",
    pending: "bg-yellow-100 text-yellow-700",
    cancelled: "bg-red-100 text-red-700",
  };

  return (
    <span
      className={`rounded-full px-3 py-1 text-xs font-semibold ${
        styles[status.toLowerCase()] ?? "bg-neutral-100 text-neutral-700"
      }`}
    >
      {status}
    </span>
  );
}
