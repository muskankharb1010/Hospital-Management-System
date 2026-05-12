"use client";

import { useState } from "react";
import { doctors, departments } from "@/lib/mock-data";
import { Search, Star, Users, Clock, Eye, Plus } from "lucide-react";
import Link from "next/link";
import { AddDoctorModal, type AddDoctorModalProps } from "@/components/doctors/add-doctor-modal";

export default function DoctorsPage() {
  const [search, setSearch] = useState("");
  const [deptFilter, setDeptFilter] = useState("All");
  const [showAddModal, setShowAddModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const deptNames = ["All", ...new Set(departments.map((d) => d.name))];

  const filtered = doctors.filter((d) => {
    const matchSearch =
      d.name.toLowerCase().includes(search.toLowerCase()) ||
      d.specialization.toLowerCase().includes(search.toLowerCase());
    const matchDept = deptFilter === "All" || d.department === deptFilter;
    return matchSearch && matchDept;
  });

  const handleAddDoctor = async (data: any) => {
    setIsSubmitting(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1200));
    console.log("Doctor added:", data);
    setShowAddModal(false);
    setIsSubmitting(false);
    // In a real app, you'd add this to the doctors list
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-heading font-bold text-foreground">Doctors Directory</h1>
          <p className="text-sm text-muted-foreground">Browse and manage doctor profiles</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="inline-flex items-center justify-center gap-2 h-10 px-4 rounded-lg bg-hospital-green text-white font-medium text-sm hover:opacity-90 transition-all transform hover:scale-105"
        >
          <Plus className="h-4 w-4" />
          Add Doctor
        </button>
      </div>

      <AddDoctorModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        onSubmit={handleAddDoctor}
        isSubmitting={isSubmitting}
      />

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="search"
            placeholder="Search doctors..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="h-9 w-full rounded-lg border border-input bg-card pl-9 pr-4 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
          />
        </div>
        <select
          value={deptFilter}
          onChange={(e) => setDeptFilter(e.target.value)}
          className="h-9 rounded-lg border border-input bg-card px-3 text-sm outline-none focus:border-primary"
          aria-label="Filter by department"
        >
          {deptNames.map((d) => (
            <option key={d} value={d}>{d}</option>
          ))}
        </select>
      </div>

      {/* Doctor Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filtered.map((doctor) => (
          <div
            key={doctor.id}
            className="rounded-xl border border-border bg-card p-5 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-hospital-blue text-lg font-bold text-white">
                {doctor.name.split(" ").pop()?.charAt(0)}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-foreground truncate">{doctor.name}</p>
                <p className="text-xs text-muted-foreground">{doctor.specialization}</p>
              </div>
            </div>
            <div className="space-y-2 text-xs text-foreground/80">
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1"><Star className="h-3 w-3 text-amber-500" /> {doctor.rating}</span>
                <span
                  className={`rounded-full px-2 py-0.5 font-medium ${
                    doctor.availability === "Available"
                      ? "bg-green-100 text-green-700"
                      : doctor.availability === "Busy"
                        ? "bg-amber-100 text-amber-700"
                        : "bg-red-100 text-red-700"
                  }`}
                >
                  {doctor.availability}
                </span>
              </div>
              <div className="flex items-center gap-1"><Users className="h-3 w-3" /> {doctor.patients} patients</div>
              <div className="flex items-center gap-1"><Clock className="h-3 w-3" /> {doctor.experience}</div>
            </div>
            <Link
              href={`/dashboard/doctors/${doctor.id}`}
              className="mt-3 flex items-center justify-center gap-1 rounded-lg border border-border py-2 text-xs font-medium text-hospital-blue hover:bg-muted transition-colors"
            >
              <Eye className="h-3 w-3" /> View Profile
            </Link>
          </div>
        ))}
      </div>
      {filtered.length === 0 && (
        <div className="py-12 text-center text-sm text-muted-foreground">
          No doctors found matching your criteria.
        </div>
      )}
    </div>
  );
}
