import { z } from "zod";

export const addItinerarySchema = z.object({
    body: z
        .object({
            notes: z.string().optional(),
            placeId: z.string(),
            title: z.string().optional(),
            tripId: z.string(),
        })
        .strict(),
});

export type AddItinerarySchemaType = z.infer<typeof addItinerarySchema>["body"];
