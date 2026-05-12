"use client";

import { useAuth } from "@/lib/auth-context";
import { patients } from "@/lib/mock-data";
import { CreditCard, Download, Eye, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function PatientBilling() {
  const { user } = useAuth();

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
            <h1 className="text-3xl font-heading font-bold text-foreground">Billing & Insurance</h1>
            <p className="text-muted-foreground">View your invoices and insurance information</p>
          </div>
        </div>

        {/* Insurance Info */}
        <div className="rounded-xl border border-border dark:border-slate-700 bg-white dark:bg-slate-800 p-6 shadow-sm mb-6 animate-fade-in-up">
          <h2 className="text-lg font-heading font-bold text-foreground dark:text-slate-100 mb-4">Insurance Information</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <p className="text-sm text-muted-foreground dark:text-slate-400 mb-1">Provider</p>
              <p className="font-semibold text-foreground dark:text-slate-100">Blue Cross Blue Shield</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Policy Number</p>
              <p className="font-semibold text-foreground">BC-BS-2024-98765</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Coverage Status</p>
              <p className="font-semibold text-hospital-green">Active</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Deductible Used</p>
              <p className="font-semibold text-foreground">$800 / $1,500</p>
            </div>
          </div>
        </div>

        {/* Invoices */}
        <div className="rounded-xl border border-border dark:border-slate-700 bg-white dark:bg-slate-800 p-6 shadow-sm animate-fade-in-up animation-delay-200">
          <h2 className="text-lg font-heading font-bold text-foreground dark:text-slate-100 mb-6 flex items-center gap-2">
            <CreditCard className="h-5 w-5 text-hospital-blue" />
            Recent Invoices
          </h2>

          <div className="space-y-3">
            {[
              { date: "2026-02-05", description: "Cardiology Consultation", amount: "$150.00", status: "Paid" },
              { date: "2026-01-20", description: "Lab Work & Tests", amount: "$320.00", status: "Paid" },
              { date: "2026-01-10", description: "General Checkup", amount: "$100.00", status: "Paid" },
              { date: "2025-12-15", description: "Specialist Visit", amount: "$200.00", status: "Paid" },
            ].map((invoice, idx) => (
              <div
                key={idx}
                className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-4 rounded-lg border border-border hover:bg-muted/50 transition-colors animate-fade-in-up"
                style={{ animationDelay: `${idx * 100}ms` }}
              >
                <div className="mb-3 sm:mb-0">
                  <p className="font-medium text-foreground">{invoice.description}</p>
                  <p className="text-xs text-muted-foreground mt-1">{invoice.date}</p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="font-semibold text-foreground">{invoice.amount}</p>
                    <span className="text-xs font-medium px-2 py-1 rounded-full bg-green-100 text-green-700">
                      {invoice.status}
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <button className="p-2 hover:bg-muted rounded-lg transition-colors text-hospital-blue">
                      <Eye className="h-4 w-4" />
                    </button>
                    <button className="p-2 hover:bg-muted rounded-lg transition-colors text-hospital-green">
                      <Download className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Billing Summary */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
          <div className="rounded-xl border border-border dark:border-slate-700 bg-white dark:bg-slate-800 p-6 shadow-sm animate-fade-in-up animation-delay-400">
            <p className="text-sm text-muted-foreground dark:text-slate-400 mb-2">Total Amount Paid</p>
            <p className="text-2xl font-heading font-bold text-foreground dark:text-slate-100">$770.00</p>
          </div>
          <div className="rounded-xl border border-border dark:border-slate-700 bg-white dark:bg-slate-800 p-6 shadow-sm animate-fade-in-up animation-delay-500">
            <p className="text-sm text-muted-foreground dark:text-slate-400 mb-2">Insurance Covered</p>
            <p className="text-2xl font-heading font-bold text-hospital-green dark:text-green-400">$580.00</p>
          </div>
          <div className="rounded-xl border border-border dark:border-slate-700 bg-white dark:bg-slate-800 p-6 shadow-sm animate-fade-in-up animation-delay-600">
            <p className="text-sm text-muted-foreground dark:text-slate-400 mb-2">Out of Pocket</p>
            <p className="text-2xl font-heading font-bold text-hospital-blue dark:text-blue-400">$190.00</p>
          </div>
        </div>
      </div>
    </div>
  );
}
