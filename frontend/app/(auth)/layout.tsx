"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { logout } from "@/lib/auth";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
    const [loggedIn, setLoggedIn] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem("token");
        setLoggedIn(!!token);
    }, []);

    const handleLogout = () => {
        logout();
        setLoggedIn(false);
        router.push("/login");
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-6">
            <nav className="flex gap-4 mb-6">
                {loggedIn ? (
                    <>
                        <Link href="/dashboard">Dashboard</Link>
                        <button onClick={handleLogout} className="bg-red-600 px-3 py-1 rounded">
                            Logout
                        </button>
                    </>
                ) : (
                    <>
                        <Link href="/login">Login</Link>
                        <Link href="/register">Register</Link>
                    </>
                )}
            </nav>

            <main className="w-full max-w-md">{children}</main>
        </div>
    );
}