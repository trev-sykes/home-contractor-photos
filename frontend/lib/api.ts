import axios from "axios";

export const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

// Attach JWT automatically
api.interceptors.request.use((config) => {
    if (typeof window !== "undefined") {
        const token = localStorage.getItem("token");
        if (token && config.headers) {
            config.headers.Authorization = `Bearer ${token}`;
        }
    }
    return config;
});

// Handle 402 — subscription required
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 402) {
            window.location.href = "/dashboard?upgrade=true";
        }
        return Promise.reject(error);
    }
);