"use client";

import { useEffect, useState } from "react";
import { Plus, Search, Link as LinkIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Modal } from "@/components/ui/modal";
import { EventTypeCard } from "@/components/dashboard/event-type-card";
import {
    getEventTypes,
    createEventType,
    deleteEventType,
    updateEventType
} from "@/lib/api";

export default function EventTypesPage() {
    const [eventTypes, setEventTypes] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    const [searchQuery, setSearchQuery] = useState("");

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);

    const [formData, setFormData] = useState({
        title: "",
        description: "",
        duration: 30,
        slug: ""
    });

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
            setEventTypes(eventTypes.filter((et) => et.id !== id));
        } catch {
            alert("Failed to delete event type");
        }
    }

    async function handleToggle(id: string, currentIsActive: boolean) {
        const newIsActive = !currentIsActive;

        setEventTypes(
            eventTypes.map((et) =>
                et.id === id ? { ...et, isActive: newIsActive } : et
            )
        );

        try {
            await updateEventType(id, { isActive: newIsActive });
        } catch {
            alert("Failed to update event type status");

            setEventTypes(
                eventTypes.map((et) =>
                    et.id === id ? { ...et, isActive: currentIsActive } : et
                )
            );
        }
    }

    function handleDuplicate(et: any) {
        setEditingId(null);

        setFormData({
            title: `${et.title} Copy`,
            description: et.description ?? "",
            duration: et.duration,
            slug: `${et.slug}-copy`
        });

        setIsModalOpen(true);
    }

    function handleEdit(et: any) {
        window.location.href = `/dashboard/event-types/edit/${et.id}`;
    }

    function copyEventLink(slug: string) {
        const url = `${window.location.origin}/book/${slug}`;
        navigator.clipboard.writeText(url);
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setSubmitting(true);

        try {
            if (editingId) {
                const updated = await updateEventType(editingId, {
                    ...formData,
                    duration: Number(formData.duration)
                });

                setEventTypes(
                    eventTypes.map((et) => (et.id === editingId ? updated : et))
                );

                setEditingId(null);
            } else {
                const newEt = await createEventType({
                    ...formData,
                    duration: Number(formData.duration)
                });

                setEventTypes([...eventTypes, newEt]);
            }

            setIsModalOpen(false);

            setFormData({
                title: "",
                description: "",
                duration: 30,
                slug: ""
            });
        } catch {
            alert("Failed to save event type");
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
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-[color:var(--border)] pb-8">
                <div>
                    <h1 className="text-[20px] font-bold tracking-tight">
                        Event types
                    </h1>

                    <p className="text-[14px] text-[color:var(--muted-foreground)] mt-1">
                        Configure different events for people to book on your calendar.
                    </p>
                </div>

                <div className="flex items-center gap-3 mt-4 md:mt-0">
                    <div className="relative">
                        <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[color:var(--muted-foreground)]" />

                        <Input
                            className="pl-9 bg-transparent border-[color:var(--border)] h-9 text-sm w-full md:w-[180px] rounded-md"
                            placeholder="Search"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>

                    <Button
                        onClick={() => {
                            setEditingId(null);
                            setFormData({
                                title: "",
                                description: "",
                                duration: 30,
                                slug: ""
                            });
                            setIsModalOpen(true);
                        }}
                        className="h-9 px-4 bg-white text-black hover:bg-gray-200 rounded-md font-semibold text-sm"
                    >
                        <Plus className="w-4 h-4 mr-1.5 stroke-[3]" />
                        New
                    </Button>
                </div>
            </div>

            {/* Content */}

            {loading ? (
                <div className="text-center p-12 text-[color:var(--muted-foreground)]">
                    Loading event types...
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
                            onEdit={() => handleEdit(et)}
                            onDuplicate={() => handleDuplicate(et)}
                            onCopy={() => copyEventLink(et.slug)}
                        />
                    ))}
                </div>
            )}

            {/* Modal */}

            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title={editingId ? "Edit Event Type" : "Create Event Type"}
                description="Add a new event type for people to book calendar slots with you."
            >
                <form onSubmit={handleSubmit} className="space-y-4">
                    <Input
                        required
                        placeholder="Title"
                        value={formData.title}
                        onChange={(e) => {
                            const title = e.target.value;

                            setFormData({
                                ...formData,
                                title,
                                slug: title
                                    .toLowerCase()
                                    .replace(/[^a-z0-9]+/g, "-")
                                    .replace(/(^-|-$)+/g, "")
                            });
                        }}
                    />

                    <Input
                        required
                        placeholder="Slug"
                        value={formData.slug}
                        onChange={(e) =>
                            setFormData({ ...formData, slug: e.target.value })
                        }
                    />

                    <Input
                        type="number"
                        value={formData.duration}
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                duration: Number(e.target.value)
                            })
                        }
                    />

                    <textarea
                        className="w-full border rounded-md p-2 text-sm"
                        placeholder="Description"
                        value={formData.description}
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                description: e.target.value
                            })
                        }
                    />

                    <div className="flex justify-end gap-3 pt-4">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => setIsModalOpen(false)}
                        >
                            Cancel
                        </Button>

                        <Button
                            type="submit"
                            disabled={submitting}
                            className="bg-white text-black hover:bg-gray-200"
                        >
                            {submitting
                                ? "Saving..."
                                : editingId
                                    ? "Save Changes"
                                    : "Create Event Type"}
                        </Button>
                    </div>
                </form>
            </Modal>
        </div>
    );
}