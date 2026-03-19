import type { Request, Response } from "express";
import { fetchCustomers, addCustomer, fetchCustomerById, editCustomer, removeCustomer } from "./customers.service.js";

export const getCustomers = async (req: Request, res: Response) => {
    if (!req.userId) return res.status(401).json({ error: "Unauthorized" });
    const customers = await fetchCustomers(req.userId);
    res.json(customers);
};
export const getCustomerById = async (req: Request<any>, res: Response) => {
    if (!req.userId) return res.status(401).json({ error: "Unauthorized" });

    const customer = await fetchCustomerById(
        req.userId,
        req.params.customerId
    );

    if (!customer) {
        return res.status(404).json({ error: "Customer not found" });
    }

    res.json(customer);
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
export const updateCustomer = async (req: Request<any>, res: Response) => {
    if (!req.userId) return res.status(401).json({ error: "Unauthorized" });
    const { name, email, phone } = req.body;
    if (!name) return res.status(400).json({ error: "Name is required" });
    try {
        await editCustomer(req.userId, req.params.customerId, { name, email, phone });
        res.json({ success: true });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to update customer" });
    }
};

export const deleteCustomer = async (req: Request<any>, res: Response) => {
    if (!req.userId) return res.status(401).json({ error: "Unauthorized" });
    try {
        await removeCustomer(req.userId, req.params.customerId);
        res.json({ success: true });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to delete customer" });
    }
};