"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/lib/api";
import Link from "next/link";
import { FaUser, FaEnvelope, FaPhone } from "react-icons/fa";

export default function NewCustomerPage() {
    const router = useRouter();
    const [form, setForm] = useState({ name: "", email: "", phone: "" });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async () => {
        if (!form.name.trim()) { setError("Customer name is required."); return; }
        setLoading(true);
        setError("");
        try {
            await api.post("/api/customers", form);
            router.push("/customers");
        } catch (err) {
            console.error(err);
            setError("Failed to create customer. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter") handleSubmit();
    };

    return (
        <div className="page">
            <div className="max-w-lg mx-auto space-y-6">

                {/* Back */}
                <Link
                    href="/customers"
                    className="inline-flex items-center gap-2 text-sm font-medium transition hover:opacity-70"
                    style={{ color: "var(--color-text-faint)" }}
                >
                    ← Back to Customers
                </Link>

                {/* Header */}
                <div>
                    <p className="section-eyebrow">New</p>
                    <h1 className="font-display text-4xl font-extrabold text-slate-900">
                        Add Customer
                    </h1>
                    <p className="text-slate-500 text-sm mt-1">
                        Fill in the details below to create a new customer.
                    </p>
                </div>

                {/* Form Card */}
                <div className="card card-body space-y-5">

                    {error && <div className="alert-error">{error}</div>}

                    <div>
                        <label className="input-label">
                            Name <span style={{ color: "var(--color-danger)" }}>*</span>
                        </label>
                        <div className="relative">
                            <FaUser
                                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-xs"
                                style={{ color: "#94a3b8" }}
                            />
                            <input
                                type="text"
                                placeholder="John Smith"
                                value={form.name}
                                onChange={(e) => setForm({ ...form, name: e.target.value })}
                                onKeyDown={handleKeyDown}
                                className="input pl-9"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="input-label">Email</label>
                        <div className="relative">
                            <FaEnvelope
                                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-xs"
                                style={{ color: "#94a3b8" }}
                            />
                            <input
                                type="email"
                                placeholder="john@example.com"
                                value={form.email}
                                onChange={(e) => setForm({ ...form, email: e.target.value })}
                                onKeyDown={handleKeyDown}
                                className="input pl-9"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="input-label">Phone</label>
                        <div className="relative">
                            <FaPhone
                                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-xs"
                                style={{ color: "#94a3b8" }}
                            />
                            <input
                                type="tel"
                                placeholder="(555) 000-0000"
                                value={form.phone}
                                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                                onKeyDown={handleKeyDown}
                                className="input pl-9"
                            />
                        </div>
                    </div>

                    {/* Divider */}
                    <div style={{ borderTop: "1px solid #f1f5f9", paddingTop: "0.5rem" }}>
                        <button
                            onClick={handleSubmit}
                            disabled={loading || !form.name.trim()}
                            className="btn-primary w-full"
                            style={{ padding: "0.875rem" }}
                        >
                            {loading ? "Creating..." : "Create Customer →"}
                        </button>
                    </div>

                </div>

            </div>
        </div>
    );
}