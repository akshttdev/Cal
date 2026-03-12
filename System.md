# Cal — System Architecture

## Overview

Cal is a scheduling and booking web application inspired by Cal.com.
It allows a host to define event types, configure availability, and share public booking links where guests can schedule meetings.

The system is built with a modern full-stack architecture designed for scalability and maintainability.

---

# Technology Stack

## Frontend

* **Framework:** Next.js (App Router)
* **Language:** TypeScript
* **Styling:** TailwindCSS
* **Architecture:** Component-based UI with reusable hooks

## Backend

* **Runtime:** Node.js
* **Framework:** Express.js
* **Language:** TypeScript
* **Architecture:** Layered (Routes → Controllers → Services)

## Database

* **Database:** PostgreSQL
* **ORM:** Prisma
* **Migrations:** Prisma Migrate

---

# High-Level Architecture

```
User Browser
     │
     ▼
Next.js Frontend
     │
     │ HTTP REST API
     ▼
Express Backend
     │
     │ Prisma ORM
     ▼
PostgreSQL Database
```

Responsibilities:

Frontend

* UI rendering
* booking interface
* dashboard management

Backend

* business logic
* slot generation
* booking validation
* database access

Database

* persistent storage
* availability rules
* booking records

---

# Backend Architecture

The backend follows a layered architecture to maintain separation of concerns.

```
Routes
  ↓
Controllers
  ↓
Services
  ↓
Database (Prisma)
```

### Routes

Define API endpoints and connect them to controllers.

Example:

```
/event-types
/bookings
/availability
/public
```

---

### Controllers

Controllers handle HTTP requests and responses.

Responsibilities:

* validate input
* call services
* return responses

Controllers remain thin and contain no business logic.

Example:

```
event-type.controller.ts
booking.controller.ts
availability.controller.ts
```

---

### Services

Services contain core business logic.

Responsibilities:

* database queries
* scheduling logic
* slot generation
* booking validation

Example services:

```
event-type.service.ts
availability.service.ts
booking.service.ts
slot.service.ts
```

---

### Utilities

Reusable utilities include:

```
prisma.ts   → database client
time.ts     → time calculations
errors.ts   → centralized error handling
```

---

# Frontend Architecture

The frontend uses the Next.js App Router.

## Folder Structure

```
frontend/
 ├ app
 ├ components
 ├ hooks
 ├ lib
 ├ types
 └ styles
```

---

## App Router Structure

```
/dashboard
/dashboard/event-types
/dashboard/bookings
/dashboard/availability
/book/[slug]
/confirmation
```

Dashboard pages are used by the host to manage scheduling.

Public routes allow guests to book meetings.

---

## Components

Components are divided into three groups.

### UI Components

Reusable design elements.

```
button
input
modal
card
```

---

### Dashboard Components

```
sidebar
header
event-type-card
booking-table
```

Used across host management pages.

---

### Booking Components

```
calendar
time-slots
booking-form
```

Used on the public booking page.

---

# Database Design

The system contains four primary entities.

```
Users
EventTypes
Availability
Bookings
```

---

## Users

Represents the host account.

Fields:

```
id
name
email
created_at
```

Currently the system assumes one logged-in user.

---

## Event Types

Defines the type of meeting guests can book.

Examples:

* 30 minute meeting
* 60 minute consultation
* Demo call

Fields:

```
id
title
description
duration_minutes
slug
user_id
created_at
updated_at
```

The slug generates the public booking URL.

Example:

```
/book/30min-meeting
```

---

## Availability

Defines the recurring weekly schedule for the host.

Example schedule:

```
Monday    09:00–17:00
Tuesday   09:00–17:00
Wednesday 10:00–15:00
```

Fields:

```
id
user_id
day_of_week
start_time
end_time
timezone
```

---

## Bookings

Stores confirmed meetings.

Fields:

```
id
event_type_id
user_id
guest_name
guest_email
start_time
end_time
status
created_at
```

Status values:

```
CONFIRMED
CANCELLED
```

---

# Slot Generation System

Available slots are generated dynamically based on:

```
Availability
+ Event Duration
+ Existing Bookings
```

Example:

Availability:

```
9:00 → 17:00
```

Event duration:

```
30 minutes
```

Generated slots:

```
9:00
9:30
10:00
10:30
...
```

Booked slots are removed from the list before returning available slots.

---

# Double Booking Prevention

The system prevents double booking using two layers.

### Application Layer

The backend checks for overlapping bookings before inserting a new booking.

### Database Layer

Indexes and constraints prevent duplicate bookings at the database level.

---

# REST API Design

### Event Types

```
GET    /event-types
POST   /event-types
PATCH  /event-types/:id
DELETE /event-types/:id
```

---

### Availability

```
GET /availability
PUT /availability
```

---

### Bookings

```
GET /bookings/upcoming
GET /bookings/past
DELETE /bookings/:id
```

---

### Public Booking

```
GET  /public/event/:slug
GET  /public/slots
POST /public/book
```

---

# Key System Responsibilities

The backend performs three critical operations:

1. Generate available time slots
2. Validate booking conflicts
3. Persist bookings

The frontend focuses only on UI and user interaction.

---

# Scalability Considerations

The system is designed to support future improvements:

* multiple users
* team scheduling
* distributed booking services
* caching slot results
* calendar integrations

---

# Deployment Architecture (Future)

Production deployment may include:

```
Next.js → Vercel
Backend → Docker / Node server
Database → Managed PostgreSQL
```

---

# Summary

Cal uses a modern full-stack architecture:

```
Next.js Frontend
        ↓
Express Backend
        ↓
Prisma ORM
        ↓
PostgreSQL Database
```

The architecture emphasizes:

* modularity
* clear separation of concerns
* scalability
* maintainability
