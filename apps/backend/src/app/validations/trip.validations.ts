import z from "zod";

export const createTripSchema = z.object({
    body: z.object({
        title: z.string(),
        description: z.string(),
        startDate: z.string().transform((value) => new Date(value)),
        endDate: z.string().transform((value) => new Date(value)),
    }),
});

export type CreateTripSchemaType = z.infer<typeof createTripSchema>["body"];

export const updateTripSchema = z.object({
    body: z.object({
        title: z.string().optional(),
        description: z.string().optional(),
        startDate: z
            .string()
            .transform((value) => new Date(value))
            .optional(),
        endDate: z
            .string()
            .transform((value) => new Date(value))
            .optional(),
    }),
});

export type UpdateTripSchemaType = z.infer<typeof updateTripSchema>["body"];
