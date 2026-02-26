import { JWT_SECRET } from "../config/config.js"; // use JWT_SECRET safely
import jwt from "jsonwebtoken";
import type { Request, Response, NextFunction } from "express";

// middleware/auth.ts
if (!JWT_SECRET) throw new Error("JWT_SECRET is not defined");

export function requireAuth(
    req: Request,
    res: Response,
    next: NextFunction
) {
    console.log("Incoming headers:", req.headers);
    const auth = req.headers.authorization;

    if (!auth) {
        console.log("No Authorization header present");
        return res.status(401).json({ error: "No token provided" });
    }

    try {
        const token = auth.split(" ")[1];
        if (!token) {
            console.log("Token is missing after splitting header:", auth);
            return res.status(401).json({ error: "Invalid token format" });
        }

        const payload = jwt.verify(token, JWT_SECRET!) as unknown as { userId?: string };
        if (!payload.userId) {
            return res.status(401).json({ error: "Invalid token payload" });
        } (req as Request).userId = payload.userId;

        next();
    } catch {
        return res.status(401).json({ error: "Invalid token" });
    }
}