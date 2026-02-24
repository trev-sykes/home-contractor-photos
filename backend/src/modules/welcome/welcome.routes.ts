import { Router } from "express";
import * as welcomeController from "./welcome.controller.js";

const welcomeRoutes = Router();

welcomeRoutes.get("/", welcomeController.getWelcomeController);

export default welcomeRoutes