"use client";

import { useEffect, useRef, useState } from "react";
import { api } from "@/lib/api";
import { FaCamera, FaBuilding, FaCheck, FaEnvelope } from "react-icons/fa";

interface Settings {
    email: string;
    companyName: string;
    logoUrl?: string;
}

export default function SettingsPage() {
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

    if (loading) return (
        <div className="page flex items-center justify-center">
            <p style={{ color: "var(--color-text-faint)" }}>Loading...</p>
        </div>
    );

    return (
        <div className="page">
            <div className="max-w-2xl mx-auto space-y-8">

                {/* Header */}
                <div>
                    <p className="section-eyebrow">Account</p>
                    <h1 className="font-display text-4xl font-extrabold text-slate-900">Settings</h1>
                    <p className="text-slate-500 text-sm mt-1">
                        Manage your company details and branding.
                    </p>
                </div>

                {/* Logo Card */}
                <div className="card card-body space-y-6">
                    <div>
                        <h2 className="font-bold text-slate-800 text-lg">Company Logo</h2>
                        <p className="text-slate-500 text-sm mt-1">
                            Appears on every client share page you send out. Square images work best.
                        </p>
                    </div>

                    <div className="flex items-center gap-6">
                        {/* Preview circle */}
                        <div
                            onClick={() => fileInputRef.current?.click()}
                            className="w-24 h-24 rounded-2xl overflow-hidden flex items-center justify-center flex-shrink-0 cursor-pointer transition"
                            style={{
                                border: "2px dashed #cbd5e1",
                                backgroundColor: "#f8fafc",
                            }}
                            onMouseEnter={e => (e.currentTarget.style.borderColor = "var(--color-amber)")}
                            onMouseLeave={e => (e.currentTarget.style.borderColor = "#cbd5e1")}
                        >
                            {logoPreview ? (
                                <img src={logoPreview} alt="Logo" className="w-full h-full object-cover" />
                            ) : (
                                <FaCamera className="text-3xl" style={{ color: "#cbd5e1" }} />
                            )}
                        </div>

                        <div className="space-y-2">
                            <button
                                onClick={() => fileInputRef.current?.click()}
                                disabled={logoUploading}
                                className="btn-primary"
                            >
                                {logoUploading
                                    ? "Uploading..."
                                    : logoPreview ? "Change Logo" : "Upload Logo"}
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
                <div className="card card-body space-y-6">
                    <div>
                        <h2 className="font-bold text-slate-800 text-lg">Company Details</h2>
                        <p className="text-slate-500 text-sm mt-1">
                            Your company name appears on all client share pages.
                        </p>
                    </div>

                    <div className="space-y-4">

                        {/* Email — read only */}
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
                                    style={{
                                        backgroundColor: "#f8fafc",
                                        color: "#94a3b8",
                                        cursor: "not-allowed",
                                    }}
                                />
                            </div>
                        </div>

                        {/* Company name */}
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
                                />
                            </div>
                        </div>

                        {saveError && <div className="alert-error">{saveError}</div>}

                        <div className="flex items-center gap-4 pt-1">
                            <button
                                onClick={handleSave}
                                disabled={saving}
                                className="btn-primary"
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

            </div>
        </div>
    );
}