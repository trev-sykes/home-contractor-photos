"use client";

import { logout } from "@/lib/auth";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import { FaUsers, FaFolder, FaCamera, FaCog, FaSignOutAlt } from "react-icons/fa";
import { RiHome5Line } from "react-icons/ri";

const navLinks = [
    { href: "/customers", label: "Customers", icon: FaUsers },
    { href: "/projects", label: "Projects", icon: FaFolder },
    { href: "/photos", label: "Photos", icon: FaCamera },
    { href: "/settings", label: "Settings", icon: FaCog },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const pathname = usePathname();

    const handleLogout = () => {
        logout();
        router.push("/login");
    };

    return (
        <div className="flex min-h-screen" style={{ backgroundColor: "var(--color-bg)" }}>

            {/* Sidebar */}
            <aside
                className="w-64 flex-shrink-0 flex flex-col p-5"
                style={{
                    backgroundColor: "var(--color-surface)",
                    borderRight: "1px solid var(--color-border-subtle)",
                }}
            >
                {/* Logo */}
                <Link
                    href="/dashboard"
                    className="flex items-center gap-3 px-2 mb-8 mt-1"
                >
                    <div
                        className="w-8 h-8 rounded-lg flex items-center justify-center font-black text-xs flex-shrink-0"
                        style={{ backgroundColor: "var(--color-amber)", color: "var(--color-bg)" }}
                    >
                        HC
                    </div>
                    <span
                        className="text-sm font-bold leading-tight"
                        style={{ color: "var(--color-text)" }}
                    >
                        Home Contractor Photos
                    </span>
                </Link>

                {/* Nav label */}
                <p
                    className="text-xs font-bold uppercase tracking-widest px-3 mb-3"
                    style={{ color: "var(--color-text-faint)" }}
                >
                    Menu
                </p>

                {/* Nav links */}
                <nav className="flex flex-col gap-1 flex-1">
                    {navLinks.map(({ href, label, icon: Icon }) => {
                        const active = pathname === href || pathname.startsWith(href + "/");
                        return (
                            <Link
                                key={href}
                                href={href}
                                className={active ? "nav-link-active" : "nav-link"}
                            >
                                <Icon className="text-base flex-shrink-0" />
                                {label}
                            </Link>
                        );
                    })}
                </nav>

                {/* Bottom — user + logout */}
                <div
                    className="mt-auto pt-4"
                    style={{ borderTop: "1px solid var(--color-border-subtle)" }}
                >
                    <button
                        onClick={handleLogout}
                        className="nav-link w-full text-left"
                        style={{ color: "var(--color-text-faint)" }}
                    >
                        <FaSignOutAlt className="text-base flex-shrink-0" />
                        Log Out
                    </button>
                </div>
            </aside>

            {/* Main content */}
            <main className="flex-1 overflow-auto" style={{ backgroundColor: "#f1f5f9" }}>
                {children}
            </main>
        </div>
    );
}