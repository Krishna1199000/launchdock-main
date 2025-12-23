# Deployment Guide

## 🚀 Deployment Options

### Option 1: Vercel (Recommended for Next.js)

Vercel is the easiest way to deploy Next.js applications with built-in support for serverless functions.

#### Steps:

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Import to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Configure environment variables (see below)

3. **Environment Variables in Vercel**
   - Go to Project Settings → Environment Variables
   - Add all variables from `.env.example`
   - For production, use production values

4. **Database Setup**
   - Use Vercel Postgres or external provider (Neon, Supabase)
   - Add `DATABASE_URL` to environment variables
   - Run migrations: `npx prisma migrate deploy`

5. **Deploy**
   - Vercel will automatically deploy on push
   - Or click "Deploy" in dashboard

#### Vercel Configuration

Create `vercel.json`:
```json
{
  "buildCommand": "npm run build",
  "devCommand": "npm run dev",
  "installCommand": "npm install",
  "framework": "nextjs",
  "regions": ["iad1"]
}
```

### Option 2: DigitalOcean App Platform

1. **Create App**
   - Go to DigitalOcean App Platform
   - Connect GitHub repository
   - Select Node.js buildpack

2. **Configure Environment**
   - Add all environment variables
   - Set build command: `npm run build`
   - Set run command: `npm start`

3. **Add Database**
   - Create managed PostgreSQL database
   - Add `DATABASE_URL` connection string

4. **Add S3-Compatible Storage**
   - Use DigitalOcean Spaces
   - Update S3 credentials in environment

### Option 3: Heroku

1. **Install Heroku CLI**
   ```bash
   npm install -g heroku
   ```

2. **Create App**
   ```bash
   heroku create launchdock-app
   ```

3. **Add PostgreSQL**
   ```bash
   heroku addons:create heroku-postgresql:mini
   ```

4. **Set Environment Variables**
   ```bash
   heroku config:set JWT_SECRET=your-secret
   heroku config:set DATABASE_URL=$(heroku config:get DATABASE_URL)
   # Add all other variables
   ```

5. **Deploy**
   ```bash
   git push heroku main
   heroku run npx prisma migrate deploy
   ```

### Option 4: Self-Hosted (Docker)

Create `Dockerfile`:
```dockerfile
FROM node:18-alpine AS base

# Install dependencies
FROM base AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci

# Build
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npx prisma generate
RUN npm run build

# Production
FROM base AS runner
WORKDIR /app
ENV NODE_ENV production

COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma

EXPOSE 3000
ENV PORT 3000

CMD ["node", "server.js"]
```

Create `docker-compose.yml`:
```yaml
version: '3.8'
services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - DATABASE_URL=${DATABASE_URL}
      - JWT_SECRET=${JWT_SECRET}
      # Add other env vars
    depends_on:
      - db

  db:
    image: postgres:15
    environment:
      - POSTGRES_USER=launchdock
      - POSTGRES_PASSWORD=password
      - POSTGRES_DB=launchdock
    volumes:
      - postgres_data:/var/lib/postgresql/data

volumes:
  postgres_data:
```

## 🔧 Pre-Deployment Checklist

### Database
- [ ] Run migrations: `npx prisma migrate deploy`
- [ ] Seed database (optional): `npm run db:seed`
- [ ] Verify database connection

### Environment Variables
- [ ] All secrets are set in production environment
- [ ] `NODE_ENV=production`
- [ ] Database URL is correct
- [ ] S3 credentials are valid
- [ ] Stripe keys are production keys
- [ ] Email SMTP settings are configured

### Security
- [ ] JWT_SECRET is strong and unique
- [ ] CORS is configured for production domain
- [ ] Rate limiting is enabled (recommended)
- [ ] HTTPS is enabled

### Testing
- [ ] All API endpoints tested
- [ ] Authentication flow works
- [ ] File uploads work
- [ ] Payments process correctly
- [ ] Real-time messaging works

## 📝 Post-Deployment

1. **Verify Health**
   - Check `/api/auth/me` endpoint
   - Test signup/signin flow
   - Verify database connections

2. **Monitor**
   - Set up error tracking (Sentry recommended)
   - Monitor API response times
   - Check database performance

3. **Backup**
   - Set up automated database backups
   - Backup S3 bucket regularly

## 🔗 External Services Setup

### AWS S3
1. Create S3 bucket
2. Configure CORS:
```json
[
  {
    "AllowedHeaders": ["*"],
    "AllowedMethods": ["GET", "PUT", "POST", "DELETE"],
    "AllowedOrigins": ["https://yourdomain.com"],
    "ExposeHeaders": []
  }
]
```
3. Set bucket policy for public access (if needed)

### Stripe
1. Get production API keys from Stripe Dashboard
2. Set up webhook endpoint: `https://yourdomain.com/api/payments/webhook`
3. Configure webhook events:
   - `checkout.session.completed`
   - `payment_intent.payment_failed`

### Pusher
1. Create Pusher app
2. Get credentials from dashboard
3. Add to environment variables
4. Configure client-side: `NEXT_PUBLIC_PUSHER_KEY` and `NEXT_PUBLIC_PUSHER_CLUSTER`

## 🐛 Troubleshooting

### Database Connection Issues
- Verify `DATABASE_URL` format
- Check database is accessible from deployment region
- Verify SSL requirements

### File Upload Issues
- Check S3 bucket permissions
- Verify CORS configuration
- Check presigned URL expiration

### Real-time Not Working
- Verify Pusher credentials
- Check client-side environment variables
- Verify channel subscription

### Payment Issues
- Check Stripe webhook URL is correct
- Verify webhook signature
- Check Stripe logs in dashboard








