import z from "zod";

export const addPlaceSchema = z.object({
    body: z
        .object({
            address: z.string().min(3),
        })
        .strict(),
});

export type AddPlaceSchemaType = z.infer<typeof addPlaceSchema>["body"];
