import type { Request, Response } from "express";
import { uploadLogo, fetchSettings, updateSettings } from "./settings.service.js";

export const getSettings = async (req: Request, res: Response) => {
    if (!req.userId) return res.status(401).json({ error: "Unauthorized" });
    const settings = await fetchSettings(req.userId);
    res.json(settings);
};

export const uploadLogoController = async (req: Request, res: Response) => {
    if (!req.userId) return res.status(401).json({ error: "Unauthorized" });
    if (!req.file) return res.status(400).json({ error: "No file provided" });
    try {
        const result = await uploadLogo(req.userId, req.file);
        res.json(result);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Logo upload failed" });
    }
};

export const updateSettingsController = async (req: Request, res: Response) => {
    if (!req.userId) return res.status(401).json({ error: "Unauthorized" });
    const { companyName } = req.body;
    if (!companyName?.trim()) return res.status(400).json({ error: "Company name is required" });
    try {
        const result = await updateSettings(req.userId, companyName);
        res.json(result);
    } catch (err) {
        res.status(500).json({ error: "Failed to update settings" });
    }
};