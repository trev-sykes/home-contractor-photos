import Link from "next/link";
import { FaCheck } from "react-icons/fa";

const FEATURES = [
    "Unlimited photos",
    "Unlimited projects & customers",
    "Before & after sliders",
    "Client share pages",
    "Company branding & logo",
    "Mobile friendly — works on any device",
    "14-day free trial, no credit card required",
    "Cancel anytime",
];

export default function PricingPage() {
    return (
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12 sm:py-20">

            {/* Hero */}
            <div className="text-center mb-12 sm:mb-16">
                <p className="section-eyebrow">Pricing</p>
                <h1 className="font-display text-4xl sm:text-5xl font-extrabold text-slate-900 mb-4">
                    Simple, honest pricing
                </h1>
                <p className="text-slate-500 text-lg max-w-xl mx-auto">
                    One plan. Everything included. No surprises.
                </p>
            </div>

            {/* Pricing card */}
            <div className="max-w-md mx-auto mb-16 sm:mb-20">
                <div
                    className="card card-body relative"
                    style={{ border: "2px solid #fbbf24" }}
                >
                    {/* Badge */}
                    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                        <span
                            className="px-4 py-1 rounded-full text-xs font-bold"
                            style={{ backgroundColor: "#fbbf24", color: "#020617" }}
                        >
                            Most Popular
                        </span>
                    </div>

                    <div className="text-center mb-6 pt-2">
                        <p className="font-bold text-slate-500 text-sm uppercase tracking-wider mb-2">Pro Plan</p>
                        <div className="flex items-end justify-center gap-1">
                            <span className="font-display text-6xl font-extrabold text-slate-900">$14</span>
                            <span className="text-2xl font-bold text-slate-400 mb-2">.99</span>
                            <span className="text-slate-400 mb-2">/month</span>
                        </div>
                        <p className="text-slate-500 text-sm mt-1">After your 14-day free trial</p>
                    </div>

                    <ul className="space-y-3 mb-8">
                        {FEATURES.map((f) => (
                            <li key={f} className="flex items-center gap-3 text-sm text-slate-700">
                                <div
                                    className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
                                    style={{ backgroundColor: "rgba(251,191,36,0.15)" }}
                                >
                                    <FaCheck className="text-xs" style={{ color: "#f59e0b" }} />
                                </div>
                                {f}
                            </li>
                        ))}
                    </ul>

                    <Link
                        href="/register"
                        className="btn-primary w-full justify-center"
                        style={{ padding: "0.875rem" }}
                    >
                        Start 14-Day Free Trial →
                    </Link>

                    <p className="text-center text-xs text-slate-400 mt-3">
                        No credit card required to start
                    </p>
                </div>
            </div>

            {/* FAQ */}
            <div className="max-w-2xl mx-auto">
                <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-slate-900 text-center mb-8">
                    Common questions
                </h2>
                <div className="space-y-4">
                    {[
                        {
                            q: "Do I need a credit card to start?",
                            a: "No. Your 14-day free trial starts immediately with no payment info required. You only need to add a card when you're ready to subscribe.",
                        },
                        {
                            q: "Can I cancel anytime?",
                            a: "Yes. Cancel anytime from your dashboard with one click. You keep access until the end of your billing period with no charges after.",
                        },
                        {
                            q: "What happens to my photos if I cancel?",
                            a: "You can export or download your photos at any time. If you cancel, your account and all data will remain accessible until the end of your billing period.",
                        },
                        {
                            q: "Is there a limit on photos or projects?",
                            a: "No limits. Upload as many photos as you need across as many projects and customers as you have.",
                        },
                        {
                            q: "Can my clients view the photos without an account?",
                            a: "Yes. Share pages are fully public links — your clients don't need to create an account to view their project photos.",
                        },
                    ].map(({ q, a }) => (
                        <div key={q} className="card card-body">
                            <p className="font-bold text-slate-800 mb-2">{q}</p>
                            <p className="text-slate-500 text-sm leading-relaxed">{a}</p>
                        </div>
                    ))}
                </div>
            </div>

        </div>
    );
}