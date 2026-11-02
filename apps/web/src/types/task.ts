export type TaskPriority = 'low' | 'medium' | 'high'
export type TaskStatus = 'pending' | 'completed'

export type Task = {
  id: number
  title: string
  priority: TaskPriority
  status: TaskStatus
}

export type CreateTaskInput = {
  title: string
  priority: TaskPriority
}
