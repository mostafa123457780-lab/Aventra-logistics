import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("بريد إلكتروني غير صحيح"),
  password: z.string().min(6, "كلمة السر لازم تكون 6 حروف على الأقل"),
});
export type LoginValues = z.infer<typeof loginSchema>;

export const registerSchema = z
  .object({
    full_name: z.string().min(2, "اكتب الاسم بالكامل"),
    email: z.string().email("بريد إلكتروني غير صحيح"),
    phone: z.string().min(8, "رقم هاتف غير صحيح"),
    password: z.string().min(6, "كلمة السر لازم تكون 6 حروف على الأقل"),
    confirm_password: z.string(),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: "كلمتا السر غير متطابقتين",
    path: ["confirm_password"],
  });
export type RegisterValues = z.infer<typeof registerSchema>;

export const forgotPasswordSchema = z.object({
  email: z.string().email("بريد إلكتروني غير صحيح"),
});
export type ForgotPasswordValues = z.infer<typeof forgotPasswordSchema>;

export const resetPasswordSchema = z
  .object({
    password: z.string().min(6, "كلمة السر لازم تكون 6 حروف على الأقل"),
    confirm_password: z.string(),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: "كلمتا السر غير متطابقتين",
    path: ["confirm_password"],
  });
export type ResetPasswordValues = z.infer<typeof resetPasswordSchema>;
