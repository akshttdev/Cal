import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function LandingPage() {
    return (
        <main className="bg-[color:var(--background)] text-[color:var(--foreground)] selection:bg-[color:var(--primary)] selection:text-white">

            {/* NAVBAR */}
            <nav className="w-full border-b border-[color:var(--border)]">
                <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
                    <div className="font-bold text-lg">Cal.com</div>

                    <div className="hidden md:flex gap-8 text-sm text-[color:var(--muted-foreground)]">
                        <span>Solutions</span>
                        <span>Enterprise</span>
                        <span>Cal.ai</span>
                        <span>Developer</span>
                        <span>Resources</span>
                        <span>Pricing</span>
                    </div>

                    <Link
                        href="/dashboard"
                        className="bg-[color:var(--foreground)] text-[color:var(--background)] px-4 py-2 rounded-md text-sm flex items-center gap-2"
                    >
                        Go to app <ArrowRight size={16} />
                    </Link>
                </div>
            </nav>

            {/* HERO */}
            <section className="max-w-7xl mx-auto px-6 py-24 grid lg:grid-cols-2 gap-16 items-center">

                <div className="space-y-6">
                    <h1 className="text-5xl font-extrabold tracking-tight leading-tight">
                        The better way to
                        <br />
                        schedule your meetings
                    </h1>

                    <p className="text-lg text-[color:var(--muted-foreground)] max-w-xl">
                        A fully customizable scheduling software for individuals,
                        businesses taking calls and developers building scheduling
                        platforms where users meet users.
                    </p>

                    <div className="flex gap-4 pt-4">
                        <Link
                            href="/dashboard"
                            className="bg-[color:var(--foreground)] text-[color:var(--background)] px-6 py-3 rounded-md font-medium flex items-center gap-2"
                        >
                            Get started <ArrowRight size={16} />
                        </Link>

                        <Link
                            href="/akshat"
                            className="border border-[color:var(--border)] px-6 py-3 rounded-md"
                        >
                            View public page
                        </Link>
                    </div>
                </div>

                {/* Right preview card */}
                <div className="border rounded-xl p-8 shadow-sm bg-[color:var(--card)]">
                    <h3 className="font-semibold mb-4">Academic Counseling</h3>

                    <div className="grid grid-cols-5 gap-2 text-sm">
                        {Array.from({ length: 30 }).map((_, i) => (
                            <div
                                key={i}
                                className="h-10 rounded-md bg-[color:var(--accent)] flex items-center justify-center"
                            >
                                {i + 1}
                            </div>
                        ))}
                    </div>
                </div>

            </section>

            {/* HOW IT WORKS */}
            <section className="max-w-7xl mx-auto px-6 py-24 text-center">

                <h2 className="text-4xl font-bold mb-4">
                    With us, appointment scheduling is easy
                </h2>

                <p className="text-[color:var(--muted-foreground)] mb-16">
                    Effortless scheduling for business and individuals.
                </p>

                <div className="grid md:grid-cols-3 gap-8">

                    <div className="border rounded-xl p-8">
                        <div className="text-sm text-[color:var(--muted-foreground)] mb-2">
                            01
                        </div>
                        <h3 className="font-semibold text-lg mb-2">
                            Connect your calendar
                        </h3>
                        <p className="text-sm text-[color:var(--muted-foreground)]">
                            We'll handle cross referencing so you don't worry about
                            double bookings.
                        </p>
                    </div>

                    <div className="border rounded-xl p-8">
                        <div className="text-sm text-[color:var(--muted-foreground)] mb-2">
                            02
                        </div>
                        <h3 className="font-semibold text-lg mb-2">
                            Set your availability
                        </h3>
                        <p className="text-sm text-[color:var(--muted-foreground)]">
                            Configure buffers, weekends and working hours easily.
                        </p>
                    </div>

                    <div className="border rounded-xl p-8">
                        <div className="text-sm text-[color:var(--muted-foreground)] mb-2">
                            03
                        </div>
                        <h3 className="font-semibold text-lg mb-2">
                            Choose how to meet
                        </h3>
                        <p className="text-sm text-[color:var(--muted-foreground)]">
                            Meet via video, phone call or even in person.
                        </p>
                    </div>

                </div>

            </section>

            {/* FEATURES */}
            <section className="max-w-7xl mx-auto px-6 py-24">

                <h2 className="text-4xl font-bold text-center mb-16">
                    Your all-purpose scheduling app
                </h2>

                <div className="grid md:grid-cols-2 gap-8">

                    <div className="border rounded-xl p-8">
                        <h3 className="font-semibold text-lg mb-2">
                            Avoid meeting overload
                        </h3>
                        <p className="text-[color:var(--muted-foreground)]">
                            Set daily, weekly or monthly limits and buffers around
                            your meetings.
                        </p>
                    </div>

                    <div className="border rounded-xl p-8">
                        <h3 className="font-semibold text-lg mb-2">
                            Custom booking links
                        </h3>
                        <p className="text-[color:var(--muted-foreground)]">
                            Create short memorable booking URLs for your meetings.
                        </p>
                    </div>

                    <div className="border rounded-xl p-8">
                        <h3 className="font-semibold text-lg mb-2">
                            Streamlined booking experience
                        </h3>
                        <p className="text-[color:var(--muted-foreground)]">
                            Email confirmations, calendar overlays and easy
                            rescheduling.
                        </p>
                    </div>

                    <div className="border rounded-xl p-8">
                        <h3 className="font-semibold text-lg mb-2">
                            Reduce no-shows
                        </h3>
                        <p className="text-[color:var(--muted-foreground)]">
                            Automated reminders and meeting follow-ups.
                        </p>
                    </div>

                </div>

            </section>

            {/* TESTIMONIAL */}
            <section className="max-w-5xl mx-auto px-6 py-24 text-center">

                <h2 className="text-4xl font-bold mb-6">
                    Don’t just take our word for it
                </h2>

                <div className="border rounded-xl p-8 text-left">
                    <p className="text-lg">
                        "I finally made the move to Cal.com after I couldn't find
                        how to edit events in Calendly dashboard."
                    </p>

                    <div className="mt-6 text-sm text-[color:var(--muted-foreground)]">
                        Ant Wilson — Co-Founder & CTO, Supabase
                    </div>
                </div>

            </section>

            {/* INTEGRATIONS */}
            <section className="max-w-7xl mx-auto px-6 py-24">

                <h2 className="text-4xl font-bold mb-12 text-center">
                    All your key tools in sync
                </h2>

                <div className="grid grid-cols-4 md:grid-cols-6 gap-8 place-items-center opacity-80 text-sm">

                    {[
                        "Google Calendar",
                        "Zoom",
                        "Teams",
                        "Stripe",
                        "Notion",
                        "Slack",
                        "Zapier",
                        "Hubspot",
                    ].map((tool) => (
                        <div
                            key={tool}
                            className="border rounded-lg px-4 py-3 text-center w-full"
                        >
                            {tool}
                        </div>
                    ))}

                </div>

            </section>

            {/* FOOTER */}
            <footer className="border-t border-[color:var(--border)] mt-20">

                <div className="max-w-7xl mx-auto px-6 py-16 grid md:grid-cols-4 gap-12 text-sm">

                    <div>
                        <h3 className="font-semibold mb-4">Cal.com</h3>
                        <p className="text-[color:var(--muted-foreground)]">
                            Open source scheduling infrastructure.
                        </p>
                    </div>

                    <div>
                        <h4 className="font-semibold mb-4">Solutions</h4>
                        <div className="space-y-2 text-[color:var(--muted-foreground)]">
                            <p>Enterprise</p>
                            <p>Developers</p>
                            <p>Pricing</p>
                        </div>
                    </div>

                    <div>
                        <h4 className="font-semibold mb-4">Resources</h4>
                        <div className="space-y-2 text-[color:var(--muted-foreground)]">
                            <p>Docs</p>
                            <p>Blog</p>
                            <p>Support</p>
                        </div>
                    </div>

                    <div>
                        <h4 className="font-semibold mb-4">Company</h4>
                        <div className="space-y-2 text-[color:var(--muted-foreground)]">
                            <p>About</p>
                            <p>Privacy</p>
                            <p>Terms</p>
                        </div>
                    </div>

                </div>

            </footer>

        </main>
    );
}