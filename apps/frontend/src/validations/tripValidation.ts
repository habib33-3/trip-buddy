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

export const updateTripSchema = z
  .object({
    title: z.string().optional(),
    startDate: z.date().optional(),
    endDate: z.date().optional(),
    description: z.string().optional(),
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
