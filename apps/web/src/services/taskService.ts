import type { CreateTaskInput, Task } from '../types/task'

let tasks: Task[] = [
  { id: 1, title: 'Review sprint goals with the team', priority: 'high', status: 'pending' },
  { id: 2, title: 'Update the component documentation', priority: 'medium', status: 'pending' },
  { id: 3, title: 'Send weekly progress report', priority: 'low', status: 'completed' },
  { id: 4, title: 'Plan next week’s design review', priority: 'medium', status: 'pending' },
]

let nextId = 5

const delay = <T,>(value: T): Promise<T> => Promise.resolve(value)

export const taskService = {
  list: async (): Promise<Task[]> => delay(tasks.map((task) => ({ ...task }))),

  create: async (input: CreateTaskInput): Promise<Task> => {
    const task: Task = { id: nextId++, ...input, status: 'pending' }
    tasks = [task, ...tasks]
    return delay({ ...task })
  },

  complete: async (id: number): Promise<Task> => {
    const task = tasks.find((item) => item.id === id)
    if (!task) throw new Error('Task not found')
    task.status = 'completed'
    return delay({ ...task })
  },

  delete: async (id: number): Promise<void> => {
    tasks = tasks.filter((task) => task.id !== id)
    return delay(undefined)
  },
}
