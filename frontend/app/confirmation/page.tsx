import { CheckCircle2, User, Calendar, Globe } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function ConfirmationPage({
    searchParams,
}: {
    searchParams: { slug: string; date: string; name: string };
}) {
    const { name, date, slug } = searchParams;

    const d = new Date(date);
    const formattedDate = !isNaN(d.getTime())
        ? new Intl.DateTimeFormat('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' }).format(d)
        : "Unknown Date";

    const formattedTime = !isNaN(d.getTime())
        ? new Intl.DateTimeFormat('en-US', { hour: 'numeric', minute: '2-digit', timeZoneName: 'short' }).format(d)
        : "Unknown Time";

    return (
        <div className="min-h-screen bg-[color:var(--background)] flex items-center justify-center p-4">
            <div className="max-w-md w-full bg-[color:var(--card)] border border-[color:var(--border)] rounded-3xl p-8 sm:p-10 shadow-xl text-center animate-in zoom-in-95 fade-in duration-500">
                <div className="w-20 h-20 bg-green-100 text-green-600 dark:bg-green-900/40 dark:text-green-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm border-4 border-white dark:border-zinc-900">
                    <CheckCircle2 className="w-10 h-10" />
                </div>

                <h1 className="text-2xl font-bold mb-2 text-[color:var(--foreground)] tracking-tight">You are scheduled</h1>
                <p className="text-[color:var(--muted-foreground)] mb-8 text-sm">
                    A calendar invitation has been sent to your email address.
                </p>

                <div className="bg-[color:var(--secondary)]/50 rounded-2xl p-6 text-left border border-[color:var(--border)] mb-8 space-y-4 shadow-inner">
                    <h2 className="font-semibold border-b border-[color:var(--border)] pb-3 text-lg flex items-center justify-between">
                        {name ? `${name}'s Meeting` : 'Your Meeting'}
                        <div className="w-8 h-8 rounded-full bg-[color:var(--primary)] text-[color:var(--primary-foreground)] flex items-center justify-center text-sm">C</div>
                    </h2>

                    <div className="space-y-4 font-medium text-sm text-[color:var(--muted-foreground)] mt-4">
                        <div className="flex items-center gap-3">
                            <User className="w-5 h-5 shrink-0 text-[color:var(--foreground)]" />
                            <span className="text-[color:var(--foreground)]">Cal Host</span>
                        </div>

                        <div className="flex items-start gap-3 bg-[color:var(--card)] p-3 rounded-lg border border-[color:var(--border)]">
                            <Calendar className="w-5 h-5 shrink-0 text-[color:var(--primary)] mt-0.5" />
                            <div className="text-[color:var(--foreground)]">
                                <p className="font-semibold">{formattedTime}</p>
                                <p className="font-normal text-[color:var(--muted-foreground)] mt-0.5">{formattedDate}</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                            <Globe className="w-5 h-5 shrink-0 text-[color:var(--foreground)]" />
                            <span>Web conferencing details to follow.</span>
                        </div>
                    </div>
                </div>

                <Link href={`/book/${slug}`}>
                    <Button variant="outline" className="w-full h-12 rounded-xl border-2 font-semibold">Book another meeting</Button>
                </Link>
            </div>
        </div>
    );
}
