"use client";

import React from "react";

import { useState } from "react";
import { appointments, doctors } from "@/lib/mock-data";
import { CalendarCheck, Search, Plus } from "lucide-react";
import { BookAppointmentModalV2, type AppointmentFormData } from "@/components/appointments/book-appointment-modal-v2";

const statusColors: Record<string, string> = {
  Confirmed: "bg-green-100 text-green-700",
  Pending: "bg-amber-100 text-amber-700",
  Completed: "bg-blue-100 text-blue-700",
  Cancelled: "bg-red-100 text-red-700",
};

export default function AppointmentsPage() {
  const [tab, setTab] = useState<"upcoming" | "past">("upcoming");
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const today = "2026-02-10";
  const upcoming = appointments.filter(
    (a) => a.date >= today && a.status !== "Completed" && a.status !== "Cancelled"
  );
  const past = appointments.filter(
    (a) => a.date < today || a.status === "Completed" || a.status === "Cancelled"
  );
  const list = (tab === "upcoming" ? upcoming : past).filter(
    (a) =>
      a.patientName.toLowerCase().includes(search.toLowerCase()) ||
      a.doctorName.toLowerCase().includes(search.toLowerCase())
  );

  const handleBookAppointment = async (data: AppointmentFormData) => {
    setIsSubmitting(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1200));
    setShowForm(false);
    setIsSubmitting(false);
    // In a real app, you'd add this to the appointments list
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-heading font-bold text-foreground">Appointments</h1>
          <p className="text-sm text-muted-foreground">Schedule and manage appointments</p>
        </div>
        <button
          type="button"
          onClick={() => setShowForm(true)}
          className="inline-flex h-9 items-center gap-2 rounded-lg bg-hospital-green px-4 text-sm font-medium text-white hover:opacity-90"
        >
          <Plus className="h-4 w-4" /> Book Appointment
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 rounded-lg bg-muted p-1 w-fit">
        {(["upcoming", "past"] as const).map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => setTab(t)}
            className={`rounded-md px-4 py-1.5 text-sm font-medium transition-colors ${
              tab === t ? "bg-white text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {t === "upcoming" ? `Upcoming (${upcoming.length})` : `Past (${past.length})`}
          </button>
        ))}
      </div>

      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <input
          type="search"
          placeholder="Search appointments..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="h-9 w-full rounded-lg border border-input bg-card pl-9 pr-4 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
        />
      </div>

      {/* List */}
      <div className="rounded-xl border border-border bg-card shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/50">
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">ID</th>
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">Patient</th>
                <th className="px-4 py-3 text-left font-medium text-muted-foreground hidden md:table-cell">Doctor</th>
                <th className="px-4 py-3 text-left font-medium text-muted-foreground hidden lg:table-cell">Department</th>
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">Date</th>
                <th className="px-4 py-3 text-left font-medium text-muted-foreground hidden md:table-cell">Time</th>
                <th className="px-4 py-3 text-left font-medium text-muted-foreground hidden lg:table-cell">Type</th>
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {list.map((a) => (
                <tr key={a.id} className="hover:bg-muted/30 transition-colors">
                  <td className="px-4 py-3 font-medium text-foreground">{a.id}</td>
                  <td className="px-4 py-3 text-foreground">{a.patientName}</td>
                  <td className="px-4 py-3 hidden md:table-cell text-foreground">{a.doctorName}</td>
                  <td className="px-4 py-3 hidden lg:table-cell text-foreground">{a.department}</td>
                  <td className="px-4 py-3 text-foreground">{a.date}</td>
                  <td className="px-4 py-3 hidden md:table-cell text-foreground">{a.time}</td>
                  <td className="px-4 py-3 hidden lg:table-cell text-foreground">{a.type}</td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${statusColors[a.status] || "bg-gray-100 text-gray-700"}`}>
                      {a.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {list.length === 0 && (
          <div className="py-12 text-center text-sm text-muted-foreground">No appointments found.</div>
        )}
      </div>

      <BookAppointmentModalV2
        isOpen={showForm}
        onClose={() => setShowForm(false)}
        onSubmit={handleBookAppointment}
        isSubmitting={isSubmitting}
      />
    </div>
  );
}
