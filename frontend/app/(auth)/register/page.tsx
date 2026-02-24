"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { register } from "@/lib/auth";

export default function RegisterPage() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [companyName, setCompanyName] = useState("");

    const handleRegister = async () => {
        try {
            await register(email, password, companyName);
            alert("Account created! Please log in.");
            router.push("/login");
        } catch (err: any) {
            alert(err?.response?.data?.error || "Registration failed");
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen gap-4 p-6">
            <h1 className="text-2xl font-bold">Register</h1>
            <input
                placeholder="Company Name"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                className="border p-2 w-72"
            />
            <input
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border p-2 w-72"
            />
            <input
                placeholder="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="border p-2 w-72"
            />
            <button
                onClick={handleRegister}
                className="bg-green-500 text-white px-4 py-2 rounded"
            >
                Register
            </button>
            <a
                href="/login"
                className="text-sm underline mt-2"
            >
                Already have an account? Login
            </a>
        </div>
    );
}