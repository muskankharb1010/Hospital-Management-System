"use client";

import { departments, doctors } from "@/lib/mock-data";
import { Building2, Users, BedDouble, Stethoscope } from "lucide-react";
import { useState } from "react";

export default function DepartmentsPage() {
  const [selected, setSelected] = useState<string | null>(null);
  const selectedDept = departments.find((d) => d.id === selected);
  const deptDoctors = selectedDept
    ? doctors.filter((doc) => doc.department === selectedDept.name)
    : [];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-heading font-bold text-foreground">
          Departments
        </h1>
        <p className="text-sm text-muted-foreground">
          Hospital departments and their details
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {departments.map((dept) => (
          <button
            key={dept.id}
            type="button"
            onClick={() => setSelected(dept.id === selected ? null : dept.id)}
            className={`rounded-xl border p-5 text-left transition-all hover:shadow-md ${
              selected === dept.id
                ? "border-primary bg-primary/5 shadow-md"
                : "border-border bg-card"
            }`}
          >
            <div className="flex items-start justify-between">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-hospital-blue/10">
                <Building2 className="h-5 w-5 text-hospital-blue" />
              </div>
              <span className="text-xs font-medium text-muted-foreground">
                {dept.id}
              </span>
            </div>
            <h3 className="mt-3 font-heading font-semibold text-foreground">
              {dept.name}
            </h3>
            <p className="mt-1 text-xs text-muted-foreground">
              {dept.description}
            </p>
            <p className="mt-2 text-xs text-hospital-blue font-medium">
              Head: {dept.head}
            </p>
            <div className="mt-3 flex gap-4">
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <Stethoscope className="h-3.5 w-3.5" /> {dept.doctors} Doctors
              </div>
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <Users className="h-3.5 w-3.5" /> {dept.patients} Patients
              </div>
              {dept.beds > 0 && (
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <BedDouble className="h-3.5 w-3.5" /> {dept.beds} Beds
                </div>
              )}
            </div>
          </button>
        ))}
      </div>

      {/* Department Details */}
      {selectedDept && (
        <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
          <h2 className="text-lg font-heading font-bold text-foreground">
            {selectedDept.name} - Doctors
          </h2>
          <p className="text-sm text-muted-foreground mt-1">
            Doctors assigned to the {selectedDept.name} department
          </p>
          {deptDoctors.length > 0 ? (
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {deptDoctors.map((doc) => (
                <div
                  key={doc.id}
                  className="flex items-center gap-3 rounded-lg border border-border p-3"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-hospital-blue text-white font-heading font-bold text-sm">
                    {doc.name
                      .replace("Dr. ", "")
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">
                      {doc.name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {doc.qualification} &middot; {doc.experience}
                    </p>
                    <span
                      className={`mt-1 inline-flex text-xs font-medium ${
                        doc.availability === "Available"
                          ? "text-green-600"
                          : doc.availability === "Busy"
                            ? "text-amber-600"
                            : "text-red-500"
                      }`}
                    >
                      {doc.availability}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="mt-4 text-sm text-muted-foreground">
              No doctors found specifically assigned to this department in the
              mock data.
            </p>
          )}
        </div>
      )}
    </div>
  );
}
