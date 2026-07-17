import { z } from 'zod';
export const employeeSchema = z.object({
  profile_id: z.string().uuid().optional(),
  role: z.string().min(1),
  department: z.string().optional(),
  status: z.string().optional(),
});
export type EmployeeInput = z.infer<typeof employeeSchema>;
