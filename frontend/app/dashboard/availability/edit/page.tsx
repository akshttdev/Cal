"use client";

import { useEffect, useState } from "react";
import { getAvailability, updateAvailability, updateTimezone } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Copy, Plus, Trash } from "lucide-react";
import Link from "next/link";
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

const ALL_TIMEZONES = Intl.supportedValuesOf('timeZone');

export default function EditAvailabilityPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [availabilities, setAvailabilities] = useState<any[]>([]);
    const [timezone, setTimezone] = useState(Intl.DateTimeFormat().resolvedOptions().timeZone);

    useEffect(() => {
        fetchAvailability();
    }, []);

    async function fetchAvailability() {
        try {
            const [data, userRes] = await Promise.all([
                getAvailability(),
                fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api"}/user`).then(r => r.ok ? r.json() : null).catch(() => null),
            ]);
            if (userRes?.timezone) setTimezone(userRes.timezone);
            const mapped = DAYS_OF_WEEK.map((_, index) => {
                const existing = data.find((d: any) => d.dayOfWeek === index);
                if (existing) return existing;
                return {
                    dayOfWeek: index,
                    startTime: "09:00",
                    endTime: "17:00",
                    isActive: index > 0 && index < 6,
                };
            });
            setAvailabilities(mapped);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    }

    async function handleSave() {
        setSaving(true);
        try {
            await updateAvailability(availabilities);
            // Save timezone separately — failure here doesn't block availability save
            updateTimezone(timezone).catch(console.error);
            router.push("/dashboard/availability");
        } catch (err) {
            alert("Failed to update availability");
        } finally {
            setSaving(false);
        }
    }

    function handleUpdateDay(index: number, field: string, value: any) {
        setAvailabilities(prev => {
            const newArr = [...prev];
            newArr[index] = { ...newArr[index], [field]: value };
            return newArr;
        });
    }



    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="w-5 h-5 border-2 border-[color:var(--muted-foreground)] border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    return (
        <div className="space-y-6 animate-in mt-2 fade-in slide-in-from-bottom-4 duration-500">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-[color:var(--border)] pb-6 gap-4 sm:gap-0">
                <div className="flex items-center gap-4">
                    <Link href="/dashboard/availability" className="p-2 hover:bg-[color:var(--accent)] rounded-md transition-colors text-[color:var(--muted-foreground)] hover:text-[color:var(--foreground)]">
                        <ArrowLeft className="w-5 h-5" />
                    </Link>
                    <div>
                        <div className="flex items-center gap-2">
                            <h1 className="text-[20px] font-bold tracking-tight">Working Hours</h1>
                            <button className="text-[color:var(--muted-foreground)] hover:text-[color:var(--foreground)] transition-colors">
                            </button>
                        </div>
                        <p className="text-[14px] text-[color:var(--muted-foreground)] mt-0.5 tracking-tight">Mon - Fri, 9:30 AM - 5:00 PM</p>
                    </div>
                </div>

                <div className="flex items-center gap-4 self-end sm:self-auto">
                    <div className="flex items-center gap-2 hidden sm:flex">
                        <span className="text-sm font-medium">Set as default</span>
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" className="sr-only peer" defaultChecked />
                            <div className="w-9 h-5 bg-[color:var(--muted-foreground)]/30 rounded-full peer peer-checked:bg-[color:var(--foreground)] peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-[color:var(--background)] after:rounded-full after:h-4 after:w-4 after:transition-all"></div>
                        </label>
                    </div>
                    <div className="w-px h-5 bg-[color:var(--border)] hidden sm:block"></div>
                    <div className="flex items-center gap-2">
                        <Button variant="outline" size="icon" className="w-9 h-9 border-[color:var(--border)] text-[color:var(--destructive)] hover:bg-[color:var(--destructive)]/10 hover:text-[color:var(--destructive)]">
                            <Trash className="w-4 h-4" />
                        </Button>
                        <div className="w-px h-5 bg-[color:var(--border)] hidden sm:block"></div>
                        <Button onClick={handleSave} disabled={saving} className="h-9 px-4 bg-white text-black hover:bg-gray-200 rounded-md font-semibold text-sm">
                            {saving ? "Saving..." : "Save"}
                        </Button>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex flex-col lg:flex-row gap-8 items-start">
                <div className="flex-1 space-y-6 w-full">
                    <div className="bg-[color:var(--card)] border border-[color:var(--border)] rounded-xl divide-y divide-[color:var(--border)] overflow-hidden shadow-sm">
                        {availabilities.map((day, index) => (
                            <div key={index} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 sm:p-5 hover:bg-[color:var(--accent)]/30 transition-colors gap-3 sm:gap-0">
                                <div className="flex items-center gap-3 sm:w-[150px] sm:min-w-[150px]">
                                    <label className="relative inline-flex items-center cursor-pointer">
                                        <input
                                            type="checkbox"
                                            className="sr-only peer"
                                            checked={day.isActive}
                                            onChange={(e) => handleUpdateDay(index, "isActive", e.target.checked)}
                                        />
                                        <div className="w-11 h-6 bg-[color:var(--muted-foreground)]/30 rounded-full peer peer-checked:bg-[color:var(--foreground)] peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-[color:var(--background)] after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
                                    </label>
                                    <span className={`text-[14px] font-medium ${!day.isActive && "text-[color:var(--muted-foreground)]"}`}>
                                        {DAYS_OF_WEEK[day.dayOfWeek]}
                                    </span>
                                </div>

                                {day.isActive ? (
                                    <div className="flex flex-wrap sm:flex-nowrap items-center gap-2 sm:gap-3 flex-1 sm:justify-start">
                                        <Input
                                            type="time"
                                            value={day.startTime.substring(0, 5)}
                                            onChange={(e) => handleUpdateDay(index, "startTime", e.target.value)}
                                            className="w-[100px] sm:w-[110px] h-9 text-[13px] sm:text-[14px] font-medium px-2 sm:px-3 bg-transparent border-[color:var(--border)] focus-visible:ring-1"
                                        />
                                        <span className="text-[color:var(--muted-foreground)]">-</span>
                                        <Input
                                            type="time"
                                            value={day.endTime.substring(0, 5)}
                                            onChange={(e) => handleUpdateDay(index, "endTime", e.target.value)}
                                            className="w-[100px] sm:w-[110px] h-9 text-[13px] sm:text-[14px] font-medium px-2 sm:px-3 bg-transparent border-[color:var(--border)] focus-visible:ring-1"
                                        />
                                        <div className="flex items-center gap-1 sm:ml-2">
                                            <button className="p-2 bg-transparent rounded-md hover:bg-[color:var(--accent)] text-[color:var(--muted-foreground)] hover:text-[color:var(--foreground)] transition-colors">
                                                <Plus className="w-4 h-4" />
                                            </button>
                                            <button className="p-2 bg-transparent rounded-md hover:bg-[color:var(--accent)] text-[color:var(--muted-foreground)] hover:text-[color:var(--foreground)] transition-colors">
                                                <Copy className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="flex flex-wrap sm:flex-nowrap items-center gap-2 sm:gap-3 flex-1 invisible pointer-events-none">
                                        <Input type="time" className="w-[100px] sm:w-[110px] h-9" />
                                        <span>-</span>
                                        <Input type="time" className="w-[100px] sm:w-[110px] h-9" />
                                        <div className="flex items-center gap-1 sm:ml-2">
                                            <button className="p-2"><Plus className="w-4 h-4" /></button>
                                            <button className="p-2"><Copy className="w-4 h-4" /></button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>

                    <div className="bg-[color:var(--card)] border border-[color:var(--border)] rounded-xl p-5 shadow-sm space-y-4">
                        <div className="flex items-center gap-2">
                            <h4 className="font-semibold text-[14px]">Date overrides</h4>
                            <div className="w-4 h-4 rounded-full border border-[color:var(--muted-foreground)] flex items-center justify-center text-[10px] text-[color:var(--muted-foreground)] cursor-help">i</div>
                        </div>
                        <p className="text-[13px] text-[color:var(--muted-foreground)] mb-2">
                            Add dates when your availability changes from your daily hours.
                        </p>
                        <Button variant="outline" className="w-auto h-9 text-[13px] bg-transparent border-[color:var(--border)] text-[color:var(--foreground)] rounded-full px-4">
                            + Add an override
                        </Button>
                    </div>
                </div>

                {/* Sidebar */}
                <div className="w-full lg:w-[300px] flex flex-col gap-6">
                    <div className="space-y-1.5 relative">
                        <label className="text-sm font-semibold">Timezone</label>
                        <div className="relative">
                            <select
                                className="flex h-11 w-full rounded-md border border-[color:var(--input)] bg-[color:var(--background)] px-3 py-2 text-sm text-left ring-offset-[color:var(--background)] placeholder:text-[color:var(--muted-foreground)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--ring)] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 appearance-none pr-10"
                                value={timezone}
                                onChange={(e) => setTimezone(e.target.value)}
                            >
                                {ALL_TIMEZONES.map(z => <option key={z} value={z}>{z}</option>)}
                            </select>
                            <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[color:var(--muted-foreground)]">
                                    <polyline points="6 9 12 15 18 9"></polyline>
                                </svg>
                            </div>
                        </div>
                    </div>

                    <div className="bg-[color:var(--card)] border border-[color:var(--border)] rounded-xl p-5 shadow-sm space-y-3">
                        <h4 className="font-semibold text-[14px]">Something doesn't look right?</h4>
                        <Button variant="outline" className="w-full justify-start h-9 text-[13px] bg-transparent border-[color:var(--border)] text-[color:var(--foreground)]">
                            Launch troubleshooter
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
