import { z } from "zod";

export const addItinerarySchema = z.object({
  notes: z.string().optional(),
  title: z.string().optional(),
});

export type AddItinerarySchemaType = z.infer<typeof addItinerarySchema>;
