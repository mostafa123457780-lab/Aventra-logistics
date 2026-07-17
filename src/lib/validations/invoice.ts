import { z } from 'zod';
export const invoiceSchema = z.object({
  order_id: z.string().uuid(),
  invoice_number: z.string().min(1),
  amount: z.number().positive(),
  status: z.string().optional(),
  due_date: z.string().datetime().optional(),
});
export type InvoiceInput = z.infer<typeof invoiceSchema>;
