import { z } from "zod";

import { ItineraryStatus } from "@/generated/prisma";

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

export const updateItinerarySchema = z.object({
    body: z.object({
        notes: z
            .string()
            .optional()
            .refine((val) => val === undefined || val.trim().length >= 3, {
                message: "Notes must be at least 3 characters long",
            }),
        title: z
            .string()
            .optional()
            .refine((val) => val === undefined || val.trim().length >= 3, {
                message: "Title must be at least 3 characters long",
            }),
    }),
});

export type UpdateItinerarySchemaType = z.infer<typeof updateItinerarySchema>["body"];

export const changeItineraryStatusSchema = z.object({
    body: z
        .object({
            status: z.nativeEnum(ItineraryStatus).optional(),
        })
        .strict(),
});

export type ChangeItineraryStatusSchemaType = z.infer<typeof changeItineraryStatusSchema>["body"];
