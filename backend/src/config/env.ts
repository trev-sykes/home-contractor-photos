import dotenv from "dotenv";
dotenv.config();

function requiredEnv(name: string): string {
    const value = process.env[name];
    if (!value) {
        throw new Error(`❌ Missing environment variable: ${name}`);
    }
    return value;
}

const NODE_ENV = process.env.NODE_ENV ?? "development";

export const env = Object.freeze({
    NODE_ENV,
    PORT: process.env.PORT || 4001,
    JWT_SECRET: requiredEnv("JWT_SECRET"),
    DATABASE_URL: requiredEnv("DATABASE_URL"),
    RESEND_API_KEY: requiredEnv("RESEND_API_KEY"),
    get STRIPE() {
        return {
            STRIPE_SECRET_KEY: requiredEnv("STRIPE_SECRET_KEY"),
            STRIPE_PRICE_ID: requiredEnv("STRIPE_PRICE_ID"),
            STRIPE_WEBHOOK_SECRET: requiredEnv("STRIPE_WEBHOOK_SECRET"),
        };
    },
    get CLOUDINARY() {
        return {
            CLOUD_NAME: requiredEnv("CLOUDINARY_CLOUD_NAME"),
            API_KEY: requiredEnv("CLOUDINARY_API_KEY"),
            API_SECRET: requiredEnv("CLOUDINARY_API_SECRET"),
        };
    },
    get FRONTEND_URL() {
        return process.env.NODE_ENV === "production"
            ? requiredEnv("FRONTEND_URL_PROD")
            : requiredEnv("FRONTEND_URL_LOCAL");
    },
});