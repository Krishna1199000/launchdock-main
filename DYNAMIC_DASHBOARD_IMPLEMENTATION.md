# Dynamic Dashboard Implementation

This document explains how all dashboard data after signin is dynamically fetched from the database through API endpoints, with no hardcoded data.

## Architecture Overview

### Data Flow
```
Database (PostgreSQL) 
  ↓
Prisma ORM
  ↓
Next.js API Routes (/api/admin/*, /api/projects, etc.)
  ↓
Frontend Components (React/Next.js)
  ↓
User Interface
```

## Database Schema

All data is stored in PostgreSQL using Prisma ORM. Key models include:

- **User**: Clients and admins
- **Project**: Client projects
- **Payment**: Payment records
- **Ticket**: Support tickets
- **Notification**: User notifications
- **Message**: Chat messages
- **File**: Project files

## API Endpoints

### Admin Dashboard Statistics
**Endpoint**: `GET /api/admin/stats`

**Description**: Provides comprehensive dashboard statistics for admin users.

**Response**:
```json
{
  "stats": {
    "totalClients": 10,
    "totalProjects": 25,
    "activeProjects": 18,
    "totalRevenue": 127500.00,
    "pendingPayments": 3,
    "unreadNotifications": 5,
    "openTickets": 7,
    "unreadMessages": 0
  },
  "recentProjects": [...],
  "recentClients": [...]
}
```

**Implementation**: `app/api/admin/stats/route.ts`
- Fetches all statistics in parallel for performance
- Calculates totals, counts, and aggregates from database
- Returns recent projects and clients for dashboard display

### Clients Management
**Endpoint**: `GET /api/admin/users`

**Description**: Lists all client users with filtering and pagination.

**Query Parameters**:
- `search`: Search by name or email
- `status`: Filter by "active" or "inactive"
- `page`: Page number
- `limit`: Items per page

**Response**: Includes client data with project counts and revenue calculations.

**Implementation**: `app/api/admin/users/route.ts`

### Projects Management
**Endpoint**: `GET /api/admin/projects`

**Description**: Lists all projects with filtering.

**Query Parameters**:
- `status`: Filter by project status
- `page`: Page number
- `limit`: Items per page

**Response**: Project data with client information and counts.

**Implementation**: `app/api/admin/projects/route.ts`

### Payments
**Endpoint**: `GET /api/payments`

**Description**: Lists payments (admin sees all, clients see their own).

**Response**: Payment data with project and client information.

**Implementation**: `app/api/payments/route.ts`

### Tickets
**Endpoint**: `GET /api/admin/tickets`

**Description**: Lists all support tickets.

**Query Parameters**:
- `status`: Filter by ticket status
- `priority`: Filter by priority

**Response**: Ticket data with client and project information.

**Implementation**: `app/api/admin/tickets/route.ts`

### Notifications
**Endpoint**: `GET /api/admin/notifications`

**Description**: Lists notifications grouped by time period (today, this week, earlier).

**Response**: Grouped notifications with unread count.

**Implementation**: `app/api/admin/notifications/route.ts`

## Frontend Components

### Admin Dashboard (`app/admin/page.tsx`)
- Fetches stats from `/api/admin/stats`
- Displays dynamic statistics cards
- Shows recent projects and clients
- All data is fetched from database

### Admin Dashboard Component (`components/dashboard/AdminDashboard.tsx`)
- **Previously had hardcoded data - NOW FULLY DYNAMIC**
- Fetches data from `/api/admin/stats`
- Displays:
  - Dynamic statistics (clients, projects, revenue, payments)
  - Recent projects (last 5 from database)
  - Recent clients (last 5 from database)
- Sidebar badges show dynamic counts

### Sidebar (`components/admin/Sidebar.tsx`)
- **NOW WITH DYNAMIC BADGE COUNTS**
- Fetches badge counts from `/api/admin/stats`
- Updates every 30 seconds
- Shows unread messages, open tickets, and unread notifications counts

### Clients Page (`app/admin/clients/page.tsx`)
- Fetches clients from `/api/admin/users`
- Supports search and filtering
- All data from database

### Projects Page (`app/admin/projects/page.tsx`)
- Fetches projects from `/api/admin/projects`
- Supports filtering by status
- All data from database

### Tickets Page (`app/admin/tickets/page.tsx`)
- Fetches tickets from `/api/admin/tickets`
- Kanban board view with dynamic status columns
- All data from database

### Payments Page (`app/admin/payments/page.tsx`)
- Fetches payments from `/api/payments`
- Supports status filtering
- All data from database

### Messages Page (`app/admin/messages/page.tsx`)
- Fetches projects from `/api/admin/projects`
- Chat interface for each project
- All data from database

### Notifications Page (`app/admin/notifications/page.tsx`)
- Fetches notifications from `/api/admin/notifications`
- Grouped by time periods
- All data from database

### Client Dashboard (`components/dashboard/ClientDashboard.tsx`)
- Already dynamic - fetches:
  - Projects from `/api/projects?userId=...`
  - Messages from `/api/messages?userId=...`
  - Files from `/api/files?userId=...`
- All data from database

## Key Changes Made

### 1. Removed Hardcoded Data
- **Before**: `components/dashboard/AdminDashboard.tsx` had hardcoded clients, projects, and stats arrays
- **After**: All data fetched from `/api/admin/stats` endpoint

### 2. Created Stats API Endpoint
- New endpoint: `app/api/admin/stats/route.ts`
- Aggregates all dashboard statistics
- Returns recent projects and clients
- Efficient parallel database queries

### 3. Dynamic Sidebar Badges
- **Before**: Hardcoded badge counts (badge: 5, badge: 2)
- **After**: Dynamic counts from stats API
- Updates every 30 seconds
- Shows unread messages, open tickets, unread notifications

### 4. Updated All Components
- All dashboard components now fetch from APIs
- No hardcoded sample data
- Proper loading states
- Error handling

## Data Flow Examples

### Example 1: Loading Dashboard Stats

1. User signs in as admin
2. Frontend: `app/admin/page.tsx` component mounts
3. `useEffect` hook calls `fetchDashboardStats()`
4. API call: `GET /api/admin/stats`
5. Backend: `app/api/admin/stats/route.ts` executes
6. Database queries run in parallel:
   - `prisma.user.count()` for total clients
   - `prisma.project.count()` for total projects
   - `prisma.payment.findMany()` for revenue calculation
   - `prisma.notification.count()` for unread count
   - etc.
7. Data aggregated and returned as JSON
8. Frontend receives data and updates state
9. UI renders with real data

### Example 2: Loading Clients List

1. User navigates to `/admin/clients`
2. Frontend: `app/admin/clients/page.tsx` mounts
3. `useEffect` calls `fetchClients()`
4. API call: `GET /api/admin/users?page=1&limit=20`
5. Backend: `app/api/admin/users/route.ts` executes
6. Database query: `prisma.user.findMany()` with filters
7. Additional query: Calculate revenue per client
8. Data formatted and returned
9. Frontend displays clients table with real data

### Example 3: Sidebar Badge Counts

1. `components/admin/Sidebar.tsx` mounts
2. `useEffect` calls `fetchBadges()`
3. API call: `GET /api/admin/stats`
4. Backend returns badge counts
5. Frontend updates badge state
6. Badges display on sidebar items
7. Refreshes every 30 seconds

## Authentication & Authorization

All admin endpoints use `requireAdmin` middleware:
- Checks authentication token
- Verifies user role is ADMIN
- Returns 401 if unauthorized

**Implementation**: `lib/auth.ts`

## Performance Optimizations

1. **Parallel Queries**: Stats API runs all database queries in parallel using `Promise.all()`
2. **Selective Fields**: Only fetches needed fields using Prisma `select`
3. **Pagination**: Large lists use pagination to limit data transfer
4. **Caching**: Frontend can cache data (implemented in components)
5. **Polling**: Sidebar badges refresh every 30 seconds instead of constant polling

## Testing

To verify dynamic data:
1. Sign in as admin
2. Check dashboard - should show real counts from database
3. Navigate to clients - should show real clients
4. Navigate to projects - should show real projects
5. Check sidebar badges - should show real counts
6. Create a new client/project - should appear immediately after refresh

## Future Enhancements

Potential improvements:
1. Real-time updates using WebSockets
2. Optimistic UI updates
3. More granular caching strategies
4. Server-side pagination for better performance
5. Message read status tracking for accurate unread counts



