import z from "zod";

export const addPlaceSchema = z.object({
  address: z.string(),
});

export type AddPlaceSchemaType = z.infer<typeof addPlaceSchema>;
