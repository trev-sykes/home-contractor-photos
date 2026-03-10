import Link from "next/link";

export default function AboutPage() {
    return (
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12 sm:py-20">

            {/* Hero */}
            <div className="mb-10 sm:mb-14">
                <p className="section-eyebrow">About</p>
                <h1 className="font-display text-4xl sm:text-5xl font-extrabold text-slate-900 mb-5">
                    Built for contractors,<br className="hidden sm:block" /> by someone who gets it.
                </h1>
                <p className="text-slate-500 text-lg leading-relaxed">
                    Home Contractor Photos was born from a simple frustration — contractors were losing jobs
                    because they couldn't easily show clients what their work actually looked like.
                </p>
            </div>

            {/* Story */}
            <div className="space-y-6 text-slate-600 leading-relaxed text-base mb-12 sm:mb-16">
                <p>
                    Most contractors do great work. But when a homeowner is choosing between three bids,
                    the contractor who can show a polished before-and-after photo gallery almost always wins —
                    even if their price is higher.
                </p>
                <p>
                    The problem is that existing tools are either too complicated, too expensive, or built
                    for photographers — not contractors standing on a job site with muddy boots and a phone
                    in their pocket.
                </p>
                <p>
                    So we built something different. Home Contractor Photos is intentionally simple.
                    You upload photos, tag them as before, after, or progress, and share a link with your
                    client. That's it. No learning curve. No monthly software training. Just a clean,
                    professional presentation of your work.
                </p>
                <p>
                    We believe every contractor — whether you're a one-person operation or managing a crew
                    of twenty — deserves tools that make their business look as good as their work actually is.
                </p>
            </div>

            {/* Values */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12 sm:mb-16">
                {[
                    {
                        emoji: "🔨",
                        title: "Built for the field",
                        desc: "Designed to be used on a phone, on a job site, with one hand.",
                    },
                    {
                        emoji: "💡",
                        title: "Radically simple",
                        desc: "If it takes more than a minute to figure out, we redesign it.",
                    },
                    {
                        emoji: "🤝",
                        title: "Honest pricing",
                        desc: "One flat price. No hidden fees. No tiers. No surprises.",
                    },
                ].map(({ emoji, title, desc }) => (
                    <div key={title} className="card card-body text-center space-y-2">
                        <span className="text-3xl">{emoji}</span>
                        <p className="font-bold text-slate-800 text-sm">{title}</p>
                        <p className="text-slate-500 text-xs leading-relaxed">{desc}</p>
                    </div>
                ))}
            </div>

            {/* CTA */}
            <div
                className="rounded-2xl p-7 sm:p-10 text-center"
                style={{ background: "linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)" }}
            >
                <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-slate-900 mb-2">
                    Give it a try
                </h2>
                <p className="text-slate-800 text-sm mb-5">
                    14-day free trial. No credit card. Cancel anytime.
                </p>
                <Link
                    href="/register"
                    className="inline-flex items-center gap-2 font-bold text-sm px-6 py-3 rounded-xl transition"
                    style={{ backgroundColor: "#020617", color: "#fbbf24" }}
                >
                    Get Started Free →
                </Link>
            </div>

        </div>
    );
}