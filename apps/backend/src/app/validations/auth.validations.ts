import { z } from "zod";

export const registerUserSchema = z.object({
    body: z
        .object({
            email: z.string().email(),
            name: z.string().min(3),
            password: z.string().min(6),
        })
        .strict(),
});

export type RegisterUserType = z.infer<typeof registerUserSchema>["body"];

export const loginUserSchema = z.object({
    body: z
        .object({
            email: z.string().email(),
            password: z.string().min(6),
        })
        .strict(),
});

export type LoginUserType = z.infer<typeof loginUserSchema>["body"];
