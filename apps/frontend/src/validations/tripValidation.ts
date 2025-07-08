import z from "zod";

export const createTripSchema = z
  .object({
    title: z.string(),
    startDate: z.date(),
    endDate: z.date(),
    description: z.string(),
  })
  .refine((data) => data.startDate < data.endDate, {
    message: "Start date must be before end date",
    path: ["startDate"],
  });

export type CreateTripSchemaType = z.infer<typeof createTripSchema>;
