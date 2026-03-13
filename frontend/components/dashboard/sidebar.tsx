"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    Calendar,
    Clock,
    Link2,
    Users,
    LayoutGrid,
    ArrowRightLeft,
    Zap,
    BarChart2,
    ExternalLink,
    Copy,
    Gift,
    Settings,
    ChevronDown,
    Search,
    Moon,
    MapIcon,
    HelpCircle,
    Download,
    ChevronRight,
    LogOut,
    User
} from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
    { name: "Event types", href: "/dashboard/event-types", icon: Link2 },
    { name: "Bookings", href: "/dashboard/bookings", icon: Calendar },
    { name: "Availability", href: "/dashboard/availability", icon: Clock },
    { name: "Teams", href: "/dashboard/teams", icon: Users },
    { name: "Apps", href: "/dashboard/apps", icon: LayoutGrid, hasDropdown: true },
    { name: "Routing", href: "/dashboard/routing", icon: ArrowRightLeft },
    { name: "Workflows", href: "/dashboard/workflows", icon: Zap },
    { name: "Insights", href: "/dashboard/insights", icon: BarChart2, hasDropdown: true },
];

const BOTTOM_ITEMS = [
    { name: "View public page", href: "/book/test-event", icon: ExternalLink },
    { name: "Copy public page link", href: "#", icon: Copy },
    { name: "Refer and earn", href: "#", icon: Gift },
    { name: "Settings", href: "#", icon: Settings },
];

export function Sidebar() {
    const pathname = usePathname();
    const [profileOpen, setProfileOpen] = useState(false);

    return (
        <aside className="w-[260px] border-r bg-[color:var(--card)] flex flex-col h-screen hidden md:flex border-[color:var(--border)] relative z-20">
            {/* Top Profile Dropdown */}
            <div className="relative mx-2 mt-2 z-50">
                <div
                    onClick={() => setProfileOpen(!profileOpen)}
                    className={`p-4 flex items-center justify-between rounded-md cursor-pointer transition-colors group ${profileOpen ? 'bg-[color:var(--accent)]/50' : 'hover:bg-[color:var(--accent)]/30'}`}
                >
                    <div className="flex items-center gap-3">
                        <div className="relative">
                            <div className="w-7 h-7 bg-white rounded-full flex items-center justify-center text-xs font-bold text-black shadow-inner">
                                A
                            </div>
                            <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-[#4ADE80] border-2 border-[color:var(--card)] rounded-full"></div>
                        </div>
                        <span className="font-semibold text-sm group-hover:text-white transition-colors">Akshat Dhami</span>
                        <ChevronDown className={`w-4 h-4 text-[color:var(--muted-foreground)] transition-transform ${profileOpen ? 'rotate-180 text-white' : ''}`} />
                    </div>
                    <Search className="w-4 h-4 text-[color:var(--muted-foreground)] hover:text-white transition-colors" />
                </div>

                {/* Dropdown Menu */}
                {profileOpen && (
                    <div className="absolute top-full left-0 right-0 mt-1 bg-[#1c1c1c] border border-[color:var(--border)] rounded-xl shadow-xl overflow-hidden py-2 animate-in fade-in slide-in-from-top-1 duration-100 flex flex-col min-w-[220px]">
                        <button className="flex items-center gap-3 px-4 py-2 text-sm text-[color:var(--muted-foreground)] hover:bg-[#2c2c2c] hover:text-white transition-colors text-left w-full">
                            <Users className="w-[18px] h-[18px]" /> My profile
                        </button>
                        <button className="flex items-center gap-3 px-4 py-2 text-sm text-[color:var(--muted-foreground)] hover:bg-[#2c2c2c] hover:text-white transition-colors text-left w-full">
                            <Settings className="w-[18px] h-[18px]" /> My settings
                        </button>
                        <button className="flex items-center gap-3 px-4 py-2 text-sm text-[color:var(--muted-foreground)] hover:bg-[#2c2c2c] hover:text-white transition-colors text-left w-full">
                            <Moon className="w-[18px] h-[18px]" /> Out of office
                        </button>

                        <div className="h-px bg-[color:var(--border)] my-2 mx-4"></div>

                        <button className="flex items-center gap-3 px-4 py-2 text-sm text-[color:var(--muted-foreground)] hover:bg-[#2c2c2c] hover:text-white transition-colors text-left w-full">
                            <MapIcon className="w-[18px] h-[18px]" /> Roadmap
                        </button>
                        <button className="flex items-center gap-3 px-4 py-2 text-sm text-[color:var(--muted-foreground)] hover:bg-[#2c2c2c] hover:text-white transition-colors text-left w-full">
                            <HelpCircle className="w-[18px] h-[18px]" /> Help
                        </button>
                        <button className="flex items-center justify-between px-4 py-2 text-sm text-[color:var(--muted-foreground)] hover:bg-[#2c2c2c] hover:text-white transition-colors text-left w-full group/dl">
                            <div className="flex items-center gap-3">
                                <Download className="w-[18px] h-[18px]" /> Download app
                            </div>
                            <ChevronRight className="w-4 h-4 opacity-50 group-hover/dl:opacity-100" />
                        </button>

                        <div className="h-px bg-[color:var(--border)] my-2 mx-4"></div>

                        <button className="flex items-center gap-3 px-4 py-2 text-sm text-[#f87171] hover:bg-[#ffe4e6]/10 transition-colors text-left w-full">
                            <LogOut className="w-[18px] h-[18px]" /> Sign out
                        </button>
                    </div>
                )}
            </div>

            {/* Main Navigation */}
            <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto mt-2">
                {NAV_ITEMS.map((item) => {
                    const isActive = pathname.startsWith(item.href);
                    const Icon = item.icon;
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "flex items-center justify-between px-3 py-2 rounded-md text-sm font-medium transition-colors group",
                                isActive
                                    ? "bg-[color:var(--secondary)] text-[color:var(--foreground)]"
                                    : "text-[color:var(--muted-foreground)] hover:bg-[color:var(--accent)] hover:text-[color:var(--foreground)]"
                            )}
                        >
                            <div className="flex items-center gap-3">
                                <Icon className={cn("w-[18px] h-[18px]", isActive ? "text-[color:var(--foreground)]" : "text-[color:var(--muted-foreground)] group-hover:text-[color:var(--foreground)] transition-colors")} />
                                {item.name}
                            </div>
                            {item.hasDropdown && <ChevronDown className="w-4 h-4 text-[color:var(--muted-foreground)] opacity-0 group-hover:opacity-100 transition-opacity" />}
                        </Link>
                    );
                })}
            </nav>

            {/* Bottom Navigation */}
            <div className="px-3 pb-6 flex flex-col gap-0.5">
                {BOTTOM_ITEMS.map((item) => {
                    const Icon = item.icon;
                    return (
                        <Link
                            key={item.name}
                            href={item.href}
                            className="flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium text-[color:var(--muted-foreground)] hover:bg-[color:var(--accent)] hover:text-[color:var(--foreground)] transition-colors group"
                        >
                            <Icon className="w-[18px] h-[18px] text-[color:var(--muted-foreground)] group-hover:text-[color:var(--foreground)] transition-colors" />
                            {item.name}
                        </Link>
                    );
                })}

                <div className="px-3 pt-3 mt-2">
                    <p className="text-[10px] text-[color:var(--muted-foreground)] leading-tight">
                        © 2026 Cal.com, Inc. v.v4.2.7-hotfix2-h-<br />a3e3657
                    </p>
                </div>
            </div>
        </aside>
    );
}
