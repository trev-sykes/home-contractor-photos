import type { Request, Response } from "express"
import type { AuthRequest } from "../../middleware/auth.js";
import { openPortal, startFreeTrial } from "./billing.service.js";

export const startFreeTrialController = async (req: Request, res: Response) => {

    const authReq = req as AuthRequest;
    try {
        const subscription = await startFreeTrial(authReq.userId);
        res.json({ subscription });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to start free trial" });
    }
}

export const portalController = async (req: Request, res: Response) => {
    const authReq = req as AuthRequest;
    try {
        const session = await openPortal(authReq.userId);
        res.json({ url: session.url });

    } catch (err: any) {
        res.status(500).json({ error: "Failed to open portal" });
    }
}