import express from 'express'
import './config/env.js'
import { taskRoutes } from './routes/taskRoutes.js'

const app = express()
const port = Number(process.env.PORT) || 3000
const allowedOrigins = new Set([
  'http://localhost:5173',
  'http://127.0.0.1:5173',
])

app.use(express.json())

app.use((request, response, next) => {
  const origin = request.headers.origin
  if (origin && allowedOrigins.has(origin)) {
    response.setHeader('Access-Control-Allow-Origin', origin)
    response.setHeader('Vary', 'Origin')
  }
  response.setHeader('Access-Control-Allow-Methods', 'GET,POST,PATCH,DELETE,OPTIONS')
  response.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  if (request.method === 'OPTIONS') {
    response.sendStatus(204)
    return
  }

  next()
})

app.get('/health', (_request, response) => {
  response.json({ success: true, message: 'API is running' })
})

app.use('/api/tasks', taskRoutes)

app.use((_request, response) => {
  response.status(404).json({
    success: false,
    error: { message: 'Route not found' },
  })
})

app.use((error: unknown, _request: express.Request, response: express.Response, _next: express.NextFunction) => {
  if (error instanceof SyntaxError) {
    response.status(400).json({
      success: false,
      error: { message: 'Invalid JSON body' },
    })
    return
  }

  console.error('Unhandled API error', error)
  response.status(500).json({
    success: false,
    error: { message: 'Internal server error' },
  })
})

app.listen(port, () => {
  console.log(`API server listening on http://localhost:${port}`)
})
