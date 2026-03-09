"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import Link from "next/link";
import { FaCamera, FaExpand, FaTimes, FaSearch, FaArrowRight, FaUser } from "react-icons/fa";

type PhotoType = "before" | "after" | "progress";

interface Photo {
    id: string;
    imageUrl: string;
    type: PhotoType;
    createdAt: string;
    project: {
        id: string;
        name: string;
        customer: { id: string; name: string };
    };
}

const BADGE_CLASS: Record<PhotoType, string> = {
    before: "badge-red",
    after: "badge-green",
    progress: "badge-blue",
};

const FILTER_TABS = ["all", "before", "after", "progress"] as const;

export default function PhotosPage() {
    const [photos, setPhotos] = useState<Photo[]>([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState<PhotoType | "all">("all");
    const [search, setSearch] = useState("");
    const [lightbox, setLightbox] = useState<Photo | null>(null);

    useEffect(() => {
        api.get("/api/photos")
            .then((res) => setPhotos(res.data))
            .catch(console.error)
            .finally(() => setLoading(false));
    }, []);

    useEffect(() => {
        const handler = (e: KeyboardEvent) => { if (e.key === "Escape") setLightbox(null); };
        window.addEventListener("keydown", handler);
        return () => window.removeEventListener("keydown", handler);
    }, []);

    const filtered = photos.filter((p) => {
        const matchesType = filter === "all" || p.type === filter;
        const matchesSearch =
            p.project.name.toLowerCase().includes(search.toLowerCase()) ||
            p.project.customer.name.toLowerCase().includes(search.toLowerCase());
        return matchesType && matchesSearch;
    });

    const grouped = filtered.reduce<Record<string, { project: Photo["project"]; photos: Photo[] }>>(
        (acc, photo) => {
            const key = photo.project.id;
            if (!acc[key]) acc[key] = { project: photo.project, photos: [] };
            acc[key].photos.push(photo);
            return acc;
        },
        {}
    );

    return (
        <div className="page">
            <div className="max-w-6xl mx-auto space-y-6">

                {/* Header */}
                <div>
                    <p className="section-eyebrow">Gallery</p>
                    <h1 className="font-display text-4xl font-extrabold text-slate-900">Photos</h1>
                    <p className="text-slate-500 text-sm mt-1">
                        {loading ? "Loading..." : `${photos.length} photo${photos.length !== 1 ? "s" : ""} across all projects`}
                    </p>
                </div>

                {/* Search + filter */}
                {photos.length > 0 && (
                    <div className="flex flex-col sm:flex-row gap-3">
                        <div className="relative flex-1">
                            <FaSearch
                                className="absolute left-4 top-1/2 -translate-y-1/2 text-xs"
                                style={{ color: "#94a3b8" }}
                            />
                            <input
                                type="text"
                                placeholder="Search by project or customer..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="input pl-10 w-full"
                            />
                        </div>
                        <div className="flex gap-2">
                            {FILTER_TABS.map((t) => {
                                const active = filter === t;
                                return (
                                    <button
                                        key={t}
                                        onClick={() => setFilter(t)}
                                        className="px-4 py-2.5 rounded-xl text-xs font-bold border transition capitalize"
                                        style={active ? {
                                            backgroundColor: "var(--color-amber)",
                                            color: "var(--color-bg)",
                                            borderColor: "var(--color-amber)",
                                        } : {
                                            backgroundColor: "#fff",
                                            color: "#64748b",
                                            borderColor: "#e2e8f0",
                                        }}
                                    >
                                        {t}
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                )}

                {/* States */}
                {loading ? (
                    <div className="card card-body text-center py-16">
                        <p style={{ color: "var(--color-text-faint)" }}>Loading...</p>
                    </div>

                ) : photos.length === 0 ? (
                    <div className="card card-body text-center py-20">
                        <div
                            className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4"
                            style={{ backgroundColor: "#f1f5f9" }}
                        >
                            <FaCamera className="text-2xl" style={{ color: "#94a3b8" }} />
                        </div>
                        <p className="font-bold text-slate-700 text-lg mb-1">No photos yet</p>
                        <p className="text-slate-500 text-sm mb-6">
                            Upload photos from inside a project.
                        </p>
                        <Link href="/customers" className="btn-primary inline-flex mx-auto">
                            Go to Customers →
                        </Link>
                    </div>

                ) : filtered.length === 0 ? (
                    <div className="card card-body text-center py-12">
                        <p className="text-slate-500">No photos match your filter.</p>
                    </div>

                ) : (
                    <div className="space-y-10">
                        {Object.values(grouped).map(({ project, photos: groupPhotos }) => (
                            <div key={project.id}>

                                {/* Project group header */}
                                <div className="flex items-center justify-between mb-4">
                                    <div>
                                        <Link
                                            href={`/customers/${project.customer.id}/projects/${project.id}`}
                                            className="font-bold text-slate-800 hover:text-amber-600 transition"
                                        >
                                            {project.name}
                                        </Link>
                                        <p className="flex items-center gap-1.5 text-xs text-slate-400 mt-0.5">
                                            <FaUser className="text-xs" />
                                            {project.customer.name}
                                            <span className="mx-1">·</span>
                                            {groupPhotos.length} photo{groupPhotos.length !== 1 ? "s" : ""}
                                        </p>
                                    </div>
                                    <Link
                                        href={`/customers/${project.customer.id}/projects/${project.id}`}
                                        className="hidden sm:flex items-center gap-1.5 text-xs font-semibold transition hover:opacity-70"
                                        style={{ color: "var(--color-amber-dark)" }}
                                    >
                                        View project <FaArrowRight className="text-xs" />
                                    </Link>
                                </div>

                                {/* Grid */}
                                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                                    {groupPhotos.map((photo) => (
                                        <div
                                            key={photo.id}
                                            className="relative aspect-square rounded-xl overflow-hidden border border-slate-200 group cursor-pointer"
                                            onClick={() => setLightbox(photo)}
                                        >
                                            <img
                                                src={photo.imageUrl}
                                                alt={photo.type}
                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                            />
                                            {/* Type badge */}
                                            <div className="absolute top-2 left-2">
                                                <span className={`badge ${BADGE_CLASS[photo.type]} capitalize`}>
                                                    {photo.type}
                                                </span>
                                            </div>
                                            {/* Hover overlay */}
                                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/25 transition flex items-center justify-center">
                                                <FaExpand className="text-white opacity-0 group-hover:opacity-100 transition text-lg drop-shadow" />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Footer count */}
                {!loading && filtered.length > 0 && (
                    <p className="text-center text-xs" style={{ color: "var(--color-text-faint)" }}>
                        Showing {filtered.length} of {photos.length} photo{photos.length !== 1 ? "s" : ""}
                    </p>
                )}

            </div>

            {/* Lightbox */}
            {lightbox && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center p-4"
                    style={{ backgroundColor: "rgba(0,0,0,0.85)" }}
                    onClick={() => setLightbox(null)}
                >
                    <div
                        className="relative max-w-4xl w-full"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <img
                            src={lightbox.imageUrl}
                            alt={lightbox.type}
                            className="w-full max-h-[80vh] object-contain rounded-2xl"
                        />

                        {/* Info bar */}
                        <div className="absolute bottom-0 left-0 right-0 rounded-b-2xl px-6 py-5"
                            style={{ background: "linear-gradient(to top, rgba(0,0,0,0.75), transparent)" }}
                        >
                            <p className="text-white font-bold">{lightbox.project.name}</p>
                            <p className="text-white/60 text-sm">{lightbox.project.customer.name}</p>
                        </div>

                        {/* Close */}
                        <button
                            onClick={() => setLightbox(null)}
                            className="absolute top-3 right-3 w-9 h-9 rounded-full flex items-center justify-center text-white transition"
                            style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
                            onMouseEnter={e => (e.currentTarget.style.backgroundColor = "rgba(0,0,0,0.75)")}
                            onMouseLeave={e => (e.currentTarget.style.backgroundColor = "rgba(0,0,0,0.5)")}
                        >
                            <FaTimes />
                        </button>

                        {/* Type badge */}
                        <div className="absolute top-3 left-3">
                            <span className={`badge ${BADGE_CLASS[lightbox.type]} capitalize`}>
                                {lightbox.type}
                            </span>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}