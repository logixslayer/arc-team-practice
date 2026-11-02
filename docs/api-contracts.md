# Task Management API Contract

This document defines the initial REST contract for the Task Management feature. The endpoints are documented for the feature branches; they are not implemented in the foundation branch.

## Task fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | number | Unique task identifier |
| `title` | string | Task title |
| `priority` | string | Task priority, such as `low`, `medium`, or `high` |
| `status` | string | Task status, such as `pending` or `completed` |

## Create a task

`POST /api/tasks`

Request:

```json
{
  "title": "Study Java",
  "priority": "high"
}
```

Response (`201 Created`):

```json
{
  "success": true,
  "task": {
    "id": 1,
    "title": "Study Java",
    "priority": "high",
    "status": "pending"
  }
}
```

## List tasks

`GET /api/tasks`

Response (`200 OK`):

```json
{
  "success": true,
  "tasks": []
}
```

## Update task status

`PATCH /api/tasks/:id`

Request:

```json
{
  "status": "completed"
}
```

Response (`200 OK`):

```json
{
  "success": true,
  "task": {
    "id": 1,
    "title": "Study Java",
    "priority": "high",
    "status": "completed"
  }
}
```

## Delete a task

`DELETE /api/tasks/:id`

Response (`204 No Content`) has no response body.

## Error responses

Errors use a consistent JSON shape:

```json
{
  "success": false,
  "error": {
    "message": "Task not found"
  }
}
```

Expected status codes:

- `200 OK`: Successful listing or update.
- `201 Created`: Task created successfully.
- `204 No Content`: Task deleted successfully.
- `400 Bad Request`: Invalid or missing request data.
- `404 Not Found`: The requested task does not exist.
- `500 Internal Server Error`: Unexpected server failure.
