"use client";

import { use } from "react";
import { patients } from "@/lib/mock-data";
import {
  ArrowLeft,
  Phone,
  Mail,
  MapPin,
  Droplets,
  Activity,
  Heart,
  Thermometer,
  Weight,
} from "lucide-react";
import Link from "next/link";

export default function PatientProfilePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const patient = patients.find((p) => p.id === id);

  if (!patient) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <p className="text-lg font-medium text-foreground">Patient not found</p>
        <Link href="/dashboard/patients" className="mt-4 text-sm text-hospital-blue hover:underline">
          Back to Patients
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Link
        href="/dashboard/patients"
        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" /> Back to Patients
      </Link>

      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start gap-6 rounded-xl border border-border bg-card p-6 shadow-sm">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-hospital-blue text-2xl font-bold text-white">
          {patient.name.charAt(0)}
        </div>
        <div className="flex-1">
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="text-xl font-heading font-bold text-foreground">{patient.name}</h1>
            <span
              className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${
                patient.status === "Active"
                  ? "bg-green-100 text-green-700"
                  : patient.status === "Critical"
                    ? "bg-red-100 text-red-700"
                    : "bg-gray-100 text-gray-700"
              }`}
            >
              {patient.status}
            </span>
          </div>
          <p className="text-sm text-muted-foreground mt-1">
            {patient.id} | {patient.age} years | {patient.gender}
          </p>
          <div className="mt-3 flex flex-wrap gap-4 text-sm text-foreground/80">
            <span className="flex items-center gap-1"><Phone className="h-3.5 w-3.5" /> {patient.contact}</span>
            <span className="flex items-center gap-1"><Mail className="h-3.5 w-3.5" /> {patient.email}</span>
            <span className="flex items-center gap-1"><MapPin className="h-3.5 w-3.5" /> {patient.address}</span>
            <span className="flex items-center gap-1"><Droplets className="h-3.5 w-3.5" /> {patient.bloodGroup}</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Vitals */}
        <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
          <h2 className="text-base font-heading font-semibold text-foreground mb-4">Current Vitals</h2>
          <div className="grid grid-cols-2 gap-4">
            {[
              { icon: Activity, label: "Blood Pressure", value: patient.vitals.bp, color: "text-red-500" },
              { icon: Heart, label: "Heart Rate", value: patient.vitals.heartRate, color: "text-pink-500" },
              { icon: Thermometer, label: "Temperature", value: patient.vitals.temperature, color: "text-amber-500" },
              { icon: Weight, label: "Weight", value: patient.vitals.weight, color: "text-hospital-blue" },
            ].map((v) => (
              <div key={v.label} className="rounded-lg bg-muted/50 p-3">
                <v.icon className={`h-4 w-4 ${v.color} mb-1`} />
                <p className="text-xs text-muted-foreground">{v.label}</p>
                <p className="text-sm font-semibold text-foreground">{v.value}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Medical History */}
        <div className="lg:col-span-2 rounded-xl border border-border bg-card p-5 shadow-sm">
          <h2 className="text-base font-heading font-semibold text-foreground mb-4">Medical History</h2>
          <div className="space-y-4">
            {patient.medicalHistory.map((entry, i) => (
              <div key={`${entry.date}-${i}`} className="flex gap-4 border-l-2 border-hospital-blue/30 pl-4">
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-foreground">{entry.diagnosis}</p>
                    <span className="text-xs text-muted-foreground">{entry.date}</span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">{entry.treatment}</p>
                  <p className="text-xs text-hospital-blue mt-0.5">{entry.doctor}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
