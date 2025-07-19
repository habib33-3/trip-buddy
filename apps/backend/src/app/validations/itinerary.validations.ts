import z from "zod";

export const addItinerarySchema = z.object({
    body: z
        .object({
            address: z.string(),
            tripId: z.string(),
        })
        .strict(),
});

export type AddItinerarySchemaType = z.infer<typeof addItinerarySchema>["body"];
