"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { login } from "@/lib/auth";
import Link from "next/link";

export default function LoginPage() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleLogin = async () => {
        setError("");
        setLoading(true);
        try {
            await login(email, password);
            router.push("/dashboard");
        } catch (err: any) {
            setError(err?.response?.data?.error || "Invalid email or password.");
        } finally {
            setLoading(false);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter") handleLogin();
    };

    return (
        <div
            className="min-h-screen flex items-center justify-center px-4"
            style={{ backgroundColor: "var(--color-bg)" }}
        >
            {/* Ambient glow */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full blur-3xl"
                    style={{ backgroundColor: "rgba(251,191,36,0.06)" }} />
            </div>

            <div className="relative w-full max-w-md">

                {/* Logo mark */}
                <div className="flex flex-col items-center mb-10">
                    <Link href="/" className="flex items-center gap-2.5 mb-8">
                        <div className="w-9 h-9 rounded-xl flex items-center justify-center font-black text-sm"
                            style={{ backgroundColor: "var(--color-amber)", color: "var(--color-bg)" }}>
                            HC
                        </div>
                        <span className="font-bold text-lg" style={{ color: "var(--color-text)" }}>
                            Home Contractor Photos
                        </span>
                    </Link>
                    <h1 className="font-display text-4xl font-extrabold mb-2"
                        style={{ color: "var(--color-text)" }}>
                        Welcome back.
                    </h1>
                    <p className="text-sm" style={{ color: "var(--color-text-muted)" }}>
                        Sign in to your account to continue
                    </p>
                </div>

                {/* Card */}
                <div className="rounded-2xl p-8"
                    style={{
                        backgroundColor: "var(--color-surface)",
                        border: "1px solid var(--color-border-subtle)"
                    }}>

                    {error && (
                        <div className="alert-error mb-6">
                            {error}
                        </div>
                    )}

                    <div className="space-y-5">
                        <div>
                            <label className="input-label-dark">Email</label>
                            <input
                                type="email"
                                placeholder="you@company.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                onKeyDown={handleKeyDown}
                                className="input-dark"
                            />
                        </div>

                        <div>
                            <div className="flex justify-between items-center mb-1.5">
                                <label className="input-label-dark" style={{ marginBottom: 0 }}>
                                    Password
                                </label>
                                <Link href="/forgot-password"
                                    className="text-xs font-medium transition hover:opacity-80"
                                    style={{ color: "var(--color-amber)" }}>
                                    Forgot password?
                                </Link>
                            </div>
                            <input
                                type="password"
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                onKeyDown={handleKeyDown}
                                className="input-dark"
                            />
                        </div>

                        <button
                            onClick={handleLogin}
                            disabled={loading || !email || !password}
                            className="btn-primary w-full mt-2"
                            style={{ padding: "0.875rem" }}
                        >
                            {loading ? "Signing in..." : "Sign In →"}
                        </button>
                    </div>
                </div>

                {/* Footer */}
                <p className="text-center text-sm mt-6" style={{ color: "var(--color-text-faint)" }}>
                    Don't have an account?{" "}
                    <Link href="/register"
                        className="font-semibold transition hover:opacity-80"
                        style={{ color: "var(--color-amber)" }}>
                        Start free trial
                    </Link>
                </p>

                {/* Trust line */}
                <p className="text-center text-xs mt-4" style={{ color: "var(--color-text-faint)" }}>
                    14-day free trial · No credit card needed
                </p>
            </div>
        </div>
    );
}