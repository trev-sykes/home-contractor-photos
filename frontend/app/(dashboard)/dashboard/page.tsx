"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";

export default function DashboardPage() {
    const [user, setUser] = useState<any>(null);

    useEffect(() => {
        api.get("/api/me").then((res) => setUser(res.data));
    }, []);

    const trialActive = user?.trialEndsAt && new Date(user.trialEndsAt) > new Date();
    const subscribed = user?.subscriptionStatus === "active";

    return (
        <div className="flex flex-col gap-6">
            <h1 className="text-3xl font-bold">Welcome back 👋</h1>

            <div className="bg-white p-6 rounded shadow">
                <p>Email: {user?.email}</p>
                <p>Company: {user?.companyName}</p>
                <p>
                    Subscription:{" "}
                    {subscribed
                        ? "Active"
                        : trialActive
                            ? `Trial active until ${new Date(user.trialEndsAt).toLocaleDateString()}`
                            : "Inactive"}
                </p>

                {!subscribed && !trialActive && (
                    <button
                        className="mt-4 bg-blue-600 text-white px-4 py-2 rounded"
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
                <button
                    className="mt-4 bg-gray-700 text-white px-4 py-2 rounded"
                    onClick={async () => {
                        const res = await api.post("/api/portal");
                        window.location.href = res.data.url;
                    }}
                >
                    Manage Subscription
                </button>
            </div>
        </div>
    );
}