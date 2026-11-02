import { Icon } from './Icon'

export function SummaryCard({ label, value, icon, accent }: { label: string; value: number; icon: 'grid' | 'clock' | 'check'; accent: string }) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-5">
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold uppercase tracking-[0.15em] text-slate-500">{label}</span>
        <span className={`grid h-8 w-8 place-items-center rounded-lg ${accent}`}><Icon name={icon} size={16} /></span>
      </div>
      <p className="mt-4 text-3xl font-semibold tracking-tight text-white">{value}</p>
    </div>
  )
}
