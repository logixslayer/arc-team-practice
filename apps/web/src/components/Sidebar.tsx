import { Icon } from './Icon'

export function Sidebar() {
  return (
    <aside className="hidden w-64 shrink-0 border-r border-slate-800 bg-slate-950/70 px-5 py-7 lg:block">
      <div className="flex items-center gap-3 px-2">
        <div className="grid h-9 w-9 place-items-center rounded-xl bg-teal-400 text-slate-950">
          <Icon name="spark" size={19} />
        </div>
        <div>
          <p className="text-sm font-bold tracking-[0.18em] text-white">ARC</p>
          <p className="text-[10px] font-medium uppercase tracking-[0.17em] text-slate-500">Team practice</p>
        </div>
      </div>

      <nav className="mt-14 space-y-2" aria-label="Main navigation">
        <a className="flex items-center gap-3 rounded-xl bg-teal-400/10 px-3 py-3 text-sm font-semibold text-teal-300" href="#tasks">
          <Icon name="grid" size={18} />
          My tasks
        </a>
        <a className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-slate-500 transition hover:bg-slate-900 hover:text-slate-200" href="#completed">
          <Icon name="check" size={18} />
          Completed
        </a>
      </nav>

      <div className="mt-auto hidden border-t border-slate-800 pt-6 xl:block">
        <div className="flex items-center gap-3 px-2">
          <div className="grid h-9 w-9 place-items-center rounded-full bg-slate-800 text-xs font-bold text-teal-300">JD</div>
          <div>
            <p className="text-sm font-semibold text-slate-200">Jordan Davis</p>
            <p className="text-xs text-slate-500">Product team</p>
          </div>
        </div>
      </div>
    </aside>
  )
}
