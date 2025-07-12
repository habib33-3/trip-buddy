import z from "zod";

export const createTripSchema = z
  .object({
    description: z.string(),
    endDate: z.date(),
    startDate: z.date(),
    title: z.string(),
  })
  .refine((data) => data.startDate < data.endDate, {
    message: "Start date must be before end date",
    path: ["startDate"],
  });

export type CreateTripSchemaType = z.infer<typeof createTripSchema>;

export const updateTripSchema = z
  .object({
    description: z.string().optional(),
    endDate: z.date().optional(),
    startDate: z.date().optional(),
    title: z.string().optional(),
  })
  .refine(
    (data) => {
      if (!data.startDate || !data.endDate) return true;

      return data.startDate < data.endDate;
    },
    {
      message: "Start date must be before end date",
      path: ["startDate"],
    }
  );

export type UpdateTripSchemaType = z.infer<typeof updateTripSchema>;
