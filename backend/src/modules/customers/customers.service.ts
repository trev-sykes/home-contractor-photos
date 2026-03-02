import { prisma } from "../../config/prisma.js";

export const fetchCustomers = async (userId: string) => {
    return await prisma.customer.findMany({
        where: { userId },
        orderBy: { name: "asc" },
        select: {
            id: true,
            name: true,
            email: true,
            phone: true,
            _count: { select: { projects: true } },
        },
    });
};

export const addCustomer = async (
    userId: string,
    data: { name: string; email?: string; phone?: string }
) => {
    return await prisma.customer.create({
        data: { ...data, userId },
    });
};