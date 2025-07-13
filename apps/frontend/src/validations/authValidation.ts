import z from "zod";

export const registerUserSchema = z
  .object({
    confirmPassword: z.string().min(6),
    email: z.string().email(),
    name: z.string(),
    password: z.string().min(6),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type RegisterUserSchemaType = z.infer<typeof registerUserSchema>;

export const userLoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export type UserLoginSchemaType = z.infer<typeof userLoginSchema>;
