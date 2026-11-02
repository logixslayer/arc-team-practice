import { Prisma } from '@prisma/client'
import type { Request, Response } from 'express'
import {
  createTask,
  deleteTask,
  getTasks,
  updateTaskStatus,
  type Priority,
  type Status,
} from '../services/taskService.js'

const errorResponse = (message: string) => ({
  success: false,
  error: { message },
})

const isPriority = (value: unknown): value is Priority =>
  value === 'low' || value === 'medium' || value === 'high'

const isStatus = (value: unknown): value is Status =>
  value === 'pending' || value === 'completed'

const parseTaskId = (value: string): number | null => {
  if (!/^[1-9]\d*$/.test(value)) {
    return null
  }

  const id = Number(value)
  return Number.isSafeInteger(id) ? id : null
}

const isMissingTaskError = (error: unknown) =>
  error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025'

const serializeTask = (task: {
  id: number
  title: string
  priority: string
  status: string
}) => ({
  id: task.id,
  title: task.title,
  priority: task.priority,
  status: task.status,
})

export const createTaskController = async (request: Request, response: Response) => {
  const { title, priority } = request.body ?? {}

  if (typeof title !== 'string' || title.trim().length === 0 || !isPriority(priority)) {
    response.status(400).json(errorResponse('Title and a valid priority are required'))
    return
  }

  try {
    const task = await createTask(title.trim(), priority)
    response.status(201).json({ success: true, task: serializeTask(task) })
  } catch (error) {
    console.error('Failed to create task', error)
    response.status(500).json(errorResponse('Internal server error'))
  }
}

export const listTasksController = async (_request: Request, response: Response) => {
  try {
    const tasks = await getTasks()
    response.json({ success: true, tasks: tasks.map(serializeTask) })
  } catch (error) {
    console.error('Failed to list tasks', error)
    response.status(500).json(errorResponse('Internal server error'))
  }
}

export const updateTaskController = async (request: Request, response: Response) => {
  const rawId = request.params.id
  const id = typeof rawId === 'string' ? parseTaskId(rawId) : null
  const { status } = request.body ?? {}

  if (id === null || !isStatus(status)) {
    response.status(400).json(errorResponse('A valid task ID and status are required'))
    return
  }

  try {
    const task = await updateTaskStatus(id, status)
    response.json({ success: true, task: serializeTask(task) })
  } catch (error) {
    if (isMissingTaskError(error)) {
      response.status(404).json(errorResponse('Task not found'))
      return
    }

    console.error('Failed to update task', error)
    response.status(500).json(errorResponse('Internal server error'))
  }
}

export const deleteTaskController = async (request: Request, response: Response) => {
  const rawId = request.params.id
  const id = typeof rawId === 'string' ? parseTaskId(rawId) : null

  if (id === null) {
    response.status(400).json(errorResponse('A valid task ID is required'))
    return
  }

  try {
    await deleteTask(id)
    response.status(204).send()
  } catch (error) {
    if (isMissingTaskError(error)) {
      response.status(404).json(errorResponse('Task not found'))
      return
    }

    console.error('Failed to delete task', error)
    response.status(500).json(errorResponse('Internal server error'))
  }
}
