import type { Request, Response } from "express";
import type { ProjectByIdParams, CustomerParams } from "./types.js";
import { fetchProjects, fetchProject, addProject, updateProject, deleteProject, getShareToken, fetchAllProjects } from "./projects.service.js";


export const getAllProjects = async (req: Request, res: Response) => {
    if (!req.userId) return res.status(401).json({ error: "Unauthorized" });
    const projects = await fetchAllProjects(req.userId);
    res.json(projects);
};

export const getProjects = async (req: Request<CustomerParams>, res: Response) => {
    if (!req.userId || !req.params.customerId) return res.status(401).json({ error: "Unauthorized" });
    const { customerId } = req.params
    const projects = await fetchProjects(req.userId, customerId);
    if (!projects) return res.status(404).json({ error: "Customer not found" });
    res.json(projects);
};

export const getProject = async (req: Request<ProjectByIdParams>, res: Response) => {
    if (!req.userId) return res.status(401).json({ error: "Unauthorized" });
    const project = await fetchProject(req.userId, req.params.customerId, req.params.id);
    if (!project) return res.status(404).json({ error: "Project not found" });
    res.json(project);
};

export const createProject = async (req: Request<ProjectByIdParams>, res: Response) => {
    if (!req.userId) return res.status(401).json({ error: "Unauthorized" });
    const { name, address } = req.body;
    if (!name) return res.status(400).json({ error: "Project name is required" });
    try {
        const project = await addProject(req.userId, req.params.customerId, { name, address });
        if (!project) return res.status(404).json({ error: "Customer not found" });
        res.json(project);
    } catch (err) {
        res.status(500).json({ error: "Failed to create project" });
    }
};

export const editProject = async (req: Request<ProjectByIdParams>, res: Response) => {
    if (!req.userId) return res.status(401).json({ error: "Unauthorized" });
    const { name, address } = req.body;
    if (!name) return res.status(400).json({ error: "Project name is required" });
    try {
        await updateProject(req.userId, req.params.customerId, req.params.id, { name, address });
        res.json({ success: true });
    } catch (err) {
        res.status(500).json({ error: "Failed to update project" });
    }
};

export const removeProject = async (req: Request<ProjectByIdParams>, res: Response) => {
    if (!req.userId) return res.status(401).json({ error: "Unauthorized" });
    try {
        await deleteProject(req.userId, req.params.customerId, req.params.id);
        res.json({ success: true });
    } catch (err) {
        res.status(500).json({ error: "Failed to delete project" });
    }
};

export const shareToken = async (req: Request<ProjectByIdParams>, res: Response) => {
    if (!req.userId) return res.status(401).json({ error: "Unauthorized" });
    try {
        const token = await getShareToken(req.userId, req.params.customerId, req.params.id);
        if (!token) return res.status(404).json({ error: "Project not found" });
        res.json({ token });
    } catch (err) {
        res.status(500).json({ error: "Failed to get share token" });
    }
};