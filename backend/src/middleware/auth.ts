import jwt from "jsonwebtoken";
import type { Request, Response, NextFunction } from "express";

const JWT_SECRET = process.env.JWT_SECRET || 'superkey';

export interface AuthRequest extends Request {
    userId: string;
}

export function requireAuth(
    req: Request,
    res: Response,
    next: NextFunction
) {
    const auth = req.headers.authorization;

    if (!auth) return res.status(401).json({ error: "No token provided" });

    try {
        const token = auth.split(" ")[1];
        if (!token) return res.status(401).json({ error: "Invalid token format" });

        const payload = jwt.verify(token, JWT_SECRET) as { userId: string };

        // Cast request
        (req as AuthRequest).userId = payload.userId;

        next();
    } catch {
        return res.status(401).json({ error: "Invalid token" });
    }
}