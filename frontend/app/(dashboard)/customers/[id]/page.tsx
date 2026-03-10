"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { api } from "../../../../lib/api";
import Link from "next/link";
import {
    FaFolder, FaPlus, FaTrash, FaEdit,
    FaEnvelope, FaPhone, FaArrowRight, FaCamera
} from "react-icons/fa";

interface Project {
    id: string;
    name: string;
    address?: string;
    createdAt: string;
    _count: { photos: number };
}

interface Customer {
    id: string;
    name: string;
    email?: string;
    phone?: string;
    projects: Project[];
}

export default function CustomerPage() {
    const { id } = useParams<{ id: string }>();
    const router = useRouter();

    const [customer, setCustomer] = useState<Customer | null>(null);
    const [loading, setLoading] = useState(true);

    const [editing, setEditing] = useState(false);
    const [form, setForm] = useState({ name: "", email: "", phone: "" });
    const [saving, setSaving] = useState(false);
    const [editError, setEditError] = useState("");

    const [confirmDelete, setConfirmDelete] = useState(false);
    const [deleting, setDeleting] = useState(false);

    useEffect(() => {
        api.get(`/api/customers/${id}`)
            .then((res) => {
                setCustomer(res.data);
                setForm({
                    name: res.data.name,
                    email: res.data.email ?? "",
                    phone: res.data.phone ?? "",
                });
            })
            .catch(console.error)
            .finally(() => setLoading(false));
    }, [id]);

    const handleSave = async () => {
        if (!form.name.trim()) { setEditError("Name is required."); return; }
        setSaving(true);
        setEditError("");
        try {
            await api.put(`/api/customers/${id}`, form);
            setCustomer((prev) => prev ? { ...prev, ...form } : prev);
            setEditing(false);
        } catch {
            setEditError("Failed to save. Please try again.");
        } finally {
            setSaving(false);
        }
    };

    const handleDelete = async () => {
        setDeleting(true);
        try {
            await api.delete(`/api/customers/${id}`);
            router.push("/customers");
        } catch {
            setDeleting(false);
            setConfirmDelete(false);
        }
    };

    if (loading) return (
        <div className="page flex items-center justify-center">
            <p style={{ color: "var(--color-text-faint)" }}>Loading...</p>
        </div>
    );

    if (!customer) return (
        <div className="page flex items-center justify-center">
            <p style={{ color: "var(--color-danger)" }}>Customer not found.</p>
        </div>
    );

    return (
        <div className="page">
            <div className="max-w-4xl mx-auto space-y-5 sm:space-y-6">

                {/* Back */}
                <Link
                    href="/customers"
                    className="inline-flex items-center gap-2 text-sm font-medium transition hover:opacity-70"
                    style={{ color: "var(--color-text-faint)" }}
                >
                    ← Back to Customers
                </Link>

                {/* Customer Card */}
                <div className="card card-body">
                    {editing ? (
                        <div className="space-y-5">
                            <h2 className="font-display text-xl sm:text-2xl font-extrabold text-slate-800">
                                Edit Customer
                            </h2>

                            {editError && <div className="alert-error">{editError}</div>}

                            <div>
                                <label className="input-label">
                                    Name <span style={{ color: "var(--color-danger)" }}>*</span>
                                </label>
                                <input
                                    type="text"
                                    value={form.name}
                                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                                    className="input"
                                    autoCapitalize="words"
                                />
                            </div>
                            <div>
                                <label className="input-label">Email</label>
                                <input
                                    type="email"
                                    value={form.email}
                                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                                    className="input"
                                    autoCapitalize="none"
                                    autoComplete="email"
                                />
                            </div>
                            <div>
                                <label className="input-label">Phone</label>
                                <input
                                    type="tel"
                                    value={form.phone}
                                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                                    className="input"
                                    inputMode="tel"
                                    autoComplete="tel"
                                />
                            </div>
                            <div
                                className="flex gap-3 pt-2"
                                style={{ borderTop: "1px solid #f1f5f9" }}
                            >
                                <button onClick={handleSave} disabled={saving} className="btn-primary flex-1 sm:flex-none">
                                    {saving ? "Saving..." : "Save Changes"}
                                </button>
                                <button
                                    onClick={() => { setEditing(false); setEditError(""); }}
                                    className="btn-secondary flex-1 sm:flex-none"
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {/* Top row: avatar + name + actions */}
                            <div className="flex items-start justify-between gap-3">
                                <div className="flex items-center gap-3 sm:gap-5 min-w-0">
                                    {/* Avatar */}
                                    <div
                                        className="w-12 h-12 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center font-black text-xl sm:text-2xl flex-shrink-0"
                                        style={{
                                            backgroundColor: "rgba(251,191,36,0.12)",
                                            color: "var(--color-amber-dark)",
                                        }}
                                    >
                                        {customer.name.charAt(0).toUpperCase()}
                                    </div>
                                    <div className="min-w-0">
                                        <h1 className="font-display text-2xl sm:text-3xl font-extrabold text-slate-900 truncate">
                                            {customer.name}
                                        </h1>
                                        <span
                                            className="text-xs font-semibold px-2.5 py-1 rounded-full mt-1 inline-block"
                                            style={{ backgroundColor: "#f1f5f9", color: "#64748b" }}
                                        >
                                            {customer.projects.length} project{customer.projects.length !== 1 ? "s" : ""}
                                        </span>
                                    </div>
                                </div>

                                {/* Action buttons */}
                                <div className="flex gap-2 flex-shrink-0">
                                    <button
                                        onClick={() => setEditing(true)}
                                        className="btn-secondary btn-sm flex items-center gap-1.5"
                                    >
                                        <FaEdit className="text-xs" />
                                        <span className="hidden sm:inline">Edit</span>
                                    </button>
                                    <button
                                        onClick={() => setConfirmDelete(true)}
                                        className="btn-sm flex items-center gap-1.5 transition"
                                        style={{
                                            border: "1px solid #fecaca",
                                            color: "#dc2626",
                                            borderRadius: "0.75rem",
                                            padding: "0.375rem 0.75rem",
                                            fontWeight: 600,
                                            fontSize: "0.75rem",
                                            backgroundColor: "transparent",
                                        }}
                                        onMouseEnter={e => (e.currentTarget.style.backgroundColor = "#fef2f2")}
                                        onMouseLeave={e => (e.currentTarget.style.backgroundColor = "transparent")}
                                    >
                                        <FaTrash className="text-xs" />
                                        <span className="hidden sm:inline">Delete</span>
                                    </button>
                                </div>
                            </div>

                            {/* Contact info row */}
                            {(customer.email || customer.phone) && (
                                <div
                                    className="flex flex-wrap items-center gap-3 sm:gap-4 pt-3"
                                    style={{ borderTop: "1px solid #f1f5f9" }}
                                >
                                    {customer.email && (
                                        <a
                                            href={`mailto:${customer.email}`}
                                            className="flex items-center gap-1.5 text-sm text-slate-400 hover:text-amber-600 transition truncate"
                                        >
                                            <FaEnvelope className="text-xs flex-shrink-0" />
                                            <span className="truncate">{customer.email}</span>
                                        </a>
                                    )}
                                    {customer.phone && (
                                        <a
                                            href={`tel:${customer.phone}`}
                                            className="flex items-center gap-1.5 text-sm text-slate-400 hover:text-amber-600 transition"
                                        >
                                            <FaPhone className="text-xs flex-shrink-0" />
                                            {customer.phone}
                                        </a>
                                    )}
                                </div>
                            )}
                        </div>
                    )}
                </div>

                {/* Delete Confirmation */}
                {confirmDelete && (
                    <div className="rounded-2xl p-5 sm:p-6 bg-red-50 border border-red-200">
                        <p className="font-bold text-red-800 mb-1">Delete {customer.name}?</p>
                        <p className="text-red-600 text-sm mb-4">
                            This will permanently delete the customer and all their projects and photos. This cannot be undone.
                        </p>
                        <div className="flex gap-3">
                            <button onClick={handleDelete} disabled={deleting} className="btn-danger btn-sm flex-1 sm:flex-none">
                                {deleting ? "Deleting..." : "Yes, delete"}
                            </button>
                            <button onClick={() => setConfirmDelete(false)} className="btn-secondary btn-sm flex-1 sm:flex-none">
                                Cancel
                            </button>
                        </div>
                    </div>
                )}

                {/* Projects Section */}
                <div className="space-y-3 sm:space-y-4">
                    <div className="flex justify-between items-center">
                        <h2 className="font-display text-xl sm:text-2xl font-extrabold text-slate-900">
                            Projects
                        </h2>
                        <Link
                            href={`/customers/${id}/projects/new`}
                            className="btn-primary btn-sm flex items-center gap-1.5"
                        >
                            <FaPlus className="text-xs" />
                            <span className="hidden sm:inline">New Project</span>
                            <span className="sm:hidden">New</span>
                        </Link>
                    </div>

                    {customer.projects.length === 0 ? (
                        <div className="card card-body text-center py-14 sm:py-16">
                            <div
                                className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4"
                                style={{ backgroundColor: "#f1f5f9" }}
                            >
                                <FaFolder className="text-xl" style={{ color: "#94a3b8" }} />
                            </div>
                            <p className="font-bold text-slate-700 mb-1">No projects yet</p>
                            <p className="text-slate-500 text-sm mb-5 px-4">
                                Create a project to start uploading photos.
                            </p>
                            <Link
                                href={`/customers/${id}/projects/new`}
                                className="btn-primary inline-flex mx-auto"
                            >
                                <FaPlus className="text-xs" /> Create First Project
                            </Link>
                        </div>
                    ) : (
                        <div className="space-y-2 sm:space-y-3">
                            {customer.projects.map((p) => (
                                <Link
                                    key={p.id}
                                    href={`/customers/${id}/projects/${p.id}`}
                                    className="card card-body flex items-center justify-between gap-3 sm:gap-4 hover:shadow-md transition group"
                                    style={{ padding: "1rem 1.25rem" }}
                                >
                                    <div className="flex items-center gap-3 sm:gap-4 min-w-0">
                                        <div
                                            className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                                            style={{ backgroundColor: "#f0fdf4" }}
                                        >
                                            <FaFolder className="text-sm" style={{ color: "#22c55e" }} />
                                        </div>
                                        <div className="min-w-0">
                                            <p className="font-bold text-slate-800 group-hover:text-amber-600 transition truncate text-sm sm:text-base">
                                                {p.name}
                                            </p>
                                            <p className="text-xs sm:text-sm text-slate-400 truncate">
                                                {p.address ?? "No address"} · {new Date(p.createdAt).toLocaleDateString("en-US", {
                                                    month: "short", day: "numeric", year: "numeric"
                                                })}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-3 sm:gap-4 flex-shrink-0">
                                        <span
                                            className="hidden sm:flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full"
                                            style={{ backgroundColor: "#f1f5f9", color: "#64748b" }}
                                        >
                                            <FaCamera className="text-xs" />
                                            {p._count.photos} photo{p._count.photos !== 1 ? "s" : ""}
                                        </span>
                                        <FaArrowRight className="text-slate-300 group-hover:text-amber-400 transition text-sm" />
                                    </div>
                                </Link>
                            ))}
                        </div>
                    )}
                </div>

            </div>
        </div>
    );
}