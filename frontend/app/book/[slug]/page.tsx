"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getEvent, getSlots, createBooking } from "@/lib/api";

export default function BookingPage() {
    const params = useParams();
    const slug = params.slug as string;

    const [event, setEvent] = useState<any>(null);
    const [date, setDate] = useState("");
    const [slots, setSlots] = useState<string[]>([]);
    const [selectedSlot, setSelectedSlot] = useState<string | null>(null);

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");

    useEffect(() => {
        if (!slug) return;

        getEvent(slug).then(setEvent).catch(console.error);
    }, [slug]);

    async function loadSlots() {
        const s = await getSlots(slug, date);
        setSlots(s);
    }

    async function book() {
        if (!selectedSlot) return;

        const start = new Date(selectedSlot);
        const end = new Date(start.getTime() + event.duration * 60000);

        await createBooking({
            eventTypeId: event.id,
            attendeeName: name,
            attendeeEmail: email,
            startTime: start.toISOString(),
            endTime: end.toISOString(),
        });

        alert("Booking confirmed!");
    }

    if (!event) return <div>Loading...</div>;

    return (
        <div className="max-w-xl mx-auto p-6 space-y-6">
            <h1 className="text-2xl font-bold">{event.title}</h1>
            <p>{event.description}</p>

            <div>
                <label>Select date</label>
                <input
                    type="date"
                    className="border p-2 w-full"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                />
                <button
                    onClick={loadSlots}
                    className="mt-2 bg-black text-white px-4 py-2"
                >
                    Load Slots
                </button>
            </div>

            <div className="grid grid-cols-3 gap-2">
                {slots.map((s) => (
                    <button
                        key={s}
                        onClick={() => setSelectedSlot(s)}
                        className={`border p-2 ${selectedSlot === s ? "bg-black text-white" : ""
                            }`}
                    >
                        {new Date(s).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                        })}
                    </button>
                ))}
            </div>

            {selectedSlot && (
                <div className="space-y-2">
                    <input
                        placeholder="Name"
                        className="border p-2 w-full"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />

                    <input
                        placeholder="Email"
                        className="border p-2 w-full"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <button
                        onClick={book}
                        className="bg-black text-white px-4 py-2 w-full"
                    >
                        Confirm Booking
                    </button>
                </div>
            )}
        </div>
    );
}