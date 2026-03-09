"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { api } from "../../../../../../lib/api";
import Link from "next/link";
import {
    FaTrash, FaEdit, FaCamera, FaShare,
    FaMapMarkerAlt, FaCalendarAlt, FaCheck
} from "react-icons/fa";
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

const PHOTO_SECTIONS = [
    { label: "Before", key: "before", badgeClass: "badge-red" },
    { label: "After", key: "after", badgeClass: "badge-green" },
    { label: "Progress", key: "progress", badgeClass: "badge-blue" },
] as const;

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

    const [shareLoading, setShareLoading] = useState(false);
    const [shareCopied, setShareCopied] = useState(false);

    const [lightbox, setLightbox] = useState<Photo | null>(null);

    const handleShare = async () => {
        setShareLoading(true);
        try {
            const res = await api.get(`/api/customers/${id}/projects/${projectId}/share-token`);
            const url = `${window.location.origin}/share/${res.data.token}`;
            await navigator.clipboard.writeText(url);
            setShareCopied(true);
            setTimeout(() => setShareCopied(false), 3000);
        } catch {
            console.error("Failed to get share link");
        } finally {
            setShareLoading(false);
        }
    };

    useEffect(() => {
        api.get(`/api/customers/${id}/projects/${projectId}`)
            .then((res) => {
                setProject(res.data);
                setForm({ name: res.data.name, address: res.data.address ?? "" });
            })
            .catch(console.error)
            .finally(() => setLoading(false));
    }, [id, projectId]);

    // Close lightbox on Escape
    useEffect(() => {
        const handler = (e: KeyboardEvent) => { if (e.key === "Escape") setLightbox(null); };
        window.addEventListener("keydown", handler);
        return () => window.removeEventListener("keydown", handler);
    }, []);

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

    if (loading) return (
        <div className="page flex items-center justify-center">
            <p style={{ color: "var(--color-text-faint)" }}>Loading...</p>
        </div>
    );

    if (!project) return (
        <div className="page flex items-center justify-center">
            <p style={{ color: "var(--color-danger)" }}>Project not found.</p>
        </div>
    );

    const beforePhotos = project.photos.filter((p) => p.type === "before");
    const afterPhotos = project.photos.filter((p) => p.type === "after");
    const progressPhotos = project.photos.filter((p) => p.type === "progress");
    const photoMap = { before: beforePhotos, after: afterPhotos, progress: progressPhotos };

    return (
        <div className="page">
            <div className="max-w-4xl mx-auto space-y-6">

                {/* Back */}
                <Link
                    href={`/customers/${id}`}
                    className="inline-flex items-center gap-2 text-sm font-medium transition hover:opacity-70"
                    style={{ color: "var(--color-text-faint)" }}
                >
                    ← Back to Customer
                </Link>

                {/* Project Card */}
                <div className="card card-body">
                    {editing ? (
                        <div className="space-y-5">
                            <h2 className="font-display text-2xl font-extrabold text-slate-800">
                                Edit Project
                            </h2>

                            {editError && <div className="alert-error">{editError}</div>}

                            <div>
                                <label className="input-label">
                                    Project Name <span style={{ color: "var(--color-danger)" }}>*</span>
                                </label>
                                <input
                                    type="text"
                                    value={form.name}
                                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                                    onKeyDown={(e) => e.key === "Enter" && handleSave()}
                                    className="input"
                                />
                            </div>
                            <div>
                                <label className="input-label">Address</label>
                                <input
                                    type="text"
                                    value={form.address}
                                    onChange={(e) => setForm({ ...form, address: e.target.value })}
                                    onKeyDown={(e) => e.key === "Enter" && handleSave()}
                                    className="input"
                                />
                            </div>
                            <div
                                className="flex gap-3 pt-2"
                                style={{ borderTop: "1px solid #f1f5f9" }}
                            >
                                <button onClick={handleSave} disabled={saving} className="btn-primary">
                                    {saving ? "Saving..." : "Save Changes"}
                                </button>
                                <button
                                    onClick={() => { setEditing(false); setEditError(""); }}
                                    className="btn-secondary"
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className="flex justify-between items-start gap-4 flex-wrap">
                            <div>
                                <h1 className="font-display text-3xl font-extrabold text-slate-900">
                                    {project.name}
                                </h1>
                                <div className="flex flex-wrap items-center gap-4 mt-2">
                                    {project.address && (
                                        <span className="flex items-center gap-1.5 text-sm text-slate-400">
                                            <FaMapMarkerAlt className="text-xs" />
                                            {project.address}
                                        </span>
                                    )}
                                    <span className="flex items-center gap-1.5 text-sm text-slate-400">
                                        <FaCalendarAlt className="text-xs" />
                                        {new Date(project.createdAt).toLocaleDateString("en-US", {
                                            month: "long", day: "numeric", year: "numeric"
                                        })}
                                    </span>
                                    <span
                                        className="text-xs font-semibold px-2.5 py-1 rounded-full"
                                        style={{ backgroundColor: "#f1f5f9", color: "#64748b" }}
                                    >
                                        {project.photos.length} photo{project.photos.length !== 1 ? "s" : ""}
                                    </span>
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="flex gap-2 flex-wrap">
                                <button
                                    onClick={handleShare}
                                    disabled={shareLoading}
                                    className="btn-sm flex items-center gap-2 transition"
                                    style={{
                                        border: "1px solid rgba(251,191,36,0.4)",
                                        color: "var(--color-amber-dark)",
                                        borderRadius: "0.75rem",
                                        padding: "0.375rem 0.875rem",
                                        fontWeight: 600,
                                        fontSize: "0.75rem",
                                        backgroundColor: "rgba(251,191,36,0.08)",
                                    }}
                                >
                                    {shareCopied
                                        ? <><FaCheck className="text-xs" /> Copied!</>
                                        : <><FaShare className="text-xs" /> {shareLoading ? "Getting link..." : "Share"}</>
                                    }
                                </button>
                                <button
                                    onClick={() => setEditing(true)}
                                    className="btn-secondary btn-sm flex items-center gap-2"
                                >
                                    <FaEdit className="text-xs" /> Edit
                                </button>
                                <button
                                    onClick={() => setConfirmDelete(true)}
                                    className="btn-sm flex items-center gap-2 transition"
                                    style={{
                                        border: "1px solid #fecaca",
                                        color: "#dc2626",
                                        borderRadius: "0.75rem",
                                        padding: "0.375rem 0.875rem",
                                        fontWeight: 600,
                                        fontSize: "0.75rem",
                                        backgroundColor: "transparent",
                                    }}
                                    onMouseEnter={e => (e.currentTarget.style.backgroundColor = "#fef2f2")}
                                    onMouseLeave={e => (e.currentTarget.style.backgroundColor = "transparent")}
                                >
                                    <FaTrash className="text-xs" /> Delete
                                </button>
                            </div>
                        </div>
                    )}
                </div>

                {/* Delete Confirmation */}
                {confirmDelete && (
                    <div className="rounded-2xl p-6 bg-red-50 border border-red-200">
                        <p className="font-bold text-red-800 mb-1">Delete {project.name}?</p>
                        <p className="text-red-600 text-sm mb-4">
                            This will permanently delete the project and all its photos. This cannot be undone.
                        </p>
                        <div className="flex gap-3">
                            <button onClick={handleDelete} disabled={deleting} className="btn-danger btn-sm">
                                {deleting ? "Deleting..." : "Yes, delete"}
                            </button>
                            <button onClick={() => setConfirmDelete(false)} className="btn-secondary btn-sm">
                                Cancel
                            </button>
                        </div>
                    </div>
                )}

                {/* Photos Section */}
                <div className="card card-body space-y-6">
                    <div className="flex justify-between items-center">
                        <h2 className="font-display text-2xl font-extrabold text-slate-900">Photos</h2>
                        <Link
                            href={`/customers/${id}/projects/${projectId}/upload`}
                            className="btn-primary btn-sm flex items-center gap-2"
                        >
                            <FaCamera className="text-xs" /> Upload Photos
                        </Link>
                    </div>

                    {project.photos.length === 0 ? (
                        <div className="text-center py-14">
                            <div
                                className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4"
                                style={{ backgroundColor: "#f1f5f9" }}
                            >
                                <FaCamera className="text-xl" style={{ color: "#94a3b8" }} />
                            </div>
                            <p className="font-bold text-slate-700 mb-1">No photos yet</p>
                            <p className="text-slate-500 text-sm mb-5">
                                Upload before, after, or progress photos for this project.
                            </p>
                            <Link
                                href={`/customers/${id}/projects/${projectId}/upload`}
                                className="btn-primary inline-flex"
                            >
                                <FaCamera className="text-xs" /> Upload First Photo
                            </Link>
                        </div>
                    ) : (
                        <div className="space-y-8">
                            {PHOTO_SECTIONS.map(({ label, key, badgeClass }) => {
                                const photos = photoMap[key];
                                if (!photos.length) return null;
                                return (
                                    <div key={key}>
                                        <div className="flex items-center gap-3 mb-4">
                                            <span className={`badge ${badgeClass}`}>{label}</span>
                                            <span className="text-xs text-slate-400">
                                                {photos.length} photo{photos.length !== 1 ? "s" : ""}
                                            </span>
                                        </div>
                                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                                            {photos.map((photo) => (
                                                <div
                                                    key={photo.id}
                                                    className="aspect-square rounded-xl overflow-hidden border border-slate-200 cursor-pointer group relative"
                                                    onClick={() => setLightbox(photo)}
                                                >
                                                    <img
                                                        src={photo.imageUrl}
                                                        alt={label}
                                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                                    />
                                                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition" />
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>

            </div>

            {/* Lightbox */}
            {lightbox && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center p-4"
                    style={{ backgroundColor: "rgba(0,0,0,0.85)" }}
                    onClick={() => setLightbox(null)}
                >
                    <div
                        className="relative max-w-3xl w-full"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <img
                            src={lightbox.imageUrl}
                            alt={lightbox.type}
                            className="w-full max-h-[80vh] object-contain rounded-2xl"
                        />
                        <button
                            onClick={() => setLightbox(null)}
                            className="absolute top-3 right-3 w-9 h-9 rounded-full flex items-center justify-center text-white transition"
                            style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
                        >
                            ✕
                        </button>
                        <div className="absolute bottom-3 left-3">
                            <span className={`badge ${lightbox.type === "before" ? "badge-red"
                                    : lightbox.type === "after" ? "badge-green"
                                        : "badge-blue"
                                } capitalize`}>
                                {lightbox.type}
                            </span>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}