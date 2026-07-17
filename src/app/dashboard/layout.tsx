import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import { Sidebar } from '@/components/dashboard/Sidebar';
import type { UserRole } from '@/types/database';

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/auth/login');
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('role, full_name')
    .eq('id', user.id)
    .single();

  return (
    <div className="flex h-screen">
      <Sidebar role={(profile?.role as UserRole) ?? 'CUSTOMER'} />
      <main className="flex-1 overflow-y-auto p-6">
        <div className="mb-4 text-sm text-gray-500">
          {profile?.full_name} ({profile?.role})
        </div>
        {children}
      </main>
    </div>
  );
}
