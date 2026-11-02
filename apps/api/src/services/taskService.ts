import { prisma } from '../lib/prisma.js'

export type Priority = 'low' | 'medium' | 'high'
export type Status = 'pending' | 'completed'

export const createTask = (title: string, priority: Priority) =>
  prisma.task.create({ data: { title, priority } })

export const getTasks = () =>
  prisma.task.findMany({ orderBy: { createdAt: 'asc' } })

export const updateTaskStatus = (id: number, status: Status) =>
  prisma.task.update({ where: { id }, data: { status } })

export const deleteTask = (id: number) =>
  prisma.task.delete({ where: { id } })
