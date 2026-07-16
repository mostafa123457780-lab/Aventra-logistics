import { createClient } from '@/lib/supabase/server'

export default async function DashboardPage() {
  const supabase = await createClient()
  
  const { count: shipmentsCount } = await supabase
    .from('shipments')
    .select('*', { count: 'exact', head: true })
  
  const { count: driversCount } = await supabase
    .from('drivers')
    .select('*', { count: 'exact', head: true })

  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          📊 لوحة التحكم
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard title="إجمالي الشحنات" value={shipmentsCount || 0} icon="📦" color="bg-blue-500" />
          <StatCard title="السائقين" value={driversCount || 0} icon="🚚" color="bg-green-500" />
          <StatCard title="الطلبات النشطة" value="0" icon="🔄" color="bg-yellow-500" />
          <StatCard title="الإيرادات" value="0 ج.م" icon="💰" color="bg-purple-500" />
        </div>

        <div className="mt-8 bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">📋 النشاط الأخير</h2>
          <p className="text-gray-500">لا توجد أنشطة حديثة لعرضها</p>
        </div>
      </div>
    </main>
  )
}

function StatCard({ title, value, icon, color }: any) {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-500">{title}</p>
          <p className="text-2xl font-bold mt-1">{value}</p>
        </div>
        <div className={`${color} text-white p-3 rounded-full text-2xl`}>
          {icon}
        </div>
      </div>
    </div>
  )
}
