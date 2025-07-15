import z from "zod";

export const addLocationSchema = z.object({
  address: z.string(),
});

export type AddLocationSchemaType = z.infer<typeof addLocationSchema>;
