const API = process.env.NEXT_PUBLIC_API_URL!;

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

    if (!res.ok) throw new Error("Booking failed");

    return res.json();
}