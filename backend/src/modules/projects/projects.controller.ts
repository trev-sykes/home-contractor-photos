import type { Request, Response } from "express";
import type { AuthRequest } from "../../middleware/auth.js";
import { getProjects } from "./projects.service.js";

export const getProjectsController = async (req: Request, res: Response) => {
    const authReq = req as AuthRequest;
    try {
        const projects = await getProjects(authReq.userId);
        res.json({ projects });
    } catch (err: any) {
        console.error(err);
        res.status(400).json({ error: "Invalid credentials." });
    }
}