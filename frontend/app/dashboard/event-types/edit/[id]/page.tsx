"use client";

import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";

interface AvailabilityDay {
    dayOfWeek: number;
    startTime: string;
    endTime: string;
    isActive: boolean;
}

const DAYS = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
];

const DEFAULT_AVAILABILITY: AvailabilityDay[] = [
    { dayOfWeek: 0, startTime: "", endTime: "", isActive: false },
    { dayOfWeek: 1, startTime: "", endTime: "", isActive: true },
    { dayOfWeek: 2, startTime: "", endTime: "", isActive: true },
    { dayOfWeek: 3, startTime: "", endTime: "", isActive: true },
    { dayOfWeek: 4, startTime: "", endTime: "", isActive: true },
    { dayOfWeek: 5, startTime: "", endTime: "", isActive: true },
    { dayOfWeek: 6, startTime: "", endTime: "", isActive: false },
];

export default function EditAvailabilityPage() {
    const [availability, setAvailability] =
        useState<AvailabilityDay[]>(DEFAULT_AVAILABILITY);

    useEffect(() => {
        async function loadAvailability() {
            try {
                const res = await fetch("http://localhost:4000/api/availability");
                const data = await res.json();

                const merged = DEFAULT_AVAILABILITY.map((day) => {
                    const apiDay = data.find(
                        (d: AvailabilityDay) => d.dayOfWeek === day.dayOfWeek
                    );

                    if (!apiDay) return day;

                    return {
                        dayOfWeek: apiDay.dayOfWeek,
                        startTime: apiDay.startTime ?? "",
                        endTime: apiDay.endTime ?? "",
                        isActive: apiDay.isActive ?? false,
                    };
                });

                setAvailability(merged);
            } catch (err) {
                console.error("Failed to load availability", err);
            }
        }

        loadAvailability();
    }, []);

    function updateStartTime(index: number, value: string) {
        setAvailability((prev) =>
            prev.map((day, i) =>
                i === index ? { ...day, startTime: value } : day
            )
        );
    }

    function updateEndTime(index: number, value: string) {
        setAvailability((prev) =>
            prev.map((day, i) =>
                i === index ? { ...day, endTime: value } : day
            )
        );
    }

    function toggleActive(index: number) {
        setAvailability((prev) =>
            prev.map((day, i) =>
                i === index ? { ...day, isActive: !day.isActive } : day
            )
        );
    }

    return (
        <div className="max-w-xl mx-auto p-6 space-y-6">
            <h1 className="text-2xl font-bold">Edit Availability</h1>

            {availability.map((day, index) => (
                <div
                    key={day.dayOfWeek}
                    className="flex items-center gap-4 border p-4 rounded-lg"
                >
                    <div className="w-28 font-medium">{DAYS[day.dayOfWeek]}</div>

                    <input
                        type="checkbox"
                        checked={day.isActive}
                        onChange={() => toggleActive(index)}
                    />

                    <Input
                        type="time"
                        value={day.startTime}
                        onChange={(e) => updateStartTime(index, e.target.value)}
                        disabled={!day.isActive}
                    />

                    <Input
                        type="time"
                        value={day.endTime}
                        onChange={(e) => updateEndTime(index, e.target.value)}
                        disabled={!day.isActive}
                    />
                </div>
            ))}
        </div>
    );
}