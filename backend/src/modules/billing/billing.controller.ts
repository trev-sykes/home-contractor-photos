import type { Request, Response } from "express"
import { openPortal, startFreeTrial } from "./billing.service.js";

export const startFreeTrialController = async (req: Request, res: Response) => {
    if (!req.userId) {
        return res.status(401).json({ error: "Unauthorized" });
    }
    try {
        const subscription = await startFreeTrial(req.userId);
        res.json({ subscription });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to start free trial" });
    }
}

export const portalController = async (req: Request, res: Response) => {
    if (!req.userId) {
        return res.status(401).json({ error: "Unauthorized" });
    }

    try {
        const session = await openPortal(req.userId);
        res.json({ url: session.url });

    } catch (err: any) {
        res.status(500).json({ error: "Failed to open portal" });
    }
}