import type { Request, Response } from "express";
import { me, login, register } from "./auth.service.js";

export const meController = async (req: Request, res: Response) => {
    if (!req.userId) {
        return res.status(401).json({ error: "Unauthorized" });
    }
    const user = await me(req.userId);
    if (!user) {
        return res.status(404).json({ error: "User not found" });
    }
    res.json(user);
}

export const loginController = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    try {
        const token = await login(email, password);
        res.json({ token });
    } catch (err) {
        res.status(401).json({ error: "Invalid credentials" });
    }
};

export const registerController = async (req: Request, res: Response) => {
    const { email, password, companyName } = req.body;
    try {
        const { user, customer } = await register(email, password, companyName);
        res.json({
            id: user.id,
            email: user.email,
            companyName: user.companyName,
            stripeCustomerId: customer.id,
        });
    } catch (err: any) {
        console.error("REGISTER CONTROLLER ERROR:", err);
        res.status(400).json({ error: err.message }); // 👈 return the real message
    }
}
