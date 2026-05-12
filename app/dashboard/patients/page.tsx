"use client";

import { useState } from "react";
import { patients } from "@/lib/mock-data";
import { Search, Filter, Eye, ChevronRight } from "lucide-react";
import Link from "next/link";

export default function PatientsPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const filtered = patients.filter((p) => {
    const matchSearch =
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.id.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === "All" || p.status === statusFilter;
    return matchSearch && matchStatus;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-heading font-bold text-foreground">Patients</h1>
          <p className="text-sm text-muted-foreground">Manage all patient records</p>
        </div>
        <button
          type="button"
          className="inline-flex h-9 items-center gap-2 rounded-lg bg-hospital-blue px-4 text-sm font-medium text-white hover:opacity-90"
        >
          + Add Patient
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="search"
            placeholder="Search by name or ID..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="h-9 w-full rounded-lg border border-input bg-card pl-9 pr-4 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-muted-foreground" />
          {["All", "Active", "Discharged", "Critical"].map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => setStatusFilter(s)}
              className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
                statusFilter === s
                  ? "bg-hospital-blue text-white"
                  : "bg-card border border-border text-foreground hover:bg-muted"
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="rounded-xl border border-border bg-card shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/50">
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">ID</th>
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">Name</th>
                <th className="px-4 py-3 text-left font-medium text-muted-foreground hidden md:table-cell">Age</th>
                <th className="px-4 py-3 text-left font-medium text-muted-foreground hidden md:table-cell">Gender</th>
                <th className="px-4 py-3 text-left font-medium text-muted-foreground hidden lg:table-cell">Department</th>
                <th className="px-4 py-3 text-left font-medium text-muted-foreground hidden lg:table-cell">Doctor</th>
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">Status</th>
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filtered.map((patient) => (
                <tr key={patient.id} className="hover:bg-muted/30 transition-colors">
                  <td className="px-4 py-3 font-medium text-foreground">{patient.id}</td>
                  <td className="px-4 py-3">
                    <div>
                      <p className="font-medium text-foreground">{patient.name}</p>
                      <p className="text-xs text-muted-foreground">{patient.email}</p>
                    </div>
                  </td>
                  <td className="px-4 py-3 hidden md:table-cell text-foreground">{patient.age}</td>
                  <td className="px-4 py-3 hidden md:table-cell text-foreground">{patient.gender}</td>
                  <td className="px-4 py-3 hidden lg:table-cell text-foreground">{patient.department}</td>
                  <td className="px-4 py-3 hidden lg:table-cell text-foreground">{patient.assignedDoctor}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${
                        patient.status === "Active"
                          ? "bg-green-100 text-green-700"
                          : patient.status === "Critical"
                            ? "bg-red-100 text-red-700"
                            : "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {patient.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <Link
                      href={`/dashboard/patients/${patient.id}`}
                      className="inline-flex items-center gap-1 text-xs font-medium text-hospital-blue hover:underline"
                    >
                      <Eye className="h-3.5 w-3.5" /> View
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filtered.length === 0 && (
          <div className="py-12 text-center text-sm text-muted-foreground">
            No patients found matching your criteria.
          </div>
        )}
      </div>
    </div>
  );
}
