import z from "zod";

export const createTripSchema = z.object({
    body: z
        .object({
            title: z.string().min(1, "Title is required"),
            description: z.string().min(1, "Description is required"),
            startDate: z
                .string()
                .refine((val) => !isNaN(Date.parse(val)), "Invalid start date")
                .transform((val) => new Date(val)),
            endDate: z
                .string()
                .refine((val) => !isNaN(Date.parse(val)), "Invalid end date")
                .transform((val) => new Date(val)),
        })
        .refine(
            (data) => {
                return data.endDate >= data.startDate;
            },
            {
                message: "End date must be after or equal to start date",
                path: ["endDate"],
            }
        ),
});

export type CreateTripSchemaType = z.infer<typeof createTripSchema>["body"];

export const updateTripSchema = z.object({
    body: z
        .object({
            title: z.string().min(1, "Title is required").optional(),
            description: z.string().min(1, "Description is required").optional(),
            startDate: z
                .string()
                .refine((val) => !isNaN(Date.parse(val)), "Invalid start date")
                .transform((val) => new Date(val))
                .optional(),
            endDate: z
                .string()
                .refine((val) => !isNaN(Date.parse(val)), "Invalid end date")
                .transform((val) => new Date(val))
                .optional(),
        })
        .refine(
            (data) => {
                if (data.startDate && data.endDate) {
                    return data.endDate >= data.startDate;
                }
                return true;
            },
            {
                message: "End date must be after or equal to start date",
                path: ["endDate"],
            }
        ),
});

export type UpdateTripSchemaType = z.infer<typeof updateTripSchema>["body"];
