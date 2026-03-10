import Link from "next/link";
import { FaEnvelope, FaClock, FaComments } from "react-icons/fa";

export default function ContactPage() {
    const email = "support@homecontractorphotos.com";

    return (
        <div className="max-w-2xl mx-auto px-4 sm:px-6 py-12 sm:py-20">

            {/* Hero */}
            <div className="text-center mb-10 sm:mb-14">
                <p className="section-eyebrow">Contact</p>
                <h1 className="font-display text-4xl sm:text-5xl font-extrabold text-slate-900 mb-4">
                    We're here to help
                </h1>
                <p className="text-slate-500 text-lg">
                    Have a question, issue, or just want to say hi? Send us an email and we'll get back to you fast.
                </p>
            </div>

            {/* Email card */}
            <div
                className="card card-body text-center mb-6"
                style={{ border: "2px solid #fbbf24" }}
            >
                <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4"
                    style={{ backgroundColor: "#fffbeb" }}
                >
                    <FaEnvelope className="text-2xl" style={{ color: "#f59e0b" }} />
                </div>
                <h2 className="font-bold text-slate-800 text-lg mb-1">Email Support</h2>
                <p className="text-slate-500 text-sm mb-4">
                    The best way to reach us. We read every email.
                </p>
                <a
                    href={`mailto:${email}`}
                    className="btn-primary w-full justify-center"
                    style={{ padding: "0.875rem" }}
                >
                    <FaEnvelope className="text-xs" />
                    {email}
                </a>
            </div>

            {/* Info cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
                <div className="card card-body text-center space-y-2">
                    <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center mx-auto"
                        style={{ backgroundColor: "#f0f9ff" }}
                    >
                        <FaClock className="text-base" style={{ color: "#0ea5e9" }} />
                    </div>
                    <p className="font-bold text-slate-800 text-sm">Response Time</p>
                    <p className="text-slate-500 text-xs leading-relaxed">
                        We typically respond within 24 hours on business days.
                    </p>
                </div>
                <div className="card card-body text-center space-y-2">
                    <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center mx-auto"
                        style={{ backgroundColor: "#f0fdf4" }}
                    >
                        <FaComments className="text-base" style={{ color: "#22c55e" }} />
                    </div>
                    <p className="font-bold text-slate-800 text-sm">What to include</p>
                    <p className="text-slate-500 text-xs leading-relaxed">
                        Your account email and a description of what you need help with.
                    </p>
                </div>
            </div>

            {/* Common topics */}
            <div className="card card-body space-y-4">
                <h3 className="font-bold text-slate-800">Common topics</h3>
                <div className="space-y-3">
                    {[
                        { topic: "Billing & subscription questions", hint: "Include your account email" },
                        { topic: "Technical issues or bugs", hint: "Describe what happened and what you expected" },
                        { topic: "Feature requests", hint: "We love hearing what would make your workflow better" },
                        { topic: "Account deletion or data export", hint: "We'll handle it promptly" },
                    ].map(({ topic, hint }) => (
                        <div
                            key={topic}
                            className="flex items-start gap-3 pb-3"
                            style={{ borderBottom: "1px solid #f1f5f9" }}
                        >
                            <div
                                className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0"
                                style={{ backgroundColor: "#fbbf24" }}
                            />
                            <div>
                                <p className="font-semibold text-slate-700 text-sm">{topic}</p>
                                <p className="text-slate-400 text-xs mt-0.5">{hint}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

        </div>
    );
}