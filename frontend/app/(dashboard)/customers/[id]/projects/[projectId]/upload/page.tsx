"use client";

import { useState, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import { api } from "@/lib/api";
import Link from "next/link";
import { FaCamera, FaTrash, FaUpload } from "react-icons/fa";

type PhotoType = "before" | "after" | "progress";

interface PendingPhoto {
    file: File;
    preview: string;
    type: PhotoType;
}

export default function UploadPage() {
    const { id, projectId } = useParams<{ id: string; projectId: string }>();
    const router = useRouter();

    const [pending, setPending] = useState<PendingPhoto[]>([]);
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState("");
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files ?? []);
        if (!files.length) return;

        const newPhotos: PendingPhoto[] = files.map((file) => ({
            file,
            preview: URL.createObjectURL(file),
            type: "progress", // default type
        }));

        setPending((prev) => [...prev, ...newPhotos]);
        // Reset input so same file can be re-added if needed
        e.target.value = "";
    };

    const updateType = (index: number, type: PhotoType) => {
        setPending((prev) =>
            prev.map((p, i) => (i === index ? { ...p, type } : p))
        );
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

        try {
            // Upload sequentially to avoid hammering the server
            for (const photo of pending) {
                const formData = new FormData();
                formData.append("photo", photo.file);
                formData.append("type", photo.type);
                await api.post(
                    `/api/customers/${id}/projects/${projectId}/photos`,
                    formData,
                    { headers: { "Content-Type": "multipart/form-data" } }
                );
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
        <div className="min-h-screen bg-gray-100 p-8">
            <div className="max-w-3xl mx-auto space-y-6">

                <Link
                    href={`/customers/${id}/projects/${projectId}`}
                    className="text-blue-600 hover:text-blue-800 text-sm"
                >
                    ← Back to Project
                </Link>

                <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8">
                    <h1 className="text-2xl font-bold mb-2">Upload Photos</h1>
                    <p className="text-gray-500 text-sm mb-8">
                        Select photos then assign each one a type before uploading.
                    </p>

                    {/* Drop zone / file picker */}
                    <button
                        onClick={() => fileInputRef.current?.click()}
                        className="w-full border-2 border-dashed border-gray-300 hover:border-blue-400 rounded-xl py-12 flex flex-col items-center gap-3 text-gray-400 hover:text-blue-500 transition"
                    >
                        <FaCamera className="text-4xl" />
                        <span className="font-medium">Click to select photos</span>
                        <span className="text-sm">JPG, PNG, WEBP up to 10MB each</span>
                    </button>
                    <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        multiple
                        className="hidden"
                        onChange={handleFileChange}
                    />

                    {/* Pending photos */}
                    {pending.length > 0 && (
                        <div className="mt-8 space-y-4">
                            <h2 className="font-semibold text-gray-700">
                                {pending.length} photo{pending.length !== 1 ? "s" : ""} selected
                            </h2>

                            {pending.map((photo, i) => (
                                <div
                                    key={i}
                                    className="flex items-center gap-4 bg-gray-50 rounded-xl p-3 border border-gray-200"
                                >
                                    {/* Preview */}
                                    <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 border border-gray-200">
                                        <img
                                            src={photo.preview}
                                            alt="preview"
                                            className="w-full h-full object-cover"
                                        />
                                    </div>

                                    {/* File name + type selector */}
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-medium text-gray-800 truncate mb-2">
                                            {photo.file.name}
                                        </p>
                                        <div className="flex gap-2">
                                            {(["before", "after", "progress"] as PhotoType[]).map((t) => (
                                                <button
                                                    key={t}
                                                    onClick={() => updateType(i, t)}
                                                    className={`px-3 py-1 rounded-lg text-xs font-semibold border transition capitalize ${photo.type === t
                                                            ? t === "before"
                                                                ? "bg-red-100 border-red-300 text-red-700"
                                                                : t === "after"
                                                                    ? "bg-green-100 border-green-300 text-green-700"
                                                                    : "bg-blue-100 border-blue-300 text-blue-700"
                                                            : "bg-white border-gray-200 text-gray-500 hover:border-gray-400"
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
                                        className="text-gray-400 hover:text-red-500 transition p-2"
                                    >
                                        <FaTrash />
                                    </button>
                                </div>
                            ))}

                            {error && (
                                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                                    {error}
                                </div>
                            )}

                            <div className="flex gap-3 pt-2">
                                <button
                                    onClick={handleUpload}
                                    disabled={uploading}
                                    className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-6 py-3 rounded-xl font-semibold transition"
                                >
                                    <FaUpload />
                                    {uploading ? "Uploading..." : `Upload ${pending.length} photo${pending.length !== 1 ? "s" : ""}`}
                                </button>
                                <button
                                    onClick={() => setPending([])}
                                    disabled={uploading}
                                    className="border border-gray-300 hover:border-gray-400 px-6 py-3 rounded-xl font-semibold text-sm transition"
                                >
                                    Clear all
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}