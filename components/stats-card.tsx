interface StatCardProps {
  icon: React.FC<{ className?: string }>
  label: string
  value: string
}

export const StatCard: React.FC<StatCardProps> = ({
  icon: Icon,
  label,
  value,
}) => (
  <div className="bg-slate-800/70 p-4 rounded-xl border border-white/10">
    <div className="flex items-center gap-2 mb-2">
      <Icon className="w-4 h-4 text-blue-400" />
      <span className="text-sm text-white/60">{label}</span>
    </div>
    <p className="text-xl font-bold text-white">{value}</p>
  </div>
)
