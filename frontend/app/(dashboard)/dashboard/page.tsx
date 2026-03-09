"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import Link from "next/link";
import {
    FaUsers, FaFolder, FaCamera, FaCreditCard,
    FaArrowRight, FaCheckCircle, FaClock, FaExclamationCircle
} from "react-icons/fa";
import UpgradeButton from "@/app/components/buttons/UpgradeButton";

export default function DashboardPage() {
    const [user, setUser] = useState<any>(null);
    const [stats, setStats] = useState({ customers: 0, projects: 0, photos: 0 });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        api.get("/api/me")
            .then((res) => setUser(res.data))
            .catch(console.error)
            .finally(() => setLoading(false));

        // Fetch counts in parallel
        Promise.allSettled([
            api.get("/api/customers"),
            api.get("/api/projects"),
            api.get("/api/photos"),
        ]).then(([customers, projects, photos]) => {
            setStats({
                customers: customers.status === "fulfilled" ? customers.value.data.length : 0,
                projects: projects.status === "fulfilled" ? projects.value.data.length : 0,
                photos: photos.status === "fulfilled" ? photos.value.data.length : 0,
            });
        });
    }, []);

    const trialActive = user?.trialEndsAt && new Date(user.trialEndsAt) > new Date();
    const subscribed = user?.subscriptionStatus === "active";
    const trialDaysLeft = user?.trialEndsAt
        ? Math.max(0, Math.ceil((new Date(user.trialEndsAt).getTime() - Date.now()) / (1000 * 60 * 60 * 24)))
        : 0;

    const subStatus = subscribed ? "active" : trialActive ? "trial" : "inactive";

    return (
        <div className="page">
            <div className="max-w-5xl mx-auto space-y-8">

                {/* Header */}
                <div className="flex justify-between items-start">
                    <div>
                        <p className="section-eyebrow">Dashboard</p>
                        <h1 className="font-display text-4xl font-extrabold text-slate-900">
                            {loading ? "Welcome back 👋" : `Welcome back, ${user?.companyName?.split(" ")[0] ?? ""} 👋`}
                        </h1>
                        <p className="text-slate-500 text-sm mt-1">
                            Here's what's happening with your projects today.
                        </p>
                    </div>
                    <Link
                        href="/customers/new"
                        className="btn-primary hidden md:inline-flex"
                    >
                        + New Customer
                    </Link>
                </div>

                {/* Subscription Banner */}
                {subStatus === "trial" && (
                    <div
                        className="rounded-2xl p-5 flex items-center justify-between gap-4 flex-wrap"
                        style={{
                            backgroundColor: "rgba(251,191,36,0.08)",
                            border: "1px solid rgba(251,191,36,0.25)",
                        }}
                    >
                        <div className="flex items-center gap-3">
                            <FaClock style={{ color: "var(--color-amber)" }} className="text-xl flex-shrink-0" />
                            <div>
                                <p className="font-bold text-slate-800 text-sm">
                                    {trialDaysLeft} day{trialDaysLeft !== 1 ? "s" : ""} left in your free trial
                                </p>
                                <p className="text-slate-500 text-xs mt-0.5">
                                    Upgrade to keep access to all your photos and projects.
                                </p>
                            </div>
                        </div>
                        <UpgradeButton />
                    </div>
                )}

                {subStatus === "inactive" && (
                    <div className="rounded-2xl p-5 flex items-center justify-between gap-4 flex-wrap bg-red-50 border border-red-200">
                        <div className="flex items-center gap-3">
                            <FaExclamationCircle className="text-red-500 text-xl flex-shrink-0" />
                            <div>
                                <p className="font-bold text-red-800 text-sm">Your trial has ended</p>
                                <p className="text-red-600 text-xs mt-0.5">
                                    Subscribe to restore full access to your account.
                                </p>
                            </div>
                        </div>
                        <UpgradeButton />
                    </div>
                )}

                {subStatus === "active" && (
                    <div className="rounded-2xl p-5 flex items-center gap-3 bg-green-50 border border-green-200">
                        <FaCheckCircle className="text-green-500 text-xl flex-shrink-0" />
                        <p className="text-green-800 text-sm font-semibold">
                            Pro plan active — unlimited photos, projects & sharing.
                        </p>
                    </div>
                )}

                {/* Stats Row */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {[
                        {
                            label: "Customers",
                            value: stats.customers,
                            icon: FaUsers,
                            href: "/customers",
                            color: "#3b82f6",
                            bg: "#eff6ff",
                        },
                        {
                            label: "Projects",
                            value: stats.projects,
                            icon: FaFolder,
                            href: "/projects",
                            color: "#22c55e",
                            bg: "#f0fdf4",
                        },
                        {
                            label: "Photos",
                            value: stats.photos,
                            icon: FaCamera,
                            href: "/photos",
                            color: "#f59e0b",
                            bg: "#fffbeb",
                        },
                    ].map(({ label, value, icon: Icon, href, color, bg }) => (
                        <Link
                            key={label}
                            href={href}
                            className="card card-body flex items-center gap-5 hover:shadow-md transition group"
                        >
                            <div
                                className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                                style={{ backgroundColor: bg }}
                            >
                                <Icon className="text-xl" style={{ color }} />
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-slate-500 text-xs font-semibold uppercase tracking-wide">{label}</p>
                                <p className="text-3xl font-extrabold text-slate-900 leading-tight">
                                    {loading ? "—" : value}
                                </p>
                            </div>
                            <FaArrowRight
                                className="text-slate-300 group-hover:text-slate-500 transition flex-shrink-0"
                            />
                        </Link>
                    ))}
                </div>

                {/* Quick Actions */}
                <div>
                    <h2 className="font-bold text-slate-700 text-sm uppercase tracking-wider mb-4">
                        Quick Actions
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        {[
                            {
                                title: "Add a Customer",
                                desc: "Create a new customer and start a project.",
                                href: "/customers/new",
                                emoji: "👤",
                            },
                            {
                                title: "View All Projects",
                                desc: "Browse and manage all your active jobs.",
                                href: "/projects",
                                emoji: "📁",
                            },
                            {
                                title: "Browse Photos",
                                desc: "See every photo across all your projects.",
                                href: "/photos",
                                emoji: "📸",
                            },
                        ].map(({ title, desc, href, emoji }) => (
                            <Link
                                key={title}
                                href={href}
                                className="card card-body hover:shadow-md hover:border-amber-200 transition group flex flex-col gap-3"
                                style={{ borderColor: "#e2e8f0" }}
                            >
                                <span className="text-3xl">{emoji}</span>
                                <div>
                                    <p className="font-bold text-slate-800 group-hover:text-amber-600 transition text-sm">
                                        {title}
                                    </p>
                                    <p className="text-slate-500 text-xs mt-0.5">{desc}</p>
                                </div>
                                <FaArrowRight className="text-slate-300 group-hover:text-amber-400 transition text-xs mt-auto" />
                            </Link>
                        ))}
                    </div>
                </div>

                {/* Account Info */}
                <div>
                    <h2 className="font-bold text-slate-700 text-sm uppercase tracking-wider mb-4">
                        Account
                    </h2>
                    <div className="card card-body">
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                            <div>
                                <p className="text-xs text-slate-400 uppercase tracking-wide font-semibold mb-1">Email</p>
                                <p className="font-semibold text-slate-800 text-sm">
                                    {loading ? "—" : user?.email}
                                </p>
                            </div>
                            <div>
                                <p className="text-xs text-slate-400 uppercase tracking-wide font-semibold mb-1">Company</p>
                                <p className="font-semibold text-slate-800 text-sm">
                                    {loading ? "—" : user?.companyName}
                                </p>
                            </div>
                            <div>
                                <p className="text-xs text-slate-400 uppercase tracking-wide font-semibold mb-1">Plan</p>
                                <div className="flex items-center gap-2">
                                    {subStatus === "active" && <span className="badge badge-green">Pro — Active</span>}
                                    {subStatus === "trial" && <span className="badge badge-amber">Trial — {trialDaysLeft}d left</span>}
                                    {subStatus === "inactive" && <span className="badge badge-red">Inactive</span>}
                                </div>
                            </div>
                        </div>

                        <div
                            className="flex gap-3 mt-6 pt-5 flex-wrap"
                            style={{ borderTop: "1px solid #f1f5f9" }}
                        >
                            <button
                                className="btn-secondary btn-sm"
                                onClick={async () => {
                                    const res = await api.post("/api/portal");
                                    window.location.href = res.data.url;
                                }}
                            >
                                <FaCreditCard className="text-xs" />
                                Manage Billing
                            </button>
                            <Link href="/settings" className="btn-ghost btn-sm">
                                Account Settings →
                            </Link>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}