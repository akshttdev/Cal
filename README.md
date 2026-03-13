# Cal.com Clone - Scheduling Platform

This is a full-stack scheduling and booking web application that meticulously replicates the core functionality and UI design of Cal.com. It allows users to create configurable event types, set recurring weekly availability, and exposes a public booking page that prevents double-booking.

## 🚀 Tech Stack

### Frontend
- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS & Vanilla CSS for custom animations/variables
- **Icons**: Lucide React
- **Components**: Custom reusable UI components mimicking Cal.com's design system

### Backend
- **Framework**: Node.js with Express.js
- **Language**: TypeScript
- **Database**: PostgreSQL
- **ORM**: Prisma
- **Architecture**: Service-oriented architecture (Routes -> Controllers -> Services)

## 🛠 Required Features Implemented

1. **Event Types Management**
   - Create, edit, and delete event types (Title, URL slug, description, duration).
   - Duplicate existing event types seamlessly.
   - Distinct public booking links for every event type.

2. **Availability Settings**
   - Configure working hours for specific days of the week.
   - Togglable active/inactive days.
   - Timezone selection and localized time parsing.
   
3. **Public Booking Page**
   - Clean calendar UI to select a date.
   - Dynamic available time slots based on the host's availability.
   - Name and Email collection for booking.
   - **Double-booking prevention**: Enforced via Prisma database transactions to ensure no overlap across all event types.
   - Elegant confirmation page.

4. **Bookings Dashboard**
   - Tabbed view distinguishing between Upcoming and Past bookings.
   - Immediate cancellation of bookings.

## ⚙️ Setup Instructions

### Prerequisites
- Node.js (v18+)
- PostgreSQL instance running locally or hosted (e.g., Supabase, Neon)

### 1. Database & Backend Setup

Navigate to the `backend` directory:
```bash
cd backend
npm install
```

Set up your environment variables. Create a `.env` file in the `backend` directory:
```env
PORT=4000
DATABASE_URL="postgresql://user:password@localhost:5432/cal_clone?schema=public"
DEFAULT_USER_ID="[Generate a UUID or use a fixed string]"
```

Initialize the database and seed sample data:
```bash
npx prisma db push
npx prisma db seed
```

Start the backend server:
```bash
npm run dev
```
*(Runs on http://localhost:4000)*

### 2. Frontend Setup

In a new terminal, navigate to the `frontend` directory:
```bash
cd frontend
npm install
```

Set up environment variables. Create a `.env.local` file in the `frontend` directory:
```env
NEXT_PUBLIC_API_URL="http://localhost:4000/api"
```

Start the Next.js development server:
```bash
npm run dev
```
*(Runs on http://localhost:3000)*

## 🧠 Approach & Assumptions

- **Authentication**: As per the requirements, no complex authentication (OAuth/JWT) was implemented. A `DEFAULT_USER_ID` is used across backend operations to simulate a logged-in admin user managing their calendar.
- **Double Booking**: Time slot conflicts are checked against *all* confirmed bookings belonging to the user's event types, not just the specific event type being booked. This is enforced atomically via Prisma `$transaction`.
- **Timezones**: Dates and bookings are strictly stored in UTC in the PostgreSQL database. The frontend handles converting these UTC times to the viewer's local timezone on the booking page. Wait times and generated slots map precisely against the host's defined availability constraints.
- **Design System**: A robust CSS variable-based theme was applied to identically match Cal.com's monochromatic, premium aesthetic. This includes matching hover effects, modal transitions, and typography.
