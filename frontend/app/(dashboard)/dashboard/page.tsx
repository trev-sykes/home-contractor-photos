"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { FaUser, FaBuilding, FaCalendarCheck, FaCreditCard } from "react-icons/fa";
import UpgradeButton from "@/app/components/buttons/UpgradeButton";

export default function DashboardPage() {
    const [user, setUser] = useState<any>(null);

    useEffect(() => {
        const token = localStorage.getItem("token");
        console.log("Token from localStorage:", token);

        api.get("/api/me")
            .then((res) => setUser(res.data))
            .catch((err) => console.error("API /me error:", err.response?.data || err));
    }, []);

    const trialActive = user?.trialEndsAt && new Date(user.trialEndsAt) > new Date();
    const subscribed = user?.subscriptionStatus === "active";

    return (
        <div className="max-h-screen bg-gray-100 p-8">
            <h1 className="text-4xl font-bold mb-6">Welcome back, 👋</h1>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

                {/* Email Card */}
                <div className="bg-white p-6 rounded-lg shadow flex items-center gap-4">
                    <FaUser className="text-blue-600 text-3xl" />
                    <div>
                        <p className="text-gray-500 text-sm">Email</p>
                        <p className="font-semibold">{user?.email || "Loading..."}</p>
                    </div>
                </div>

                {/* Company Card */}
                <div className="bg-white p-6 rounded-lg shadow flex items-center gap-4">
                    <FaBuilding className="text-green-600 text-3xl" />
                    <div>
                        <p className="text-gray-500 text-sm">Company</p>
                        <p className="font-semibold">{user?.companyName || "Loading..."}</p>
                    </div>
                </div>

                {/* Subscription Card */}
                <div className="bg-white p-6 rounded-lg shadow flex items-center gap-4">
                    <FaCreditCard className="text-purple-600 text-3xl" />
                    <div>
                        <p className="text-gray-500 text-sm">Subscription</p>
                        <p className="font-semibold">
                            {subscribed
                                ? "Active"
                                : trialActive
                                    ? `Trial until ${new Date(user.trialEndsAt).toLocaleDateString()}`
                                    : "Inactive"}
                        </p>

                        {!subscribed && !trialActive && (
                            <button
                                className="mt-2 bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition"
                                onClick={async () => {
                                    const res = await api.post("/api/free-trial");
                                    alert("Free trial started!");
                                    setUser((prev: any) => ({
                                        ...prev,
                                        subscriptionStatus: res.data.subscription.status,
                                        trialEndsAt: new Date(res.data.subscription.trial_end * 1000),
                                    }));
                                }}
                            >
                                Start Free Trial
                            </button>
                        )}
                        <UpgradeButton />
                        <button
                            className="mt-2 bg-gray-700 text-white px-3 py-1 rounded hover:bg-gray-800 transition"
                            onClick={async () => {
                                const res = await api.post("/api/portal");
                                window.location.href = res.data.url;
                            }}
                        >
                            Manage
                        </button>
                    </div>
                </div>

            </div>

            {/* Extra space for other dashboard sections */}
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Placeholder for Projects / Photos / Stats cards */}
                <div className="bg-white p-6 rounded-lg shadow">Projects / Stats</div>
                <div className="bg-white p-6 rounded-lg shadow">Photos</div>
                <div className="bg-white p-6 rounded-lg shadow">Other Info</div>
            </div>
        </div>
    );
}