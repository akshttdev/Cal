"use client";

import { useEffect, useState } from "react";
import { getAvailability } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Copy, Globe, MoreHorizontal, Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

const DAYS_OF_WEEK = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
];

export default function AvailabilityPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [availabilities, setAvailabilities] = useState<any[]>([]);
    const [activeTab, setActiveTab] = useState("my");

    useEffect(() => {
        fetchAvailability();
    }, []);

    async function fetchAvailability() {
        try {
            const data = await getAvailability();
            const mapped = DAYS_OF_WEEK.map((_, index) => {
                const existing = data.find((d: any) => d.dayOfWeek === index);
                if (existing) return existing;
                return {
                    dayOfWeek: index,
                    startTime: "09:30",
                    endTime: "17:00",
                    isActive: index > 0 && index < 6, // Mon-Fri default
                };
            });
            setAvailabilities(mapped);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    }

    // derive a quick summary string like "Mon - Fri, 9:30 AM - 5:00 PM"
    const activeDays = availabilities.filter(d => d.isActive);
    let summaryText = "Custom hours";
    if (activeDays.length === 5 && activeDays.every(d => d.dayOfWeek >= 1 && d.dayOfWeek <= 5)) {
        summaryText = `Mon - Fri, ${activeDays[0]?.startTime} - ${activeDays[0]?.endTime}`;
    } else if (activeDays.length === 0) {
        summaryText = "No active hours";
    }

    // Attempt to guess local timezone for display
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;

    return (
        <div className="space-y-6 animate-in mt-2 fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-[color:var(--border)] pb-8">
                <div>
                    <h1 className="text-[20px] font-bold tracking-tight">Availability</h1>
                    <p className="text-[14px] text-[color:var(--muted-foreground)] mt-1 tracking-tight">Configure times when you are available for bookings.</p>
                </div>
                <div className="flex items-center gap-4 mt-4 md:mt-0">
                    <div className="flex items-center p-1 bg-[color:var(--card)] border border-[color:var(--border)] rounded-md">
                        <button
                            onClick={() => setActiveTab("my")}
                            className={cn(
                                "px-3 py-1.5 rounded-md text-[13px] font-medium transition-colors",
                                activeTab === "my" ? "bg-[color:var(--accent)] text-[color:var(--foreground)]" : "text-[color:var(--muted-foreground)] hover:text-[color:var(--foreground)]"
                            )}
                        >
                            My availability
                        </button>
                        <button
                            onClick={() => setActiveTab("team")}
                            className={cn(
                                "px-3 py-1.5 rounded-md text-[13px] font-medium transition-colors",
                                activeTab === "team" ? "bg-[color:var(--accent)] text-[color:var(--foreground)]" : "text-[color:var(--muted-foreground)] hover:text-[color:var(--foreground)]"
                            )}
                        >
                            Team availability
                        </button>
                    </div>
                    <Button onClick={() => router.push("/dashboard/availability/edit")} className="h-9 px-4 bg-white text-black hover:bg-gray-200 rounded-md font-semibold text-sm">
                        <Plus className="w-4 h-4 mr-1.5 stroke-[3]" />
                        New
                    </Button>
                </div>
            </div>

            {loading ? (
                <div className="flex items-center justify-center min-h-[400px] border border-[color:var(--border)] rounded-xl bg-[color:var(--card)]/50">
                    <div className="w-5 h-5 border-2 border-[color:var(--muted-foreground)] border-t-transparent rounded-full animate-spin"></div>
                </div>
            ) : (
                <div className="flex flex-col gap-6">
                    <div
                        className="group flex flex-col justify-between p-5 bg-[color:var(--card)] border border-[color:var(--border)] rounded-xl hover:bg-[color:var(--accent)]/30 transition-colors cursor-pointer relative shadow-sm"
                        onClick={() => router.push("/dashboard/availability/edit")}
                    >
                        <div className="flex items-start justify-between mb-4">
                            <div className="flex items-center gap-2.5">
                                <h3 className="text-[15px] font-bold tracking-tight">Working Hours</h3>
                                <span className="px-1.5 py-0.5 rounded text-[11px] font-medium bg-[color:var(--secondary)] text-[color:var(--muted-foreground)] border border-[color:var(--border)] uppercase tracking-wider">Default</span>
                            </div>
                            <div className="flex items-center gap-1">
                                <button className="p-2 bg-transparent rounded-md hover:bg-[color:var(--accent)] text-[color:var(--foreground)] transition-colors" onClick={(e) => { e.stopPropagation(); }}>
                                    <Copy className="w-4 h-4" />
                                </button>
                                <button className="p-2 bg-transparent rounded-md hover:bg-[color:var(--accent)] text-[color:var(--foreground)] transition-colors" onClick={(e) => { e.stopPropagation(); }}>
                                    <MoreHorizontal className="w-4 h-4" />
                                </button>
                            </div>
                        </div>

                        <div className="space-y-3">
                            <p className="text-[14px] text-[color:var(--foreground)] font-medium">
                                {summaryText}
                            </p>
                            <div className="flex items-center gap-1.5 text-[13px] text-[color:var(--muted-foreground)]">
                                <Globe className="w-3.5 h-3.5" />
                                {tz}
                            </div>
                        </div>
                    </div>

                    <div className="text-center pt-8 pb-4">
                        <p className="text-[14px] text-[color:var(--muted-foreground)]">
                            Temporarily out-of-office? <a href="#" className="text-[color:var(--foreground)] underline underline-offset-4 font-medium hover:text-[color:var(--primary)] transition-colors">Add a redirect</a>
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
}
