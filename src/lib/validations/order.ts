import { z } from 'zod';
export const orderSchema = z.object({
  customer_id: z.string().uuid(),
  order_date: z.string().datetime().optional(),
  status: z.string().optional(),
  total_amount: z.number().positive().optional(),
});
export type OrderInput = z.infer<typeof orderSchema>;
