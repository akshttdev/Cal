"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { getEvent, getSlots, createBooking } from "@/lib/api";
import { Calendar } from "@/components/booking/calendar";
import { TimeSlots } from "@/components/booking/time-slots";
import { format } from "date-fns";
import { Clock, Calendar as CalendarIcon, Globe, ArrowLeft, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function BookingPage() {
    const params = useParams();
    const router = useRouter();
    const slug = params.slug as string;

    const [event, setEvent] = useState<any>(null);
    const [loadingEvent, setLoadingEvent] = useState(true);

    const [date, setDate] = useState<Date | undefined>(undefined);
    const [slots, setSlots] = useState<string[]>([]);
    const [loadingSlots, setLoadingSlots] = useState(false);
    const [selectedSlot, setSelectedSlot] = useState<string | null>(null);

    const [step, setStep] = useState<"calendar" | "form">("calendar");

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        if (!slug) return;
        getEvent(slug)
            .then(setEvent)
            .catch(console.error)
            .finally(() => setLoadingEvent(false));
    }, [slug]);

    useEffect(() => {
        async function loadSlots() {
            if (!date || !slug) return;
            setLoadingSlots(true);
            setSelectedSlot(null);
            try {
                const dateStr = format(date, "yyyy-MM-dd");
                const s = await getSlots(slug, dateStr);
                setSlots(s);
            } catch (err) {
                console.error("Failed to load slots");
            } finally {
                setLoadingSlots(false);
            }
        }
        loadSlots();
    }, [date, slug]);

    async function book(e: React.FormEvent) {
        e.preventDefault();
        if (!selectedSlot || !event) return;

        setSubmitting(true);
        try {
            const start = new Date(selectedSlot);
            const end = new Date(start.getTime() + event.duration * 60000);

            await createBooking({
                eventTypeId: event.id,
                attendeeName: name,
                attendeeEmail: email,
                startTime: start.toISOString(),
                endTime: end.toISOString(),
            });

            router.push(`/confirmation?slug=${slug}&date=${start.toISOString()}&name=${encodeURIComponent(name)}`);
        } catch (err) {
            alert("Booking failed. Please try again.");
            setSubmitting(false);
        }
    }

    if (loadingEvent) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[color:var(--secondary)]/30">
                <Loader2 className="w-8 h-8 animate-spin text-[color:var(--primary)]" />
            </div>
        );
    }

    if (!event) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[color:var(--secondary)]/30">
                <div className="text-center">
                    <h1 className="text-2xl font-bold">Event Not Found</h1>
                    <p className="text-[color:var(--muted-foreground)] mt-2">The link you followed may be invalid.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[color:var(--background)] sm:bg-[color:var(--secondary)]/30 py-12 px-4 flex items-center justify-center font-sans relative">
            <div className="max-w-4xl w-full bg-[color:var(--card)] rounded-3xl sm:shadow-2xl sm:border border-[color:var(--border)] overflow-hidden flex flex-col md:flex-row min-h-[500px] animate-in zoom-in-95 duration-500">

                {/* Left Side: Event Details */}
                <div className="w-full md:w-[360px] p-8 border-b md:border-b-0 md:border-r border-[color:var(--border)] bg-[color:var(--card)] z-10">
                    {step === "form" && (
                        <button
                            onClick={() => setStep("calendar")}
                            className="mb-8 w-10 h-10 rounded-full border border-[color:var(--border)] flex items-center justify-center hover:bg-[color:var(--secondary)] transition-colors text-[color:var(--muted-foreground)] hover:text-[color:var(--foreground)]"
                        >
                            <ArrowLeft className="w-5 h-5" />
                        </button>
                    )}

                    <div className="space-y-6">
                        <div>
                            <div className="w-12 h-12 bg-[color:var(--primary)] rounded-xl flex items-center justify-center mb-6 shadow-md">
                                <span className="text-[color:var(--primary-foreground)] text-xl font-bold leading-none">C</span>
                            </div>
                            <p className="text-[color:var(--muted-foreground)] text-sm font-medium mb-1">Cal Host</p>
                            <h1 className="text-2xl font-bold leading-tight">{event.title}</h1>
                        </div>

                        <div className="space-y-4 text-[color:var(--muted-foreground)] font-medium text-sm">
                            <div className="flex items-center gap-3">
                                <Clock className="w-5 h-5 text-[color:var(--foreground)]" />
                                <span>{event.duration} min</span>
                            </div>

                            {selectedSlot && step === "form" && (
                                <div className="flex items-start gap-3 text-[color:var(--primary)] bg-[color:var(--primary)]/5 p-3 rounded-xl border border-[color:var(--primary)]/10 animate-in fade-in slide-in-from-left-4">
                                    <CalendarIcon className="w-5 h-5 mt-0.5 shrink-0" />
                                    <div className="space-y-0.5">
                                        <p className="font-semibold">{format(new Date(selectedSlot), "h:mm a, EEEE")}</p>
                                        <p>{format(new Date(selectedSlot), "MMMM d, yyyy")}</p>
                                    </div>
                                </div>
                            )}

                            <div className="flex items-center gap-3">
                                <Globe className="w-5 h-5 text-[color:var(--foreground)]" />
                                <span>Web conferencing details provided upon confirmation.</span>
                            </div>
                        </div>

                        {event.description && (
                            <div className="pt-4 border-t border-[color:var(--border)]">
                                <p className="text-[color:var(--foreground)] text-sm leading-relaxed whitespace-pre-wrap">
                                    {event.description}
                                </p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Right Side: Interactive Area */}
                <div className="flex-1 bg-[color:var(--background)] p-8 relative">
                    {step === "calendar" ? (
                        <div className="h-full flex flex-col md:flex-row gap-8 animate-in fade-in slide-in-from-right-8 duration-500">
                            <div className="flex-1">
                                <h2 className="text-lg font-semibold mb-6">Select a Date & Time</h2>
                                <Calendar
                                    selectedDate={date}
                                    onSelect={(d) => setDate(d)}
                                />
                            </div>

                            {date && (
                                <div className="w-full md:w-56 animate-in slide-in-from-right-8 fade-in">
                                    {loadingSlots ? (
                                        <div className="flex items-center justify-center h-full min-h-[200px]">
                                            <Loader2 className="w-6 h-6 animate-spin text-[color:var(--muted-foreground)]" />
                                        </div>
                                    ) : (
                                        <TimeSlots
                                            slots={slots}
                                            selectedSlot={selectedSlot}
                                            onSelect={setSelectedSlot}
                                            onConfirm={() => setStep("form")}
                                            date={date}
                                        />
                                    )}
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className="h-full max-w-md animate-in slide-in-from-right-8 fade-in duration-500">
                            <h2 className="text-xl font-bold mb-6">Enter Details</h2>

                            <form onSubmit={book} className="space-y-5">
                                <div className="space-y-1.5">
                                    <label className="text-sm font-semibold">Name <span className="text-red-500">*</span></label>
                                    <Input
                                        required
                                        placeholder="Your Name"
                                        value={name}
                                        onChange={e => setName(e.target.value)}
                                        className="h-11"
                                    />
                                </div>

                                <div className="space-y-1.5">
                                    <label className="text-sm font-semibold">Email <span className="text-red-500">*</span></label>
                                    <Input
                                        required
                                        type="email"
                                        placeholder="you@example.com"
                                        value={email}
                                        onChange={e => setEmail(e.target.value)}
                                        className="h-11"
                                    />
                                </div>

                                <div className="space-y-1.5 pb-4">
                                    <label className="text-sm font-semibold">Additional notes</label>
                                    <textarea
                                        className="flex min-h-[100px] w-full rounded-md border border-[color:var(--input)] bg-[color:var(--background)] px-3 py-2 text-sm ring-offset-[color:var(--background)] placeholder:text-[color:var(--muted-foreground)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--ring)] focus-visible:ring-offset-2"
                                        placeholder="Please share anything that will help prepare for our meeting."
                                    />
                                </div>

                                <div className="pt-2">
                                    <Button
                                        type="submit"
                                        className="w-full h-12 text-base rounded-xl font-semibold"
                                        disabled={submitting}
                                    >
                                        {submitting ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Scheduling...</> : "Schedule Event"}
                                    </Button>
                                </div>
                            </form>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}