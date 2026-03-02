// components/UpgradeButton.tsx
"use client";

import { api } from "@/lib/api";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(
    process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

export default function UpgradeButton() {
    const handleUpgrade = async () => {
        try {
            const { data } = await api.post("/api/create-checkout-session");

            const stripe = await stripePromise;

            if (!stripe) return;

            window.location.href = data.url;
        } catch (err) {
            console.error("Upgrade failed:", err);
        }
    };

    return (
        <button
            onClick={handleUpgrade}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold"
        >
            Upgrade to Pro
        </button>
    );
}