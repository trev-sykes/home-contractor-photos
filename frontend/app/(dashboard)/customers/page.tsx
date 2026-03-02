"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import Link from "next/link";
import { FaUser, FaPlus } from "react-icons/fa";

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

    useEffect(() => {
        api.get("/api/customers")
            .then((res) => setCustomers(res.data))
            .catch(console.error)
            .finally(() => setLoading(false));
    }, []);

    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <div className="max-w-5xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold">Customers</h1>
                    <Link
                        href="/dashboard/customers/new"
                        className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl font-semibold transition"
                    >
                        <FaPlus /> New Customer
                    </Link>
                </div>

                {loading ? (
                    <p className="text-gray-500">Loading...</p>
                ) : customers.length === 0 ? (
                    <div className="bg-white rounded-xl border border-gray-200 p-16 text-center">
                        <FaUser className="text-gray-300 text-6xl mx-auto mb-4" />
                        <p className="text-gray-500 text-lg mb-4">No customers yet</p>
                        <Link
                            href="/customers/new"
                            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold transition"
                        >
                            Add your first customer
                        </Link>
                    </div>
                ) : (
                    <div className="grid gap-4">
                        {customers.map((c) => (
                            <div
                                key={c.id}
                                className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm flex justify-between items-center"
                            >
                                <div className="flex items-center gap-4">
                                    <div className="bg-blue-100 text-blue-600 rounded-full w-11 h-11 flex items-center justify-center font-bold text-lg">
                                        {c.name.charAt(0).toUpperCase()}
                                    </div>
                                    <div>
                                        <p className="font-semibold text-gray-900">{c.name}</p>
                                        <p className="text-sm text-gray-500">
                                            {c.email ?? "No email"} {c.phone ? `• ${c.phone}` : ""}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-6">
                                    <span className="text-sm text-gray-400">
                                        {c._count.projects} project{c._count.projects !== 1 ? "s" : ""}
                                    </span>
                                    <Link
                                        href={`/customers/${c.id}`}
                                        className="text-blue-600 hover:text-blue-800 font-medium text-sm transition"
                                    >
                                        View →
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}