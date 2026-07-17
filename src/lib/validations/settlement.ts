import { z } from 'zod';
export const settlementSchema = z.object({
  driver_id: z.string().uuid().optional(),
  merchant_id: z.string().uuid().optional(),
  amount: z.number().positive(),
  period_start: z.string().datetime().optional(),
  period_end: z.string().datetime().optional(),
  status: z.string().optional(),
});
export type SettlementInput = z.infer<typeof settlementSchema>;
