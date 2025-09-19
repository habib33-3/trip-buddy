import z from "zod";

export const changePasswordSchema = z
  .object({
    confirmNewPassword: z
      .string()
      .trim()
      .min(8, "Please confirm your new password"),
    currentPassword: z
      .string()
      .trim()
      .min(6, "Current password must be at least 6 characters long"),
    newPassword: z
      .string()
      .trim()
      .min(6, "New password must be at least 6 characters long"),
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: "New password and confirmation do not match",
  });

export type ChangePasswordSchemaType = z.infer<typeof changePasswordSchema>;
