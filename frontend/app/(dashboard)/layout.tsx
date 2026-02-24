"use client";

import { logout } from "@/lib/auth";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    const router = useRouter();

    const handleLogout = () => {
        logout();
        router.push("/login");
    };

    return (
        <div className="flex min-h-screen">
            <aside className="w-64 bg-black text-white p-6 flex flex-col gap-4">
                <h2 className="text-xl font-bold">Contractor App</h2>
                <Link href="/dashboard">Dashboard</Link>
                <Link href="/customers">Customers</Link>
                <Link href="/projects">Projects</Link>
                <Link href="/photos">Photos</Link>
                <button onClick={handleLogout} className="mt-auto bg-red-600 p-2 rounded">
                    Logout
                </button>
            </aside>
            <main className="flex-1 p-8 bg-gray-100">{children}</main>
        </div>
    );
}