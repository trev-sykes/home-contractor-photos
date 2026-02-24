// middleware/subscription.ts
import { prisma } from "../config/prisma.js";
import type { Request, Response, NextFunction } from "express";
import { requireAuth, type AuthRequest } from "./auth.js";

export const requireSubscription = async (
    req: AuthRequest,
    res: Response,
    next: NextFunction
) => {

    const user = await prisma.user.findUnique({
        where: { id: req.userId },
    });

    if (!user) {
        return res.status(401).json({ error: "User not found" });
    }

    const now = new Date();

    const trialActive =
        user.plan === "pro" &&
        user.trialEndsAt &&
        now < user.trialEndsAt;

    const paidActive =
        user.subscriptionStatus === "active";

    if (!trialActive && !paidActive) {
        return res.status(402).json({ error: "Subscription required" });
    }

    next();
};