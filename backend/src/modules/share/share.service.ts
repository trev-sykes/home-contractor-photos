import { prisma } from "../../config/prisma.js";

export const fetchShareData = async (shareToken: string) => {
    return await prisma.project.findUnique({
        where: { shareToken },
        select: {
            id: true,
            name: true,
            address: true,
            createdAt: true,
            photos: {
                orderBy: { createdAt: "asc" },
                select: { id: true, imageUrl: true, type: true },
            },
            customer: {
                select: {
                    user: {
                        select: { companyName: true, logoUrl: true },
                    },
                },
            },
        },
    });
};