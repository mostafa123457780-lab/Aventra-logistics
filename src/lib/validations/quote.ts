import { z } from "zod";

export const quoteSchema = z.object({
  full_name: z.string().min(2, "اكتب الاسم بالكامل"),
  company_name: z.string().optional(),
  email: z.string().email("بريد إلكتروني غير صحيح"),
  phone: z.string().min(8, "رقم هاتف غير صحيح"),
  service_type: z.enum(["Sea Freight", "Air Freight", "Land Freight", "Multimodal"], {
    errorMap: () => ({ message: "اختر نوع الشحن" }),
  }),
  origin: z.string().min(2, "اكتب نقطة الانطلاق"),
  destination: z.string().min(2, "اكتب نقطة الوصول"),
  description: z.string().min(10, "اكتب تفاصيل أكثر عن الشحنة"),
});

export type QuoteFormValues = z.infer<typeof quoteSchema>;
