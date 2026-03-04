"use client";
import React from "react";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { api } from "../../../../lib/api";
import Link from "next/link";
import { FaFolder, FaPlus, FaTrash, FaEdit, FaUser } from "react-icons/fa";

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

    if (loading) return <div className="p-8 text-gray-500">Loading...</div>;
    if (!customer) return <div className="p-8 text-red-500">Customer not found.</div>;

    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <div className="max-w-4xl mx-auto space-y-6">

                <Link href="/customers" className="text-blue-600 hover:text-blue-800 text-sm">
                    ← Back to Customers
                </Link>

                {/* Customer Card */}
                <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8">
                    {editing ? (
                        <div className="space-y-4">
                            <h2 className="text-xl font-bold mb-4">Edit Customer</h2>
                            {editError && (
                                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                                    {editError}
                                </div>
                            )}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Name *</label>
                                <input
                                    type="text"
                                    value={form.name}
                                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                                    className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                                <input
                                    type="email"
                                    value={form.email}
                                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                                    className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                                <input
                                    type="tel"
                                    value={form.phone}
                                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                                    className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <div className="flex gap-3 pt-2">
                                <button
                                    onClick={handleSave}
                                    disabled={saving}
                                    className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-6 py-2.5 rounded-xl font-semibold text-sm transition"
                                >
                                    {saving ? "Saving..." : "Save Changes"}
                                </button>
                                <button
                                    onClick={() => { setEditing(false); setEditError(""); }}
                                    className="border border-gray-300 px-6 py-2.5 rounded-xl font-semibold text-sm transition"
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className="flex justify-between items-start">
                            <div className="flex items-center gap-5">
                                <div className="bg-blue-100 text-blue-600 rounded-full w-14 h-14 flex items-center justify-center font-bold text-2xl">
                                    {customer.name.charAt(0).toUpperCase()}
                                </div>
                                <div>
                                    <h1 className="text-2xl font-bold text-gray-900">{customer.name}</h1>
                                    <p className="text-gray-500 text-sm mt-1">
                                        {customer.email ?? "No email"}
                                        {customer.phone ? ` • ${customer.phone}` : ""}
                                    </p>
                                    <p className="text-gray-400 text-sm mt-0.5">
                                        {customer.projects.length} project{customer.projects.length !== 1 ? "s" : ""}
                                    </p>
                                </div>
                            </div>
                            <div className="flex gap-2">
                                <button
                                    onClick={() => setEditing(true)}
                                    className="flex items-center gap-2 border border-gray-300 hover:border-gray-400 px-4 py-2 rounded-lg text-sm font-medium transition"
                                >
                                    <FaEdit /> Edit
                                </button>
                                <button
                                    onClick={() => setConfirmDelete(true)}
                                    className="flex items-center gap-2 border border-red-200 text-red-600 hover:bg-red-50 px-4 py-2 rounded-lg text-sm font-medium transition"
                                >
                                    <FaTrash /> Delete
                                </button>
                            </div>
                        </div>
                    )}
                </div>

                {/* Delete Confirmation */}
                {confirmDelete && (
                    <div className="bg-red-50 border border-red-200 rounded-2xl p-6">
                        <p className="font-semibold text-red-800 mb-1">Delete {customer.name}?</p>
                        <p className="text-red-600 text-sm mb-4">
                            This will permanently delete the customer and all their projects and photos.
                        </p>
                        <div className="flex gap-3">
                            <button
                                onClick={handleDelete}
                                disabled={deleting}
                                className="bg-red-600 hover:bg-red-700 disabled:bg-red-400 text-white px-5 py-2 rounded-lg text-sm font-semibold transition"
                            >
                                {deleting ? "Deleting..." : "Yes, delete"}
                            </button>
                            <button
                                onClick={() => setConfirmDelete(false)}
                                className="border border-gray-300 px-5 py-2 rounded-lg text-sm font-semibold transition"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                )}

                {/* Projects */}
                <div>
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-bold">Projects</h2>
                        <Link
                            href={`/customers/${id}/projects/new`}
                            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl text-sm font-semibold transition"
                        >
                            <FaPlus /> New Project
                        </Link>
                    </div>

                    {customer.projects.length === 0 ? (
                        <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
                            <FaFolder className="text-gray-300 text-5xl mx-auto mb-3" />
                            <p className="text-gray-500 mb-4">No projects yet</p>
                            <Link
                                href={`/customers/${id}/projects/new`}
                                className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl text-sm font-semibold transition"
                            >
                                Create first project
                            </Link>
                        </div>
                    ) : (
                        <div className="grid gap-3">
                            {customer.projects.map((p) => (
                                <div
                                    key={p.id}
                                    className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm flex justify-between items-center"
                                >
                                    <div className="flex items-center gap-4">
                                        <div className="bg-green-100 text-green-600 rounded-lg w-10 h-10 flex items-center justify-center">
                                            <FaFolder />
                                        </div>
                                        <div>
                                            <p className="font-semibold text-gray-900">{p.name}</p>
                                            <p className="text-sm text-gray-500">
                                                {p.address ?? "No address"} • {new Date(p.createdAt).toLocaleDateString()}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-6">
                                        <span className="text-sm text-gray-400">
                                            {p._count.photos} photo{p._count.photos !== 1 ? "s" : ""}
                                        </span>
                                        <Link
                                            href={`/customers/${id}/projects/${p.id}`}
                                            className="text-blue-600 hover:text-blue-800 font-medium text-sm"
                                        >
                                            View →
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

            </div>
        </div>
    );
}