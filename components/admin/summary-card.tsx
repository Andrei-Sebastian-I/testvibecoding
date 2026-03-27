export default function SummaryCard({
  icon,
  iconBg,
  iconColor,
  label,
  value,
  valueColor,
  sub,
}: {
  icon: string;
  iconBg: string;
  iconColor: string;
  label: string;
  value: string;
  valueColor: string;
  sub?: string;
}) {
  return (
    <div className="bg-white rounded-xl border border-primary/10 p-4">
      <div className="flex items-center gap-3 mb-3">
        <div className={`size-9 rounded-lg ${iconBg} flex items-center justify-center`}>
          <span aria-hidden="true" className={`material-symbols-outlined text-lg ${iconColor}`}>{icon}</span>
        </div>
        <p className="text-[11px] font-semibold text-text-muted uppercase tracking-wider">
          {label}
        </p>
      </div>
      <p className={`text-xl font-bold ${valueColor}`}>{value}</p>
      {sub && <p className="text-xs text-text-muted mt-0.5">{sub}</p>}
    </div>
  );
}
