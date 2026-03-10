"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import Link from "next/link";
import { FaFolder, FaUser, FaCamera, FaSearch, FaArrowRight, FaMapMarkerAlt } from "react-icons/fa";

interface Project {
    id: string;
    name: string;
    address?: string;
    createdAt: string;
    customer: { id: string; name: string };
    _count: { photos: number };
}

export default function ProjectsPage() {
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");

    useEffect(() => {
        api.get("/api/projects")
            .then((res) => setProjects(res.data))
            .catch(console.error)
            .finally(() => setLoading(false));
    }, []);

    const filtered = projects.filter((p) =>
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.customer.name.toLowerCase().includes(search.toLowerCase()) ||
        p.address?.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="page">
            <div className="max-w-5xl mx-auto space-y-5 sm:space-y-6">

                {/* Header */}
                <div>
                    <p className="section-eyebrow">Overview</p>
                    <h1 className="font-display text-3xl sm:text-4xl font-extrabold text-slate-900">
                        Projects
                    </h1>
                    <p className="text-slate-500 text-sm mt-1">
                        {loading ? "Loading..." : `${projects.length} project${projects.length !== 1 ? "s" : ""} across all customers`}
                    </p>
                </div>

                {/* Search */}
                {projects.length > 0 && (
                    <div className="relative">
                        <FaSearch
                            className="absolute left-4 top-1/2 -translate-y-1/2 text-xs"
                            style={{ color: "#94a3b8" }}
                        />
                        <input
                            type="text"
                            placeholder="Search projects..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="input pl-10"
                        />
                    </div>
                )}

                {/* States */}
                {loading ? (
                    <div className="card card-body text-center py-16">
                        <p style={{ color: "var(--color-text-faint)" }}>Loading...</p>
                    </div>

                ) : projects.length === 0 ? (
                    <div className="card card-body text-center py-16 sm:py-20">
                        <div
                            className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4"
                            style={{ backgroundColor: "#f1f5f9" }}
                        >
                            <FaFolder className="text-2xl" style={{ color: "#94a3b8" }} />
                        </div>
                        <p className="font-bold text-slate-700 text-lg mb-1">No projects yet</p>
                        <p className="text-slate-500 text-sm mb-6 px-4">
                            Create a customer first, then add projects to them.
                        </p>
                        <Link href="/customers" className="btn-primary inline-flex mx-auto">
                            Go to Customers →
                        </Link>
                    </div>

                ) : filtered.length === 0 ? (
                    <div className="card card-body text-center py-12">
                        <p className="text-slate-500">No projects match your search.</p>
                    </div>

                ) : (
                    <div className="space-y-2 sm:space-y-3">
                        {filtered.map((p) => (
                            <Link
                                key={p.id}
                                href={`/customers/${p.customer.id}/projects/${p.id}`}
                                className="card card-body flex items-center justify-between gap-3 sm:gap-4 hover:shadow-md transition group"
                                style={{ padding: "1rem 1.25rem" }}
                            >
                                <div className="flex items-center gap-3 sm:gap-4 min-w-0">
                                    {/* Icon */}
                                    <div
                                        className="w-9 h-9 sm:w-11 sm:h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                                        style={{ backgroundColor: "#f0fdf4" }}
                                    >
                                        <FaFolder className="text-sm sm:text-base" style={{ color: "#22c55e" }} />
                                    </div>

                                    {/* Info */}
                                    <div className="min-w-0">
                                        <p className="font-bold text-slate-800 group-hover:text-amber-600 transition truncate text-sm sm:text-base">
                                            {p.name}
                                        </p>
                                        <div className="flex items-center gap-2 mt-0.5 min-w-0">
                                            <span className="flex items-center gap-1 text-xs text-slate-400 flex-shrink-0">
                                                <FaUser className="text-xs" />
                                                <span className="truncate max-w-[100px] sm:max-w-none">{p.customer.name}</span>
                                            </span>
                                            {p.address && (
                                                <span className="hidden sm:flex items-center gap-1.5 text-xs text-slate-400">
                                                    <FaMapMarkerAlt className="text-xs flex-shrink-0" />
                                                    <span className="truncate">{p.address}</span>
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                {/* Meta + arrow */}
                                <div className="flex items-center gap-3 sm:gap-6 flex-shrink-0">
                                    <div className="text-right hidden sm:block">
                                        <p className="text-xs text-slate-400">
                                            {new Date(p.createdAt).toLocaleDateString("en-US", {
                                                month: "short", day: "numeric", year: "numeric"
                                            })}
                                        </p>
                                        <p className="flex items-center gap-1 text-xs text-slate-400 mt-0.5 justify-end">
                                            <FaCamera className="text-xs" />
                                            {p._count.photos} photo{p._count.photos !== 1 ? "s" : ""}
                                        </p>
                                    </div>
                                    <FaArrowRight className="text-slate-300 group-hover:text-amber-400 transition text-sm" />
                                </div>
                            </Link>
                        ))}
                    </div>
                )}

                {/* Footer count */}
                {!loading && filtered.length > 0 && (
                    <p className="text-center text-xs" style={{ color: "var(--color-text-faint)" }}>
                        Showing {filtered.length} of {projects.length} project{projects.length !== 1 ? "s" : ""}
                    </p>
                )}

            </div>
        </div>
    );
}