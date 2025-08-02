import { z } from "zod";

export const addItinerarySchema = z.object({
  notes: z
    .string()
    .optional()
    .refine((value) => {
      if (!value) return true;
      return value.length > 3;
    }, "Title must be at least 3 characters long"),
  title: z
    .string()
    .optional()
    .refine((value) => {
      if (!value) return true;
      return value.length > 3;
    }, "Notes must be at least 3 characters long"),
});

export type AddItinerarySchemaType = z.infer<typeof addItinerarySchema>;

export const updateItinerarySchema = z.object({
  notes: z
    .string()
    .optional()
    .refine((value) => {
      if (!value) return true;
      return value.length > 3;
    }, "Notes must be at least 3 characters long"),
  title: z
    .string()
    .optional()
    .refine((value) => {
      if (!value) return true;
      return value.length > 3;
    }, "Title must be at least 3 characters long"),
});

export type UpdateItinerarySchemaType = z.infer<typeof updateItinerarySchema>;
