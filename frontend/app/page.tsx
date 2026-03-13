import Link from "next/link";
import { ArrowRight, ChevronDown, Clock, Globe, Calendar as CalendarIcon, Check, Star, Play, Mail } from "lucide-react";

export default function LandingPage() {
    return (
        <main className="bg-white text-slate-900 selection:bg-slate-900 selection:text-white font-sans antialiased overflow-x-hidden">

            {/* NAVBAR */}
            <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-100">
                <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between font-medium">
                    <div className="flex items-center gap-12">
                        <div className="text-2xl font-black tracking-tight">Cal.com</div>

                        <nav className="hidden lg:flex items-center gap-8 text-[15px] text-slate-600">
                            <div className="flex items-center gap-1 cursor-pointer hover:text-slate-900 transition-colors">
                                Solutions <ChevronDown size={14} />
                            </div>
                            <span className="hover:text-slate-900 transition-colors cursor-pointer">Enterprise</span>
                            <span className="hover:text-slate-900 transition-colors cursor-pointer">Cal.ai</span>
                            <div className="flex items-center gap-1 cursor-pointer hover:text-slate-900 transition-colors">
                                Developer <ChevronDown size={14} />
                            </div>
                            <div className="flex items-center gap-1 cursor-pointer hover:text-slate-900 transition-colors">
                                Resources <ChevronDown size={14} />
                            </div>
                            <span className="hover:text-slate-900 transition-colors cursor-pointer">Pricing</span>
                        </nav>
                    </div>

                    <Link
                        href="/dashboard"
                        className="bg-slate-900 text-white px-6 py-2.5 rounded-full text-[15px] flex items-center gap-2 hover:bg-slate-800 transition-all font-semibold"
                    >
                        Go to app <ArrowRight size={16} />
                    </Link>
                </div>
            </header>

            {/* HERO SECTION */}
            <section className="pt-40 pb-20 px-6 max-w-7xl mx-auto">
                <div className="bg-[#fcfcfc] border border-slate-100 rounded-[40px] p-8 md:p-16 lg:p-24 relative overflow-hidden">
                    <div className="grid lg:grid-cols-[1.2fr,1fr] gap-16 items-center relative z-10">
                        {/* Hero Text */}
                        <div className="space-y-8">
                            <div className="inline-flex items-center gap-2 bg-white border border-slate-100 px-4 py-1.5 rounded-full text-xs font-semibold shadow-sm text-slate-600">
                                <span>Cal.com launches v6.2</span>
                                <ArrowRight size={12} />
                            </div>

                            <h1 className="text-6xl md:text-7xl font-black tracking-tight leading-[1.05] text-slate-900">
                                The better way to schedule your meetings
                            </h1>

                            <p className="text-xl text-slate-500 leading-relaxed max-w-lg">
                                A fully customizable scheduling software for individuals, businesses taking calls and developers building scheduling platforms where users meet users.
                            </p>

                            <div className="flex flex-col sm:flex-row gap-4 pt-4">
                                <button className="flex items-center justify-center gap-3 bg-slate-900 text-white px-8 py-4 rounded-xl font-bold text-lg hover:scale-[1.02] transition-all shadow-lg shadow-black/10">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
                                        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                                        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05" />
                                        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                                    </svg>
                                    Sign up with Google
                                </button>
                                <button className="flex items-center justify-center gap-3 bg-slate-100 text-slate-800 px-8 py-4 rounded-xl font-bold text-lg hover:bg-slate-200 transition-all">
                                    Sign up with email <ArrowRight size={20} />
                                </button>
                            </div>
                            <p className="text-sm text-slate-400 font-medium ml-1">No credit card required</p>
                        </div>

                        {/* Hero Preview Card */}
                        <div className="relative">
                            <div className="bg-white border border-slate-100 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.1)] p-1 overflow-hidden">
                                <div className="grid grid-cols-[1.2fr,1.4fr]">
                                    {/* Event Info */}
                                    <div className="p-8 border-r border-slate-50">
                                        <div className="flex items-center gap-3 mb-6">
                                            <div className="w-10 h-10 rounded-full bg-slate-200 overflow-hidden">
                                                <img
                                                    src="https://avatar.vercel.sh/ethan"
                                                    alt="Avatar"
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>
                                            <div className="leading-tight">
                                                <p className="text-slate-400 text-xs font-bold uppercase tracking-wider">Ethan Taylor</p>
                                                <p className="font-bold text-slate-800">Academic Counseling</p>
                                            </div>
                                        </div>

                                        <p className="text-xs text-slate-400 font-medium mb-6 leading-relaxed">
                                            Virtual counseling session for university students to discuss academic progress and well-being.
                                        </p>

                                        <div className="flex flex-wrap gap-2 mb-6">
                                            <div className="px-3 py-1 rounded-full bg-slate-50 text-slate-400 text-xs font-bold border border-slate-100">15m</div>
                                            <div className="px-3 py-1 rounded-full bg-slate-50 text-slate-400 text-xs font-bold border border-slate-100">30m</div>
                                            <div className="px-3 py-1 rounded-full bg-white text-slate-800 text-xs font-bold border border-slate-200 shadow-sm">45m</div>
                                            <div className="px-3 py-1 rounded-full bg-slate-50 text-slate-400 text-xs font-bold border border-slate-100">1h</div>
                                        </div>

                                        <div className="space-y-3">
                                            <div className="flex items-center gap-2 text-xs font-bold text-slate-600">
                                                <div className="w-5 h-5 flex items-center justify-center">
                                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="#4285F4">
                                                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                                                    </svg>
                                                </div>
                                                Google Meet
                                            </div>
                                            <div className="flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-slate-600 cursor-pointer transition-colors">
                                                <Globe size={16} />
                                                America/California <ChevronDown size={14} />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Calendar View */}
                                    <div className="p-8 pb-4">
                                        <div className="flex items-center justify-between mb-8">
                                            <h4 className="text-sm font-bold text-slate-900">May <span className="text-slate-400">2025</span></h4>
                                        </div>
                                        <div className="grid grid-cols-7 gap-y-4 text-center">
                                            {['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'].map(day => (
                                                <span key={day} className="text-[10px] font-black text-slate-300 tracking-widest">{day}</span>
                                            ))}
                                            {Array.from({ length: 30 }).map((_, i) => {
                                                const day = i + 1;
                                                const isActive = [6, 8, 20, 21, 22, 23, 27, 28, 29, 30].includes(day);
                                                const isHighlighted = day === 8;
                                                return (
                                                    <div key={day} className="flex flex-col items-center">
                                                        <button
                                                            className={`w-9 h-9 flex items-center justify-center rounded-lg text-sm font-bold transition-all relative
                                                                ${isActive ? 'bg-slate-100 text-slate-900 border border-slate-200/50' : 'text-slate-400'}
                                                                ${isHighlighted ? 'bg-slate-900 text-white border-transparent' : ''}
                                                            `}
                                                        >
                                                            {day}
                                                            {day === 6 && <span className="absolute bottom-1.5 w-1 h-1 bg-slate-900 rounded-full" />}
                                                        </button>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Badges and Stars */}
                            <div className="mt-8 flex items-center justify-between">
                                <div className="flex flex-col items-start">
                                    <div className="flex gap-0.5 mb-1.5">
                                        {Array.from({ length: 5 }).map((_, i) => (
                                            <div key={i} className="w-5 h-5 bg-[#00b67a] flex items-center justify-center text-white rounded-[1px]">
                                                <Star size={12} fill="currentColor" />
                                            </div>
                                        ))}
                                    </div>
                                    <span className="text-xs font-black tracking-tight flex items-center gap-1">
                                        <span className="text-slate-400">★</span> Trustpilot
                                    </span>
                                </div>
                                <div className="flex flex-col items-center">
                                    <div className="flex gap-1 mb-1.5">
                                        {Array.from({ length: 5 }).map((_, i) => (
                                            <Star key={i} size={16} fill="#ff6154" className="text-[#ff6154]" />
                                        ))}
                                    </div>
                                    <div className="w-5 h-5 bg-[#ff6154] rounded-full flex items-center justify-center text-white text-[10px] font-black">P</div>
                                </div>
                                <div className="flex flex-col items-end">
                                    <div className="flex gap-1 mb-1.5">
                                        {Array.from({ length: 5 }).map((_, i) => (
                                            <Star key={i} size={16} fill="#ff4c26" className="text-[#ff4c26]" />
                                        ))}
                                    </div>
                                    <div className="w-5 h-5 bg-[#ff4c26] rounded-full flex items-center justify-center text-white text-[10px] font-black italic">G</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* PARTNERS LOGOS */}
            <section className="py-20 border-y border-slate-50 px-6">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-12">
                    <p className="text-sm font-bold text-slate-400 max-w-[180px] leading-snug">
                        Trusted by fast-growing companies around the world
                    </p>
                    <div className="flex flex-wrap justify-center items-center gap-x-16 gap-y-10 invert opacity-60">
                        {/* Placeholder for logos since we can't easily fetch svg content here */}
                        <div className="text-2xl font-black italic tracking-tighter">ramp</div>
                        <div className="text-2xl font-black flex items-center gap-1 tracking-tight">
                            <div className="w-5 h-5 bg-black rounded-sm" /> PlanetScale
                        </div>
                        <div className="text-2xl font-black tracking-tighter flex items-center gap-2">
                            ( ) coinbase
                        </div>
                        <div className="text-2xl font-black tracking-tight">storyblok</div>
                        <div className="text-2xl font-black tracking-tighter">Angellist</div>
                    </div>
                </div>
            </section>

            {/* HOW IT WORKS */}
            <section className="py-32 px-6">
                <div className="max-w-7xl mx-auto text-center space-y-16">
                    <div className="space-y-4">
                        <div className="inline-flex items-center gap-2 bg-slate-50 border border-slate-100 px-4 py-1 rounded-full text-[13px] font-bold text-slate-500 shadow-sm">
                            <Clock size={16} />
                            How it works
                        </div>
                        <h2 className="text-5xl md:text-6xl font-black tracking-tight text-slate-900">
                            With us, appointment scheduling is easy
                        </h2>
                        <p className="text-xl text-slate-500 max-w-2xl mx-auto">
                            Effortless scheduling for business and individuals, powerful solutions for fast-growing modern companies.
                        </p>
                        <div className="flex justify-center gap-4 pt-4">
                            <button className="bg-slate-900 text-white px-8 py-3 rounded-xl font-bold hover:scale-[1.02] transition-all">Get started</button>
                            <button className="bg-slate-100 text-slate-800 px-8 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-slate-200 transition-all">
                                Book a demo <ChevronDown size={14} />
                            </button>
                        </div>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {/* Step 1 */}
                        <div className="bg-white border border-slate-100 rounded-[32px] p-8 text-left transition-all hover:shadow-xl hover:shadow-slate-200/50 group">
                            <div className="w-10 h-6 rounded-full bg-slate-100 flex items-center justify-center text-xs font-black text-slate-400 mb-6 group-hover:bg-slate-900 group-hover:text-white transition-colors">01</div>
                            <h3 className="text-2xl font-bold mb-3">Connect your calendar</h3>
                            <p className="text-slate-500 font-medium leading-relaxed mb-8">
                                We'll handle all the cross-referencing, so you don't have to worry about double bookings.
                            </p>
                            <div className="relative h-48 bg-slate-50 rounded-2xl overflow-hidden flex items-center justify-center border border-slate-100">
                                {/* Visual representation */}
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="w-24 h-24 rounded-full border border-slate-200 flex items-center justify-center bg-white shadow-xl z-10 font-bold text-xs">Cal.com</div>
                                    <div className="absolute w-40 h-40 rounded-full border border-slate-200/50 animate-pulse" />
                                    <div className="absolute top-8 left-8 w-8 h-8 rounded-lg bg-blue-500 flex items-center justify-center text-white shadow-lg"><CalendarIcon size={16} /></div>
                                    <div className="absolute bottom-8 right-8 w-8 h-8 rounded-lg bg-red-500 flex items-center justify-center text-white shadow-lg"><CalendarIcon size={16} /></div>
                                </div>
                            </div>
                        </div>

                        {/* Step 2 */}
                        <div className="bg-white border border-slate-100 rounded-[32px] p-8 text-left transition-all hover:shadow-xl hover:shadow-slate-200/50 group">
                            <div className="w-10 h-6 rounded-full bg-slate-100 flex items-center justify-center text-xs font-black text-slate-400 mb-6 group-hover:bg-slate-900 group-hover:text-white transition-colors">02</div>
                            <h3 className="text-2xl font-bold mb-3">Set your availability</h3>
                            <p className="text-slate-500 font-medium leading-relaxed mb-8">
                                Want to block off weekends? Set up any buffers? We make that easy.
                            </p>
                            <div className="bg-white border border-slate-100 rounded-2xl p-4 shadow-sm space-y-3 font-mono text-[10px]">
                                <div className="flex items-center justify-between pb-2 border-b border-slate-50">
                                    <div className="flex gap-2">
                                        <div className="w-6 h-3 bg-slate-900 rounded-full" />
                                        <span className="font-bold">Mon</span>
                                    </div>
                                    <div className="flex gap-1 items-center">
                                        <div className="bg-slate-50 px-2 py-0.5 rounded border border-slate-100">8:30 am</div>
                                        <span>-</span>
                                        <div className="bg-slate-50 px-2 py-0.5 rounded border border-slate-100">5:00 pm</div>
                                    </div>
                                </div>
                                <div className="flex items-center justify-between pb-2 border-b border-slate-50">
                                    <div className="flex gap-2">
                                        <div className="w-6 h-3 bg-slate-900 rounded-full" />
                                        <span className="font-bold">Tue</span>
                                    </div>
                                    <div className="flex gap-1 items-center">
                                        <div className="bg-slate-50 px-2 py-0.5 rounded border border-slate-100">9:00 am</div>
                                        <span>-</span>
                                        <div className="bg-slate-50 px-2 py-0.5 rounded border border-slate-100">6:30 pm</div>
                                    </div>
                                </div>
                                <div className="flex items-center justify-between">
                                    <div className="flex gap-2">
                                        <div className="w-6 h-3 bg-slate-900 rounded-full" />
                                        <span className="font-bold">Wed</span>
                                    </div>
                                    <div className="flex gap-1 items-center">
                                        <div className="bg-slate-50 px-2 py-0.5 rounded border border-slate-100">10:00 am</div>
                                        <span>-</span>
                                        <div className="bg-slate-50 px-2 py-0.5 rounded border border-slate-100">7:00 pm</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Step 3 */}
                        <div className="bg-white border border-slate-100 rounded-[32px] p-8 text-left transition-all hover:shadow-xl hover:shadow-slate-200/50 group">
                            <div className="w-10 h-6 rounded-full bg-slate-100 flex items-center justify-center text-xs font-black text-slate-400 mb-6 group-hover:bg-slate-900 group-hover:text-white transition-colors">03</div>
                            <h3 className="text-2xl font-bold mb-3">Choose how to meet</h3>
                            <p className="text-slate-500 font-medium leading-relaxed mb-8">
                                It could be a video chat, phone call, or a walk in the park!
                            </p>
                            <div className="h-48 bg-slate-900 rounded-2xl p-6 relative overflow-hidden flex flex-col justify-end">
                                <div className="flex gap-3 relative z-10">
                                    <div className="w-10 h-10 rounded-full bg-slate-700/50 animate-pulse border border-slate-600" />
                                    <div className="w-10 h-10 rounded-full bg-slate-700/50 animate-pulse border border-slate-600" />
                                </div>
                                <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20">
                                    <svg width="200" height="200" viewBox="0 0 200 200">
                                        <circle cx="100" cy="100" r="80" stroke="white" strokeWidth="1" fill="none" strokeDasharray="5 5" />
                                    </svg>
                                </div>
                                <div className="mt-4 flex gap-2">
                                    <div className="w-6 h-6 rounded bg-slate-700" />
                                    <div className="w-6 h-6 rounded bg-slate-700" />
                                    <div className="w-6 h-6 rounded bg-slate-700" />
                                    <div className="w-6 h-6 rounded bg-red-500" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* BENEFITS SECTION */}
            <section className="py-24 bg-[#fcfcfc] border-y border-slate-50">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-20 space-y-4">
                        <div className="inline-flex items-center gap-2 bg-white border border-slate-100 px-4 py-1 rounded-full text-[13px] font-bold text-slate-500 shadow-sm">
                            <Star size={16} />
                            Benefits
                        </div>
                        <h2 className="text-5xl md:text-6xl font-black tracking-tight text-slate-900">
                            Your all-purpose scheduling app
                        </h2>
                        <p className="text-xl text-slate-500 max-w-2xl mx-auto">
                            Discover a variety of our advanced features. Unlimited and free for individuals.
                        </p>
                        <div className="flex justify-center gap-4 pt-4">
                            <button className="bg-slate-900 text-white px-8 py-3 rounded-xl font-bold hover:scale-[1.02] transition-all">Get started</button>
                            <button className="bg-white text-slate-800 border border-slate-200 px-8 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-slate-50 transition-all">
                                Book a demo <ChevronDown size={14} />
                            </button>
                        </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8 mb-8">
                        {/* Benefit 1 */}
                        <div className="bg-white border border-slate-100 rounded-[32px] p-10">
                            <h3 className="text-2xl font-bold mb-4">Avoid meeting overload</h3>
                            <p className="text-slate-500 font-medium leading-relaxed mb-10 max-w-sm">
                                Only get booked when you want to. Set daily, weekly or monthly limits and add buffers around your events to allow you to focus or take a break.
                            </p>
                            <div className="bg-slate-50/50 border border-slate-100 rounded-2xl p-8 space-y-6">
                                <h4 className="font-bold text-sm">Notice and buffers</h4>
                                <div className="space-y-4">
                                    <div className="space-y-1.5">
                                        <label className="text-xs font-bold text-slate-400">Minimum notice</label>
                                        <div className="w-full h-10 bg-white border border-slate-200 rounded-lg flex items-center justify-between px-3 text-sm font-semibold">
                                            1 hour <ChevronDown size={14} />
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-1.5">
                                            <label className="text-xs font-bold text-slate-400">Buffer before event</label>
                                            <div className="w-full h-10 bg-white border border-slate-200 rounded-lg flex items-center justify-between px-3 text-sm font-semibold">
                                                15 mins <ChevronDown size={14} />
                                            </div>
                                        </div>
                                        <div className="space-y-1.5">
                                            <label className="text-xs font-bold text-slate-400">Buffer after event</label>
                                            <div className="w-full h-10 bg-white border border-slate-200 rounded-lg flex items-center justify-between px-3 text-sm font-semibold">
                                                15 mins <ChevronDown size={14} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="text-xs font-bold text-slate-400">Time-slot intervals</label>
                                        <div className="w-full h-10 bg-white border border-slate-200 rounded-lg flex items-center justify-between px-3 text-sm font-semibold">
                                            5 mins <ChevronDown size={14} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Benefit 2 */}
                        <div className="bg-white border border-slate-100 rounded-[32px] p-10 flex flex-col h-full">
                            <h3 className="text-2xl font-bold mb-4">Stand out with a custom booking link</h3>
                            <p className="text-slate-500 font-medium leading-relaxed mb-10 max-w-sm">
                                Customize your booking link so it’s short and easy to remember for your bookers. No more long, complicated links one can easily forget.
                            </p>
                            <div className="mt-auto bg-white border border-slate-100 rounded-2xl p-6 shadow-xl shadow-slate-200/50 relative overflow-hidden">
                                <div className="absolute top-0 right-0 p-4">
                                    <div className="bg-slate-900 text-white text-[10px] font-black px-3 py-1 rounded-full shadow-lg">cal.com/keith</div>
                                </div>
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-8 h-8 rounded-full bg-slate-200" />
                                    <div>
                                        <p className="text-[10px] font-bold text-slate-400 uppercase">Keith Williams</p>
                                        <p className="text-sm font-black text-slate-900">Engineering Deep-Dive</p>
                                    </div>
                                </div>
                                <p className="text-[10px] text-slate-400 font-bold mb-6 leading-relaxed max-w-[200px]">
                                    Have technical questions or want to dive into Cal.com's architecture, infrastructure, or roadmap?
                                </p>
                                <div className="flex gap-2 font-black text-[10px]">
                                    <div className="px-2 py-0.5 rounded bg-slate-50 text-slate-300">15m</div>
                                    <div className="px-2 py-0.5 rounded bg-slate-50 text-slate-300">30m</div>
                                    <div className="px-2 py-0.5 rounded bg-slate-50 text-slate-300">45m</div>
                                    <div className="px-2 py-1 rounded border border-slate-100 shadow-sm">1h</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* TESTIMONIALS */}
            <section className="py-32 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-20 space-y-4">
                        <div className="inline-flex items-center gap-2 bg-slate-50 border border-slate-100 px-4 py-1 rounded-full text-[13px] font-bold text-slate-500 shadow-sm">
                            <Mail size={16} />
                            Testimonials
                        </div>
                        <h2 className="text-5xl md:text-6xl font-black tracking-tight text-slate-900">
                            Don’t just take our word for it
                        </h2>
                        <p className="text-xl text-slate-500 max-w-2xl mx-auto">
                            Our users are our best ambassadors. Discover why we're the top choice for scheduling meetings.
                        </p>
                    </div>

                    <div className="flex flex-col md:flex-row gap-8 overflow-hidden">
                        <div className="bg-white border border-slate-100 rounded-[32px] p-10 flex-1 relative group">
                            <div className="absolute -top-4 -left-4 text-slate-100 opacity-20 group-hover:opacity-40 transition-opacity">
                                <svg width="80" height="80" viewBox="0 0 24 24" fill="currentColor"><path d="M14.017 21L14.017 18C14.017 16.8954 14.9124 16 16.017 16H19.017V14H17.017C15.9124 14 15.017 13.1046 15.017 12V9C15.017 7.89543 15.9124 7 17.017 7H20.017V10H18.017V12H20.017C21.1216 12 22.017 12.8954 22.017 14V17C22.017 19.2091 20.2261 21 18.017 21H14.017ZM2 21L2 18C2 16.8954 2.89543 16 4 16H7V14H5C3.89543 14 3 13.1046 3 12V9C3 7.89543 3.89543 7 5 7H8V10H6V12H8C9.10457 12 10 12.8954 10 14V17C10 19.2091 8.20914 21 6 21H2Z"></path></svg>
                            </div>
                            <p className="text-2xl font-bold text-slate-900 leading-[1.4] mb-10 relative z-10">
                                "Just gave it a go and it's definitely the easiest meeting I've ever scheduled!"
                            </p>
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-lg bg-slate-900 overflow-hidden">
                                    <img src="https://avatar.vercel.sh/aria" alt="Aria" />
                                </div>
                                <div>
                                    <p className="font-bold text-sm">Aria Minaei</p>
                                    <p className="text-xs text-slate-400 font-bold">CEO, Theatre.js</p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white border border-slate-100 rounded-[32px] p-10 flex-1 relative group bg-gradient-to-br from-white to-slate-50/50">
                            <p className="text-2xl font-bold text-slate-900 leading-[1.4] mb-10 relative z-10">
                                "I finally made the move to Cal.com after I couldn't find how to edit events in Calendly dashboard."
                            </p>
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-lg bg-slate-900 overflow-hidden">
                                    <img src="https://avatar.vercel.sh/ant" alt="Ant" />
                                </div>
                                <div>
                                    <p className="font-bold text-sm">Ant Wilson</p>
                                    <p className="text-xs text-slate-400 font-bold">Co-Founder & CTO, Supabase</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA SECTION */}
            <section className="py-32 px-6">
                <div className="max-w-4xl mx-auto bg-slate-900 rounded-[40px] p-16 text-center text-white relative overflow-hidden group">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                    <div className="relative z-10 space-y-8">
                        <h2 className="text-5xl md:text-6xl font-black tracking-tight leading-tight">
                            Ready to simplify your scheduling?
                        </h2>
                        <p className="text-xl text-slate-400 max-w-xl mx-auto">
                            Join thousands of individuals and teams that use Cal.com to coordinate their meetings effortlessly.
                        </p>
                        <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
                            <Link href="/dashboard" className="bg-white text-slate-900 px-10 py-4 rounded-2xl font-black text-lg hover:scale-[1.05] transition-all">
                                Get started for free
                            </Link>
                            <button className="bg-slate-800 text-white px-10 py-4 rounded-2xl font-black text-lg hover:bg-slate-700 transition-all">
                                Book a demo
                            </button>
                        </div>
                        <p className="text-slate-500 text-sm font-bold">Open source and forever free for individuals.</p>
                    </div>
                </div>
            </section>

            {/* FOOTER */}
            <footer className="py-24 border-t border-slate-100 px-6 bg-white">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-16 mb-20">
                        <div className="col-span-2">
                            <div className="text-2xl font-black tracking-tight mb-6">Cal.com</div>
                            <p className="text-slate-500 font-medium max-w-xs leading-relaxed">
                                Open source scheduling infrastructure for everyone. From individual booking pages to enterprise-ready solutions.
                            </p>
                        </div>
                        <div>
                            <h5 className="font-black text-xs uppercase tracking-widest text-slate-400 mb-6">Product</h5>
                            <ul className="space-y-4 text-[15px] font-bold text-slate-600">
                                <li className="hover:text-slate-900 cursor-pointer transition-colors">Enterprise</li>
                                <li className="hover:text-slate-900 cursor-pointer transition-colors">Platform</li>
                                <li className="hover:text-slate-900 cursor-pointer transition-colors">Pricing</li>
                                <li className="hover:text-slate-900 cursor-pointer transition-colors">Self-hosting</li>
                            </ul>
                        </div>
                        <div>
                            <h5 className="font-black text-xs uppercase tracking-widest text-slate-400 mb-6">Resources</h5>
                            <ul className="space-y-4 text-[15px] font-bold text-slate-600">
                                <li className="hover:text-slate-900 cursor-pointer transition-colors">Documentation</li>
                                <li className="hover:text-slate-900 cursor-pointer transition-colors">API Reference</li>
                                <li className="hover:text-slate-900 cursor-pointer transition-colors">Help Center</li>
                                <li className="hover:text-slate-900 cursor-pointer transition-colors">Blog</li>
                            </ul>
                        </div>
                        <div>
                            <h5 className="font-black text-xs uppercase tracking-widest text-slate-400 mb-6">Company</h5>
                            <ul className="space-y-4 text-[15px] font-bold text-slate-600">
                                <li className="hover:text-slate-900 cursor-pointer transition-colors">About</li>
                                <li className="hover:text-slate-900 cursor-pointer transition-colors">Twitter</li>
                                <li className="hover:text-slate-900 cursor-pointer transition-colors">GitHub</li>
                                <li className="hover:text-slate-900 cursor-pointer transition-colors">Privacy</li>
                            </ul>
                        </div>
                    </div>

                    <div className="pt-12 border-t border-slate-50 flex flex-col md:flex-row justify-between items-center gap-8">
                        <div className="flex gap-8 text-[13px] font-bold text-slate-400">
                            <span>&copy; 2026 Cal.com, Inc.</span>
                            <span className="hover:text-slate-900 cursor-pointer transition-colors">Privacy</span>
                            <span className="hover:text-slate-900 cursor-pointer transition-colors">Terms</span>
                            <span className="hover:text-slate-900 cursor-pointer transition-colors">Security</span>
                        </div>
                        <div className="flex items-center gap-6">
                            <div className="bg-slate-50 px-4 py-1.5 rounded-full text-xs font-black text-slate-400 flex items-center gap-2 border border-slate-100">
                                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                                All systems normal
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </main>
    );
}