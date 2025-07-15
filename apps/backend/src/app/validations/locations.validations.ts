import z from "zod";

export const addLocationSchema = z.object({
    body: z
        .object({
            address: z.string(),
            tripId: z.string(),
        })
        .strict(),
});

export type AddLocationSchemaType = z.infer<typeof addLocationSchema>["body"];
