import { Router } from "express";
import { requireAuth } from "../../middleware/auth.js";
import { requireSubscription } from "../../middleware/subscription.js";
import * as projectsController from "./projects.controller.js";
const projectsRoutes = Router();

projectsRoutes.get("/projects", requireAuth, requireSubscription, projectsController.getProjectsController);

export default projectsRoutes;