import { Sidebar } from "@/components/dashboard/sidebar";
import { Search, Settings } from "lucide-react";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen bg-[color:var(--background)] flex flex-col md:flex-row">
            {/* Mobile Header */}
            <header className="md:hidden flex items-center justify-between p-4 border-b border-[color:var(--border)] bg-[color:var(--card)] sticky top-0 z-30">
                <div className="flex items-center gap-2 font-bold text-lg text-[color:var(--foreground)] tracking-tight">
                    <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" id="Caldotcom--Streamline-Simple-Icons" height="20" width="20" className="text-[color:var(--foreground)]">
                        <path d="M2.408 14.488C1.035 14.488 0 13.4 0 12.058c0 -1.346 0.982 -2.443 2.408 -2.443 0.758 0 1.282 0.233 1.691 0.765l-0.66 0.55a1.343 1.343 0 0 0 -1.03 -0.442c-0.93 0 -1.44 0.711 -1.44 1.57 0 0.86 0.559 1.557 1.44 1.557 0.413 0 0.765 -0.147 1.043 -0.443l0.651 0.573c-0.391 0.51 -0.929 0.743 -1.695 0.743zm4.54 -3.575h0.89v3.49h-0.89v-0.51c-0.185 0.362 -0.493 0.604 -1.083 0.604 -0.943 0 -1.695 -0.82 -1.695 -1.826 0 -1.007 0.752 -1.825 1.695 -1.825 0.585 0 0.898 0.241 1.083 0.604zm0.026 1.758c0 -0.546 -0.374 -0.998 -0.964 -0.998 -0.568 0 -0.938 0.457 -0.938 0.998 0 0.528 0.37 0.998 0.938 0.998 0.586 0 0.964 -0.456 0.964 -0.998zm1.493 -3.168h0.89v4.895h-0.89zm1.285 4.434a0.53 0.53 0 0 1 0.542 -0.528c0.313 0 0.533 0.242 0.533 0.528a0.527 0.527 0 0 1 -0.533 0.537 0.534 0.534 0 0 1 -0.542 -0.537zm4.478 -0.098c-0.33 0.403 -0.832 0.658 -1.426 0.658a1.806 1.806 0 0 1 -1.84 -1.826c0 -1.007 0.778 -1.825 1.84 -1.825 0.572 0 1.07 0.241 1.4 0.622l-0.687 0.577c-0.172 -0.215 -0.396 -0.376 -0.713 -0.376 -0.568 0 -0.938 0.456 -0.938 0.998 0 0.541 0.37 0.997 0.938 0.997 0.343 0 0.58 -0.179 0.757 -0.42zm0.075 -1.168c0 -1.007 0.78 -1.825 1.84 -1.825 1.061 0 1.84 0.818 1.84 1.825 0 1.007 -0.779 1.826 -1.84 1.826 -1.06 -0.005 -1.84 -0.82 -1.84 -1.826zm2.778 0c0 -0.546 -0.37 -0.998 -0.938 -0.998 -0.568 -0.004 -0.937 0.452 -0.937 0.998 0 0.542 0.37 0.998 0.937 0.998 0.568 0 0.938 -0.456 0.938 -0.998zM24 12.269v2.13h-0.89v-1.911c0 -0.604 -0.281 -0.864 -0.704 -0.864 -0.396 0 -0.678 0.197 -0.678 0.864v1.91h-0.89v-1.91c0 -0.604 -0.285 -0.864 -0.704 -0.864 -0.396 0 -0.744 0.197 -0.744 0.864v1.91h-0.89v-3.49h0.89v0.484c0.185 -0.376 0.52 -0.564 1.035 -0.564 0.489 0 0.898 0.241 1.123 0.649 0.224 -0.417 0.554 -0.65 1.153 -0.65 0.731 0.005 1.299 0.56 1.299 1.442z" fill="currentColor" strokeWidth="1"></path>
                    </svg>
                    Cal.com
                </div>
                <div className="flex items-center gap-4 text-[color:var(--muted-foreground)]">
                    <Search className="w-5 h-5 hover:text-white transition-colors cursor-pointer" />
                    <Settings className="w-5 h-5 hover:text-white transition-colors cursor-pointer" />
                    <div className="w-7 h-7 bg-white rounded-full flex items-center justify-center text-xs font-bold text-black shadow-inner cursor-pointer relative">
                        A
                        <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-white border-2 border-[color:var(--card)] rounded-full"></div>
                    </div>
                </div>
            </header>

            <Sidebar />
            <div className="flex-1 flex flex-col min-w-0">
                <main className="flex-1 overflow-y-auto">
                    <div className="max-w-5xl mx-auto p-4 md:p-8 lg:p-10">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
}
