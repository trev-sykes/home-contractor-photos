"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { api } from "@/lib/api";
import Link from "next/link";

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

    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <div className="max-w-lg mx-auto">
                <div className="mb-6">
                    <Link href={`/customers/${id}`} className="text-blue-600 hover:text-blue-800 text-sm">
                        ← Back to Customer
                    </Link>
                </div>

                <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8">
                    <h1 className="text-2xl font-bold mb-6">New Project</h1>

                    {error && (
                        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-5 text-sm">
                            {error}
                        </div>
                    )}

                    <div className="space-y-5">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Project Name <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                placeholder="Kitchen Remodel"
                                value={form.name}
                                onChange={(e) => setForm({ ...form, name: e.target.value })}
                                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Address
                            </label>
                            <input
                                type="text"
                                placeholder="123 Main St, Springfield"
                                value={form.address}
                                onChange={(e) => setForm({ ...form, address: e.target.value })}
                                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        <button
                            onClick={handleSubmit}
                            disabled={loading}
                            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white py-3 rounded-xl font-semibold transition"
                        >
                            {loading ? "Creating..." : "Create Project"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}