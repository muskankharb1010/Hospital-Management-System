"use client";

import { billingRecords } from "@/lib/mock-data";
import {
  CreditCard,
  DollarSign,
  FileText,
  Shield,
  TrendingUp,
} from "lucide-react";

const statusColors: Record<string, string> = {
  Paid: "bg-green-100 text-green-700",
  Pending: "bg-amber-100 text-amber-700",
  Partial: "bg-blue-100 text-blue-700",
};

export default function BillingPage() {
  const totalRevenue = billingRecords.reduce((sum, b) => sum + b.amount, 0);
  const paid = billingRecords.filter((b) => b.status === "Paid");
  const pending = billingRecords.filter(
    (b) => b.status === "Pending" || b.status === "Partial"
  );
  const totalPaid = paid.reduce((sum, b) => sum + b.amount, 0);
  const totalPending = pending.reduce((sum, b) => sum + b.amount, 0);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-heading font-bold text-foreground">
          Billing & Insurance
        </h1>
        <p className="text-sm text-muted-foreground">
          Manage invoices, payments, and insurance claims
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-muted-foreground">
              Total Revenue
            </p>
            <DollarSign className="h-5 w-5 text-hospital-blue" />
          </div>
          <p className="mt-2 text-2xl font-heading font-bold text-foreground">
            ${totalRevenue.toLocaleString()}
          </p>
        </div>
        <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-muted-foreground">
              Amount Paid
            </p>
            <TrendingUp className="h-5 w-5 text-green-600" />
          </div>
          <p className="mt-2 text-2xl font-heading font-bold text-green-600">
            ${totalPaid.toLocaleString()}
          </p>
        </div>
        <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-muted-foreground">
              Pending Amount
            </p>
            <CreditCard className="h-5 w-5 text-amber-600" />
          </div>
          <p className="mt-2 text-2xl font-heading font-bold text-amber-600">
            ${totalPending.toLocaleString()}
          </p>
        </div>
        <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-muted-foreground">
              Total Invoices
            </p>
            <FileText className="h-5 w-5 text-hospital-blue" />
          </div>
          <p className="mt-2 text-2xl font-heading font-bold text-foreground">
            {billingRecords.length}
          </p>
        </div>
      </div>

      {/* Invoice Cards */}
      <div className="grid gap-4 md:grid-cols-2">
        {billingRecords.map((bill) => (
          <div
            key={bill.id}
            className="rounded-xl border border-border bg-card p-5 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="font-heading font-semibold text-foreground">
                  {bill.invoiceNo}
                </p>
                <p className="text-sm text-muted-foreground">
                  {bill.patientName} ({bill.patientId})
                </p>
              </div>
              <span
                className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${
                  statusColors[bill.status] || "bg-gray-100 text-gray-700"
                }`}
              >
                {bill.status}
              </span>
            </div>
            <p className="mt-2 text-sm text-foreground">{bill.description}</p>
            <div className="mt-3 flex items-center justify-between border-t border-border pt-3">
              <p className="text-xl font-heading font-bold text-foreground">
                ${bill.amount.toLocaleString()}
              </p>
              <p className="text-xs text-muted-foreground">{bill.date}</p>
            </div>

            {/* Insurance Info */}
            <div className="mt-3 flex items-center gap-2 rounded-lg bg-muted/50 p-3">
              <Shield className="h-4 w-4 text-hospital-blue flex-shrink-0" />
              <div className="min-w-0">
                <p className="text-xs font-medium text-foreground truncate">
                  {bill.insurance}
                </p>
                <p className="text-xs text-muted-foreground">
                  Coverage: {bill.insuranceCoverage}% &middot; You pay: $
                  {(
                    bill.amount *
                    (1 - bill.insuranceCoverage / 100)
                  ).toFixed(0)}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
