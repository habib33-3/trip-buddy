import { z } from "zod";

export const addItinerarySchema = z.object({
    body: z
        .object({
            address: z.string(),
            tripId: z.string(),
        })
        .strict(),
});

export type AddItinerarySchemaType = z.infer<typeof addItinerarySchema>["body"];

export const reorderItinerarySchema = z.object({
    body: z
        .object({
            itineraryIds: z.array(z.string()),
            tripId: z.string().uuid(),
        })
        .strict(),
});

export type ReorderItinerarySchemaType = z.infer<typeof reorderItinerarySchema>["body"];
