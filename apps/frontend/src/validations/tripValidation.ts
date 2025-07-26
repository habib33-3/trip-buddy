import z from "zod";

export const createTripSchema = z
  .object({
    description: z.string().min(6),
    endDate: z.date(),
    startDate: z.date(),
    title: z.string().min(3),
  })
  .refine((data) => data.startDate < data.endDate, {
    message: "Start date must be before end date",
    path: ["startDate"],
  });

export type CreateTripSchemaType = z.infer<typeof createTripSchema>;

export const updateTripSchema = z
  .object({
    description: z
      .string()
      .optional()
      .refine((val) => val === undefined || val.trim().length >= 6, {
        message: "Description must be at least 6 characters long",
      }),
    endDate: z.date().optional(),
    startDate: z.date().optional(),
    title: z
      .string()
      .optional()
      .refine((val) => val === undefined || val.trim().length >= 3, {
        message: "Title must be at least 3 characters long",
      }),
  })
  .refine(
    (data) => !data.startDate || !data.endDate || data.startDate < data.endDate,
    {
      message: "Start date must be before end date",
      path: ["startDate"],
    }
  );

export type UpdateTripSchemaType = z.infer<typeof updateTripSchema>;
