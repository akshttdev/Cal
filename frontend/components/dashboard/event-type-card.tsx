"use client";

import { Clock, Copy, ExternalLink, MoreHorizontal, Link2, Pen, Code, Trash } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";

interface EventTypeCardProps {
    id: string;
    title: string;
    description: string;
    duration: number;
    slug: string;
    isActive: boolean;
    onDelete?: (id: string) => void;
    onToggle?: (id: string, currentIsActive: boolean) => void;
}

export function EventTypeCard({
    id,
    title,
    duration,
    slug,
    isActive,
    onDelete,
    onToggle
}: EventTypeCardProps) {
    const [menuOpen, setMenuOpen] = useState(false);
    const [active, setActive] = useState(isActive);
    const menuRef = useRef<HTMLDivElement>(null);
    const bookingUrl = `${typeof window !== 'undefined' ? window.location.origin : ''}/book/${slug}`;

    useEffect(() => {
        setActive(isActive);
    }, [isActive]);

    const copyLink = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        navigator.clipboard.writeText(bookingUrl);
    };

    // Close menu when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setMenuOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div className="group flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 sm:p-5 bg-[color:var(--card)] border border-[color:var(--border)] first:rounded-t-xl last:rounded-b-xl -mb-px hover:bg-[color:var(--accent)]/30 transition-colors relative">
            <Link href={`/dashboard/event-types/edit/${id}`} className="flex-1 flex flex-col gap-2.5 cursor-pointer">
                <div className="flex items-baseline gap-1.5">
                    <h3 className="text-[15px] font-semibold tracking-tight hover:underline">{title}</h3>
                    <span className="text-sm font-medium text-[color:var(--muted-foreground)] font-mono">/akshtt/{slug}</span>
                </div>
                <div className="flex items-center gap-1.5 text-xs font-semibold text-[color:var(--muted-foreground)] bg-[color:var(--accent)] w-fit px-2 py-0.5 rounded-sm border border-[color:var(--border)]/50 relative z-10">
                    <Clock className="w-3.5 h-3.5" />
                    {duration}m
                </div>
            </Link>

            <div className="flex items-center gap-5 mt-4 sm:mt-0 relative z-10">
                <div className="flex items-center gap-3">
                    {!active && <span className="text-sm text-[color:var(--muted-foreground)] font-medium">Hidden</span>}
                    <button
                        type="button"
                        aria-pressed={active}
                        className="relative inline-flex items-center cursor-pointer focus:outline-none"
                        onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            const previous = active;
                            const next = !previous;
                            setActive(next);
                            onToggle?.(id, previous);
                        }}
                    >
                        <span className="sr-only">Toggle visibility</span>
                        <span className={`w-11 h-6 rounded-full transition-colors ${active ? "bg-white" : "bg-[color:var(--muted-foreground)]/30"}`}>
                            <span
                                className={`absolute top-[2px] left-[2px] h-5 w-5 rounded-full transition-transform ${active ? "translate-x-[20px] bg-black" : "bg-white"}`}
                            />
                        </span>
                    </button>
                </div>

                <div className="flex items-center gap-1 relative" ref={menuRef}>
                    {/* Actual Action Buttons matching screenshot closely */}
                    <a href={bookingUrl} onClick={(e) => e.stopPropagation()} target="_blank" rel="noopener noreferrer" className="p-2 border border-[color:var(--border)] bg-transparent rounded-l-md hover:bg-[color:var(--accent)] text-[color:var(--foreground)] transition-colors flex items-center justify-center">
                        <ExternalLink className="w-4 h-4" />
                    </a>
                    <button onClick={copyLink} className="p-2 border-y border-[color:var(--border)] bg-transparent hover:bg-[color:var(--accent)] text-[color:var(--foreground)] transition-colors">
                        <Link2 className="w-4 h-4" />
                    </button>
                    <button onClick={(e) => { e.preventDefault(); e.stopPropagation(); setMenuOpen(!menuOpen); }} className={`p-2 border border-[color:var(--border)] rounded-r-md transition-colors ${menuOpen ? 'bg-[color:var(--accent)] text-[color:var(--foreground)]' : 'bg-transparent text-[color:var(--foreground)] hover:bg-[color:var(--accent)]'}`}>
                        <MoreHorizontal className="w-4 h-4" />
                    </button>

                    {/* Custom Dropdown Menu */}
                    {menuOpen && (
                        <div className="absolute right-0 top-full mt-2 w-48 bg-[color:var(--card)] border border-[color:var(--border)] rounded-xl shadow-lg z-50 overflow-hidden py-1 text-sm font-medium animate-in fade-in slide-in-from-top-2 duration-100">
                            <Link href={`/dashboard/event-types/edit/${id}`} className="w-full text-left px-4 py-2 hover:bg-[color:var(--accent)] flex items-center gap-2.5 cursor-pointer">
                                <Pen className="w-[15px] h-[15px] text-[color:var(--muted-foreground)]" /> Edit
                            </Link>
                            <button className="w-full text-left px-4 py-2 hover:bg-[color:var(--accent)] flex items-center gap-2.5">
                                <Copy className="w-[15px] h-[15px] text-[color:var(--muted-foreground)]" /> Duplicate
                            </button>
                            <button className="w-full text-left px-4 py-2 hover:bg-[color:var(--accent)] flex items-center gap-2.5">
                                <Code className="w-[15px] h-[15px] text-[color:var(--muted-foreground)]" /> Embed
                            </button>
                            <div className="h-px bg-[color:var(--border)] my-1"></div>
                            <button onClick={(e) => { e.preventDefault(); e.stopPropagation(); onDelete?.(id); setMenuOpen(false); }} className="w-full text-left px-4 py-2 text-[color:var(--destructive)] hover:bg-[color:var(--destructive)]/10 flex items-center gap-2.5 transition-colors">
                                <Trash className="w-[15px] h-[15px]" /> Delete
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
