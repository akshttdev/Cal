"use client";

import { useEffect, useState } from "react";
import { getEventTypes } from "@/lib/api";
import { ChevronRight, Clock } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function Home({ params }: { params: { username: string } }) {
  const [eventTypes, setEventTypes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Safely extract and format username
  const rawUsername = params?.username || "Guest";
  const formattedUsername = rawUsername.charAt(0).toUpperCase() + rawUsername.slice(1);
  const initials = formattedUsername.substring(0, 2).toUpperCase();

  useEffect(() => {
    // Fetch all active event types for this user
    async function fetchTypes() {
      try {
        const data = await getEventTypes();
        setEventTypes(data.filter((et: any) => et.isActive !== false));
      } catch (err) {
        console.error("Failed to load event types", err);
      } finally {
        setLoading(false);
      }
    }
    fetchTypes();
  }, []);

  return (
    <div className="min-h-screen bg-[color:var(--background)] selection:bg-[color:var(--primary)] selection:text-white">
      {/* Minimal Header */}
      <header className="w-full flex items-center justify-between p-4 md:px-6 max-w-5xl mx-auto">
        <div className="flex items-center gap-2 font-semibold">
          <div className="w-6 h-6 bg-[color:var(--foreground)] rounded flex items-center justify-center">
            <svg viewBox="0 0 24 24" fill="none" stroke="var(--background)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><polyline points="20 6 9 17 4 12"></polyline></svg>
          </div>
          <span>{formattedUsername}</span>
        </div>
        <div className="w-8 h-8 rounded-full bg-[color:var(--accent)] border border-[color:var(--border)] flex items-center justify-center text-xs font-medium text-[color:var(--foreground)]">
          {initials}
        </div>
      </header>

      <main className="max-w-[800px] mx-auto w-full px-4 pt-8 pb-20 md:pt-16">
        <div className="bg-[color:var(--card)] border border-[color:var(--border)] rounded-2xl p-6 md:p-10 shadow-sm">
          {/* Profile Hero */}
          <div className="flex flex-col items-center text-center mb-10">
            <div className="w-20 h-20 rounded-full bg-[color:var(--accent)] border border-[color:var(--border)] flex items-center justify-center text-2xl font-semibold mb-5 text-[color:var(--foreground)] shadow-sm">
              {initials}
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-[color:var(--foreground)] mb-2">{formattedUsername}</h1>
            <p className="text-[15px] text-[color:var(--muted-foreground)] max-w-md leading-relaxed">
              Welcome to my scheduling page. Please follow the instructions to add an event to my calendar.
            </p>
          </div>

          {/* Event Types List */}
          <div className="flex flex-col border-t border-[color:var(--border)] mt-6">
            {loading ? (
              <div className="py-12 flex justify-center">
                <div className="w-5 h-5 border-2 border-[color:var(--muted-foreground)] border-t-transparent rounded-full animate-spin"></div>
              </div>
            ) : eventTypes.length === 0 ? (
              <div className="py-12 text-center text-[color:var(--muted-foreground)] text-sm">
                No public event types available.
              </div>
            ) : (
              eventTypes.map((et, i) => (
                <Link
                  key={et.id}
                  href={`/book/${et.slug}`}
                  className={cn(
                    "group flex items-center justify-between p-5 border-b border-[color:var(--border)] hover:bg-[color:var(--accent)]/40 transition-colors cursor-pointer",
                    i === eventTypes.length - 1 && "border-b-0"
                  )}
                >
                  <div className="flex flex-col gap-1.5">
                    <h3 className="text-[15px] font-semibold tracking-tight text-[color:var(--foreground)] group-hover:text-[color:var(--primary)] transition-colors">
                      {et.title}
                    </h3>
                    <div className="flex items-center gap-1.5 text-[13px] font-medium text-[color:var(--muted-foreground)]">
                      <Clock className="w-3.5 h-3.5" />
                      {et.duration}m
                    </div>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-[color:var(--background)] border border-[color:var(--border)] flex items-center justify-center text-[color:var(--muted-foreground)] group-hover:text-[color:var(--foreground)] transition-colors shadow-sm">
                    <ChevronRight className="w-4 h-4 ml-0.5" />
                  </div>
                </Link>
              ))
            )}
          </div>
        </div>

        <div className="mt-8 text-center">
          <p className="text-[13px] text-[color:var(--muted-foreground)] font-medium">
            Powered by <span className="text-[color:var(--foreground)]">Cal.com</span> clone
          </p>
        </div>
      </main>
    </div>
  );
}
