import { z } from "zod";

const email = z.email("Enter a valid email address");
const password = z.string().min(8, "Use at least 8 characters");

export const loginSchema = z.object({
  email,
  password,
});

export const registerSchema = z
  .object({
    firstName: z.string().trim().min(1, "Enter your first name"),
    lastName: z.string().trim().optional(),
    email,
    password,
    confirmPassword: z.string(),
  })
  .refine((v) => v.password === v.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const magicLinkSchema = z.object({ email });

export type LoginValues = z.infer<typeof loginSchema>;
export type RegisterValues = z.infer<typeof registerSchema>;
export type MagicLinkValues = z.infer<typeof magicLinkSchema>;
