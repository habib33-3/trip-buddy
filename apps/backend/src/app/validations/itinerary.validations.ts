import { z } from "zod";

export const addItinerarySchema = z.object({
    body: z
        .object({
            notes: z
                .string()
                .optional()
                .refine((val) => val === undefined || val.trim().length >= 3, {
                    message: "Notes must be at least 3 characters long",
                }),
            placeId: z.string().uuid(),
            title: z
                .string()
                .optional()
                .refine((val) => val === undefined || val.trim().length >= 3, {
                    message: "Title must be at least 3 characters long",
                }),
            tripId: z.string().uuid(),
        })
        .strict(),
});

export type AddItinerarySchemaType = z.infer<typeof addItinerarySchema>["body"];
