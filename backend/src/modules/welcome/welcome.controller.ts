import type { Request, Response } from "express"

export const getWelcomeController = (req: Request, res: Response) => {
    res.json("Welcome to Home Contractor Photos")
}