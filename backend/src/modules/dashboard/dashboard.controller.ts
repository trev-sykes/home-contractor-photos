import type { Request, Response } from "express"
export const getDashboardController = async (req: Request, res: Response) => {
    res.json({ message: "Welcome to your premium dashboard!" });
}