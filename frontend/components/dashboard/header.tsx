import { Bell, User } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Header() {
    return (
        <header className="h-20 flex items-center justify-between px-8 border-b border-[color:var(--border)] bg-[color:var(--background)]">
            <div className="flex items-center gap-4">
                {/* Mobile menu button could go here */}
                <h1 className="text-xl font-semibold tracking-tight">Dashboard</h1>
            </div>

            <div className="flex items-center gap-4">
                <Button variant="ghost" size="icon" className="rounded-full">
                    <Bell className="w-5 h-5" />
                    <span className="sr-only">Notifications</span>
                </Button>
                <div className="h-8 w-8 rounded-full bg-[color:var(--accent)] border border-[color:var(--border)] flex items-center justify-center overflow-hidden">
                    <User className="w-4 h-4 text-[color:var(--muted-foreground)]" />
                </div>
            </div>
        </header>
    );
}
