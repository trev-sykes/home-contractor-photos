"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { register } from "@/lib/auth";
import Link from "next/link";

export default function RegisterPage() {
    const router = useRouter();
    const [form, setForm] = useState({ companyName: "", email: "", password: "" });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleRegister = async () => {
        setError("");
        if (!form.companyName.trim()) { setError("Company name is required."); return; }
        if (!form.email.trim()) { setError("Email is required."); return; }
        if (form.password.length < 8) { setError("Password must be at least 8 characters."); return; }

        setLoading(true);
        try {
            await register(form.email, form.password, form.companyName);
            router.push("/login");
        } catch (err: any) {
            setError(err?.response?.data?.error || "Registration failed. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter") handleRegister();
    };

    const filled = form.companyName && form.email && form.password.length >= 8;

    return (
        <div
            className="min-h-screen flex items-center justify-center px-4 py-12"
            style={{ backgroundColor: "var(--color-bg)" }}
        >
            {/* Ambient glow */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div
                    className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full blur-3xl"
                    style={{ backgroundColor: "rgba(251,191,36,0.06)" }}
                />
            </div>

            <div className="relative w-full max-w-md">

                {/* Logo + heading */}
                <div className="flex flex-col items-center mb-8 sm:mb-10">
                    <Link href="/" className="flex items-center gap-2.5 mb-6 sm:mb-8">
                        <div
                            className="w-9 h-9 rounded-xl flex items-center justify-center font-black text-sm flex-shrink-0"
                            style={{ backgroundColor: "var(--color-amber)", color: "var(--color-bg)" }}
                        >
                            HC
                        </div>
                        <span className="font-bold text-base sm:text-lg" style={{ color: "var(--color-text)" }}>
                            Home Contractor Photos
                        </span>
                    </Link>
                    <h1
                        className="font-display text-3xl sm:text-4xl font-extrabold mb-2 text-center"
                        style={{ color: "var(--color-text)" }}
                    >
                        Start your free trial.
                    </h1>
                    <p className="text-sm text-center" style={{ color: "var(--color-text-muted)" }}>
                        14 days free — no credit card required
                    </p>
                </div>

                {/* Card */}
                <div
                    className="rounded-2xl p-6 sm:p-8"
                    style={{
                        backgroundColor: "var(--color-surface)",
                        border: "1px solid var(--color-border-subtle)",
                    }}
                >
                    {error && <div className="alert-error mb-6">{error}</div>}

                    <div className="space-y-5">
                        <div>
                            <label className="input-label-dark">Company Name</label>
                            <input
                                type="text"
                                placeholder="Smith Roofing Co."
                                value={form.companyName}
                                onChange={(e) => setForm({ ...form, companyName: e.target.value })}
                                onKeyDown={handleKeyDown}
                                className="input-dark"
                                autoComplete="organization"
                                autoCapitalize="words"
                            />
                        </div>

                        <div>
                            <label className="input-label-dark">Email</label>
                            <input
                                type="email"
                                placeholder="you@company.com"
                                value={form.email}
                                onChange={(e) => setForm({ ...form, email: e.target.value })}
                                onKeyDown={handleKeyDown}
                                className="input-dark"
                                autoComplete="email"
                                autoCapitalize="none"
                            />
                        </div>

                        <div>
                            <label className="input-label-dark">Password</label>
                            <input
                                type="password"
                                placeholder="Min. 8 characters"
                                value={form.password}
                                onChange={(e) => setForm({ ...form, password: e.target.value })}
                                onKeyDown={handleKeyDown}
                                className="input-dark"
                                autoComplete="new-password"
                            />
                            {form.password.length > 0 && (
                                <div className="mt-2 flex gap-1">
                                    {[1, 2, 3].map((level) => (
                                        <div
                                            key={level}
                                            className="h-1 flex-1 rounded-full transition-all duration-300"
                                            style={{
                                                backgroundColor:
                                                    form.password.length >= level * 4
                                                        ? level === 1 ? "#ef4444"
                                                            : level === 2 ? "#f59e0b"
                                                                : "#22c55e"
                                                        : "var(--color-border)",
                                            }}
                                        />
                                    ))}
                                </div>
                            )}
                        </div>

                        <button
                            onClick={handleRegister}
                            disabled={loading || !filled}
                            className="btn-primary w-full"
                            style={{ padding: "0.875rem" }}
                        >
                            {loading ? "Creating account..." : "Create Free Account →"}
                        </button>
                    </div>

                    {/* Trust signals */}
                    <div className="mt-6 pt-6" style={{ borderTop: "1px solid var(--color-border-subtle)" }}>
                        <div className="flex justify-center gap-4 sm:gap-6 text-xs flex-wrap" style={{ color: "var(--color-text-faint)" }}>
                            {["14-day free trial", "No credit card", "Cancel anytime"].map((item) => (
                                <div key={item} className="flex items-center gap-1">
                                    <span style={{ color: "var(--color-success)" }}>✓</span>
                                    {item}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <p className="text-center text-sm mt-6" style={{ color: "var(--color-text-faint)" }}>
                    Already have an account?{" "}
                    <Link
                        href="/login"
                        className="font-semibold transition hover:opacity-80"
                        style={{ color: "var(--color-amber)" }}
                    >
                        Sign in
                    </Link>
                </p>
            </div>
        </div>
    );
}