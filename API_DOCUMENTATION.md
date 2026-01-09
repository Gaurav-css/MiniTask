# Task Management API Documentation

Base URL: `http://localhost:5000/api`

## Authentication

### Register User
**POST** `/auth/register`

Creates a new user account.

**Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securePassword123"
}
```

**Response (201 Created):**
```json
{
  "_id": "65123abc...",
  "name": "John Doe",
  "email": "john@example.com",
  "token": "eyJhbG..."
}
```

### Login User
**POST** `/auth/login`

Authenticates a user and returns a JWT token.

**Body:**
```json
{
  "email": "john@example.com",
  "password": "securePassword123"
}
```

**Response (200 OK):**
```json
{
  "_id": "65123abc...",
  "name": "John Doe",
  "email": "john@example.com",
  "token": "eyJhbG..."
}
```

### Forgot Password
**POST** `/auth/forgotpassword`

Initiates the password reset process by sending an email with a reset token.

**Body:**
```json
{
  "email": "john@example.com"
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": "Email sent"
}
```

### Reset Password
**PUT** `/auth/resetpassword/:resetToken`

Resets the user's password using a valid token.

**Body:**
```json
{
  "password": "newSecurePassword123"
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": "Password updated success",
  "token": "eyJhbG..."
}
```

---

## Tasks

**All task endpoints require a Bearer Token in the Authorization header.**
Header: `Authorization: Bearer <token>`

### Get All Tasks
**GET** `/tasks`

Retrieves all tasks for the logged-in user. Supports filtering.

**Query Parameters:**
- `search`: (Optional) Search term for title/description.
- `status`: (Optional) Filter by status (`pending`, `in-progress`, `completed`).

**Response (200 OK):**
```json
[
  {
    "_id": "task123...",
    "title": "Complete Project",
    "description": "Finish the documentation",
    "status": "pending",
    "user": "user123...",
    "createdAt": "2024-01-01T10:00:00.000Z"
  }
]
```

### Create Task
**POST** `/tasks`

Creates a new task.

**Body:**
```json
{
  "title": "New Task",
  "description": "Details about the task..."
}
```

**Response (201 Created):**
```json
{
  "_id": "task123...",
  "title": "New Task",
  "description": "Details about the task...",
  "status": "pending",
  "user": "user123...",
  "createdAt": "..."
}
```

### Update Task
**PUT** `/tasks/:id`

Updates an existing task by ID.

**Body (all fields optional):**
```json
{
  "title": "Updated Title",
  "description": "Updated description",
  "status": "completed"
}
```

**Response (200 OK):**
Returns the updated task object.

### Delete Task
**DELETE** `/tasks/:id`

Deletes a task by ID.

**Response (200 OK):**
```json
{
  "message": "Task removed"
}
```
