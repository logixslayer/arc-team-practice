import { Router } from 'express'
import {
  createTaskController,
  deleteTaskController,
  listTasksController,
  updateTaskController,
} from '../controllers/taskController.js'

export const taskRoutes = Router()

taskRoutes.post('/', createTaskController)
taskRoutes.get('/', listTasksController)
taskRoutes.patch('/:id', updateTaskController)
taskRoutes.delete('/:id', deleteTaskController)
