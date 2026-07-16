"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { UserRole } from "@/types/database";
import {
  LayoutDashboard,
  Package,
  FileText,
  Inbox,
  Warehouse,
  Truck,
  Users,
  Receipt,
  BarChart3,
} from "lucide-react";

const NAV_BY_ROLE: Record<UserRole, { href: string; label: string; icon: any }[]> = {
  CUSTOMER: [
    { href: "/dashboard/customer", label: "نظرة عامة", icon: LayoutDashboard },
    { href: "/dashboard/customer/shipments", label: "شحناتي", icon: Package },
    { href: "/dashboard/customer/invoices", label: "فواتيري", icon: FileText },
    { href: "/dashboard/customer/requests", label: "طلباتي", icon: Inbox },
  ],
  ADMIN: [
    { href: "/dashboard/admin", label: "نظرة عامة", icon: LayoutDashboard },
    { href: "/dashboard/admin/shipments", label: "الشحنات", icon: Package },
    { href: "/dashboard/admin/invoices", label: "الفواتير", icon: FileText },
    { href: "/dashboard/admin/customers", label: "العملاء", icon: Users },
    { href: "/dashboard/admin/warehouses", label: "المستودعات", icon: Warehouse },
    { href: "/dashboard/admin/vehicles", label: "المركبات", icon: Truck },
    { href: "/dashboard/admin/drivers", label: "السائقون", icon: Users },
    { href: "/dashboard/admin/containers", label: "الحاويات", icon: Package },
  ],
  OPERATIONS_MANAGER: [
    { href: "/dashboard/operations", label: "العمليات", icon: Truck },
    { href: "/dashboard/operations/orders", label: "الطلبات", icon: Package },
  ],
  ACCOUNTANT: [
    { href: "/dashboard/accountant", label: "الحسابات", icon: Receipt },
  ],
  WAREHOUSE_MANAGER: [
    { href: "/dashboard/warehouse", label: "المستودعات", icon: Warehouse },
  ],
  WAREHOUSE_EMPLOYEE: [
    { href: "/dashboard/warehouse", label: "المستودعات", icon: Warehouse },
  ],
  DRIVER: [
    { href: "/dashboard/driver", label: "رحلاتي", icon: BarChart3 },
  ],
};

export function Sidebar({ role }: { role: UserRole }) {
  const pathname = usePathname();
  const items = NAV_BY_ROLE[role] ?? [];

  return (
    <aside className="w-full lg:w-64 shrink-0 bg-ink text-white p-5 lg:min-h-screen">
      <Link href="/" className="font-display font-extrabold text-xl tracking-tight block mb-8">
        AVENTRA
      </Link>
      <nav className="space-y-1">
        {items.map((item) => {
          const Icon = item.icon;
          const active = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors ${
                active ? "bg-amber text-ink font-bold" : "text-white/70 hover:bg-white/10 hover:text-white"
              }`}
            >
              <Icon size={18} />
              {item.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
