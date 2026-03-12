"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createEventType } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function CreateEventTypePage() {
    const router = useRouter();
    const [title, setTitle] = useState("");
    const [slug, setSlug] = useState("");
    const [duration, setDuration] = useState("30");
    const [description, setDescription] = useState("");
    const [submitting, setSubmitting] = useState(false);

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setSubmitting(true);

        try {
            await createEventType({
                title,
                slug,
                duration: parseInt(duration),
                description,
            });
            router.push("/dashboard/event-types");
            router.refresh();
        } catch (err) {
            console.error(err);
            alert("Failed to create event type. Please ensure the slug is unique.");
        } finally {
            setSubmitting(false);
        }
    }

    return (
        <div className="p-8 max-w-2xl mx-auto w-full">
            <div className="flex items-center gap-4 mb-8">
                <Link
                    href="/dashboard/event-types"
                    className="w-10 h-10 rounded-full border border-[color:var(--border)] flex items-center justify-center hover:bg-[color:var(--secondary)] transition-colors text-[color:var(--muted-foreground)] hover:text-[color:var(--foreground)]"
                >
                    <ArrowLeft className="w-5 h-5" />
                </Link>
                <div>
                    <h1 className="text-3xl font-bold">New Event Type</h1>
                    <p className="text-[color:var(--muted-foreground)]">Create a new type of event for people to book.</p>
                </div>
            </div>

            <div className="bg-[color:var(--card)] border border-[color:var(--border)] rounded-2xl p-6 shadow-sm">
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                        <label className="text-sm font-semibold">Event Title <span className="text-red-500">*</span></label>
                        <Input
                            required
                            placeholder="e.g. 30 Min Discovery Call"
                            value={title}
                            onChange={(e) => {
                                setTitle(e.target.value);
                                // Auto-generate slug from title if slug hasn't been manually typed yet
                                if (!slug || slug === title.slice(0, -1).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "")) {
                                    setSlug(e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, ""));
                                }
                            }}
                            className="h-11"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-semibold">URL Slug <span className="text-red-500">*</span></label>
                        <div className="flex">
                            <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-[color:var(--input)] bg-[color:var(--secondary)] text-[color:var(--muted-foreground)] text-sm">
                                cal.com/
                            </span>
                            <Input
                                required
                                placeholder="30-min-discovery-call"
                                value={slug}
                                onChange={(e) => setSlug(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ""))}
                                className="rounded-l-none h-11"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-semibold">Duration (minutes) <span className="text-red-500">*</span></label>
                        <Input
                            required
                            type="number"
                            min="15"
                            max="360"
                            step="15"
                            value={duration}
                            onChange={(e) => setDuration(e.target.value)}
                            className="h-11"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-semibold">Description</label>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="flex min-h-[100px] w-full rounded-md border border-[color:var(--input)] bg-[color:var(--background)] px-3 py-2 text-sm ring-offset-[color:var(--background)] placeholder:text-[color:var(--muted-foreground)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--ring)] focus-visible:ring-offset-2"
                            placeholder="Share some details about this meeting..."
                        />
                    </div>

                    <div className="pt-4 border-t border-[color:var(--border)] flex justify-end gap-3">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => router.push("/dashboard/event-types")}
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            disabled={submitting || !title || !slug || !duration}
                        >
                            {submitting && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                            Create Event Type
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}
