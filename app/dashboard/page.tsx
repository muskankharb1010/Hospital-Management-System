"use client";

import {
  Users,
  Stethoscope,
  CalendarCheck,
  Activity,
  Bell,
  ChevronRight,
  TrendingUp,
} from "lucide-react";
import Link from "next/link";
import { patients, doctors, appointments, notices } from "@/lib/mock-data";

const stats = [
  {
    label: "Total Patients",
    value: patients.length.toString(),
    icon: Users,
    color: "bg-hospital-blue",
    trend: "+12%",
  },
  {
    label: "Total Doctors",
    value: doctors.length.toString(),
    icon: Stethoscope,
    color: "bg-hospital-green",
    trend: "+3%",
  },
  {
    label: "Appointments Today",
    value: appointments.filter((a) => a.date === "2026-02-10").length.toString(),
    icon: CalendarCheck,
    color: "bg-teal-600",
    trend: "+8%",
  },
  {
    label: "Active Cases",
    value: patients.filter((p) => p.status === "Active").length.toString(),
    icon: Activity,
    color: "bg-amber-600",
    trend: "+5%",
  },
];

export default function DashboardPage() {
  const upcomingAppointments = appointments
    .filter((a) => a.status === "Confirmed" || a.status === "Pending")
    .slice(0, 5);

  return (
    <div className="space-y-6">
      {/* Page Title */}
      <div className="animate-fade-in-up">
        <h1 className="text-2xl font-heading font-bold text-foreground">
          Dashboard
        </h1>
        <p className="text-sm text-muted-foreground">
          Welcome back! Here is your hospital overview.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <div
            key={stat.label}
            className={`rounded-xl border border-border bg-card p-5 shadow-sm animate-fade-in-up animation-delay-${(index + 1) * 100}`}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
                <p className="mt-1 text-3xl font-heading font-bold text-foreground">
                  {stat.value}
                </p>
              </div>
              <div
                className={`flex h-12 w-12 items-center justify-center rounded-xl ${stat.color}`}
              >
                <stat.icon className="h-6 w-6 text-white" />
              </div>
            </div>
            <div className="mt-3 flex items-center gap-1 text-xs text-hospital-green font-medium">
              <TrendingUp className="h-3 w-3" />
              {stat.trend} from last month
            </div>
          </div>
        ))}
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Upcoming Appointments */}
        <div className="lg:col-span-2 rounded-xl border border-border bg-card shadow-sm animate-fade-in-up animation-delay-500">
          <div className="flex items-center justify-between border-b border-border px-5 py-4">
            <h2 className="text-base font-heading font-semibold text-foreground">
              Upcoming Appointments
            </h2>
            <Link
              href="/dashboard/appointments"
              className="text-xs font-medium text-hospital-blue hover:underline flex items-center gap-1"
            >
              View All <ChevronRight className="h-3 w-3" />
            </Link>
          </div>
          <div className="divide-y divide-border">
            {upcomingAppointments.map((apt) => (
              <div
                key={apt.id}
                className="flex items-center justify-between px-5 py-3"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-hospital-blue/10">
                    <CalendarCheck className="h-4 w-4 text-hospital-blue" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">
                      {apt.patientName}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {apt.doctorName} - {apt.department}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-foreground">{apt.date}</p>
                  <p className="text-xs text-muted-foreground">{apt.time}</p>
                </div>
                <span
                  className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${
                    apt.status === "Confirmed"
                      ? "bg-green-100 text-green-700"
                      : "bg-amber-100 text-amber-700"
                  }`}
                >
                  {apt.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Notifications */}
        <div className="rounded-xl border border-border bg-card shadow-sm animate-fade-in-up animation-delay-600">
          <div className="flex items-center justify-between border-b border-border px-5 py-4">
            <h2 className="text-base font-heading font-semibold text-foreground">
              Notifications
            </h2>
            <Bell className="h-4 w-4 text-muted-foreground" />
          </div>
          <div className="divide-y divide-border">
            {notices.slice(0, 4).map((notice) => (
              <div key={notice.id} className="px-5 py-3">
                <div className="flex items-start gap-2">
                  <div
                    className={`mt-1 h-2 w-2 rounded-full flex-shrink-0 ${
                      notice.priority === "high"
                        ? "bg-destructive"
                        : notice.priority === "medium"
                          ? "bg-amber-500"
                          : "bg-hospital-blue"
                    }`}
                  />
                  <div>
                    <p className="text-sm text-foreground">{notice.title}</p>
                    <p className="text-xs text-muted-foreground">{notice.date}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Links */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {[
          { label: "Add Patient", href: "/dashboard/patients", icon: Users, color: "bg-hospital-blue" },
          { label: "Book Appointment", href: "/dashboard/appointments", icon: CalendarCheck, color: "bg-hospital-green" },
          { label: "View Reports", href: "/dashboard/medical-records", icon: Activity, color: "bg-teal-600" },
          { label: "Find Doctor", href: "/dashboard/doctors", icon: Stethoscope, color: "bg-indigo-600" },
          { label: "Lab Tests", href: "/dashboard/laboratory", icon: Activity, color: "bg-amber-600" },
          { label: "Pharmacy", href: "/dashboard/pharmacy", icon: Activity, color: "bg-rose-600" },
        ].map((link, index) => (
          <Link
            key={link.label}
            href={link.href}
            className={`flex flex-col items-center gap-2 rounded-xl border border-border bg-card p-4 shadow-sm hover:shadow-md transition-all transform hover:scale-105 animate-fade-in-up animation-delay-${(index + 7) * 100}`}
          >
            <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${link.color}`}>
              <link.icon className="h-5 w-5 text-white" />
            </div>
            <span className="text-xs font-medium text-foreground text-center">{link.label}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
