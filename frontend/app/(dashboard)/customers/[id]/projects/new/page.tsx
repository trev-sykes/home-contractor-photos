"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { api } from "@/lib/api";
import Link from "next/link";
import { FaFolder, FaMapMarkerAlt } from "react-icons/fa";

export default function NewProjectPage() {
    const { id } = useParams<{ id: string }>();
    const router = useRouter();
    const [form, setForm] = useState({ name: "", address: "" });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async () => {
        if (!form.name.trim()) { setError("Project name is required."); return; }
        setLoading(true);
        setError("");
        try {
            await api.post(`/api/customers/${id}/projects`, form);
            router.push(`/customers/${id}`);
        } catch {
            setError("Failed to create project. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter") handleSubmit();
    };

    return (
        <div className="page">
            <div className="max-w-lg mx-auto space-y-5 sm:space-y-6">

                {/* Back */}
                <Link
                    href={`/customers/${id}`}
                    className="inline-flex items-center gap-2 text-sm font-medium transition hover:opacity-70"
                    style={{ color: "var(--color-text-faint)" }}
                >
                    ← Back to Customer
                </Link>

                {/* Header */}
                <div>
                    <p className="section-eyebrow">New</p>
                    <h1 className="font-display text-3xl sm:text-4xl font-extrabold text-slate-900">
                        Create Project
                    </h1>
                    <p className="text-slate-500 text-sm mt-1">
                        Add a project to start uploading before &amp; after photos.
                    </p>
                </div>

                {/* Form Card */}
                <div className="card card-body space-y-5">

                    {error && <div className="alert-error">{error}</div>}

                    <div>
                        <label className="input-label">
                            Project Name <span style={{ color: "var(--color-danger)" }}>*</span>
                        </label>
                        <div className="relative">
                            <FaFolder
                                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-xs"
                                style={{ color: "#94a3b8" }}
                            />
                            <input
                                type="text"
                                placeholder="Kitchen Remodel"
                                value={form.name}
                                onChange={(e) => setForm({ ...form, name: e.target.value })}
                                onKeyDown={handleKeyDown}
                                className="input pl-9"
                                autoCapitalize="words"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="input-label">Address</label>
                        <div className="relative">
                            <FaMapMarkerAlt
                                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-xs"
                                style={{ color: "#94a3b8" }}
                            />
                            <input
                                type="text"
                                placeholder="123 Main St, Springfield"
                                value={form.address}
                                onChange={(e) => setForm({ ...form, address: e.target.value })}
                                onKeyDown={handleKeyDown}
                                className="input pl-9"
                                autoCapitalize="words"
                                autoComplete="street-address"
                            />
                        </div>
                    </div>

                    <div style={{ borderTop: "1px solid #f1f5f9", paddingTop: "0.5rem" }}>
                        <button
                            onClick={handleSubmit}
                            disabled={loading || !form.name.trim()}
                            className="btn-primary w-full"
                            style={{ padding: "0.875rem" }}
                        >
                            {loading ? "Creating..." : "Create Project →"}
                        </button>
                    </div>

                </div>

            </div>
        </div>
    );
}