import express from "express";
import cors from "cors";
import authRoutes from "./modules/auth/auth.routes.js";
import projectsRoutes from "./modules/projects/projects.routes.js";
import dashboardRoutes from "./modules/dashboard/dashboard.routes.js";
import billingRoutes from "./modules/billing/billing.routes.js";
import welcomeRoutes from "./modules/welcome/welcome.routes.js";
import { handleStripeWebhook } from "./modules/billing/billing.webhooks.js";

const app = express();

app.use(cors({
    origin: [
        "http://localhost:3000",
        "https://your-frontend-domain.com"
    ],
    credentials: true
}));

app.post(
    "/webhooks/stripe",
    express.raw({ type: "application/json" }),
    handleStripeWebhook
);

app.use(express.json());


app.use("/api", authRoutes);
app.use("/api", projectsRoutes);
app.use("/api", dashboardRoutes);
app.use("/api", billingRoutes);
app.use("/api", welcomeRoutes);

const PORT = process.env.PORT || 4001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));