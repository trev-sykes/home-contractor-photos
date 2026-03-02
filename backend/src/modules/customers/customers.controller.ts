import type { Request, Response } from "express";
import { fetchCustomers, addCustomer } from "./customers.service.js";

export const getCustomers = async (req: Request, res: Response) => {
    if (!req.userId) return res.status(401).json({ error: "Unauthorized" });
    const customers = await fetchCustomers(req.userId);
    res.json(customers);
};

export const createCustomer = async (req: Request, res: Response) => {
    if (!req.userId) return res.status(401).json({ error: "Unauthorized" });
    const { name, email, phone } = req.body;
    if (!name) return res.status(400).json({ error: "Name is required" });
    try {
        const customer = await addCustomer(req.userId, { name, email, phone });
        res.json(customer);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to create customer" });
    }
};