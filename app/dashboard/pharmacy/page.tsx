"use client";

import { useState } from "react";
import { medicines, prescriptions } from "@/lib/mock-data";
import { Pill, Search, Package, AlertTriangle, FileText } from "lucide-react";

const stockColors: Record<string, string> = {
  "In Stock": "bg-green-100 text-green-700",
  "Low Stock": "bg-amber-100 text-amber-700",
  "Out of Stock": "bg-red-100 text-red-700",
};

export default function PharmacyPage() {
  const [tab, setTab] = useState<"medicines" | "prescriptions">("medicines");
  const [search, setSearch] = useState("");

  const filteredMeds = medicines.filter(
    (m) =>
      m.name.toLowerCase().includes(search.toLowerCase()) ||
      m.category.toLowerCase().includes(search.toLowerCase())
  );

  const filteredRx = prescriptions.filter(
    (p) =>
      p.patientName.toLowerCase().includes(search.toLowerCase()) ||
      p.medicines.some((m) => m.toLowerCase().includes(search.toLowerCase()))
  );

  const inStock = medicines.filter((m) => m.status === "In Stock").length;
  const lowStock = medicines.filter((m) => m.status === "Low Stock").length;
  const outOfStock = medicines.filter(
    (m) => m.status === "Out of Stock"
  ).length;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-heading font-bold text-foreground">
          Pharmacy
        </h1>
        <p className="text-sm text-muted-foreground">
          Medicine inventory and prescriptions
        </p>
      </div>

      {/* Summary */}
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="flex items-center gap-3 rounded-xl border border-border bg-card p-4 shadow-sm">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-100">
            <Package className="h-5 w-5 text-green-700" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">In Stock</p>
            <p className="text-xl font-heading font-bold text-foreground">
              {inStock}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3 rounded-xl border border-border bg-card p-4 shadow-sm">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-100">
            <AlertTriangle className="h-5 w-5 text-amber-700" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Low Stock</p>
            <p className="text-xl font-heading font-bold text-foreground">
              {lowStock}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3 rounded-xl border border-border bg-card p-4 shadow-sm">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-100">
            <Pill className="h-5 w-5 text-red-700" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Out of Stock</p>
            <p className="text-xl font-heading font-bold text-foreground">
              {outOfStock}
            </p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 rounded-lg bg-muted p-1 w-fit">
        {(["medicines", "prescriptions"] as const).map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => {
              setTab(t);
              setSearch("");
            }}
            className={`rounded-md px-4 py-1.5 text-sm font-medium capitalize transition-colors ${
              tab === t
                ? "bg-white text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <input
          type="search"
          placeholder={`Search ${tab}...`}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="h-9 w-full rounded-lg border border-input bg-card pl-9 pr-4 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
        />
      </div>

      {tab === "medicines" && (
        <div className="rounded-xl border border-border bg-card shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/50">
                  <th className="px-4 py-3 text-left font-medium text-muted-foreground">
                    Medicine
                  </th>
                  <th className="px-4 py-3 text-left font-medium text-muted-foreground hidden md:table-cell">
                    Category
                  </th>
                  <th className="px-4 py-3 text-left font-medium text-muted-foreground hidden lg:table-cell">
                    Manufacturer
                  </th>
                  <th className="px-4 py-3 text-left font-medium text-muted-foreground">
                    Stock
                  </th>
                  <th className="px-4 py-3 text-left font-medium text-muted-foreground">
                    Price
                  </th>
                  <th className="px-4 py-3 text-left font-medium text-muted-foreground hidden md:table-cell">
                    Expiry
                  </th>
                  <th className="px-4 py-3 text-left font-medium text-muted-foreground">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filteredMeds.map((m) => (
                  <tr
                    key={m.id}
                    className="hover:bg-muted/30 transition-colors"
                  >
                    <td className="px-4 py-3 font-medium text-foreground">
                      {m.name}
                    </td>
                    <td className="px-4 py-3 hidden md:table-cell text-foreground">
                      {m.category}
                    </td>
                    <td className="px-4 py-3 hidden lg:table-cell text-foreground">
                      {m.manufacturer}
                    </td>
                    <td className="px-4 py-3 text-foreground">{m.stock}</td>
                    <td className="px-4 py-3 text-foreground">
                      ${m.price.toFixed(2)}
                    </td>
                    <td className="px-4 py-3 hidden md:table-cell text-foreground">
                      {m.expiryDate}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${
                          stockColors[m.status] || "bg-gray-100 text-gray-700"
                        }`}
                      >
                        {m.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {filteredMeds.length === 0 && (
            <div className="py-12 text-center text-sm text-muted-foreground">
              No medicines found.
            </div>
          )}
        </div>
      )}

      {tab === "prescriptions" && (
        <div className="grid gap-4 md:grid-cols-2">
          {filteredRx.map((rx) => (
            <div
              key={rx.id}
              className="rounded-xl border border-border bg-card p-5 shadow-sm"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="font-heading font-semibold text-foreground">
                    {rx.id}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {rx.patientName}
                  </p>
                </div>
                <span
                  className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${
                    rx.status === "Active"
                      ? "bg-green-100 text-green-700"
                      : "bg-gray-100 text-gray-700"
                  }`}
                >
                  {rx.status}
                </span>
              </div>
              <p className="mt-2 text-xs text-muted-foreground">
                Prescribed by {rx.doctorName} on {rx.date}
              </p>
              <div className="mt-3 space-y-1">
                {rx.medicines.map((med) => (
                  <div
                    key={med}
                    className="flex items-center gap-2 text-sm text-foreground"
                  >
                    <Pill className="h-3.5 w-3.5 text-hospital-blue" />
                    {med}
                  </div>
                ))}
              </div>
              {rx.notes && (
                <div className="mt-3 flex items-start gap-2 rounded-lg bg-muted/50 p-2">
                  <FileText className="h-3.5 w-3.5 text-muted-foreground mt-0.5" />
                  <p className="text-xs text-muted-foreground">{rx.notes}</p>
                </div>
              )}
            </div>
          ))}
          {filteredRx.length === 0 && (
            <div className="col-span-full py-12 text-center text-sm text-muted-foreground">
              No prescriptions found.
            </div>
          )}
        </div>
      )}
    </div>
  );
}
