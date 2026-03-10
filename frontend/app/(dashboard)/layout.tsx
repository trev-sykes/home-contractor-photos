"use client";

import { Suspense } from "react";
import { logout } from "@/lib/auth";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { FaUsers, FaFolder, FaCamera, FaCog, FaSignOutAlt, FaTachometerAlt } from "react-icons/fa";

const navLinks = [
    { href: "/dashboard", label: "Home", icon: FaTachometerAlt },
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

            {/* ── SIDEBAR (md+) ── */}
            <aside
                className="hidden md:flex w-64 flex-shrink-0 flex-col p-5"
                style={{
                    backgroundColor: "var(--color-surface)",
                    borderRight: "1px solid var(--color-border-subtle)",
                }}
            >
                {/* Logo */}
                <Link href="/dashboard" className="flex items-center gap-3 px-2 mb-8 mt-1">
                    <div
                        className="w-8 h-8 rounded-lg flex items-center justify-center font-black text-xs flex-shrink-0"
                        style={{ backgroundColor: "var(--color-amber)", color: "var(--color-bg)" }}
                    >
                        HC
                    </div>
                    <span className="text-sm font-bold leading-tight" style={{ color: "var(--color-text)" }}>
                        Home Contractor Photos
                    </span>
                </Link>

                <p className="text-xs font-bold uppercase tracking-widest px-3 mb-3" style={{ color: "var(--color-text-faint)" }}>
                    Menu
                </p>

                <nav className="flex flex-col gap-1 flex-1">
                    {navLinks.map(({ href, label, icon: Icon }) => {
                        const active = pathname === href || (href !== "/dashboard" && pathname.startsWith(href + "/"));
                        return (
                            <Link key={href} href={href} className={active ? "nav-link-active" : "nav-link"}>
                                <Icon className="text-base flex-shrink-0" />
                                {label}
                            </Link>
                        );
                    })}
                </nav>

                <div className="mt-auto pt-4" style={{ borderTop: "1px solid var(--color-border-subtle)" }}>
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

            {/* ── MAIN ── */}
            <main
                className="flex-1 overflow-auto pb-20 md:pb-0"
                style={{ backgroundColor: "#f1f5f9" }}
            >
                <Suspense fallback={null}>
                    {children}
                </Suspense>
            </main>

            {/* ── BOTTOM TAB BAR (mobile only) ── */}
            <nav
                className="md:hidden fixed bottom-0 left-0 right-0 z-50 flex items-center justify-around px-2 py-2"
                style={{
                    backgroundColor: "var(--color-surface)",
                    borderTop: "1px solid var(--color-border-subtle)",
                    paddingBottom: "env(safe-area-inset-bottom)",
                }}
            >
                {navLinks.map(({ href, label, icon: Icon }) => {
                    const active = pathname === href || (href !== "/dashboard" && pathname.startsWith(href + "/"));
                    return (
                        <Link
                            key={href}
                            href={href}
                            className="flex flex-col items-center gap-0.5 px-3 py-1 rounded-xl transition flex-1"
                            style={{
                                color: active ? "var(--color-amber)" : "var(--color-text-faint)",
                            }}
                        >
                            <Icon className="text-lg" />
                            <span className="text-xs font-semibold">{label}</span>
                        </Link>
                    );
                })}
            </nav>
        </div>
    );
}