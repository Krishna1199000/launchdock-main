# API Endpoints Checklist

## ✅ Authentication Endpoints

- [x] `POST /api/auth/signup` - Create user account
- [x] `POST /api/auth/signin` - Sign in user
- [x] `POST /api/auth/verify-otp` - Verify email OTP
- [x] `GET /api/auth/me` - Get current user
- [ ] `POST /api/auth/forgot-password` - Request password reset
- [ ] `POST /api/auth/reset-password` - Reset password with token

## ✅ Project Endpoints

- [x] `GET /api/projects` - List projects (paginated, filtered by role)
- [x] `POST /api/projects` - Create project
- [x] `GET /api/projects/:id` - Get project detail (with milestones, tasks, files)
- [x] `PATCH /api/projects/:id` - Update project
- [x] `DELETE /api/projects/:id` - Delete project

## ✅ Milestone Endpoints

- [x] `GET /api/projects/:projectId/milestones` - List milestones
- [x] `POST /api/projects/:projectId/milestones` - Create milestone
- [x] `PATCH /api/milestones/:id` - Update milestone
- [x] `DELETE /api/milestones/:id` - Delete milestone

## ✅ Task Endpoints

- [x] `GET /api/projects/:projectId/tasks` - List tasks
- [x] `POST /api/projects/:projectId/tasks` - Create task
- [x] `PATCH /api/tasks/:id` - Update task
- [x] `DELETE /api/tasks/:id` - Delete task

## ✅ Message Endpoints

- [x] `GET /api/projects/:projectId/messages` - Get messages (paginated)
- [x] `POST /api/projects/:projectId/messages` - Send message (broadcasts via Pusher)

## ✅ File Endpoints

- [x] `POST /api/uploads/presign` - Get presigned S3 upload URL
- [x] `POST /api/files` - Create file record after upload
- [x] `GET /api/files` - List files (with project filter)
- [x] `GET /api/files/:id` - Get file metadata
- [x] `DELETE /api/files/:id` - Delete file (from S3 and DB)

## ✅ Payment Endpoints

- [x] `GET /api/payments` - List payments
- [x] `POST /api/payments/create-checkout-session` - Create Stripe checkout
- [x] `POST /api/payments/webhook` - Stripe webhook handler

## ✅ Ticket Endpoints

- [x] `GET /api/projects/:projectId/tickets` - List tickets
- [x] `POST /api/projects/:projectId/tickets` - Create ticket
- [x] `GET /api/tickets/:id` - Get ticket
- [x] `PATCH /api/tickets/:id` - Update ticket

## ✅ Profile Endpoints

- [x] `GET /api/profile` - Get user profile
- [x] `PATCH /api/profile` - Update profile
- [x] `PATCH /api/profile/password` - Change password

## ⏳ Admin Endpoints (To Implement)

- [ ] `GET /api/admin/users` - List all users (admin only)
- [ ] `GET /api/admin/users/:id` - Get user details (admin only)
- [ ] `PATCH /api/admin/users/:id` - Update user (admin only)

## Sample cURL Requests

### 1. Sign Up
```bash
curl -X POST http://localhost:3000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123",
    "phone": "+1234567890"
  }'
```

### 2. Sign In
```bash
curl -X POST http://localhost:3000/api/auth/signin \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "password123"
  }' \
  -c cookies.txt
```

### 3. Get Current User
```bash
curl -X GET http://localhost:3000/api/auth/me \
  -b cookies.txt
```

### 4. Create Project
```bash
curl -X POST http://localhost:3000/api/projects \
  -H "Content-Type: application/json" \
  -b cookies.txt \
  -d '{
    "name": "E-commerce Website",
    "type": "Web Development",
    "description": "A modern e-commerce platform",
    "deadline": "2024-12-31T00:00:00Z"
  }'
```

### 5. Get Project Detail
```bash
curl -X GET http://localhost:3000/api/projects/PROJECT_ID \
  -b cookies.txt
```

### 6. Create Milestone
```bash
curl -X POST http://localhost:3000/api/projects/PROJECT_ID/milestones \
  -H "Content-Type: application/json" \
  -b cookies.txt \
  -d '{
    "title": "Design Phase Complete",
    "description": "All design mockups approved",
    "dueDate": "2024-12-15T00:00:00Z",
    "orderIndex": 1
  }'
```

### 7. Create Task
```bash
curl -X POST http://localhost:3000/api/projects/PROJECT_ID/tasks \
  -H "Content-Type: application/json" \
  -b cookies.txt \
  -d '{
    "title": "Implement user authentication",
    "description": "Add login and signup functionality",
    "status": "TODO",
    "orderIndex": 1
  }'
```

### 8. Send Message
```bash
curl -X POST http://localhost:3000/api/projects/PROJECT_ID/messages \
  -H "Content-Type: application/json" \
  -b cookies.txt \
  -d '{
    "content": "The design looks great! Ready to proceed.",
    "type": "TEXT"
  }'
```

### 9. Get Presigned Upload URL
```bash
curl -X POST http://localhost:3000/api/uploads/presign \
  -H "Content-Type: application/json" \
  -b cookies.txt \
  -d '{
    "filename": "document.pdf",
    "mimeType": "application/pdf",
    "projectId": "PROJECT_ID"
  }'
```

### 10. Create File Record
```bash
curl -X POST http://localhost:3000/api/files \
  -H "Content-Type: application/json" \
  -b cookies.txt \
  -d '{
    "filename": "document.pdf",
    "mime": "application/pdf",
    "size": 1024000,
    "url": "https://bucket.s3.amazonaws.com/path/to/file.pdf",
    "storageKey": "projects/PROJECT_ID/uuid.pdf",
    "projectId": "PROJECT_ID"
  }'
```

### 11. Create Payment Checkout
```bash
curl -X POST http://localhost:3000/api/payments/create-checkout-session \
  -H "Content-Type: application/json" \
  -b cookies.txt \
  -d '{
    "amount": 1000,
    "projectId": "PROJECT_ID",
    "description": "Project Payment - Milestone 1"
  }'
```

### 12. Create Ticket
```bash
curl -X POST http://localhost:3000/api/projects/PROJECT_ID/tickets \
  -H "Content-Type: application/json" \
  -b cookies.txt \
  -d '{
    "title": "Bug in checkout process",
    "description": "Users cannot complete checkout on mobile devices",
    "priority": "HIGH"
  }'
```

### 13. Update Profile
```bash
curl -X PATCH http://localhost:3000/api/profile \
  -H "Content-Type: application/json" \
  -b cookies.txt \
  -d '{
    "name": "John Updated",
    "phone": "+1234567890"
  }'
```

### 14. Change Password
```bash
curl -X PATCH http://localhost:3000/api/profile/password \
  -H "Content-Type: application/json" \
  -b cookies.txt \
  -d '{
    "currentPassword": "oldpassword123",
    "newPassword": "newpassword123"
  }'
```














