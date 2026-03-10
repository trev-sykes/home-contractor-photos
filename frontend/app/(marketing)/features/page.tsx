import Link from "next/link";
import {
    FaCamera, FaShareAlt, FaMobile, FaFolder,
    FaPaintBrush, FaArrowRight
} from "react-icons/fa";

const FEATURES = [
    {
        icon: FaCamera,
        color: "#f59e0b",
        bg: "#fffbeb",
        title: "Unlimited Photo Storage",
        desc: "Upload as many before, after, and progress photos as you need. Organized by customer and project so you can always find what you're looking for.",
    },
    {
        icon: FaArrowRight,
        color: "#22c55e",
        bg: "#f0fdf4",
        title: "Before & After Sliders",
        desc: "Drag to reveal the transformation. Interactive before-and-after sliders show clients exactly how far their project has come — far more powerful than side-by-side photos.",
    },
    {
        icon: FaShareAlt,
        color: "#3b82f6",
        bg: "#eff6ff",
        title: "Client Share Pages",
        desc: "Generate a shareable link for any project in one click. Your client gets a clean, professional page showing all their photos — no app download needed.",
    },
    {
        icon: FaFolder,
        color: "#8b5cf6",
        bg: "#f5f3ff",
        title: "Multiple Projects Per Customer",
        desc: "Manage every job under the right customer. Create as many projects as you need — roofing, siding, flooring — all organized and easy to find.",
    },
    {
        icon: FaPaintBrush,
        color: "#ec4899",
        bg: "#fdf2f8",
        title: "Company Branding & Logo",
        desc: "Upload your company logo and it appears on every client share page you send. Your brand, front and center — not ours.",
    },
    {
        icon: FaMobile,
        color: "#0ea5e9",
        bg: "#f0f9ff",
        title: "Mobile Friendly",
        desc: "Take photos on site and upload them right from your phone. The whole app works on any device — no laptop required on the job.",
    },
];

export default function FeaturesPage() {
    return (
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12 sm:py-20">

            {/* Hero */}
            <div className="text-center mb-12 sm:mb-16">
                <p className="section-eyebrow">Features</p>
                <h1 className="font-display text-4xl sm:text-5xl font-extrabold text-slate-900 mb-4">
                    Everything you need.<br className="hidden sm:block" /> Nothing you don't.
                </h1>
                <p className="text-slate-500 text-lg max-w-xl mx-auto">
                    Built specifically for home contractors. No bloat, no complexity — just the tools that help you win more jobs.
                </p>
            </div>

            {/* Feature grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-16 sm:mb-20">
                {FEATURES.map(({ icon: Icon, color, bg, title, desc }) => (
                    <div key={title} className="card card-body space-y-4">
                        <div
                            className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                            style={{ backgroundColor: bg }}
                        >
                            <Icon className="text-lg" style={{ color }} />
                        </div>
                        <div>
                            <h3 className="font-bold text-slate-800 text-base mb-1">{title}</h3>
                            <p className="text-slate-500 text-sm leading-relaxed">{desc}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* CTA */}
            <div
                className="rounded-2xl p-8 sm:p-12 text-center"
                style={{ background: "linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)" }}
            >
                <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-slate-900 mb-3">
                    Ready to try it?
                </h2>
                <p className="text-slate-800 text-base mb-6 max-w-md mx-auto">
                    Start your free 14-day trial today. No credit card required.
                </p>
                <Link
                    href="/register"
                    className="inline-flex items-center gap-2 font-bold text-base px-8 py-4 rounded-xl transition"
                    style={{ backgroundColor: "#020617", color: "#fbbf24" }}
                >
                    Get Started Free →
                </Link>
            </div>

        </div>
    );
}