import { prisma } from "@/lib/prisma";

import { generateUserCacheKey, getJsonFromRedis, setJsonToRedis } from "@/utils/redis";

export const findUserByEmail = async (email: string) => {
    return prisma.user.findUnique({ where: { email } });
};

export const findUserById = async (id: string) => {
    const key = generateUserCacheKey(id);

    const cachedUser = await getJsonFromRedis(key);

    if (cachedUser) {
        return cachedUser;
    }

    const user = await prisma.user.findUnique({ where: { id } });

    if (user) {
        await setJsonToRedis(key, user);
    }

    return user;
};
