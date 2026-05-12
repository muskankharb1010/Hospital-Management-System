"use client";

import { useState } from "react";
import { labTests } from "@/lib/mock-data";
import { FlaskConical, Search, Download, ClipboardCheck } from "lucide-react";

const statusColors: Record<string, string> = {
  Completed: "bg-green-100 text-green-700",
  Pending: "bg-amber-100 text-amber-700",
};

export default function LaboratoryPage() {
  const [filter, setFilter] = useState<"all" | "Completed" | "Pending">("all");
  const [search, setSearch] = useState("");

  const completed = labTests.filter((t) => t.status === "Completed").length;
  const pending = labTests.filter((t) => t.status === "Pending").length;

  const filtered = labTests
    .filter((t) => filter === "all" || t.status === filter)
    .filter(
      (t) =>
        t.patientName.toLowerCase().includes(search.toLowerCase()) ||
        t.testName.toLowerCase().includes(search.toLowerCase())
    );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-heading font-bold text-foreground">
          Laboratory
        </h1>
        <p className="text-sm text-muted-foreground">
          Lab tests and diagnostic reports
        </p>
      </div>

      {/* Summary */}
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="flex items-center gap-3 rounded-xl border border-border bg-card p-4 shadow-sm">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-hospital-blue/10">
            <FlaskConical className="h-5 w-5 text-hospital-blue" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Total Tests</p>
            <p className="text-xl font-heading font-bold text-foreground">
              {labTests.length}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3 rounded-xl border border-border bg-card p-4 shadow-sm">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-100">
            <ClipboardCheck className="h-5 w-5 text-green-700" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Completed</p>
            <p className="text-xl font-heading font-bold text-green-600">
              {completed}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3 rounded-xl border border-border bg-card p-4 shadow-sm">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-100">
            <FlaskConical className="h-5 w-5 text-amber-700" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Pending</p>
            <p className="text-xl font-heading font-bold text-amber-600">
              {pending}
            </p>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-3">
        <div className="flex gap-1 rounded-lg bg-muted p-1 w-fit">
          {(["all", "Completed", "Pending"] as const).map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setFilter(t)}
              className={`rounded-md px-4 py-1.5 text-sm font-medium capitalize transition-colors ${
                filter === t
                  ? "bg-white text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {t === "all" ? "All" : t}
            </button>
          ))}
        </div>
        <div className="relative max-w-sm flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="search"
            placeholder="Search tests..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="h-9 w-full rounded-lg border border-input bg-card pl-9 pr-4 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
          />
        </div>
      </div>

      {/* Table */}
      <div className="rounded-xl border border-border bg-card shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/50">
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">
                  ID
                </th>
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">
                  Patient
                </th>
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">
                  Test Name
                </th>
                <th className="px-4 py-3 text-left font-medium text-muted-foreground hidden md:table-cell">
                  Doctor
                </th>
                <th className="px-4 py-3 text-left font-medium text-muted-foreground hidden md:table-cell">
                  Date
                </th>
                <th className="px-4 py-3 text-left font-medium text-muted-foreground hidden lg:table-cell">
                  Result
                </th>
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">
                  Status
                </th>
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">
                  Report
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filtered.map((test) => (
                <tr
                  key={test.id}
                  className="hover:bg-muted/30 transition-colors"
                >
                  <td className="px-4 py-3 font-medium text-foreground">
                    {test.id}
                  </td>
                  <td className="px-4 py-3 text-foreground">
                    {test.patientName}
                  </td>
                  <td className="px-4 py-3 text-foreground">
                    {test.testName}
                  </td>
                  <td className="px-4 py-3 hidden md:table-cell text-foreground">
                    {test.doctor}
                  </td>
                  <td className="px-4 py-3 hidden md:table-cell text-foreground">
                    {test.date}
                  </td>
                  <td className="px-4 py-3 hidden lg:table-cell text-foreground">
                    {test.result}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${
                        statusColors[test.status] ||
                        "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {test.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    {test.status === "Completed" ? (
                      <button
                        type="button"
                        className="inline-flex items-center gap-1 rounded-md bg-hospital-blue/10 px-2.5 py-1 text-xs font-medium text-hospital-blue hover:bg-hospital-blue/20 transition-colors"
                        onClick={() =>
                          alert(
                            "This is a demo. Report download is not available."
                          )
                        }
                      >
                        <Download className="h-3 w-3" /> Download
                      </button>
                    ) : (
                      <span className="text-xs text-muted-foreground">
                        Awaiting
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filtered.length === 0 && (
          <div className="py-12 text-center text-sm text-muted-foreground">
            No lab tests found.
          </div>
        )}
      </div>
    </div>
  );
}
