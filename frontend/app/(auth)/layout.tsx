"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
    const router = useRouter();

    useEffect(() => {
        // Redirect to dashboard if already logged in
        const token = localStorage.getItem("token");
        if (token) router.push("/dashboard");
    }, [router]);

    return (
        <div style={{ backgroundColor: "var(--color-bg)" }}>
            {children}
        </div>
    );
}