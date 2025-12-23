# Quick Setup Guide

## Step 1: Install Dependencies

```bash
npm install
```

## Step 2: Environment Variables

Create a `.env` file in the root directory with the following:

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

# Pusher (Optional - for real-time)
PUSHER_APP_ID="your-pusher-app-id"
PUSHER_KEY="your-pusher-key"
PUSHER_SECRET="your-pusher-secret"
PUSHER_CLUSTER="us2"

# Client-side Pusher (for frontend)
NEXT_PUBLIC_PUSHER_KEY="your-pusher-key"
NEXT_PUBLIC_PUSHER_CLUSTER="us2"
```

## Step 3: Database Setup

```bash
# Generate Prisma Client
npm run db:generate

# Run migrations
npm run db:migrate

# Seed database (optional)
npm run db:seed
```

## Step 4: Run Development Server

```bash
npm run dev
```

Visit `http://localhost:3000`

## Step 5: Test the Application

1. **Sign Up**: Create a new account at `/signup`
2. **Verify Email**: Check your email for OTP code
3. **Sign In**: Login with your credentials
4. **Dashboard**: View projects and interact with the dashboard

## Default Admin User (from seed)

- Email: `admin@launchdock.me`
- Password: `admin123`

## Default Client User (from seed)

- Email: `client@example.com`
- Password: `client123`

## Troubleshooting

### Database Connection Issues
- Ensure PostgreSQL is running
- Verify DATABASE_URL is correct
- Check database exists

### Email Not Sending
- Verify SMTP credentials
- Check spam folder
- Ensure SMTP port is not blocked

### File Upload Issues
- Verify AWS S3 credentials
- Check S3 bucket exists
- Verify bucket permissions

### Real-time Not Working
- Check Pusher credentials
- Verify NEXT_PUBLIC_PUSHER_KEY is set
- Check browser console for errors

## Next Steps

1. Review `README.md` for detailed documentation
2. Check `API_CHECKLIST.md` for API endpoints
3. See `DEPLOYMENT.md` for production deployment
4. Review `PROJECT_SUMMARY.md` for feature overview








