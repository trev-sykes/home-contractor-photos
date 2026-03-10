import { Router } from "express";
import { requireAuth } from "../../middleware/auth.js";
import { requireSubscription } from "../../middleware/subscription.js";
import * as projectsController from "./projects.controller.js";

const projectsRoutes: any = Router();

projectsRoutes.get("/projects", requireAuth, projectsController.getAllProjects);
projectsRoutes.get("/customers/:customerId/projects", requireAuth, projectsController.getProjects);
projectsRoutes.post("/customers/:customerId/projects", requireAuth, requireSubscription, projectsController.createProject);
projectsRoutes.get("/customers/:customerId/projects/:id", requireAuth, projectsController.getProject);
projectsRoutes.put("/customers/:customerId/projects/:id", requireAuth, requireSubscription, projectsController.editProject);
projectsRoutes.delete("/customers/:customerId/projects/:id", requireAuth, requireSubscription, projectsController.removeProject);
projectsRoutes.get("/customers/:customerId/projects/:id/share-token", requireAuth, projectsController.shareToken);

export default projectsRoutes;