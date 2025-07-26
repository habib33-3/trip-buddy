import z from "zod";

export const addPlaceSchema = z
  .object({
    address: z
      .string()
      .trim()
      .min(3, "Address must be at least 3 characters long"),
  })
  .strict();

export type AddPlaceSchemaType = z.infer<typeof addPlaceSchema>;
