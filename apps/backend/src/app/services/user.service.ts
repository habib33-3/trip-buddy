import { prisma } from "@/lib/prisma";

import { cacheGet, cacheSet } from "@/utils/redis";
import { cacheKeyUser } from "@/utils/redis-key";

import type { User } from "@/generated/prisma";

export const findUserByEmail = async (email: string) => {
    return prisma.user.findUnique({ where: { email } });
};

export const findUserById = async (id: string) => {
    const key = cacheKeyUser(id);

    const cachedUser = await cacheGet<User>(key);
    if (cachedUser) {
        return cachedUser;
    }

    const user = await prisma.user.findUnique({ where: { id } });

    if (user) {
        await cacheSet(key, user);
    }

    return user;
};
