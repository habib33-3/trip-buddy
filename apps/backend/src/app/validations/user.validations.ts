import z from "zod";

export const changeUserPasswordSchema = z.object({
    body: z
        .object({
            currentPassword: z.string().min(6),
            newPassword: z.string().min(6),
        })
        .strict(),
});

export type ChangeUserPasswordSchemaType = z.infer<typeof changeUserPasswordSchema>["body"];
