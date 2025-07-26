import z from "zod";

export const addPlaceSchema = z.object({
  address: z.string().min(3),
});

export type AddPlaceSchemaType = z.infer<typeof addPlaceSchema>;
