import dotenv from "dotenv";
dotenv.config();

export const JWT_SECRET = process.env.JWT_SECRET!;
export const PORT = process.env.PORT || 4001;
export const STRIPE_PRICE_ID = process.env.STRIPE_PRICE_ID;
export const FRONTEND_URL = process.env.NODE_ENV === "production"
    ? process.env.FRONTEND_URL_PROD
    : process.env.FRONTEND_URL_LOCAL;