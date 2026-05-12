"use client";

import { use } from "react";
import { doctors } from "@/lib/mock-data";
import { ArrowLeft, Phone, Mail, Star, Users, Clock, Award } from "lucide-react";
import Link from "next/link";

export default function DoctorProfilePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const doctor = doctors.find((d) => d.id === id);

  if (!doctor) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <p className="text-lg font-medium text-foreground">Doctor not found</p>
        <Link href="/dashboard/doctors" className="mt-4 text-sm text-hospital-blue hover:underline">
          Back to Doctors
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Link href="/dashboard/doctors" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
        <ArrowLeft className="h-4 w-4" /> Back to Doctors
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Card */}
        <div className="rounded-xl border border-border bg-card p-6 shadow-sm text-center">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-hospital-blue text-3xl font-bold text-white">
            {doctor.name.split(" ").pop()?.charAt(0)}
          </div>
          <h1 className="mt-4 text-lg font-heading font-bold text-foreground">{doctor.name}</h1>
          <p className="text-sm text-muted-foreground">{doctor.specialization}</p>
          <span
            className={`mt-2 inline-block rounded-full px-3 py-0.5 text-xs font-medium ${
              doctor.availability === "Available"
                ? "bg-green-100 text-green-700"
                : doctor.availability === "Busy"
                  ? "bg-amber-100 text-amber-700"
                  : "bg-red-100 text-red-700"
            }`}
          >
            {doctor.availability}
          </span>
          <div className="mt-4 space-y-2 text-sm text-foreground/80">
            <p className="flex items-center justify-center gap-2"><Award className="h-4 w-4" /> {doctor.qualification}</p>
            <p className="flex items-center justify-center gap-2"><Clock className="h-4 w-4" /> {doctor.experience}</p>
            <p className="flex items-center justify-center gap-2"><Star className="h-4 w-4 text-amber-500" /> {doctor.rating} / 5.0</p>
            <p className="flex items-center justify-center gap-2"><Users className="h-4 w-4" /> {doctor.patients} patients</p>
          </div>
          <div className="mt-4 space-y-2 text-sm text-foreground/80">
            <p className="flex items-center justify-center gap-2"><Phone className="h-4 w-4" /> {doctor.contact}</p>
            <p className="flex items-center justify-center gap-2"><Mail className="h-4 w-4" /> {doctor.email}</p>
          </div>
        </div>

        {/* Schedule */}
        <div className="lg:col-span-2 rounded-xl border border-border bg-card p-6 shadow-sm">
          <h2 className="text-base font-heading font-semibold text-foreground mb-4">Weekly Schedule</h2>
          <div className="space-y-3">
            {Object.entries(doctor.schedule).map(([day, time]) => (
              <div key={day} className="flex items-center justify-between rounded-lg bg-muted/50 px-4 py-3">
                <span className="text-sm font-medium text-foreground capitalize">{day}</span>
                <span className={`text-sm ${time === "Off" ? "text-destructive font-medium" : "text-foreground/80"}`}>
                  {time}
                </span>
              </div>
            ))}
          </div>
          <div className="mt-6">
            <Link
              href="/dashboard/appointments"
              className="inline-flex h-9 items-center gap-2 rounded-lg bg-hospital-blue px-4 text-sm font-medium text-white hover:opacity-90"
            >
              Book Appointment
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
