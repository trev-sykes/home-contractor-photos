import { Router } from "express";
import { requireAuth } from "../../middleware/auth.js";
import * as projectsController from "./projects.controller.js";

const projectsRoutes: any = Router();

projectsRoutes.get("/customers/:customerId/projects", requireAuth, projectsController.getProjects);
projectsRoutes.post("/customers/:customerId/projects", requireAuth, projectsController.createProject);
projectsRoutes.get("/customers/:customerId/projects/:id", requireAuth, projectsController.getProject);
projectsRoutes.put("/customers/:customerId/projects/:id", requireAuth, projectsController.editProject);
projectsRoutes.delete("/customers/:customerId/projects/:id", requireAuth, projectsController.removeProject);

export default projectsRoutes;