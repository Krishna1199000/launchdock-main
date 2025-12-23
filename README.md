# LaunchDock Client Dashboard

A production-ready full-stack client dashboard application built with Next.js, Prisma, PostgreSQL, and modern web technologies.

## 🚀 Features

- **Authentication & Authorization**: Secure JWT-based auth with role-based access (Admin/Client)
- **Project Management**: Full CRUD for projects with milestones, tasks, and progress tracking
- **Real-time Messaging**: Chat system with typing indicators (Pusher/Socket.IO)
- **File Management**: S3-based file uploads with presigned URLs
- **Payment Processing**: Stripe integration for invoices and payments
- **Support Tickets**: Ticket system with priority levels
- **Responsive UI**: Modern, animated interface with Framer Motion

## 📋 Tech Stack

- **Frontend**: Next.js 16 (App Router), React, TypeScript, Tailwind CSS, Framer Motion
- **Backend**: Next.js API Routes, Prisma ORM
- **Database**: PostgreSQL (Neon/PlanetScale/Heroku Postgres compatible)
- **Authentication**: JWT with HTTP-only cookies
- **File Storage**: AWS S3 (or DigitalOcean Spaces/MinIO)
- **Payments**: Stripe Checkout
- **Real-time**: Pusher Channels (or Socket.IO)
- **Validation**: Zod

## 🛠️ Setup Instructions

### Prerequisites

- Node.js 18+ and npm
- PostgreSQL database
- AWS S3 bucket (or compatible)
- Stripe account
- Pusher account (optional, for real-time)

### 1. Clone and Install

```bash
git clone <your-repo-url>
cd launchdock-app
npm install
```

### 2. Environment Variables

Create a `.env` file in the root directory:

```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/launchdock?schema=public"

# Authentication
JWT_SECRET="your-super-secret-jwt-key-change-in-production-min-32-chars"
NEXTAUTH_URL="http://localhost:3000"

# Email Configuration
SMTP_HOST="mail.privateemail.com"
SMTP_PORT="587"
SMTP_USER="support@launchdock.me"
SMTP_PASS="your-email-password"

# AWS S3
AWS_ACCESS_KEY_ID="your-aws-access-key"
AWS_SECRET_ACCESS_KEY="your-aws-secret-key"
S3_BUCKET="launchdock-uploads"
S3_REGION="us-east-1"

# Stripe
STRIPE_SECRET_KEY="sk_test_your_stripe_secret_key"
STRIPE_PUBLISHABLE_KEY="pk_test_your_stripe_publishable_key"
STRIPE_WEBHOOK_SECRET="whsec_your_webhook_secret"

# Pusher (Optional)
PUSHER_APP_ID="your-pusher-app-id"
PUSHER_KEY="your-pusher-key"
PUSHER_SECRET="your-pusher-secret"
PUSHER_CLUSTER="us2"
```

### 3. Database Setup

```bash
# Generate Prisma Client
npx prisma generate

# Run migrations
npx prisma migrate dev --name init

# (Optional) Seed database with admin user
npx prisma db seed
```

### 4. Seed Script

Create `prisma/seed.ts`:

```typescript
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await bcrypt.hash("admin123", 12);

  const admin = await prisma.user.upsert({
    where: { email: "admin@launchdock.me" },
    update: {},
    create: {
      email: "admin@launchdock.me",
      name: "Admin User",
      passwordHash: hashedPassword,
      role: "ADMIN",
      isEmailVerified: true,
    },
  });

  console.log("Admin user created:", admin);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
```

Add to `package.json`:

```json
{
  "prisma": {
    "seed": "ts-node --compiler-options {\"module\":\"CommonJS\"} prisma/seed.ts"
  }
}
```

### 5. Run Development Server

```bash
npm run dev
```

Visit `http://localhost:3000`

## 📁 Project Structure

```
launchdock-app/
├── app/
│   ├── api/              # API routes
│   │   ├── auth/         # Authentication endpoints
│   │   ├── projects/     # Project CRUD
│   │   ├── files/        # File management
│   │   ├── payments/     # Stripe integration
│   │   └── profile/      # User profile
│   ├── dashboard/        # Dashboard pages
│   └── layout.tsx        # Root layout
├── components/
│   ├── dashboard/        # Dashboard components
│   └── ui/               # UI components
├── lib/
│   ├── auth.ts           # Authentication utilities
│   ├── prisma.ts         # Prisma client
│   ├── s3.ts             # S3 file operations
│   ├── validation.ts     # Zod schemas
│   └── pusher.ts         # Real-time messaging
├── prisma/
│   ├── schema.prisma     # Database schema
│   └── seed.ts           # Database seed
└── public/               # Static assets
```

## 🔌 API Endpoints

### Authentication

- `POST /api/auth/signup` - Create account
- `POST /api/auth/signin` - Sign in
- `POST /api/auth/verify-otp` - Verify email OTP
- `GET /api/auth/me` - Get current user

### Projects

- `GET /api/projects` - List projects (paginated)
- `POST /api/projects` - Create project
- `GET /api/projects/:id` - Get project detail
- `PATCH /api/projects/:id` - Update project
- `DELETE /api/projects/:id` - Delete project

### Milestones

- `GET /api/projects/:projectId/milestones` - List milestones
- `POST /api/projects/:projectId/milestones` - Create milestone
- `PATCH /api/milestones/:id` - Update milestone
- `DELETE /api/milestones/:id` - Delete milestone

### Tasks

- `GET /api/projects/:projectId/tasks` - List tasks
- `POST /api/projects/:projectId/tasks` - Create task
- `PATCH /api/tasks/:id` - Update task
- `DELETE /api/tasks/:id` - Delete task

### Messages

- `GET /api/projects/:projectId/messages` - Get messages (paginated)
- `POST /api/projects/:projectId/messages` - Send message

### Files

- `POST /api/uploads/presign` - Get presigned upload URL
- `POST /api/files` - Create file record
- `GET /api/files` - List files
- `GET /api/files/:id` - Get file
- `DELETE /api/files/:id` - Delete file

### Payments

- `GET /api/payments` - List payments
- `POST /api/payments/create-checkout-session` - Create Stripe checkout
- `POST /api/payments/webhook` - Stripe webhook handler

### Tickets

- `GET /api/projects/:projectId/tickets` - List tickets
- `POST /api/projects/:projectId/tickets` - Create ticket
- `GET /api/tickets/:id` - Get ticket
- `PATCH /api/tickets/:id` - Update ticket

### Profile

- `GET /api/profile` - Get profile
- `PATCH /api/profile` - Update profile
- `PATCH /api/profile/password` - Change password

## 🧪 Testing

```bash
# Run tests
npm test

# Run tests in watch mode
npm test:watch
```

## 🚢 Deployment

### Vercel (Recommended)

1. Push code to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy

### Manual Deployment

1. Build the application:
```bash
npm run build
```

2. Run migrations on production:
```bash
npx prisma migrate deploy
```

3. Start production server:
```bash
npm start
```

## 📝 Sample API Requests

### Sign Up

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

### Sign In

```bash
curl -X POST http://localhost:3000/api/auth/signin \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "password123"
  }'
```

### Create Project

```bash
curl -X POST http://localhost:3000/api/projects \
  -H "Content-Type: application/json" \
  -H "Cookie: auth-token=YOUR_TOKEN" \
  -d '{
    "name": "E-commerce Website",
    "type": "Web Development",
    "description": "A modern e-commerce platform"
  }'
```

### Get Presigned Upload URL

```bash
curl -X POST http://localhost:3000/api/uploads/presign \
  -H "Content-Type: application/json" \
  -H "Cookie: auth-token=YOUR_TOKEN" \
  -d '{
    "filename": "document.pdf",
    "mimeType": "application/pdf",
    "projectId": "project-id"
  }'
```

### Create Payment Checkout

```bash
curl -X POST http://localhost:3000/api/payments/create-checkout-session \
  -H "Content-Type: application/json" \
  -H "Cookie: auth-token=YOUR_TOKEN" \
  -d '{
    "amount": 1000,
    "projectId": "project-id",
    "description": "Project Payment"
  }'
```

## 🔒 Security Features

- JWT-based authentication with HTTP-only cookies
- Password hashing with bcrypt
- Input validation with Zod
- Role-based access control
- CORS protection
- Rate limiting (recommended)
- SQL injection protection (Prisma)

## 📚 Additional Resources

- [Prisma Documentation](https://www.prisma.io/docs)
- [Next.js Documentation](https://nextjs.org/docs)
- [Stripe API Reference](https://stripe.com/docs/api)
- [AWS S3 Documentation](https://docs.aws.amazon.com/s3/)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

MIT License
