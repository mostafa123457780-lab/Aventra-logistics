import { createClient } from '@/lib/supabase/server';
import { getCurrentUser } from './permissions';

export async function logAudit(
  action: string,
  tableName: string,
  recordId?: string,
  oldData?: any,
  newData?: any
) {
  try {
    const supabase = await createClient();
    const user = await getCurrentUser();
    await supabase.from('audit_logs').insert({
      action,
      table_name: tableName,
      record_id: recordId || null,
      old_data: oldData || null,
      new_data: newData || null,
      user_id: user.id,
    });
  } catch (error) {
    console.error('Audit log failed:', error);
  }
}
