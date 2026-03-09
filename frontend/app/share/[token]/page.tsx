"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import BeforeAfterSlider from "@/app/components/sliders/BeforeAfterSlider";

interface Photo {
    id: string;
    imageUrl: string;
    type: string;
}

interface ShareData {
    name: string;
    address?: string;
    createdAt: string;
    photos: Photo[];
    customer: {
        user: {
            companyName: string;
            logoUrl?: string;
        };
    };
}

const PHOTO_SECTIONS = [
    { label: "Before", key: "before", badgeClass: "badge-red" },
    { label: "After", key: "after", badgeClass: "badge-green" },
    { label: "Progress", key: "progress", badgeClass: "badge-blue" },
] as const;

export default function SharePage() {
    const { token } = useParams<{ token: string }>();
    const [data, setData] = useState<ShareData | null>(null);
    const [loading, setLoading] = useState(true);
    const [notFound, setNotFound] = useState(false);
    const [lightbox, setLightbox] = useState<Photo | null>(null);

    useEffect(() => {
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/share/${token}`)
            .then((res) => {
                if (!res.ok) { setNotFound(true); return null; }
                return res.json();
            })
            .then((json) => { if (json) setData(json); })
            .catch(console.error)
            .finally(() => setLoading(false));
    }, [token]);

    useEffect(() => {
        const handler = (e: KeyboardEvent) => { if (e.key === "Escape") setLightbox(null); };
        window.addEventListener("keydown", handler);
        return () => window.removeEventListener("keydown", handler);
    }, []);

    if (loading) return (
        <div
            className="min-h-screen flex items-center justify-center"
            style={{ backgroundColor: "#f8fafc" }}
        >
            <p style={{ color: "#94a3b8" }}>Loading...</p>
        </div>
    );

    if (notFound || !data) return (
        <div
            className="min-h-screen flex items-center justify-center"
            style={{ backgroundColor: "#f8fafc" }}
        >
            <div className="text-center">
                <p className="text-5xl mb-4">🔍</p>
                <p className="font-bold text-slate-700 text-xl mb-1">Project not found</p>
                <p className="text-slate-400 text-sm">
                    This link may have expired or been removed.
                </p>
            </div>
        </div>
    );

    const photoMap = {
        before: data.photos.filter((p) => p.type === "before"),
        after: data.photos.filter((p) => p.type === "after"),
        progress: data.photos.filter((p) => p.type === "progress"),
    };

    const firstBefore = photoMap.before[0]?.imageUrl;
    const firstAfter = photoMap.after[0]?.imageUrl;

    return (
        <div className="min-h-screen" style={{ backgroundColor: "#f8fafc" }}>

            {/* Header */}
            <header
                className="sticky top-0 z-10 px-6 py-4"
                style={{
                    backgroundColor: "rgba(255,255,255,0.85)",
                    backdropFilter: "blur(12px)",
                    borderBottom: "1px solid #e2e8f0",
                }}
            >
                <div className="max-w-4xl mx-auto flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        {data.customer.user.logoUrl ? (
                            <img
                                src={data.customer.user.logoUrl}
                                alt="Logo"
                                className="h-10 w-10 rounded-xl object-cover flex-shrink-0"
                                style={{ border: "1px solid #e2e8f0" }}
                            />
                        ) : (
                            <div
                                className="h-10 w-10 rounded-xl flex items-center justify-center font-black text-sm flex-shrink-0"
                                style={{
                                    backgroundColor: "var(--color-amber)",
                                    color: "var(--color-bg)",
                                }}
                            >
                                {data.customer.user.companyName.charAt(0).toUpperCase()}
                            </div>
                        )}
                        <div>
                            <p className="font-bold text-slate-800 text-sm leading-tight">
                                {data.customer.user.companyName}
                            </p>
                            <p className="text-xs text-slate-400">Project Update</p>
                        </div>
                    </div>

                    {/* HC wordmark */}
                    <p className="text-xs text-slate-300 hidden sm:block">
                        Powered by <span className="font-bold text-slate-400">Home Contractor Photos</span>
                    </p>
                </div>
            </header>

            <div className="max-w-4xl mx-auto px-6 py-10 space-y-10">

                {/* Project title */}
                <div>
                    <p
                        className="text-xs font-bold uppercase tracking-widest mb-2"
                        style={{ color: "var(--color-amber-dark)" }}
                    >
                        Project Report
                    </p>
                    <h1 className="font-display text-4xl font-extrabold text-slate-900">
                        {data.name}
                    </h1>
                    <div className="flex flex-wrap items-center gap-3 mt-2">
                        {data.address && (
                            <span className="text-sm text-slate-400">{data.address}</span>
                        )}
                        {data.address && <span className="text-slate-300">·</span>}
                        <span className="text-sm text-slate-400">
                            {new Date(data.createdAt).toLocaleDateString("en-US", {
                                year: "numeric", month: "long", day: "numeric"
                            })}
                        </span>
                        <span className="text-slate-300">·</span>
                        <span className="text-sm text-slate-400">
                            {data.photos.length} photo{data.photos.length !== 1 ? "s" : ""}
                        </span>
                    </div>
                </div>

                {/* Before / After Slider */}
                {firstBefore && firstAfter && (
                    <div
                        className="rounded-2xl overflow-hidden"
                        style={{ border: "1px solid #e2e8f0", boxShadow: "0 4px 24px rgba(0,0,0,0.06)" }}
                    >
                        <div
                            className="px-5 py-4 flex items-center justify-between"
                            style={{ backgroundColor: "#fff", borderBottom: "1px solid #f1f5f9" }}
                        >
                            <h2 className="font-bold text-slate-800">Before &amp; After</h2>
                            <p className="text-xs text-slate-400">Drag to compare</p>
                        </div>
                        <div className="aspect-video">
                            <BeforeAfterSlider
                                before={firstBefore}
                                after={firstAfter}
                                width="100%"
                                height="100%"
                            />
                        </div>
                    </div>
                )}

                {/* Photo sections */}
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
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                                {photos.map((photo) => (
                                    <div
                                        key={photo.id}
                                        className="aspect-square rounded-xl overflow-hidden group cursor-pointer"
                                        style={{ border: "1px solid #e2e8f0" }}
                                        onClick={() => setLightbox(photo)}
                                    >
                                        <img
                                            src={photo.imageUrl}
                                            alt={label}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    );
                })}

                {/* Footer */}
                <div
                    className="pt-8 text-center"
                    style={{ borderTop: "1px solid #e2e8f0" }}
                >
                    <p className="text-slate-400 text-sm">
                        Shared by{" "}
                        <span className="font-semibold text-slate-600">
                            {data.customer.user.companyName}
                        </span>
                    </p>
                    <p className="text-slate-300 text-xs mt-1">
                        Powered by Home Contractor Photos
                    </p>
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
                            onMouseEnter={e => (e.currentTarget.style.backgroundColor = "rgba(0,0,0,0.75)")}
                            onMouseLeave={e => (e.currentTarget.style.backgroundColor = "rgba(0,0,0,0.5)")}
                        >
                            ✕
                        </button>
                        <div className="absolute top-3 left-3">
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