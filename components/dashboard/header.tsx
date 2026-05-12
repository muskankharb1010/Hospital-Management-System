"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Bell,
  Search,
  Menu,
  X,
  Cross,
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
  LogOut,
} from "lucide-react";
import { useAuth } from "@/lib/auth-context";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/theme-toggle";

const mobileNavItems = [
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

export function DashboardHeader() {
  const { user, logout } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const pathname = usePathname();

  return (
    <>
      <header className="sticky top-0 z-40 flex h-16 items-center justify-between border-b border-border bg-background dark:bg-card px-4 lg:px-6 transition-colors duration-200">
        {/* Mobile menu button */}
        <button
          type="button"
          className="lg:hidden p-2 text-foreground"
          onClick={() => setMobileOpen(true)}
          aria-label="Open menu"
        >
          <Menu className="h-5 w-5" />
        </button>

        {/* Search */}
        <div className="hidden sm:flex flex-1 max-w-md">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="search"
              placeholder="Search patients, doctors..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-9 w-full rounded-lg border border-input dark:border-slate-700 bg-muted/50 dark:bg-slate-800 pl-9 pr-4 text-sm text-foreground dark:text-slate-100 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 dark:focus:border-blue-500"
            />
          </div>
        </div>

        {/* Right side */}
        <div className="hidden sm:flex items-center gap-4">
          <ThemeToggle />
          <button
            className="relative p-2 text-foreground hover:bg-muted rounded-lg transition-colors"
            aria-label="Notifications"
          >
            <Bell className="h-4 w-4 text-foreground" />
            <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-destructive text-[10px] font-bold text-white">
              3
            </span>
          </button>
          <div className="hidden sm:flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-hospital-blue text-white text-xs font-bold">
              {user?.name?.charAt(0) || "A"}
            </div>
            <div className="hidden md:block">
              <p className="text-sm font-medium text-foreground leading-none">{user?.name || "Admin"}</p>
              <p className="text-xs text-muted-foreground">{user?.role || "Admin"}</p>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Sidebar Overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setMobileOpen(false)}
            onKeyDown={(e) => e.key === "Escape" && setMobileOpen(false)}
            role="button"
            tabIndex={0}
            aria-label="Close menu"
          />
          <div className="absolute left-0 top-0 h-full w-72 bg-card dark:bg-slate-900 shadow-xl">
            <div className="flex h-16 items-center justify-between border-b border-border dark:border-slate-700 px-4">
              <Link href="/" className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-hospital-blue">
                  <Cross className="h-4 w-4 text-white" />
                </div>
                <span className="text-sm font-heading font-bold text-hospital-blue">
                  Hospital System
                </span>
              </Link>
              <button
                type="button"
                onClick={() => setMobileOpen(false)}
                className="p-1 text-foreground"
                aria-label="Close menu"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <nav className="p-3 overflow-y-auto" style={{ maxHeight: "calc(100vh - 128px)" }} aria-label="Mobile dashboard navigation">
              <ul className="space-y-1">
                {mobileNavItems.map((item) => {
                  const isActive =
                    pathname === item.href ||
                    (item.href !== "/dashboard" && pathname.startsWith(item.href));
                  return (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        onClick={() => setMobileOpen(false)}
                        className={cn(
                          "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                          isActive
                            ? "bg-hospital-blue text-white dark:bg-blue-600"
                            : "text-foreground/70 dark:text-foreground/60 hover:bg-muted dark:hover:bg-slate-800"
                        )}
                      >
                        <item.icon className="h-4 w-4" />
                        <span>{item.label}</span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>
            <div className="absolute bottom-0 left-0 right-0 border-t border-border dark:border-slate-700 p-3">
              <button
                type="button"
                onClick={() => { logout(); setMobileOpen(false); }}
                className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-destructive dark:text-red-400 hover:bg-destructive/10 dark:hover:bg-red-950"
              >
                <LogOut className="h-4 w-4" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
