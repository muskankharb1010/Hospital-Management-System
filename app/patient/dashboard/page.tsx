"use client";

import { useState } from "react";
import { useAuth } from "@/lib/auth-context";
import { useRouter } from "next/navigation";
import {
  Calendar,
  Clock,
  User,
  LogOut,
  Plus,
  Menu,
  X,
  Home,
  FileText,
  CreditCard,
  Video,
  Heart,
  Settings,
  Bell,
} from "lucide-react";
import { appointments, patients } from "@/lib/mock-data";
import { BookAppointmentModalV2, type AppointmentFormData } from "@/components/appointments/book-appointment-modal-v2";
import Link from "next/link";

export default function PatientDashboard() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [showBookModal, setShowBookModal] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Get patient data and appointments safely
  const patientId = user?.id || "";
  const patientData = patientId ? patients.find((p) => p.id === patientId) : null;
  const patientName = patientData?.name || user?.name || "";
  const patientAppointments = patientName 
    ? appointments.filter((a) => a.patientName === patientName)
    : [];

  const today = new Date("2026-02-10");
  const upcomingAppointments = patientAppointments.filter(
    (a) => new Date(a.date) >= today && a.status !== "Cancelled"
  );
  const pastAppointments = patientAppointments.filter(
    (a) => new Date(a.date) < today || a.status === "Cancelled"
  );

  const handleLogout = () => {
    logout();
  };

  const handleBookAppointment = async (data: AppointmentFormData) => {
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1200));
    setShowBookModal(false);
    setIsSubmitting(false);
  };

  const statusColors: Record<string, string> = {
    Confirmed: "bg-green-100 text-green-700 border-green-300",
    Pending: "bg-amber-100 text-amber-700 border-amber-300",
    Completed: "bg-blue-100 text-blue-700 border-blue-300",
    Cancelled: "bg-red-100 text-red-700 border-red-300",
  };

  const navItems = [
    { href: "/patient/dashboard", label: "Dashboard", icon: Home },
    { href: "/patient/medical-records", label: "Medical Records", icon: FileText },
    { href: "/patient/billing", label: "Billing & Insurance", icon: CreditCard },
    { href: "/patient/telemedicine", label: "Telemedicine", icon: Video },
    { href: "/patient/health-tracker", label: "Health Tracker", icon: Heart },
    { href: "/patient/settings", label: "Settings", icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile Header */}
      <header className="sticky top-0 z-40 md:hidden bg-card dark:bg-slate-800 border-b border-border dark:border-slate-700">
        <div className="flex items-center justify-between h-16 px-4">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-hospital-green flex items-center justify-center text-white font-bold">
              H
            </div>
            <span className="font-bold text-hospital-blue">HealthHub</span>
          </div>
          <button
            onClick={() => setShowSidebar(!showSidebar)}
            className="p-2 hover:bg-muted rounded-lg"
          >
            {showSidebar ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </header>

      <div className="flex gap-6 p-4 md:p-8 max-w-7xl mx-auto">
        {/* Sidebar */}
        <aside
          className={`fixed inset-0 z-30 md:relative md:z-0 w-64 bg-white dark:bg-slate-800 border-r border-border dark:border-slate-700 rounded-lg p-6 flex flex-col gap-8 transition-all ${
            showSidebar ? "translate-x-0" : "-translate-x-full md:translate-x-0"
          }`}
        >
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="h-10 w-10 rounded-lg bg-hospital-green flex items-center justify-center text-white font-bold">
              H
            </div>
            <div>
              <p className="font-bold text-hospital-blue dark:text-blue-400">HealthHub</p>
              <p className="text-xs text-muted-foreground dark:text-slate-400">Patient Portal</p>
            </div>
          </div>

          {/* User Info */}
          <div className="rounded-lg bg-hospital-light-blue dark:bg-blue-900 p-4 border border-hospital-blue/20 dark:border-blue-700">
            <p className="text-xs text-muted-foreground dark:text-slate-400">Logged in as</p>
            <p className="font-semibold text-hospital-blue dark:text-blue-300">{user?.name}</p>
            <p className="text-xs text-muted-foreground dark:text-slate-400 mt-1">{patientData?.bloodGroup} • ID: {patientId}</p>
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setShowSidebar(false)}
                  className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm hover:bg-muted transition-colors text-foreground"
                >
                  <Icon className="h-4 w-4" />
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Logout */}
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 w-full px-4 py-3 rounded-lg text-sm font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950 transition-colors border border-red-200 dark:border-red-900"
          >
            <LogOut className="h-4 w-4" />
            Logout
          </button>
        </aside>

        {/* Main Content */}
      <main className="hidden md:block lg:col-span-3 space-y-6">
        {/* Welcome Banner */}
        <div className="rounded-xl border border-border bg-gradient-to-r from-hospital-blue to-hospital-green dark:from-blue-900 dark:to-green-900 text-white p-8 shadow-sm animate-fade-in-up">
          <h1 className="text-3xl font-heading font-bold mb-2">Welcome back, {patientName}!</h1>
          <p className="text-white/80">Track your health and manage your appointments</p>
          <button
            onClick={() => setShowBookModal(true)}
            className="flex items-center gap-2 px-4 py-2.5 bg-hospital-green text-white rounded-lg hover:opacity-90 transition-colors font-medium"
          >
            <Plus className="h-4 w-4" />
            Book Appointment
          </button>
        </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            <div className="rounded-xl border border-border dark:border-slate-700 bg-white dark:bg-slate-800 p-6 shadow-sm hover:shadow-md transition-shadow animate-fade-in-up animation-delay-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground dark:text-slate-400">Upcoming Appointments</p>
                  <p className="text-3xl font-heading font-bold text-hospital-green dark:text-green-400 mt-1">
                    {upcomingAppointments.length}
                  </p>
                </div>
                <div className="h-12 w-12 rounded-lg bg-hospital-light-blue flex items-center justify-center">
                  <Calendar className="h-6 w-6 text-hospital-blue" />
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-border dark:border-slate-700 bg-white dark:bg-slate-800 p-6 shadow-sm hover:shadow-md transition-shadow animate-fade-in-up animation-delay-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground dark:text-slate-400">Total Appointments</p>
                  <p className="text-3xl font-heading font-bold text-hospital-blue mt-1">
                    {patientAppointments.length}
                  </p>
                </div>
                <div className="h-12 w-12 rounded-lg bg-blue-100 flex items-center justify-center">
                  <Clock className="h-6 w-6 text-hospital-blue" />
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-border dark:border-slate-700 bg-white dark:bg-slate-800 p-6 shadow-sm hover:shadow-md transition-shadow animate-fade-in-up animation-delay-300">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground dark:text-slate-400">Status</p>
                  <p className="text-lg font-heading font-bold text-hospital-green mt-1">
                    {patientData?.status}
                  </p>
                </div>
                <div className="h-12 w-12 rounded-lg bg-green-100 flex items-center justify-center">
                  <Heart className="h-6 w-6 text-hospital-green" />
                </div>
              </div>
            </div>
          </div>

          {/* Upcoming Appointments Section */}
          <div className="rounded-xl border border-border dark:border-slate-700 bg-white dark:bg-slate-800 p-6 shadow-sm animate-fade-in-up animation-delay-400">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-heading font-bold text-foreground dark:text-slate-100">Upcoming Appointments</h2>
              {upcomingAppointments.length > 0 && (
                <span className="text-xs font-medium px-3 py-1 rounded-full bg-hospital-light-blue text-hospital-blue">
                  {upcomingAppointments.length} scheduled
                </span>
              )}
            </div>

            {upcomingAppointments.length > 0 ? (
              <div className="space-y-3">
                {upcomingAppointments.map((apt, idx) => (
                  <div
                    key={apt.id}
                    className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-4 rounded-lg border border-border hover:bg-muted/50 transition-colors animate-fade-in-up"
                    style={{ animationDelay: `${idx * 100}ms` }}
                  >
                    <div className="flex items-center gap-4 mb-3 sm:mb-0">
                      <div className="h-10 w-10 rounded-lg bg-hospital-light-blue flex items-center justify-center">
                        <Calendar className="h-5 w-5 text-hospital-blue" />
                      </div>
                      <div>
                        <p className="font-semibold text-foreground">{apt.doctorName}</p>
                        <p className="text-sm text-muted-foreground">
                          {apt.date} at {apt.time}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span
                        className={`text-xs font-medium px-3 py-1 rounded-full border ${
                          statusColors[apt.status] || "bg-gray-100 text-gray-700"
                        }`}
                      >
                        {apt.status}
                      </span>
                      <button className="text-sm font-medium text-hospital-blue hover:text-hospital-green transition-colors">
                        View Details
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-3 opacity-50" />
                <p className="text-muted-foreground mb-4">No upcoming appointments</p>
                <button
                  onClick={() => setShowBookModal(true)}
                  className="text-sm font-medium text-hospital-green hover:text-hospital-blue transition-colors"
                >
                  Book your first appointment →
                </button>
              </div>
            )}
          </div>

          {/* Recent Health Info */}
          {patientData && (
            <div className="rounded-xl border border-border bg-white p-6 shadow-sm mt-6 animate-fade-in-up animation-delay-500">
              <h2 className="text-xl font-heading font-bold text-foreground mb-6">Current Health Info</h2>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {Object.entries(patientData.vitals).map(([key, value]) => (
                  <div
                    key={key}
                    className="p-4 rounded-lg bg-muted/50 border border-border hover:border-hospital-blue/50 transition-colors"
                  >
                    <p className="text-xs text-muted-foreground capitalize mb-1">
                      {key.replace(/([A-Z])/g, " $1").trim()}
                    </p>
                    <p className="font-semibold text-foreground">{value}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Appointment Modal */}
      <BookAppointmentModalV2
        isOpen={showBookModal}
        onClose={() => setShowBookModal(false)}
        onSubmit={handleBookAppointment}
        isSubmitting={isSubmitting}
        patientName={user?.name || ""}
        patientId={user?.id || ""}
      />

      {/* Overlay for sidebar on mobile */}
      {showSidebar && (
        <div
          className="fixed inset-0 z-20 md:hidden bg-black/50"
          onClick={() => setShowSidebar(false)}
        />
      )}
    </div>
  );
}
