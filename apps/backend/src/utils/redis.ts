export const generateRefreshTokenKey = (userId: string) => {
    return `refreshToken:${userId}`;
};
