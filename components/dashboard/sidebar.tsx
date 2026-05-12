"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Users,
  Stethoscope,
  CalendarCheck,
  Building2,
  FileText,
  CreditCard,
  Pill,
  FlaskConical,
  Video,
  Cross,
  LogOut,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useAuth } from "@/lib/auth-context";
import { useState } from "react";

const navItems = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Patients", href: "/dashboard/patients", icon: Users },
  { label: "Doctors", href: "/dashboard/doctors", icon: Stethoscope },
  { label: "Appointments", href: "/dashboard/appointments", icon: CalendarCheck },
  { label: "Departments", href: "/dashboard/departments", icon: Building2 },
  { label: "Medical Records", href: "/dashboard/medical-records", icon: FileText },
  { label: "Billing", href: "/dashboard/billing", icon: CreditCard },
  { label: "Pharmacy", href: "/dashboard/pharmacy", icon: Pill },
  { label: "Laboratory", href: "/dashboard/laboratory", icon: FlaskConical },
  { label: "Telemedicine", href: "/dashboard/telemedicine", icon: Video },
];

export function DashboardSidebar() {
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className={cn(
        "hidden lg:flex flex-col border-r border-border bg-card dark:bg-slate-900 text-foreground transition-all duration-300",
        collapsed ? "w-[72px]" : "w-64"
      )}
    >
      {/* Logo */}
      <div className="flex h-16 items-center justify-between border-b border-border dark:border-slate-700 px-4">
        {!collapsed && (
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-hospital-blue flex-shrink-0">
              <Cross className="h-4 w-4 text-white" />
            </div>
            <span className="text-sm font-heading font-bold text-hospital-blue dark:text-blue-400 truncate">
              Hospital System
            </span>
          </Link>
        )}
        {collapsed && (
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-hospital-blue mx-auto">
            <Cross className="h-4 w-4 text-white" />
          </div>
        )}
        <button
          type="button"
          onClick={() => setCollapsed(!collapsed)}
          className={cn(
            "flex h-6 w-6 items-center justify-center rounded border border-border dark:border-slate-700 hover:bg-muted dark:hover:bg-slate-800 text-muted-foreground dark:text-slate-400",
            collapsed && "mx-auto mt-2"
          )}
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? (
            <ChevronRight className="h-3 w-3" />
          ) : (
            <ChevronLeft className="h-3 w-3" />
          )}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto p-3" aria-label="Dashboard navigation">
        <ul className="space-y-1">
          {navItems.map((item) => {
            const isActive =
              pathname === item.href ||
              (item.href !== "/dashboard" && pathname.startsWith(item.href));
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                    isActive
                      ? "bg-hospital-blue text-white dark:bg-blue-600"
                      : "text-foreground/70 dark:text-foreground/60 hover:bg-muted dark:hover:bg-slate-800 hover:text-foreground dark:hover:text-foreground"
                  )}
                  title={collapsed ? item.label : undefined}
                >
                  <item.icon className={cn("h-4.5 w-4.5 flex-shrink-0", collapsed && "mx-auto")} />
                  {!collapsed && <span>{item.label}</span>}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* User / Logout */}
      <div className="border-t border-border dark:border-slate-700 p-3">
        {!collapsed && user && (
          <div className="mb-2 px-3 py-2">
            <p className="text-sm font-medium text-foreground dark:text-slate-100 truncate">{user.name}</p>
            <p className="text-xs text-muted-foreground dark:text-slate-400 truncate">{user.email}</p>
          </div>
        )}
        <button
          type="button"
          onClick={logout}
          className={cn(
            "flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-destructive dark:text-red-400 hover:bg-destructive/10 dark:hover:bg-red-950 transition-colors",
            collapsed && "justify-center"
          )}
        >
          <LogOut className="h-4 w-4 flex-shrink-0" />
          {!collapsed && <span>Logout</span>}
        </button>
      </div>
    </aside>
  );
}
