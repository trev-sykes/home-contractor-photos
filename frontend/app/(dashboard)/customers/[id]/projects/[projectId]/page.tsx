"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { api } from "../../../../../../lib/api"
import Link from "next/link";
import { FaTrash, FaEdit, FaCamera } from "react-icons/fa";
import React from "react";

interface Photo {
    id: string;
    imageUrl: string;
    type: string;
    createdAt: string;
}

interface Project {
    id: string;
    name: string;
    address?: string;
    createdAt: string;
    photos: Photo[];
}

export default function ProjectPage() {
    const { id, projectId } = useParams<{ id: string; projectId: string }>();
    const router = useRouter();

    const [project, setProject] = useState<Project | null>(null);
    const [loading, setLoading] = useState(true);

    const [editing, setEditing] = useState(false);
    const [form, setForm] = useState({ name: "", address: "" });
    const [saving, setSaving] = useState(false);
    const [editError, setEditError] = useState("");

    const [confirmDelete, setConfirmDelete] = useState(false);
    const [deleting, setDeleting] = useState(false);

    useEffect(() => {
        api.get(`/api/customers/${id}/projects/${projectId}`)
            .then((res) => {
                setProject(res.data);
                setForm({ name: res.data.name, address: res.data.address ?? "" });
            })
            .catch(console.error)
            .finally(() => setLoading(false));
    }, [id, projectId]);

    const handleSave = async () => {
        if (!form.name.trim()) { setEditError("Name is required."); return; }
        setSaving(true);
        setEditError("");
        try {
            await api.put(`/api/customers/${id}/projects/${projectId}`, form);
            setProject((prev) => prev ? { ...prev, ...form } : prev);
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
            await api.delete(`/api/customers/${id}/projects/${projectId}`);
            router.push(`/customers/${id}`);
        } catch {
            setDeleting(false);
            setConfirmDelete(false);
        }
    };

    if (loading) return <div className="p-8 text-gray-500">Loading...</div>;
    if (!project) return <div className="p-8 text-red-500">Project not found.</div>;

    const beforePhotos = project.photos.filter((p) => p.type === "before");
    const afterPhotos = project.photos.filter((p) => p.type === "after");
    const progressPhotos = project.photos.filter((p) => p.type === "progress");

    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <div className="max-w-4xl mx-auto space-y-6">

                <Link href={`/customers/${id}`} className="text-blue-600 hover:text-blue-800 text-sm">
                    ← Back to Customer
                </Link>

                {/* Project Card */}
                <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8">
                    {editing ? (
                        <div className="space-y-4">
                            <h2 className="text-xl font-bold mb-4">Edit Project</h2>
                            {editError && (
                                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                                    {editError}
                                </div>
                            )}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Project Name *</label>
                                <input
                                    type="text"
                                    value={form.name}
                                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                                    className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                                <input
                                    type="text"
                                    value={form.address}
                                    onChange={(e) => setForm({ ...form, address: e.target.value })}
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
                            <div>
                                <h1 className="text-2xl font-bold text-gray-900">{project.name}</h1>
                                <p className="text-gray-500 text-sm mt-1">
                                    {project.address ?? "No address"} • Created {new Date(project.createdAt).toLocaleDateString()}
                                </p>
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
                        <p className="font-semibold text-red-800 mb-1">Delete {project.name}?</p>
                        <p className="text-red-600 text-sm mb-4">This will permanently delete the project and all its photos.</p>
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

                {/* Photos Section */}
                <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl font-bold">Photos</h2>
                        <Link
                            href={`/customers/${id}/projects/${projectId}/upload`}
                            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl text-sm font-semibold transition"
                        >
                            <FaCamera /> Upload Photos
                        </Link>
                    </div>

                    {project.photos.length === 0 ? (
                        <div className="text-center py-12">
                            <FaCamera className="text-gray-300 text-5xl mx-auto mb-3" />
                            <p className="text-gray-500 mb-4">No photos yet</p>
                            <Link
                                href={`/customers/${id}/projects/${projectId}/upload`}
                                className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl text-sm font-semibold transition"
                            >
                                Upload first photo
                            </Link>
                        </div>
                    ) : (
                        <div className="space-y-6">
                            {[
                                { label: "Before", photos: beforePhotos, color: "red" },
                                { label: "After", photos: afterPhotos, color: "green" },
                                { label: "Progress", photos: progressPhotos, color: "blue" },
                            ].map(({ label, photos, color }) =>
                                photos.length > 0 && (
                                    <div key={label}>
                                        <h3 className={`text-sm font-semibold text-${color}-600 uppercase tracking-wide mb-3`}>
                                            {label}
                                        </h3>
                                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                                            {photos.map((photo) => (
                                                <div key={photo.id} className="aspect-square rounded-xl overflow-hidden border border-gray-200">
                                                    <img
                                                        src={photo.imageUrl}
                                                        alt={label}
                                                        className="w-full h-full object-cover"
                                                    />
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )
                            )}
                        </div>
                    )}
                </div>

            </div>
        </div>
    );
}