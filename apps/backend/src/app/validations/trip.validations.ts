import z from "zod";

export const createTripSchema = z.object({
    body: z.object({
        title: z.string(),
        description: z.string(),
        startDate: z.date(),
        endDate: z.date(),
    }),
});

export type CreateTripSchemaType = z.infer<typeof createTripSchema>["body"];
