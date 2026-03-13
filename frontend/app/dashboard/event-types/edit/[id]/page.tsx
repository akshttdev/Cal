"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Link2, Copy, Code, Trash, ExternalLink, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { getEventTypeById, updateEventType, deleteEventType } from "@/lib/api";

export default function EditEventTypePage() {
    const params = useParams();
    const router = useRouter();
    const id = params.id as string;

    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);

    const [formData, setFormData] = useState({
        title: "",
        description: "",
        duration: 30,
        slug: "",
        isActive: true
    });

    const bookingUrl = typeof window !== 'undefined' ? `${window.location.origin}/book/${formData.slug}` : '';

    useEffect(() => {
        async function fetchEventType() {
            try {
                const data = await getEventTypeById(id);
                setFormData({
                    title: data.title,
                    description: data.description ?? "",
                    duration: data.duration,
                    slug: data.slug,
                    isActive: data.isActive
                });
            } catch (err) {
                console.error("Failed to fetch event type", err);
                alert("Failed to load event type.");
                router.push('/dashboard/event-types');
            } finally {
                setLoading(false);
            }
        }
        if (id) {
            fetchEventType();
        }
    }, [id, router]);

    async function handleSave() {
        setSubmitting(true);
        try {
            await updateEventType(id, {
                ...formData,
                duration: Number(formData.duration)
            });
            alert("Saved successfully");
            router.push("/dashboard/event-types");
        } catch (err) {
            console.error(err);
            alert("Failed to save event type");
        } finally {
            setSubmitting(false);
        }
    }

    async function handleDelete() {
        if (!confirm("Are you sure you want to delete this event type?")) return;
        try {
            await deleteEventType(id);
            router.push("/dashboard/event-types");
        } catch (err) {
            console.error(err);
            alert("Failed to delete event type");
        }
    }

    const copyLink = () => {
        navigator.clipboard.writeText(bookingUrl);
        alert("Link copied!");
    };

    if (loading) {
        return <div className="p-8 text-center text-muted-foreground">Loading...</div>;
    }

    return (
        <div className="flex-1 w-full bg-[color:var(--background)] animate-in fade-in duration-500 min-h-screen">
            {/* Top Navigation Bar */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-[color:var(--border)] bg-[color:var(--card)]">
                <div className="flex items-center gap-4">
                    <Link href="/dashboard/event-types" className="p-2 hover:bg-[color:var(--accent)] rounded-md transition-colors text-[color:var(--muted-foreground)] hover:text-[color:var(--foreground)]">
                        <ArrowLeft className="w-5 h-5" />
                    </Link>
                    <h1 className="text-lg font-semibold">{formData.title}</h1>
                </div>

                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                        <button
                            type="button"
                            className="relative inline-flex items-center cursor-pointer focus:outline-none"
                            onClick={() => setFormData({ ...formData, isActive: !formData.isActive })}
                        >
                            <span className={`w-11 h-6 rounded-full transition-colors ${formData.isActive ? "bg-white" : "bg-[color:var(--muted-foreground)]/30"}`}>
                                <span className={`absolute top-[2px] left-[2px] h-5 w-5 rounded-full transition-transform ${formData.isActive ? "translate-x-[20px] bg-black" : "bg-white"}`} />
                            </span>
                        </button>
                    </div>
                    <div className="w-px h-6 bg-[color:var(--border)]" />
                    <div className="flex items-center">
                        <a href={bookingUrl} target="_blank" rel="noopener noreferrer" className="p-2 border border-[color:var(--border)] bg-transparent rounded-l-md hover:bg-[color:var(--accent)] text-[color:var(--foreground)] transition-colors">
                            <ExternalLink className="w-4 h-4" />
                        </a>
                        <button onClick={copyLink} className="p-2 border-y border-[color:var(--border)] bg-transparent hover:bg-[color:var(--accent)] text-[color:var(--foreground)] transition-colors">
                            <Link2 className="w-4 h-4" />
                        </button>
                        <button className="p-2 border border-[color:var(--border)] bg-transparent hover:bg-[color:var(--accent)] text-[color:var(--foreground)] transition-colors">
                            <Code className="w-4 h-4" />
                        </button>
                        <button onClick={handleDelete} className="p-2 border-y border-r border-[color:var(--border)] bg-transparent hover:bg-[color:var(--destructive)]/10 text-[color:var(--muted-foreground)] hover:text-[color:var(--destructive)] rounded-r-md transition-colors">
                            <Trash className="w-4 h-4" />
                        </button>
                    </div>
                    <div className="w-px h-6 bg-[color:var(--border)]" />
                    <Button
                        onClick={handleSave}
                        disabled={submitting}
                        className="bg-white text-black hover:bg-gray-200 font-medium"
                    >
                        {submitting ? "Saving..." : "Save"}
                    </Button>
                </div>
            </div>

            <div className="flex flex-col md:flex-row max-w-7xl mx-auto p-4 md:p-8 gap-8">
                {/* Left Sidebar Menu */}
                <div className="w-full md:w-64 flex-shrink-0 space-y-1">
                    <button className="w-full text-left px-3 py-2 rounded-md bg-[color:var(--accent)] text-[color:var(--foreground)] font-medium flex flex-col group relative">
                        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-black dark:bg-white rounded-r-md"></div>
                        <div className="flex items-center gap-3">
                            <Link2 className="w-4 h-4 text-[color:var(--foreground)]" />
                            <div>
                                <div className="text-sm font-semibold">Basics</div>
                                <div className="text-xs text-[color:var(--muted-foreground)] font-normal">{formData.duration} mins</div>
                            </div>
                        </div>
                    </button>
                    {/* Other mock tabs */}
                    <button className="w-full text-left px-3 py-2 rounded-md hover:bg-[color:var(--accent)] text-[color:var(--foreground)] font-medium flex flex-col transition-colors">
                        <div className="flex items-center gap-3">
                            <div className="w-4 h-4 border border-[color:var(--muted-foreground)] rounded-sm" />
                            <div>
                                <div className="text-sm font-semibold text-[color:var(--muted-foreground)]">Availability</div>
                                <div className="text-xs text-[color:var(--muted-foreground)] font-normal">Working hours</div>
                            </div>
                        </div>
                    </button>
                </div>

                {/* Main Content Area */}
                <div className="flex-1 space-y-6 max-w-3xl">
                    <div className="bg-[color:var(--card)] border border-[color:var(--border)] rounded-xl p-6 space-y-6 shadow-sm">
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Title</label>
                            <Input
                                value={formData.title}
                                onChange={(e) => {
                                    const title = e.target.value;
                                    setFormData({
                                        ...formData,
                                        title,
                                        slug: title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "")
                                    });
                                }}
                                className="bg-[color:var(--background)]"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium">Description</label>
                            <textarea
                                value={formData.description}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                className="flex min-h-[120px] w-full rounded-md border border-[color:var(--input)] bg-[color:var(--background)] px-3 py-2 text-sm ring-offset-[color:var(--background)] placeholder:text-[color:var(--muted-foreground)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--ring)] focus-visible:ring-offset-2 hover:border-[color:var(--ring)] transition-colors resize-y"
                                placeholder="A quick video meeting."
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium">URL</label>
                            <div className="flex items-center">
                                <span className="flex items-center px-3 border border-r-0 border-[color:var(--input)] bg-[color:var(--muted)] text-[color:var(--muted-foreground)] rounded-l-md text-sm h-10">
                                    cal.com/akshtt/
                                </span>
                                <Input
                                    value={formData.slug}
                                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                                    className="rounded-l-none focus-visible:z-10"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="bg-[color:var(--card)] border border-[color:var(--border)] rounded-xl p-6 space-y-6 shadow-sm">
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Duration</label>
                            <div className="relative">
                                <Input
                                    type="number"
                                    value={formData.duration}
                                    onChange={(e) => setFormData({ ...formData, duration: Number(e.target.value) })}
                                    className="pr-20 bg-[color:var(--background)]"
                                />
                                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-[color:var(--muted-foreground)] pointer-events-none">
                                    Minutes
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}