import type { Request, Response } from "express";
import { fetchShareData } from "./share.service.js";

export const getSharePage = async (req: Request<{ token: string }>, res: Response) => {
    const { token } = req.params;

    try {
        const data = await fetchShareData(token);
        if (!data) return res.status(404).json({ error: "Project not found" });
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: "Failed to load share page" });
    }
};