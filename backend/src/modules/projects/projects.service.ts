import { prisma } from "../../config/prisma.js";

export const getProjects = async (userId: string) => {
    const user = await prisma.user.findUnique({
        where: { id: userId },
        include: {
            customers: {
                include: {
                    projects: true,
                },
            },
        },
    });
    if (!user) throw new Error();

    return user.customers.flatMap(c => c.projects) || [];
}