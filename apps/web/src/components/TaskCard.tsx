import type { Task } from '../types/task'
import { Icon } from './Icon'

const priorityStyles = {
  low: 'bg-slate-800 text-slate-400',
  medium: 'bg-amber-400/10 text-amber-300',
  high: 'bg-orange-400/10 text-orange-300',
}

export function TaskCard({ task, onComplete, onDelete }: { task: Task; onComplete: (id: number) => void; onDelete: (id: number) => void }) {
  const completed = task.status === 'completed'

  return (
    <article className={`group rounded-2xl border bg-slate-900/70 p-5 transition hover:border-slate-700 ${completed ? 'border-slate-800/70' : 'border-slate-800'}`}>
      <div className="flex items-start justify-between gap-4">
        <div className="flex min-w-0 items-start gap-3">
          <button
            aria-label={completed ? 'Task completed' : `Complete ${task.title}`}
            className={`mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full border transition ${completed ? 'border-teal-400 bg-teal-400 text-slate-950' : 'border-slate-600 text-transparent hover:border-teal-400'}`}
            disabled={completed}
            onClick={() => onComplete(task.id)}
            type="button"
          >
            <Icon name="check" size={13} strokeWidth={3} />
          </button>
          <div>
            <h3 className={`font-medium leading-6 ${completed ? 'text-slate-500 line-through' : 'text-slate-100'}`}>{task.title}</h3>
            <div className="mt-3 flex flex-wrap items-center gap-2">
              <span className={`rounded-md px-2 py-1 text-[10px] font-bold uppercase tracking-[0.12em] ${priorityStyles[task.priority]}`}>{task.priority}</span>
              <span className={`flex items-center gap-1.5 text-xs ${completed ? 'text-teal-400' : 'text-slate-500'}`}>
                <span className={`h-1.5 w-1.5 rounded-full ${completed ? 'bg-teal-400' : 'bg-amber-400'}`} />
                {completed ? 'Completed' : 'Pending'}
              </span>
            </div>
          </div>
        </div>
        <button aria-label={`Delete ${task.title}`} className="grid h-9 w-9 shrink-0 place-items-center rounded-lg text-slate-600 opacity-100 transition hover:bg-red-400/10 hover:text-red-300 sm:opacity-0 sm:group-hover:opacity-100" onClick={() => onDelete(task.id)} type="button">
          <Icon name="trash" size={17} />
        </button>
      </div>
    </article>
  )
}
