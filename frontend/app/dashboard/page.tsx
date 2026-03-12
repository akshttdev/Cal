import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, Link as LinkIcon, ArrowRight } from "lucide-react";

export default function DashboardOverview() {
    return (
        <div className="space-y-8 animate-in mt-4 fade-in slide-in-from-bottom-4 duration-500">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Overview</h1>
                <p className="text-[color:var(--muted-foreground)] mt-2">
                    Welcome back! Here's a quick overview of your scheduling platform.
                </p>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
                <Card href="/dashboard/event-types" icon={LinkIcon} title="Event Types" description="Create and manage your meeting types" />
                <Card href="/dashboard/bookings" icon={Calendar} title="Bookings" description="View upcoming and past meetings" />
                <Card href="/dashboard/availability" icon={Clock} title="Availability" description="Configure when you're available" />
            </div>

            <div className="bg-[color:var(--card)] border border-[color:var(--border)] rounded-2xl p-8 flex flex-col items-center justify-center text-center space-y-4">
                <div className="w-16 h-16 bg-[color:var(--primary)] text-[color:var(--primary-foreground)] rounded-2xl flex items-center justify-center rotate-3 shadow-xl">
                    <Calendar className="w-8 h-8" />
                </div>
                <div className="max-w-md space-y-2">
                    <h2 className="text-xl font-semibold">Ready to get booked?</h2>
                    <p className="text-[color:var(--muted-foreground)]">
                        Share your event type links with guests so they can find a time that works for both of you.
                    </p>
                </div>
                <Link href="/dashboard/event-types">
                    <Button className="mt-4 gap-2 rounded-full px-8">
                        Create an Event Type <ArrowRight className="w-4 h-4" />
                    </Button>
                </Link>
            </div>
        </div>
    );
}

function Card({ href, icon: Icon, title, description }: any) {
    return (
        <Link href={href} className="group relative overflow-hidden rounded-2xl border border-[color:var(--border)] bg-[color:var(--card)] p-6 transition-all hover:shadow-lg hover:-translate-y-1">
            <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-[color:var(--primary)] to-[color:var(--primary)]/50 opacity-0 transition-opacity group-hover:opacity-100" />
            <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[color:var(--secondary)] text-[color:var(--foreground)] transition-colors group-hover:bg-[color:var(--primary)] group-hover:text-[color:var(--primary-foreground)]">
                    <Icon className="h-6 w-6" />
                </div>
                <div>
                    <h3 className="font-semibold">{title}</h3>
                    <p className="text-sm text-[color:var(--muted-foreground)]">{description}</p>
                </div>
            </div>
        </Link>
    );
}
