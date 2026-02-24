"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { login } from "@/lib/auth";

export default function LoginPage() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async () => {
        try {
            await login(email, password);
            router.push("/dashboard");
        } catch (err: any) {
            alert(err?.response?.data?.error || "Login failed");
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen gap-4 p-6">
            <h1 className="text-2xl font-bold">Login</h1>
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
                onClick={handleLogin}
                className="bg-blue-500 text-white px-4 py-2 rounded"
            >
                Login
            </button>
            <a
                href="/register"
                className="text-sm underline mt-2"
            >
                Don’t have an account? Register
            </a>
        </div>
    );
}