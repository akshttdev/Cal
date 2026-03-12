import { format } from "date-fns";
import { Calendar, Trash2 } from "lucide-react";

interface Booking {
    id: string;
    guestName: string;
    guestEmail: string;
    startTime: string;
    endTime: string;
    status: "CONFIRMED" | "CANCELLED";
    eventType?: {
        title: string;
        duration: number;
    };
}

export function BookingTable({ bookings, activeTab, onDelete }: { bookings: Booking[], activeTab: string, onDelete?: (id: string) => void }) {
    if (bookings.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[400px] border border-[color:var(--border)] rounded-xl bg-[color:var(--card)]/30 w-full px-6 text-center shadow-[inset_0_1px_0_0_rgba(255,255,255,0.03)] overflow-hidden relative">
                <div className="absolute inset-0 bg-gradient-to-b from-[color:var(--card)]/50 to-transparent pointer-events-none"></div>
                <div className="w-16 h-16 rounded-full bg-[color:var(--secondary)] flex items-center justify-center mb-6 relative z-10 border border-[color:var(--border)] shadow-sm">
                    <Calendar className="w-7 h-7 text-[color:var(--muted-foreground)]" />
                </div>
                <h3 className="text-xl font-bold tracking-tight mb-2 relative z-10">No {activeTab} bookings</h3>
                <p className="text-[14px] text-[color:var(--muted-foreground)] max-w-[360px] mx-auto relative z-10 leading-relaxed">
                    You have no {activeTab} bookings. As soon as someone books a time with you it will show up here.
                </p>
            </div>
        );
    }

    return (
        <div className="rounded-xl border border-[color:var(--border)] bg-[color:var(--card)] overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                    <thead className="text-[11px] font-semibold tracking-wider uppercase bg-[color:var(--secondary)]/40 text-[color:var(--muted-foreground)] border-b border-[color:var(--border)]">
                        <tr>
                            <th className="px-6 py-4">Guest</th>
                            <th className="px-6 py-4">Event</th>
                            <th className="px-6 py-4">Date & Time</th>
                            <th className="px-6 py-4">Status</th>
                            <th className="px-6 py-4 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-[color:var(--border)]">
                        {bookings.map((booking) => {
                            const start = new Date(booking.startTime);
                            const end = new Date(booking.endTime);

                            return (
                                <tr key={booking.id} className="hover:bg-[color:var(--accent)]/30 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="font-semibold text-[14px] text-[color:var(--foreground)]">{booking.guestName}</div>
                                        <div className="text-[13px] text-[color:var(--muted-foreground)] mt-0.5">{booking.guestEmail}</div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="font-medium text-[14px]">{booking.eventType?.title || "Unknown Event"}</div>
                                        <div className="text-[13px] text-[color:var(--muted-foreground)] mt-0.5">{booking.eventType?.duration || "? "} mins</div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="font-medium text-[14px]">{format(start, "MMM d, yyyy")}</div>
                                        <div className="text-[13px] text-[color:var(--muted-foreground)] mt-0.5">
                                            {format(start, "h:mm a")} - {format(end, "h:mm a")}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span
                                            className={`inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-medium border
                        ${booking.status === "CONFIRMED"
                                                    ? "bg-green-500/10 text-green-500 border-green-500/20"
                                                    : "bg-red-500/10 text-red-500 border-red-500/20"}`
                                            }
                                        >
                                            {booking.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <button
                                            onClick={() => onDelete?.(booking.id)}
                                            className="p-2 text-[color:var(--muted-foreground)] hover:text-[color:var(--destructive)] hover:bg-[color:var(--destructive)]/10 rounded-md transition-colors"
                                            title="Delete Booking"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
