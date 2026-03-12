"use client";

import { useEffect, useState } from "react";
import { getBookings, deleteBooking } from "@/lib/api";
import { BookingTable } from "@/components/dashboard/booking-table";
import { Filter, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const TABS = [
    { id: "upcoming", label: "Upcoming" },
    { id: "unconfirmed", label: "Unconfirmed" },
    { id: "recurring", label: "Recurring" },
    { id: "past", label: "Past" },
    { id: "canceled", label: "Canceled" }
];

export default function BookingsPage() {
    const [activeTab, setActiveTab] = useState("upcoming");
    const [bookings, setBookings] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchBookings();
    }, [activeTab]);

    async function fetchBookings() {
        setLoading(true);
        try {
            // we map any non-past tab to upcoming for now in the backend call
            const apiTab = activeTab === "past" ? "past" : "upcoming";
            const data = await getBookings(apiTab);
            setBookings(data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    }

    async function handleDelete(id: string) {
        try {
            await deleteBooking(id);
            setBookings(bookings.filter(b => b.id !== id));
        } catch (err) {
            alert("Failed to delete booking");
        }
    }

    return (
        <div className="space-y-6 animate-in mt-2 fade-in slide-in-from-bottom-4 duration-500">
            <div>
                <h1 className="text-[20px] font-bold tracking-tight">Bookings</h1>
                <p className="text-[14px] text-[color:var(--muted-foreground)] mt-1 tracking-tight">See upcoming and past events booked through your event type links.</p>
            </div>

            <div className="flex items-center justify-between pb-4 border-[color:var(--border)] overflow-x-auto">
                <div className="flex items-center gap-1">
                    {TABS.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={cn(
                                "px-3 py-1.5 rounded-md text-[13px] font-medium transition-colors whitespace-nowrap",
                                activeTab === tab.id
                                    ? "bg-[color:var(--card)] border border-[color:var(--border)] text-[color:var(--foreground)]"
                                    : "text-[color:var(--muted-foreground)] hover:text-[color:var(--foreground)] border border-transparent"
                            )}
                        >
                            {tab.label}
                        </button>
                    ))}
                    <div className="w-px h-4 bg-[color:var(--border)] mx-2 hidden sm:block"></div>
                    <button className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-md text-[13px] font-medium text-[color:var(--muted-foreground)] hover:text-[color:var(--foreground)] border border-transparent hover:border-[color:var(--border)] transition-colors">
                        <Filter className="w-3.5 h-3.5" />
                        Filter
                    </button>
                </div>

                <button className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-md text-[13px] font-medium border border-[color:var(--border)] bg-[color:var(--card)] hover:bg-[color:var(--accent)] transition-colors">
                    <Filter className="w-3.5 h-3.5" />
                    Saved filters
                    <ChevronDown className="w-3.5 h-3.5 ml-1 opacity-50" />
                </button>
            </div>

            {loading ? (
                <div className="flex items-center justify-center min-h-[400px] border border-[color:var(--border)] rounded-xl bg-[color:var(--card)]/50">
                    <div className="w-5 h-5 border-2 border-[color:var(--muted-foreground)] border-t-transparent rounded-full animate-spin"></div>
                </div>
            ) : (
                <BookingTable bookings={bookings} activeTab={activeTab} onDelete={handleDelete} />
            )}
        </div>
    );
}
