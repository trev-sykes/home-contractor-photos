import { Router } from "express";
import { requireAuth } from "../../middleware/auth.js";
import { requireSubscription } from "../../middleware/subscription.js";
import * as customersController from "./customers.controller.js";

const customersRoutes: any = Router();

customersRoutes.get("/customers", requireAuth, customersController.getCustomers);
customersRoutes.get("/customers/:customerId", requireAuth, customersController.getCustomerById);
customersRoutes.post("/customers", requireAuth, requireSubscription, customersController.createCustomer);

export default customersRoutes;