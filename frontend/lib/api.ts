const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api";

export async function getEvent(slug: string) {
    const res = await fetch(`${API}/public/event-types/${slug}`);
    if (!res.ok) throw new Error("Event not found");
    return res.json();
}

export async function getSlots(slug: string, date: string) {
    const res = await fetch(`${API}/public/slots?slug=${slug}&date=${date}`);
    if (!res.ok) throw new Error("Failed to fetch slots");
    return res.json();
}

export async function createBooking(data: any) {
    const res = await fetch(`${API}/public/book`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    });
    if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.error || "Booking failed");
    }
    return res.json();
}

// Host Dashboard API

export async function getEventTypes() {
    const res = await fetch(`${API}/event-types`, { cache: 'no-store' });
    if (!res.ok) throw new Error("Failed to fetch event types");
    return res.json();
}

export async function getEventTypeById(id: string) {
    const res = await fetch(`${API}/event-types/${id}`, { cache: 'no-store' });
    if (!res.ok) throw new Error("Failed to fetch event type");
    return res.json();
}

export async function createEventType(data: any) {
    const res = await fetch(`${API}/event-types`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Failed to create event type");
    return res.json();
}

export async function deleteEventType(id: string) {
    const res = await fetch(`${API}/event-types/${id}`, {
        method: "DELETE",
    });

    if (!res.ok) {
        const text = await res.text();
        throw new Error(text || "Failed to delete event type");
    }

    if (res.status === 204) return true;

    return res.json();
}

export async function updateEventType(id: string, data: any) {
    const res = await fetch(`${API}/event-types/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Failed to update event type");
    return res.json();
}

export async function getBookings(type: "upcoming" | "past" = "upcoming") {
    const res = await fetch(`${API}/bookings?filter=${type}`, { cache: 'no-store' });
    if (!res.ok) throw new Error("Failed to fetch bookings");
    return res.json();
}

export async function deleteBooking(id: string) {
    const res = await fetch(`${API}/bookings/${id}`, {
        method: "DELETE",
    });
    if (!res.ok) throw new Error("Failed to delete booking");
    return res.status === 204 ? null : res.json();
}

export async function getAvailability() {
    const res = await fetch(`${API}/availability`, { cache: 'no-store' });
    if (!res.ok) throw new Error("Failed to fetch availability");
    return res.json();
}

export async function updateAvailability(data: any) {
    const res = await fetch(`${API}/availability`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Failed to update availability");
    return res.json();
}

export async function updateTimezone(timezone: string) {
    const res = await fetch(`${API}/availability/timezone`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ timezone }),
    });
    if (!res.ok) throw new Error("Failed to update timezone");
    return res.json();
}