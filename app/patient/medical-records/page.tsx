"use client";

import { useAuth } from "@/lib/auth-context";
import { patients } from "@/lib/mock-data";
import { FileText, Download, Calendar, User, Heart, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function PatientMedicalRecords() {
  const { user } = useAuth();
  const patientData = patients.find((p) => p.id === user?.id);

  return (
    <div className="min-h-screen bg-background p-4 sm:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link
            href="/patient/dashboard"
            className="p-2 hover:bg-muted rounded-lg transition-colors"
          >
            <ArrowLeft className="h-5 w-5 text-muted-foreground" />
          </Link>
          <div>
            <h1 className="text-3xl font-heading font-bold text-foreground">Medical Records</h1>
            <p className="text-muted-foreground">View and manage your medical history</p>
          </div>
        </div>

        {/* Medical History */}
        {patientData && (
          <div className="space-y-6">
            {/* Vitals Card */}
            <div className="rounded-xl border border-border dark:border-slate-700 bg-white dark:bg-slate-800 p-6 shadow-sm animate-fade-in-up">
              <h2 className="text-lg font-heading font-bold text-foreground dark:text-slate-100 mb-4 flex items-center gap-2">
                <Heart className="h-5 w-5 text-hospital-green" />
                Current Vitals
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {Object.entries(patientData.vitals).map(([key, value]) => (
                  <div key={key} className="p-4 rounded-lg bg-muted/50 dark:bg-slate-700">
                    <p className="text-xs text-muted-foreground dark:text-slate-400 capitalize mb-1">
                      {key.replace(/([A-Z])/g, " $1").trim()}
                    </p>
                    <p className="font-semibold text-foreground">{value}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Medical History Timeline */}
            <div className="rounded-xl border border-border dark:border-slate-700 bg-white dark:bg-slate-800 p-6 shadow-sm animate-fade-in-up animation-delay-200">
              <h2 className="text-lg font-heading font-bold text-foreground dark:text-slate-100 mb-6 flex items-center gap-2">
                <FileText className="h-5 w-5 text-hospital-blue" />
                Medical History
              </h2>

              <div className="space-y-4">
                {patientData.medicalHistory.map((record, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-lg border border-border hover:border-hospital-blue/50 transition-colors animate-fade-in-up"
                    style={{ animationDelay: `${idx * 100}ms` }}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <p className="font-semibold text-foreground">{record.diagnosis}</p>
                        <p className="text-sm text-muted-foreground mt-1 flex items-center gap-2">
                          <Calendar className="h-4 w-4" />
                          {record.date}
                        </p>
                      </div>
                      <span className="text-xs font-medium px-3 py-1 rounded-full bg-hospital-light-blue text-hospital-blue">
                        Completed
                      </span>
                    </div>
                    <div className="mt-3 p-3 bg-muted/50 rounded-lg">
                      <p className="text-xs text-muted-foreground mb-1">Treatment</p>
                      <p className="text-sm text-foreground">{record.treatment}</p>
                    </div>
                    <div className="mt-2 text-xs text-muted-foreground flex items-center gap-2">
                      <User className="h-3 w-3" />
                      Dr. {record.doctor.split(" ")[1]}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Documents Section */}
            <div className="rounded-xl border border-border dark:border-slate-700 bg-white dark:bg-slate-800 p-6 shadow-sm animate-fade-in-up animation-delay-300">
              <h2 className="text-lg font-heading font-bold text-foreground dark:text-slate-100 mb-6 flex items-center gap-2">
                <FileText className="h-5 w-5 text-hospital-green" />
                Documents
              </h2>

              <div className="space-y-3">
                {[
                  { name: "Lab Results - Feb 2026", date: "2026-02-01" },
                  { name: "X-ray Report - Jan 2026", date: "2026-01-15" },
                  { name: "Blood Test Results - Dec 2025", date: "2025-12-20" },
                ].map((doc, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-4 rounded-lg border border-border hover:bg-muted/50 transition-colors animate-fade-in-up"
                    style={{ animationDelay: `${(idx + 3) * 100}ms` }}
                  >
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-lg bg-hospital-light-blue flex items-center justify-center">
                        <FileText className="h-5 w-5 text-hospital-blue" />
                      </div>
                      <div>
                        <p className="font-medium text-foreground">{doc.name}</p>
                        <p className="text-xs text-muted-foreground">{doc.date}</p>
                      </div>
                    </div>
                    <button className="p-2 hover:bg-muted rounded-lg transition-colors text-hospital-green">
                      <Download className="h-5 w-5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
