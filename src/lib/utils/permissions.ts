import { createClient } from '@/lib/supabase/server';
import { type UserRole } from '@/types/database';

export async function getCurrentUser() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error('Unauthorized');
  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single();
  if (!profile) throw new Error('Profile not found');
  return { ...user, role: profile.role as UserRole };
}

export async function requireRole(roles: UserRole[]) {
  const user = await getCurrentUser();
  if (!roles.includes(user.role)) {
    throw new Error(`Access denied. Required roles: ${roles.join(', ')}`);
  }
}

export async function hasRole(roles: UserRole[]) {
  try {
    const user = await getCurrentUser();
    return roles.includes(user.role);
  } catch {
    return false;
  }
}
