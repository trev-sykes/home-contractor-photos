"use client";

import { useState, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import { api } from "@/lib/api";
import Link from "next/link";
import { FaCamera, FaTrash, FaUpload, FaPlus } from "react-icons/fa";

type PhotoType = "before" | "after" | "progress";

interface PendingPhoto {
    file: File;
    preview: string;
    type: PhotoType;
}

const TYPE_STYLES: Record<PhotoType, { active: string; inactive: string }> = {
    before: { active: "bg-red-50 border-red-300 text-red-700", inactive: "bg-white border-slate-200 text-slate-500 hover:border-slate-400" },
    after: { active: "bg-green-50 border-green-300 text-green-700", inactive: "bg-white border-slate-200 text-slate-500 hover:border-slate-400" },
    progress: { active: "bg-blue-50 border-blue-300 text-blue-700", inactive: "bg-white border-slate-200 text-slate-500 hover:border-slate-400" },
};

export default function UploadPage() {
    const { id, projectId } = useParams<{ id: string; projectId: string }>();
    const router = useRouter();

    const [pending, setPending] = useState<PendingPhoto[]>([]);
    const [uploading, setUploading] = useState(false);
    const [uploadedCount, setUploadedCount] = useState(0);
    const [error, setError] = useState("");
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files ?? []);
        if (!files.length) return;
        const newPhotos: PendingPhoto[] = files.map((file) => ({
            file,
            preview: URL.createObjectURL(file),
            type: "progress",
        }));
        setPending((prev) => [...prev, ...newPhotos]);
        e.target.value = "";
    };

    const updateType = (index: number, type: PhotoType) => {
        setPending((prev) => prev.map((p, i) => (i === index ? { ...p, type } : p)));
    };

    const remove = (index: number) => {
        setPending((prev) => {
            URL.revokeObjectURL(prev[index].preview);
            return prev.filter((_, i) => i !== index);
        });
    };

    const handleUpload = async () => {
        if (!pending.length) return;
        setUploading(true);
        setError("");
        setUploadedCount(0);
        try {
            for (const photo of pending) {
                const formData = new FormData();
                formData.append("photo", photo.file);
                formData.append("type", photo.type);
                await api.post(
                    `/api/customers/${id}/projects/${projectId}/photos`,
                    formData,
                    { headers: { "Content-Type": "multipart/form-data" } }
                );
                setUploadedCount((n) => n + 1);
            }
            router.push(`/customers/${id}/projects/${projectId}`);
        } catch (err) {
            console.error(err);
            setError("One or more uploads failed. Please try again.");
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="page">
            <div className="max-w-3xl mx-auto space-y-5 sm:space-y-6">

                {/* Back */}
                <Link
                    href={`/customers/${id}/projects/${projectId}`}
                    className="inline-flex items-center gap-2 text-sm font-medium transition hover:opacity-70"
                    style={{ color: "var(--color-text-faint)" }}
                >
                    ← Back to Project
                </Link>

                {/* Header */}
                <div>
                    <p className="section-eyebrow">Project</p>
                    <h1 className="font-display text-3xl sm:text-4xl font-extrabold text-slate-900">
                        Upload Photos
                    </h1>
                    <p className="text-slate-500 text-sm mt-1">
                        Select photos and tag each one as before, after, or progress.
                    </p>
                </div>

                <div className="card card-body space-y-5 sm:space-y-6">

                    {/* Drop zone — shorter on mobile */}
                    <button
                        onClick={() => fileInputRef.current?.click()}
                        className="w-full rounded-2xl py-10 sm:py-14 flex flex-col items-center gap-3 transition"
                        style={{
                            border: "2px dashed #cbd5e1",
                            backgroundColor: "#f8fafc",
                        }}
                        onMouseEnter={e => {
                            e.currentTarget.style.borderColor = "var(--color-amber)";
                            e.currentTarget.style.backgroundColor = "rgba(251,191,36,0.04)";
                        }}
                        onMouseLeave={e => {
                            e.currentTarget.style.borderColor = "#cbd5e1";
                            e.currentTarget.style.backgroundColor = "#f8fafc";
                        }}
                    >
                        <div
                            className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center"
                            style={{ backgroundColor: "#f1f5f9" }}
                        >
                            <FaCamera className="text-xl sm:text-2xl" style={{ color: "#94a3b8" }} />
                        </div>
                        <div className="text-center px-4">
                            <p className="font-bold text-slate-700">
                                {pending.length > 0 ? "Add more photos" : "Tap to select photos"}
                            </p>
                            <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
                                JPG, PNG, WEBP · Max 10MB each
                            </p>
                        </div>
                        {pending.length > 0 && (
                            <span
                                className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full"
                                style={{
                                    backgroundColor: "rgba(251,191,36,0.1)",
                                    color: "var(--color-amber-dark)",
                                    border: "1px solid rgba(251,191,36,0.2)",
                                }}
                            >
                                <FaPlus className="text-xs" />
                                {pending.length} selected
                            </span>
                        )}
                    </button>

                    <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        multiple
                        capture="environment"
                        className="hidden"
                        onChange={handleFileChange}
                    />

                    {/* Pending list */}
                    {pending.length > 0 && (
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <p className="font-bold text-slate-700 text-sm">
                                    {pending.length} photo{pending.length !== 1 ? "s" : ""} selected
                                </p>
                                <button
                                    onClick={() => setPending([])}
                                    disabled={uploading}
                                    className="text-xs font-medium transition hover:opacity-70"
                                    style={{ color: "var(--color-text-faint)" }}
                                >
                                    Clear all
                                </button>
                            </div>

                            <div className="space-y-2 sm:space-y-3">
                                {pending.map((photo, i) => (
                                    <div
                                        key={i}
                                        className="flex items-center gap-3 rounded-xl p-2.5 sm:p-3"
                                        style={{
                                            backgroundColor: "#f8fafc",
                                            border: "1px solid #e2e8f0",
                                        }}
                                    >
                                        {/* Preview */}
                                        <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl overflow-hidden flex-shrink-0 border border-slate-200">
                                            <img
                                                src={photo.preview}
                                                alt="preview"
                                                className="w-full h-full object-cover"
                                            />
                                        </div>

                                        {/* Name + type toggles */}
                                        <div className="flex-1 min-w-0">
                                            <p className="text-xs sm:text-sm font-semibold text-slate-700 truncate mb-1.5 sm:mb-2">
                                                {photo.file.name}
                                            </p>
                                            <div className="flex gap-1 sm:gap-1.5">
                                                {(["before", "after", "progress"] as PhotoType[]).map((t) => (
                                                    <button
                                                        key={t}
                                                        onClick={() => updateType(i, t)}
                                                        className={`px-2 sm:px-2.5 py-1 rounded-lg text-xs font-bold border transition capitalize ${photo.type === t
                                                                ? TYPE_STYLES[t].active
                                                                : TYPE_STYLES[t].inactive
                                                            }`}
                                                    >
                                                        {t}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Remove */}
                                        <button
                                            onClick={() => remove(i)}
                                            disabled={uploading}
                                            className="p-2 rounded-lg transition flex-shrink-0"
                                            style={{ color: "#94a3b8" }}
                                            onMouseEnter={e => (e.currentTarget.style.color = "#ef4444")}
                                            onMouseLeave={e => (e.currentTarget.style.color = "#94a3b8")}
                                        >
                                            <FaTrash className="text-sm" />
                                        </button>
                                    </div>
                                ))}
                            </div>

                            {/* Progress bar */}
                            {uploading && (
                                <div className="space-y-2">
                                    <div className="flex justify-between text-xs font-medium text-slate-500">
                                        <span>Uploading...</span>
                                        <span>{uploadedCount} / {pending.length}</span>
                                    </div>
                                    <div className="w-full h-2 rounded-full overflow-hidden" style={{ backgroundColor: "#e2e8f0" }}>
                                        <div
                                            className="h-full rounded-full transition-all duration-300"
                                            style={{
                                                width: `${(uploadedCount / pending.length) * 100}%`,
                                                backgroundColor: "var(--color-amber)",
                                            }}
                                        />
                                    </div>
                                </div>
                            )}

                            {error && <div className="alert-error">{error}</div>}

                            {/* Upload button — full width on mobile */}
                            <div
                                className="pt-2"
                                style={{ borderTop: "1px solid #f1f5f9" }}
                            >
                                <button
                                    onClick={handleUpload}
                                    disabled={uploading}
                                    className="btn-primary w-full sm:w-auto flex items-center justify-center gap-2"
                                    style={{ padding: "0.875rem" }}
                                >
                                    <FaUpload className="text-xs" />
                                    {uploading
                                        ? `Uploading ${uploadedCount + 1} of ${pending.length}...`
                                        : `Upload ${pending.length} photo${pending.length !== 1 ? "s" : ""}`
                                    }
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}