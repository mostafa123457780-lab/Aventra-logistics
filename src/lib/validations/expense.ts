import { z } from 'zod';
export const expenseSchema = z.object({
  description: z.string().min(1),
  amount: z.number().positive(),
  category: z.string().optional(),
  expense_date: z.string().datetime().optional(),
});
export type ExpenseInput = z.infer<typeof expenseSchema>;
