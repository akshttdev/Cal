"use client";

import { useEffect, useState } from "react";
import { Plus, Search, Link as LinkIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Modal } from "@/components/ui/modal";
import { EventTypeCard } from "@/components/dashboard/event-type-card";
import { getEventTypes, createEventType, deleteEventType, updateEventType } from "@/lib/api";

export default function EventTypesPage() {
    const [eventTypes, setEventTypes] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState({ title: "", description: "", duration: 30, slug: "" });
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        fetchEventTypes();
    }, []);

    async function fetchEventTypes() {
        try {
            const data = await getEventTypes();
            setEventTypes(data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    }

    async function handleDelete(id: string) {
        try {
            await deleteEventType(id);
            setEventTypes(eventTypes.filter(et => et.id !== id));
        } catch (err) {
            alert("Failed to delete event type");
        }
    }

    async function handleToggle(id: string, currentIsActive: boolean) {
        const newIsActive = !currentIsActive;
        // Optimistic update
        setEventTypes(eventTypes.map(et => et.id === id ? { ...et, isActive: newIsActive } : et));
        try {
            await updateEventType(id, { isActive: newIsActive });
        } catch (err) {
            alert("Failed to update event type status");
            // Revert
            setEventTypes(eventTypes.map(et => et.id === id ? { ...et, isActive: currentIsActive } : et));
        }
    }

    async function handleCreate(e: React.FormEvent) {
        e.preventDefault();
        setSubmitting(true);
        try {
            const newEt = await createEventType({
                ...formData,
                duration: Number(formData.duration)
            });
            setEventTypes([...eventTypes, newEt]);
            setIsModalOpen(false);
            setFormData({ title: "", description: "", duration: 30, slug: "" });
        } catch (err) {
            alert("Failed to create event type");
        } finally {
            setSubmitting(false);
        }
    }

    const normalizedQuery = searchQuery.trim().toLowerCase();
    const filteredEventTypes = eventTypes.filter((et) => {
        if (!normalizedQuery) return true;
        const combined = `${et.title} ${et.description ?? ""} ${et.slug}`.toLowerCase();
        return combined.includes(normalizedQuery);
    });

    return (
        <div className="space-y-8 animate-in mt-2 fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-[color:var(--border)] pb-8">
                <div>
                    <h1 className="text-[20px] font-bold tracking-tight">Event types</h1>
                    <p className="text-[14px] text-[color:var(--muted-foreground)] mt-1 tracking-tight">Configure different events for people to book on your calendar.</p>
                </div>
                <div className="flex items-center gap-3 mt-4 md:mt-0">
                    <div className="relative">
                        <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[color:var(--muted-foreground)]" />
                        <Input
                            className="pl-9 bg-transparent border-[color:var(--border)] h-9 text-sm w-full md:w-[180px] rounded-md transition-all focus:w-[220px]"
                            placeholder="Search"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                    <Button onClick={() => setIsModalOpen(true)} className="h-9 px-4 bg-white text-black hover:bg-gray-200 rounded-md font-semibold text-sm">
                        <Plus className="w-4 h-4 mr-1.5 stroke-[3]" />
                        New
                    </Button>
                </div>
            </div>

            {loading ? (
                <div className="text-center p-12 text-[color:var(--muted-foreground)] border border-dashed rounded-xl">
                    Loading event types...
                </div>
            ) : eventTypes.length === 0 ? (
                <div className="text-center p-12 border border-dashed border-[color:var(--border)] rounded-xl bg-[color:var(--card)]">
                    <h3 className="text-lg font-medium mb-2">No event types yet</h3>
                    <p className="text-[color:var(--muted-foreground)] mb-6 max-w-sm mx-auto">
                        Create your first event type to start allowing people to book time with you.
                    </p>
                    <Button onClick={() => setIsModalOpen(true)} className="bg-white text-black hover:bg-gray-200">Create your first event type</Button>
                </div>
            ) : filteredEventTypes.length === 0 ? (
                <div className="flex flex-col items-center justify-center min-h-[400px] border border-[color:var(--border)] rounded-xl bg-[color:var(--card)]/30 w-full px-6 text-center shadow-[inset_0_1px_0_0_rgba(255,255,255,0.03)] overflow-hidden relative">
                    <div className="w-14 h-14 rounded-full bg-[color:var(--accent)] flex items-center justify-center mb-6">
                        <LinkIcon className="w-6 h-6 text-[color:var(--muted-foreground)]" />
                    </div>
                    <h3 className="text-[18px] font-bold tracking-tight mb-2">No result found for "{searchQuery}"</h3>
                    <p className="text-[14px] text-[color:var(--muted-foreground)] max-w-md mx-auto mb-6">
                        Event types enable you to share links that show available times on your calendar and allow people to make bookings with you.
                    </p>
                    <Button onClick={() => setIsModalOpen(true)} className="h-9 px-4 bg-white text-black hover:bg-gray-200 rounded-md font-semibold text-sm">
                        Create
                    </Button>
                </div>
            ) : (
                <div className="flex flex-col w-full shadow-sm rounded-xl">
                    {filteredEventTypes.map((et) => (
                        <EventTypeCard
                            key={et.id}
                            id={et.id}
                            title={et.title}
                            description={et.description}
                            duration={et.duration}
                            slug={et.slug}
                            isActive={et.isActive}
                            onDelete={handleDelete}
                            onToggle={handleToggle}
                        />
                    ))}
                </div>
            )}

            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title="Create Event Type"
                description="Add a new event type for people to book calendar slots with you."
            >
                <form onSubmit={handleCreate} className="space-y-4">
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Title</label>
                        <Input
                            required
                            placeholder="e.g. 30 Min Meeting"
                            value={formData.title}
                            onChange={e => {
                                const title = e.target.value;
                                setFormData({
                                    ...formData,
                                    title,
                                    slug: title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '')
                                })
                            }}
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium">URL Slug</label>
                        <div className="flex items-center gap-2">
                            <span className="text-[color:var(--muted-foreground)] text-sm">/book/</span>
                            <Input
                                required
                                placeholder="30-min-meeting"
                                value={formData.slug}
                                onChange={e => setFormData({ ...formData, slug: e.target.value })}
                            />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Duration (minutes)</label>
                        <Input
                            required
                            type="number"
                            min={5}
                            step={5}
                            value={formData.duration}
                            onChange={e => setFormData({ ...formData, duration: Number(e.target.value) })}
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Description</label>
                        <textarea
                            className="flex min-h-[80px] w-full rounded-md border border-[color:var(--input)] bg-[color:var(--background)] px-3 py-2 text-sm ring-offset-[color:var(--background)] placeholder:text-[color:var(--muted-foreground)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--ring)] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            placeholder="A brief description of this event type..."
                            value={formData.description}
                            onChange={e => setFormData({ ...formData, description: e.target.value })}
                        />
                    </div>
                    <div className="pt-4 flex justify-end gap-3">
                        <Button type="button" variant="outline" onClick={() => setIsModalOpen(false)}>Cancel</Button>
                        <Button type="submit" disabled={submitting} className="bg-white text-black hover:bg-gray-200">
                            {submitting ? "Creating..." : "Create Event Type"}
                        </Button>
                    </div>
                </form>
            </Modal>
        </div>
    );
}
