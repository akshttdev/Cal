import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function LandingPage() {
    return (
        <div className="min-h-screen bg-[color:var(--background)] flex flex-col items-center justify-center p-6 text-center text-[color:var(--foreground)] selection:bg-[color:var(--primary)] selection:text-white">
            <div className="max-w-md w-full space-y-8 fade-in slide-in-from-bottom-4 animate-in duration-700">
                <div className="space-y-4">
                    <div className="w-16 h-16 bg-[color:var(--foreground)] rounded flex items-center justify-center mx-auto mb-6">
                        <svg viewBox="0 0 24 24" fill="none" stroke="var(--background)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8"><polyline points="20 6 9 17 4 12"></polyline></svg>
                    </div>
                    <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
                        Schedule meets,
                        <br className="hidden sm:block" />
                        simply.
                    </h1>
                    <p className="text-[17px] text-[color:var(--muted-foreground)] pt-2 leading-relaxed">
                        A pixel-perfect open-source scheduling infrastructure clone built with Next.js, matching the Cal.com aesthetic perfectly.
                    </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 pt-4 justify-center">
                    <Link
                        href="/dashboard"
                        className="inline-flex h-11 items-center justify-center rounded-md bg-[color:var(--foreground)] px-6 text-sm font-medium text-[color:var(--background)] transition-colors hover:bg-[color:var(--foreground)]/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--ring)] focus-visible:ring-offset-2"
                    >
                        Go to Dashboard
                        <ArrowRight className="ml-2 w-4 h-4" />
                    </Link>
                    <Link
                        href="/akshat"
                        className="inline-flex h-11 items-center justify-center rounded-md border border-[color:var(--border)] bg-transparent px-6 text-sm font-medium transition-colors hover:bg-[color:var(--accent)] hover:text-[color:var(--foreground)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--ring)] focus-visible:ring-offset-2"
                    >
                        View Public Profile
                    </Link>
                </div>
            </div>
            <div className="absolute bottom-8 text-[13px] text-[color:var(--muted-foreground)] font-medium">
                Open source scheduling app
            </div>
        </div>
    );
}
