import Link from "next/link";

function MarketingHeader() {
    return (
        <header
            className="sticky top-0 z-10 px-4 sm:px-6 py-4"
            style={{
                backgroundColor: "rgba(255,255,255,0.85)",
                backdropFilter: "blur(12px)",
                borderBottom: "1px solid #e2e8f0",
            }}
        >
            <div className="max-w-5xl mx-auto flex items-center justify-between">
                <Link href="/" className="flex items-center gap-3">
                    <div
                        className="w-8 h-8 rounded-lg flex items-center justify-center font-black text-xs flex-shrink-0"
                        style={{ backgroundColor: "#fbbf24", color: "#020617" }}
                    >
                        HC
                    </div>
                    <span className="font-bold text-slate-800 hidden sm:block">
                        Home Contractor Photos
                    </span>
                </Link>
                <div className="flex items-center gap-3">
                    <Link
                        href="/login"
                        className="text-sm font-semibold text-slate-500 hover:text-slate-800 transition"
                    >
                        Log In
                    </Link>
                    <Link href="/register" className="btn-primary">
                        Start Free Trial
                    </Link>
                </div>
            </div>
        </header>
    );
}

function MarketingFooter() {
    const links = [
        { href: "/", label: "Home" },
        { href: "/features", label: "Features" },
        { href: "/pricing", label: "Pricing" },
        { href: "/about", label: "About" },
        { href: "/contact", label: "Contact" },
        { href: "/terms", label: "Terms" },
        { href: "/privacy", label: "Privacy" },
    ];

    return (
        <footer className="border-t border-slate-200 py-8 mt-8">
            <div className="max-w-5xl mx-auto px-4 sm:px-6">
                <div className="flex flex-wrap justify-center gap-4 sm:gap-6 mb-4">
                    {links.map(({ href, label }) => (
                        <Link
                            key={href}
                            href={href}
                            className="text-sm text-slate-400 hover:text-slate-600 transition"
                        >
                            {label}
                        </Link>
                    ))}
                </div>
                <p className="text-center text-xs text-slate-300">
                    © {new Date().getFullYear()} Home Contractor Photos. All rights reserved.
                </p>
            </div>
        </footer>
    );
}

export default function MarketingLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="min-h-screen" style={{ backgroundColor: "#f8fafc" }}>
            <MarketingHeader />
            <main>{children}</main>
            <MarketingFooter />
        </div>
    );
}