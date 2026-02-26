import type { Request, Response } from "express";
import { getProjects } from "./projects.service.js";

export const getProjectsController = async (req: Request, res: Response) => {
    if (!req.userId) {
        return res.status(401).json({ error: "Unauthorized" });
    }

    try {
        const projects = await getProjects(req.userId);
        res.json({ projects });
    } catch (err: any) {
        console.error(err);
        res.status(400).json({ error: "Invalid credentials." });
    }
}