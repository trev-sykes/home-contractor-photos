"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import Link from "next/link";
import { FaUser, FaPlus, FaArrowRight, FaSearch } from "react-icons/fa";

interface Customer {
    id: string;
    name: string;
    email?: string;
    phone?: string;
    _count: { projects: number };
}

export default function CustomersPage() {
    const [customers, setCustomers] = useState<Customer[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");

    useEffect(() => {
        api.get("/api/customers")
            .then((res) => setCustomers(res.data))
            .catch(console.error)
            .finally(() => setLoading(false));
    }, []);

    const filtered = customers.filter((c) =>
        c.name.toLowerCase().includes(search.toLowerCase()) ||
        c.email?.toLowerCase().includes(search.toLowerCase()) ||
        c.phone?.includes(search)
    );

    return (
        <div className="page">
            <div className="max-w-5xl mx-auto space-y-6">

                {/* Header */}
                <div className="flex justify-between items-start gap-4">
                    <div>
                        <p className="section-eyebrow">Directory</p>
                        <h1 className="font-display text-4xl font-extrabold text-slate-900">
                            Customers
                        </h1>
                        <p className="text-slate-500 text-sm mt-1">
                            {loading ? "Loading..." : `${customers.length} customer${customers.length !== 1 ? "s" : ""} total`}
                        </p>
                    </div>
                    <Link href="/customers/new" className="btn-primary flex-shrink-0">
                        <FaPlus className="text-xs" /> New Customer
                    </Link>
                </div>

                {/* Search */}
                {customers.length > 0 && (
                    <div className="relative">
                        <FaSearch
                            className="absolute left-4 top-1/2 -translate-y-1/2 text-xs"
                            style={{ color: "#94a3b8" }}
                        />
                        <input
                            type="text"
                            placeholder="Search by name, email, or phone..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="input pl-10"
                        />
                    </div>
                )}

                {/* States */}
                {loading ? (
                    <div className="card card-body text-center py-16">
                        <p style={{ color: "var(--color-text-faint)" }}>Loading...</p>
                    </div>

                ) : customers.length === 0 ? (
                    <div className="card card-body text-center py-20">
                        <div
                            className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4"
                            style={{ backgroundColor: "#f1f5f9" }}
                        >
                            <FaUser className="text-2xl" style={{ color: "#94a3b8" }} />
                        </div>
                        <p className="font-bold text-slate-700 text-lg mb-1">No customers yet</p>
                        <p className="text-slate-500 text-sm mb-6">
                            Add your first customer to start organizing projects and photos.
                        </p>
                        <Link href="/customers/new" className="btn-primary inline-flex mx-auto">
                            <FaPlus className="text-xs" /> Add First Customer
                        </Link>
                    </div>

                ) : filtered.length === 0 ? (
                    <div className="card card-body text-center py-12">
                        <p className="text-slate-500">No customers match your search.</p>
                    </div>

                ) : (
                    <div className="space-y-3">
                        {filtered.map((c) => (
                            <Link
                                key={c.id}
                                href={`/customers/${c.id}`}
                                className="card card-body flex items-center justify-between gap-4 hover:shadow-md transition group"
                                style={{ padding: "1.25rem 1.5rem" }}
                            >
                                <div className="flex items-center gap-4 min-w-0">
                                    {/* Avatar */}
                                    <div
                                        className="w-11 h-11 rounded-full flex items-center justify-center font-black text-lg flex-shrink-0"
                                        style={{
                                            backgroundColor: "rgba(251,191,36,0.12)",
                                            color: "var(--color-amber-dark)",
                                        }}
                                    >
                                        {c.name.charAt(0).toUpperCase()}
                                    </div>

                                    {/* Info */}
                                    <div className="min-w-0">
                                        <p className="font-bold text-slate-800 group-hover:text-amber-600 transition truncate">
                                            {c.name}
                                        </p>
                                        <p className="text-sm text-slate-400 truncate">
                                            {c.email ?? "No email"}
                                            {c.phone ? ` · ${c.phone}` : ""}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-6 flex-shrink-0">
                                    <span
                                        className="text-xs font-semibold px-3 py-1 rounded-full hidden sm:block"
                                        style={{
                                            backgroundColor: "#f1f5f9",
                                            color: "#64748b",
                                        }}
                                    >
                                        {c._count.projects} project{c._count.projects !== 1 ? "s" : ""}
                                    </span>
                                    <FaArrowRight
                                        className="text-slate-300 group-hover:text-amber-400 transition text-sm"
                                    />
                                </div>
                            </Link>
                        ))}
                    </div>
                )}

                {/* Footer count */}
                {!loading && filtered.length > 0 && search && (
                    <p className="text-center text-xs" style={{ color: "var(--color-text-faint)" }}>
                        Showing {filtered.length} of {customers.length} customers
                    </p>
                )}

            </div>
        </div>
    );
}