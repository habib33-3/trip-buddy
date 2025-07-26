import z from "zod";

export const createTripSchema = z.object({
    body: z
        .object({
            description: z.string().min(3, "Description is required"),
            endDate: z
                .string()
                .refine((val) => !isNaN(Date.parse(val)), "Invalid end date")
                .transform((val) => new Date(val)),
            startDate: z
                .string()
                .refine((val) => !isNaN(Date.parse(val)), "Invalid start date")
                .transform((val) => new Date(val)),
            title: z.string().min(1, "Title is required"),
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
            description: z.string().min(6, "Description is required").optional(),
            endDate: z
                .string()
                .refine((val) => !isNaN(Date.parse(val)), "Invalid end date")
                .transform((val) => new Date(val))
                .optional(),
            startDate: z
                .string()
                .refine((val) => !isNaN(Date.parse(val)), "Invalid start date")
                .transform((val) => new Date(val))
                .optional(),
            title: z.string().min(3, "Title is required").optional(),
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
