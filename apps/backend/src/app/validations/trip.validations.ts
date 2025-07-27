import z from "zod";

import { TripStatus } from "@/generated/prisma";

export const createTripSchema = z.object({
    body: z
        .object({
            description: z.string().min(3, "Description must be at least 3 characters long"),
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
            description: z
                .string()
                .optional()
                .refine((val) => {
                    return val === undefined || val.trim().length >= 3;
                }),
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
            title: z
                .string()
                .optional()
                .refine((val) => {
                    return val === undefined || val.trim().length >= 3;
                }),
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

const tripStatusValues = Object.values(TripStatus) as [string, ...string[]];

export const searchTripParamSchema = z.object({
    query: z.object({
        searchQuery: z
            .string()
            .optional()
            .refine((val) => val === undefined || val.trim().length >= 3, {
                message: "Query must be at least 3 characters long",
            }),
        status: z
            .array(z.enum(tripStatusValues))
            .optional()
            .default([TripStatus.ACTIVE, TripStatus.PLANNED]),
    }),
});

export type SearchTripParamSchemaType = z.infer<typeof searchTripParamSchema>["query"];
