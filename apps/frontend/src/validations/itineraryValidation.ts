import z from "zod";

export const addItinerarySchema = z.object({
  address: z.string(),
});

export type AddItinerarySchemaType = z.infer<typeof addItinerarySchema>;
