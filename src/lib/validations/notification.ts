import { z } from 'zod';
export const notificationSchema = z.object({
  user_id: z.string().uuid().optional(),
  title: z.string().min(1),
  message: z.string().min(1),
  type: z.string().optional(),
  read: z.boolean().optional(),
});
export type NotificationInput = z.infer<typeof notificationSchema>;
