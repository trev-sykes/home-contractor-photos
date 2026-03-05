"use client";

import { logout } from "@/lib/auth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    const router = useRouter();

    const handleLogout = () => {
        logout();
        router.push("/login");
    };

    return (
        <div className="flex min-h-screen">
            <aside className="w-64 bg-black text-white p-6 flex flex-col gap-4">
                {/* Logo */}
                <Link href="/dashboard" className="flex items-center gap--10">
                    <div className="relative w-30 h-30">
                        <Image
                            src="/logo.png"
                            alt="Logo"
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            className="object-contain"
                        />
                    </div>
                    <h2 className="text-m font-bold">Home Contractor</h2>
                </Link>

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