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
    { href: "/dashboard/operations", label: "العمليات", icon: Truck },
    { href: "/dashboard/accountant", label: "الحسابات", icon: Receipt },
    { href: "/dashboard/warehouse", label: "المستودعات", icon: Warehouse },
    { href: "/dashboard/admin/users", label: "المستخدمين", icon: Users },
  ],
  OPERATIONS_MANAGER: [
    { href: "/dashboard/operations", label: "نظرة عامة", icon: LayoutDashboard },
    { href: "/dashboard/operations/trips", label: "الرحلات", icon: Truck },
  ],
  ACCOUNTANT: [
    { href: "/dashboard/accountant", label: "نظرة عامة", icon: LayoutDashboard },
    { href: "/dashboard/accountant/invoices", label: "الفواتير", icon: Receipt },
    { href: "/dashboard/accountant/reports", label: "التقارير", icon: BarChart3 },
  ],
  WAREHOUSE_MANAGER: [
    { href: "/dashboard/warehouse", label: "نظرة عامة", icon: LayoutDashboard },
    { href: "/dashboard/warehouse/inventory", label: "المخزون", icon: Warehouse },
  ],
  WAREHOUSE_EMPLOYEE: [
    { href: "/dashboard/warehouse", label: "نظرة عامة", icon: LayoutDashboard },
    { href: "/dashboard/warehouse/inventory", label: "المخزون", icon: Warehouse },
  ],
  DRIVER: [
    { href: "/dashboard/driver", label: "رحلاتي", icon: Truck },
  ],
};

export function Sidebar({ role }: { role: UserRole }) {
  const pathname = usePathname();
  const items = NAV_BY_ROLE[role] ?? [];

  return (
    <aside className="w-full lg:w-60 bg-ink text-white lg:min-h-[calc(100vh-64px)] p-4 lg:p-5">
      <nav className="flex lg:flex-col gap-1.5 overflow-x-auto">
        {items.map((item) => {
          const Icon = item.icon;
          const active = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-2.5 px-3.5 py-2.5 rounded-lg text-sm whitespace-nowrap transition-colors ${
                active ? "bg-amber text-white font-bold" : "text-[#A9B4BE] hover:bg-ink2"
              }`}
            >
              <Icon size={17} />
              {item.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
