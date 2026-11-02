import { FormEvent, useEffect, useMemo, useState } from 'react'
import { Sidebar } from './components/Sidebar'
import { Icon } from './components/Icon'
import { SummaryCard } from './components/SummaryCard'
import { TaskCard } from './components/TaskCard'
import { taskService } from './services/taskService'
import type { Task, TaskPriority } from './types/task'

function App() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [title, setTitle] = useState('')
  const [priority, setPriority] = useState<TaskPriority>('medium')
  const [error, setError] = useState('')

  useEffect(() => {
    void taskService.list().then(setTasks)
  }, [])

  const pendingCount = useMemo(() => tasks.filter((task) => task.status === 'pending').length, [tasks])
  const completedCount = tasks.length - pendingCount

  async function handleCreate(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const trimmedTitle = title.trim()
    if (!trimmedTitle) {
      setError('Give your task a title before adding it.')
      return
    }
    const task = await taskService.create({ title: trimmedTitle, priority })
    setTasks((current) => [task, ...current])
    setTitle('')
    setError('')
  }

  async function handleComplete(id: number) {
    const task = await taskService.complete(id)
    setTasks((current) => current.map((item) => item.id === task.id ? task : item))
  }

  async function handleDelete(id: number) {
    await taskService.delete(id)
    setTasks((current) => current.filter((task) => task.id !== id))
  }

  return (
    <div className="min-h-screen bg-[#080d18] text-slate-100">
      <div className="flex min-h-screen">
        <Sidebar />
        <main className="min-w-0 flex-1">
          <header className="border-b border-slate-800/80 px-5 py-5 sm:px-8 lg:hidden">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="grid h-9 w-9 place-items-center rounded-xl bg-teal-400 text-slate-950"><Icon name="spark" size={19} /></div>
                <span className="text-sm font-bold tracking-[0.18em]">ARC</span>
              </div>
              <button aria-label="Open navigation" className="grid h-10 w-10 place-items-center rounded-lg border border-slate-800 text-slate-400"><Icon name="menu" /></button>
            </div>
          </header>
          <div className="mx-auto max-w-6xl px-5 py-8 sm:px-8 sm:py-12">
            <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
              <div>
                <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-teal-400">Monday, 24 June 2024</p>
                <h1 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">My tasks</h1>
                <p className="mt-2 text-sm text-slate-500">Keep your momentum going, one task at a time.</p>
              </div>
              <div className="flex items-center gap-3 text-sm text-slate-500">
                <span className="h-2 w-2 rounded-full bg-teal-400" />
                {pendingCount} tasks waiting
              </div>
            </div>

            <section className="mt-8 grid gap-3 sm:grid-cols-3">
              <SummaryCard label="Total tasks" value={tasks.length} icon="grid" accent="bg-teal-400/10 text-teal-300" />
              <SummaryCard label="Pending" value={pendingCount} icon="clock" accent="bg-amber-400/10 text-amber-300" />
              <SummaryCard label="Completed" value={completedCount} icon="check" accent="bg-violet-400/10 text-violet-300" />
            </section>

            <section className="mt-8 rounded-2xl border border-slate-800 bg-slate-900/50 p-5 sm:p-6">
              <div className="mb-5 flex items-center justify-between">
                <div>
                  <h2 className="font-semibold text-white">Create a new task</h2>
                  <p className="mt-1 text-xs text-slate-500">What needs your attention next?</p>
                </div>
                <span className="hidden rounded-full border border-slate-700 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-slate-500 sm:block">Quick add</span>
              </div>
              <form className="flex flex-col gap-3 lg:flex-row" onSubmit={handleCreate}>
                <label className="min-w-0 flex-1">
                  <span className="sr-only">Task title</span>
                  <input aria-describedby={error ? 'task-error' : undefined} aria-invalid={Boolean(error)} className="h-12 w-full rounded-xl border border-slate-700 bg-slate-950/60 px-4 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-teal-400 focus:ring-2 focus:ring-teal-400/10" onChange={(event) => { setTitle(event.target.value); setError('') }} placeholder="e.g. Prepare presentation for Friday" value={title} />
                </label>
                <label className="relative lg:w-36">
                  <span className="sr-only">Priority</span>
                  <select className="h-12 w-full appearance-none rounded-xl border border-slate-700 bg-slate-950/60 px-4 text-sm capitalize text-slate-300 outline-none focus:border-teal-400" onChange={(event) => setPriority(event.target.value as TaskPriority)} value={priority}>
                    <option value="low">Low priority</option>
                    <option value="medium">Medium priority</option>
                    <option value="high">High priority</option>
                  </select>
                </label>
                <button className="flex h-12 items-center justify-center gap-2 rounded-xl bg-teal-400 px-5 text-sm font-bold text-slate-950 transition hover:bg-teal-300 focus:outline-none focus:ring-2 focus:ring-teal-300 focus:ring-offset-2 focus:ring-offset-slate-900" type="submit">
                  <Icon name="plus" size={17} strokeWidth={2.5} />
                  Add task
                </button>
              </form>
              {error && <p className="mt-3 text-xs font-medium text-red-300" id="task-error" role="alert">{error}</p>}
            </section>

            <section className="mt-10" id="tasks">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="font-semibold text-white">Your task list</h2>
                <span className="text-xs text-slate-600">{tasks.length} items</span>
              </div>
              {tasks.length > 0 ? (
                <div className="grid gap-3">{tasks.map((task) => <TaskCard key={task.id} onComplete={handleComplete} onDelete={handleDelete} task={task} />)}</div>
              ) : (
                <div className="rounded-2xl border border-dashed border-slate-700 px-6 py-14 text-center">
                  <div className="mx-auto grid h-12 w-12 place-items-center rounded-2xl bg-slate-900 text-teal-400"><Icon name="check" /></div>
                  <h3 className="mt-4 font-medium text-slate-200">Your list is clear</h3>
                  <p className="mt-1 text-sm text-slate-500">Add a task above to get started.</p>
                </div>
              )}
            </section>
          </div>
        </main>
      </div>
    </div>
  )
}

export default App
