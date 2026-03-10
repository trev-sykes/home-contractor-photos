"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/lib/api";
import { logout } from "@/lib/auth";
import Link from "next/link";
import { FaCamera, FaBuilding, FaCheck, FaEnvelope, FaTrash } from "react-icons/fa";

interface Settings {
    email: string;
    companyName: string;
    logoUrl?: string;
}

export default function SettingsPage() {
    const router = useRouter();
    const [settings, setSettings] = useState<Settings | null>(null);
    const [loading, setLoading] = useState(true);

    const fileInputRef = useRef<HTMLInputElement>(null);
    const [logoPreview, setLogoPreview] = useState<string | null>(null);
    const [logoUploading, setLogoUploading] = useState(false);
    const [logoSuccess, setLogoSuccess] = useState(false);

    const [companyName, setCompanyName] = useState("");
    const [saving, setSaving] = useState(false);
    const [saveSuccess, setSaveSuccess] = useState(false);
    const [saveError, setSaveError] = useState("");

    const [confirmDelete, setConfirmDelete] = useState(false);
    const [deleteConfirmText, setDeleteConfirmText] = useState("");
    const [deleting, setDeleting] = useState(false);
    const [deleteError, setDeleteError] = useState("");

    useEffect(() => {
        api.get("/api/settings")
            .then((res) => {
                setSettings(res.data);
                setCompanyName(res.data.companyName);
                if (res.data.logoUrl) setLogoPreview(res.data.logoUrl);
            })
            .catch(console.error)
            .finally(() => setLoading(false));
    }, []);

    const handleLogoChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        setLogoPreview(URL.createObjectURL(file));
        setLogoUploading(true);
        setLogoSuccess(false);
        try {
            const formData = new FormData();
            formData.append("logo", file);
            const res = await api.post("/api/settings/logo", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            setSettings((prev) => prev ? { ...prev, logoUrl: res.data.logoUrl } : prev);
            setLogoPreview(res.data.logoUrl);
            setLogoSuccess(true);
            setTimeout(() => setLogoSuccess(false), 3000);
        } catch (err) {
            console.error(err);
        } finally {
            setLogoUploading(false);
            e.target.value = "";
        }
    };

    const handleSave = async () => {
        if (!companyName.trim()) { setSaveError("Company name is required."); return; }
        setSaving(true);
        setSaveError("");
        setSaveSuccess(false);
        try {
            const res = await api.put("/api/settings", { companyName });
            setSettings((prev) => prev ? { ...prev, companyName: res.data.companyName } : prev);
            setSaveSuccess(true);
            setTimeout(() => setSaveSuccess(false), 3000);
        } catch {
            setSaveError("Failed to save. Please try again.");
        } finally {
            setSaving(false);
        }
    };

    const handleDeleteAccount = async () => {
        setDeleting(true);
        setDeleteError("");
        try {
            await api.delete("/api/settings/account");
            logout();
            router.push("/");
        } catch {
            setDeleteError("Failed to delete account. Please try again or contact support.");
            setDeleting(false);
        }
    };

    if (loading) return (
        <div className="page flex items-center justify-center">
            <p style={{ color: "var(--color-text-faint)" }}>Loading...</p>
        </div>
    );

    return (
        <div className="page">
            <div className="max-w-2xl mx-auto space-y-6 sm:space-y-8">

                {/* Header */}
                <div>
                    <p className="section-eyebrow">Account</p>
                    <h1 className="font-display text-3xl sm:text-4xl font-extrabold text-slate-900">
                        Settings
                    </h1>
                    <p className="text-slate-500 text-sm mt-1">
                        Manage your company details and branding.
                    </p>
                </div>

                {/* Logo Card */}
                <div className="card card-body space-y-5 sm:space-y-6">
                    <div>
                        <h2 className="font-bold text-slate-800 text-lg">Company Logo</h2>
                        <p className="text-slate-500 text-sm mt-1">
                            Appears on every client share page you send out. Square images work best.
                        </p>
                    </div>

                    <div className="flex items-center gap-5 sm:gap-6">
                        <div
                            onClick={() => fileInputRef.current?.click()}
                            className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden flex items-center justify-center flex-shrink-0 cursor-pointer transition"
                            style={{ border: "2px dashed #cbd5e1", backgroundColor: "#f8fafc" }}
                            onMouseEnter={e => (e.currentTarget.style.borderColor = "var(--color-amber)")}
                            onMouseLeave={e => (e.currentTarget.style.borderColor = "#cbd5e1")}
                        >
                            {logoPreview ? (
                                <img src={logoPreview} alt="Logo" className="w-full h-full object-cover" />
                            ) : (
                                <FaCamera className="text-2xl sm:text-3xl" style={{ color: "#cbd5e1" }} />
                            )}
                        </div>

                        <div className="space-y-2 min-w-0">
                            <button
                                onClick={() => fileInputRef.current?.click()}
                                disabled={logoUploading}
                                className="btn-primary w-full sm:w-auto"
                            >
                                {logoUploading ? "Uploading..." : logoPreview ? "Change Logo" : "Upload Logo"}
                            </button>
                            {logoSuccess && (
                                <p className="flex items-center gap-1.5 text-sm font-medium"
                                    style={{ color: "var(--color-success)" }}>
                                    <FaCheck className="text-xs" /> Logo updated!
                                </p>
                            )}
                            <p className="text-xs" style={{ color: "var(--color-text-faint)" }}>
                                JPG or PNG · Max 10MB
                            </p>
                        </div>
                    </div>

                    <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleLogoChange}
                    />
                </div>

                {/* Company Details Card */}
                <div className="card card-body space-y-5 sm:space-y-6">
                    <div>
                        <h2 className="font-bold text-slate-800 text-lg">Company Details</h2>
                        <p className="text-slate-500 text-sm mt-1">
                            Your company name appears on all client share pages.
                        </p>
                    </div>

                    <div className="space-y-4">
                        <div>
                            <label className="input-label">Email</label>
                            <div className="relative">
                                <FaEnvelope
                                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-xs"
                                    style={{ color: "#94a3b8" }}
                                />
                                <input
                                    type="email"
                                    value={settings?.email ?? ""}
                                    disabled
                                    className="input pl-9"
                                    style={{ backgroundColor: "#f8fafc", color: "#94a3b8", cursor: "not-allowed" }}
                                />
                            </div>
                        </div>

                        <div>
                            <label className="input-label">Company Name</label>
                            <div className="relative">
                                <FaBuilding
                                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-xs"
                                    style={{ color: "#94a3b8" }}
                                />
                                <input
                                    type="text"
                                    value={companyName}
                                    onChange={(e) => setCompanyName(e.target.value)}
                                    onKeyDown={(e) => e.key === "Enter" && handleSave()}
                                    className="input pl-9"
                                    placeholder="Smith Roofing Co."
                                    autoCapitalize="words"
                                    autoComplete="organization"
                                />
                            </div>
                        </div>

                        {saveError && <div className="alert-error">{saveError}</div>}

                        <div className="flex flex-wrap items-center gap-4 pt-1">
                            <button
                                onClick={handleSave}
                                disabled={saving}
                                className="btn-primary w-full sm:w-auto"
                            >
                                {saving ? "Saving..." : "Save Changes"}
                            </button>
                            {saveSuccess && (
                                <p className="flex items-center gap-1.5 text-sm font-medium"
                                    style={{ color: "var(--color-success)" }}>
                                    <FaCheck className="text-xs" /> Changes saved!
                                </p>
                            )}
                        </div>
                    </div>
                </div>

                {/* Danger Zone */}
                <div
                    className="card card-body space-y-4"
                    style={{ borderColor: "#fecaca" }}
                >
                    <div>
                        <h2 className="font-bold text-red-700 text-lg">Danger Zone</h2>
                        <p className="text-slate-500 text-sm mt-1">
                            Permanently delete your account and all associated data.
                        </p>
                    </div>

                    {!confirmDelete ? (
                        <button
                            onClick={() => setConfirmDelete(true)}
                            className="btn-sm flex items-center gap-2 transition w-full sm:w-auto justify-center sm:justify-start"
                            style={{
                                border: "1px solid #fecaca",
                                color: "#dc2626",
                                borderRadius: "0.75rem",
                                padding: "0.5rem 1rem",
                                fontWeight: 600,
                                fontSize: "0.875rem",
                                backgroundColor: "transparent",
                            }}
                            onMouseEnter={e => (e.currentTarget.style.backgroundColor = "#fef2f2")}
                            onMouseLeave={e => (e.currentTarget.style.backgroundColor = "transparent")}
                        >
                            <FaTrash className="text-xs" /> Delete My Account
                        </button>
                    ) : (
                        <div className="space-y-4 rounded-xl p-4 sm:p-5 bg-red-50 border border-red-200">
                            <div>
                                <p className="font-bold text-red-800 text-sm mb-1">
                                    Are you absolutely sure?
                                </p>
                                <p className="text-red-600 text-sm">
                                    This will permanently delete your account, all customers, projects, and photos.
                                    This action <span className="font-bold">cannot be undone</span>.
                                </p>
                            </div>

                            <div>
                                <label className="input-label" style={{ color: "#991b1b" }}>
                                    Type <span className="font-mono font-bold">DELETE</span> to confirm
                                </label>
                                <input
                                    type="text"
                                    value={deleteConfirmText}
                                    onChange={(e) => setDeleteConfirmText(e.target.value)}
                                    placeholder="DELETE"
                                    className="input mt-1"
                                    autoCapitalize="characters"
                                    style={{ borderColor: "#fca5a5" }}
                                />
                            </div>

                            {deleteError && <div className="alert-error">{deleteError}</div>}

                            <div className="flex gap-3">
                                <button
                                    onClick={handleDeleteAccount}
                                    disabled={deleting || deleteConfirmText !== "DELETE"}
                                    className="btn-danger flex-1 sm:flex-none flex items-center justify-center gap-2"
                                    style={{
                                        opacity: deleteConfirmText !== "DELETE" ? 0.5 : 1,
                                        cursor: deleteConfirmText !== "DELETE" ? "not-allowed" : "pointer",
                                    }}
                                >
                                    <FaTrash className="text-xs" />
                                    {deleting ? "Deleting..." : "Delete My Account"}
                                </button>
                                <button
                                    onClick={() => { setConfirmDelete(false); setDeleteConfirmText(""); setDeleteError(""); }}
                                    className="btn-secondary flex-1 sm:flex-none"
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    )}
                </div>

            </div>
        </div>
    );
}